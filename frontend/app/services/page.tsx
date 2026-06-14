import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Forge & Timber Atelier Nairobi",
  description: "Custom furniture, architectural metalwork, wood-metal décor, restoration & repairs, precision welding and commercial installations in Nairobi, Kenya.",
  openGraph: {
    title: "Services | Forge & Timber Atelier Nairobi",
    description: "Custom furniture, architectural metalwork, wood-metal décor, restoration & repairs, precision welding and commercial installations in Nairobi, Kenya.",
    url: "https://tuistech.co.ke/services",
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuDKZkFB7nfJk6r7jmyQO-AVHnZdP7LJr29ZqN0oN7deW8u-FynV8eH49R4bubmO2QUoz08l5GAEmy704ZORM-htSo6QE8m1XQrNzsO9QWzsBJmHRZ7Y2DBUDqj62PuAbh-lASPFQ57rHdGz29cx9ckkpH4Zq2YmYd9he093plIplw7Okh7gZhohycXc2UdEF5He9qps9SX4cRwWOcjzKRvPvhskTw1ZJOvhJ2O_TXcdFP9WV_YbCCsPzmlJZwtHvC6fiB2l2pwLqsMT"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Forge & Timber Atelier Nairobi",
    description: "Custom furniture, architectural metalwork, wood-metal décor, restoration & repairs, precision welding and commercial installations in Nairobi, Kenya.",
  },
};

import Link from "next/link";
import Footer from "@/components/Footer";

