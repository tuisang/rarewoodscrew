import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Journal | Rarewoods Crew Nairobi",
  description: "Wood care guides, species notes, and craft insights from the Rarewoods Crew workshop in Nairobi, Kenya.",
};

const POSTS = [
  {
    slug: "caring-for-oiled-mvule-furniture",
    title: "Caring for Oiled Mvule Furniture",
    excerpt: "Mvule is one of Kenya's most prized hardwoods — durable, termite-resistant, and rich in colour. Here's how to keep it looking its best for decades.",
    category: "Wood Care",
    readTime: "4 min read",
  },
  {
    slug: "wood-care-guide",
    title: "The Essential Wood Furniture Care Guide",
    excerpt: "Whether it's mahogany, oak, or teak, proper care is what separates furniture that lasts a lifetime from furniture that doesn't survive the decade.",
    category: "Wood Care",
    readTime: "3 min read",
  },
  {
    slug: "preventing-rust-on-steel-furniture",
    title: "Preventing Rust on Steel Furniture",
    excerpt: "Steel furniture brings industrial strength to any space — but only if it's protected. Here's how to keep rust from ever taking hold.",
    category: "Metal Care",
    readTime: "3 min read",
  },
];

export default function BlogIndexPage() {
  return (
    <main
      className="bg-background text-on-surface pt-24 min-h-screen"
      style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/oak.png')" }}
    >
      <section className="px-4 md:px-16 py-24 max-w-[1440px] mx-auto">
        <span className="text-xs text-primary tracking-widest uppercase mb-4 block" style={{ fontFamily: "Libre Franklin, sans-serif" }}>
          From the Workshop
        </span>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6" style={{ fontFamily: "Libre Franklin, sans-serif" }}>
          The Journal
        </h1>
        <p className="text-lg text-on-surface-variant max-w-2xl leading-relaxed mb-16">
          Notes on wood, metal, and the craft of building furniture that lasts. Straight from our artisans in Nairobi.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-surface-container-lowest border border-outline-variant/40 rounded-xl p-8 flex flex-col hover:border-primary/40 transition-colors shadow-ambient"
            >
              <span className="text-[10px] text-primary tracking-widest uppercase mb-4" style={{ fontFamily: "Libre Franklin, sans-serif" }}>
                {post.category}
              </span>
              <h2 className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors" style={{ fontFamily: "Libre Franklin, sans-serif" }}>
                {post.title}
              </h2>
              <p className="text-on-surface-variant text-sm leading-relaxed flex-1 mb-6">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between text-xs text-outline pt-4 border-t border-outline-variant/30" style={{ fontFamily: "Libre Franklin, sans-serif" }}>
                <span>{post.readTime}</span>
                <span className="text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  READ <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
