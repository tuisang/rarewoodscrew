import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";

interface BlogPost {
  title: string;
  category: string;
  readTime: string;
  description: string;
  content: { heading?: string; body: string }[];
}

const POSTS: Record<string, BlogPost> = {
  "caring-for-oiled-mvule-furniture": {
    title: "Caring for Oiled Mvule Furniture",
    category: "Wood Care",
    readTime: "4 min read",
    description: "How to care for oiled Mvule furniture — Kenya's prized, termite-resistant hardwood. Cleaning, oiling frequency, and sunlight tips from Rarewoods Crew.",
    content: [
      {
        body: "Mvule, also known as Iroko or African Teak, is one of the most respected furniture timbers in East Africa — and for good reason. Naturally resistant to termites and decay even in demanding conditions, it's the wood we reach for when a piece needs to last for generations, not just years. But like any fine hardwood, an oiled Mvule finish rewards a little regular attention.",
      },
      {
        heading: "Daily and Weekly Care",
        body: "Keep things simple. A soft, dry or slightly damp cloth is all you need for routine cleaning — wipe with the grain, and avoid harsh detergents, which strip the natural oils that give Mvule its warm, golden-brown lustre. There's no need for anything more aggressive; Mvule's open, interlocked grain does most of the work of looking good on its own.",
      },
      {
        heading: "Reapplying Oil",
        body: "For indoor pieces, plan to reapply a quality furniture oil — teak oil or Danish oil both work well — every 6 to 12 months. Outdoor Mvule furniture works harder against sun and rain, so it benefits from more frequent attention: every 3 to 4 months is a good rhythm. A fresh coat not only deepens the colour but renews the wood's natural water resistance.",
      },
      {
        heading: "Sunlight and Colour",
        body: "Direct, prolonged sun exposure will accelerate Mvule's natural darkening from pale gold to a deep golden-brown. Most clients love this — it's part of what makes Mvule feel alive over time — but if you'd prefer an even tone across a piece, rotate it occasionally or use light window coverings.",
      },
      {
        heading: "A Note on Sourcing",
        body: "Because Mvule is so sought-after, it's increasingly classified as near-threatened in parts of its native range. At Rarewoods Crew, we source kiln-dried Mvule exclusively from responsible local suppliers, and we're always happy to discuss provenance with clients commissioning larger pieces.",
      },
    ],
  },

  "wood-care-guide": {
    title: "The Essential Wood Furniture Care Guide",
    category: "Wood Care",
    readTime: "3 min read",
    description: "A practical guide to caring for mahogany, oak, and teak furniture — cleaning, sunlight protection, and polishing tips from Rarewoods Crew in Nairobi.",
    content: [
      {
        body: "Good wood furniture is an investment, and like any investment, it pays you back in proportion to how well you look after it. Whether you've commissioned a mahogany dining table, an oak console, or a teak outdoor bench, the fundamentals of care are largely the same — and refreshingly simple.",
      },
      {
        heading: "Clean Gently, Clean Often",
        body: "A soft cloth is your best tool. Dust and light grime build up faster than most people expect, and letting them sit can dull a finish over time. Wipe with the grain, not against it, and reach for wood-safe cleaners only — general household cleaners and anything containing ammonia or bleach can strip a finish or discolour the wood underneath.",
      },
      {
        heading: "Keep It Out of Direct Sun",
        body: "Sunlight is wood's quiet adversary. UV exposure fades colour unevenly and, over years, can dry out and crack a finish. If a piece sits near a window, consider light curtains or simply rotating it occasionally so the fading — if any — stays even.",
      },
      {
        heading: "Polish With Purpose",
        body: "Reapplying polish periodically — roughly every few months for furniture in regular use — keeps the surface protected and the colour rich. There's no need to overdo it; a thin, even coat applied with a soft cloth, left to absorb, and buffed gently is all most pieces need.",
      },
      {
        heading: "Built for Mahogany, Oak, and Teak Alike",
        body: "These three woods behave a little differently — teak's natural oils make it especially forgiving outdoors, while mahogany rewards a slightly gentler touch — but the core routine of clean, shade, and polish holds true across all of them. If you're ever unsure what a specific piece needs, our team is always happy to talk through it.",
      },
    ],
  },

  "preventing-rust-on-steel-furniture": {
    title: "Preventing Rust on Steel Furniture",
    category: "Metal Care",
    readTime: "3 min read",
    description: "How to prevent rust on mild steel and outdoor steel furniture. Practical maintenance tips from Rarewoods Crew's metalwork studio in Nairobi.",
    content: [
      {
        body: "Steel brings a kind of structural confidence to furniture that's hard to replicate in any other material — but it has one well-known weakness: moisture. The good news is that rust is almost entirely preventable with a handful of simple habits, whether you're maintaining an indoor steel-framed console or a garden bench that lives outside year-round.",
      },
      {
        heading: "Keep It Dry",
        body: "This is the single most important rule. Rust needs moisture to take hold, so wiping away standing water promptly — after rain, condensation, or a spill — does more to protect steel furniture than almost anything else you can do.",
      },
      {
        heading: "Address Scratches Quickly",
        body: "A scratched protective coating is an open invitation for rust to start. Bare steel exposed by a chip or scratch should be touched up as soon as you notice it — even a small dab of matching paint or sealant can prevent a tiny mark from becoming a larger problem months later.",
      },
      {
        heading: "Reapply Protective Finishes",
        body: "Whether your piece is powder-coated, painted, or sealed with a clear protective finish, that layer is doing real work. For furniture that lives outdoors, plan to inspect and refresh protective coatings periodically — more often in coastal or particularly humid climates.",
      },
      {
        heading: "Especially for Outdoor and Decorative Steel",
        body: "Outdoor steel furniture and decorative metal structures face the toughest conditions, so they deserve the most attention. A seasonal check — clearing debris, drying off pooled water, and inspecting for early rust spots — goes a long way toward keeping these pieces structurally sound and good-looking for years.",
      },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(POSTS).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = POSTS[params.slug];
  if (!post) return { title: "Post Not Found | Rarewoods Crew" };
  return {
    title: `${post.title} | Rarewoods Crew`,
    description: post.description,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = POSTS[params.slug];
  if (!post) notFound();

  return (
    <main
      className="bg-background text-on-surface pt-24 min-h-screen"
      style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/oak.png')" }}
    >
      <article className="px-4 md:px-16 py-24 max-w-[800px] mx-auto">
        <Link
          href="/blog"
          className="text-xs text-primary hover:underline flex items-center gap-2 mb-10"
          style={{ fontFamily: "Libre Franklin, sans-serif" }}
        >
          ← BACK TO JOURNAL
        </Link>

        <span className="text-[10px] text-primary tracking-widest uppercase mb-4 block" style={{ fontFamily: "Libre Franklin, sans-serif" }}>
          {post.category} · {post.readTime}
        </span>

        <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-10" style={{ fontFamily: "Libre Franklin, sans-serif" }}>
          {post.title}
        </h1>

        <div className="space-y-8">
          {post.content.map((block, i) => (
            <div key={i}>
              {block.heading && (
                <h2 className="text-xl font-semibold mb-3 text-primary" style={{ fontFamily: "Libre Franklin, sans-serif" }}>
                  {block.heading}
                </h2>
              )}
              <p className="text-on-surface-variant leading-relaxed">{block.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-10 border-t border-outline-variant/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-on-surface-variant">Have a piece that needs attention?</p>
          <Link
            href="/booking"
            className="bg-primary text-on-primary rounded-lg px-8 py-3 text-sm font-semibold hover:brightness-110 transition-all"
            style={{ fontFamily: "Libre Franklin, sans-serif" }}
          >
            BOOK A CONSULTATION →
          </Link>
        </div>
      </article>

      <Footer />
    </main>
  );
}
