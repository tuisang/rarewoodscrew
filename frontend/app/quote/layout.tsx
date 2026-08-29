import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request a Custom Quote | Rarewoods Crew",
  description: "Get a detailed quote for your bespoke furniture or metalwork project. Specify wood, metal finish, dimensions and budget. We respond within 24 hours.",
  keywords: ["furniture quote Nairobi", "custom furniture price Kenya", "metalwork quote Kenya"],
  openGraph: {
    title: "Request a Custom Quote | Rarewoods Crew",
    description: "Get a detailed quote for your bespoke furniture or metalwork project. Specify wood, metal finish, dimensions and budget. We respond within 24 hours.",
    url: "https://rarewoodscrew.tuistech.co.ke/quote",
    siteName: "Rarewoods Crew",
    images: [{ url: "/images/log-table.jpg", width: 1200, height: 630, alt: "Request a Custom Quote | Rarewoods Crew" }],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Request a Custom Quote | Rarewoods Crew",
    description: "Get a detailed quote for your bespoke furniture or metalwork project. Specify wood, metal finish, dimensions and budget. We respond within 24 hours.",
    images: ["/images/log-table.jpg"],
  },
  alternates: {
    canonical: "https://rarewoodscrew.tuistech.co.ke/quote",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
