"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import Footer from "@/components/Footer";

interface Booking {
  id: string;
  service: string;
  date: string;
  status: string;
  paymentMethod: string;
  createdAt: string;
  mpesaReceiptNumber?: string;
}

interface ChatSession {
  id: string;
  createdAt: string;
  messages: { role: string; content: string }[];
}

const STATUS_COLORS: Record<string, string> = {
  pending: "#ffb785",
  awaiting_payment: "#facc15",
  confirmed: "#4ade80",
  completed: "#60a5fa",
  cancelled: "#f87171",
};

const STATUS_ICONS: Record<string, string> = {
  pending: "schedule",
  awaiting_payment: "payments",
  confirmed: "check_circle",
  completed: "verified",
  cancelled: "cancel",
};

const ORDER_STEPS = [
  { key: "pending", label: "Received" },
  { key: "confirmed", label: "Confirmed" },
  { key: "in_progress", label: "In Fabrication" },
  { key: "quality_check", label: "Quality Check" },
  { key: "completed", label: "Ready" },
];

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeBooking, setActiveBooking] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded || !user) return;
    fetchData();
  }, [isLoaded, user]);

  const fetchData = async () => {
  setIsLoading(true);
  try {
    const bRes = await fetch("/api/bookings");
    const bText = await bRes.text();
    console.log("Bookings response:", bText);

    const cRes = await fetch("/api/chat");
    const cText = await cRes.text();
    console.log("Chat response:", cText);

    setBookings(JSON.parse(bText).bookings ?? []);
    setSessions(JSON.parse(cText).sessions ?? []);
  } catch (e) {
    console.error(e);
  } finally {
    setIsLoading(false);
  }
};

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-KE", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const getStepIndex = (status: string) => {
    if (status === "pending") return 0;
    if (status === "confirmed") return 1;
    if (status === "in_progress") return 2;
    if (status === "quality_check") return 3;
    if (status === "completed") return 4;
    return 0;
  };

  const activeBookingData = bookings.find((b) => b.id === activeBooking);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#131313] flex items-center justify-center">
        <div className="flex gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-3 h-3 bg-[#e8bf9b] rounded-full animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
          ))}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#131313] flex flex-col items-center justify-center text-[#e5e2e1] gap-6">
        <span className="material-symbols-outlined text-6xl text-[#4f453d]">lock</span>
        <h2 className="text-2xl font-semibold" style={{ fontFamily: "Playfair Display, serif" }}>
          Sign in to access your dashboard
        </h2>
        <Link href="/" className="bg-[#e8bf9b] text-[#442b12] px-8 py-3 text-sm font-semibold">
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <main className="bg-[#131313] text-[#e5e2e1] min-h-screen">
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')" }}
      />

      <div className="relative z-10 pt-32 pb-24 max-w-[1440px] mx-auto px-4 md:px-16">

        {/* Welcome Header */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="text-xs text-[#ffb785] uppercase tracking-[0.2em] mb-3 block" style={{ fontFamily: "JetBrains Mono, monospace" }}>
              Welcome Back
            </span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight" style={{ fontFamily: "Playfair Display, serif" }}>
              {user.firstName ? `${user.firstName}'s Atelier` : "Your Atelier"}
            </h1>
            <p className="text-[#9c8e84] mt-2">{user.primaryEmailAddress?.emailAddress}</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/booking"
              className="bg-[#e8bf9b] text-[#442b12] px-6 py-3 text-sm font-semibold hover:brightness-110 transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              New Booking
            </Link>
            <Link
              href="/portfolio"
              className="border border-[#4f453d] text-[#d3c4b9] px-6 py-3 text-sm font-semibold hover:border-[#e8bf9b] transition-colors"
            >
              Portfolio
            </Link>
          </div>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: "TOTAL BOOKINGS", value: bookings.length, icon: "calendar_month" },
            { label: "CONFIRMED", value: bookings.filter((b) => b.status === "confirmed" || b.status === "completed").length, icon: "check_circle" },
            { label: "PENDING", value: bookings.filter((b) => b.status === "pending" || b.status === "awaiting_payment").length, icon: "schedule" },
            { label: "CHAT SESSIONS", value: sessions.length, icon: "chat_bubble" },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#20201f] border border-[#4f453d]/40 p-6">
              <span className="material-symbols-outlined text-[#e8bf9b] text-xl mb-3 block">{stat.icon}</span>
              <p className="text-3xl font-bold mb-1" style={{ fontFamily: "Playfair Display, serif" }}>{stat.value}</p>
              <p className="text-xs text-[#9c8e84] tracking-widest" style={{ fontFamily: "JetBrains Mono, monospace" }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {isLoading && (
          <div className="flex justify-center py-20">
            <div className="flex gap-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-3 h-3 bg-[#e8bf9b] rounded-full animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
              ))}
            </div>
          </div>
        )}

        {!isLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Left Column */}
            <div className="lg:col-span-8 space-y-6">

              {/* Order Tracker */}
              {bookings.length > 0 && (
                <section className="bg-[#20201f] border border-[#4f453d]/40">
                  <div className="p-6 border-b border-[#4f453d]/40 flex items-center justify-between">
                    <h2 className="text-xl font-semibold" style={{ fontFamily: "Playfair Display, serif" }}>
                      Order Tracker
                    </h2>
                    {bookings.length > 1 && (
                      <select
                        value={activeBooking ?? ""}
                        onChange={(e) => setActiveBooking(e.target.value)}
                        className="bg-[#131313] border border-[#4f453d] text-xs px-3 py-2 text-[#e5e2e1] outline-none"
                        style={{ fontFamily: "JetBrains Mono, monospace" }}
                      >
                        {bookings.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.service} — {formatDate(b.createdAt)}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                  {activeBookingData && (
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <p className="font-semibold capitalize">{activeBookingData.service}</p>
                          <p className="text-xs text-[#9c8e84]">{activeBookingData.date}</p>
                        </div>
                        <span
                          className="text-xs px-3 py-1 border"
                          style={{
                            borderColor: STATUS_COLORS[activeBookingData.status],
                            color: STATUS_COLORS[activeBookingData.status],
                            fontFamily: "JetBrains Mono, monospace",
                          }}
                        >
                          {activeBookingData.status.replace("_", " ").toUpperCase()}
                        </span>
                      </div>

                      {/* Progress Steps */}
                      <div className="relative">
                        <div className="absolute top-4 left-0 right-0 h-[2px] bg-[#4f453d]/40 mx-8" />
                        <div
                          className="absolute top-4 left-0 h-[2px] bg-[#e8bf9b] mx-8 transition-all duration-700"
                          style={{ width: `${(getStepIndex(activeBookingData.status) / (ORDER_STEPS.length - 1)) * 100}%` }}
                        />
                        <div className="relative flex justify-between">
                          {ORDER_STEPS.map((step, i) => {
                            const currentStep = getStepIndex(activeBookingData.status);
                            const isCompleted = i < currentStep;
                            const isCurrent = i === currentStep;
                            return (
                              <div key={step.key} className="flex flex-col items-center gap-2">
                                <div
                                  className="w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-500 z-10"
                                  style={{
                                    background: isCompleted || isCurrent ? "#e8bf9b" : "#131313",
                                    borderColor: isCompleted || isCurrent ? "#e8bf9b" : "#4f453d",
                                  }}
                                >
                                  {isCompleted ? (
                                    <span className="material-symbols-outlined text-[#442b12] text-sm">check</span>
                                  ) : isCurrent ? (
                                    <div className="w-2 h-2 bg-[#442b12] rounded-full" />
                                  ) : (
                                    <div className="w-2 h-2 bg-[#4f453d] rounded-full" />
                                  )}
                                </div>
                                <span
                                  className="text-[10px] text-center w-16"
                                  style={{
                                    color: isCompleted || isCurrent ? "#e8bf9b" : "#9c8e84",
                                    fontFamily: "JetBrains Mono, monospace",
                                  }}
                                >
                                  {step.label}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {activeBookingData.mpesaReceiptNumber && (
                        <div className="mt-6 p-4 bg-[#131313] border border-[#4f453d]/40 flex items-center gap-3">
                          <span className="material-symbols-outlined text-[#4ade80] text-sm">receipt</span>
                          <div>
                            <p className="text-xs text-[#9c8e84]" style={{ fontFamily: "JetBrains Mono, monospace" }}>M-PESA RECEIPT</p>
                            <p className="text-sm font-semibold">{activeBookingData.mpesaReceiptNumber}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </section>
              )}

              {/* My Bookings */}
              <section className="bg-[#20201f] border border-[#4f453d]/40">
                <div className="p-6 border-b border-[#4f453d]/40 flex justify-between items-center">
                  <h2 className="text-xl font-semibold" style={{ fontFamily: "Playfair Display, serif" }}>
                    My Bookings
                  </h2>
                  <Link href="/booking" className="text-xs text-[#e8bf9b] hover:underline" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                    + NEW
                  </Link>
                </div>
                {bookings.length === 0 ? (
                  <div className="p-12 text-center">
                    <span className="material-symbols-outlined text-4xl text-[#4f453d] mb-4 block">calendar_month</span>
                    <p className="text-[#9c8e84] mb-6">No bookings yet.</p>
                    <Link href="/booking" className="bg-[#e8bf9b] text-[#442b12] px-8 py-3 text-sm font-semibold">
                      Book a Consultation
                    </Link>
                  </div>
                ) : (
                  <div className="divide-y divide-[#4f453d]/20">
                    {bookings.map((b) => (
                      <div
                        key={b.id}
                        className="p-5 flex items-center justify-between hover:bg-[#131313] transition-colors cursor-pointer"
                        onClick={() => setActiveBooking(b.id)}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className="w-10 h-10 flex items-center justify-center border"
                            style={{ borderColor: STATUS_COLORS[b.status] }}
                          >
                            <span
                              className="material-symbols-outlined text-sm"
                              style={{ color: STATUS_COLORS[b.status] }}
                            >
                              {STATUS_ICONS[b.status] ?? "schedule"}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold capitalize">{b.service}</p>
                            <p className="text-xs text-[#9c8e84]">{b.date} · {b.paymentMethod}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span
                            className="text-xs px-2 py-1 border block mb-1"
                            style={{
                              borderColor: STATUS_COLORS[b.status],
                              color: STATUS_COLORS[b.status],
                              fontFamily: "JetBrains Mono, monospace",
                            }}
                          >
                            {b.status.replace("_", " ").toUpperCase()}
                          </span>
                          <p className="text-xs text-[#4f453d]">{formatDate(b.createdAt)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-4 space-y-6">

              {/* Quick Actions */}
              <section className="bg-[#20201f] border border-[#4f453d]/40 p-6">
                <h2 className="text-lg font-semibold mb-6" style={{ fontFamily: "Playfair Display, serif" }}>
                  Quick Actions
                </h2>
                <div className="space-y-3">
                  {[
                    { href: "/booking", icon: "calendar_add_on", label: "Book Consultation", sub: "KES 5,000 fee" },
                    { href: "/portfolio", icon: "photo_library", label: "View Portfolio", sub: "Our past work" },
                    { href: "/services", icon: "build", label: "Our Services", sub: "What we offer" },
                    { href: "/chat-history", icon: "chat_bubble", label: "Chat History", sub: `${sessions.length} sessions` },
                  ].map((action) => (
                    <Link
                      key={action.href}
                      href={action.href}
                      className="flex items-center gap-4 p-4 border border-[#4f453d]/40 hover:border-[#e8bf9b] hover:bg-[#131313] transition-all group"
                    >
                      <span className="material-symbols-outlined text-[#e8bf9b] text-xl">{action.icon}</span>
                      <div>
                        <p className="text-sm font-semibold group-hover:text-[#e8bf9b] transition-colors">{action.label}</p>
                        <p className="text-xs text-[#9c8e84]">{action.sub}</p>
                      </div>
                      <span className="material-symbols-outlined text-[#4f453d] group-hover:text-[#e8bf9b] ml-auto transition-colors text-sm">
                        arrow_forward
                      </span>
                    </Link>
                  ))}
                </div>
              </section>

              {/* Recent Chats */}
              <section className="bg-[#20201f] border border-[#4f453d]/40">
                <div className="p-6 border-b border-[#4f453d]/40 flex justify-between items-center">
                  <h2 className="text-lg font-semibold" style={{ fontFamily: "Playfair Display, serif" }}>
                    Recent Chats
                  </h2>
                  <Link href="/chat-history" className="text-xs text-[#e8bf9b] hover:underline" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                    VIEW ALL
                  </Link>
                </div>
                {sessions.length === 0 ? (
                  <div className="p-8 text-center">
                    <span className="material-symbols-outlined text-3xl text-[#4f453d] mb-3 block">chat_bubble</span>
                    <p className="text-sm text-[#9c8e84]">No chats yet. Ask the AI Artisan anything!</p>
                  </div>
                ) : (
                  <div className="divide-y divide-[#4f453d]/20">
                    {sessions.slice(0, 4).map((session, i) => {
                      const firstMsg = session.messages.find((m) => m.role === "user");
                      return (
                        <Link
                          key={session.id}
                          href="/chat-history"
                          className="block p-4 hover:bg-[#131313] transition-colors"
                        >
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-xs text-[#e8bf9b]" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                              SESSION {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="text-[10px] text-[#4f453d]">{session.messages.length} msgs</span>
                          </div>
                          <p className="text-sm text-[#d3c4b9] line-clamp-2">
                            {firstMsg?.content ?? "New conversation"}
                          </p>
                          <p className="text-[10px] text-[#4f453d] mt-1" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                            {formatDate(session.createdAt)}
                          </p>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </section>

              {/* Contact Card */}
              <section className="bg-[#0e0e0e] border border-[#4f453d]/40 p-6">
                <h2 className="text-lg font-semibold mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
                  Need Help?
                </h2>
                <div className="space-y-3">
                  <a href="tel:+254726461196" className="flex items-center gap-3 text-sm text-[#d3c4b9] hover:text-[#e8bf9b] transition-colors">
                    <span className="material-symbols-outlined text-[#e8bf9b] text-sm">call</span>
                    +254 726 461 196
                  </a>
                    <a href="mailto:info@tuistech.co.ke" className="flex items-center gap-3 text-sm text-[#d3c4b9] hover:text-[#e8bf9b] transition-colors">
                    <span className="material-symbols-outlined text-[#e8bf9b] text-sm">mail</span>
                    info@tuistech.co.ke
                  </a>
                </div>
                <div className="mt-6 pt-4 border-t border-[#4f453d]/30">
                  <p className="text-xs text-[#4f453d] tracking-widest" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                    HANDMADE IN NAIROBI, KENYA
                  </p>
                </div>
              </section>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
