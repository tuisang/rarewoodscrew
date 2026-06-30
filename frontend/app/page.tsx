"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import ProductModal from "@/components/ProductModal";
import { CartItem } from "@/lib/CartContext";
import Footer from "@/components/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

interface Review {
  id: string;
  authorName: string;
  rating: number;
  title: string;
  body: string;
  service?: string;
}

const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDCPBHLKaNhBlv6yK9XvlgX5DeT7NK2PMO_JCb52UBDJX61YJgI13vF95T4UX15jRUJg9B2irW-TkrPIOELWXFd-LHOGpC-uepB5ilNV4owZLnTkMjAZO2kR0A-5MCw2ZZ714yp3bKMbG1cwdV8dcr_sCrykahlxfxmYQOyuUr6Ox69O5tnqr04XPU3tu_Y4o7WS5vnzOgt2TdaHBkYcg_qIrI5LKTb4rGbMBvNqFxeKt3kXl31UZjGC3UXwTSsaF9EqUyLR72nq5g";

const PROJECT_HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBmXdi9qKOMjYqCJNygDXhApF_QeqqMjKtWDUvxufhV3pui8b3m9etyiLVLnTWHJMKguwI3si5H5sr56eH10JtQhmvJwqUNklYrT9tk9udzRzavPeNXFFz2NVaKoQrm8NvTnHUYswL2mqvjvwM3cFE4Be3fd2ZNPPzJD9uOlEpZOewwK3O_gBQ9ow2mNfRnV2CjWLKqNigHuFHYjeWgDbHio0u1v8R-xNY2PR9mNMeODJe58kxjUX-4vWvz8A5f43WFTildVdigDcY";

const MEDIA_CONSOLE_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAAAItuammZHQ-FDgLe6CFi8_uJN4sUbhBKGUWKBhFW8mCi9iqUrKxKTZNgJ2MA3Z5dPp14cvs3MJcgp9kJaR5TaGtOfOTi6o2B_XfYhb7zaYpeAHxLrLrSvEoH6zWLCAWQsdTL0Pw_xjbeIFCezATLFkUlen1ix_RqWpCJBV6U7iFtI661PmkiGDeXkVTXZ4Pk436DdVAJb7lh4N-a4c4ws7avLlH_qc67J670-k-Haz1NyY8VKaCC2FLUyIWaly3VVPjVBC_3lAk";

const KITCHEN_DETAIL_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBhQzTrN5d4WuKgP5uluLj-3w4kQrLXJPLZJ0KaKXZ_JwH-Ml70bA2dOefJNCnzDl-JCVkhT9vclMwVSu2bx6Qn4s7_BWM_ecTapTdc8Z05XL4NXFa_14nbw1TuJGUBx6HfldnMAxNtcYZDuN9Pd4uNVNIr2SX1vTi2We3uMDgdmGJ6Le-Bx9EZDfsdTuGz5KHzVur_gDd3blELdrYZ0A6oekV6Gc9N3O1kc3nHGqzQmlWJkJYKClC_jQsWouSP4KUgJ59XQztTgZ4";

const WORKSHOP_DETAIL_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDMF2Ky7JgID6zlVmHbual6qosyth1uoUOAqjXiGaAOI8h4LdBEECwvweSz_P2Qt5ckYQaii0OpOIJGWzgDZevaz1XFmimNJFXZ_BCbD9XTUDuOw7gYgCyHv9fgtWhwKYYi1Iu0AZQsQg4-ridw-Zlj4s50KZApCSBjqAiHg4Nl3-xvFcy0WaEDFaSgWNgOeYkr_emKSqwq-Eh8H0wYXWx0OMDV51p2k3Xd24KR3sJawv5YgdDZ7H8KgpZKvb4bLHE670SSou9cMN0";

const SERVICES = [
  {
    icon: "chair",
    title: "Custom Furniture",
    body: "Handcrafted tables, chairs, and bedroom sets designed to last for generations.",
  },
  {
    icon: "kitchen",
    title: "Kitchen Cabinets",
    body: "High-precision millwork and cabinetry that blends functionality with luxury aesthetics.",
  },
  {
    icon: "architecture",
    title: "Bespoke Millwork",
    body: "Custom wall paneling, built-ins, and architectural features for premium interiors.",
  },
];

