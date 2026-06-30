"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

const filters = ["ALL WORKS", "KITCHENS", "STAIRCASES", "OUTDOOR", "CABINETRY"];

const projects = [
  {
    id: 1,
    title: "The Heritage Staircase",
    category: "STAIRCASES",
    materials: "Sapele Mahogany, Brass Inlay",
    timeline: "5 Weeks",
    span: "row-span-2",
    img: "https://images.unsplash.com/photo-1600607687644-c7531e927e0e?w=900&q=80",
    tags: ["STAIRCASES"],
  },
  {
    id: 2,
    title: "Olive Wood Kitchen Suite",
    category: "KITCHENS",
    desc: "Hand-jointed olive wood cabinetry with brushed brass hardware for a Karen residence.",
    span: "",
    img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80",
    tags: ["KITCHENS"],
  },
  {
    id: 3,
    title: "Lakeview Cedar Deck",
    category: "OUTDOOR",
    desc: "Weather-treated cedar decking and pergola overlooking Lake Naivasha, joinery built to withstand the season.",
    span: "",
    img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&q=80",
    tags: ["OUTDOOR"],
  },
  {
    id: 4,
    title: "The Walnut Wardrobe",
    category: "CABINETRY",
    materials: "American Walnut, Soft-Close Hardware",
    timeline: "3 Weeks",
    span: "row-span-2",
    img: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=900&q=80",
    tags: ["CABINETRY"],
  },
  {
    id: 5,
    title: "Floating Oak Treads",
    category: "STAIRCASES",
    desc: "A cantilevered oak staircase with hidden steel supports, designed for a minimalist Lavington home.",
    span: "",
    img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80",
    tags: ["STAIRCASES"],
  },
  {
    id: 6,
    title: "Slatted Cedar Fluting",
    category: "CABINETRY",
    commission: "COMMISSION NO. 042",
    span: "",
    img: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=900&q=80",
    tags: ["CABINETRY"],
  },
];

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("ALL WORKS");

  const filtered = projects.filter((p) =>
    activeFilter === "ALL WORKS" ? true : p.tags.includes(activeFilter)
  );

  return (
    <main className="bg-background text-on-surface relative">
      <div className="relative z-10 pt-32 md:pt-40">
        <section className="px-6 md:px-margin-desktop max-w-container-max mx-auto mb-12">
          <div className="max-w-3xl">
            <span className="font-label-caps text-xs text-primary uppercase mb-4 block tracking-widest">
              Archive of Craft
            </span>
            <h1 className="font-headline-lg text-4xl md:text-display-lg font-extrabold mb-6 leading-tight tracking-tight">
              Masterpieces in Timber
            </h1>
            <p className="font-body-lg text-base md:text-body-lg text-on-surface-variant leading-relaxed">
              Explore our curated gallery of bespoke woodwork, where every grain tells a story of heritage, precision, and architectural elegance.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-margin-desktop max-w-container-max mx-auto mb-10">
          <div className="flex flex-wrap gap-3">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`font-label-caps text-xs px-5 py-2 rounded-full tracking-widest transition-all ${
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

        {/* Masonry-style gallery */}
        <section className="px-6 md:px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[260px] mb-24">
          {filtered.map((project) => (
            <div
              key={project.id}
              className={`${project.span} group relative overflow-hidden rounded-xl ghost-border bg-surface-container shadow-ambient`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.img}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/90 via-inverse-surface/10 to-transparent" />

              <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="font-label-caps text-[10px] text-primary-fixed-dim tracking-widest mb-1">{project.category}</span>
                <h3 className="font-headline-md text-lg font-bold text-inverse-on-surface mb-1">{project.title}</h3>
                {project.materials && (
                  <p className="text-xs text-inverse-on-surface/70">{project.materials} &middot; {project.timeline}</p>
                )}
                {project.desc && (
                  <p className="text-xs text-inverse-on-surface/70 leading-relaxed">{project.desc}</p>
                )}
                {project.commission && (
                  <p className="text-xs text-inverse-on-surface/60 tracking-widest">{project.commission}</p>
                )}
              </div>

              <div className="absolute bottom-4 left-4 z-10 group-hover:opacity-0 transition-opacity duration-300">
                <h3 className="font-headline-md text-base font-semibold text-inverse-on-surface drop-shadow">{project.title}</h3>
              </div>
            </div>
          ))}
        </section>

        {/* CTA banner */}
        <section className="px-6 md:px-margin-desktop max-w-container-max mx-auto mb-24">
          <div className="rounded-xl py-16 px-8 text-center flex flex-col items-center bg-inverse-surface text-inverse-on-surface">
            <h2 className="font-headline-lg text-3xl md:text-4xl font-extrabold mb-4">Your Vision, Our Timber.</h2>
            <p className="font-body-lg text-base text-inverse-on-surface/70 max-w-2xl mb-10 leading-relaxed">
              Every exceptional space begins with a conversation. Let&apos;s discuss your next bespoke project.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <Link
                href="/booking"
                className="bg-primary text-on-primary px-10 py-4 rounded-lg text-sm font-bold hover:bg-primary-container transition-all active:scale-95"
              >
                Book a Consultation
              </Link>
              <Link
                href="/portfolio#download"
                className="border border-inverse-on-surface/30 text-inverse-on-surface px-10 py-4 rounded-lg text-sm font-bold hover:border-primary-fixed-dim hover:text-primary-fixed-dim transition-all"
              >
                Download Portfolio PDF
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
