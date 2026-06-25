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
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCskyV7BXgGvhV0SK0WdqRBihOtmDa-5mIZE8sO473g6uk7RVOkFZSGs2XSNfNppVIFRhfZzzbPCyQW_Zp6pXmDNwYtMTH_5jMIe-drRIWWNowg_oEfMokYlSjM8hYjyjdGtPLhlvZAuWUsSyx-mC43AbRJXOXkYJzGQqtSB1G7PXdbxSns4tdQWpVTveM0-C3_sul9iEU-1EQ1598uVMp1xwa28LYqm9WnzEbS4NylbWDP4cE4deCaTKf1FjwJx2at-lcAk6gOBjY";

const CATEGORIES = [
  { title: "Gates", href: "/projects?category=gates", img: "/categories/gates.jpg" },
  { title: "Railings & Balustrades", href: "/projects?category=railings", img: "/categories/railings.jpg" },
  { title: "Staircases", href: "/projects?category=staircases", img: "/categories/staircases.jpg" },
  { title: "Custom Furniture", href: "/projects?category=furniture", img: "/categories/furniture.jpg" },
];

const WHY_US = [
  { icon: "precision_manufacturing", title: "Precision Welding", body: "Clean, industrial-strength joints that define structural integrity." },
  { icon: "palette", title: "Finish Options", body: "Powder Coating, Raw Steel, or Galvanized for maximum weather resistance." },
  { icon: "location_on", title: "Nairobi-Based", body: "Locally forged and delivered with pride across the capital region." },
  { icon: "straighten", title: "On-site Measurement", body: "We visit your site to ensure a perfect, bespoke fit for every installation." },
];

