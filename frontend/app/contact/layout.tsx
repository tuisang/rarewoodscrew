import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Rarewoods Crew Nairobi",
  description: "Visit our workshop in Embakasi, Nairobi. Get directions, send a message, book a consultation or request a quote. We respond within 24 hours.",
  keywords: ["contact Forge Timber", "furniture workshop Nairobi", "Embakasi workshop", "visit furniture atelier Nairobi"],
  openGraph: {
    title: "Contact Rarewoods Crew | Embakasi, Nairobi",
    description: "Visit our workshop in Embakasi, Nairobi. Get directions, send a message or book a consultation.",
    url: "https://rarewoodscrew.tuistech.co.ke/contact",
    siteName: "Rarewoods Crew",
    images: [{ url: "/images/log-table.jpg", width: 1200, height: 630, alt: "Rarewoods Crew Workshop Nairobi" }],
    locale: "en_KE",
    type: "website",
  },
  alternates: { canonical: "https://rarewoodscrew.tuistech.co.ke/contact" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
