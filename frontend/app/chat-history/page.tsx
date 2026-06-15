"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import Footer from "@/components/Footer";

interface ChatMessage {
  id: string;
  role: string;
  content: string;
  createdAt: string;
}

interface ChatSession {
  id: string;
  createdAt: string;
  messages: ChatMessage[];
}

export default function ChatHistoryPage() {
  const { user, isLoaded } = useUser();
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded || !user) return;

    const fetchHistory = async () => {
      try {
        const res = await fetch("/api/chat");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setSessions(data.sessions ?? []);
        if (data.sessions?.length > 0) setActiveSession(data.sessions[0].id);
      } catch {
        setError("Could not load chat history.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [isLoaded, user]);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-KE", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getSessionPreview = (session: ChatSession) => {
    const first = session.messages.find((m) => m.role === "user");
    return (first?.content?.slice(0, 60) ?? "New conversation") + "...";
  };

  const activeMessages =
    sessions.find((s) => s.id === activeSession)?.messages ?? [];

  return (
    <main className="bg-[#131313] text-[#e5e2e1] min-h-screen">
      <div className="pt-32 pb-24 max-w-[1440px] mx-auto px-4 md:px-16">

        {/* Header */}
        <header className="mb-12">
          <span
            className="text-xs text-[#ffb785] uppercase tracking-[0.2em] mb-4 block"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            AI Artisan Archive
          </span>
          <div className="flex items-end justify-between">
            <h1
              className="text-4xl md:text-5xl font-bold leading-tight"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Your Conversations
            </h1>
            <Link
              href="/"
              className="hidden md:flex items-center gap-2 text-sm text-[#d3c4b9] hover:text-[#e8bf9b] transition-colors"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Back to Home
            </Link>
          </div>
          {user && (
            <p className="text-[#9c8e84] mt-3 text-sm">
              Logged in as{" "}
              <span className="text-[#e8bf9b]">{user.primaryEmailAddress?.emailAddress}</span>
            </p>
          )}
        </header>

        {/* Auth guard */}
        {isLoaded && !user && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <span className="material-symbols-outlined text-6xl text-[#4f453d] mb-6">lock</span>
            <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
              Sign in to view your history
            </h2>
            <p className="text-[#d3c4b9] mb-8">Your conversations are saved securely to your account.</p>
            <Link
              href="/"
              className="bg-[#e8bf9b] text-[#442b12] px-10 py-3 text-sm font-semibold hover:brightness-110 transition-all"
            >
              Go to Home
            </Link>
          </div>
        )}

        {/* Loading */}
        {isLoading && user && (
          <div className="flex items-center justify-center py-32">
            <div className="flex gap-3 items-center text-[#9c8e84]">
              <div className="w-2 h-2 bg-[#e8bf9b] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-2 h-2 bg-[#e8bf9b] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-2 h-2 bg-[#e8bf9b] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="p-6 bg-[#20201f] border-l-4 border-red-500 mb-8">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !error && user && sessions.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <span className="material-symbols-outlined text-6xl text-[#4f453d] mb-6">chat_bubble</span>
            <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
              No conversations yet
            </h2>
            <p className="text-[#d3c4b9] mb-8 max-w-sm">
              Start a conversation with the AI Artisan using the chat button on any page.
            </p>
            <Link
              href="/"
              className="bg-[#e8bf9b] text-[#442b12] px-10 py-3 text-sm font-semibold hover:brightness-110 transition-all"
            >
              Start Chatting
            </Link>
          </div>
        )}

        {/* Chat History UI */}
        {!isLoading && !error && user && sessions.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[700px]">

            {/* Sidebar - Session List */}
            <div className="lg:col-span-4 bg-[#0e0e0e] border border-[#4f453d]/40 flex flex-col overflow-hidden">
              <div className="p-5 border-b border-[#4f453d]/40">
                <p
                  className="text-xs tracking-widest text-[#9c8e84]"
                  style={{ fontFamily: "JetBrains Mono, monospace" }}
                >
                  {sessions.length} SESSION{sessions.length !== 1 ? "S" : ""}
                </p>
              </div>
              <div className="overflow-y-auto flex-1">
                {sessions.map((session, i) => (
                  <button
                    key={session.id}
                    onClick={() => setActiveSession(session.id)}
                    className={`w-full text-left p-5 border-b border-[#4f453d]/30 transition-all hover:bg-[#20201f] ${
                      activeSession === session.id
                        ? "bg-[#20201f] border-l-2 border-l-[#e8bf9b]"
                        : ""
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span
                        className="text-xs text-[#e8bf9b] tracking-widest"
                        style={{ fontFamily: "JetBrains Mono, monospace" }}
                      >
                        SESSION {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[10px] text-[#9c8e84]">
                        {session.messages.length} msg{session.messages.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <p className="text-sm text-[#d3c4b9] line-clamp-2 mb-2">
                      {getSessionPreview(session)}
                    </p>
                    <p className="text-[10px] text-[#4f453d]" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                      {formatDate(session.createdAt)}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Main - Message View */}
            <div className="lg:col-span-8 bg-[#0e0e0e] border border-[#4f453d]/40 flex flex-col overflow-hidden">
              {/* Session header */}
              <div className="p-5 border-b border-[#4f453d]/40 flex items-center gap-4">
                <div
                  className="w-9 h-9 bg-[#20201f] border border-[#4f453d] flex items-center justify-center"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e8bf9b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ fontFamily: "Playfair Display, serif" }}>
                    The AI Artisan
                  </p>
                  <p
                    className="text-[10px] text-[#9c8e84] tracking-widest"
                    style={{ fontFamily: "JetBrains Mono, monospace" }}
                  >
                    {activeMessages.length} MESSAGES ·{" "}
                    {activeSession &&
                      formatDate(
                        sessions.find((s) => s.id === activeSession)?.createdAt ?? ""
                      )}
                  </p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
                {activeMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "assistant" && (
                      <div className="w-7 h-7 bg-[#20201f] border border-[#4f453d] flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#e8bf9b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                      </div>
                    )}
                    <div className="max-w-[75%]">
                      <div
                        className="px-4 py-3 text-sm leading-relaxed"
                        style={
                          msg.role === "user"
                            ? { background: "#e8bf9b", color: "#2c1602", fontWeight: 500 }
                            : {
                                background: "#20201f",
                                color: "#e5e2e1",
                                borderLeft: "3px solid #e8bf9b",
                                border: "1px solid rgba(79,69,61,0.5)",
                                borderLeftColor: "#e8bf9b",
                              }
                        }
                      >
                        {msg.content}
                      </div>
                      <p className="text-[10px] text-[#4f453d] mt-1 px-1" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                        {formatDate(msg.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
