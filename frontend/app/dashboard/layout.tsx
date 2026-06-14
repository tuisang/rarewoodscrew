import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Dashboard | Forge & Timber Atelier",
  description: "View your bookings, track your commission progress, and manage your account.",
  openGraph: {
    title: "My Dashboard | Forge & Timber Atelier",
    description: "View your bookings, track your commission progress, and manage your account.",
    url: "https://tuistech.co.ke/dashboard",
    siteName: "Forge & Timber Atelier",
    images: [{ url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKZkFB7nfJk6r7jmyQO-AVHnZdP7LJr29ZqN0oN7deW8u-FynV8eH49R4bubmO2QUoz08l5GAEmy704ZORM-htSo6QE8m1XQrNzsO9QWzsBJmHRZ7Y2DBUDqj62PuAbh-lASPFQ57rHdGz29cx9ckkpH4Zq2YmYd9he093plIplw7Okh7gZhohycXc2UdEF5He9qps9SX4cRwWOcjzKRvPvhskTw1ZJOvhJ2O_TXcdFP9WV_YbCCsPzmlJZwtHvC6fiB2l2pwLqsMT", width: 1200, height: 630, alt: "My Dashboard | Forge & Timber Atelier" }],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Dashboard | Forge & Timber Atelier",
    description: "View your bookings, track your commission progress, and manage your account.",
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuDKZkFB7nfJk6r7jmyQO-AVHnZdP7LJr29ZqN0oN7deW8u-FynV8eH49R4bubmO2QUoz08l5GAEmy704ZORM-htSo6QE8m1XQrNzsO9QWzsBJmHRZ7Y2DBUDqj62PuAbh-lASPFQ57rHdGz29cx9ckkpH4Zq2YmYd9he093plIplw7Okh7gZhohycXc2UdEF5He9qps9SX4cRwWOcjzKRvPvhskTw1ZJOvhJ2O_TXcdFP9WV_YbCCsPzmlJZwtHvC6fiB2l2pwLqsMT"],
  },
  alternates: {
    canonical: "https://tuistech.co.ke/dashboard",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
