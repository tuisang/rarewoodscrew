import type { Metadata } from "next";
import { Archivo_Narrow, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import ArtisanChatbot from "@/components/ArtisanChatbot";
import FloatingActions from "@/components/FloatingActions";
import { CartProvider } from "@/lib/CartContext";
import { Suspense } from "react";
import Loading from "@/app/loading";

const archivoNarrow = Archivo_Narrow({
  variable: "--font-archivo-narrow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const OG_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuCskyV7BXgGvhV0SK0WdqRBihOtmDa-5mIZE8sO473g6uk7RVOkFZSGs2XSNfNppVIFRhfZzzbPCyQW_Zp6pXmDNwYtMTH_5jMIe-drRIWWNowg_oEfMokYlSjM8hYjyjdGtPLhlvZAuWUsSyx-mC43AbRJXOXkYJzGQqtSB1G7PXdbxSns4tdQWpVTveM0-C3_sul9iEU-1EQ1598uVMp1xwa28LYqm9WnzEbS4NylbWDP4cE4deCaTKf1FjwJx2at-lcAk6gOBjY";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: {
    default: "Black Steel Crew | Bespoke Steel Fabrication Nairobi",
    template: "%s | Black Steel Crew",
  },
  description: "Bespoke steel fabrication studio in Nairobi, Kenya. Custom gates, railings, staircases, and steel-framed furniture, precision-welded and finished to last. Custom orders, M-Pesa payments.",
  keywords: [
    "steel fabrication Nairobi",
    "custom gates Kenya",
    "metalwork Nairobi",
    "steel railings Kenya",
    "steel staircases Nairobi",
    "Black Steel Crew",
    "welding Nairobi",
    "steel furniture Kenya",
    "balustrades Nairobi",
    "structural steel Kenya",
    "gate fabrication Nairobi",
    "industrial steel Kenya",
  ],
  authors: [{ name: "Black Steel Crew", url: "https://tuistech.co.ke" }],
  creator: "Black Steel Crew",
  publisher: "Black Steel Crew",
  category: "Steel Fabrication & Metalwork",
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://blacksteelcrew.tuistech.co.ke",
    siteName: "Black Steel Crew",
    title: "Black Steel Crew | Bespoke Steel Fabrication Nairobi",
    description: "Custom gates, railings, staircases, and steel-framed furniture, forged in Nairobi. Precision welding, on-site measurement, M-Pesa payments accepted.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Black Steel Crew - Bespoke Steel Fabrication Nairobi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Black Steel Crew | Bespoke Steel Fabrication Nairobi",
    description: "Custom gates, railings, staircases, and steel-framed furniture, forged in Nairobi.",
    images: [OG_IMAGE],
    creator: "@blacksteelcrew",
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
  name: "Black Steel Crew",
  description: "Bespoke steel fabrication studio in Nairobi, Kenya. Custom gates, railings, staircases, and steel-framed furniture, precision-welded and finished to last.",
  url: "https://blacksteelcrew.tuistech.co.ke",
  telephone: "+254726461196",
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
  priceRange: "KSh 15,000 - KSh 500,000+",
  image: OG_IMAGE,
  sameAs: [],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Bespoke Steel Fabrication Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Gates" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Railings & Balustrades" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Staircase Fabrication" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Furniture" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Precision Welding" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial Installations" } },
    ],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en-KE" className="dark">
        <head>
          <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
          <meta name="theme-color" content="#131314" />
          <meta name="msapplication-TileColor" content="#131314" />
          <link rel="canonical" href="https://blacksteelcrew.tuistech.co.ke" />
        </head>
        <body className={`${archivoNarrow.variable} ${jetBrainsMono.variable} bg-background text-on-surface`}>
          <CartProvider>
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