const PRODUCTS = [
  { id: 1, name: "Custom Wardrobe", image: WORKSHOP_DETAIL_IMAGE, price: 85000, reviews: 14 },
  { id: 2, name: "Dining Table Set", image: PROJECT_HERO_IMAGE, price: 62000, reviews: 19 },
  { id: 3, name: "Kitchen Cabinetry", image: KITCHEN_DETAIL_IMAGE, price: 145000, reviews: 8 },
  { id: 4, name: "Bookshelf Unit", image: MEDIA_CONSOLE_IMAGE, price: 28500, reviews: 22 },
  { id: 5, name: "Office Desk", image: WORKSHOP_DETAIL_IMAGE, price: 34000, reviews: 11 },
  { id: 6, name: "TV Stand", image: MEDIA_CONSOLE_IMAGE, price: 21000, reviews: 16 },
  { id: 7, name: "Bed Frame", image: PROJECT_HERO_IMAGE, price: 47000, reviews: 9 },
  { id: 8, name: "Display Cabinet", image: KITCHEN_DETAIL_IMAGE, price: 53000, reviews: 6 },
];

const TESTIMONIALS_FALLBACK = [
  {
    id: "fallback-1",
    quote: "The attention to detail on our walnut library was beyond anything we expected. Rarewoods Crew are true artists.",
    author: "Eleanor Vance",
    location: "Private Residence, Karen",
    tag: "Full Library Fit-out",
  },
  {
    id: "fallback-2",
    quote: "They delivered a masterpiece of a dining table. It's the undisputed centerpiece of our home and will be for decades.",
    author: "Julian Thorne",
    location: "Penthouse, Nairobi",
    tag: "Custom Dining Table",
  },
];

const USD_KES_RATE = 130;

