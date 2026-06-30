import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wood & Metal Material Catalog | Rarewoods Crew",
  description: "Explore African hardwoods (Mvule, Mahogany, Walnut), cold-rolled steel, copper, and premium metal finishes for bespoke furniture in Nairobi.",
  keywords: ["Mvule wood Kenya", "African hardwood catalog", "steel furniture materials", "wood species Nairobi"],
  openGraph: {
    title: "Wood & Metal Material Catalog | Rarewoods Crew",
    description: "Explore African hardwoods (Mvule, Mahogany, Walnut), cold-rolled steel, copper, and premium metal finishes for bespoke furniture in Nairobi.",
    url: "https://rarewoodscrew.tuistech.co.ke/catalog",
    siteName: "Rarewoods Crew",
    images: [{ url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCi0W20K7JdvjhzPhBCsufmbaCx6pdfVSw5SrxgrjXUKLHdiJV1rROV8o8_LKu53mozE401KnCURBw11DWNKdpKPHa0ibFoeGGLzOxpKn3p_Uy1hGqt0MpJ627Qet6f84qC9j_56U52neJQVm47khZxpwk3q_8k5nHvVV65ZKkuMiXOc3WCzvztYLUnDWoafbQ_sQr9gv0TTaPMnqfFtWxan8a0t_id8OOQf1rb0Wxl9U9GlU10hIq1zgaXyXv3I4haAXKje6wpvGEY", width: 1200, height: 630, alt: "Wood & Metal Material Catalog | Rarewoods Crew" }],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wood & Metal Material Catalog | Rarewoods Crew",
    description: "Explore African hardwoods (Mvule, Mahogany, Walnut), cold-rolled steel, copper, and premium metal finishes for bespoke furniture in Nairobi.",
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuCi0W20K7JdvjhzPhBCsufmbaCx6pdfVSw5SrxgrjXUKLHdiJV1rROV8o8_LKu53mozE401KnCURBw11DWNKdpKPHa0ibFoeGGLzOxpKn3p_Uy1hGqt0MpJ627Qet6f84qC9j_56U52neJQVm47khZxpwk3q_8k5nHvVV65ZKkuMiXOc3WCzvztYLUnDWoafbQ_sQr9gv0TTaPMnqfFtWxan8a0t_id8OOQf1rb0Wxl9U9GlU10hIq1zgaXyXv3I4haAXKje6wpvGEY"],
  },
  alternates: {
    canonical: "https://rarewoodscrew.tuistech.co.ke/catalog",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
