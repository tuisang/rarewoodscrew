import type { Metadata } from "next";
import { Libre_Franklin } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import ArtisanChatbot from "@/components/ArtisanChatbot";
import FloatingActions from "@/components/FloatingActions";
import { CartProvider } from "@/lib/CartContext";
import { Suspense } from "react";
import Loading from "@/app/loading";

const libreFranklin = Libre_Franklin({
  variable: "--font-libre-franklin",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const OG_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuBeeOgIEcSOvgIAQAKIj8DoMZUHQaq5YJYWWFIuGirFGKSjr9XHTzYiNPT1ZJBBjSgOtxqltgj9WRkLfy0jXZTjNcGp1epgzf_its1rja7SMPNdjwrEEZwDAFO57gBKB4D3y3ApFFmCvl1MnJLwQXtCpW-fw8Sih0B7P9PrSvi9Z4uHFaZGbmXB-KGxcrd-3PMtzuj8JmHK-bq4tlutQzyfeC6qMqCnEKMl-6TyyoU3cKcn3je0AJVrsaBRieRorqcGbmijQWMQnKI_";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: {
    default: "Rarewoods Crew | Bespoke Woodworking Nairobi",
    template: "%s | Rarewoods Crew",
  },
  description: "Master craftsman woodworking studio in Nairobi, Kenya. Custom cabinetry, furniture repairs, and bespoke woodwork built to last. On-call across Nairobi, M-Pesa payments accepted.",
  keywords: [
    "woodworking Nairobi",
    "custom carpentry Kenya",
    "furniture repair Nairobi",
    "cabinet installation Kenya",
    "bespoke furniture Nairobi",
    "Rarewoods Crew",
    "carpenter Nairobi",
    "custom woodwork Kenya",
    "door window maintenance Nairobi",
    "fundi Nairobi",
    "wood furniture Kenya",
    "carpentry services Nairobi",
  ],
  authors: [{ name: "Rarewoods Crew", url: "https://tuistech.co.ke" }],
  creator: "Rarewoods Crew",
  publisher: "Rarewoods Crew",
  category: "Woodworking & Carpentry",
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://rarewoodscrew.tuistech.co.ke",
    siteName: "Rarewoods Crew",
    title: "Rarewoods Crew | Bespoke Woodworking Nairobi",
    description: "Custom cabinetry, furniture repairs, and bespoke woodwork, built to last in Nairobi. On-call service, M-Pesa payments accepted.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Rarewoods Crew - Bespoke Woodworking Nairobi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rarewoods Crew | Bespoke Woodworking Nairobi",
    description: "Custom cabinetry, furniture repairs, and bespoke woodwork, built to last in Nairobi.",
    images: [OG_IMAGE],
    creator: "@rarewoodscrew",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION ?? "",
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Rarewoods Crew",
  description: "Master craftsman woodworking studio in Nairobi, Kenya. Custom cabinetry, furniture repairs, and bespoke woodwork built to last.",
  url: "https://rarewoodscrew.tuistech.co.ke",
  telephone: "+254700000000",
  email: "info@tuistech.co.ke",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -1.2921,
    longitude: 36.8219,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "09:00",
      closes: "15:00",
    },
  ],
  priceRange: "KSh 4,500 - KSh 500,000+",
  image: OG_IMAGE,
  sameAs: [],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Bespoke Woodworking Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Furniture Repairs" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cabinet Installation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Woodwork" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Door & Window Maintenance" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Full Maintenance" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Pieces" } },
    ],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en-KE">
        <head>
          <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
          <meta name="theme-color" content="#fef8f1" />
          <meta name="msapplication-TileColor" content="#994700" />
          <link rel="canonical" href="https://rarewoodscrew.tuistech.co.ke" />
        </head>
        <body className={`${libreFranklin.variable} bg-background text-on-surface`}>          <CartProvider>
            <Navbar />
            <Suspense fallback={<Loading />}>
              {children}
            </Suspense>
            <ArtisanChatbot />
            <FloatingActions />
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}