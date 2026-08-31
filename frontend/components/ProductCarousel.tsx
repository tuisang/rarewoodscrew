"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { useCart } from "@/lib/CartContext";

import "swiper/css";
import "swiper/css/navigation";

const products = [
   {
    id: 1,
    name: "Mahogany Bed Frame",
    image: "/images/mahogany-bed.jpg",
    price: 85000,
    reviews: 14,
  },
  {
    id: 2,
    name: "Live-Edge Log Table",
    image: "/images/log-table.jpg",
    price: 62000,
    reviews: 19,
  },
  {
    id: 3,
    name: "Mahogany TV Stand",
    image: "/images/mahogany-tv-stand.jpg",
    price: 28500,
    reviews: 22,
  },
  {
    id: 4,
    name: "Custom Storage Shelving",
    image: "/images/shelves.jpg",
    price: 53000,
    reviews: 8,
  },
  {
    id: 5,
    name: "Shoe & Bag Rack",
    image: "/images/shoe-and-bag-rack.jpg",
    price: 15000,
    reviews: 11,
  },
  {
    id: 6,
    name: "Round Outdoor Table",
    image: "/images/round-table.jpg",
    price: 22000,
    reviews: 9,
  },
  {
    id: 7,
    name: "School Desks (Bulk Order)",
    image: "/images/school-tables.jpg",
    price: 8500,
    reviews: 6,
  },
  {
    id: 8,
    name: "School Dining Tables",
    image: "/images/school-dining-tables.jpg",
    price: 32000,
    reviews: 5,
  },
  {
    id: 9,
    name: "School Chairs (Set)",
    image: "/images/school-chairs.jpg",
    price: 4500,
    reviews: 13,
  },
  {
    id: 10,
    name: "Lab Stools (Set)",
    image: "/images/lab-chairs.jpg",
    price: 6500,
    reviews: 7,
  },
];

export default function ProductCarousel() {
  const { cart = [], addToCart } = useCart();
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const updateQuantity = (id: number, change: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + change),
    }));
  };



  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-white">
            Shop Our Furniture
          </h2>

          <div className="bg-primary text-black px-4 py-2 rounded-lg font-bold">
            Cart: {cart.length}
          </div>
        </div>

        <Swiper
          modules={[Autoplay, Navigation]}
          loop={true}
          navigation
          speed={1500}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          spaceBetween={20}
          slidesPerView={5}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 5,
            },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="relative rounded-xl overflow-hidden group shadow-xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[340px] object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                <div className="absolute top-4 left-4">
                  <h3 className="text-white font-bold text-lg">
                    {product.name}
                  </h3>
                </div>

                <div className="absolute top-4 right-4 bg-primary text-black px-3 py-1 rounded-full font-semibold">
                  KSh {product.price.toLocaleString()}
                </div>

                <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm p-3 rounded-xl w-[190px]">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-yellow-400">
                      ★★★★★
                    </div>

                    <span className="text-xs text-white">
                      ({product.reviews})
                    </span>
                  </div>

                  <div className="flex items-center justify-center gap-2 mb-3">
                    <button
                      onClick={() =>
                        updateQuantity(product.id, -1)
                      }
                      className="bg-white text-black w-8 h-8 rounded font-bold"
                    >
                      -
                    </button>

                    <span className="text-white font-bold">
                      {quantities[product.id] || 1}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(product.id, 1)
                      }
                      className="bg-white text-black w-8 h-8 rounded font-bold"
                    >
                      +
                    </button>
                  </div>

                  <button
  onClick={() =>
    addToCart({
      ...product,
      quantity: quantities[product.id] || 1,
    })
  }
  className="bg-primary text-on-primary px-3 py-2 rounded w-full font-semibold"
>
  Add to Cart
</button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}