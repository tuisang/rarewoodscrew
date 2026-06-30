import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | Rarewoods Crew",
  description: "A curated archive of our finest commissions — live-edge dining tables, commercial fit-outs, and bespoke steel-wood pieces crafted in Nairobi.",
  keywords: ["furniture portfolio Nairobi", "custom furniture gallery Kenya", "bespoke furniture examples"],
  openGraph: {
    title: "Portfolio | Rarewoods Crew",
    description: "A curated archive of our finest commissions — live-edge dining tables, commercial fit-outs, and bespoke steel-wood pieces crafted in Nairobi.",
    url: "https://rarewoodscrew.tuistech.co.ke/portfolio",
    siteName: "Rarewoods Crew",
    images: [{ url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAsSq8Nra0r65CDQA_qJi7jyKDhmXniyz0h83suHoWU8t8pxgawS7bC8GAcxqHCTICoby3FB0vF4pfywk_nh4cYsvmgdhl1iHpZnUVbG14vRCVm0qAAEDikuMGETWn9ppi0lqXAh1ghiGmcz4lOU5Asx5NwFn0EDqR72eKOTTiDDQ1ikEOCCpjD8LGrH01SrNZ5FwIPlrHjlCwkk1a3yA3YBWCRyTaLAbgbCXf2cOhntzvxx02CQy9ONbEslKyuHp6LIwMMxjWxk9do", width: 1200, height: 630, alt: "Portfolio | Rarewoods Crew" }],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Rarewoods Crew",
    description: "A curated archive of our finest commissions — live-edge dining tables, commercial fit-outs, and bespoke steel-wood pieces crafted in Nairobi.",
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuAsSq8Nra0r65CDQA_qJi7jyKDhmXniyz0h83suHoWU8t8pxgawS7bC8GAcxqHCTICoby3FB0vF4pfywk_nh4cYsvmgdhl1iHpZnUVbG14vRCVm0qAAEDikuMGETWn9ppi0lqXAh1ghiGmcz4lOU5Asx5NwFn0EDqR72eKOTTiDDQ1ikEOCCpjD8LGrH01SrNZ5FwIPlrHjlCwkk1a3yA3YBWCRyTaLAbgbCXf2cOhntzvxx02CQy9ONbEslKyuHp6LIwMMxjWxk9do"],
  },
  alternates: {
    canonical: "https://rarewoodscrew.tuistech.co.ke/portfolio",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
