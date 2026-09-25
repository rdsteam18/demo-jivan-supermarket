import Link from "next/link";
import { ArrowRight, Flame, Zap } from "lucide-react";
import HeroCarousel from "@/components/home/HeroCarousel";
import TrustBar from "@/components/home/TrustBar";
import CategoriesSection from "@/components/home/CategoriesSection";
import StoreShowcase from "@/components/home/StoreShowcase";
import ProductCard from "@/components/products/ProductCard";
import productsData from "@/data/products.json";
import { Product } from "@/types";

export default function HomePage() {
  const allProducts: Product[] = productsData as Product[];

  // Filter 1: Today's Deals (products with notable discounts)
  const todaysDeals = allProducts.filter((p) =>
    p.variants.some((v) => v.mrp > v.price)
  ).slice(0, 4);

  // Filter 2: Daily Kitchen Essentials (Atta, Rice, Milk, Oil)
  const staples = allProducts.filter((p) =>
    p.category === "Atta, Rice & Dals" || p.category === "Dairy & Breakfast"
  ).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6 sm:space-y-8 pb-20 md:pb-8">
      {/* 1. Hero Promo Carousel */}
      <HeroCarousel />
      {/* 2. Micro Trust Strip */}
      <TrustBar />

      {/* 3. Horizontal Categories Rail */}
      <CategoriesSection />

      {/* 4. "Today's Deals" Section with Red Discount Tags (Blinkit style) */}
      <section className="pt-1">
        <div className="flex items-center justify-between mb-3 px-0.5">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="p-1 rounded-md bg-rose-100 text-[#E11D48]">
                <Flame className="w-4 h-4 fill-[#E11D48]" />
              </span>
              <h2 className="text-base sm:text-xl font-black text-[#1A1A1A] tracking-tight">
                Today&apos;s Best Deals
              </h2>
              <span className="text-[10px] sm:text-xs font-black bg-[#E11D48] text-white px-2 py-0.5 rounded-full shadow-2xs">
                UP TO 25% OFF
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
              Limited-time discounts on everyday groceries in New Maninagar
            </p>
          </div>

          <Link
            href="/products"
            className="text-xs font-bold text-[#E11D48] hover:text-[#BE123C] flex items-center gap-1 group"
          >
            <span>See All Deals</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {todaysDeals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Daily Essentials & Dairy Section */}
      <section className="pt-1">
        <div className="flex items-center justify-between mb-3 px-0.5">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="p-1 rounded-md bg-green-100 text-[#16A34A]">
                <Zap className="w-4 h-4 fill-[#16A34A]" />
              </span>
              <h2 className="text-base sm:text-xl font-black text-[#1A1A1A] tracking-tight">
                Fresh Dairy &amp; Daily Staples
              </h2>
              <span className="text-[10px] sm:text-xs font-black bg-[#16A34A] text-white px-2 py-0.5 rounded-full shadow-2xs">
                ⚡ 12 MINS
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
              Directly stocked from Amul, Fortune, and Aashirvaad
            </p>
          </div>

          <Link
            href="/products"
            className="text-xs font-bold text-[#16A34A] hover:text-[#15803D] flex items-center gap-1 group"
          >
            <span>View All ({allProducts.length})</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {staples.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Verified Local Store Showcase */}
      <StoreShowcase />
    </div>
  );
}