const PRODUCTS = [
  { id: 1, name: "Custom Gate", image: "/products/gate-placeholder.jpg", price: 245000, reviews: 12 },
  { id: 2, name: "Steel Railing", image: "/products/railing-placeholder.jpg", price: 85000, reviews: 9 },
  { id: 3, name: "Staircase Spindle Set", image: "/products/staircase-placeholder.jpg", price: 165000, reviews: 6 },
  { id: 4, name: "Steel Dining Table", image: "/products/dining-table-placeholder.jpg", price: 92000, reviews: 14 },
  { id: 5, name: "Balustrade Panel", image: "/products/balustrade-placeholder.jpg", price: 54000, reviews: 5 },
  { id: 6, name: "Steel Bar Stool", image: "/products/stool-placeholder.jpg", price: 18500, reviews: 21 },
  { id: 7, name: "Console Table", image: "/products/console-placeholder.jpg", price: 47000, reviews: 8 },
  { id: 8, name: "Security Gate Panel", image: "/products/security-gate-placeholder.jpg", price: 198000, reviews: 4 },
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
      <section className="relative h-[90vh] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(" + HERO_IMAGE + ")" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 h-full flex flex-col justify-center px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <span className="font-label-caps text-label-caps text-primary tracking-[0.2em] uppercase mb-4 inline-block">
            Forged in Nairobi
          </span>
          <h1 className="font-display-lg text-display-lg max-w-2xl mb-6">
            Bespoke Steel Fabrication built for the bold.
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-xl mb-10">
            Custom gates, railings, and furniture handcrafted in Nairobi. Precision engineering meets human artistry.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/booking"
              className="bg-secondary-container text-white px-10 py-4 text-body-sm font-semibold rounded-lg hover:opacity-90 transition-all flex items-center gap-2"
            >
              Book a Consultation
              <span className="material-symbols-outlined text-base">calendar_today</span>
            </Link>
            <Link
              href="/projects"
              className="border border-primary text-primary px-10 py-4 text-body-sm font-semibold rounded-lg hover:bg-primary/10 transition-all flex items-center gap-2"
            >
              View Our Work
              <span className="material-symbols-outlined text-base">visibility</span>
            </Link>
            <Link
              href="/ai-artisan"
              className="border border-outline-variant text-on-surface px-10 py-4 text-body-sm font-semibold rounded-lg hover:bg-surface-container-high transition-all flex items-center gap-2"
            >
              Talk to AI Artisan
              <span className="material-symbols-outlined text-base">auto_awesome</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-margin-mobile md:px-margin-desktop py-16 max-w-container-max mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="category-card relative h-64 rounded-xl overflow-hidden group bg-surface-container"
            >
              <img
                src={cat.img}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent flex flex-col justify-end p-6">
                <h3 className="font-headline-lg text-headline-lg-mobile mb-2">{cat.title}</h3>
                <span className="text-primary font-label-caps text-label-caps flex items-center gap-2 group-hover:gap-4 transition-all">
                  VIEW PROJECTS <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-margin-mobile md:px-margin-desktop py-24 bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto text-center mb-16">
          <span className="font-label-caps text-label-caps text-primary tracking-[0.2em] uppercase">Built to Last</span>
          <h2 className="font-display-lg text-display-lg mt-4">Why Black Steel Crew?</h2>
        </div>
        <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {WHY_US.map((item) => (
            <div key={item.title} className="glass-panel p-8 rounded-xl text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-primary text-4xl">{item.icon}</span>
              </div>
              <h4 className="font-title-md text-title-md mb-3">{item.title}</h4>
              <p className="text-body-sm text-on-surface-variant">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-margin-mobile md:px-margin-desktop py-20">
        <div className="max-w-4xl mx-auto glass-panel rounded-2xl overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/3 bg-primary-container p-8 flex flex-col justify-center items-start">
            <div className="w-12 h-12 bg-on-primary-container rounded-lg flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-background text-2xl">auto_awesome</span>
            </div>
            <h3 className="font-headline-lg text-headline-lg-mobile text-on-primary-container mb-4">AI Artisan</h3>
            <p className="text-on-primary-container/80 text-body-sm font-label-caps">
              Instant structural estimates and design suggestions.
            </p>
          </div>
          <div className="md:w-2/3 p-8 flex flex-col gap-4">
            <div className="self-start glass-panel rounded-lg p-4 border-l-4 border-primary">
              <p className="text-body-sm">
                I am analyzing your request for a cantilevered gate. Based on Nairobi wind loads, I recommend a 150mm structural beam...
              </p>
            </div>
            <Link
              href="/ai-artisan"
              className="relative block w-full bg-surface-container-high border border-outline-variant rounded-lg py-4 px-6 text-body-sm text-on-surface-variant hover:border-primary transition-colors"
            >
              Describe your project vision...
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-primary">send</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface-container-lowest">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-10">
          <div className="flex justify-between items-end">
            <div>
              <span className="font-label-caps text-label-caps text-on-surface-variant tracking-widest mb-4 block">
                FABRICATION ESSENTIALS
              </span>
              <h2 className="font-headline-lg text-headline-lg">Featured Steelwork</h2>
            </div>
            <Link href="/shop" className="font-label-caps text-label-caps text-primary hover:underline">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <h3 className="text-white font-bold text-lg">{product.name}</h3>
                </div>
                <div className="absolute top-4 right-4 bg-secondary-container text-white px-3 py-1 rounded-full font-semibold text-sm flex flex-col items-end leading-tight">
                  <span>KSh {product.price.toLocaleString()}</span>
                  <span className="text-[10px] font-normal opacity-80">
                    approx ${Math.round(product.price / USD_KES_RATE).toLocaleString()}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm p-3 rounded-xl w-[190px]">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-primary text-sm">*****</div>
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
                    className="bg-secondary-container text-white px-3 py-2 rounded w-full font-semibold text-sm"
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
        <section className="py-24">
          <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-6">
              <div>
                <span className="font-label-caps text-label-caps text-on-surface-variant mb-4 block tracking-widest">
                  CLIENT TESTIMONIALS
                </span>
                <h2 className="font-headline-lg text-headline-lg">What Our Clients Say</h2>
              </div>
              <Link href="/reviews" className="font-label-caps text-label-caps text-primary hover:underline flex items-center gap-2">
                VIEW ALL REVIEWS
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {reviews.map((review) => (
                <div key={review.id} className="glass-panel rounded-xl p-6 hover:border-primary/40 transition-colors">
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill={star <= review.rating ? "#00daf8" : "none"}
                        stroke="#00daf8"
                        strokeWidth="2"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <h3 className="font-title-md text-title-md mb-3">{review.title}</h3>
                  <p className="text-body-sm text-on-surface-variant leading-relaxed mb-6">{review.body}</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/30">
                    <div className="w-8 h-8 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center">
                      <span className="text-primary text-sm font-bold">{review.authorName.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                      <p className="text-body-sm font-semibold">{review.authorName}</p>
                      {review.service && <p className="text-label-caps text-on-surface-variant capitalize">{review.service}</p>}
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