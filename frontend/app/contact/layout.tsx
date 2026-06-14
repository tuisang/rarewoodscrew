import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Forge & Timber Atelier Nairobi",
  description: "Visit our workshop in Embakasi, Nairobi. Get directions, send a message, book a consultation or request a quote. We respond within 24 hours.",
  keywords: ["contact Forge Timber", "furniture workshop Nairobi", "Embakasi workshop", "visit furniture atelier Nairobi"],
  openGraph: {
    title: "Contact Forge & Timber Atelier | Embakasi, Nairobi",
    description: "Visit our workshop in Embakasi, Nairobi. Get directions, send a message or book a consultation.",
    url: "https://tuistech.co.ke/contact",
    siteName: "Forge & Timber Atelier",
    images: [{ url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKZkFB7nfJk6r7jmyQO-AVHnZdP7LJr29ZqN0oN7deW8u-FynV8eH49R4bubmO2QUoz08l5GAEmy704ZORM-htSo6QE8m1XQrNzsO9QWzsBJmHRZ7Y2DBUDqj62PuAbh-lASPFQ57rHdGz29cx9ckkpH4Zq2YmYd9he093plIplw7Okh7gZhohycXc2UdEF5He9qps9SX4cRwWOcjzKRvPvhskTw1ZJOvhJ2O_TXcdFP9WV_YbCCsPzmlJZwtHvC6fiB2l2pwLqsMT", width: 1200, height: 630, alt: "Forge & Timber Workshop Nairobi" }],
    locale: "en_KE",
    type: "website",
  },
  alternates: { canonical: "https://tuistech.co.ke/contact" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
