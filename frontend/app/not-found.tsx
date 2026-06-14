import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-[#131313] text-[#e5e2e1] min-h-screen flex flex-col items-center justify-center px-4 text-center">
      {/* Decorative SVG */}
      <div className="mb-8 opacity-20">
        <svg width="120" height="120" viewBox="0 0 36 36" fill="none">
          <polygon points="18,2 32,10 32,26 18,34 4,26 4,10" fill="#20201f" stroke="#e8bf9b" strokeWidth="1.5"/>
          <line x1="10" y1="13" x2="26" y2="13" stroke="#4f453d" strokeWidth="1" strokeLinecap="round"/>
          <line x1="8" y1="17" x2="28" y2="17" stroke="#4f453d" strokeWidth="1" strokeLinecap="round"/>
          <line x1="10" y1="21" x2="26" y2="21" stroke="#4f453d" strokeWidth="1" strokeLinecap="round"/>
          <circle cx="18" cy="17" r="4" fill="none" stroke="#e8bf9b" strokeWidth="1.5"/>
          <circle cx="18" cy="17" r="1.5" fill="#e8bf9b"/>
        </svg>
      </div>

      <p className="text-xs text-[#ffb785] tracking-[0.3em] mb-4" style={{ fontFamily: "JetBrains Mono, monospace" }}>
        ERROR 404
      </p>
      <h1 className="text-5xl md:text-7xl font-bold mb-4 text-[#e8bf9b]" style={{ fontFamily: "Playfair Display, serif" }}>
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
        Page Not Found
      </h2>
      <p className="text-[#9c8e84] max-w-md mb-10 leading-relaxed">
        This page has gone missing from the atelier. It may have been moved, renamed, or perhaps it never existed.
      </p>

      {/* Quick Links */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {[
          { href: "/", label: "Home" },
          { href: "/services", label: "Services" },
          { href: "/portfolio", label: "Portfolio" },
          { href: "/booking", label: "Book Consultation" },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="border border-[#4f453d] text-[#d3c4b9] px-5 py-2 text-sm hover:border-[#e8bf9b] hover:text-[#e8bf9b] transition-all"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <Link
        href="/"
        className="bg-[#e8bf9b] text-[#442b12] px-10 py-4 text-sm font-semibold hover:brightness-110 transition-all flex items-center gap-2"
        style={{ fontFamily: "JetBrains Mono, monospace" }}
      >
        ← RETURN TO ATELIER
      </Link>

      <p className="text-xs text-[#4f453d] mt-12" style={{ fontFamily: "JetBrains Mono, monospace" }}>
        FORGE & TIMBER ATELIER · NAIROBI, KENYA
      </p>
    </main>
  );
}
