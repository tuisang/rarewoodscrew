import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-[#131314] text-[#e5e2e3] min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="mb-8 opacity-40">
        <img src="/logo-icon.png" alt="Black Steel Crew" className="h-20 w-auto object-contain" />
      </div>

      <p className="text-xs text-[#00daf8] tracking-[0.3em] mb-4" style={{ fontFamily: "JetBrains Mono, monospace" }}>
        ERROR 404
      </p>
      <h1 className="text-5xl md:text-7xl font-bold mb-4 text-[#00daf8]" style={{ fontFamily: "Archivo Narrow, sans-serif" }}>
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ fontFamily: "Archivo Narrow, sans-serif" }}>
        Page Not Found
      </h2>
      <p className="text-[#859397] max-w-md mb-10 leading-relaxed">
        This page has gone missing from the workshop. It may have been moved, renamed, or perhaps it never existed.
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
            className="border border-[#3b494c] text-[#bac9cd] px-5 py-2 text-sm hover:border-[#00daf8] hover:text-[#00daf8] transition-all"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <Link
        href="/"
        className="bg-[#00daf8] text-[#001f25] px-10 py-4 text-sm font-semibold hover:brightness-110 transition-all flex items-center gap-2"
        style={{ fontFamily: "JetBrains Mono, monospace" }}
      >
        ← RETURN TO ATELIER
      </Link>

      <p className="text-xs text-[#3b494c] mt-12" style={{ fontFamily: "JetBrains Mono, monospace" }}>
        FORGE & TIMBER ATELIER · NAIROBI, KENYA
      </p>
    </main>
  );
}
