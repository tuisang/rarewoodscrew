import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Rarewoods Crew Nairobi",
  description: "Furniture repairs, cabinet installation, custom woodwork, and door and window maintenance in Nairobi, Kenya.",
  openGraph: {
    title: "Services | Rarewoods Crew Nairobi",
    description: "Furniture repairs, cabinet installation, custom woodwork, and door and window maintenance in Nairobi, Kenya.",
    url: "https://rarewoodscrew.tuistech.co.ke/services",
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuBeeOgIEcSOvgIAQAKIj8DoMZUHQaq5YJYWWFIuGirFGKSjr9XHTzYiNPT1ZJBBjSgOtxqltgj9WRkLfy0jXZTjNcGp1epgzf_its1rja7SMPNdjwrEEZwDAFO57gBKB4D3y3ApFFmCvl1MnJLwQXtCpW-fw8Sih0B7P9PrSvi9Z4uHFaZGbmXB-KGxcrd-3PMtzuj8JmHK-bq4tlutQzyfeC6qMqCnEKMl-6TyyoU3cKcn3je0AJVrsaBRieRorqcGbmijQWMQnKI_"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Rarewoods Crew Nairobi",
    description: "Furniture repairs, cabinet installation, custom woodwork, and door and window maintenance in Nairobi, Kenya.",
  },
};

import Link from "next/link";
import Footer from "@/components/Footer";

const WORKSHOP_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCMi_CjqFKhoLcpfQ5IuPAgn1yTZBT_3s9Zwp0c1twVqJXtxhYDWNVL2cQZz3OTM9m7kf76Yvy3c7ffmiXPBRgQbECFgLTQylV2s9zdSvvcVyQ1st9EsI-aGmBC4MPsvuzfXBPoTOljV4ZefihLFO9H06AfuGN6-EOWQN-pn4jy9hbull_yfYRPZMGb1_b9UanG83jgfvaCY1TuJsy_O5JV0C2BSJtoWJ3tRXqGYHuX64aGLb6os5u4aIU6K6M4cO4X34v77d5TGKsj";

