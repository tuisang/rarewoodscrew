"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

const SERVICES = ["Custom Furniture", "Kitchen Cabinets", "Bedroom & Wardrobes", "Doors & Staircases", "Restoration & Repair", "Commercial Joinery"];
const WOOD_SPECIES = ["African Mvule", "African Mahogany", "Black Walnut", "Cherry Wood", "Pine (Treated)", "Not Sure Yet"];
const FINISHES = ["Natural Oil", "Matte Lacquer", "Gloss Varnish", "Stained Walnut Tone", "Whitewash", "Not Applicable"];
const BUDGETS = ["KSh 15,000 – 50,000", "KSh 50,000 – 150,000", "KSh 150,000 – 500,000", "KSh 500,000+", "Flexible / To Be Discussed"];
const TIMELINES = ["ASAP (Rush Order)", "1–4 Weeks", "1–3 Months", "3–6 Months", "6+ Months", "Flexible"];

type Status = "idle" | "submitting" | "success" | "error";

export default function QuotePage() {
  const [status, setStatus] = useState<Status>("idle");
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    service: "", woodSpecies: "", finish: "",
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
      <main className="bg-background text-on-surface min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24">
        <div className="w-20 h-20 border border-primary/30 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#994700" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h2 className="font-headline-lg text-3xl font-bold mb-4">Quote Request Submitted!</h2>
        <p className="font-body-md text-on-surface-variant max-w-md mb-8">
          Thank you, <span className="text-primary font-semibold">{form.name}</span>. Our artisans will review your request and get back to you at <span className="text-primary font-semibold">{form.email}</span> within 24 hours.
        </p>
        <div className="flex gap-4">
          <Link href="/" className="bg-primary text-on-primary px-8 py-3 rounded-lg text-sm font-bold hover:bg-primary-container transition-all">Back to Home</Link>
          <Link href="/dashboard" className="border border-outline-variant text-on-surface-variant px-8 py-3 rounded-lg text-sm font-bold hover:border-primary hover:text-primary transition-colors">My Dashboard</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-background text-on-surface min-h-screen">
      <div className="pt-32 pb-24 max-w-[1000px] mx-auto px-4 md:px-16">

        <header className="mb-12">
          <span className="font-label-caps text-xs text-primary uppercase tracking-[0.2em] mb-4 block">
            Get a Quote
          </span>
          <h1 className="font-headline-lg text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Request a Custom Quote
          </h1>
          <p className="font-body-md text-on-surface-variant max-w-2xl">
            Tell us about your project in detail. The more we know, the more accurate and fast your quote will be. We respond within 24 hours.
          </p>
        </header>

        <div className="space-y-8">

          {/* Step 1: Contact */}
          <section className="tactile-card rounded-xl p-8">
            <h2 className="font-headline-md text-xl font-semibold mb-6 flex items-center gap-3">
              <span className="step-number text-primary text-base font-bold">01</span>
              Your Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Full Name *", field: "name", type: "text", placeholder: "John Kamau" },
                { label: "Email Address *", field: "email", type: "email", placeholder: "john@email.com" },
                { label: "Phone Number *", field: "phone", type: "tel", placeholder: "+254 7XX XXX XXX" },
              ].map((f) => (
                <div key={f.field}>
                  <label className="font-label-caps text-xs text-outline mb-2 block tracking-widest">{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.field as keyof typeof form]}
                    onChange={(e) => set(f.field, e.target.value)}
                    className="w-full bg-transparent border-b border-outline-variant focus:border-primary py-2 text-on-surface placeholder-outline outline-none transition-colors"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Step 2: Project Specs */}
          <section className="tactile-card rounded-xl p-8">
            <h2 className="font-headline-md text-xl font-semibold mb-6 flex items-center gap-3">
              <span className="step-number text-primary text-base font-bold">02</span>
              Project Specifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="md:col-span-2">
                <label className="font-label-caps text-xs text-outline mb-3 block tracking-widest">SERVICE REQUIRED *</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {SERVICES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => set("service", s)}
                      className={`p-3 rounded-lg text-sm text-left border transition-all ${
                        form.service === s ? "border-primary bg-primary/10 text-primary font-semibold" : "border-outline-variant text-on-surface-variant hover:border-primary/50"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-label-caps text-xs text-outline mb-2 block tracking-widest">PREFERRED WOOD SPECIES</label>
                <select
                  value={form.woodSpecies}
                  onChange={(e) => set("woodSpecies", e.target.value)}
                  className="w-full bg-transparent border-b border-outline-variant focus:border-primary py-2 text-on-surface outline-none transition-colors"
                >
                  <option value="">Select wood species (optional)</option>
                  {WOOD_SPECIES.map((w) => <option key={w} value={w}>{w}</option>)}
                </select>
              </div>

              <div>
                <label className="font-label-caps text-xs text-outline mb-2 block tracking-widest">FINISH</label>
                <select
                  value={form.finish}
                  onChange={(e) => set("finish", e.target.value)}
                  className="w-full bg-transparent border-b border-outline-variant focus:border-primary py-2 text-on-surface outline-none transition-colors"
                >
                  <option value="">Select finish</option>
                  {FINISHES.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="font-label-caps text-xs text-outline mb-2 block tracking-widest">DIMENSIONS / SIZE</label>
                <input
                  type="text"
                  placeholder="e.g. 180cm × 90cm dining table, 6 seater"
                  value={form.dimensions}
                  onChange={(e) => set("dimensions", e.target.value)}
                  className="w-full bg-transparent border-b border-outline-variant focus:border-primary py-2 text-on-surface placeholder-outline outline-none transition-colors"
                />
              </div>
            </div>
          </section>

          {/* Step 3: Budget & Timeline */}
          <section className="tactile-card rounded-xl p-8">
            <h2 className="font-headline-md text-xl font-semibold mb-6 flex items-center gap-3">
              <span className="step-number text-primary text-base font-bold">03</span>
              Budget &amp; Timeline
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="font-label-caps text-xs text-outline mb-3 block tracking-widest">BUDGET RANGE *</label>
                <div className="space-y-2">
                  {BUDGETS.map((b) => (
                    <label key={b} onClick={() => set("budget", b)} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${form.budget === b ? "border-primary bg-primary/5" : "border-outline-variant hover:border-primary/50"}`}>
                      <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${form.budget === b ? "bg-primary border-primary" : "border-outline"}`} />
                      <span className="text-sm text-on-surface">{b}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="font-label-caps text-xs text-outline mb-3 block tracking-widest">DESIRED TIMELINE *</label>
                <div className="space-y-2">
                  {TIMELINES.map((t) => (
                    <label key={t} onClick={() => set("timeline", t)} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${form.timeline === t ? "border-primary bg-primary/5" : "border-outline-variant hover:border-primary/50"}`}>
                      <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${form.timeline === t ? "bg-primary border-primary" : "border-outline"}`} />
                      <span className="text-sm text-on-surface">{t}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Step 4: Description & Upload */}
          <section className="tactile-card rounded-xl p-8">
            <h2 className="font-headline-md text-xl font-semibold mb-6 flex items-center gap-3">
              <span className="step-number text-primary text-base font-bold">04</span>
              Project Description
            </h2>
            <div className="space-y-6">
              <div>
                <label className="font-label-caps text-xs text-outline mb-2 block tracking-widest">DESCRIBE YOUR PROJECT *</label>
                <textarea
                  rows={5}
                  placeholder="Tell us everything — style, inspiration, how it will be used, any special requirements, room context, colour palette..."
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline-variant focus:border-primary rounded-lg p-4 text-on-surface placeholder-outline outline-none transition-colors resize-none"
                />
                <p className="text-xs text-outline mt-1">{form.description.length} characters — more detail = faster, more accurate quote</p>
              </div>

              <div>
                <label className="font-label-caps text-xs text-outline mb-2 block tracking-widest">UPLOAD SKETCHES / INSPIRATION (OPTIONAL)</label>
                <label htmlFor="quoteFile" className="border-2 border-dashed border-outline-variant hover:border-primary rounded-lg p-8 text-center cursor-pointer block transition-colors group">
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
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={uploadPreview} alt="Preview" className="max-h-28 object-contain rounded-lg" />
                      <p className="text-sm text-primary">{uploadedFile?.name}</p>
                    </div>
                  ) : uploadedFile ? (
                    <div className="flex flex-col items-center gap-2">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#994700" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                      <p className="text-sm text-primary">{uploadedFile.name}</p>
                    </div>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-3xl text-outline group-hover:text-primary transition-colors block mb-2">cloud_upload</span>
                      <p className="text-on-surface-variant text-sm">Drop files here or <span className="text-primary underline">browse</span></p>
                      <p className="text-xs text-outline mt-1">PNG, JPG, PDF up to 10MB</p>
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
              className="w-full md:w-auto px-16 py-4 rounded-lg text-sm font-bold transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 bg-primary text-on-primary hover:bg-primary-container"
            >
              {status === "submitting" ? (
                <>
                  <div className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
                  SUBMITTING...
                </>
              ) : "SUBMIT QUOTE REQUEST →"}
            </button>
            {status === "error" && (
              <p className="text-error text-sm">Something went wrong. Please try again.</p>
            )}
            <p className="text-xs text-outline">We respond within 24 hours · No obligation</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
