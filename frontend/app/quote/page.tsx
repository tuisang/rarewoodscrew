"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

const SERVICES = ["Bespoke Furniture", "Architectural Metal", "Wood-Metal Décor", "Restoration & Repairs", "Precision Welding", "Commercial Installation"];
const WOOD_SPECIES = ["African Mvule", "African Mahogany", "Black Walnut", "Cherry Wood", "Pine (Treated)", "Not Sure - Need Advice"];
const METAL_FINISHES = ["Matte Black Powder Coat", "Gunmetal Blue", "Raw Steel", "Copper Patina", "Brass Polish", "Chrome", "Not Applicable"];
const BUDGETS = ["KSh 15,000 – 50,000", "KSh 50,000 – 150,000", "KSh 150,000 – 500,000", "KSh 500,000+", "Flexible / To Be Discussed"];
const TIMELINES = ["ASAP (Rush Order)", "1–4 Weeks", "1–3 Months", "3–6 Months", "6+ Months", "Flexible"];

type Status = "idle" | "submitting" | "success" | "error";

export default function QuotePage() {
  const [status, setStatus] = useState<Status>("idle");
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    service: "", woodSpecies: "", metalFinish: "",
    dimensions: "", budget: "", timeline: "",
    description: "",
  });

  const set = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.phone || !form.service || !form.budget || !form.timeline || !form.description) {
      return alert("Please fill in all required fields.");
    }
    setStatus("submitting");

    let attachmentUrl = null;
    if (uploadedFile) {
      const fd = new FormData();
      fd.append("file", uploadedFile);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) attachmentUrl = data.url;
    }

    const res = await fetch("/api/quotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, attachmentUrl }),
    });

    if (res.ok) { setStatus("success"); }
    else { setStatus("error"); }
  };

  if (status === "success") {
    return (
      <main className="bg-[#131313] text-[#e5e2e1] min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24">
        <div className="w-20 h-20 border border-[#e8bf9b]/30 bg-[#e8bf9b]/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#e8bf9b" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "Playfair Display, serif" }}>Quote Request Submitted!</h2>
        <p className="text-[#d3c4b9] max-w-md mb-8">
          Thank you, <span className="text-[#e8bf9b]">{form.name}</span>. Our artisans will review your request and get back to you at <span className="text-[#e8bf9b]">{form.email}</span> within 24 hours.
        </p>
        <div className="flex gap-4">
          <Link href="/" className="bg-[#e8bf9b] text-[#442b12] px-8 py-3 text-sm font-semibold hover:brightness-110 transition-all">Back to Home</Link>
          <Link href="/dashboard" className="border border-[#4f453d] text-[#d3c4b9] px-8 py-3 text-sm font-semibold hover:border-[#e8bf9b] transition-colors">My Dashboard</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#131313] text-[#e5e2e1] min-h-screen">
      <div className="pt-32 pb-24 max-w-[1000px] mx-auto px-4 md:px-16">

        {/* Header */}
        <header className="mb-12">
          <span className="text-xs text-[#ffb785] uppercase tracking-[0.2em] mb-4 block" style={{ fontFamily: "JetBrains Mono, monospace" }}>
            Get a Quote
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
            Request a Custom Quote
          </h1>
          <p className="text-[#d3c4b9] max-w-2xl">
            Tell us about your project in detail. The more we know, the more accurate and fast your quote will be. We respond within 24 hours.
          </p>
        </header>

        <div className="space-y-8">

          {/* Step 1: Contact */}
          <section className="bg-[#20201f] border border-[#4f453d]/40 p-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-3" style={{ fontFamily: "Playfair Display, serif" }}>
              <span className="text-[#e8bf9b]" style={{ fontFamily: "JetBrains Mono, monospace" }}>01</span>
              Your Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Full Name *", field: "name", type: "text", placeholder: "John Kamau" },
                { label: "Email Address *", field: "email", type: "email", placeholder: "john@email.com" },
                { label: "Phone Number *", field: "phone", type: "tel", placeholder: "+254 7XX XXX XXX" },
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
          </section>

          {/* Step 2: Project Specs */}
          <section className="bg-[#20201f] border border-[#4f453d]/40 p-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-3" style={{ fontFamily: "Playfair Display, serif" }}>
              <span className="text-[#e8bf9b]" style={{ fontFamily: "JetBrains Mono, monospace" }}>02</span>
              Project Specifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Service */}
              <div className="md:col-span-2">
                <label className="text-xs text-[#d3c4b9] mb-3 block tracking-widest" style={{ fontFamily: "JetBrains Mono, monospace" }}>SERVICE REQUIRED *</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {SERVICES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => set("service", s)}
                      className={`p-3 text-sm text-left border transition-all ${
                        form.service === s ? "border-[#e8bf9b] bg-[#e8bf9b]/10 text-[#e8bf9b]" : "border-[#4f453d] text-[#d3c4b9] hover:border-[#e8bf9b]/50"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Wood Species */}
              <div>
                <label className="text-xs text-[#d3c4b9] mb-2 block tracking-widest" style={{ fontFamily: "JetBrains Mono, monospace" }}>PREFERRED WOOD</label>
                <select
                  value={form.woodSpecies}
                  onChange={(e) => set("woodSpecies", e.target.value)}
                  className="w-full bg-[#131313] border-b border-[#4f453d] focus:border-[#e8bf9b] py-2 text-[#e5e2e1] outline-none transition-colors"
                >
                  <option value="">Select wood species</option>
                  {WOOD_SPECIES.map((w) => <option key={w} value={w}>{w}</option>)}
                </select>
              </div>

              {/* Metal Finish */}
              <div>
                <label className="text-xs text-[#d3c4b9] mb-2 block tracking-widest" style={{ fontFamily: "JetBrains Mono, monospace" }}>METAL FINISH</label>
                <select
                  value={form.metalFinish}
                  onChange={(e) => set("metalFinish", e.target.value)}
                  className="w-full bg-[#131313] border-b border-[#4f453d] focus:border-[#e8bf9b] py-2 text-[#e5e2e1] outline-none transition-colors"
                >
                  <option value="">Select finish</option>
                  {METAL_FINISHES.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>

              {/* Dimensions */}
              <div className="md:col-span-2">
                <label className="text-xs text-[#d3c4b9] mb-2 block tracking-widest" style={{ fontFamily: "JetBrains Mono, monospace" }}>DIMENSIONS / SIZE</label>
                <input
                  type="text"
                  placeholder="e.g. 180cm × 90cm dining table, 6 seater"
                  value={form.dimensions}
                  onChange={(e) => set("dimensions", e.target.value)}
                  className="w-full bg-[#131313] border-b border-[#4f453d] focus:border-[#e8bf9b] py-2 text-[#e5e2e1] placeholder-[#9c8e84] outline-none transition-colors"
                />
              </div>
            </div>
          </section>

          {/* Step 3: Budget & Timeline */}
          <section className="bg-[#20201f] border border-[#4f453d]/40 p-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-3" style={{ fontFamily: "Playfair Display, serif" }}>
              <span className="text-[#e8bf9b]" style={{ fontFamily: "JetBrains Mono, monospace" }}>03</span>
              Budget &amp; Timeline
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="text-xs text-[#d3c4b9] mb-3 block tracking-widest" style={{ fontFamily: "JetBrains Mono, monospace" }}>BUDGET RANGE *</label>
                <div className="space-y-2">
                  {BUDGETS.map((b) => (
                    <label key={b} onClick={() => set("budget", b)} className={`flex items-center gap-3 p-3 border cursor-pointer transition-all ${form.budget === b ? "border-[#e8bf9b] bg-[#e8bf9b]/5" : "border-[#4f453d] hover:border-[#e8bf9b]/50"}`}>
                      <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${form.budget === b ? "bg-[#e8bf9b] border-[#e8bf9b]" : "border-[#9c8e84]"}`} />
                      <span className="text-sm">{b}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-[#d3c4b9] mb-3 block tracking-widest" style={{ fontFamily: "JetBrains Mono, monospace" }}>DESIRED TIMELINE *</label>
                <div className="space-y-2">
                  {TIMELINES.map((t) => (
                    <label key={t} onClick={() => set("timeline", t)} className={`flex items-center gap-3 p-3 border cursor-pointer transition-all ${form.timeline === t ? "border-[#e8bf9b] bg-[#e8bf9b]/5" : "border-[#4f453d] hover:border-[#e8bf9b]/50"}`}>
                      <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${form.timeline === t ? "bg-[#e8bf9b] border-[#e8bf9b]" : "border-[#9c8e84]"}`} />
                      <span className="text-sm">{t}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Step 4: Description & Upload */}
          <section className="bg-[#20201f] border border-[#4f453d]/40 p-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-3" style={{ fontFamily: "Playfair Display, serif" }}>
              <span className="text-[#e8bf9b]" style={{ fontFamily: "JetBrains Mono, monospace" }}>04</span>
              Project Description
            </h2>
            <div className="space-y-6">
              <div>
                <label className="text-xs text-[#d3c4b9] mb-2 block tracking-widest" style={{ fontFamily: "JetBrains Mono, monospace" }}>DESCRIBE YOUR PROJECT *</label>
                <textarea
                  rows={5}
                  placeholder="Tell us everything — style, inspiration, how it will be used, any special requirements, room context, colour palette..."
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  className="w-full bg-[#131313] border border-[#4f453d] focus:border-[#e8bf9b] p-4 text-[#e5e2e1] placeholder-[#9c8e84] outline-none transition-colors resize-none"
                />
                <p className="text-xs text-[#9c8e84] mt-1">{form.description.length} characters — more detail = faster, more accurate quote</p>
              </div>

              {/* File Upload */}
              <div>
                <label className="text-xs text-[#d3c4b9] mb-2 block tracking-widest" style={{ fontFamily: "JetBrains Mono, monospace" }}>UPLOAD SKETCHES / INSPIRATION (OPTIONAL)</label>
                <label htmlFor="quoteFile" className="border-2 border-dashed border-[#4f453d] hover:border-[#e8bf9b] p-8 text-center cursor-pointer block transition-colors group">
                  <input
                    id="quoteFile"
                    type="file"
                    className="hidden"
                    accept=".jpg,.jpeg,.png,.webp,.pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setUploadedFile(file);
                      if (file.type.startsWith("image/")) {
                        setUploadPreview(URL.createObjectURL(file));
                      } else {
                        setUploadPreview(null);
                      }
                    }}
                  />
                  {uploadPreview ? (
                    <div className="flex flex-col items-center gap-2">
                      <img src={uploadPreview} alt="Preview" className="max-h-28 object-contain rounded-lg" />
                      <p className="text-sm text-[#e8bf9b]">{uploadedFile?.name}</p>
                    </div>
                  ) : uploadedFile ? (
                    <div className="flex flex-col items-center gap-2">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#e8bf9b" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                      <p className="text-sm text-[#e8bf9b]">{uploadedFile.name}</p>
                    </div>
                  ) : (
                    <>
                      <svg className="mx-auto mb-3 text-[#4f453d] group-hover:text-[#e8bf9b] transition-colors" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>
                      <p className="text-[#d3c4b9] text-sm">Drop files here or <span className="text-[#e8bf9b] underline">browse</span></p>
                      <p className="text-xs text-[#9c8e84] mt-1">PNG, JPG, PDF up to 10MB</p>
                    </>
                  )}
                </label>
              </div>
            </div>
          </section>

          {/* Submit */}
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <button
              onClick={handleSubmit}
              disabled={status === "submitting"}
              className="w-full md:w-auto px-16 py-4 text-sm font-semibold transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3"
              style={{ background: "#e8bf9b", color: "#442b12", fontFamily: "JetBrains Mono, monospace" }}
            >
              {status === "submitting" ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#442b12] border-t-transparent rounded-full animate-spin" />
                  SUBMITTING...
                </>
              ) : "SUBMIT QUOTE REQUEST →"}
            </button>
            {status === "error" && (
              <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
            )}
            <p className="text-xs text-[#9c8e84]">We respond within 24 hours · No obligation</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
