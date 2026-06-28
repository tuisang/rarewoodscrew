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

      <nav className="fixed top-0 w-full z-50 border-b border-[#c3c8c1]/30"
        style={{ background: "rgba(251,249,244,0.92)", backdropFilter: "blur(20px)" }}>
        <div className="flex justify-between items-center px-6 md:px-12 py-4 w-full max-w-[1440px] mx-auto">

          {/* Logo + Brand */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-surface-cream text-2xl">carpenter</span>
            </div>
            <div>
              <span
                className="font-bold tracking-tighter text-[#1b1c19] text-xl md:text-2xl block leading-none group-hover:text-[#825516] transition-colors"
                style={{ fontFamily: "Domine, serif" }}
              >
                Rarewoods Crew
              </span>
              <span
                className="text-[9px] text-[#737973] tracking-[0.2em] leading-none"
                style={{ fontFamily: "Work Sans, sans-serif" }}
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
                    ? "text-[#825516] font-bold border-b-2 border-[#825516] pb-1"
                    : "text-[#434843] hover:text-[#825516]"
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
                className="text-[#434843] hover:text-[#825516] transition-colors p-1"
              >
                <SearchIcon />
              </button>
              {searchOpen && (
                <div className="search-dropdown absolute right-0 top-10 w-72 bg-[#ffffff] border border-[#c3c8c1] z-50">
                  <div className="flex items-center gap-3 px-4 py-3 border-b border-[#c3c8c1]/40">
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
                      className="bg-transparent outline-none text-sm text-[#1b1c19] placeholder-[#737973] flex-1"
                    />
                    <button onClick={() => { setSearchOpen(false); setSearchQuery(""); }} className="text-[#737973] hover:text-[#825516] text-lg">✕</button>
                  </div>
                  {filtered.length > 0 && (
                    <div>
                      {filtered.map((p) => (
                        <button
                          key={p.href}
                          onClick={() => handleSearchSelect(p.href)}
                          className="w-full text-left px-4 py-3 text-sm text-[#434843] hover:bg-[#f0eee9] hover:text-[#825516] flex items-center gap-3 transition-colors border-b border-[#c3c8c1]/20"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#825516" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                          {p.label}
                        </button>
                      ))}
                    </div>
                  )}
                  {searchQuery.length > 1 && filtered.length === 0 && (
                    <p className="px-4 py-3 text-sm text-[#737973]">No results found.</p>
                  )}
                  {searchQuery.length <= 1 && (
                    <div className="p-3">
                      {searchPages.map((p) => (
                        <button
                          key={p.href}
                          onClick={() => handleSearchSelect(p.href)}
                          className="w-full text-left px-3 py-2 text-xs text-[#737973] hover:text-[#825516] hover:bg-[#f0eee9] transition-colors"
                          style={{ fontFamily: "Work Sans, sans-serif" }}
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
              className="relative text-[#434843] hover:text-[#825516] transition-colors"
            >
              <CartIcon />
              {totalItems > 0 && (
                <span
                  className="absolute -top-2 -right-2 bg-[#825516] text-[#ffffff] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ fontFamily: "Work Sans, sans-serif" }}
                >
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>

            <Link
              href="/booking"
              className="bg-[#825516] text-[#ffffff] text-sm font-semibold px-6 py-2.5 hover:bg-[#825516]/90 transition-all active:scale-95 whitespace-nowrap"
            >
              Book Consultation
            </Link>

            <SignedOut>
              <SignInButton>
                <button className="text-[#434843] hover:text-[#825516] text-sm font-medium transition-colors whitespace-nowrap">
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
              className="text-[#434843] hover:text-[#825516] transition-colors"
            >
              <SearchIcon />
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="relative text-[#434843] hover:text-[#825516] transition-colors"
            >
              <CartIcon />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#825516] text-[#ffffff] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>
            <SignedIn><UserButton /></SignedIn>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col justify-center items-center w-8 h-8 gap-[5px] focus:outline-none"
            >
              <span className="block w-5 h-[2px] bg-[#825516] transition-all duration-300" style={{ transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none" }} />
              <span className="block w-5 h-[2px] bg-[#825516] transition-all duration-300" style={{ opacity: menuOpen ? 0 : 1 }} />
              <span className="block w-5 h-[2px] bg-[#825516] transition-all duration-300" style={{ transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none" }} />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {searchOpen && (
          <div className="lg:hidden px-4 pb-4 relative">
            <div className="flex items-center gap-3 bg-[#f0eee9] border border-[#c3c8c1] px-4 py-3">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search pages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && filtered.length > 0) handleSearchSelect(filtered[0].href);
                }}
                className="bg-transparent outline-none text-sm text-[#1b1c19] placeholder-[#737973] flex-1"
                autoFocus
              />
            </div>
            {filtered.length > 0 && (
              <div className="bg-[#ffffff] border border-[#c3c8c1] border-t-0">
                {filtered.map((p) => (
                  <button
                    key={p.href}
                    onClick={() => handleSearchSelect(p.href)}
                    className="w-full text-left px-4 py-3 text-sm text-[#434843] hover:bg-[#f0eee9] hover:text-[#825516] flex items-center gap-3 border-b border-[#c3c8c1]/20"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#825516" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
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
        <div className="fixed inset-0 bg-[#fbf9f4]/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setMenuOpen(false)} />
      )}

      {/* Mobile Drawer */}
      <div
        className="fixed top-0 right-0 h-full w-[80%] max-w-[320px] z-50 lg:hidden flex flex-col border-l border-[#c3c8c1]/40"
        style={{
          background: "rgba(255,255,255,0.98)",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#c3c8c1]/40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-surface-cream text-lg">carpenter</span>
            </div>
            <span className="text-[#825516] font-bold text-lg" style={{ fontFamily: "Domine, serif" }}>Rarewoods Crew</span>
          </div>
          <button onClick={() => setMenuOpen(false)} className="text-[#737973] hover:text-[#825516] transition-colors text-xl">✕</button>
        </div>

        <div className="flex flex-col px-6 py-8 gap-1 flex-1">
          {[...links, { href: "/chat-history", label: "My Chats" }].map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`py-4 text-lg font-medium border-b border-[#c3c8c1]/20 transition-colors ${
                pathname === link.href ? "text-[#825516]" : "text-[#434843] hover:text-[#825516]"
              }`}
              style={{ transitionDelay: menuOpen ? `${i * 40}ms` : "0ms" }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="px-6 py-8 border-t border-[#c3c8c1]/40 flex flex-col gap-4">
          <Link href="/booking" className="w-full bg-[#825516] text-[#ffffff] text-sm font-semibold px-6 py-4 text-center hover:brightness-110 transition-all" style={{ fontFamily: "Work Sans, sans-serif" }}>
            BOOK CONSULTATION
          </Link>
          <SignedOut>
            <SignInButton>
              <button className="w-full border border-[#c3c8c1] text-[#434843] text-sm font-medium py-4 hover:border-[#825516] hover:text-[#825516] transition-colors">Login</button>
            </SignInButton>
          </SignedOut>
          <p className="text-center text-xs text-[#c3c8c1] tracking-widest" style={{ fontFamily: "Work Sans, sans-serif" }}>CRAFTED IN KENYA</p>
        </div>
      </div>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
