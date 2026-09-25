"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Search, ShoppingBag, MapPin, ChevronDown, Mic, Zap, User } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import shopData from "@/data/shop.json";
import { useIsMounted } from "@/hooks/useIsMounted";

const searchPlaceholders = [
  "Search 'Amul Taaza Milk'...",
  "Search 'Fortune Sunflower Oil'...",
  "Search 'Aashirvaad Sharbati Atta'...",
  "Search 'Wagh Bakri Chai'...",
  "Search 'Tata Salt'...",
  "Search 'Haldiram Aloo Bhujia'...",
];

export default function Header() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const mounted = useIsMounted();
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const totalItems = useCartStore((state) => state.totalItems());
  const grandTotal = useCartStore((state) => state.total());

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % searchPlaceholders.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      router.push("/products");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 transition-all">
      {/* Top Banner: Blinkit / BigBasket Quick-Commerce Notice */}
      <div className="bg-[#16A34A] text-white text-[11px] sm:text-xs py-1.5 px-3 text-center font-medium flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1 bg-[#E11D48] text-white font-black px-2 py-0.5 rounded-full text-[10px] tracking-wide shadow-xs">
          <Zap className="w-3 h-3 fill-white" />
          12 MINS
        </span>
        <span className="truncate">
          Superfast Delivery in <strong>{shopData.area}</strong> • Free home delivery on orders over ₹200!
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-3 sm:gap-6">
          {/* Logo & Delivery ETA Chip */}
          <div className="flex items-center gap-3 sm:gap-5 flex-shrink-0">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#16A34A] to-[#15803D] text-white flex items-center justify-center font-black text-lg sm:text-xl shadow-xs group-hover:scale-105 transition-transform">
                <span>J</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-black text-base sm:text-lg text-gray-900 tracking-tight leading-none">
                    Jivan
                  </span>
                  <span className="font-black text-base sm:text-lg text-[#16A34A] tracking-tight leading-none">
                    Supermarket
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-[10px] text-gray-500 font-semibold">
                    Online Grocery
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[#16A34A]" />
                  <span className="text-[10px] text-[#16A34A] font-bold">
                    12 Mins Delivery
                  </span>
                </div>
              </div>
            </Link>

            {/* Delivery in 12 mins Chip (BigBasket / Blinkit signature layout) */}
            <div className="hidden lg:flex items-center gap-2 text-xs bg-gray-50 hover:bg-gray-100/80 border border-gray-200 px-3 py-1.5 rounded-xl cursor-pointer transition">
              <div className="w-2 h-2 rounded-full bg-[#16A34A] animate-ping" />
              <MapPin className="w-3.5 h-3.5 text-[#16A34A] flex-shrink-0" />
              <div className="flex flex-col text-left leading-tight">
                <div className="flex items-center gap-1">
                  <strong className="text-gray-900 text-[11px]">Delivery in 12 mins</strong>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </div>
                <span className="text-[10px] text-gray-500 truncate max-w-[140px]">
                  {shopData.area}, Ahmedabad
                </span>
              </div>
            </div>
          </div>

          {/* Prominent Search Bar (Desktop) */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-lg relative group"
          >
            <div className="w-full relative flex items-center bg-gray-50 hover:bg-gray-100 border border-gray-200 focus-within:border-[#16A34A] focus-within:bg-white focus-within:ring-3 focus-within:ring-green-500/10 rounded-xl transition-all">
              <Search className="w-4 h-4 text-gray-400 ml-3.5 flex-shrink-0 group-focus-within:text-[#16A34A] transition-colors" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={searchPlaceholders[placeholderIndex]}
                className="w-full pl-3 pr-10 py-2.5 bg-transparent text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
              />
              <button
                type="button"
                className="mr-3 text-gray-400 hover:text-[#16A34A] transition"
                title="Voice Search"
              >
                <Mic className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Right Actions: Account + Red/Green Cart Button */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Account Icon */}
            <Link
              href="/cart"
              className="hidden sm:flex items-center gap-1.5 text-xs text-gray-700 font-bold px-2.5 py-1.5 rounded-xl hover:bg-gray-100 transition"
            >
              <div className="w-7 h-7 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600">
                <User className="w-4 h-4" />
              </div>
              <span className="hidden lg:inline text-[11px]">Account</span>
            </Link>

            {/* Cart Pill with Red Counter Badge */}
            <Link
              href="/cart"
              className="flex items-center gap-2 bg-[#16A34A] hover:bg-[#15803D] active:scale-95 text-white pl-3.5 pr-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all shadow-sm"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-white" />
                {mounted && totalItems > 0 && (
                  <span className="absolute -top-2 -right-2.5 w-4 h-4 bg-[#E11D48] text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-xs">
                    {totalItems}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold">Cart</span>
                {mounted && totalItems > 0 && (
                  <span className="text-white font-black pl-1 border-l border-green-400/50">
                    ₹{grandTotal}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <form onSubmit={handleSearch} className="md:hidden pb-3">
          <div className="w-full relative flex items-center bg-gray-50 border border-gray-200 focus-within:border-[#16A34A] focus-within:bg-white rounded-xl transition-all">
            <Search className="w-4 h-4 text-gray-400 ml-3 flex-shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={searchPlaceholders[placeholderIndex]}
              className="w-full pl-2.5 pr-8 py-2 bg-transparent text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none"
            />
            <button
              type="button"
              className="mr-3 text-gray-400 hover:text-[#16A34A]"
            >
              <Mic className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </header>
  );
}
