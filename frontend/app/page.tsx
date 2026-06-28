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
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBeeOgIEcSOvgIAQAKIj8DoMZUHQaq5YJYWWFIuGirFGKSjr9XHTzYiNPT1ZJBBjSgOtxqltgj9WRkLfy0jXZTjNcGp1epgzf_its1rja7SMPNdjwrEEZwDAFO57gBKB4D3y3ApFFmCvl1MnJLwQXtCpW-fw8Sih0B7P9PrSvi9Z4uHFaZGbmXB-KGxcrd-3PMtzuj8JmHK-bq4tlutQzyfeC6qMqCnEKMl-6TyyoU3cKcn3je0AJVrsaBRieRorqcGbmijQWMQnKI_";

const WORKSHOP_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCMi_CjqFKhoLcpfQ5IuPAgn1yTZBT_3s9Zwp0c1twVqJXtxhYDWNVL2cQZz3OTM9m7kf76Yvy3c7ffmiXPBRgQbECFgLTQylV2s9zdSvvcVyQ1st9EsI-aGmBC4MPsvuzfXBPoTOljV4ZefihLFO9H06AfuGN6-EOWQN-pn4jy9hbull_yfYRPZMGb1_b9UanG83jgfvaCY1TuJsy_O5JV0C2BSJtoWJ3tRXqGYHuX64aGLb6os5u4aIU6K6M4cO4X34v77d5TGKsj";

const WHY_US = [
  {
    icon: "engineering",
    title: "Unmatched Local Expertise",
    body: "With over 15 years in the Nairobi market, we understand local timber, humidity challenges, and the architectural nuances of Kenyan homes. Every joint and finish is engineered for longevity in our climate.",
  },
  {
    icon: "verified_user",
    title: "Total Reliability",
    body: "We do not just fix wood, we honor your schedule. Our On-Time Guarantee ensures that your project is completed within the agreed window, or we discount the final labor cost.",
  },
  {
    icon: "work",
    title: "Full Maintenance",
    body: "From creaky floors to sagging kitchen cabinets, we provide comprehensive repair solutions for all residential needs.",
  },
  {
    icon: "chair",
    title: "Custom Pieces",
    body: "Bring your designs to life. We specialize in bespoke wardrobes, dining tables, and entertainment units tailored to your space.",
  },
];

