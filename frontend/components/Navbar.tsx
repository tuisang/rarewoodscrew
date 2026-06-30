"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { useCart } from "@/lib/CartContext";
import CartDrawer from "@/components/CartDrawer";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { totalItems } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setMenuOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 100);
  }, [searchOpen]);

  const links = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/services", label: "Services" },
  { href: "/payments", label: "Payments" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
  { href: "/dashboard", label: "Dashboard" },
];

  const searchPages = [
    { label: "Homepage", href: "/" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Services", href: "/services" },
    { label: "Payments", href: "/payments" },
    { label: "Book Consultation", href: "/booking" },
    { label: "Reviews", href: "/reviews" },
    { label: "My Dashboard", href: "/dashboard" },
    { label: "Chat History", href: "/chat-history" },
    { label: "Contact Us", href: "/contact" },
  ];

  const filtered = searchQuery.length > 1
    ? searchPages.filter(p => p.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const handleSearchSelect = (href: string) => {
    router.push(href);
    setSearchOpen(false);
    setSearchQuery("");
  };

  const CartIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
  );

  const SearchIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  );

  return (
    <>
      <style>{`
        @keyframes search-slide {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .search-dropdown { animation: search-slide 0.2s ease forwards; }
      `}</style>

      <nav className="fixed top-0 w-full z-50 border-b border-outline-variant/30 glass-header"
        style={{ background: "rgba(254,248,241,0.92)" }}>
        <div className="flex justify-between items-center px-6 md:px-12 py-4 w-full max-w-[1440px] mx-auto">

          {/* Logo + Brand */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-surface-cream text-2xl">carpenter</span>
            </div>
            <div>
              <span
                className="font-headline-md font-extrabold tracking-tight text-on-background text-xl md:text-2xl block leading-none group-hover:text-primary transition-colors"
              >
                Rarewoods Crew
              </span>
              <span
                className="font-label-caps text-[9px] text-outline tracking-[0.2em] leading-none"
              >
                MASTER CRAFTSMEN &middot; NAIROBI
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          
            <div className="hidden lg:flex gap-8 items-center">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base font-medium transition-colors duration-300 whitespace-nowrap ${
                  pathname === link.href
                    ? "text-primary font-bold border-b-2 border-primary pb-1"
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Right */}
          <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
            {/* Search */}
            <div className="relative">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-on-surface-variant hover:text-primary transition-colors p-1"
              >
                <SearchIcon />
              </button>
              {searchOpen && (
                <div className="search-dropdown absolute right-0 top-10 w-72 bg-surface-container-lowest border border-outline-variant z-50 rounded-lg shadow-ambient">
                  <div className="flex items-center gap-3 px-4 py-3 border-b border-outline-variant/40">
                    <SearchIcon />
                    <input
                      ref={searchRef}
                      type="text"
                      placeholder="Search pages..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Escape") { setSearchOpen(false); setSearchQuery(""); }
                        if (e.key === "Enter" && filtered.length > 0) handleSearchSelect(filtered[0].href);
                      }}
                      className="bg-transparent outline-none text-sm text-on-surface placeholder-outline flex-1"
                    />
                    <button onClick={() => { setSearchOpen(false); setSearchQuery(""); }} className="text-outline hover:text-primary text-lg">✕</button>
                  </div>
                  {filtered.length > 0 && (
                    <div>
                      {filtered.map((p) => (
                        <button
                          key={p.href}
                          onClick={() => handleSearchSelect(p.href)}
                          className="w-full text-left px-4 py-3 text-sm text-on-surface-variant hover:bg-surface-container hover:text-primary flex items-center gap-3 transition-colors border-b border-outline-variant/20"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#994700" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                          {p.label}
                        </button>
                      ))}
                    </div>
                  )}
                  {searchQuery.length > 1 && filtered.length === 0 && (
                    <p className="px-4 py-3 text-sm text-outline">No results found.</p>
                  )}
                  {searchQuery.length <= 1 && (
                    <div className="p-3">
                      {searchPages.map((p) => (
                        <button
                          key={p.href}
                          onClick={() => handleSearchSelect(p.href)}
                          className="w-full text-left px-3 py-2 text-xs font-label-caps text-outline hover:text-primary hover:bg-surface-container transition-colors"
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={() => setCartOpen(true)}
              className="relative text-on-surface-variant hover:text-primary transition-colors"
            >
              <CartIcon />
              {totalItems > 0 && (
                <span
                  className="absolute -top-2 -right-2 bg-primary text-on-primary text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center"
                >
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>

            <Link
              href="/booking"
              className="bg-primary text-on-primary text-sm font-bold px-6 py-2.5 rounded-lg hover:bg-primary-container transition-all active:scale-95 whitespace-nowrap"
            >
              Book Consultation
            </Link>

            <SignedOut>
              <SignInButton>
                <button className="text-on-surface-variant hover:text-primary text-sm font-medium transition-colors whitespace-nowrap">
                  Login
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>

          {/* Mobile Right */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-on-surface-variant hover:text-primary transition-colors"
            >
              <SearchIcon />
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="relative text-on-surface-variant hover:text-primary transition-colors"
            >
              <CartIcon />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-on-primary text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>
            <SignedIn><UserButton /></SignedIn>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col justify-center items-center w-8 h-8 gap-[5px] focus:outline-none"
            >
              <span className="block w-5 h-[2px] bg-primary transition-all duration-300" style={{ transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none" }} />
              <span className="block w-5 h-[2px] bg-primary transition-all duration-300" style={{ opacity: menuOpen ? 0 : 1 }} />
              <span className="block w-5 h-[2px] bg-primary transition-all duration-300" style={{ transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none" }} />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {searchOpen && (
          <div className="lg:hidden px-4 pb-4 relative">
            <div className="flex items-center gap-3 bg-surface-container border border-outline-variant px-4 py-3 rounded-lg">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search pages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && filtered.length > 0) handleSearchSelect(filtered[0].href);
                }}
                className="bg-transparent outline-none text-sm text-on-surface placeholder-outline flex-1"
                autoFocus
              />
            </div>
            {filtered.length > 0 && (
              <div className="bg-surface-container-lowest border border-outline-variant border-t-0 rounded-b-lg">
                {filtered.map((p) => (
                  <button
                    key={p.href}
                    onClick={() => handleSearchSelect(p.href)}
                    className="w-full text-left px-4 py-3 text-sm text-on-surface-variant hover:bg-surface-container hover:text-primary flex items-center gap-3 border-b border-outline-variant/20"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#994700" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    {p.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Mobile Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setMenuOpen(false)} />
      )}

      {/* Mobile Drawer */}
      <div
        className="fixed top-0 right-0 h-full w-[80%] max-w-[320px] z-50 lg:hidden flex flex-col border-l border-outline-variant/40"
        style={{
          background: "rgba(255,255,255,0.98)",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-outline-variant/40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-surface-cream text-lg">carpenter</span>
            </div>
            <span className="font-headline-md text-primary font-bold text-lg">Rarewoods Crew</span>
          </div>
          <button onClick={() => setMenuOpen(false)} className="text-outline hover:text-primary transition-colors text-xl">✕</button>
        </div>

        <div className="flex flex-col px-6 py-8 gap-1 flex-1">
          {[...links, { href: "/chat-history", label: "My Chats" }].map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`py-4 text-lg font-medium border-b border-outline-variant/20 transition-colors ${
                pathname === link.href ? "text-primary" : "text-on-surface-variant hover:text-primary"
              }`}
              style={{ transitionDelay: menuOpen ? `${i * 40}ms` : "0ms" }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="px-6 py-8 border-t border-outline-variant/40 flex flex-col gap-4">
          <Link href="/booking" className="w-full bg-primary text-on-primary text-sm font-bold px-6 py-4 rounded-lg text-center hover:bg-primary-container transition-all">
            BOOK CONSULTATION
          </Link>
          <SignedOut>
            <SignInButton>
              <button className="w-full border border-outline-variant text-on-surface-variant text-sm font-medium py-4 rounded-lg hover:border-primary hover:text-primary transition-colors">Login</button>
            </SignInButton>
          </SignedOut>
          <p className="font-label-caps text-center text-xs text-outline tracking-widest">CRAFTED IN KENYA</p>
        </div>
      </div>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
