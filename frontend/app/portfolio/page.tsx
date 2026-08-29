"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

const filters = ["ALL WORKS", "FURNITURE", "INSTITUTIONAL", "OUTDOOR", "STORAGE"];

const projects = [
  {
    id: 1,
    title: "Backyard Play Structure",
    category: "OUTDOOR",
    desc: "A multi-level timber play structure with climbing wall, tyre swings, and slide, built from reclaimed pallet wood.",
    span: "row-span-2",
    img: "/images/hero.jpg",
    tags: ["OUTDOOR"],
  },
  {
    id: 2,
    title: "Live-Edge Log Table",
    category: "FURNITURE",
    desc: "A hand-finished live-edge slab coffee table showcasing the natural grain of the timber.",
    span: "",
    img: "/images/log-table.jpg",
    tags: ["FURNITURE"],
  },
  {
    id: 3,
    title: "Mahogany Bed Frame",
    category: "FURNITURE",
    desc: "Solid mahogany bed frame with slatted base, built to order.",
    span: "",
    img: "/images/mahogany-bed.jpg",
    tags: ["FURNITURE"],
  },
  {
    id: 4,
    title: "Mahogany TV Stand",
    category: "FURNITURE",
    materials: "Mahogany",
    timeline: "Custom order",
    span: "row-span-2",
    img: "/images/mahogany-tv-stand.jpg",
    tags: ["FURNITURE"],
  },
  {
    id: 5,
    title: "School Dining Tables",
    category: "INSTITUTIONAL",
    desc: "A batch of long-format steel-framed dining tables built for a school dining hall.",
    span: "",
    img: "/images/school-dining-tables.jpg",
    tags: ["INSTITUTIONAL"],
  },
  {
    id: 6,
    title: "School Desks",
    category: "INSTITUTIONAL",
    commission: "BULK ORDER",
    span: "",
    img: "/images/school-tables.jpg",
    tags: ["INSTITUTIONAL"],
  },
  {
    id: 7,
    title: "Science Lab Furniture",
    category: "INSTITUTIONAL",
    desc: "Lab benches, sinks, and stools fitted out for a school science laboratory.",
    span: "",
    img: "/images/lab-table-chairs-sidetable.jpg",
    tags: ["INSTITUTIONAL"],
  },
  {
    id: 8,
    title: "Shoe & Bag Rack",
    category: "STORAGE",
    desc: "Custom cubby-style storage rack for shoes and bags.",
    span: "",
    img: "/images/shoe-and-bag-rack.jpg",
    tags: ["STORAGE"],
  },
  {
    id: 9,
    title: "Cubby Storage Shelving",
    category: "STORAGE",
    desc: "Modular cube-style shelving units for flexible storage.",
    span: "",
    img: "/images/shelves.jpg",
    tags: ["STORAGE"],
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
