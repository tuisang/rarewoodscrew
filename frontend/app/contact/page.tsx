"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const set = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return alert("Please fill all required fields.");
    setSent(true);
  };

  return (
    <main className="bg-[#131313] text-[#e5e2e1] min-h-screen">
      <div className="pt-32 pb-24 max-w-[1440px] mx-auto px-4 md:px-16">

        {/* Header */}
        <header className="mb-16">
          <span className="text-xs text-[#ffb785] uppercase tracking-[0.2em] mb-4 block" style={{ fontFamily: "JetBrains Mono, monospace" }}>
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
            Visit the Atelier
          </h1>
          <p className="text-[#d3c4b9] max-w-xl">
            We welcome clients by appointment at our Nairobi workshop. Drop us a message and we&apos;ll be in touch within 24 hours.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Left - Contact Info + Map */}
          <div className="lg:col-span-5 space-y-8">

            {/* Contact Details */}
            <div className="bg-[#20201f] border border-[#4f453d]/40 p-8">
              <h2 className="text-xl font-semibold mb-6" style={{ fontFamily: "Playfair Display, serif" }}>Contact Details</h2>
              <div className="space-y-5">
                {[
                  { icon: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z", label: "Location", value: "Embakasi Aviation, Nairobi, Kenya" },
                  { icon: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z", label: "Phone", value: "+254 726 461 196", href: "tel:+254726461196" },
                  { icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22,6 12,13 2,6", label: "Email", value: "alex2000rui@gmail.com", href: "mailto:alex2000rui@gmail.com" },
                  { icon: "M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z M12 6v6l4 2", label: "Hours", value: "Mon–Fri: 8am–6pm · Sat: 9am–3pm" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-[#4f453d] flex items-center justify-center flex-shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e8bf9b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d={item.icon}/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-[#9c8e84] tracking-widest mb-1" style={{ fontFamily: "JetBrains Mono, monospace" }}>{item.label.toUpperCase()}</p>
                      {item.href ? (
                        <a href={item.href} className="text-sm text-[#d3c4b9] hover:text-[#e8bf9b] transition-colors">{item.value}</a>
                      ) : (
                        <p className="text-sm text-[#d3c4b9]">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-[#4f453d]/30 flex gap-3">
                <a
                  href="https://wa.me/254726461196?text=Hello%20Forge%20%26%20Timber!%20I%27d%20like%20to%20visit%20your%20workshop."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white text-xs font-semibold hover:brightness-110 transition-all rounded"
                  style={{ fontFamily: "JetBrains Mono, monospace" }}
                >
                  WhatsApp
                </a>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=-1.3149,36.9037"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 border border-[#e8bf9b] text-[#e8bf9b] text-xs font-semibold hover:bg-[#e8bf9b]/10 transition-all"
                  style={{ fontFamily: "JetBrains Mono, monospace" }}
                >
                  Get Directions
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="relative w-full overflow-hidden rounded-xl border border-[#4f453d]/40" style={{ height: "300px" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15959.876!2d36.9037!3d-1.3149!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f11c2a1c7b1a1%3A0x1234!2sEmbakasi%2C+Nairobi%2C+Kenya!5e0!3m2!1sen!2ske!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.8)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Forge & Timber Location"
              />
              <div className="absolute top-4 left-4 bg-[#0e0e0e]/90 border border-[#e8bf9b]/30 px-3 py-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-[#e8bf9b] rounded-full animate-pulse" />
                <span className="text-xs text-[#e8bf9b]" style={{ fontFamily: "JetBrains Mono, monospace" }}>EMBAKASI · NAIROBI</span>
              </div>
            </div>
          </div>

          {/* Right - Message Form */}
          <div className="lg:col-span-7">
            {sent ? (
              <div className="bg-[#20201f] border border-[#4f453d]/40 p-12 text-center h-full flex flex-col items-center justify-center gap-6">
                <div className="w-16 h-16 bg-[#e8bf9b]/10 border border-[#e8bf9b]/30 rounded-full flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e8bf9b" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h2 className="text-2xl font-semibold" style={{ fontFamily: "Playfair Display, serif" }}>Message Sent!</h2>
                <p className="text-[#d3c4b9] max-w-sm">Thank you, <span className="text-[#e8bf9b]">{form.name}</span>. We&apos;ll get back to you within 24 hours.</p>
                <Link href="/" className="bg-[#e8bf9b] text-[#442b12] px-8 py-3 text-sm font-semibold hover:brightness-110 transition-all">Back to Home</Link>
              </div>
            ) : (
              <div className="bg-[#20201f] border border-[#4f453d]/40 p-8">
                <h2 className="text-2xl font-semibold mb-8" style={{ fontFamily: "Playfair Display, serif" }}>Send a Message</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { label: "Full Name *", field: "name", type: "text", placeholder: "John Kamau" },
                      { label: "Phone Number", field: "phone", type: "tel", placeholder: "+254 7XX XXX XXX" },
                    ].map((f) => (
                      <div key={f.field}>
                        <label className="text-xs text-[#d3c4b9] mb-2 block tracking-widest" style={{ fontFamily: "JetBrains Mono, monospace" }}>{f.label}</label>
                        <input
                          type={f.type}
                          placeholder={f.placeholder}
                          value={form[f.field as keyof typeof form]}
                          onChange={(e) => set(f.field, e.target.value)}
                          className="w-full bg-[#131313] border-b border-[#4f453d] focus:border-[#e8bf9b] py-2 text-[#e5e2e1] placeholder-[#9c8e84] outline-none transition-colors"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="text-xs text-[#d3c4b9] mb-2 block tracking-widest" style={{ fontFamily: "JetBrains Mono, monospace" }}>EMAIL ADDRESS *</label>
                    <input
                      type="email"
                      placeholder="john@email.com"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      className="w-full bg-[#131313] border-b border-[#4f453d] focus:border-[#e8bf9b] py-2 text-[#e5e2e1] placeholder-[#9c8e84] outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#d3c4b9] mb-2 block tracking-widest" style={{ fontFamily: "JetBrains Mono, monospace" }}>MESSAGE *</label>
                    <textarea
                      rows={6}
                      placeholder="Tell us about your project, ask a question, or request a workshop visit..."
                      value={form.message}
                      onChange={(e) => set("message", e.target.value)}
                      className="w-full bg-[#131313] border border-[#4f453d] focus:border-[#e8bf9b] p-4 text-[#e5e2e1] placeholder-[#9c8e84] outline-none transition-colors resize-none"
                    />
                  </div>
                  <div className="flex flex-col md:flex-row gap-4 items-center">
                    <button
                      onClick={handleSubmit}
                      className="w-full md:w-auto px-12 py-4 text-sm font-semibold hover:brightness-110 transition-all active:scale-[0.98]"
                      style={{ background: "#e8bf9b", color: "#442b12", fontFamily: "JetBrains Mono, monospace" }}
                    >
                      SEND MESSAGE →
                    </button>
                    <p className="text-xs text-[#9c8e84]">We respond within 24 hours</p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-10 pt-8 border-t border-[#4f453d]/30">
                  <p className="text-xs text-[#9c8e84] tracking-widest mb-4" style={{ fontFamily: "JetBrains Mono, monospace" }}>OR JUMP STRAIGHT TO</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { href: "/booking", label: "Book Consultation", icon: "M8 2v3 M16 2v3 M3 9h18 M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" },
                      { href: "/quote", label: "Get a Quote", icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8" },
                      { href: "/portfolio", label: "View Portfolio", icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" },
                    ].map((action) => (
                      <Link
                        key={action.href}
                        href={action.href}
                        className="flex items-center gap-3 p-4 border border-[#4f453d]/40 hover:border-[#e8bf9b] hover:bg-[#131313] transition-all group"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e8bf9b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d={action.icon}/>
                        </svg>
                        <span className="text-sm text-[#d3c4b9] group-hover:text-[#e8bf9b] transition-colors">{action.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