export default function HomePage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Omit<CartItem, "quantity"> | null>(null);
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const { addToCart } = useCart();

  const updateQuantity = (id: number, change: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + change),
    }));
  };

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((d) => setReviews((d.reviews ?? []).slice(0, 2)))
      .catch(() => {});
  }, []);

  return (
    <main className="bg-background text-on-background overflow-x-hidden">
      {/* Hero */}
      <section className="relative h-[600px] md:h-[795px] flex items-end justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="w-full h-full object-cover" alt="Sunlit premium woodworking workshop with timber workbenches and raw oak planks" src={HERO_IMAGE} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>
        <div className="relative z-10 px-6 md:px-margin-desktop pb-12 md:pb-16 text-center max-w-4xl">
          <h1 className="font-headline-xl text-4xl md:text-6xl font-extrabold text-white mb-4 leading-[1.1] tracking-tight">
            Timeless Woodcraft. Built by Rarewoods Crew.
          </h1>
          <p className="text-white/90 font-body-lg text-base md:text-lg mb-8 max-w-2xl mx-auto">
            Crafting bespoke furniture and architectural woodwork with precision, passion, and premium hardwoods.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md sm:max-w-none mx-auto">
            <Link href="/portfolio" className="bg-primary-container text-on-primary-fixed font-bold py-4 px-10 rounded-lg text-base md:text-lg hover:scale-[1.02] transition-transform">
              View Portfolio
            </Link>
            <Link href="/booking" className="border-2 border-white text-white font-bold py-4 px-10 rounded-lg text-base md:text-lg hover:bg-white/10 transition-colors">
              Book Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects — Bento Masonry */}
      <section className="py-16 md:py-section-gap px-6 md:px-margin-desktop max-w-container-max mx-auto">
        <div className="mb-12">
          <span className="font-label-caps text-xs text-primary uppercase tracking-widest">Portfolio</span>
          <h2 className="font-headline-lg text-3xl md:text-5xl font-bold mt-2">Featured Projects</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:grid-rows-2">
          <Link href="/portfolio" className="md:col-span-8 md:row-span-2 group relative overflow-hidden rounded-xl shadow-ambient block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="w-full h-[400px] md:h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Bespoke American Walnut dining table with live edge" src={PROJECT_HERO_IMAGE} />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex flex-col justify-end p-8">
              <p className="text-white/80 font-label-caps text-xs mb-1">Bespoke Furniture</p>
              <h3 className="text-white font-headline-md text-2xl font-bold">The Heritage Walnut Table</h3>
            </div>
          </Link>
          <Link href="/portfolio" className="md:col-span-4 group relative overflow-hidden rounded-xl shadow-ambient block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="w-full h-[250px] object-cover transition-transform duration-700 group-hover:scale-110" alt="White Oak media console with vertical slat detailing" src={MEDIA_CONSOLE_IMAGE} />
            <div className="absolute inset-0 bg-black/20 flex flex-col justify-end p-6">
              <h3 className="text-white text-base font-bold">Oak Media Console</h3>
            </div>
          </Link>
          <Link href="/portfolio" className="md:col-span-4 group relative overflow-hidden rounded-xl shadow-ambient block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="w-full h-[250px] object-cover transition-transform duration-700 group-hover:scale-110" alt="Dovetail joint detail on a custom cherry wood kitchen island" src={KITCHEN_DETAIL_IMAGE} />
            <div className="absolute inset-0 bg-black/20 flex flex-col justify-end p-6">
              <h3 className="text-white text-base font-bold">Kitchen Craftsmanship</h3>
            </div>
          </Link>
        </div>
      </section>

      {/* Services Overview */}
      <section className="bg-surface-container py-16 md:py-section-gap px-6 md:px-margin-desktop">
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-16">
            <span className="font-label-caps text-xs text-primary uppercase tracking-widest">What We Do</span>
            <h2 className="font-headline-lg text-3xl md:text-5xl font-bold mt-2">Our Services</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <div key={service.title} className="bg-surface rounded-xl p-8 oak-texture ghost-border shadow-ambient hover:-translate-y-1 transition-all duration-300">
                <div className="text-primary mb-6">
                  <span className="material-symbols-outlined text-5xl" style={{ fontVariationSettings: "'wght' 200" }}>{service.icon}</span>
                </div>
                <h3 className="font-headline-md text-2xl mb-4 text-on-surface">{service.title}</h3>
                <p className="text-on-surface-variant mb-6">{service.body}</p>
                <hr className="border-outline-variant/30 mb-6" />
                <Link href="/services" className="text-primary font-bold inline-flex items-center gap-2">
                  Explore <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* M-Pesa Banner */}
      <section className="px-6 md:px-margin-desktop py-16 max-w-container-max mx-auto">
        <div className="bg-surface-container-lowest border-l-4 border-mpesa-green rounded-r-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 ghost-border">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-mpesa-green text-2xl">smartphone</span>
            <div>
              <h3 className="font-headline-md text-lg font-semibold mb-1">Secure Payments with M-Pesa</h3>
              <p className="text-sm text-on-surface-variant">
                Seamless, high-trust transactions. We offer direct Lipa na M-Pesa options for all deposits and project balances.
              </p>
            </div>
          </div>
          <Link
            href="/payments"
            className="bg-mpesa-green text-white px-6 py-3 rounded-lg font-bold text-sm flex items-center gap-2 flex-shrink-0 hover:opacity-90 transition-all"
          >
            <span className="material-symbols-outlined text-base">smartphone</span>
            View Payment Steps
          </Link>
        </div>
      </section>

      {/* About / Ethos */}
      <section className="py-16 md:py-section-gap px-6 md:px-margin-desktop max-w-container-max mx-auto overflow-hidden">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">
          <div className="w-full md:w-1/2 relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="rounded-xl shadow-2xl w-full h-[400px] md:h-[500px] object-cover" alt="A craftsman measuring reclaimed timber with a brass rule" src={WORKSHOP_DETAIL_IMAGE} />
            <div className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 w-36 h-36 md:w-48 md:h-48 bg-primary-fixed-dim rounded-full flex items-center justify-center p-6 md:p-8 text-center rotate-12 shadow-xl border-4 border-surface">
              <span className="font-label-caps text-xs text-on-primary-fixed leading-tight">Master Guild Quality Since 2008</span>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <span className="font-label-caps text-xs text-primary uppercase tracking-widest">Our Ethos</span>
            <h2 className="font-headline-lg text-3xl md:text-5xl font-bold mt-2 mb-6">Handcrafted Excellence</h2>
            <p className="font-body-lg text-base text-on-surface-variant mb-6 leading-relaxed">
              At Rarewoods Crew, we believe every piece of timber tells a story. Our process begins with the careful selection of premium, sustainably sourced hardwoods, followed by weeks of meticulous hand-shaping and precision joinery.
            </p>
            <p className="font-body-lg text-base text-on-surface-variant mb-8 leading-relaxed">
              We marry traditional techniques with modern high-tech precision to ensure that every curve, joint, and finish exceeds the highest standards of luxury woodworking.
            </p>
            <div className="flex gap-10">
              <div>
                <p className="font-headline-md text-3xl font-bold text-primary">150+</p>
                <p className="font-label-caps text-xs text-secondary tracking-widest">PROJECTS BUILT</p>
              </div>
              <div>
                <p className="font-headline-md text-3xl font-bold text-primary">15yr</p>
                <p className="font-label-caps text-xs text-secondary tracking-widest">GUARANTEE</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Woodwork carousel (shop) */}
      <section className="py-16 md:py-section-gap bg-surface-container-low">
        <div className="px-6 md:px-margin-desktop max-w-container-max mx-auto mb-10">
          <div className="flex justify-between items-end">
            <div>
              <span className="font-label-caps text-xs text-primary tracking-widest mb-2 block">CRAFTED TO ORDER</span>
              <h2 className="font-headline-md text-2xl md:text-3xl font-bold">Featured Woodwork</h2>
            </div>
            <Link href="/shop" className="font-label-caps text-xs text-primary hover:underline tracking-widest">
              VIEW ALL
            </Link>
          </div>
        </div>
        <Swiper
          modules={[Autoplay, Navigation]}
          loop={true}
          navigation
          speed={1500}
          autoplay={{ delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          spaceBetween={20}
          slidesPerView={5}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 5 },
          }}
          className="px-6 md:px-margin-desktop"
        >
          {PRODUCTS.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="relative rounded-xl overflow-hidden group shadow-ambient">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[340px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute top-4 left-4">
                  <h3 className="text-white font-bold text-lg">{product.name}</h3>
                </div>
                <div className="absolute top-4 right-4 bg-primary text-on-primary px-3 py-1 rounded-full font-semibold text-sm flex flex-col items-end leading-tight">
                  <span>KSh {product.price.toLocaleString()}</span>
                  <span className="text-[10px] font-normal opacity-80">
                    approx ${Math.round(product.price / USD_KES_RATE).toLocaleString()}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm p-3 rounded-xl w-[190px]">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-primary-fixed-dim text-sm">*****</div>
                    <span className="text-xs text-white">({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <button onClick={() => updateQuantity(product.id, -1)} className="bg-white text-black w-8 h-8 rounded font-bold">-</button>
                    <span className="text-white font-bold">{quantities[product.id] || 1}</span>
                    <button onClick={() => updateQuantity(product.id, 1)} className="bg-white text-black w-8 h-8 rounded font-bold">+</button>
                  </div>
                  <button
                    onClick={() =>
                      addToCart(
                        {
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          priceLabel: "KSh " + product.price.toLocaleString(),
                          img: product.image,
                        },
                        quantities[product.id] || 1
                      )
                    }
                    className="bg-primary text-on-primary px-3 py-2 rounded w-full font-semibold text-sm hover:bg-primary-container transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Testimonials */}
      <section className="bg-surface-container-high py-16 md:py-section-gap px-6 md:px-margin-desktop">
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-3xl md:text-5xl font-bold">Client Stories</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(reviews.length > 0
              ? reviews.map((r) => ({
                  id: r.id,
                  quote: r.body,
                  author: r.authorName,
                  location: r.service ?? "Verified Client",
                  tag: r.title,
                  rating: r.rating,
                }))
              : TESTIMONIALS_FALLBACK.map((t) => ({ ...t, rating: 5 }))
            ).map((item) => (
              <div key={item.id} className="bg-surface p-10 rounded-xl shadow-ambient">
                <div className="flex gap-1 mb-6 text-primary">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="material-symbols-outlined" style={{ fontVariationSettings: `'FILL' ${star <= item.rating ? 1 : 0}` }}>
                      star
                    </span>
                  ))}
                </div>
                <p className="font-body-lg text-xl leading-relaxed mb-8">&quot;{item.quote}&quot;</p>
                <hr className="border-outline-variant/30 mb-6" />
                <div className="flex justify-between items-center flex-wrap gap-3">
                  <div>
                    <p className="font-bold text-on-surface">{item.author}</p>
                    <p className="font-label-caps text-xs text-secondary tracking-widest">{item.location}</p>
                  </div>
                  <span className="font-label-caps text-xs bg-secondary-container px-3 py-1 rounded text-on-secondary-container">{item.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-section-gap px-6 md:px-margin-desktop text-center bg-inverse-surface text-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-headline-lg text-3xl md:text-5xl font-bold mb-6">Start Your Bespoke Project</h2>
          <p className="font-body-lg text-base mb-10 text-white/70">
            From initial concept drawings to final installation, we guide you through the process of creating something truly unique.
          </p>
          <div className="flex flex-col gap-4 max-w-sm mx-auto">
            <Link href="/booking" className="bg-primary text-white font-bold py-5 px-10 rounded-lg text-lg hover:bg-primary-container transition-colors shadow-lg">
              Schedule Consultation
            </Link>
            <p className="text-sm text-white/50">Current lead time: 8-12 weeks</p>
          </div>
        </div>
      </section>

      <Footer />
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </main>
  );
}
