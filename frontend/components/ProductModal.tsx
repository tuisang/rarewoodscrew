"use client";

import { useState } from "react";
import { useCart, CartItem } from "@/lib/CartContext";

interface Props {
  product: Omit<CartItem, "quantity"> | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: Props) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <>
      <div className="fixed inset-0 bg-[#131313]/80 backdrop-blur-sm z-[80]" onClick={onClose} />
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[90] w-full max-w-lg bg-[#0e0e0e] border border-[#4f453d] rounded-xl overflow-hidden"
        style={{ animation: "fade-up 0.25s ease forwards" }}
      >
        {/* Image */}
        <div className="h-56 overflow-hidden relative">
          <img src={product.img} alt={product.name} className="w-full h-full object-cover rounded-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-[#131313]/80 flex items-center justify-center text-[#9c8e84] hover:text-[#e8bf9b] transition-colors rounded-full"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <h2 className="text-2xl font-semibold" style={{ fontFamily: "Playfair Display, serif" }}>
              {product.name}
            </h2>
            <span className="text-[#e8bf9b] font-bold text-lg">{product.priceLabel}</span>
          </div>

          <p className="text-[#d3c4b9] text-sm leading-relaxed mb-6">
            Premium quality craftsmanship tool, hand-selected by the Forge &amp; Timber atelier team for professional and home workshop use.
          </p>

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs text-[#9c8e84] tracking-widest" style={{ fontFamily: "JetBrains Mono, monospace" }}>QTY</span>
            <div className="flex items-center border border-[#4f453d]">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center text-[#d3c4b9] hover:text-[#e8bf9b] hover:bg-[#131313] transition-colors text-xl"
              >
                −
              </button>
              <span className="w-10 text-center font-bold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 flex items-center justify-center text-[#d3c4b9] hover:text-[#e8bf9b] hover:bg-[#131313] transition-colors text-xl"
              >
                +
              </button>
            </div>
            <span className="text-sm text-[#9c8e84]">
              = <span className="text-[#e8bf9b] font-bold">KSh {(product.price * quantity).toLocaleString()}</span>
            </span>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAdd}
            disabled={added}
            className="w-full py-4 text-sm font-semibold transition-all active:scale-[0.98] flex items-center justify-center gap-3"
            style={{
              background: added ? "#4ade80" : "#e8bf9b",
              color: added ? "#14532d" : "#442b12",
              fontFamily: "JetBrains Mono, monospace",
            }}
          >
            {added ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                ADDED TO CART
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                ADD TO CART
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