export default function ServicesPage() {
  return (
    <main className="bg-background text-on-surface pt-24">
      <section className="px-margin-mobile md:px-margin-desktop py-16 max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
          <div className="md:col-span-7">
            <span className="font-label-md text-label-md text-secondary tracking-widest uppercase mb-4 block">
              Expertise in Nairobi
            </span>
            <h1 className="font-headline-md text-headline-md md:text-display-lg text-primary leading-tight">
              Precision Woodwork &amp; Reliable Repairs
            </h1>
            <p className="text-body-lg text-on-surface-variant mt-6 max-w-2xl leading-relaxed">
              From restoring heirloom furniture to custom workshop-grade installations, we bring industrial reliability to your home and office. On-call across all Nairobi neighborhoods.
            </p>
          </div>
          <div className="md:col-span-5">
            <img
              src={WORKSHOP_IMAGE}
              alt="Workshop bench"
              className="w-full h-auto rounded-2xl shadow-xl border-4 border-white object-cover aspect-[4/3]"
            />
          </div>
        </div>
      </section>

      <section className="px-margin-mobile md:px-margin-desktop pb-20 max-w-container-max mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-headline-sm text-headline-sm text-primary">Our Specializations</h2>
          <p className="text-body-md text-on-surface-variant mt-2">
            High-end reliability for every corner of your property.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div id="furniture-repairs" className="md:col-span-8 group relative h-[420px] rounded-xl overflow-hidden tactile-card">
            <img
              alt="Furniture Repairs"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src={WORKSHOP_IMAGE}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 p-10 w-full md:w-2/3 text-surface-cream">
              <h2 className="font-headline-md text-headline-md mb-2">Furniture Repairs</h2>
              <p className="mb-6 text-body-md opacity-90">
                Restoring structural integrity and aesthetic beauty to your prized pieces. We specialize in joint tightening, veneer repairs, and precision finishing that lasts for decades.
              </p>
              <div className="flex items-center justify-between max-w-md">
                <span className="font-label-md text-label-md text-oak">Starting from KES 4,500</span>
                <Link href="/quote" className="flex items-center gap-2 bg-surface-cream text-primary px-6 py-3 rounded-lg font-label-md text-label-md hover:bg-oak transition-colors">
                  Request Quote <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>

          <div id="cabinet-installation" className="md:col-span-4 group relative h-[420px] rounded-xl overflow-hidden bg-forest-deep text-surface-cream p-8 flex flex-col justify-center">
            <span className="material-symbols-outlined text-4xl mb-6 text-oak">kitchen</span>
            <h3 className="font-headline-sm text-headline-sm mb-4">Cabinet Installation</h3>
            <p className="text-body-md text-surface-dim">
              Modular and custom cabinetry for kitchens and offices. Level, plumb, and built to withstand Nairobi&apos;s varying humidity.
            </p>
            <span className="mt-6 font-label-md text-label-md text-oak">Professional Fit-out</span>
          </div>

          <div id="custom-woodwork" className="md:col-span-4 group relative h-[320px] rounded-xl overflow-hidden tactile-card p-8 flex flex-col justify-between">
            <div>
              <span className="material-symbols-outlined text-4xl mb-6 text-secondary">handyman</span>
              <h3 className="font-headline-sm text-headline-sm mb-4">Custom Woodwork</h3>
              <p className="text-body-md text-on-surface-variant">
                Unique shelving, custom partitions, and architectural features designed specifically for your space&apos;s dimensions.
              </p>
            </div>
            <span className="inline-block mt-4 bg-primary text-surface-cream px-3 py-1 rounded-full font-label-md text-label-md w-fit">
              BESPOKE
            </span>
          </div>

          <div id="door-window-maintenance" className="md:col-span-8 group relative h-[320px] rounded-xl overflow-hidden tactile-card flex">
            <img
              alt="Door and window hardware"
              className="w-1/3 h-full object-cover hidden md:block"
              src={WORKSHOP_IMAGE}
            />
            <div className="p-8 flex-1 flex flex-col justify-center">
              <span className="material-symbols-outlined text-4xl mb-4 text-secondary">door_front</span>
              <h3 className="font-headline-sm text-headline-sm mb-3">Door &amp; Window Maintenance</h3>
              <p className="text-body-md text-on-surface-variant mb-4">
                Solving sticky doors, broken frames, and window seals. Our maintenance service ensures security and smooth operation throughout the year.
              </p>
              <div className="flex gap-2 flex-wrap">
                {["Hinges", "Frames", "Locks"].map((tag) => (
                  <span key={tag} className="flex items-center gap-1 text-label-md font-label-md text-mpesa-green">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-forest-deep text-surface-cream py-12">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="font-label-md text-label-md text-oak uppercase tracking-widest mb-2 block">
              On-Call Across Nairobi
            </span>
            <p className="text-body-lg max-w-2xl">
              Whether you are in Karen, Westlands, Kilimani, or Syokimau, our mobile workshop is ready to respond. We honor deadlines and provide upfront, honest pricing for all residential and commercial calls.
            </p>
          </div>
          
            href="tel:+254700000000"
            className="bg-secondary text-on-secondary px-8 py-4 rounded-lg font-label-md text-label-md flex items-center gap-2 flex-shrink-0 hover:opacity-90 transition-all"
          >
            <span className="material-symbols-outlined">call</span>
            Call for Immediate Service
          </a>
        </div>
      </section>

      <section className="px-margin-mobile md:px-margin-desktop py-16 max-w-container-max mx-auto">
        <div className="bg-white rounded-xl border border-walnut/10 shadow-sm p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-mpesa-green">smartphone</span>
              <h3 className="font-label-md text-label-md uppercase tracking-widest text-primary">Secure M-Pesa Payment</h3>
            </div>
            <p className="text-body-md text-on-surface-variant mb-6">
              We offer seamless mobile payments for all our services. Please follow these steps to confirm your booking or settle an invoice.
            </p>
            <div className="space-y-3">
              {[
                { step: "1", text: <>Go to M-Pesa menu and select <strong>Lipa na M-Pesa</strong>.</> },
                { step: "2", text: <>Select <strong>Buy Goods and Services</strong>.</> },
                { step: "3", text: "Enter the Till Number below:" },
              ].map((item) => (
                <div key={item.step} className="flex items-center gap-4">
                  <span className="w-7 h-7 rounded-full bg-primary text-surface-cream flex items-center justify-center font-label-md text-label-md flex-shrink-0">
                    {item.step}
                  </span>
                  <p className="text-body-md">{item.text}</p>
                </div>
              ))}
              <div className="ml-11 flex items-center gap-3 bg-surface-container-low rounded-lg px-4 py-2 w-fit">
                <span className="font-headline-sm text-headline-sm text-primary font-bold">000000</span>
                <span className="material-symbols-outlined text-on-surface-variant text-sm cursor-pointer">content_copy</span>
              </div>
            </div>
          </div>
          <div className="bg-secondary-container/40 rounded-xl p-6 text-center flex-shrink-0">
            <span className="material-symbols-outlined text-4xl text-secondary">payments</span>
            <p className="text-caption mt-2 max-w-[160px]">Instant receipt and SMS confirmation for all transactions.</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}