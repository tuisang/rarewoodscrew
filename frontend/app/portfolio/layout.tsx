import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | Rarewoods Crew",
  description: "A curated archive of our finest commissions — live-edge dining tables, commercial fit-outs, and bespoke steel-wood pieces crafted in Nairobi.",
  keywords: ["furniture portfolio Nairobi", "custom furniture gallery Kenya", "bespoke furniture examples"],
  openGraph: {
    title: "Portfolio | Rarewoods Crew",
    description: "A curated archive of our finest commissions — live-edge dining tables, commercial fit-outs, and bespoke steel-wood pieces crafted in Nairobi.",
    url: "https://rarewoodscrew.tuistech.co.ke/portfolio",
    siteName: "Rarewoods Crew",
    images: [{ url: "/images/log-table.jpg", width: 1200, height: 630, alt: "Portfolio | Rarewoods Crew" }],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Rarewoods Crew",
    description: "A curated archive of our finest commissions — live-edge dining tables, commercial fit-outs, and bespoke steel-wood pieces crafted in Nairobi.",
    images: ["/images/log-table.jpg"],
  },
  alternates: {
    canonical: "https://rarewoodscrew.tuistech.co.ke/portfolio",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
