import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Dashboard | Rarewoods Crew",
  description: "View your bookings, track your commission progress, and manage your account.",
  openGraph: {
    title: "My Dashboard | Rarewoods Crew",
    description: "View your bookings, track your commission progress, and manage your account.",
    url: "https://rarewoodscrew.tuistech.co.ke/dashboard",
    siteName: "Rarewoods Crew",
    images: [{ url: "/images/log-table.jpg", width: 1200, height: 630, alt: "My Dashboard | Rarewoods Crew" }],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Dashboard | Rarewoods Crew",
    description: "View your bookings, track your commission progress, and manage your account.",
    images: ["/images/log-table.jpg"],
  },
  alternates: {
    canonical: "https://rarewoodscrew.tuistech.co.ke/dashboard",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
