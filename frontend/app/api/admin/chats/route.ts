import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const SYSTEM_PROMPT = `You are the AI Artisan for Forge & Timber Atelier, a premium bespoke furniture and metalwork studio based in Nairobi, Kenya. You specialize in rustic industrial luxury — combining African hardwoods (Mvule, Mahogany, Walnut) with structural steel and metalwork.

You help customers with:
- Information about custom furniture commissions (tables, chairs, shelving, desks)
- Wood species guidance (Mvule, African Mahogany, Walnut, Cherry, Oak)
- Metal fabrication services (TIG/MIG/Arc welding, steel, copper, brass)
- Pricing estimates (furniture starts from KSh 15,000, dining tables from KSh 45,000, full installations from KSh 200,000)
- Lead times (custom pieces: 4–12 weeks depending on complexity)
- Care and maintenance of wood and metal furniture
- Booking consultations (KES 5,000 consultation fee, refundable on order)
- Payment options: M-Pesa, Visa/Mastercard, PayPal

Tone: Knowledgeable, warm, artisanal. Keep responses concise (2–4 sentences).
Contact: +254 726 461 196 | alex2000rui@gmail.com | Nairobi, Kenya.`;

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    const { messages, sessionId, stream: useStream } = await req.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided." }, { status: 400 });
    }

    // Get or create chat session
    let session;
    if (sessionId) {
      session = await prisma.chatSession.findUnique({ where: { id: sessionId } });
    }
    if (!session) {
      session = await prisma.chatSession.create({
        data: { clerkUserId: userId ?? null },
      });
    }

    // Save user message
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role === "user") {
      await prisma.chatMessage.create({
        data: { sessionId: session.id, role: "user", content: lastMessage.content },
      });
    }

    const geminiBody = {
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: messages.map((m: { role: string; content: string }) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
      generationConfig: { maxOutputTokens: 1000, temperature: 0.7 },
    };

    // Streaming response
    if (useStream) {
      const geminiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent?alt=sse&key=${process.env.GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(geminiBody),
        }
      );

      if (!geminiRes.ok) {
        return NextResponse.json({ error: "Gemini API error" }, { status: 500 });
      }

      const sessionId = session.id;
      let fullText = "";

      const stream = new ReadableStream({
        async start(controller) {
          const reader = geminiRes.body!.getReader();
          const decoder = new TextDecoder();

          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              const chunk = decoder.decode(value, { stream: true });
              const lines = chunk.split("\n");

              for (const line of lines) {
                if (line.startsWith("data: ")) {
                  const data = line.slice(6).trim();
                  if (data === "[DONE]") continue;
                  try {
                    const parsed = JSON.parse(data);
                    const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
                    if (text) {
                      fullText += text;
                      controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ text, sessionId })}\n\n`));
                    }
                  } catch { /* skip malformed chunks */ }
                }
              }
            }
          } finally {
            // Save full assistant response to DB
            if (fullText) {
              await prisma.chatMessage.create({
                data: { sessionId, role: "assistant", content: fullText },
              }).catch(console.error);
            }
            controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ done: true, sessionId })}\n\n`));
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
    }

    // Non-streaming fallback
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(geminiBody),
      }
    );

    const geminiData = await geminiRes.json();
    const assistantText =
      geminiData.candidates?.[0]?.content?.parts?.[0]?.text ??
      "I apologize, I could not process that request.";

    await prisma.chatMessage.create({
      data: { sessionId: session.id, role: "assistant", content: assistantText },
    });

    return NextResponse.json({ message: assistantText, sessionId: session.id });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Failed to process message." }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ sessions: [] });
    }

    const sessions = await prisma.chatSession.findMany({
      where: { clerkUserId: userId },
      include: {
        messages: { orderBy: { createdAt: "asc" } },
      },
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    return NextResponse.json({ sessions });
  } catch (error) {
    console.error("Fetch chat history error:", error);
    return NextResponse.json({ sessions: [] });
  }
}
