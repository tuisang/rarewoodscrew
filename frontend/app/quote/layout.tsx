import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request a Custom Quote | Forge & Timber Atelier",
  description: "Get a detailed quote for your bespoke furniture or metalwork project. Specify wood, metal finish, dimensions and budget. We respond within 24 hours.",
  keywords: ["furniture quote Nairobi", "custom furniture price Kenya", "metalwork quote Kenya"],
  openGraph: {
    title: "Request a Custom Quote | Forge & Timber Atelier",
    description: "Get a detailed quote for your bespoke furniture or metalwork project. Specify wood, metal finish, dimensions and budget. We respond within 24 hours.",
    url: "https://tuistech.co.ke/quote",
    siteName: "Forge & Timber Atelier",
    images: [{ url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKZkFB7nfJk6r7jmyQO-AVHnZdP7LJr29ZqN0oN7deW8u-FynV8eH49R4bubmO2QUoz08l5GAEmy704ZORM-htSo6QE8m1XQrNzsO9QWzsBJmHRZ7Y2DBUDqj62PuAbh-lASPFQ57rHdGz29cx9ckkpH4Zq2YmYd9he093plIplw7Okh7gZhohycXc2UdEF5He9qps9SX4cRwWOcjzKRvPvhskTw1ZJOvhJ2O_TXcdFP9WV_YbCCsPzmlJZwtHvC6fiB2l2pwLqsMT", width: 1200, height: 630, alt: "Request a Custom Quote | Forge & Timber Atelier" }],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Request a Custom Quote | Forge & Timber Atelier",
    description: "Get a detailed quote for your bespoke furniture or metalwork project. Specify wood, metal finish, dimensions and budget. We respond within 24 hours.",
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuDKZkFB7nfJk6r7jmyQO-AVHnZdP7LJr29ZqN0oN7deW8u-FynV8eH49R4bubmO2QUoz08l5GAEmy704ZORM-htSo6QE8m1XQrNzsO9QWzsBJmHRZ7Y2DBUDqj62PuAbh-lASPFQ57rHdGz29cx9ckkpH4Zq2YmYd9he093plIplw7Okh7gZhohycXc2UdEF5He9qps9SX4cRwWOcjzKRvPvhskTw1ZJOvhJ2O_TXcdFP9WV_YbCCsPzmlJZwtHvC6fiB2l2pwLqsMT"],
  },
  alternates: {
    canonical: "https://tuistech.co.ke/quote",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
