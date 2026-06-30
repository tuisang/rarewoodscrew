import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Reviews & Testimonials | Rarewoods Crew",
  description: "Read genuine reviews from our clients across Nairobi. Discover why Rarewoods Crew is Kenya's premier bespoke furniture atelier.",
  keywords: ["furniture reviews Nairobi", "Forge Timber reviews", "bespoke furniture testimonials Kenya"],
  openGraph: {
    title: "Client Reviews & Testimonials | Rarewoods Crew",
    description: "Read genuine reviews from our clients across Nairobi. Discover why Rarewoods Crew is Kenya's premier bespoke furniture atelier.",
    url: "https://rarewoodscrew.tuistech.co.ke/reviews",
    siteName: "Rarewoods Crew",
    images: [{ url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKZkFB7nfJk6r7jmyQO-AVHnZdP7LJr29ZqN0oN7deW8u-FynV8eH49R4bubmO2QUoz08l5GAEmy704ZORM-htSo6QE8m1XQrNzsO9QWzsBJmHRZ7Y2DBUDqj62PuAbh-lASPFQ57rHdGz29cx9ckkpH4Zq2YmYd9he093plIplw7Okh7gZhohycXc2UdEF5He9qps9SX4cRwWOcjzKRvPvhskTw1ZJOvhJ2O_TXcdFP9WV_YbCCsPzmlJZwtHvC6fiB2l2pwLqsMT", width: 1200, height: 630, alt: "Client Reviews & Testimonials | Rarewoods Crew" }],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Client Reviews & Testimonials | Rarewoods Crew",
    description: "Read genuine reviews from our clients across Nairobi. Discover why Rarewoods Crew is Kenya's premier bespoke furniture atelier.",
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuDKZkFB7nfJk6r7jmyQO-AVHnZdP7LJr29ZqN0oN7deW8u-FynV8eH49R4bubmO2QUoz08l5GAEmy704ZORM-htSo6QE8m1XQrNzsO9QWzsBJmHRZ7Y2DBUDqj62PuAbh-lASPFQ57rHdGz29cx9ckkpH4Zq2YmYd9he093plIplw7Okh7gZhohycXc2UdEF5He9qps9SX4cRwWOcjzKRvPvhskTw1ZJOvhJ2O_TXcdFP9WV_YbCCsPzmlJZwtHvC6fiB2l2pwLqsMT"],
  },
  alternates: {
    canonical: "https://rarewoodscrew.tuistech.co.ke/reviews",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
