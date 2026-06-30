"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

interface FormData {
  name: string;
  contact: string;
  location: string;
  description: string;
}

type SubmitStatus = "idle" | "creating" | "stk_sent" | "confirmed" | "error";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstWeekdayOffset(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return (day + 6) % 7;
}

const CONSULTATION_TYPES = [
  { id: "phone", icon: "call", label: "Phone" },
  { id: "whatsapp", icon: "chat", label: "WhatsApp" },
  { id: "video", icon: "videocam", label: "Video Call" },
  { id: "onsite", icon: "location_on", label: "On-site Visit" },
];

const AVAILABLE_SLOTS = ["09:00 AM", "11:30 AM", "02:00 PM", "04:30 PM"];

export default function BookingPage() {
  const [consultationType, setConsultationType] = useState<string | null>(null);
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({ name: "", contact: "", location: "", description: "" });
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [checkoutId, setCheckoutId] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadPreviews, setUploadPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInput = (field: keyof FormData, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const goToPrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const goToNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).slice(0, 3 - uploadedFiles.length);
    if (files.length === 0) return;
    setUploadedFiles((prev) => [...prev, ...files]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => setUploadPreviews((prev) => [...prev, reader.result as string]);
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (idx: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== idx));
    setUploadPreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async () => {
    if (!consultationType) return setErrorMsg("Please choose a consultation type.");
    if (!selectedDate || !selectedSlot) return setErrorMsg("Please select a date and time.");
    if (!formData.name || !formData.contact)
      return setErrorMsg("Please fill in your name and contact info.");

    setErrorMsg(null);
    setSubmitStatus("creating");

    try {
      let attachmentUrl: string | null = null;
      if (uploadedFiles.length > 0) {
        const fd = new FormData();
        fd.append("file", uploadedFiles[0]);
        const uploadRes = await fetch("/api/upload", { method: "POST", body: fd });
        const uploadData = await uploadRes.json();
        if (uploadData.url) attachmentUrl = uploadData.url;
      }

      const bookingRes = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.contact,
          email: formData.contact.includes("@") ? formData.contact : "",
          service: consultationType,
          location: formData.location,
          description: formData.description,
          date: selectedDate ? selectedDate.toISOString() : "TBD",
          slot: selectedSlot,
          paymentMethod: "mpesa",
          attachmentUrl,
        }),
      });

      if (!bookingRes.ok) throw new Error("Failed to create booking.");
      const { booking } = await bookingRes.json();
      setBookingId(booking.id);

      setSubmitStatus("stk_sent");
      const stkRes = await fetch("/api/mpesa/stk-push", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: formData.contact, bookingId: booking.id }),
      });
      const stkData = await stkRes.json();
      if (!stkRes.ok) throw new Error(stkData.error ?? "STK push failed.");
      setCheckoutId(stkData.checkoutRequestId);
      pollPaymentStatus(booking.id);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setSubmitStatus("error");
    }
  };

  const pollPaymentStatus = (id: string) => {
    let attempts = 0;
    const interval = setInterval(async () => {
      attempts++;
      try {
        const res = await fetch(`/api/bookings/${id}`);
        const data = await res.json();
        if (data.booking?.status === "confirmed") {
          setSubmitStatus("confirmed");
          clearInterval(interval);
        } else if (data.booking?.status === "pending" && attempts > 5) {
          setSubmitStatus("error");
          setErrorMsg("Payment was not completed. Please try again.");
          clearInterval(interval);
        }
      } catch {
        clearInterval(interval);
      }
      if (attempts >= 10) clearInterval(interval);
    }, 3000);
  };

  const isSubmitting = submitStatus === "creating" || submitStatus === "stk_sent";

  return (
    <main className="bg-background text-on-surface min-h-screen">
      <div className="max-w-2xl mx-auto px-6 md:px-0 pt-28 pb-20">
        <Link href="/" className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-6 text-sm">
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Rarewoods Crew
        </Link>

        <header className="mb-10">
          <span className="font-label-caps text-xs text-primary uppercase tracking-[0.2em] mb-3 block">
            Consultation
          </span>
          <h1 className="font-headline-lg text-4xl md:text-5xl font-extrabold mb-4 leading-[1.1] tracking-tight text-on-background">
            Start Your Heritage Journey
          </h1>
          <p className="font-body-md text-on-surface-variant leading-relaxed">
            Select your preferred way to connect with our master craftsmen and begin designing your bespoke heirloom.
          </p>
        </header>

        {submitStatus === "stk_sent" && (
          <div className="mb-8 p-6 bg-surface-container-low rounded-lg border-l-4 border-l-primary ghost-border">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-primary text-2xl">phone_iphone</span>
              </div>
              <div>
                <p className="font-headline-md font-semibold text-lg text-primary mb-1">Check Your Phone</p>
                <p className="font-body-md text-on-surface-variant text-sm mb-2">
                  An M-Pesa STK push has been sent to <span className="font-semibold text-on-surface">{formData.contact}</span>. Enter your M-Pesa PIN to confirm payment of <span className="font-semibold text-on-surface">KES 2,000</span>.
                </p>
                <div className="flex items-center gap-2 text-xs text-outline">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
                    ))}
                  </div>
                  <span className="font-label-caps tracking-widest">WAITING FOR CONFIRMATION</span>
                </div>
                {checkoutId && <p className="text-xs text-outline mt-2">Ref: {checkoutId}</p>}
              </div>
            </div>
          </div>
        )}

        {submitStatus === "confirmed" && (
          <div className="mb-8 p-6 bg-surface-container-low rounded-lg border-l-4 border-l-primary ghost-border">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-primary text-2xl">check_circle</span>
              </div>
              <div>
                <p className="font-headline-md font-semibold text-lg text-primary mb-1">Consultation Confirmed</p>
                <p className="font-body-md text-on-surface-variant text-sm">
                  We&apos;ll reach out to confirm your {consultationType} consultation. Thank you for choosing Rarewoods Crew.
                </p>
                {bookingId && <p className="text-xs text-outline mt-2">Booking ID: {bookingId}</p>}
              </div>
            </div>
          </div>
        )}

        {(submitStatus === "error" || errorMsg) && (
          <div className="mb-8 p-5 bg-error-container/40 rounded-lg border-l-4 border-l-error flex items-center gap-4">
            <span className="material-symbols-outlined text-error text-2xl">error</span>
            <div>
              <p className="font-semibold text-on-error-container text-sm">Error</p>
              <p className="text-sm text-on-error-container/80">{errorMsg ?? "Something went wrong. Please try again."}</p>
            </div>
          </div>
        )}

        {/* Step 1: Consultation Type */}
        <section className="mb-12">
          <h2 className="font-headline-md text-xl font-bold mb-5 flex items-center gap-3">
            <span className="step-number w-7 h-7 rounded-full bg-primary text-on-primary text-sm font-bold flex items-center justify-center flex-shrink-0">1</span>
            Consultation Type
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {CONSULTATION_TYPES.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => !isSubmitting && setConsultationType(type.id)}
                className={`tactile-card rounded-lg p-6 flex flex-col items-center gap-3 transition-all ${
                  consultationType === type.id ? "border-primary ring-1 ring-primary" : "hover:border-primary/50"
                }`}
              >
                <span className={`material-symbols-outlined text-2xl ${consultationType === type.id ? "text-primary" : "text-on-surface-variant"}`}>
                  {type.icon}
                </span>
                <span className="font-body-md text-sm font-medium text-on-surface">{type.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Step 2: Date & Time */}
        <section className="mb-12">
          <h2 className="font-headline-md text-xl font-bold mb-5 flex items-center gap-3">
            <span className="step-number w-7 h-7 rounded-full bg-primary text-on-primary text-sm font-bold flex items-center justify-center flex-shrink-0">2</span>
            Select Date &amp; Time
          </h2>
          <div className="tactile-card rounded-lg p-5">
            <div className="flex justify-between items-center mb-5">
              <span className="font-body-md font-semibold text-on-surface">{MONTH_NAMES[viewMonth]} {viewYear}</span>
              <div className="flex gap-3">
                <button type="button" onClick={goToPrevMonth} className="text-on-surface-variant hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button type="button" onClick={goToNextMonth} className="text-on-surface-variant hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-label-caps text-outline mb-3">
              {WEEKDAYS.map((d, i) => <span key={i}>{d}</span>)}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
              {Array.from({ length: getFirstWeekdayOffset(viewYear, viewMonth) }, (_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {Array.from({ length: getDaysInMonth(viewYear, viewMonth) }, (_, i) => i + 1).map((d) => {
                const cellDate = new Date(viewYear, viewMonth, d);
                const isPast = cellDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
                const isSelected =
                  selectedDate &&
                  selectedDate.getDate() === d &&
                  selectedDate.getMonth() === viewMonth &&
                  selectedDate.getFullYear() === viewYear;

                return (
                  <button
                    type="button"
                    key={d}
                    onClick={() => !isSubmitting && !isPast && setSelectedDate(cellDate)}
                    disabled={isPast}
                    className={`py-2 rounded-md transition-colors ${
                      isPast
                        ? "text-outline/40 cursor-not-allowed"
                        : isSelected
                        ? "bg-primary text-on-primary font-bold"
                        : "text-on-surface hover:bg-primary/10 hover:text-primary"
                    }`}
                  >
                    {d}
                  </button>
                );
              })}
            </div>

            <div className="mt-6">
              <p className="font-label-caps text-xs text-outline tracking-widest mb-3">AVAILABLE SLOTS</p>
              <div className="grid grid-cols-2 gap-3">
                {AVAILABLE_SLOTS.map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => !isSubmitting && setSelectedSlot(slot)}
                    className={`py-3 rounded-lg text-sm font-medium border transition-all ${
                      selectedSlot === slot
                        ? "bg-primary-container text-on-primary-container border-primary-container font-bold"
                        : "border-outline-variant text-on-surface-variant hover:border-primary"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Step 3: Project Details */}
        <section className="mb-12">
          <h2 className="font-headline-md text-xl font-bold mb-5 flex items-center gap-3">
            <span className="step-number w-7 h-7 rounded-full bg-primary text-on-primary text-sm font-bold flex items-center justify-center flex-shrink-0">3</span>
            Project Details
          </h2>
          <div className="space-y-5">
            <div>
              <label className="font-label-caps text-xs text-outline tracking-widest mb-2 block">FULL NAME</label>
              <input
                type="text"
                placeholder="e.g. Alistair Thorne"
                value={formData.name}
                onChange={(e) => handleInput("name", e.target.value)}
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-surface-container-lowest rounded-lg border border-outline-variant focus:border-primary outline-none text-on-surface placeholder-outline transition-all disabled:opacity-50"
              />
            </div>
            <div>
              <label className="font-label-caps text-xs text-outline tracking-widest mb-2 block">CONTACT INFO (PHONE/EMAIL)</label>
              <input
                type="text"
                placeholder="Your preferred contact detail"
                value={formData.contact}
                onChange={(e) => handleInput("contact", e.target.value)}
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-surface-container-lowest rounded-lg border border-outline-variant focus:border-primary outline-none text-on-surface placeholder-outline transition-all disabled:opacity-50"
              />
            </div>
            <div>
              <label className="font-label-caps text-xs text-outline tracking-widest mb-2 block">PROJECT LOCATION</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-lg">location_on</span>
                <input
                  type="text"
                  placeholder="Enter city or post code"
                  value={formData.location}
                  onChange={(e) => handleInput("location", e.target.value)}
                  disabled={isSubmitting}
                  className="w-full pl-11 pr-4 py-3 bg-surface-container-lowest rounded-lg border border-outline-variant focus:border-primary outline-none text-on-surface placeholder-outline transition-all disabled:opacity-50"
                />
              </div>
            </div>
            <div>
              <label className="font-label-caps text-xs text-outline tracking-widest mb-2 block">DESCRIPTION OF THE PIECE</label>
              <textarea
                placeholder="Briefly describe the style, wood type, and dimensions you have in mind..."
                value={formData.description}
                onChange={(e) => handleInput("description", e.target.value)}
                disabled={isSubmitting}
                rows={4}
                className="w-full px-4 py-3 bg-surface-container-lowest rounded-lg border border-outline-variant focus:border-primary outline-none text-on-surface placeholder-outline transition-all disabled:opacity-50 resize-none"
              />
            </div>

            <div>
              <label className="font-label-caps text-xs text-outline tracking-widest mb-2 block">INSPIRATION GALLERY</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isSubmitting || uploadedFiles.length >= 3}
                  className="aspect-square rounded-lg border-2 border-dashed border-outline-variant flex items-center justify-center text-outline hover:border-primary hover:text-primary transition-colors disabled:opacity-40"
                >
                  <span className="material-symbols-outlined text-2xl">add_a_photo</span>
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleFileSelect} className="hidden" />
                {uploadPreviews.map((src, i) => (
                  <div key={i} className="relative aspect-square rounded-lg overflow-hidden ghost-border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={`Inspiration ${i + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-inverse-surface/80 text-inverse-on-surface flex items-center justify-center text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <p className="text-xs text-outline mt-2">Upload images of spaces or furniture styles that inspire you.</p>
            </div>
          </div>
        </section>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting || submitStatus === "confirmed"}
          className="w-full py-4 rounded-lg font-body-md text-base font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed bg-primary text-on-primary hover:bg-primary-container"
        >
          {submitStatus === "creating" && "Creating Booking..."}
          {submitStatus === "stk_sent" && "Waiting for M-Pesa..."}
          {submitStatus === "confirmed" && "Booking Confirmed"}
          {submitStatus === "error" && "Try Again"}
          {submitStatus === "idle" && (
            <>
              Confirm Consultation
              <span className="material-symbols-outlined text-lg">event_available</span>
            </>
          )}
        </button>
        <p className="text-center text-xs text-outline mt-4">
          By booking, you agree to our heritage craftsmanship terms and privacy policy.
        </p>
      </div>
      <Footer />
    </main>
  );
}
