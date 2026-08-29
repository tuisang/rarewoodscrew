import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wood & Metal Material Catalog | Rarewoods Crew",
  description: "Explore African hardwoods (Mvule, Mahogany, Walnut), cold-rolled steel, copper, and premium metal finishes for bespoke furniture in Nairobi.",
  keywords: ["Mvule wood Kenya", "African hardwood catalog", "steel furniture materials", "wood species Nairobi"],
  openGraph: {
    title: "Wood & Metal Material Catalog | Rarewoods Crew",
    description: "Explore African hardwoods (Mvule, Mahogany, Walnut), cold-rolled steel, copper, and premium metal finishes for bespoke furniture in Nairobi.",
    url: "https://rarewoodscrew.tuistech.co.ke/catalog",
    siteName: "Rarewoods Crew",
    images: [{ url: "/images/log-table.jpg", width: 1200, height: 630, alt: "Wood & Metal Material Catalog | Rarewoods Crew" }],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wood & Metal Material Catalog | Rarewoods Crew",
    description: "Explore African hardwoods (Mvule, Mahogany, Walnut), cold-rolled steel, copper, and premium metal finishes for bespoke furniture in Nairobi.",
    images: ["/images/log-table.jpg"],
  },
  alternates: {
    canonical: "https://rarewoodscrew.tuistech.co.ke/catalog",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