const PRODUCTS = [
  { id: 1, name: "Custom Wardrobe", image: WORKSHOP_IMAGE, price: 85000, reviews: 14 },
  { id: 2, name: "Dining Table Set", image: WORKSHOP_IMAGE, price: 62000, reviews: 19 },
  { id: 3, name: "Kitchen Cabinetry", image: WORKSHOP_IMAGE, price: 145000, reviews: 8 },
  { id: 4, name: "Bookshelf Unit", image: WORKSHOP_IMAGE, price: 28500, reviews: 22 },
  { id: 5, name: "Office Desk", image: WORKSHOP_IMAGE, price: 34000, reviews: 11 },
  { id: 6, name: "TV Stand", image: WORKSHOP_IMAGE, price: 21000, reviews: 16 },
  { id: 7, name: "Bed Frame", image: WORKSHOP_IMAGE, price: 47000, reviews: 9 },
  { id: 8, name: "Display Cabinet", image: WORKSHOP_IMAGE, price: 53000, reviews: 6 },
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
      .then((d) => setReviews((d.reviews ?? []).slice(0, 3)))
      .catch(() => {});
  }, []);

  return (
    <main className="bg-background text-on-surface overflow-x-hidden">
      <section className="relative w-full overflow-hidden">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-12 md:py-20">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2 space-y-6">
              <span className="inline-block bg-secondary-container/30 text-secondary px-4 py-1 rounded-full font-label-md text-label-md uppercase tracking-wider">
                Craftsmanship &amp; Care
              </span>
              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary leading-tight">
                Expert Carpentry <br /> Services in Nairobi
              </h1>
              <p className="text-body-lg text-on-surface-variant max-w-lg">
                Bridging traditional craftsmanship with modern reliability. From custom furniture to structural repairs, we honor the material and your deadlines.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/booking"
                  className="bg-secondary text-on-secondary px-8 py-3 rounded-lg font-label-md text-label-md hover:opacity-90 transition-all"
                >
                  Book Now
                </Link>
                <Link
                  href="/portfolio"
                  className="border border-walnut/30 text-on-surface px-8 py-3 rounded-lg font-label-md text-label-md hover:bg-surface-container transition-all"
                >
                  View Our Portfolio
                </Link>
              </div>
            </div>
            <div className="w-full md:w-1/2 relative">
              <div className="aspect-square rounded-full bg-oak/10 absolute -top-4 -right-4 w-64 h-64 -z-10 blur-3xl" />
              <img
                src={HERO_IMAGE}
                alt="Carpenter with M-Pesa payment"
                className="w-full h-auto rounded-2xl shadow-xl border-4 border-white object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-margin-mobile md:px-margin-desktop py-20 max-w-container-max mx-auto">
        <span className="font-label-md text-label-md text-secondary uppercase tracking-wider">
          Craftsmanship &amp; Care
        </span>
        <h2 className="font-headline-md text-headline-md text-primary mt-2 mb-10">
          Why Nairobi Trusts Rarewoods Crew
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {WHY_US.map((item, i) => (
            <div
              key={item.title}
              className={`tactile-card rounded-xl p-8 ${i === 1 ? "bg-forest-deep text-surface-cream" : ""}`}
            >
              <span
                className={`material-symbols-outlined text-3xl mb-4 block ${
                  i === 1 ? "text-oak" : "text-secondary"
                }`}
              >
                {item.icon}
              </span>
              <h3 className="font-headline-sm text-headline-sm mb-3">{item.title}</h3>
              <p className={`text-body-md ${i === 1 ? "text-surface-dim" : "text-on-surface-variant"}`}>
                {item.body}
              </p>
              {i === 1 && (
                <div className="mt-6 pt-6 border-t border-oak/20 space-y-2">
                  {["Vetted Professionals", "Transparent Pricing", "Pay via M-Pesa"].map((tag) => (
                    <div key={tag} className="flex items-center gap-2 text-label-md font-label-md">
                      <span className="material-symbols-outlined text-mpesa-green text-base">check_circle</span>
                      {tag}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="px-margin-mobile md:px-margin-desktop pb-20 max-w-container-max mx-auto">
        <div className="bg-surface-container-lowest border-l-4 border-mpesa-green rounded-r-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-mpesa-green text-2xl">smartphone</span>
            <div>
              <h3 className="font-headline-sm text-headline-sm mb-1">Secure Payments with M-Pesa</h3>
              <p className="text-body-md text-on-surface-variant">
                Seamless, high-trust transactions. We offer direct Lipa na M-Pesa options for all deposits and project balances.
              </p>
            </div>
          </div>
          <Link
            href="/payments"
            className="bg-mpesa-green text-white px-6 py-3 rounded-lg font-label-md text-label-md flex items-center gap-2 flex-shrink-0 hover:opacity-90 transition-all"
          >
            <span className="material-symbols-outlined text-base">smartphone</span>
            View Payment Steps
          </Link>
        </div>
      </section>

      <section className="py-20 bg-surface-container-low">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-10">
          <div className="flex justify-between items-end">
            <div>
              <span className="font-label-md text-label-md text-secondary tracking-widest mb-2 block">
                CRAFTED TO ORDER
              </span>
              <h2 className="font-headline-md text-headline-md text-primary">Featured Woodwork</h2>
            </div>
            <Link href="/shop" className="font-label-md text-label-md text-secondary hover:underline">
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
          className="px-margin-mobile md:px-margin-desktop"
        >
          {PRODUCTS.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="relative rounded-xl overflow-hidden group shadow-xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[340px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute top-4 left-4">
                  <h3 className="text-white font-bold text-lg">{product.name}</h3>
                </div>
                <div className="absolute top-4 right-4 bg-secondary text-white px-3 py-1 rounded-full font-semibold text-sm flex flex-col items-end leading-tight">
                  <span>KSh {product.price.toLocaleString()}</span>
                  <span className="text-[10px] font-normal opacity-80">
                    approx ${Math.round(product.price / USD_KES_RATE).toLocaleString()}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm p-3 rounded-xl w-[190px]">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-oak text-sm">*****</div>
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
                    className="bg-secondary text-white px-3 py-2 rounded w-full font-semibold text-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {reviews.length > 0 && (
        <section className="py-20">
          <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-10 gap-6">
              <div>
                <span className="font-label-md text-label-md text-secondary mb-2 block tracking-widest">
                  CLIENT TESTIMONIALS
                </span>
                <h2 className="font-headline-md text-headline-md text-primary">What Our Clients Say</h2>
              </div>
              <Link href="/reviews" className="font-label-md text-label-md text-secondary hover:underline flex items-center gap-2">
                VIEW ALL REVIEWS
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {reviews.map((review) => (
                <div key={review.id} className="tactile-card rounded-xl p-6">
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill={star <= review.rating ? "#D9A05B" : "none"}
                        stroke="#D9A05B"
                        strokeWidth="2"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <h3 className="font-headline-sm text-headline-sm mb-3">{review.title}</h3>
                  <p className="text-body-md text-on-surface-variant leading-relaxed mb-6">{review.body}</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-walnut/10">
                    <div className="w-8 h-8 bg-secondary/10 border border-secondary/30 rounded-full flex items-center justify-center">
                      <span className="text-secondary text-sm font-bold">{review.authorName.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                      <p className="text-body-md font-semibold">{review.authorName}</p>
                      {review.service && <p className="text-caption text-on-surface-variant capitalize">{review.service}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </main>
  );
}