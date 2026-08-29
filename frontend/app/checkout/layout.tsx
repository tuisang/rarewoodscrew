import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secure Checkout | Rarewoods Crew",
  description: "Complete your order securely with M-Pesa STK push, Visa/Mastercard, or bank transfer.",
  openGraph: {
    title: "Secure Checkout | Rarewoods Crew",
    description: "Complete your order securely with M-Pesa STK push, Visa/Mastercard, or bank transfer.",
    url: "https://rarewoodscrew.tuistech.co.ke/checkout",
    siteName: "Rarewoods Crew",
    images: [{ url: "/images/log-table.jpg", width: 1200, height: 630, alt: "Secure Checkout | Rarewoods Crew" }],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Secure Checkout | Rarewoods Crew",
    description: "Complete your order securely with M-Pesa STK push, Visa/Mastercard, or bank transfer.",
    images: ["/images/log-table.jpg"],
  },
  alternates: {
    canonical: "https://rarewoodscrew.tuistech.co.ke/checkout",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
