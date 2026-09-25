"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, Zap, Flame } from "lucide-react";

interface Slide {
  id: string;
  badge: string;
  badgeIcon: "flame" | "zap" | "sparkles";
  tag: string;
  title: string;
  highlight: string;
  description: string;
  cta: string;
  link: string;
  bgGradient: string;
  accentColor: string;
  productImg: string;
  productName: string;
}

const slides: Slide[] = [
  {
    id: "slide-1",
    badge: "Flat 25% Off Daily Staples",
    badgeIcon: "flame",
    tag: "TODAY'S SPECIAL DEALS",
    title: "Chakki Atta, Pure Oils",
    highlight: "& Daily Basmati Rice",
    description: "Premium staples from trusted Indian brands delivered in 12 mins.",
    cta: "Shop Deals Now",
    link: "/products?category=Atta%2C+Rice+%26+Dals",
    bgGradient: "from-rose-50 via-red-50/40 to-green-50/30 border-rose-100",
    accentColor: "bg-[#E11D48] hover:bg-[#BE123C]",
    productImg: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1960-1960,pr-true,f-auto,q-40,dpr-2/cms/product_variant/4a246a4b-c574-4f4f-8b96-4996dbba29d6/Fortune-Chakki-Fresh-Atta.jpeg",
    productName: "Fortune Chakki Fresh Atta",
  },
  {
    id: "slide-2",
    badge: "Morning Fresh Dairy • 12 Mins",
    badgeIcon: "zap",
    tag: "FRESH FROM AMUL",
    title: "Fresh Amul Taaza Milk",
    highlight: "& Creamy Curd",
    description: "Chilled dairy packs delivered right to your doorstep for your morning tea.",
    cta: "Order Fresh Dairy",
    link: "/products?category=Dairy+%26+Breakfast",
    bgGradient: "from-green-50 via-emerald-50/50 to-white border-green-100",
    accentColor: "bg-[#16A34A] hover:bg-[#15803D]",
    productImg: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/1c44f728-7e7e-4f59-9248-5569a3b36672/Amul-Gold-Full-Cream-Fresh-Milk-Pouch.jpeg",
    productName: "Amul Fresh Milk",
  },
  {
    id: "slide-3",
    badge: "Teatime Munchies Combo",
    badgeIcon: "sparkles",
    tag: "AHMEDABAD FAVORITES",
    title: "Wagh Bakri Kadak Tea",
    highlight: "& Haldiram Bhujia",
    description: "Crispy tea-time snacks and aromatic leaf tea for evening refreshment.",
    cta: "Explore Munchies",
    link: "/products?category=Snacks+%26+Munchies",
    bgGradient: "from-amber-50 via-orange-50/30 to-rose-50/40 border-amber-100",
    accentColor: "bg-[#E11D48] hover:bg-[#BE123C]",
    productImg: "https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/ed01b616-3361-467d-bcbf-8f35b3ebfd3c/Haldiram-s-Aloo-Bhujia-Sev-Crunchy-Savory-Snack.jpeg",
    productName: "Haldiram Bhujia",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-xs border transition-all duration-500">
      <div className="relative h-[220px] sm:h-[280px] md:h-[320px] w-full">
        {slides.map((s, index) => {
          const isActive = index === current;
          return (
            <div
              key={s.id}
              className={`absolute inset-0 bg-gradient-to-r ${s.bgGradient} transition-opacity duration-700 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <div className="h-full max-w-7xl mx-auto px-4 sm:px-10 lg:px-14 flex items-center justify-between">
                {/* Left Typography & CTA */}
                <div className="max-w-[62%] sm:max-w-[58%] md:max-w-xl z-20 py-3 sm:py-6">
                  {/* Red/Green Pill Badge */}
                  <div className="inline-flex items-center gap-1.5 bg-white text-[#E11D48] border border-rose-200 text-[10px] sm:text-xs font-black px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-2xs mb-1.5 sm:mb-2">
                    {s.badgeIcon === "flame" && <Flame className="w-3 h-3 text-[#E11D48] fill-[#E11D48]" />}
                    {s.badgeIcon === "zap" && <Zap className="w-3 h-3 text-[#16A34A] fill-[#16A34A]" />}
                    {s.badgeIcon === "sparkles" && <Sparkles className="w-3 h-3 text-amber-500" />}
                    <span>{s.badge}</span>
                  </div>

                  <span className="block text-[9px] sm:text-[11px] font-black text-[#16A34A] tracking-wider uppercase mb-0.5">
                    {s.tag}
                  </span>

                  <h2 className="text-sm sm:text-2xl md:text-3xl font-black text-[#1A1A1A] leading-tight tracking-tight mb-1 sm:mb-2">
                    {s.title}{" "}
                    <span className="text-[#16A34A] block sm:inline font-black">
                      {s.highlight}
                    </span>
                  </h2>

                  <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 line-clamp-1 sm:line-clamp-2 mb-2.5 sm:mb-4 max-w-md">
                    {s.description}
                  </p>

                  <Link
                    href={s.link}
                    className={`inline-flex items-center gap-1.5 ${s.accentColor} active:scale-95 text-white text-[11px] sm:text-xs md:text-sm font-black px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl shadow-xs transition-all`}
                  >
                    <span>{s.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </Link>
                </div>

                {/* Right Realistic Product Render */}
                <div className="relative w-[36%] sm:w-[38%] md:w-[35%] h-full flex items-center justify-center p-2 sm:p-4">
                  <div className="relative w-32 sm:w-52 md:w-60 h-32 sm:h-52 md:h-60 rounded-xl overflow-hidden bg-white/80 p-2 shadow-md border border-white">
                    <Image
                      src={s.productImg}
                      alt={s.productName}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 640px) 130px, 240px"
                      className="object-cover rounded-lg"
                    />
                    <div className="absolute bottom-1.5 right-1.5 bg-[#E11D48] text-white text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded shadow-xs">
                      Deals
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
        aria-label="Previous Slide"
        className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-800 items-center justify-center shadow-md transition hover:scale-105"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
        aria-label="Next Slide"
        className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-800 items-center justify-center shadow-md transition hover:scale-105"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              idx === current ? "w-5 bg-[#16A34A]" : "w-1.5 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
