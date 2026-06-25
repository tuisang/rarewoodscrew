import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Black Steel Crew Nairobi",
  description: "Custom gates, railings and balustrades, staircase fabrication, steel furniture, precision welding and commercial installations in Nairobi, Kenya.",
  openGraph: {
    title: "Services | Black Steel Crew Nairobi",
    description: "Custom gates, railings and balustrades, staircase fabrication, steel furniture, precision welding and commercial installations in Nairobi, Kenya.",
    url: "https://blacksteelcrew.tuistech.co.ke/services",
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuCskyV7BXgGvhV0SK0WdqRBihOtmDa-5mIZE8sO473g6uk7RVOkFZSGs2XSNfNppVIFRhfZzzbPCyQW_Zp6pXmDNwYtMTH_5jMIe-drRIWWNowg_oEfMokYlSjM8hYjyjdGtPLhlvZAuWUsSyx-mC43AbRJXOXkYJzGQqtSB1G7PXdbxSns4tdQWpVTveM0-C3_sul9iEU-1EQ1598uVMp1xwa28LYqm9WnzEbS4NylbWDP4cE4deCaTKf1FjwJx2at-lcAk6gOBjY"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Black Steel Crew Nairobi",
    description: "Custom gates, railings and balustrades, staircase fabrication, steel furniture, precision welding and commercial installations in Nairobi, Kenya.",
  },
};

import Link from "next/link";
import Footer from "@/components/Footer";

