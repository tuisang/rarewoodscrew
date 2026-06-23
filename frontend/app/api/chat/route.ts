import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { loadRelevantData } from "@/lib/chatData";

const ADMIN_USER_ID = "user_3FOCtiBnlnMNPZ1naaYqyDcUFpP";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;
const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:streamGenerateContent?alt=sse&key=" +
  GEMINI_API_KEY;

// ─── Get chat sessions: admin sees all, regular users see only their own ────

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ sessions: [] });
  }

  const sessions = await prisma.chatSession.findMany({
    where: userId === ADMIN_USER_ID ? {} : { clerkUserId: userId },
    include: { messages: { orderBy: { createdAt: "asc" } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ sessions });
}

// ─── Signed-in: send a message and stream Gemini response ──────────────────

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { messages, sessionId } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    // Load only relevant markdown files based on the user's message
    const lastUserMessage = messages[messages.length - 1]?.content ?? "";
    const businessData = loadRelevantData(lastUserMessage);

    const systemPrompt = `You are the AI Artisan for Black Steel Crew, a premium bespoke steel fabrication studio based in Nairobi, Kenya. You specialise in custom structural and decorative steelwork — gates, railings, staircases, furniture, and architectural metalwork — built with precision welding and finished to last.

Below is the complete knowledge base for Black Steel Crew. Use it to answer customer questions accurately. If a question is outside this knowledge base, use your best judgment but stay on-brand.

=== BLACK STEEL CREW KNOWLEDGE BASE ===

${businessData}

=== END OF KNOWLEDGE BASE ===

Guidelines:
- Tone: Knowledgeable, direct, confident. Use fabrication terminology naturally — welds, finishes (powder coat, raw, galvanized), gauge, structural load where relevant.
- Keep responses concise (2–4 sentences) unless detail is genuinely needed.
- End with a gentle call to action where relevant (book a consultation, request a quote, view portfolio, etc.).
- For pricing always give ranges from the knowledge base, never invent figures.
- For structural pieces (gates, railings, staircases), note that on-site measurement is typically required before a final quote.

    // Map messages to Gemini format
    const geminiContents = messages.map(
      (m: { role: string; content: string }) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      })
    );

    // Call Gemini streaming API
    const geminiRes = await fetch(GEMINI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: geminiContents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!geminiRes.ok || !geminiRes.body) {
      const err = await geminiRes.text();
      console.error("Gemini error:", err);
      return NextResponse.json({ error: "Gemini API error" }, { status: 500 });
    }

    // Persist or create chat session in the background
    let activeSessionId = sessionId;
    const userMessage = messages[messages.length - 1];

    const sessionPromise = (async () => {
      try {
        if (activeSessionId) {
          await prisma.chatMessage.create({
            data: {
              sessionId: activeSessionId,
              role: "user",
              content: userMessage.content,
            },
          });
        } else {
          const session = await prisma.chatSession.create({
            data: {
              clerkUserId: userId,
              messages: {
                create: {
                  role: "user",
                  content: userMessage.content,
                },
              },
            },
          });
          activeSessionId = session.id;
        }
      } catch (e) {
        console.error("DB session error:", e);
      }
    })();

    // Stream SSE back to the client
    const encoder = new TextEncoder();
    let fullResponse = "";
    let sessionIdSent = false;

    const stream = new ReadableStream({
      async start(controller) {
        // Wait for session to be created so we can send its ID
        await sessionPromise;

        // Send sessionId as first SSE event
        if (!sessionIdSent && activeSessionId) {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ sessionId: activeSessionId })}\n\n`)
          );
          sessionIdSent = true;
        }

        const reader = geminiRes.body!.getReader();
        const decoder = new TextDecoder();

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n");

            for (const line of lines) {
              if (!line.startsWith("data: ")) continue;
              const raw = line.slice(6).trim();
              if (!raw || raw === "[DONE]") continue;

              try {
                const parsed = JSON.parse(raw);
                const text =
                  parsed?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
                if (text) {
                  fullResponse += text;
                  controller.enqueue(
                    encoder.encode(`data: ${JSON.stringify({ text })}\n\n`)
                  );
                }
              } catch {
                // skip malformed chunks
              }
            }
          }
        } finally {
          // Save assistant reply to DB
          if (activeSessionId && fullResponse) {
            prisma.chatMessage
              .create({
                data: {
                  sessionId: activeSessionId,
                  role: "assistant",
                  content: fullResponse,
                },
              })
              .catch((e) => console.error("DB assistant save error:", e));
          }
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    console.error("Chat POST error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}