import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-background text-on-surface min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="mb-8 opacity-40">
        <img src="/logo-icon.png" alt="Rarewoods Crew" className="h-20 w-auto object-contain" />
      </div>

      <p className="text-xs text-primary tracking-[0.3em] mb-4" style={{ fontFamily: "Libre Franklin, sans-serif" }}>
        ERROR 404
      </p>
      <h1 className="text-5xl md:text-7xl font-bold mb-4 text-primary" style={{ fontFamily: "Libre Franklin, sans-serif" }}>
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ fontFamily: "Libre Franklin, sans-serif" }}>
        Page Not Found
      </h2>
      <p className="text-outline max-w-md mb-10 leading-relaxed">
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
            className="border border-outline-variant text-on-surface-variant px-5 py-2 text-sm hover:border-primary hover:text-primary transition-all"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <Link
        href="/"
        className="bg-primary text-on-primary px-10 py-4 text-sm font-semibold hover:brightness-110 transition-all flex items-center gap-2"
        style={{ fontFamily: "Libre Franklin, sans-serif" }}
      >
        ← RETURN TO ATELIER
      </Link>

      <p className="text-xs text-[var(--color-outline-variant)] mt-12" style={{ fontFamily: "Libre Franklin, sans-serif" }}>
        RAREWOODS CREW · NAIROBI, KENYA
      </p>
    </main>
  );
}
