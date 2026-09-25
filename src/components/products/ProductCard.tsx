"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus, Star, Heart, Zap } from "lucide-react";
import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";

export default function ProductCard({ product }: { product: Product }) {
  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variants[0]?.id || ""
  );
  const [isWishlisted, setIsWishlisted] = useState(false);

  const selectedVariant =
    product.variants.find((v) => v.id === selectedVariantId) ||
    product.variants[0];

  const addItem = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const currentQuantity = useCartStore((state) =>
    state.getItemQuantity(product.id, selectedVariant.id)
  );

  const discountPercent = Math.round(
    ((selectedVariant.mrp - selectedVariant.price) / selectedVariant.mrp) * 100
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200/90 p-2.5 sm:p-3 flex flex-col justify-between hover:shadow-md hover:border-[#16A34A]/50 transition-all duration-200 relative group">
      {/* Top Floating Badges: Red Discount Badge on Left, Wishlist on Right */}
      <div className="flex items-center justify-between z-10 mb-1">
        {discountPercent > 0 ? (
          <span className="bg-[#E11D48] text-white text-[9px] sm:text-[10px] font-black px-1.5 py-0.5 rounded-md shadow-2xs">
            {discountPercent}% OFF
          </span>
        ) : (
          <span className="text-[9px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-md">
            Best Price
          </span>
        )}

        <button
          type="button"
          onClick={() => setIsWishlisted(!isWishlisted)}
          aria-label="Add to wishlist"
          className="p-1 rounded-full text-gray-400 hover:text-[#E11D48] hover:bg-red-50 active:scale-90 transition"
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${
              isWishlisted ? "fill-[#E11D48] text-[#E11D48]" : ""
            }`}
          />
        </button>
      </div>

      {/* Product Image Area with Delivery ETA Badge */}
      <div className="relative w-full aspect-square rounded-lg bg-[#FAFAFA] p-2 mb-2 flex items-center justify-center overflow-hidden border border-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 20vw"
          className="object-contain p-1.5 group-hover:scale-105 transition-transform duration-300"
        />

        {/* Micro Delivery ETA Tag (Blinkit style) */}
        <div className="absolute bottom-1.5 left-1.5 bg-white/95 text-gray-800 border border-gray-200 text-[9px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5 shadow-2xs">
          <Zap className="w-2.5 h-2.5 text-[#16A34A] fill-[#16A34A]" />
          <span>12 MINS</span>
        </div>
      </div>

      {/* Brand & Rating Meta */}
      <div className="flex items-center justify-between text-[10px] text-gray-500 mb-0.5">
        <span className="font-bold text-gray-500 uppercase tracking-wider truncate max-w-[65%]">
          {product.brand}
        </span>
        <span className="inline-flex items-center text-amber-700 font-extrabold text-[10px]">
          <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400 mr-0.5" />
          {product.rating}
        </span>
      </div>

      {/* Product Title (2-line clamp) */}
      <h3 className="text-xs sm:text-[13px] font-bold text-[#1A1A1A] line-clamp-2 min-h-[2.1rem] leading-snug mb-1.5">
        {product.name}
      </h3>

      {/* Segmented Variant Mini-Pills */}
      <div className="flex flex-wrap gap-1 mb-2">
        {product.variants.map((v) => {
          const isSelected = selectedVariantId === v.id;
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => setSelectedVariantId(v.id)}
              className={`text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded font-semibold transition-all ${
                isSelected
                  ? "bg-green-50 text-[#16A34A] border border-[#16A34A] font-bold shadow-2xs"
                  : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100"
              }`}
            >
              {v.label}
            </button>
          );
        })}
      </div>

      {/* Pricing & Add to Cart / Stepper */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-auto">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1">
            <span className="text-sm sm:text-base font-black text-[#1A1A1A] tracking-tight">
              ₹{selectedVariant.price}
            </span>
            {selectedVariant.mrp > selectedVariant.price && (
              <span className="text-[10px] sm:text-xs text-gray-400 line-through">
                ₹{selectedVariant.mrp}
              </span>
            )}
          </div>
        </div>

        {/* Add Button OR Counter Stepper */}
        {currentQuantity === 0 ? (
          <button
            type="button"
            onClick={() => addItem(product, selectedVariant)}
            className="flex items-center justify-center gap-1 bg-white hover:bg-red-50 text-[#E11D48] border-2 border-[#E11D48] font-black text-xs px-3 sm:px-3.5 py-1 rounded-lg transition-all duration-150 active:scale-95 shadow-2xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>ADD</span>
          </button>
        ) : (
          <div className="flex items-center bg-[#16A34A] text-white rounded-lg overflow-hidden shadow-xs border border-green-700">
            <button
              type="button"
              onClick={() => updateQuantity(product.id, selectedVariant.id, -1)}
              className="p-1 sm:p-1.5 hover:bg-[#15803D] active:scale-90 transition cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5 stroke-[3]" />
            </button>
            <span className="px-1.5 text-xs font-black min-w-[1.2rem] text-center select-none">
              {currentQuantity}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(product.id, selectedVariant.id, 1)}
              className="p-1 sm:p-1.5 hover:bg-[#15803D] active:scale-90 transition cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