export default function ServicesPage() {
  return (
    <main className="bg-background text-on-surface pt-24">
      <section className="px-margin-mobile md:px-margin-desktop py-24 max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-end">
          <div className="md:col-span-8">
            <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase mb-4 block">
              Our Expertise
            </span>
            <h1 className="font-display-lg text-display-lg leading-tight">
              Precision Fabrication <br /> Forging the Future.
            </h1>
            <p className="text-body-lg text-on-surface-variant mt-6 max-w-2xl leading-relaxed">
              From structural gates to refined furniture, we blend precision welding with modern industrial finishing to create bespoke steelwork that stands the test of time.
            </p>
          </div>
          <div className="md:col-span-4 flex justify-end">
            <div className="text-right border-l border-outline-variant/30 pl-6 py-2">
              <span className="block font-headline-lg text-headline-lg text-primary">7+</span>
              <span className="font-label-caps text-label-caps text-on-surface-variant tracking-widest">Years of Mastery</span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-margin-mobile md:px-margin-desktop pb-24 max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">

          <div id="custom-gates" className="md:col-span-8 group relative h-[500px] rounded-xl overflow-hidden border-t border-outline/20 bg-surface-container">
            <img
              alt="Custom Gates"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
              src="https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1200&q=80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
            <div className="absolute bottom-0 left-0 p-10 w-full md:w-2/3">
              <div className="bg-primary/20 backdrop-blur-sm border border-primary/30 px-3 py-1 rounded-lg inline-block mb-4">
                <span className="font-label-caps text-label-caps text-primary tracking-widest">SIGNATURE SERVICE</span>
              </div>
              <h2 className="font-headline-lg text-headline-lg mb-2">Custom Gates</h2>
              <p className="text-on-surface-variant mb-6">Bespoke driveway and security gates, laser-cut geometric patterns or traditional forge-work, engineered for strength and curb appeal.</p>
              <button className="flex items-center gap-2 bg-on-surface text-background px-6 py-3 rounded-lg text-body-sm font-semibold hover:bg-primary hover:text-on-primary transition-colors active:scale-95">
                Request Quote <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>

          <div id="railings-balustrades" className="md:col-span-4 group relative h-[500px] rounded-xl overflow-hidden border-t border-outline/20 bg-surface-container">
            <img
              alt="Railings and Balustrades"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70"
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80"
            />
            <div className="absolute inset-0 glass-panel opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center p-8 text-center">
              <h3 className="font-headline-lg text-headline-lg-mobile mb-4">Railings &amp; Balustrades</h3>
              <p className="text-on-surface-variant mb-8">Premium stainless steel and glass balustrades designed for safety, aesthetics, and long-term industrial durability.</p>
              <button className="border border-primary text-primary px-6 py-2 rounded-lg text-body-sm font-semibold hover:bg-primary hover:text-on-primary transition-all">
                Explore Designs
              </button>
            </div>
            <div className="absolute bottom-6 left-6 group-hover:opacity-0 transition-opacity">
              <h3 className="font-headline-lg text-headline-lg-mobile">Railings &amp; Balustrades</h3>
            </div>
          </div>

          <div id="staircase-fabrication" className="md:col-span-4 group relative h-[400px] rounded-xl overflow-hidden border-t border-outline/20 bg-surface-container">
            <img
              alt="Staircase Fabrication"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-80"
              src="https://images.unsplash.com/photo-1486304873000-235643847519?w=900&q=80"
            />
            <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-background via-transparent">
              <h3 className="font-headline-lg text-headline-lg-mobile mb-2">Staircase Fabrication</h3>
              <p className="text-on-surface-variant text-body-sm mb-4">Internal and external staircase solutions, including floating, spiral, and heavy-duty industrial spine designs.</p>
              <a href="#" className="font-label-caps text-label-caps text-primary flex items-center gap-2 tracking-widest font-medium">
                VIEW SPECS <span className="material-symbols-outlined text-xs">north_east</span>
              </a>
            </div>
          </div>

          <div id="custom-furniture" className="md:col-span-4 group relative h-[400px] rounded-xl overflow-hidden bg-surface-container-high">
            <div className="p-8 flex flex-col h-full justify-between border border-outline-variant/20 hover:border-primary/50 rounded-xl transition-colors">
              <div>
                <span className="material-symbols-outlined text-4xl text-primary mb-6 block">chair</span>
                <h3 className="font-headline-lg text-headline-lg-mobile mb-4">Custom Furniture</h3>
                <p className="text-on-surface-variant">Hand-forged steel furniture for high-end residential and commercial spaces, some pieces finished with warm wood-accent tabletops.</p>
              </div>
              <button className="w-full py-4 border-b border-on-surface-variant hover:text-primary transition-colors text-left flex justify-between items-center text-body-sm font-semibold">
                Request Assessment <span className="material-symbols-outlined">add</span>
              </button>
            </div>
          </div>

          <div id="precision-welding" className="md:col-span-4 group relative h-[400px] rounded-xl overflow-hidden border-t border-outline/20 bg-surface-container">
            <img
              alt="Precision Welding"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-50"
              src="https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=900&q=80"
            />
            <div className="absolute top-8 left-8">
              <h3 className="font-headline-lg text-headline-lg-mobile">Precision Welding</h3>
            </div>
            <div className="absolute bottom-8 left-8 right-8">
              <div className="glass-panel rounded-lg p-4 border-l-4 border-primary">
                <p className="font-label-caps text-label-caps text-primary uppercase mb-1 tracking-widest">Capabilities</p>
                <p className="text-body-sm">TIG, MIG &amp; Arc welding for bespoke structural needs.</p>
              </div>
            </div>
          </div>

          <div id="commercial-installations" className="md:col-span-12 group relative h-[450px] rounded-xl overflow-hidden border-t border-outline/20 bg-surface-container-lowest mt-6">
            <div className="grid md:grid-cols-2 h-full">
              <div className="p-12 flex flex-col justify-center">
                <h3 className="font-headline-lg text-headline-lg mb-6">
                  Commercial Installations
                </h3>
                <p className="text-on-surface-variant mb-8 max-w-md leading-relaxed">
                  Full-scale structural and architectural steelwork. We design, fabricate, and install gates, railings, and fixture systems for residences, hotels, and corporate sites.
                </p>
                <div className="flex gap-4">
                  <Link href="/booking" className="bg-secondary-container text-white px-8 py-3 rounded-lg text-body-sm font-semibold active:scale-95 transition-transform">
                    Book a Walkthrough
                  </Link>
                  <Link href="/portfolio" className="border border-outline-variant text-on-surface px-8 py-3 rounded-lg text-body-sm font-semibold hover:border-primary transition-colors">
                    Case Studies
                  </Link>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-r-xl hidden md:block">
                <img
                  alt="Commercial Installations"
                  className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110"
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-lowest border-t border-outline-variant/30 py-24">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center">
          <h2 className="font-display-lg text-display-lg mb-8">
            Ready to Forge Your Vision?
          </h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto mb-12 leading-relaxed">
            Connect with our fabrication team today to discuss your bespoke project requirements and receive a personalized quotation.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <div className="flex items-center gap-4 bg-background px-8 py-4 rounded-lg border border-outline-variant">
              <span className="material-symbols-outlined text-primary">call</span>
              <div className="text-left">
                <p className="font-label-caps text-label-caps text-on-surface-variant tracking-widest uppercase">Call Us</p>
                <p className="font-bold">+254 726 461 196</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-background px-8 py-4 rounded-lg border border-outline-variant">
              <span className="material-symbols-outlined text-primary">mail</span>
              <div className="text-left">
                <p className="font-label-caps text-label-caps text-on-surface-variant tracking-widest uppercase">Email Us</p>
                <p className="font-bold">info@tuistech.co.ke</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}