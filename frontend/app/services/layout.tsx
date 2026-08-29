import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artisan Services | Rarewoods Crew Nairobi",
  description: "Custom furniture, architectural metalwork, wood-metal décor, restoration, precision welding and commercial installations in Nairobi, Kenya.",
  keywords: ["furniture services Nairobi", "custom metalwork Kenya", "woodwork services", "furniture restoration Nairobi"],
  openGraph: {
    title: "Artisan Services | Rarewoods Crew Nairobi",
    description: "Custom furniture, architectural metalwork, wood-metal décor, restoration, precision welding and commercial installations in Nairobi, Kenya.",
    url: "https://rarewoodscrew.tuistech.co.ke/services",
    siteName: "Rarewoods Crew",
    images: [{ url: "/images/log-table.jpg", width: 1200, height: 630, alt: "Artisan Services | Rarewoods Crew Nairobi" }],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Artisan Services | Rarewoods Crew Nairobi",
    description: "Custom furniture, architectural metalwork, wood-metal décor, restoration, precision welding and commercial installations in Nairobi, Kenya.",
    images: ["/images/log-table.jpg"],
  },
  alternates: {
    canonical: "https://rarewoodscrew.tuistech.co.ke/services",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
