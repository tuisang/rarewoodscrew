"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

const filters = ["ALL WORKS", "GATES", "RAILINGS", "STAIRCASES", "FURNITURE"];

const projects = [
  {
    id: 1,
    title: "The Cantilever Gate",
    category: "GATES",
    materials: "Mild Steel, Powder Coat, Laser-Cut Inserts",
    timeline: "3 Weeks",
    size: "md:col-span-8",
    height: "min-h-[600px]",
    img: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1200&q=80",
    tags: ["GATES"],
  },
  {
    id: 2,
    title: "Heirloom Staircase Restoration",
    category: "STAIRCASES",
    desc: "Rust-damaged spindles stripped, re-welded, and re-finished in matte gunmetal.",
    size: "md:col-span-4",
    height: "min-h-[600px]",
    img: "https://images.unsplash.com/photo-1486304873000-235643847519?w=800&q=80",
    tags: ["STAIRCASES"],
  },
  {
    id: 3,
    title: "The Balustrade Series",
    category: "RAILINGS",
    desc: "A structural balustrade combining tempered glass with a hidden steel spine. Designed for a penthouse overlooking the skyline.",
    loadCap: "350 KG/m",
    finish: "Matte Gunmetal",
    size: "md:col-span-12",
    height: "h-[500px]",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80",
    tags: ["RAILINGS"],
  },
  {
    id: 4,
    title: "Steel & Oak Dining Table",
    commission: "COMMISSION NO. 118",
    size: "md:col-span-6",
    height: "h-[500px]",
    img: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1000&q=80",
    tags: ["FURNITURE"],
  },
  {
    id: 5,
    title: "Industrial Security Gate Installation",
    desc: "Full commercial fit-out including perimeter gating, pedestrian access, and access control integration.",
    size: "md:col-span-6",
    height: "h-[500px]",
    img: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1000&q=80",
    tags: ["GATES"],
  },
];

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("ALL WORKS");

  const filtered = projects.filter((p) =>
    activeFilter === "ALL WORKS" ? true : p.tags.includes(activeFilter)
  );

  return (
    <main className="bg-background text-on-surface relative">
      <div className="relative z-10 pt-40">
        <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-20">
          <div className="max-w-3xl">
            <span className="font-label-caps text-label-caps text-primary uppercase mb-4 block tracking-widest">
              Archive of Craft
            </span>
            <h1 className="font-display-lg text-display-lg mb-8 leading-tight">
              Mastery Forged in Steel
            </h1>
            <p className="text-body-lg text-on-surface-variant leading-relaxed">
              A curated selection of our most challenging and refined commissions. From private residences to commercial flagships, our work bridges structural integrity with artistic expression.
            </p>
          </div>
        </section>

        <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-6">
          <div className="flex flex-wrap gap-4 border-b border-outline-variant/30 pb-6">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`font-label-caps text-label-caps px-6 py-2 rounded-lg tracking-widest transition-all ${
                  activeFilter === f
                    ? "bg-primary text-on-primary"
                    : "border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </section>

        <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-gutter mb-24">
          {filtered.map((project) => (
            <div
              key={project.id}
              className={`${project.size} group relative overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container ${project.height} flex flex-col justify-end`}
            >
              {project.img && (
                <img
                  src={project.img}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />

              {project.materials && (
                <div className="absolute inset-0 z-20 p-8 glass-panel opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-headline-lg text-headline-lg-mobile text-primary">{project.title}</h3>
                    <span className="font-label-caps text-label-caps text-on-surface-variant tracking-widest">{project.category}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <p className="font-label-caps text-label-caps text-on-surface-variant tracking-widest mb-1">MATERIALS</p>
                      <p className="text-body-sm">{project.materials}</p>
                    </div>
                    <div>
                      <p className="font-label-caps text-label-caps text-on-surface-variant tracking-widest mb-1">TIMELINE</p>
                      <p className="text-body-sm">{project.timeline}</p>
                    </div>
                  </div>
                </div>
              )}

              {project.loadCap && (
                <div className="relative z-10 grid md:grid-cols-2 h-full">
                  <div />
                  <div className="p-12 flex flex-col justify-center bg-surface-container-high border-l border-outline-variant/30">
                    <span className="font-label-caps text-label-caps text-primary mb-4 block tracking-widest">RAILINGS</span>
                    <h2 className="font-headline-lg text-headline-lg mb-6">{project.title}</h2>
                    <p className="text-on-surface-variant mb-8 max-w-md text-body-sm leading-relaxed">{project.desc}</p>
                    <div className="flex gap-12">
                      <div>
                        <p className="font-label-caps text-label-caps text-on-surface-variant tracking-widest mb-1">LOAD CAP.</p>
                        <p className="font-bold">{project.loadCap}</p>
                      </div>
                      <div>
                        <p className="font-label-caps text-label-caps text-on-surface-variant tracking-widest mb-1">FINISH</p>
                        <p className="font-bold">{project.finish}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {!project.materials && !project.loadCap && (
                <>
                  {project.desc ? (
                    <div className="absolute inset-0 glass-panel opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-12 flex flex-col justify-center items-center text-center z-10">
                      <h3 className="font-headline-lg text-headline-lg-mobile text-primary mb-4">{project.title}</h3>
                      <p className="text-body-sm mb-8 max-w-sm text-on-surface-variant">{project.desc}</p>
                      <button className="font-label-caps text-label-caps border border-primary text-primary px-8 py-3 rounded-lg hover:bg-primary hover:text-on-primary transition-all tracking-widest">
                        VIEW CASE STUDY
                      </button>
                    </div>
                  ) : null}
                  <div className="absolute bottom-0 left-0 p-10 z-10">
                    <h3 className="font-title-md text-title-md mb-2">{project.title}</h3>
                    {project.commission && (
                      <span className="font-label-caps text-label-caps text-primary tracking-widest">{project.commission}</span>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </section>

        <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-24">
          <div className="glass-panel rounded-xl py-20 px-8 text-center flex flex-col items-center">
            <h2 className="font-headline-lg text-display-lg mb-6">Have a Unique Vision?</h2>
            <p className="text-body-lg text-on-surface-variant max-w-2xl mb-12 leading-relaxed">
              We specialize in projects that others call &quot;impossible.&quot; From conceptual sketches to final installation, we collaborate with you to create something built to last.
            </p>
            <div className="flex flex-col md:flex-row gap-6">
              <Link
                href="/booking"
                className="bg-secondary-container text-white px-12 py-4 rounded-lg text-body-sm font-semibold hover:opacity-90 transition-all active:scale-95 tracking-widest"
              >
                REQUEST ESTIMATE
              </Link>
              <Link
                href="/ai-artisan"
                className="border border-outline-variant text-on-surface px-12 py-4 rounded-lg text-body-sm font-semibold hover:border-primary transition-all active:scale-95 tracking-widest"
              >
                ASK THE AI ARTISAN
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}