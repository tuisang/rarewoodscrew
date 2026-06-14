"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

const filters = ["ALL WORKS", "WOOD", "METAL", "INTERIOR", "RESTORATION"];

const projects = [
  {
    id: 1,
    title: "The Obsidian Loft",
    category: "INTERIOR",
    materials: "Walnut, Cold-Rolled Steel, Slate",
    timeline: "14 Months",
    size: "md:col-span-8",
    height: "min-h-[600px]",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAsSq8Nra0r65CDQA_qJi7jyKDhmXniyz0h83suHoWU8t8pxgawS7bC8GAcxqHCTICoby3FB0vF4pfywk_nh4cYsvmgdhl1iHpZnUVbG14vRCVm0qAAEDikuMGETWn9ppi0lqXAh1ghiGmcz4lOU5Asx5NwFn0EDqR72eKOTTiDDQ1ikEOCCpjD8LGrH01SrNZ5FwIPlrHjlCwkk1a3yA3YBWCRyTaLAbgbCXf2cOhntzvxx02CQy9ONbEslKyuHp6LIwMMxjWxk9do",
    tags: ["INTERIOR"],
  },
  {
    id: 2,
    title: "Heirloom Mahogany Revival",
    category: "RESTORATION",
    desc: "Salvaged from water damage; 300+ hours of hand-scraping and oil finishing.",
    size: "md:col-span-4",
    height: "min-h-[600px]",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuALcwqDtHQMuozeBQ5ychH6X8MBPZ2iGrfOh5ImF0ZojiiCVwCvIUTmjhBOCdtBHbbpOzB5LshODZUAAxVuq-M5aStTO1BMHW2uxbfiqMQNWGXahaHAV9KxRgd9eejgt4D1AIcb7U1mA9Jx8JJt2Q-vDaonMYKGDq9WuSDf9sOCQhcdgzbgPxaEj-JEwXsHSLvfMrU0caQrl3bh0f8MSRSXgl-ZxWZDfxRDCSD5B8MO0yJXZBJZPGKanC0c1hTeOVXxzQezy3Ug_Qwg",
    tags: ["RESTORATION", "WOOD"],
  },
  {
    id: 3,
    title: "The Cantilever Series",
    category: "METAL + WOOD",
    desc: "A structural marvel combining 4-inch thick live-edge oak with a hidden steel spine. Designed for a penthouse overlooking the skyline.",
    loadCap: "1200 KG",
    finish: "Matte Gunblue",
    size: "md:col-span-12",
    height: "h-[500px]",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAnmUYJCVlqTL6AzkLeoD2LZTKYMnb4sfrexaOe0jvPWD6spR9lo-9UJsGepINOs6Gl8uR_YZ15OhODmHgV2dBAM3GJ08ZUCmZF7KzJCdWBCpEsw9ORWdA2oL0xaXDReS9NqXqTcydmKLX104BAc_yd-uiNyLMJLqzK4iVZi42S-7iiy4Q90RjtqvQJ1wS-cR5Lv8Nv2Q4fFS8w-DxkFWFWN4aBoma9892xEdDuguRpSR5txWWie0FSOyNOqjauM4YMZkLdwIIRuxFG",
    tags: ["METAL", "WOOD"],
  },
  {
    id: 4,
    title: "Copper & Cherry Desk",
    commission: "COMMISSION NO. 442",
    size: "md:col-span-6",
    height: "h-[500px]",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPMO7vYip5jXUg6mES1eAYIfWiP63erSvCs4HzHm-yq7FLlJl6RW-2Xv3rwq4Gh96F1B-Ewd2NcwHuwNhBEvaDAWfZSMn7W8737k5fkxzkglJqkXLhED-ZXp2KOJ7aL7bdOHJr_j-gVbE3M7ad1QXpk_EpU0g86aORsU3Z-I2g39uL1chPOiRPP5JVf1DyGmfb01kfzpIxj06Tzc9WqAmAMFsHsBZkdjHQPYQpsE4JTx6VMdpRNbpCVtZEk7vUPEs8GNliA_3rb0F9",
    tags: ["WOOD", "METAL"],
  },
  {
    id: 5,
    title: "Brass & Barrel Distillery",
    desc: "Full commercial fit-out including bar construction, seating, and wall paneling.",
    size: "md:col-span-6",
    height: "h-[500px]",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkae4jFO215TwwYfODeHibUzdIT93poQklQR7l0P8zAKJpRMrphd1RLJOwiqZy-xIG43qj7Rn4wZY1B-xEwiDdj5dxIBiOxV6hfXiI1_9uOT1B3g9UiclWMt2QY98Ky0fYVZw120vlqsBb7Rk-to7Xwx9zGQz4RYusbCDP6a--8qJ9VojLv0qs89XTqSXVUQLUNxpvx-w75Qa154joDq8hpEG57PiNV463AXjQXgCdEMlFagN5ICB4_yGmw8rXJIh8V8o7OFYn-EjS",
    tags: ["INTERIOR", "METAL", "WOOD"],
  },
];

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("ALL WORKS");

  const filtered = projects.filter((p) =>
    activeFilter === "ALL WORKS" ? true : p.tags.includes(activeFilter)
  );

  return (
    <main className="bg-[#131313] text-[#e5e2e1] relative">
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')" }}
      />

      <div className="relative z-10 pt-40">
        {/* Hero */}
        <section className="px-4 md:px-16 max-w-[1440px] mx-auto mb-20">
          <div className="max-w-3xl">
            <span className="text-xs text-[#e8bf9b] uppercase mb-4 block tracking-widest" style={{ fontFamily: "JetBrains Mono, monospace" }}>
              Archive of Craft
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight" style={{ fontFamily: "Playfair Display, serif", letterSpacing: "-0.02em" }}>
              Mastery Carved in Wood and Forged in Iron
            </h1>
            <p className="text-lg text-[#d3c4b9] leading-relaxed">
              A curated selection of our most challenging and refined commissions. From private residences to commercial flagships, our work bridges the gap between functional utility and artistic expression.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="px-4 md:px-16 max-w-[1440px] mx-auto mb-6">
          <div className="flex flex-wrap gap-4 border-b border-[#4f453d]/30 pb-6">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`text-xs px-6 py-2 tracking-widest transition-all ${
                  activeFilter === f
                    ? "bg-[#e8bf9b] text-[#442b12]"
                    : "border border-[#4f453d] text-[#d3c4b9] hover:border-[#e8bf9b] hover:text-[#e8bf9b]"
                }`}
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                {f}
              </button>
            ))}
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="px-4 md:px-16 max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 mb-24">
          {filtered.map((project) => (
            <div
              key={project.id}
              className={`${project.size} group relative overflow-hidden border border-[rgba(156,142,132,0.2)] border-t-[rgba(224,227,231,0.15)] bg-[#1c1b1b] ${project.height} flex flex-col justify-end`}
            >
              {project.img && (
                <img
                  src={project.img}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-transparent opacity-80" />

              {/* Hover overlay for detail projects */}
              {project.materials && (
                <div className="absolute inset-0 z-20 p-8 bg-[#131313]/85 backdrop-blur-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-3xl font-semibold text-[#e8bf9b]" style={{ fontFamily: "Playfair Display, serif" }}>{project.title}</h3>
                    <span className="text-xs text-[#d3c4b9] tracking-widest" style={{ fontFamily: "JetBrains Mono, monospace" }}>{project.category}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <p className="text-xs text-[#9c8e84] tracking-widest mb-1" style={{ fontFamily: "JetBrains Mono, monospace" }}>MATERIALS</p>
                      <p className="text-sm">{project.materials}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#9c8e84] tracking-widest mb-1" style={{ fontFamily: "JetBrains Mono, monospace" }}>TIMELINE</p>
                      <p className="text-sm">{project.timeline}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Wide project with specs */}
              {project.loadCap && (
                <div className="relative z-10 grid md:grid-cols-2 h-full">
                  <div />
                  <div className="p-12 flex flex-col justify-center bg-[#2a2a2a] border-l border-[#4f453d]/30">
                    <span className="text-xs text-[#e8bf9b] mb-4 block tracking-widest" style={{ fontFamily: "JetBrains Mono, monospace" }}>METAL + WOOD</span>
                    <h2 className="text-3xl font-semibold mb-6" style={{ fontFamily: "Playfair Display, serif" }}>{project.title}</h2>
                    <p className="text-[#d3c4b9] mb-8 max-w-md text-sm leading-relaxed">{project.desc}</p>
                    <div className="flex gap-12">
                      <div>
                        <p className="text-xs text-[#9c8e84] tracking-widest mb-1" style={{ fontFamily: "JetBrains Mono, monospace" }}>LOAD CAP.</p>
                        <p className="font-bold">{project.loadCap}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#9c8e84] tracking-widest mb-1" style={{ fontFamily: "JetBrains Mono, monospace" }}>FINISH</p>
                        <p className="font-bold">{project.finish}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Standard card info */}
              {!project.materials && !project.loadCap && (
                <>
                  {project.desc ? (
                    <div className="absolute inset-0 bg-[#131313]/85 backdrop-blur-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-12 flex flex-col justify-center items-center text-center z-10">
                      <h3 className="text-3xl font-semibold text-[#e8bf9b] mb-4" style={{ fontFamily: "Playfair Display, serif" }}>{project.title}</h3>
                      <p className="text-sm mb-8 max-w-sm text-[#d3c4b9]">{project.desc}</p>
                      <button className="text-xs border border-[#e8bf9b] text-[#e8bf9b] px-8 py-3 hover:bg-[#e8bf9b] hover:text-[#442b12] transition-all tracking-widest" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                        VIEW CASE STUDY
                      </button>
                    </div>
                  ) : null}
                  <div className="absolute bottom-0 left-0 p-10 z-10">
                    <h3 className="text-2xl font-semibold mb-2" style={{ fontFamily: "Playfair Display, serif" }}>{project.title}</h3>
                    {project.commission && (
                      <span className="text-xs text-[#e8bf9b] tracking-widest" style={{ fontFamily: "JetBrains Mono, monospace" }}>{project.commission}</span>
                    )}
                    {project.category === "RESTORATION" && (
                      <span className="text-xs text-[#e8bf9b] tracking-widest block mb-2" style={{ fontFamily: "JetBrains Mono, monospace" }}>RESTORATION</span>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </section>

        {/* CTA */}
        <section className="px-4 md:px-16 max-w-[1440px] mx-auto mb-24">
          <div className="border border-[rgba(156,142,132,0.2)] bg-[#2a2a2a] py-20 px-8 text-center flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6" style={{ fontFamily: "Playfair Display, serif" }}>Have a Unique Vision?</h2>
            <p className="text-lg text-[#d3c4b9] max-w-2xl mb-12 leading-relaxed">
              We specialize in projects that others call &quot;impossible.&quot; From conceptual sketches to final installation, we collaborate with you to create something eternal.
            </p>
            <div className="flex flex-col md:flex-row gap-6">
              <Link
                href="/booking"
                className="bg-[#e8bf9b] text-[#442b12] px-12 py-4 text-sm font-semibold hover:brightness-110 transition-all active:scale-95 tracking-widest"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                REQUEST ESTIMATE
              </Link>
              <button
                className="border border-[#4f453d] text-[#e5e2e1] px-12 py-4 text-sm font-semibold hover:border-[#e8bf9b] transition-all active:scale-95 tracking-widest"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                VIEW RECENT TOOLS
              </button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
