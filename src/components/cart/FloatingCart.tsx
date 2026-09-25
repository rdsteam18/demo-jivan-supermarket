"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingBag, ArrowRight, Zap } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export default function FloatingCart() {
  const [mounted, setMounted] = useState(false);
  const totalItems = useCartStore((state) => state.totalItems());
  const grandTotal = useCartStore((state) => state.total());

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || totalItems === 0) return null;

  return (
    <aside
      aria-label="Floating cart summary"
      className="fixed bottom-4 left-3 right-3 z-50 md:hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-3"
    >
      <Link
        href="/cart"
        className="flex items-center justify-between bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white px-4 py-3 rounded-2xl shadow-xl shadow-emerald-950/30 border border-emerald-500/40 backdrop-blur-md active:scale-[0.98] transition-transform"
      >
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-600/40 flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-amber-300" />
            <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-amber-400 text-gray-950 text-[10px] font-black flex items-center justify-center shadow-xs">
              {totalItems}
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1 text-[10px] text-emerald-200 font-semibold leading-tight">
              <Zap className="w-3 h-3 text-amber-300 fill-amber-300" />
              <span>20 Min Delivery</span>
            </div>
            <div className="text-base font-black text-white leading-tight">
              ₹{grandTotal}{" "}
              <span className="text-[11px] font-medium text-emerald-300">
                ({totalItems} {totalItems === 1 ? "item" : "items"})
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-black bg-white text-emerald-950 px-3.5 py-2 rounded-xl shadow-xs hover:bg-emerald-50 transition">
          <span>View Cart</span>
          <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
        </div>
      </Link>
    </aside>
  );
}
