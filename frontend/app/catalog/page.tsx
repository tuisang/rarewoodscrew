"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

type Category = "ALL" | "HARDWOOD" | "SOFTWOOD" | "METAL" | "FINISH";

interface Material {
  id: number;
  name: string;
  category: Category;
  origin: string;
  durability: number;
  workability: number;
  priceRange: string;
  description: string;
  bestFor: string[];
  color: string;
  grain: string;
  img: string;
  badge?: string;
}

const materials: Material[] = [
  {
    id: 1,
    name: "African Mvule",
    category: "HARDWOOD",
    origin: "East Africa",
    durability: 95,
    workability: 70,
    priceRange: "KSh 12,000–18,000/m³",
    description: "One of Africa's most prized hardwoods. Exceptionally dense and resistant to termites and moisture, making it ideal for outdoor and structural applications in the Kenyan climate.",
    bestFor: ["Dining Tables", "Outdoor Furniture", "Structural Beams"],
    color: "Golden Brown to Dark Brown",
    grain: "Interlocked, coarse",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAsSq8Nra0r65CDQA_qJi7jyKDhmXniyz0h83suHoWU8t8pxgawS7bC8GAcxqHCTICoby3FB0vF4pfywk_nh4cYsvmgdhl1iHpZnUVbG14vRCVm0qAAEDikuMGETWn9ppi0lqXAh1ghiGmcz4lOU5Asx5NwFn0EDqR72eKOTTiDDQ1ikEOCCpjD8LGrH01SrNZ5FwIPlrHjlCwkk1a3yA3YBWCRyTaLAbgbCXf2cOhntzvxx02CQy9ONbEslKyuHp6LIwMMxjWxk9do",
    badge: "LOCAL FAVOURITE",
  },
  {
    id: 2,
    name: "African Mahogany",
    category: "HARDWOOD",
    origin: "West & Central Africa",
    durability: 85,
    workability: 90,
    priceRange: "KSh 15,000–22,000/m³",
    description: "The quintessential fine furniture wood. Known for its rich reddish-brown colour and beautiful straight grain, it machines and finishes exceptionally well.",
    bestFor: ["Cabinet Making", "Veneers", "High-End Furniture"],
    color: "Reddish-Brown",
    grain: "Straight to interlocked",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuALcwqDtHQMuozeBQ5ychH6X8MBPZ2iGrfOh5ImF0ZojiiCVwCvIUTmjhBOCdtBHbbpOzB5LshODZUAAxVuq-M5aStTO1BMHW2uxbfiqMQNWGXahaHAV9KxRgd9eejgt4D1AIcb7U1mA9Jx8JJt2Q-vDaonMYKGDq9WuSDf9sOCQhcdgzbgPxaEj-JEwXsHSLvfMrU0caQrl3bh0f8MSRSXgl-ZxWZDfxRDCSD5B8MO0yJXZBJZPGKanC0c1hTeOVXxzQezy3Ug_Qwg",
  },
  {
    id: 3,
    name: "Black Walnut",
    category: "HARDWOOD",
    origin: "North America (Imported)",
    durability: 80,
    workability: 85,
    priceRange: "KSh 28,000–45,000/m³",
    description: "The premium imported hardwood of choice for luxury furniture. Its dark, chocolate-brown heartwood and straight grain make it visually stunning and highly sought after.",
    bestFor: ["Live-Edge Tables", "Luxury Furniture", "Decorative Panels"],
    color: "Dark Chocolate Brown",
    grain: "Straight, occasionally wavy",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAnmUYJCVlqTL6AzkLeoD2LZTKYMnb4sfrexaOe0jvPWD6spR9lo-9UJsGepINOs6Gl8uR_YZ15OhODmHgV2dBAM3GJ08ZUCmZF7KzJCdWBCpEsw9ORWdA2oL0xaXDReS9NqXqTcydmKLX104BAc_yd-uiNyLMJLqzK4iVZi42S-7iiy4Q90RjtqvQJ1wS-cR5Lv8Nv2Q4fFS8w-DxkFWFWN4aBoma9892xEdDuguRpSR5txWWie0FSOyNOqjauM4YMZkLdwIIRuxFG",
    badge: "PREMIUM",
  },
  {
    id: 4,
    name: "Cherry Wood",
    category: "HARDWOOD",
    origin: "North America (Imported)",
    durability: 75,
    workability: 92,
    priceRange: "KSh 22,000–35,000/m³",
    description: "Beloved for its warm, reddish tones that deepen beautifully with age and light exposure. An excellent choice for bedroom and living room furniture.",
    bestFor: ["Bedroom Furniture", "Chairs", "Decorative Items"],
    color: "Light Pink to Reddish-Brown",
    grain: "Fine, straight",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkae4jFO215TwwYfODeHibUzdIT93poQklQR7l0P8zAKJpRMrphd1RLJOwiqZy-xIG43qj7Rn4wZY1B-xEwiDdj5dxIBiOxV6hfXiI1_9uOT1B3g9UiclWMt2QY98Ky0fYVZw120vlqsBb7Rk-to7Xwx9zGQz4RYusbCDP6a--8qJ9VojLv0qs89XTqSXVUQLUNxpvx-w75Qa154joDq8hpEG57PiNV463AXjQXgCdEMlFagN5ICB4_yGmw8rXJIh8V8o7OFYn-EjS",
  },
  {
    id: 5,
    name: "Pine (Treated)",
    category: "SOFTWOOD",
    origin: "Kenya (Local)",
    durability: 55,
    workability: 95,
    priceRange: "KSh 4,500–8,000/m³",
    description: "The most affordable option for budget-conscious projects. Locally grown and treated, it works well for painted furniture and shelving where cost is a priority.",
    bestFor: ["Shelving", "Painted Furniture", "Budget Projects"],
    color: "Pale Yellow to White",
    grain: "Straight, knotty",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAatGztftak76tZ56xv3wcaukQKkuypfaYyWaOP_dvctNFT8YTzx_Bh2vcjjBDqg8ItJaLfkm8Hjen2pOBJLjCHGgA40oRW0i8MigiGEXXpvDA-Wk8dN9C_7HOarMSA3L8rqd8e31I1vLlYGknetLmIwDzNzMuGJPwonDZZwtC96I5L0AX8vsX96M5ur0rNXrcZNcucbtyN7JsrAOPgcVux1THQoy7Y9YdPGOATEykHP1F_bzIS8l74HrTDFgeYIJ2ZCA_bycJuExqO",
    badge: "BUDGET FRIENDLY",
  },
  {
    id: 6,
    name: "Cold-Rolled Steel",
    category: "METAL",
    origin: "Industrial",
    durability: 99,
    workability: 75,
    priceRange: "KSh 180–250/kg",
    description: "The backbone of our structural furniture frames. Cold-rolled steel offers superior surface finish and tight dimensional tolerances compared to hot-rolled variants.",
    bestFor: ["Table Legs", "Frames", "Structural Support"],
    color: "Metallic Grey",
    grain: "Smooth surface",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCi0W20K7JdvjhzPhBCsufmbaCx6pdfVSw5SrxgrjXUKLHdiJV1rROV8o8_LKu53mozE401KnCURBw11DWNKdpKPHa0ibFoeGGLzOxpKn3p_Uy1hGqt0MpJ627Qet6f84qC9j_56U52neJQVm47khZxpwk3q_8k5nHvVV65ZKkuMiXOc3WCzvztYLUnDWoafbQ_sQr9gv0TTaPMnqfFtWxan8a0t_id8OOQf1rb0Wxl9U9GlU10hIq1zgaXyXv3I4haAXKje6wpvGEY",
  },
  {
    id: 7,
    name: "Copper Sheet",
    category: "METAL",
    origin: "Industrial",
    durability: 80,
    workability: 88,
    priceRange: "KSh 850–1,200/kg",
    description: "Used for decorative panels, tabletops, and accents. Copper develops a beautiful natural patina over time, giving each piece a living, evolving character.",
    bestFor: ["Decorative Panels", "Bar Tops", "Accent Pieces"],
    color: "Warm Copper → Green Patina",
    grain: "Smooth, malleable",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7lN-Q9-UdgQvVpdNM0EqImb13L6tstH98aZmGieGKorDRvTR_TEB_4eTmnpmSJ_Ddczbo_pHrfgkX7bJKjT4G8XZt7smcrLZ5ZAnyhBN3lFmo9mn71Ae9HLSFQjYU4Cmw8Z-Olmmz7wCkhA8uP1bPo5dozYLHRco2uTtzLQSTW64H_k9YKA95bpok7XWOX35xBjz7ufk-MEH1Ft-ORPRhni4afg7JBjEIzQjwXLP6iklXEfcS0a-C6LrH_d2v9v3kIKOySZQBg6Va",
    badge: "TRENDING",
  },
  {
    id: 8,
    name: "Matte Black Powder Coat",
    category: "FINISH",
    origin: "Industrial",
    durability: 90,
    workability: 100,
    priceRange: "KSh 800–1,500/m²",
    description: "Our most popular metal finish. Electrostatically applied powder provides a durable, even coating that is scratch-resistant and available in any RAL colour.",
    bestFor: ["Table Frames", "Shelving", "Industrial Look"],
    color: "Jet Black (RAL 9005)",
    grain: "Matte smooth",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAsSq8Nra0r65CDQA_qJi7jyKDhmXniyz0h83suHoWU8t8pxgawS7bC8GAcxqHCTICoby3FB0vF4pfywk_nh4cYsvmgdhl1iHpZnUVbG14vRCVm0qAAEDikuMGETWn9ppi0lqXAh1ghiGmcz4lOU5Asx5NwFn0EDqR72eKOTTiDDQ1ikEOCCpjD8LGrH01SrNZ5FwIPlrHjlCwkk1a3yA3YBWCRyTaLAbgbCXf2cOhntzvxx02CQy9ONbEslKyuHp6LIwMMxjWxk9do",
    badge: "MOST POPULAR",
  },
  {
    id: 9,
    name: "Gunmetal Blue Finish",
    category: "FINISH",
    origin: "Industrial",
    durability: 85,
    workability: 100,
    priceRange: "KSh 1,200–2,000/m²",
    description: "A signature Rarewoods Crew finish for hybrid wood-and-metal pieces. The deep blue-grey tone of gunmetal creates a sophisticated industrial accent that pairs beautifully with walnut and mahogany.",
    bestFor: ["Luxury Frames", "Statement Pieces", "Modern Industrial"],
    color: "Deep Blue-Grey",
    grain: "Satin smooth",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuALcwqDtHQMuozeBQ5ychH6X8MBPZ2iGrfOh5ImF0ZojiiCVwCvIUTmjhBOCdtBHbbpOzB5LshODZUAAxVuq-M5aStTO1BMHW2uxbfiqMQNWGXahaHAV9KxRgd9eejgt4D1AIcb7U1mA9Jx8JJt2Q-vDaonMYKGDq9WuSDf9sOCQhcdgzbgPxaEj-JEwXsHSLvfMrU0caQrl3bh0f8MSRSXgl-ZxWZDfxRDCSD5B8MO0yJXZBJZPGKanC0c1hTeOVXxzQezy3Ug_Qwg",
    badge: "SIGNATURE",
  },
];

