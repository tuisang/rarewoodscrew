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
    images: [{ url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBw_kMgSfbDTP4PLGCuYineOyaxMEcNNCoxGjAVZg_R0g7lfY2cZWb7EqbQpwjeB-E266t6d9uciuUV2Su1j6kYE1J8QfUPJrw9fsOWfqG5QnHpwC7A0V0RF08MoGvYqaj9KXwv9ahFuFZAVa1Fs3CX1ZA52jKQKKRQaiw_3hMb6VAXQaiTxLZqsfPP5TbWXpOdBdz3j8_8BSgAvkdBqGJWr0Plb4HkoRIaHZk_AjvVr-LWjCgNBuOpdxd0IQxEEXPTVVPbYW7DLutf", width: 1200, height: 630, alt: "Artisan Services | Rarewoods Crew Nairobi" }],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Artisan Services | Rarewoods Crew Nairobi",
    description: "Custom furniture, architectural metalwork, wood-metal décor, restoration, precision welding and commercial installations in Nairobi, Kenya.",
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuBw_kMgSfbDTP4PLGCuYineOyaxMEcNNCoxGjAVZg_R0g7lfY2cZWb7EqbQpwjeB-E266t6d9uciuUV2Su1j6kYE1J8QfUPJrw9fsOWfqG5QnHpwC7A0V0RF08MoGvYqaj9KXwv9ahFuFZAVa1Fs3CX1ZA52jKQKKRQaiw_3hMb6VAXQaiTxLZqsfPP5TbWXpOdBdz3j8_8BSgAvkdBqGJWr0Plb4HkoRIaHZk_AjvVr-LWjCgNBuOpdxd0IQxEEXPTVVPbYW7DLutf"],
  },
  alternates: {
    canonical: "https://rarewoodscrew.tuistech.co.ke/services",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
