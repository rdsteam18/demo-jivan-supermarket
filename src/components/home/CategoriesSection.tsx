import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import categoriesData from "@/data/categories.json";

export default function CategoriesSection() {
  return (
    <section className="py-2">
      <div className="flex items-center justify-between mb-3 px-0.5">
        <div>
          <div className="flex items-center gap-1.5">
            <h2 className="text-base sm:text-lg font-black text-[#1A1A1A] tracking-tight">
              Explore Categories
            </h2>
            <span className="text-[10px] font-black bg-green-100 text-[#16A34A] px-2 py-0.5 rounded-full">
              {categoriesData.length} Aisles
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-gray-500">
            Fresh supplies stocked daily at Jivan Supermarket
          </p>
        </div>
        <Link
          href="/products"
          className="text-xs font-bold text-[#16A34A] hover:text-[#15803D] flex items-center gap-1 group"
        >
          <span>See All</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Swipeable Category Rail */}
      <div className="flex items-center gap-2.5 sm:gap-3.5 overflow-x-auto pb-2 scrollbar-none snap-x -mx-1 px-1">
        {categoriesData.map((cat) => (
          <Link
            key={cat.id}
            href={`/products?category=${encodeURIComponent(cat.name)}`}
            className="flex-shrink-0 flex flex-col items-center text-center group snap-start cursor-pointer w-[76px] sm:w-[94px]"
          >
            {/* Soft-tinted card with green hover border */}
            <div className="w-[72px] h-[72px] sm:w-[88px] sm:h-[88px] rounded-xl bg-gray-50 hover:bg-white border border-gray-200 p-2 flex items-center justify-center transition-all duration-200 group-hover:border-[#16A34A] shadow-2xs group-hover:shadow-sm">
              <div className="relative w-full h-full rounded-lg overflow-hidden flex items-center justify-center">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 72px, 88px"
                  className="object-contain p-1 group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Title */}
            <span className="text-[11px] font-bold text-[#1A1A1A] mt-1.5 line-clamp-1 group-hover:text-[#16A34A] transition-colors">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
