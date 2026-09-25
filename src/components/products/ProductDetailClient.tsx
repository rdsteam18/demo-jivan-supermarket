"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Share2,
  Heart,
  Star,
  Zap,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  MapPin,
  Plus,
  Minus,
  Check,
  ChevronRight,
  Package,
  Layers,
  ShoppingBag,
} from "lucide-react";
import { Product, ProductVariant } from "@/types";
import { useCartStore } from "@/store/cartStore";
import ProductCard from "./ProductCard";

interface ProductDetailClientProps {
  product: Product;
  allProducts: Product[];
}

export default function ProductDetailClient({
  product,
  allProducts,
}: ProductDetailClientProps) {
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    product.variants[0]?.id || ""
  );
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "overview" | "specs" | "reviews" | "delivery"
  >("overview");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const selectedVariant: ProductVariant =
    product.variants.find((v) => v.id === selectedVariantId) ||
    product.variants[0] || {
      id: "default",
      label: "Standard Pack",
      price: 0,
      mrp: 0,
    };

  // Cart operations
  const addItem = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const currentQuantity = useCartStore((state) =>
    state.getItemQuantity(product.id, selectedVariant.id)
  );

  // Discount calculation
  const discountPercent =
    selectedVariant.mrp > selectedVariant.price
      ? Math.round(
          ((selectedVariant.mrp - selectedVariant.price) /
            selectedVariant.mrp) *
            100
        )
      : 0;

  const savingsAmount =
    selectedVariant.mrp > selectedVariant.price
      ? selectedVariant.mrp - selectedVariant.price
      : 0;

  // Handle Share button
  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    }
  };

  // Related products from the same category
  const relatedProducts = useMemo(() => {
    const sameCategory = allProducts.filter(
      (p) => p.category === product.category && p.id !== product.id
    );
    if (sameCategory.length >= 4) return sameCategory.slice(0, 4);

    const otherProducts = allProducts.filter(
      (p) => p.id !== product.id && p.category !== product.category
    );
    return [...sameCategory, ...otherProducts].slice(0, 4);
  }, [allProducts, product]);

  // Contextual specifications based on product attributes
  const isDairy =
    product.category.toLowerCase().includes("dairy") ||
    product.category.toLowerCase().includes("milk");
  const isOilOrAtta =
    product.category.toLowerCase().includes("atta") ||
    product.category.toLowerCase().includes("oil") ||
    product.category.toLowerCase().includes("rice");

  const shelfLife = isDairy
    ? "2 to 3 days (Refrigerate at 4°C)"
    : isOilOrAtta
    ? "6 to 9 Months from packaging date"
    : "12 Months from packaging date";

  const storageInstruction = isDairy
    ? "Keep refrigerated at 4°C or below. Consume within 48 hours of opening."
    : "Store in a cool, clean, and dry place. Keep away from direct sunlight & moisture.";

  // High-resolution image views
  const galleryImages = [
    { label: "Main View", url: product.image },
    { label: "Pack Detail", url: product.image },
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 pb-24 md:pb-12 space-y-6 sm:space-y-8">
      {/* Toast Notification for Share / Copy */}
      {copiedToast && (
        <div className="fixed top-20 right-4 z-50 bg-[#16A34A] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Product link copied to clipboard!</span>
        </div>
      )}

      {/* Top Breadcrumbs & Back Navigation */}
      <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-3">
        <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-gray-500 overflow-x-auto no-scrollbar py-0.5">
          <Link
            href="/"
            className="hover:text-[#16A34A] font-semibold whitespace-nowrap"
          >
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400 flex-shrink-0" />
          <Link
            href={`/products?category=${encodeURIComponent(product.category)}`}
            className="hover:text-[#16A34A] font-semibold whitespace-nowrap"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400 flex-shrink-0" />
          <span className="text-gray-900 font-bold truncate max-w-[140px] sm:max-w-xs">
            {product.name}
          </span>
        </div>

        <Link
          href="/products"
          className="inline-flex items-center gap-1 text-xs font-bold text-[#16A34A] hover:text-[#15803D] bg-green-50 px-2.5 py-1 rounded-lg flex-shrink-0 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Back to Aisles</span>
        </Link>
      </div>

      {/* Main Product Showcase: 2 Columns on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
        {/* LEFT COLUMN: Gallery & Trust Highlights */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Image Frame with Floating Badges */}
          <div className="relative w-full aspect-square sm:aspect-[4/3] lg:aspect-square bg-gradient-to-b from-[#FBFBFA] to-[#F3F4F6] rounded-2xl border border-gray-200/90 p-4 sm:p-8 flex items-center justify-center overflow-hidden shadow-2xs group">
            {/* Top Badges */}
            <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
              <div className="flex items-center gap-1.5 flex-wrap">
                {discountPercent > 0 && (
                  <span className="bg-[#E11D48] text-white text-[11px] sm:text-xs font-black px-2.5 py-1 rounded-lg shadow-2xs">
                    {discountPercent}% OFF
                  </span>
                )}
                <span className="bg-white/90 backdrop-blur-xs text-gray-800 border border-gray-200 text-[10px] sm:text-[11px] font-black px-2 py-0.5 rounded-lg flex items-center gap-1 shadow-2xs">
                  <Zap className="w-3 h-3 text-[#16A34A] fill-[#16A34A]" />
                  12 MINS
                </span>
              </div>

              {/* Action Buttons: Wishlist & Share */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleShare}
                  aria-label="Share product"
                  className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-600 hover:text-gray-900 border border-gray-200 shadow-2xs flex items-center justify-center transition active:scale-95"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  aria-label="Wishlist product"
                  className="w-8 h-8 rounded-full bg-white/90 hover:bg-white border border-gray-200 shadow-2xs flex items-center justify-center transition active:scale-95 text-gray-400 hover:text-[#E11D48]"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      isWishlisted ? "fill-[#E11D48] text-[#E11D48]" : ""
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Product Hero Image */}
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={galleryImages[selectedImageIndex]?.url || product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 550px"
                className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Bottom Veg Symbol & Quality Assurance Tag */}
            <div className="absolute bottom-3.5 left-3.5 flex items-center gap-2">
              <div className="w-5 h-5 rounded border border-green-600 bg-white p-0.5 flex items-center justify-center shadow-2xs">
                <div className="w-2.5 h-2.5 rounded-full bg-green-600" />
              </div>
              <span className="text-[10px] font-bold text-gray-700 bg-white/95 px-2 py-0.5 rounded-md border border-gray-200 shadow-2xs">
                100% Vegetarian
              </span>
            </div>
          </div>

          {/* Interactive Image Gallery Thumbnails */}
          <div className="flex items-center gap-2.5">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImageIndex(idx)}
                className={`relative w-14 h-14 rounded-xl border p-1 bg-white transition-all cursor-pointer ${
                  selectedImageIndex === idx
                    ? "border-[#16A34A] ring-2 ring-green-600/20 shadow-xs scale-105"
                    : "border-gray-200 opacity-70 hover:opacity-100"
                }`}
                aria-label={`Select ${img.label}`}
              >
                <Image
                  src={img.url}
                  alt={`${product.name} - ${img.label}`}
                  fill
                  sizes="56px"
                  className="object-contain p-0.5"
                />
              </button>
            ))}
            <span className="text-[11px] text-gray-500 font-medium pl-1">
              Angle: <strong>{galleryImages[selectedImageIndex]?.label}</strong>
            </span>
          </div>

          {/* Quick Trust Badges Strip (Zepto / Blinkit style) */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-1">
            <div className="bg-green-50/70 border border-green-200/80 rounded-xl p-2.5 text-center flex flex-col items-center">
              <ShieldCheck className="w-4 h-4 text-[#16A34A] mb-1" />
              <span className="text-[10px] sm:text-[11px] font-bold text-gray-900 leading-tight">
                100% Genuine
              </span>
              <span className="text-[9px] text-gray-500">Direct Brand Stock</span>
            </div>

            <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-2.5 text-center flex flex-col items-center">
              <Truck className="w-4 h-4 text-blue-600 mb-1" />
              <span className="text-[10px] sm:text-[11px] font-bold text-gray-900 leading-tight">
                ⚡ 12-15 Mins
              </span>
              <span className="text-[9px] text-gray-500">New Maninagar</span>
            </div>

            <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-2.5 text-center flex flex-col items-center">
              <RotateCcw className="w-4 h-4 text-amber-600 mb-1" />
              <span className="text-[10px] sm:text-[11px] font-bold text-gray-900 leading-tight">
                Easy Returns
              </span>
              <span className="text-[9px] text-gray-500">At Doorstep</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Product Information, Variants & Cart Actions */}
        <div className="lg:col-span-6 space-y-5">
          {/* Brand & Category Strip */}
          <div className="flex items-center justify-between gap-2">
            <Link
              href={`/products?search=${encodeURIComponent(product.brand)}`}
              className="text-xs font-black tracking-wider uppercase text-[#16A34A] bg-green-50 px-2.5 py-1 rounded-md border border-green-200/80 hover:bg-green-100 transition"
            >
              {product.brand} Store
            </Link>

            {/* Rating Pill */}
            <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-black text-amber-900">
                {product.rating}
              </span>
              <span className="text-[10px] text-amber-700/80 font-bold border-l border-amber-200 pl-1.5">
                1.4k+ Reviews
              </span>
            </div>
          </div>

          {/* Product Name */}
          <div>
            <h1 className="text-lg sm:text-2xl lg:text-3xl font-black text-[#1A1A1A] tracking-tight leading-snug">
              {product.name}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1.5 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Price & Savings Display Box */}
          <div className="bg-gray-50/90 rounded-2xl p-4 border border-gray-200/80 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5">
                Special Supermarket Price
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-[#1A1A1A] tracking-tight">
                  ₹{selectedVariant.price}
                </span>
                {selectedVariant.mrp > selectedVariant.price && (
                  <span className="text-sm sm:text-base text-gray-400 line-through">
                    MRP ₹{selectedVariant.mrp}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-gray-500">
                (Inclusive of all taxes)
              </span>
            </div>

            {savingsAmount > 0 && (
              <div className="text-right">
                <span className="inline-block bg-[#16A34A] text-white text-[11px] sm:text-xs font-black px-2.5 py-1 rounded-lg shadow-2xs">
                  Save ₹{savingsAmount}
                </span>
                <span className="block text-[10px] font-bold text-[#16A34A] mt-0.5">
                  {discountPercent}% lower than MRP
                </span>
              </div>
            )}
          </div>

          {/* Variant Selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm font-extrabold text-gray-800 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#16A34A]" />
                <span>Select Pack / Unit Size:</span>
              </label>
              <span className="text-[11px] text-gray-500">
                {product.variants.length} {product.variants.length === 1 ? "Option" : "Options"} Available
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {product.variants.map((v) => {
                const isSelected = selectedVariantId === v.id;
                const vSavings = v.mrp > v.price ? v.mrp - v.price : 0;
                const vDiscount =
                  v.mrp > v.price
                    ? Math.round(((v.mrp - v.price) / v.mrp) * 100)
                    : 0;

                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedVariantId(v.id)}
                    className={`p-3 rounded-xl border text-left transition-all relative ${
                      isSelected
                        ? "bg-green-50/70 border-[#16A34A] ring-2 ring-green-600/20 shadow-xs"
                        : "bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50/50"
                    }`}
                  >
                    {/* Selected Checkmark Badge */}
                    {isSelected && (
                      <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#16A34A] text-white flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    )}

                    <div className="font-bold text-xs sm:text-sm text-gray-900 pr-5">
                      {v.label}
                    </div>

                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="text-sm sm:text-base font-black text-gray-900">
                        ₹{v.price}
                      </span>
                      {v.mrp > v.price && (
                        <span className="text-[10px] sm:text-xs text-gray-400 line-through">
                          ₹{v.mrp}
                        </span>
                      )}
                    </div>

                    {vSavings > 0 && (
                      <span className="inline-block text-[9px] font-black text-[#16A34A] bg-green-100/80 px-1.5 py-0.5 rounded mt-1">
                        {vDiscount}% OFF (Save ₹{vSavings})
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Primary Call to Action: Add to Cart / Quantity Stepper */}
          <div className="pt-2">
            {currentQuantity === 0 ? (
              <button
                type="button"
                onClick={() => addItem(product, selectedVariant)}
                className="w-full flex items-center justify-center gap-2 bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.99] text-white font-black text-sm sm:text-base py-3.5 px-6 rounded-xl shadow-md transition-all duration-200 cursor-pointer"
              >
                <Plus className="w-5 h-5 stroke-[3]" />
                <span>ADD TO CART • ₹{selectedVariant.price}</span>
              </button>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2.5 bg-green-50 border border-green-300 rounded-xl">
                  <div className="flex items-center gap-2 pl-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                    <span className="text-xs sm:text-sm font-bold text-gray-900">
                      {currentQuantity} in Cart ({selectedVariant.label})
                    </span>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center bg-[#16A34A] text-white rounded-xl overflow-hidden shadow-xs border border-green-700">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(product.id, selectedVariant.id, -1)
                      }
                      className="p-2 sm:p-2.5 hover:bg-[#15803D] active:scale-90 transition cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4 stroke-[3]" />
                    </button>
                    <span className="px-3 text-sm font-black min-w-[2rem] text-center select-none">
                      {currentQuantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(product.id, selectedVariant.id, 1)
                      }
                      className="p-2 sm:p-2.5 hover:bg-[#15803D] active:scale-90 transition cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4 stroke-[3]" />
                    </button>
                  </div>
                </div>

                <Link
                  href="/cart"
                  className="w-full flex items-center justify-center gap-2 bg-[#E11D48] hover:bg-[#BE123C] text-white font-black text-sm py-2.5 px-4 rounded-xl shadow-xs transition"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>View in Cart &amp; Checkout</span>
                </Link>
              </div>
            )}
          </div>

          {/* Delivery & Dispatch Note */}
          <div className="bg-white rounded-xl border border-gray-200 p-3.5 space-y-2 text-xs">
            <div className="flex items-start gap-2.5 text-gray-700">
              <MapPin className="w-4 h-4 text-[#16A34A] flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-gray-900 block">
                  Delivery to New Maninagar, Ahmedabad
                </span>
                <span className="text-gray-500 text-[11px]">
                  Order now to get delivery in <strong>12-15 minutes</strong> from Jivan Supermarket.
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-gray-500 pt-1 border-t border-gray-100">
              <Package className="w-3.5 h-3.5 text-gray-400" />
              <span>Fulfilled &amp; Quality Checked by Jivan Supermarket Counter</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Product Overview, Specifications, Reviews, Delivery */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs">
        {/* Tab Headers */}
        <div className="flex items-center border-b border-gray-200 bg-gray-50/70 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`px-4 sm:px-6 py-3 text-xs sm:text-sm font-extrabold transition-all border-b-2 whitespace-nowrap ${
              activeTab === "overview"
                ? "border-[#16A34A] text-[#16A34A] bg-white"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            Product Overview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("specs")}
            className={`px-4 sm:px-6 py-3 text-xs sm:text-sm font-extrabold transition-all border-b-2 whitespace-nowrap ${
              activeTab === "specs"
                ? "border-[#16A34A] text-[#16A34A] bg-white"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            Specifications
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("reviews")}
            className={`px-4 sm:px-6 py-3 text-xs sm:text-sm font-extrabold transition-all border-b-2 whitespace-nowrap ${
              activeTab === "reviews"
                ? "border-[#16A34A] text-[#16A34A] bg-white"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            Customer Reviews ({product.rating} ★)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("delivery")}
            className={`px-4 sm:px-6 py-3 text-xs sm:text-sm font-extrabold transition-all border-b-2 whitespace-nowrap ${
              activeTab === "delivery"
                ? "border-[#16A34A] text-[#16A34A] bg-white"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            Delivery &amp; Returns
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h3 className="text-base sm:text-lg font-black text-gray-900 mb-2">
                  About {product.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {product.description} Sourced directly from certified brand
                  distributors to ensure original packaging, maximum freshness,
                  and uncompromised quality for your family.
                </p>
              </div>

              {/* Key Highlights Grid */}
              <div>
                <h4 className="text-xs sm:text-sm font-black text-gray-900 uppercase tracking-wider mb-3">
                  Key Highlights &amp; Features
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-gray-900 block">
                        Original Brand Packaging
                      </span>
                      <span className="text-[11px] text-gray-500">
                        100% genuine factory sealed pack with verified batch number.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-gray-900 block">
                        Rigorous Quality Checks
                      </span>
                      <span className="text-[11px] text-gray-500">
                        Inspected before billing to ensure leak-proof and clean condition.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-gray-900 block">
                        Hygienic Storage
                      </span>
                      <span className="text-[11px] text-gray-500">
                        Kept in optimal temperature conditions at Jivan Supermarket store.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-gray-900 block">
                        Best Neighborhood Price
                      </span>
                      <span className="text-[11px] text-gray-500">
                        Guaranteed discounts on everyday essential groceries.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SPECIFICATIONS */}
          {activeTab === "specs" && (
            <div className="max-w-3xl">
              <h3 className="text-base sm:text-lg font-black text-gray-900 mb-4">
                Product Details &amp; Specifications
              </h3>
              <div className="border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-200 text-xs sm:text-sm">
                <div className="grid grid-cols-3 p-3 bg-gray-50/60">
                  <span className="font-bold text-gray-500">Brand</span>
                  <span className="col-span-2 font-bold text-gray-900">
                    {product.brand}
                  </span>
                </div>
                <div className="grid grid-cols-3 p-3">
                  <span className="font-bold text-gray-500">Category</span>
                  <span className="col-span-2 text-gray-900">
                    {product.category}
                  </span>
                </div>
                <div className="grid grid-cols-3 p-3 bg-gray-50/60">
                  <span className="font-bold text-gray-500">Dietary Preference</span>
                  <span className="col-span-2 text-gray-900 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-600 inline-block" />
                    100% Vegetarian
                  </span>
                </div>
                <div className="grid grid-cols-3 p-3">
                  <span className="font-bold text-gray-500">Selected Unit</span>
                  <span className="col-span-2 font-semibold text-gray-900">
                    {selectedVariant.label}
                  </span>
                </div>
                <div className="grid grid-cols-3 p-3 bg-gray-50/60">
                  <span className="font-bold text-gray-500">Shelf Life</span>
                  <span className="col-span-2 text-gray-900">{shelfLife}</span>
                </div>
                <div className="grid grid-cols-3 p-3">
                  <span className="font-bold text-gray-500">Storage Instructions</span>
                  <span className="col-span-2 text-gray-900">
                    {storageInstruction}
                  </span>
                </div>
                <div className="grid grid-cols-3 p-3 bg-gray-50/60">
                  <span className="font-bold text-gray-500">Country of Origin</span>
                  <span className="col-span-2 text-gray-900">India 🇮🇳</span>
                </div>
                <div className="grid grid-cols-3 p-3">
                  <span className="font-bold text-gray-500">FSSAI License</span>
                  <span className="col-span-2 font-mono text-gray-700">
                    10723026000491
                  </span>
                </div>
                <div className="grid grid-cols-3 p-3 bg-gray-50/60">
                  <span className="font-bold text-gray-500">Sold &amp; Packed By</span>
                  <span className="col-span-2 text-gray-900">
                    Jivan Supermarket, Opp. Express Highway, New Maninagar, Ahmedabad
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CUSTOMER REVIEWS */}
          {activeTab === "reviews" && (
            <div className="max-w-4xl space-y-6">
              {/* Rating Summary Card */}
              <div className="bg-gray-50 rounded-2xl p-4 sm:p-6 border border-gray-200 flex flex-col sm:flex-row items-center gap-6">
                <div className="text-center sm:border-r sm:border-gray-200 sm:pr-8">
                  <div className="text-4xl sm:text-5xl font-black text-gray-900">
                    {product.rating}
                  </div>
                  <div className="flex items-center justify-center gap-0.5 my-1.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-gray-500 font-semibold block">
                    Based on 1,420+ Verified Buyers
                  </span>
                </div>

                <div className="flex-1 w-full space-y-1.5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-10 text-gray-600 font-semibold">5 Star</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-[#16A34A] h-2 rounded-full w-[88%]" />
                    </div>
                    <span className="w-8 text-right font-bold text-gray-700">88%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-10 text-gray-600 font-semibold">4 Star</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-[#16A34A] h-2 rounded-full w-[10%]" />
                    </div>
                    <span className="w-8 text-right font-bold text-gray-700">10%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-10 text-gray-600 font-semibold">3 Star</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-amber-400 h-2 rounded-full w-[2%]" />
                    </div>
                    <span className="w-8 text-right font-bold text-gray-700">2%</span>
                  </div>
                </div>
              </div>

              {/* Sample Verified Customer Reviews */}
              <div className="space-y-3">
                <div className="p-3.5 sm:p-4 rounded-xl border border-gray-200 bg-white">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs sm:text-sm text-gray-900">
                        Patel Hitesh
                      </span>
                      <span className="text-[10px] font-bold text-[#16A34A] bg-green-50 px-2 py-0.5 rounded-full border border-green-200 flex items-center gap-1">
                        <Check className="w-2.5 h-2.5" /> Verified Purchase
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-400">2 days ago</span>
                  </div>
                  <div className="flex items-center gap-0.5 mb-1.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className="w-3 h-3 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Fresh stock with recent manufacturing date. Delivered in 10
                    minutes directly from the New Maninagar store. Unbeatable
                    convenience!
                  </p>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl border border-gray-200 bg-white">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs sm:text-sm text-gray-900">
                        Sneha Joshi
                      </span>
                      <span className="text-[10px] font-bold text-[#16A34A] bg-green-50 px-2 py-0.5 rounded-full border border-green-200 flex items-center gap-1">
                        <Check className="w-2.5 h-2.5" /> Verified Purchase
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-400">Last week</span>
                  </div>
                  <div className="flex items-center gap-0.5 mb-1.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className="w-3 h-3 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Best price compared to other apps. Clean packaging and
                    polite delivery boy. Will always reorder from Jivan
                    Supermarket.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: DELIVERY & RETURNS */}
          {activeTab === "delivery" && (
            <div className="max-w-3xl space-y-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-green-50/70 border border-green-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-green-900">
                  <Zap className="w-4 h-4 text-[#16A34A] fill-[#16A34A]" />
                  <span>Superfast 12-Minute Delivery Promise</span>
                </div>
                <p className="text-gray-700 text-xs leading-relaxed">
                  Orders placed for New Maninagar and adjacent localities in
                  Ahmedabad are dispatched immediately by dedicated express
                  riders.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="font-bold text-gray-900">Easy Return &amp; Replacement Policy:</h4>
                <ul className="list-disc pl-5 space-y-1.5 text-gray-600 text-xs">
                  <li>
                    Damaged, leaked, or incorrect items are replaced immediately
                    or refunded to your original payment method.
                  </li>
                  <li>
                    Dairy &amp; fresh essentials can be verified right at the
                    doorstep with the delivery partner.
                  </li>
                  <li>
                    For any support, call Jivan Supermarket counter directly at{" "}
                    <strong>+91 98765 43210</strong>.
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Similar & Related Products in Same Category */}
      {relatedProducts.length > 0 && (
        <section className="pt-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base sm:text-xl font-black text-[#1A1A1A] tracking-tight">
                Frequently Bought Together
              </h2>
              <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
                More essentials in {product.category}
              </p>
            </div>

            <Link
              href={`/products?category=${encodeURIComponent(product.category)}`}
              className="text-xs font-bold text-[#16A34A] hover:underline"
            >
              View Category
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Mobile Sticky Add-to-Cart Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 px-3.5 py-2.5 shadow-lg flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="relative w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 flex-shrink-0 p-1">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="40px"
              className="object-contain"
            />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-gray-900 truncate">
              {product.name}
            </div>
            <div className="flex items-baseline gap-1 text-[11px]">
              <span className="font-black text-gray-900">
                ₹{selectedVariant.price}
              </span>
              <span className="text-[10px] text-gray-400">
                ({selectedVariant.label})
              </span>
            </div>
          </div>
        </div>

        <div className="flex-shrink-0">
          {currentQuantity === 0 ? (
            <button
              type="button"
              onClick={() => addItem(product, selectedVariant)}
              className="bg-[#16A34A] active:scale-95 text-white font-black text-xs px-4 py-2 rounded-lg flex items-center gap-1 shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>ADD</span>
            </button>
          ) : (
            <div className="flex items-center bg-[#16A34A] text-white rounded-lg overflow-hidden shadow-2xs border border-green-700">
              <button
                type="button"
                onClick={() =>
                  updateQuantity(product.id, selectedVariant.id, -1)
                }
                className="p-1.5 hover:bg-[#15803D] active:scale-90 transition"
              >
                <Minus className="w-3.5 h-3.5 stroke-[3]" />
              </button>
              <span className="px-2 text-xs font-black min-w-[1.2rem] text-center select-none">
                {currentQuantity}
              </span>
              <button
                type="button"
                onClick={() =>
                  updateQuantity(product.id, selectedVariant.id, 1)
                }
                className="p-1.5 hover:bg-[#15803D] active:scale-90 transition"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
