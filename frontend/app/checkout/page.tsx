"use client";

import { useState } from "react";
import { useCart } from "@/lib/CartContext";
import Link from "next/link";
import Footer from "@/components/Footer";

type Step = "details" | "stk_sent" | "confirmed" | "error";

export default function CheckoutPage() {
  const { items, totalItems, totalPrice, clearCart, updateQuantity, removeFromCart } = useCart();
  const [step, setStep] = useState<Step>("details");
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [checkoutId, setCheckoutId] = useState<string | null>(null);
  const [receiptNumber, setReceiptNumber] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });

  const set = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const pollOrderStatus = (id: string, checkoutReqId: string) => {
    let attempts = 0;
    const interval = setInterval(async () => {
      attempts++;
      try {
        const queryRes = await fetch("/api/mpesa/stk-query", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ checkoutRequestId: checkoutReqId, orderId: id, type: "order" }),
        });
        const queryData = await queryRes.json();
        if (queryData.status === "paid") {
          const orderRes = await fetch(`/api/orders/${id}`);
          const orderData = await orderRes.json();
          setReceiptNumber(orderData.order?.mpesaReceiptNumber ?? null);
          setStep("confirmed");
          clearCart();
          clearInterval(interval);
          return;
        }
        if (queryData.status === "cancelled") {
          setErrorMsg("Payment was cancelled. Please try again.");
          setStep("error");
          clearInterval(interval);
          return;
        }
      } catch (e) { console.error("Poll error:", e); }
      if (attempts >= 15) {
        setStep("error");
        setErrorMsg("Payment timed out. Please try again.");
        clearInterval(interval);
      }
    }, 4000);
  };

  const handlePlaceOrder = async () => {
    if (!form.name || !form.email || !form.phone) {
      return alert("Please fill in all required fields.");
    }
    setIsProcessing(true);
    setErrorMsg(null);

    try {
      // Step 1: Create order in DB
      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: form.address,
          items: items.map((i) => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
          totalAmount: totalPrice,
          paymentMethod,
        }),
      });

      if (!orderRes.ok) throw new Error("Failed to create order.");
      const { order } = await orderRes.json();
      setOrderId(order.id);

      if (paymentMethod === "mpesa") {
        // Step 2: Trigger STK push
        const stkRes = await fetch("/api/mpesa/shop-stk", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: form.phone, orderId: order.id, amount: totalPrice }),
        });

        const stkData = await stkRes.json();
        if (!stkRes.ok) throw new Error(stkData.error ?? "STK push failed.");

        setCheckoutId(stkData.checkoutRequestId);
        setStep("stk_sent");
        setIsProcessing(false);
        pollOrderStatus(order.id, stkData.checkoutRequestId);
      } else {
        // Non-mpesa: mark as confirmed directly
        setStep("confirmed");
        clearCart();
        setIsProcessing(false);
      }
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStep("error");
      setIsProcessing(false);
    }
  };

  if (items.length === 0 && step === "details") {
    return (
      <main className="bg-background text-on-surface min-h-screen flex flex-col items-center justify-center gap-6 pt-24">
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="var(--color-outline-variant)" strokeWidth="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
        <h2 className="text-2xl font-semibold" style={{ fontFamily: "Libre Franklin, sans-serif" }}>Your cart is empty</h2>
        <Link href="/" className="bg-primary text-on-primary px-8 py-3 text-sm font-semibold hover:brightness-110 transition-all">Continue Shopping</Link>
      </main>
    );
  }

  return (
    <main className="bg-background text-on-surface min-h-screen">
      <div className="pt-32 pb-24 max-w-[1440px] mx-auto px-4 md:px-16">

        <header className="mb-12">
          <span className="text-xs text-primary uppercase tracking-[0.2em] mb-4 block" style={{ fontFamily: "Libre Franklin, sans-serif" }}>Secure Checkout</span>
          <h1 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "Libre Franklin, sans-serif" }}>Complete Your Order</h1>
        </header>

        {/* STK Waiting */}
        {step === "stk_sent" && (
          <div className="max-w-lg mx-auto text-center py-20">
            <div className="w-20 h-20 bg-[#39b54a]/10 border border-[#39b54a]/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">ðŸ“±</span>
            </div>
            <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "Libre Franklin, sans-serif" }}>Check Your Phone</h2>
            <p className="text-on-surface-variant mb-4">
              An M-Pesa prompt has been sent to <span className="text-primary font-bold">{form.phone}</span>.
              Enter your PIN to pay <span className="text-primary font-bold">KSh {totalPrice.toLocaleString()}</span>.
            </p>
            <div className="flex items-center justify-center gap-3 text-sm text-outline mb-6">
              <div className="flex gap-1">
                {[0,1,2].map((i) => (
                  <div key={i} className="w-2 h-2 bg-[#39b54a] rounded-full animate-bounce" style={{ animationDelay: `${i*150}ms` }} />
                ))}
              </div>
              <span style={{ fontFamily: "Libre Franklin, sans-serif" }}>WAITING FOR PAYMENT...</span>
            </div>
            {checkoutId && (
              <p className="text-xs text-[var(--color-outline-variant)]" style={{ fontFamily: "Libre Franklin, sans-serif" }}>REF: {checkoutId}</p>
            )}
          </div>
        )}

        {/* Confirmed */}
        {step === "confirmed" && (
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="w-20 h-20 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#994700" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "Libre Franklin, sans-serif" }}>Order Confirmed!</h2>
            <p className="text-on-surface-variant mb-3">Thank you, <span className="text-primary">{form.name}</span>. We&apos;ll reach out to <span className="text-primary">{form.email}</span> with delivery details.</p>
            <div className="bg-surface-container-low border border-outline-variant/40 p-6 mb-8 text-left">
              <p className="text-xs text-outline tracking-widest mb-3" style={{ fontFamily: "Libre Franklin, sans-serif" }}>ORDER DETAILS</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-on-surface-variant">Order ID</span><span className="text-primary font-bold" style={{ fontFamily: "Libre Franklin, sans-serif" }}>{orderId?.slice(-8).toUpperCase()}</span></div>
                {receiptNumber && <div className="flex justify-between"><span className="text-on-surface-variant">M-Pesa Receipt</span><span className="font-bold">{receiptNumber}</span></div>}
                <div className="flex justify-between"><span className="text-on-surface-variant">Payment</span><span className="capitalize">{paymentMethod}</span></div>
                <div className="flex justify-between font-bold border-t border-outline-variant/30 pt-2 mt-2"><span>Total Paid</span><span className="text-primary">KSh {totalPrice.toLocaleString()}</span></div>
              </div>
            </div>
            <div className="flex gap-4 justify-center">
              <Link href="/" className="bg-primary text-on-primary px-8 py-3 text-sm font-semibold hover:brightness-110 transition-all">Continue Shopping</Link>
              <Link href="/dashboard" className="border border-outline-variant text-on-surface-variant px-8 py-3 text-sm font-semibold hover:border-primary transition-colors">My Dashboard</Link>
            </div>
          </div>
        )}

        {/* Error */}
        {step === "error" && (
          <div className="max-w-lg mx-auto text-center py-20">
            <div className="w-20 h-20 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
            <h2 className="text-2xl font-bold mb-3 text-red-400" style={{ fontFamily: "Libre Franklin, sans-serif" }}>Payment Failed</h2>
            <p className="text-on-surface-variant mb-6">{errorMsg ?? "Something went wrong."}</p>
            <button onClick={() => setStep("details")} className="bg-primary text-on-primary px-8 py-3 text-sm font-semibold hover:brightness-110 transition-all">Try Again</button>
          </div>
        )}

        {/* Checkout Form */}
        {step === "details" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-8">

              {/* Contact */}
              <section className="bg-surface-container-low border border-outline-variant/40 p-8">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-3" style={{ fontFamily: "Libre Franklin, sans-serif" }}>
                  <span className="text-primary" style={{ fontFamily: "Libre Franklin, sans-serif" }}>01</span> Delivery Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: "Full Name *", field: "name", type: "text", placeholder: "John Doe" },
                    { label: "Email Address *", field: "email", type: "email", placeholder: "john@email.com" },
                    { label: "Phone (M-Pesa) *", field: "phone", type: "tel", placeholder: "+254 7XX XXX XXX" },
                    { label: "Delivery Address", field: "address", type: "text", placeholder: "Nairobi, Kenya" },
                  ].map((f) => (
                    <div key={f.field}>
                      <label className="text-xs text-on-surface-variant mb-2 block tracking-widest" style={{ fontFamily: "Libre Franklin, sans-serif" }}>{f.label}</label>
                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        value={form[f.field as keyof typeof form]}
                        onChange={(e) => set(f.field, e.target.value)}
                        className="w-full bg-background border-b border-outline-variant focus:border-primary py-2 text-on-surface placeholder-outline outline-none transition-colors"
                      />
                    </div>
                  ))}
                </div>
              </section>

              {/* Payment */}
              <section className="bg-surface-container-low border border-outline-variant/40 p-8">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-3" style={{ fontFamily: "Libre Franklin, sans-serif" }}>
                  <span className="text-primary" style={{ fontFamily: "Libre Franklin, sans-serif" }}>02</span> Payment Method
                </h2>
                <div className="space-y-3">
                  {[
                    { id: "mpesa", label: "M-Pesa STK Push", sub: "Instant mobile payment", badge: <span className="bg-[#39b54a] text-white text-[9px] font-bold px-2 py-0.5">M-PESA</span> },
                    { id: "card", label: "Visa / Mastercard", sub: "Secure card payment", badge: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg> },
                    { id: "bank", label: "Bank Transfer", sub: "Direct deposit", badge: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
                  ].map((method) => (
                    <label key={method.id} onClick={() => setPaymentMethod(method.id)}
                      className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${paymentMethod === method.id ? "border-primary bg-primary/5" : "border-outline-variant hover:border-primary/50"}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-4 h-4 rounded-full border-2 transition-colors ${paymentMethod === method.id ? "bg-primary border-primary" : "border-[var(--color-outline)]"}`} />
                        <div>
                          <p className="font-semibold text-sm">{method.label}</p>
                          <p className="text-xs text-outline">{method.sub}</p>
                        </div>
                      </div>
                      <span className="text-on-surface-variant">{method.badge}</span>
                    </label>
                  ))}
                </div>
                {paymentMethod === "mpesa" && (
                  <div className="mt-4 p-4 bg-[#39b54a]/10 border border-[#39b54a]/30 flex items-center gap-3">
                    <span className="text-lg">ðŸ“±</span>
                    <p className="text-xs text-on-surface-variant">
                      An STK push will be sent to <span className="text-primary">{form.phone || "your phone"}</span>. Enter your M-Pesa PIN to confirm payment of <span className="text-primary font-bold">KSh {totalPrice.toLocaleString()}</span>.
                    </p>
                  </div>
                )}
              </section>
            </div>

            {/* Order Summary */}
            <aside className="lg:col-span-5">
              <div className="sticky top-32 bg-surface-container-low border border-outline-variant/40">
                <div className="p-6 border-b border-outline-variant/40">
                  <h3 className="text-lg font-semibold" style={{ fontFamily: "Libre Franklin, sans-serif" }}>Order Summary ({totalItems} items)</h3>
                </div>
                <div className="divide-y divide-[var(--color-outline-variant)]/20 max-h-72 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="p-4 flex gap-4 items-center">
                      <img src={item.img} alt={item.name} className="w-14 h-14 object-cover rounded-lg flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">{item.name}</p>
                        <p className="text-xs text-outline">{item.priceLabel}</p>
                      </div>
                      <div className="flex items-center border border-outline-variant flex-shrink-0">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">âˆ’</button>
                        <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">+</button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-outline hover:text-red-400 transition-colors flex-shrink-0">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M9 6V4h6v2"/></svg>
                      </button>
                    </div>
                  ))}
                </div>
                <div className="p-6 space-y-3 border-t border-outline-variant/40">
                  <div className="flex justify-between text-sm"><span className="text-on-surface-variant">Subtotal</span><span>KSh {totalPrice.toLocaleString()}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-on-surface-variant">Delivery (Nairobi)</span><span className="text-[#16a34a]">Free</span></div>
                  <div className="flex justify-between font-bold text-lg pt-3 border-t border-outline-variant/30">
                    <span>Total</span><span className="text-primary">KSh {totalPrice.toLocaleString()}</span>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="w-full py-4 text-sm font-semibold transition-all active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-3"
                    style={{ background: "#994700", color: "var(--color-on-primary)", fontFamily: "Libre Franklin, sans-serif" }}
                  >
                    {isProcessing ? (
                      <><div className="w-4 h-4 border-2 border-[var(--color-on-primary)] border-t-transparent rounded-full animate-spin" />PROCESSING...</>
                    ) : paymentMethod === "mpesa" ? (
                      `PAY KSh ${totalPrice.toLocaleString()} VIA M-PESA`
                    ) : (
                      `PLACE ORDER Â· KSh ${totalPrice.toLocaleString()}`
                    )}
                  </button>
                  <p className="text-center text-xs text-outline mt-3 flex items-center justify-center gap-2">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-outline)" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    Secured by SSL encryption
                  </p>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