export default function ServicesPage() {
  return (
    <main
      className="bg-[#131313] text-[#e5e2e1] pt-24"
      style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/dark-matter.png')" }}
    >
      {/* Hero */}
      <section className="px-4 md:px-16 py-24 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          <div className="md:col-span-8">
            <span className="text-xs text-[#ffb785] tracking-widest uppercase mb-4 block" style={{ fontFamily: "JetBrains Mono, monospace" }}>
              Our Expertise
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight" style={{ fontFamily: "Playfair Display, serif" }}>
              Artisan Craftsmanship <br /> Forging the Future.
            </h1>
            <p className="text-lg text-[#d3c4b9] mt-6 max-w-2xl leading-relaxed">
              From raw timber to refined steel, we blend ancient techniques with modern industrial precision to create bespoke environments that stand the test of time.
            </p>
          </div>
          <div className="md:col-span-4 flex justify-end">
            <div className="text-right border-l border-[#4f453d]/30 pl-6 py-2">
              <span className="block text-[#e8bf9b] text-2xl font-semibold" style={{ fontFamily: "Playfair Display, serif" }}>15+</span>
              <span className="text-xs text-[#9c8e84] tracking-widest" style={{ fontFamily: "JetBrains Mono, monospace" }}>Years of Mastery</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Bento Grid */}
      <section className="px-4 md:px-16 pb-24 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* 1. Custom Furniture - Large */}
          <div className="md:col-span-8 group relative h-[500px] overflow-hidden border-t border-[#c3c7cb]/20 bg-[#20201f]">
            <img
              alt="Custom Furniture"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBw_kMgSfbDTP4PLGCuYineOyaxMEcNNCoxGjAVZg_R0g7lfY2cZWb7EqbQpwjeB-E266t6d9uciuUV2Su1j6kYE1J8QfUPJrw9fsOWfqG5QnHpwC7A0V0RF08MoGvYqaj9KXwv9ahFuFZAVa1Fs3CX1ZA52jKQKKRQaiw_3hMb6VAXQaiTxLZqsfPP5TbWXpOdBdz3j8_8BSgAvkdBqGJWr0Plb4HkoRIaHZk_AjvVr-LWjCgNBuOpdxd0IQxEEXPTVVPbYW7DLutf"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#131313] to-transparent opacity-60" />
            <div className="absolute bottom-0 left-0 p-10 w-full md:w-2/3">
              <div className="bg-[#ffb785]/20 backdrop-blur-sm border border-[#ffb785]/30 px-3 py-1 inline-block mb-4">
                <span className="text-[10px] text-[#ffb785] tracking-widest" style={{ fontFamily: "JetBrains Mono, monospace" }}>SIGNATURE SERVICE</span>
              </div>
              <h2 className="text-3xl font-semibold mb-2" style={{ fontFamily: "Playfair Display, serif" }}>Custom Furniture</h2>
              <p className="text-[#d3c4b9] mb-6">Bespoke heirloom pieces blending reclaimed walnut with industrial steel frames, engineered for elegance and endurance.</p>
              <button className="flex items-center gap-2 bg-[#e5e2e1] text-[#131313] px-6 py-3 text-sm font-semibold hover:bg-[#e8bf9b] transition-colors active:scale-95">
                Request Quote <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* 2. Wood-Metal Décor */}
          <div className="md:col-span-4 group relative h-[500px] overflow-hidden border-t border-[#c3c7cb]/20 bg-[#20201f]">
            <img
              alt="Wood-Metal Décor"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmZfy78WYIYuQbqSnqZqzspDMX_FOIf-nkCEm9_2ACuuc-kLLl4Q4-LHB4cLS-raganz0JtUyIdbFbK03R6vB0IEWg2_btvprwKsuTBkilTTYdGMNbXgXbm0N4ev3cIrumhfhVyi5i9HIE7lHZegtyuaegRHmYV3cYRMAm6juAnsqMpCqfz7yMsmWGIgk62Hm1gjrWryfY8vFTUybjQ2twWSt2R7KVO2IfIlHbtkl9DK8Z4713rSx3d8XzjOn62cFmqv4fUzacseUR"
            />
            <div className="absolute inset-0 bg-[#1a1a1a]/85 backdrop-blur-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center p-8 text-center">
              <h3 className="text-2xl font-semibold mb-4" style={{ fontFamily: "Playfair Display, serif" }}>Wood-Metal Décor</h3>
              <p className="text-[#d3c4b9] mb-8">Artistic accents, wall installations, and lighting fixtures that bridge the gap between organic and industrial.</p>
              <button className="border border-[#e8bf9b] text-[#e8bf9b] px-6 py-2 text-sm font-semibold hover:bg-[#e8bf9b] hover:text-[#442b12] transition-all">
                Explore Designs
              </button>
            </div>
            <div className="absolute bottom-6 left-6 group-hover:opacity-0 transition-opacity">
              <h3 className="text-2xl font-semibold" style={{ fontFamily: "Playfair Display, serif" }}>Artisan Décor</h3>
            </div>
          </div>

          {/* 3. Industrial Fabrication */}
          <div className="md:col-span-4 group relative h-[400px] overflow-hidden border-t border-[#c3c7cb]/20 bg-[#20201f]">
            <img
              alt="Industrial Fabrication"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-80"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7lN-Q9-UdgQvVpdNM0EqImb13L6tstH98aZmGieGKorDRvTR_TEB_4eTmnpmSJ_Ddczbo_pHrfgkX7bJKjT4G8XZt7smcrLZ5ZAnyhBN3lFmo9mn71Ae9HLSFQjYU4Cmw8Z-Olmmz7wCkhA8uP1bPo5dozYLHRco2uTtzLQSTW64H_k9YKA95bpok7XWOX35xBjz7ufk-MEH1Ft-ORPRhni4afg7JBjEIzQjwXLP6iklXEfcS0a-C6LrH_d2v9v3kIKOySZQBg6Va"
            />
            <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-[#131313] via-transparent">
              <h3 className="text-2xl font-semibold mb-2" style={{ fontFamily: "Playfair Display, serif" }}>Industrial Fabrication</h3>
              <p className="text-[#d3c4b9] text-sm mb-4">Large-scale metal structures and precision components for architectural projects.</p>
              <a href="#" className="text-xs text-[#e8bf9b] flex items-center gap-2 tracking-widest font-medium" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                VIEW SPECS <span className="material-symbols-outlined text-xs">north_east</span>
              </a>
            </div>
          </div>

          {/* 4. Restoration */}
          <div className="md:col-span-4 group relative h-[400px] overflow-hidden bg-[#2a2a2a]">
            <div className="p-8 flex flex-col h-full justify-between border border-[#4f453d]/20 hover:border-[#e8bf9b]/50 transition-colors">
              <div>
                <span className="material-symbols-outlined text-4xl text-[#e8bf9b] mb-6 block">healing</span>
                <h3 className="text-2xl font-semibold mb-4" style={{ fontFamily: "Playfair Display, serif" }}>Restoration &amp; Repairs</h3>
                <p className="text-[#d3c4b9]">Breathe life back into heritage pieces. We specialize in period-accurate wood restoration and metal refinishing.</p>
              </div>
              <button className="w-full py-4 border-b border-[#9c8e84] hover:text-[#e8bf9b] transition-colors text-left flex justify-between items-center text-sm font-semibold">
                Request Assessment <span className="material-symbols-outlined">add</span>
              </button>
            </div>
          </div>

          {/* 5. Welding */}
          <div className="md:col-span-4 group relative h-[400px] overflow-hidden border-t border-[#c3c7cb]/20 bg-[#20201f]">
            <img
              alt="Welding"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-50"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCi0W20K7JdvjhzPhBCsufmbaCx6pdfVSw5SrxgrjXUKLHdiJV1rROV8o8_LKu53mozE401KnCURBw11DWNKdpKPHa0ibFoeGGLzOxpKn3p_Uy1hGqt0MpJ627Qet6f84qC9j_56U52neJQVm47khZxpwk3q_8k5nHvVV65ZKkuMiXOc3WCzvztYLUnDWoafbQ_sQr9gv0TTaPMnqfFtWxan8a0t_id8OOQf1rb0Wxl9U9GlU10hIq1zgaXyXv3I4haAXKje6wpvGEY"
            />
            <div className="absolute top-8 left-8">
              <h3 className="text-2xl font-semibold" style={{ fontFamily: "Playfair Display, serif" }}>Precision Welding</h3>
            </div>
            <div className="absolute bottom-8 left-8 right-8">
              <div className="bg-[#131313]/80 backdrop-blur-md p-4 border-l-4 border-[#e8bf9b]">
                <p className="text-xs text-[#e8bf9b] uppercase mb-1 tracking-widest" style={{ fontFamily: "JetBrains Mono, monospace" }}>Capabilities</p>
                <p className="text-sm">TIG, MIG &amp; Arc welding for bespoke structural needs.</p>
              </div>
            </div>
          </div>

          {/* 6. Interior & Commercial */}
          <div className="md:col-span-12 group relative h-[450px] overflow-hidden border-t border-[#c3c7cb]/20 bg-[#0e0e0e] mt-6">
            <div className="grid md:grid-cols-2 h-full">
              <div className="p-12 flex flex-col justify-center">
                <h3 className="text-3xl font-semibold mb-6" style={{ fontFamily: "Playfair Display, serif" }}>
                  Interior &amp; Commercial Installations
                </h3>
                <p className="text-[#d3c4b9] mb-8 max-w-md leading-relaxed">
                  Full-scale spatial transformations. We design, build, and install comprehensive furniture and fixture systems for luxury homes, boutiques, and corporate headquarters.
                </p>
                <div className="flex gap-4">
                  <Link href="/booking" className="bg-[#e8bf9b] text-[#442b12] px-8 py-3 text-sm font-semibold active:scale-95 transition-transform">
                    Book a Walkthrough
                  </Link>
                  <Link href="/portfolio" className="border border-[#9c8e84] text-[#e5e2e1] px-8 py-3 text-sm font-semibold hover:bg-[#353535] transition-colors">
                    Case Studies
                  </Link>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-r-xl hidden md:block">
                <img
                  alt="Commercial Installations"
                  className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbNZ6S31Ud1aOxE628fwxFso0AvY333Xi9g-cXU9GBZb6LdpI6Y_DVUD9yaKVnHXTKqORlJu1HIMXlzyR69EU77O47NE_lmayZI61gC53Px2Nj_KmbC8I203peCxVB5n5ZrWCFLBFXW3Q_WTfae4wInKE2kQePcfyaCLLQlqK5FlL8sP_AKxoLqnvKrGrYt2PnKxVL5tFHn9bQQywpKdWb8gCIJtDPxseXb3oVuLj7eyZTb8XKEoVW_rdILicB_SDTC4KN4A6XiM13"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e0e] to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0e0e0e] border-t border-[#4f453d]/30 py-24">
        <div className="px-4 md:px-16 max-w-[1440px] mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8" style={{ fontFamily: "Playfair Display, serif" }}>
            Ready to Forge Your Vision?
          </h2>
          <p className="text-[#d3c4b9] max-w-2xl mx-auto mb-12 leading-relaxed">
            Connect with our master artisans today to discuss your bespoke project requirements and receive a personalized quotation.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <div className="flex items-center gap-4 bg-[#131313] px-8 py-4 border border-[#4f453d]">
              <span className="material-symbols-outlined text-[#e8bf9b]">call</span>
              <div className="text-left">
                <p className="text-xs text-[#9c8e84] tracking-widest uppercase" style={{ fontFamily: "JetBrains Mono, monospace" }}>Call Us</p>
                <p className="font-bold">+254 726 461 196</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-[#131313] px-8 py-4 border border-[#4f453d]">
              <span className="material-symbols-outlined text-[#e8bf9b]">mail</span>
              <div className="text-left">
                <p className="text-xs text-[#9c8e84] tracking-widest uppercase" style={{ fontFamily: "JetBrains Mono, monospace" }}>Email Us</p>
                <p className="font-bold">alex2000rui@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
