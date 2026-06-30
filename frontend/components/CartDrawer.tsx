"use client";

import { useCart } from "@/lib/CartContext";
import Link from "next/link";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: Props) {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart();

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-background/70 backdrop-blur-sm z-[60]"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 h-full w-full max-w-[420px] bg-background border-l border-outline-variant/40 z-[70] flex flex-col"
        style={{
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-outline-variant/40">
          <div className="flex items-center gap-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#994700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <h2 className="text-lg font-semibold" style={{ fontFamily: "Libre Franklin, sans-serif" }}>
              Your Cart
            </h2>
            {totalItems > 0 && (
              <span
                className="bg-primary text-on-primary text-xs font-bold px-2 py-0.5"
                style={{ fontFamily: "Libre Franklin, sans-serif" }}
              >
                {totalItems}
              </span>
            )}
          </div>
          <button onClick={onClose} className="text-outline hover:text-primary transition-colors text-xl">✕</button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-outline-variant)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              <p className="text-outline text-sm">Your cart is empty.</p>
              <button
                onClick={onClose}
                className="text-xs text-primary border border-primary/40 px-6 py-2 hover:bg-primary/10 transition-colors"
                style={{ fontFamily: "Libre Franklin, sans-serif" }}
              >
                BROWSE TOOLS
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-surface-container-low border border-outline-variant/30 rounded-xl">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm mb-1 truncate" style={{ fontFamily: "Libre Franklin, sans-serif" }}>
                      {item.name}
                    </p>
                    <p className="text-primary text-sm font-bold mb-3">{item.priceLabel}</p>
                    <div className="flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-outline-variant">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-background transition-colors text-lg"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-background transition-colors text-lg"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-outline hover:text-red-400 transition-colors"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-6 border-t border-outline-variant/40 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-on-surface-variant text-sm">Subtotal ({totalItems} items)</span>
              <span className="text-primary font-bold text-lg">
                KSh {totalPrice.toLocaleString()}
              </span>
            </div>
            <Link
              href="/checkout"
              onClick={onClose}
              className="w-full block text-center bg-primary text-on-primary py-4 text-sm font-semibold hover:brightness-110 transition-all active:scale-[0.98]"
              style={{ fontFamily: "Libre Franklin, sans-serif" }}
            >
              PROCEED TO CHECKOUT →
            </Link>
            <button
              onClick={clearCart}
              className="w-full text-xs text-outline hover:text-red-400 transition-colors py-2"
              style={{ fontFamily: "Libre Franklin, sans-serif" }}
            >
              CLEAR CART
            </button>
          </div>
        )}
      </div>
    </>
  );
}
