"use client";

import { useState, useRef, useEffect } from "react";
import { useUser, SignInButton } from "@clerk/nextjs";
import Footer from "@/components/Footer";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatSessionSummary {
  id: string;
  createdAt: string;
  messages: Message[];
}

const SUGGESTED_QUESTIONS = [
  "What finish options do you offer?",
  "How long does a custom gate take?",
  "Do you offer M-Pesa payment?",
  "What is your pricing range?",
];

function sessionTitle(session: ChatSessionSummary): string {
  const firstUserMsg = session.messages.find((m) => m.role === "user");
  if (!firstUserMsg) return "New conversation";
  return firstUserMsg.content.length > 40
    ? firstUserMsg.content.slice(0, 40) + "..."
    : firstUserMsg.content;
}

export default function AIArtisanPage() {
  const { isSignedIn, isLoaded } = useUser();
  const [sessions, setSessions] = useState<ChatSessionSummary[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSignedIn) {
      fetch("/api/chat")
        .then((r) => r.json())
        .then((d) => setSessions(d.sessions ?? []))
        .catch(() => {});
    }
  }, [isSignedIn]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadSession = (session: ChatSessionSummary) => {
    setActiveSessionId(session.id);
    setMessages(session.messages);
  };

  const startNewSession = () => {
    setActiveSessionId(null);
    setMessages([]);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.success) {
        setUploadedImageUrl(data.url);
      }
    } catch {
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    if (!isSignedIn) return;

    const fullText = uploadedImageUrl
      ? `${text}\n\n[Reference photo attached: ${uploadedImageUrl}]`
      : text;

    const userMessage: Message = { role: "user", content: fullText };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setUploadedImageUrl(null);
    setIsLoading(true);

    const streamingMessages = [...newMessages, { role: "assistant" as const, content: "" }];
    setMessages(streamingMessages);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          sessionId: activeSessionId,
          stream: true,
        }),
      });

      if (!response.ok || !response.body) throw new Error("Stream failed");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";

      setIsLoading(false);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.sessionId && !activeSessionId) setActiveSessionId(data.sessionId);
              if (data.text) {
                accumulatedText += data.text;
                setMessages([...newMessages, { role: "assistant", content: accumulatedText }]);
              }
            } catch {
              /* skip malformed chunk */
            }
          }
        }
      }

      fetch("/api/chat")
        .then((r) => r.json())
        .then((d) => setSessions(d.sessions ?? []))
        .catch(() => {});
    } catch {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "I'm having trouble connecting right now. Please call us at +254 726 461 196.",
        },
      ]);
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <main className="bg-background text-on-surface min-h-screen pt-20">
      <div className="flex flex-col lg:flex-row max-w-container-max mx-auto">
        <aside className="lg:w-72 border-r border-outline-variant/30 px-margin-mobile py-8 flex-shrink-0">
          <div className="mb-2">
            <h1 className="font-display-lg text-2xl">AI ARTISAN</h1>
            <p className="font-label-caps text-label-caps text-on-surface-variant tracking-widest mt-1">
              CONSULTATION
            </p>
          </div>

          <button
            onClick={startNewSession}
            className="w-full mt-6 mb-8 border border-outline-variant rounded-lg py-3 text-body-sm text-on-surface-variant hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-base">add</span>
            New Conversation
          </button>

          <p className="font-label-caps text-label-caps text-on-surface-variant tracking-widest mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">history</span>
            THREAD HISTORY
          </p>

          {!isSignedIn && (
            <p className="text-body-sm text-on-surface-variant">Sign in to see your past conversations.</p>
          )}

          <div className="flex flex-col gap-1">
            {sessions.map((session) => (
              <button
                key={session.id}
                onClick={() => loadSession(session)}
                className={`text-left px-3 py-3 rounded-lg text-body-sm transition-colors truncate ${
                  activeSessionId === session.id
                    ? "bg-surface-container-high text-on-surface"
                    : "text-on-surface-variant hover:bg-surface-container"
                }`}
              >
                {sessionTitle(session)}
              </button>
            ))}
          </div>
        </aside>

        <section className="flex-1 px-margin-mobile py-8 flex flex-col h-[calc(100vh-5rem)]">
          <div className="flex-1 flex flex-col gap-4 overflow-y-auto mb-4 min-h-0">
            {!isLoaded && null}

            {isLoaded && !isSignedIn && (
              <div className="glass-panel rounded-xl p-6 max-w-md">
                <p className="text-body-sm mb-4">
                  Karibu! Please sign in to chat with the AI Artisan, this lets us save your conversation and link it to your bookings.
                </p>
                <SignInButton mode="modal">
                  <button className="bg-primary text-on-primary px-5 py-2.5 rounded-lg text-body-sm font-semibold">
                    Sign In
                  </button>
                </SignInButton>
              </div>
            )}

            {isSignedIn && messages.length === 0 && (
              <div className="glass-panel rounded-xl p-6 max-w-lg border-l-4 border-primary">
                <p className="text-body-sm mb-4 leading-relaxed">
                  Karibu. I&apos;m the AI Artisan, trained on structural steel fabrication and precision welding. Ask me anything about gates, railings, staircases, furniture, pricing, or book a consultation.
                </p>
                <div className="flex flex-col gap-2">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="text-left border border-outline-variant rounded-lg px-4 py-2 text-body-sm text-on-surface-variant hover:border-primary hover:text-primary transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-xl px-4 py-3 text-body-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary text-on-primary"
                      : "glass-panel border-l-4 border-primary"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="glass-panel border-l-4 border-primary rounded-xl px-4 py-3 flex gap-1.5 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {uploadedImageUrl && (
            <div className="mb-3 flex items-center gap-3 glass-panel rounded-lg p-3 max-w-sm">
              <img src={uploadedImageUrl} alt="Reference" className="w-12 h-12 object-cover rounded-lg" />
              <span className="text-body-sm text-on-surface-variant flex-1">Reference photo attached</span>
              <button onClick={() => setUploadedImageUrl(null)} className="text-on-surface-variant hover:text-primary">
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>
          )}

          <div className="flex items-center gap-2 border-t border-outline-variant/30 pt-4">
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={!isSignedIn || isUploading}
              className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors disabled:opacity-40"
              title="Attach a reference photo"
            >
              <span className="material-symbols-outlined text-base">
                {isUploading ? "hourglass_empty" : "add_a_photo"}
              </span>
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isSignedIn ? "Describe your structural requirement..." : "Sign in to chat"}
              disabled={isLoading || !isSignedIn}
              className="flex-1 bg-surface-container-high border border-outline-variant rounded-lg px-4 py-3 text-body-sm text-on-surface placeholder-on-surface-variant outline-none focus:border-primary transition-colors"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={isLoading || !input.trim() || !isSignedIn}
              className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg transition-colors ${
                input.trim() && isSignedIn
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container-high text-on-surface-variant"
              }`}
            >
              <span className="material-symbols-outlined text-base">send</span>
            </button>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}