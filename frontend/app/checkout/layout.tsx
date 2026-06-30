import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secure Checkout | Rarewoods Crew",
  description: "Complete your order securely with M-Pesa STK push, Visa/Mastercard, or bank transfer.",
  openGraph: {
    title: "Secure Checkout | Rarewoods Crew",
    description: "Complete your order securely with M-Pesa STK push, Visa/Mastercard, or bank transfer.",
    url: "https://rarewoodscrew.tuistech.co.ke/checkout",
    siteName: "Rarewoods Crew",
    images: [{ url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKZkFB7nfJk6r7jmyQO-AVHnZdP7LJr29ZqN0oN7deW8u-FynV8eH49R4bubmO2QUoz08l5GAEmy704ZORM-htSo6QE8m1XQrNzsO9QWzsBJmHRZ7Y2DBUDqj62PuAbh-lASPFQ57rHdGz29cx9ckkpH4Zq2YmYd9he093plIplw7Okh7gZhohycXc2UdEF5He9qps9SX4cRwWOcjzKRvPvhskTw1ZJOvhJ2O_TXcdFP9WV_YbCCsPzmlJZwtHvC6fiB2l2pwLqsMT", width: 1200, height: 630, alt: "Secure Checkout | Rarewoods Crew" }],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Secure Checkout | Rarewoods Crew",
    description: "Complete your order securely with M-Pesa STK push, Visa/Mastercard, or bank transfer.",
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuDKZkFB7nfJk6r7jmyQO-AVHnZdP7LJr29ZqN0oN7deW8u-FynV8eH49R4bubmO2QUoz08l5GAEmy704ZORM-htSo6QE8m1XQrNzsO9QWzsBJmHRZ7Y2DBUDqj62PuAbh-lASPFQ57rHdGz29cx9ckkpH4Zq2YmYd9he093plIplw7Okh7gZhohycXc2UdEF5He9qps9SX4cRwWOcjzKRvPvhskTw1ZJOvhJ2O_TXcdFP9WV_YbCCsPzmlJZwtHvC6fiB2l2pwLqsMT"],
  },
  alternates: {
    canonical: "https://rarewoodscrew.tuistech.co.ke/checkout",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