const FILTERS: { label: string; value: Category }[] = [
  { label: "ALL MATERIALS", value: "ALL" },
  { label: "HARDWOOD", value: "HARDWOOD" },
  { label: "SOFTWOOD", value: "SOFTWOOD" },
  { label: "METAL", value: "METAL" },
  { label: "FINISHES", value: "FINISH" },
];

function RatingBar({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-xs text-outline" style={{ fontFamily: "Libre Franklin, sans-serif" }}>{label}</span>
        <span className="text-xs text-primary" style={{ fontFamily: "Libre Franklin, sans-serif" }}>{value}/100</span>
      </div>
      <div className="h-1 bg-outline-variant/30 w-full">
        <div
          className="h-full bg-primary transition-all duration-700"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default function CatalogPage() {
  const [activeFilter, setActiveFilter] = useState<Category>("ALL");
  const [activeMaterial, setActiveMaterial] = useState<Material>(materials[0]);
  const [search, setSearch] = useState("");

  const filtered = materials.filter((m) => {
    const matchesFilter = activeFilter === "ALL" || m.category === activeFilter;
    const matchesSearch =
      search === "" ||
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <main className="bg-background text-on-surface min-h-screen">
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/oak.png')" }}
      />

      <div className="relative z-10 pt-32 pb-24 max-w-[1440px] mx-auto px-4 md:px-16">

        {/* Header */}
        <header className="mb-12">
          <span className="text-xs text-primary uppercase tracking-[0.2em] mb-4 block" style={{ fontFamily: "Libre Franklin, sans-serif" }}>
            Material Library
          </span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight" style={{ fontFamily: "Libre Franklin, sans-serif" }}>
                Wood &amp; Metal Catalog
              </h1>
              <p className="text-on-surface-variant mt-3 max-w-xl">
                Explore our curated selection of timbers and metal finishes. Every material is hand-selected for quality, sustainability, and beauty.
              </p>
            </div>
            <Link
              href="/booking"
              className="flex-shrink-0 bg-primary text-on-primary px-8 py-3 text-sm font-semibold hover:brightness-110 transition-all"
            >
              Book Consultation
            </Link>
          </div>
        </header>

        {/* Search + Filters */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="relative w-full">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search timber, metal, finishes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ background: "var(--color-surface-container-low)", border: "1px solid rgba(224,192,175,0.6)" }}
              className="w-full pl-12 pr-4 py-4 text-base text-on-surface placeholder-outline outline-none focus:ring-0"
              onFocus={(e) => e.target.style.borderColor = '#994700'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(224,192,175,0.6)'}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`px-4 py-2 text-xs tracking-widest transition-all ${
                  activeFilter === f.value
                    ? "bg-primary text-on-primary"
                    : "border border-outline-variant text-on-surface-variant hover:border-primary"
                }`}
                style={{ fontFamily: "Libre Franklin, sans-serif" }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Material Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
            {filtered.length === 0 && (
              <div className="col-span-2 py-16 text-center text-outline">
                <span className="material-symbols-outlined text-4xl mb-4 block">search_off</span>
                No materials found.
              </div>
            )}
            {filtered.map((material) => (
              <div
                key={material.id}
                onClick={() => setActiveMaterial(material)}
                className={`cursor-pointer group relative overflow-hidden border transition-all ${
                  activeMaterial.id === material.id
                    ? "border-primary"
                    : "border-outline-variant/40 hover:border-primary/50"
                }`}
              >
                <div className="h-40 overflow-hidden relative rounded-t-xl">
                  <img
                    src={material.img}
                    alt={material.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent" />
                  {material.badge && (
                    <div className="absolute top-3 right-3 bg-primary px-2 py-0.5">
                      <span className="text-[9px] font-bold text-on-primary" style={{ fontFamily: "Libre Franklin, sans-serif" }}>
                        {material.badge}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4 bg-surface-container-low">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-sm" style={{ fontFamily: "Libre Franklin, sans-serif" }}>{material.name}</h3>
                    <span
                      className="text-[10px] px-2 py-0.5 border border-outline-variant text-outline"
                      style={{ fontFamily: "Libre Franklin, sans-serif" }}
                    >
                      {material.category}
                    </span>
                  </div>
                  <p className="text-xs text-primary">{material.priceRange}</p>
                </div>
                {activeMaterial.id === material.id && (
                  <div className="absolute inset-y-0 left-0 w-1 bg-primary" />
                )}
              </div>
            ))}
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-7 sticky top-32">
            <div className="bg-surface-container-low border border-outline-variant/40 rounded-lg overflow-hidden">
              {/* Image */}
              <div className="h-64 overflow-hidden relative rounded-t-xl">
                <img
                  src={activeMaterial.img}
                  alt={activeMaterial.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  {activeMaterial.badge && (
                    <span className="bg-primary text-on-primary text-xs font-bold px-3 py-1 block mb-2" style={{ fontFamily: "Libre Franklin, sans-serif" }}>
                      {activeMaterial.badge}
                    </span>
                  )}
                  <h2 className="text-3xl font-bold" style={{ fontFamily: "Libre Franklin, sans-serif" }}>
                    {activeMaterial.name}
                  </h2>
                </div>
              </div>

              {/* Details */}
              <div className="p-6">
                {/* Meta */}
                <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-outline-variant/40">
                  {[
                    { label: "CATEGORY", value: activeMaterial.category },
                    { label: "ORIGIN", value: activeMaterial.origin },
                    { label: "PRICE", value: activeMaterial.priceRange },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="text-[10px] text-outline mb-1 tracking-widest" style={{ fontFamily: "Libre Franklin, sans-serif" }}>{item.label}</p>
                      <p className="text-sm font-semibold">{item.value}</p>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                  {activeMaterial.description}
                </p>

                {/* Ratings */}
                <div className="space-y-3 mb-6">
                  <RatingBar value={activeMaterial.durability} label="DURABILITY" />
                  <RatingBar value={activeMaterial.workability} label="WORKABILITY" />
                </div>

                {/* Properties */}
                <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-surface-container border border-outline-variant/40">
                  <div>
                    <p className="text-[10px] text-outline mb-1 tracking-widest" style={{ fontFamily: "Libre Franklin, sans-serif" }}>COLOUR</p>
                    <p className="text-sm">{activeMaterial.color}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-outline mb-1 tracking-widest" style={{ fontFamily: "Libre Franklin, sans-serif" }}>GRAIN / TEXTURE</p>
                    <p className="text-sm">{activeMaterial.grain}</p>
                  </div>
                </div>

                {/* Best For */}
                <div className="mb-6">
                  <p className="text-[10px] text-outline mb-3 tracking-widest" style={{ fontFamily: "Libre Franklin, sans-serif" }}>BEST FOR</p>
                  <div className="flex flex-wrap gap-2">
                    {activeMaterial.bestFor.map((use) => (
                      <span
                        key={use}
                        className="text-xs px-3 py-1 border border-outline-variant text-on-surface-variant"
                        style={{ fontFamily: "Libre Franklin, sans-serif" }}
                      >
                        {use}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href="/booking"
                  className="w-full block text-center bg-primary text-on-primary py-4 text-sm font-semibold hover:brightness-110 transition-all active:scale-[0.98]"
                  style={{ fontFamily: "Libre Franklin, sans-serif" }}
                >
                  USE {activeMaterial.name.toUpperCase()} IN MY PROJECT →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
