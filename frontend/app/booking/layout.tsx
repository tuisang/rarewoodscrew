import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Consultation | Rarewoods Crew",
  description: "Book a consultation with our master artisans in Nairobi. KES 5,000 fee, refundable on order. M-Pesa, Visa & PayPal accepted.",
  keywords: ["book furniture consultation Nairobi", "furniture consultation Kenya", "artisan consultation"],
  openGraph: {
    title: "Book a Consultation | Rarewoods Crew",
    description: "Book a consultation with our master artisans in Nairobi. KES 5,000 fee, refundable on order. M-Pesa, Visa & PayPal accepted.",
    url: "https://rarewoodscrew.tuistech.co.ke/booking",
    siteName: "Rarewoods Crew",
    images: [{ url: "/images/log-table.jpg", width: 1200, height: 630, alt: "Book a Consultation | Rarewoods Crew" }],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Consultation | Rarewoods Crew",
    description: "Book a consultation with our master artisans in Nairobi. KES 5,000 fee, refundable on order. M-Pesa, Visa & PayPal accepted.",
    images: ["/images/log-table.jpg"],
  },
  alternates: {
    canonical: "https://rarewoodscrew.tuistech.co.ke/booking",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
