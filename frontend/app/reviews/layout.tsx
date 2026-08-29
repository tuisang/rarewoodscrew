import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Reviews & Testimonials | Rarewoods Crew",
  description: "Read genuine reviews from our clients across Nairobi. Discover why Rarewoods Crew is Kenya's premier bespoke furniture atelier.",
  keywords: ["furniture reviews Nairobi", "Forge Timber reviews", "bespoke furniture testimonials Kenya"],
  openGraph: {
    title: "Client Reviews & Testimonials | Rarewoods Crew",
    description: "Read genuine reviews from our clients across Nairobi. Discover why Rarewoods Crew is Kenya's premier bespoke furniture atelier.",
    url: "https://rarewoodscrew.tuistech.co.ke/reviews",
    siteName: "Rarewoods Crew",
    images: [{ url: "/images/log-table.jpg", width: 1200, height: 630, alt: "Client Reviews & Testimonials | Rarewoods Crew" }],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Client Reviews & Testimonials | Rarewoods Crew",
    description: "Read genuine reviews from our clients across Nairobi. Discover why Rarewoods Crew is Kenya's premier bespoke furniture atelier.",
    images: ["/images/log-table.jpg"],
  },
  alternates: {
    canonical: "https://rarewoodscrew.tuistech.co.ke/reviews",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
