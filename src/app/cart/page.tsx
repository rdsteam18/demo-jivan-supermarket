"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import confetti from "canvas-confetti";
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  MapPin,
  Banknote,
  Smartphone,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Loader2,
  Zap,
  ArrowRight,
  Package,
  Bike,
  Check,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import shopData from "@/data/shop.json";
import { useIsMounted } from "@/hooks/useIsMounted";

export default function CartPage() {
  const isMounted = useIsMounted();
  const [selectedPayment, setSelectedPayment] = useState<"upi" | "cod">("upi");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  const totalItems = useCartStore((state) => state.totalItems());
  const subtotal = useCartStore((state) => state.subtotal());
  const discount = useCartStore((state) => state.discount());
  const deliveryFee = useCartStore((state) => state.deliveryFee());
  const total = useCartStore((state) => state.total());

  // Multi-Stage Firecrackers & Cracker Burst Animation
  const fireCrackersAnimation = () => {
    // Stage 1: Immediate Center Cracker Explosion
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#E11D48", "#16A34A", "#F59E0B", "#2563EB", "#FFFFFF"],
      shapes: ["circle", "square"],
      scalar: 1.2,
    });

    // Stage 2: Left Side Cannon Burst
    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 60,
        origin: { x: 0.1, y: 0.7 },
        colors: ["#E11D48", "#16A34A", "#F59E0B", "#F43F5E"],
      });
    }, 250);

    // Stage 3: Right Side Cannon Burst
    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 60,
        origin: { x: 0.9, y: 0.7 },
        colors: ["#16A34A", "#F59E0B", "#10B981", "#E11D48"],
      });
    }, 500);

    // Stage 4: Grand Finale Cracker Shower
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.4 },
        colors: ["#E11D48", "#16A34A", "#F59E0B", "#FCD34D", "#34D399"],
        scalar: 1.3,
      });
    }, 850);
  };

  const handlePlaceOrder = () => {
    setIsPlacingOrder(true);
    setTimeout(() => {
      setIsPlacingOrder(false);
      setOrderPlaced(true);
      clearCart();
      fireCrackersAnimation();
    }, 700);
  };

  if (!isMounted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-xs text-gray-500">
        Loading cart...
      </div>
    );
  }

  // Order Success Screen with Firecracker Effects & Live Tracking Stepper
  if (orderPlaced) {
    return (
      <div className="max-w-xl mx-auto px-3 sm:px-4 py-8 sm:py-12 animate-in fade-in zoom-in duration-300 pb-24 md:pb-12">
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-9 shadow-xl relative overflow-hidden text-center">
          {/* Decorative Sparkle Highlights */}
          <div className="absolute top-3 left-4 w-3 h-3 rounded-full bg-[#E11D48] animate-ping opacity-75" />
          <div className="absolute top-6 right-6 w-2.5 h-2.5 rounded-full bg-[#16A34A] animate-pulse" />
          <div className="absolute bottom-6 left-8 w-2 h-2 rounded-full bg-[#F59E0B] animate-bounce" />

          {/* Celebration Success Icon */}
          <div className="w-16 h-16 bg-[#16A34A] text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-green-600/30 mb-4 animate-bounce">
            <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
          </div>

          <div className="inline-flex items-center gap-1.5 bg-red-50 text-[#E11D48] text-xs font-black px-3.5 py-1 rounded-full border border-red-200 shadow-2xs mb-2">
            <Sparkles className="w-3.5 h-3.5 fill-[#E11D48]" />
            <span>🎉 Order Confirmed • Crackers Popping!</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-[#1A1A1A] tracking-tight mb-1">
            Order Dispatched to {shopData.name}!
          </h2>

          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6 max-w-md mx-auto">
            Your daily essentials are being packed at the counter and our delivery partner will arrive in <strong>12-15 minutes</strong>.
          </p>

          {/* Blinkit-Style Live Order Tracking Stepper */}
          <div className="bg-[#FAFAFA] rounded-2xl p-4 sm:p-5 border border-gray-200 text-left mb-6">
            <span className="text-[11px] font-black uppercase text-gray-400 tracking-wider block mb-4">
              Live Order Status
            </span>

            <div className="space-y-4 relative">
              {/* Stepper Vertical Connector Line */}
              <div className="absolute left-[13px] top-2 bottom-2 w-0.5 bg-green-200 -z-0" />

              {/* Step 1: Placed */}
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-7 h-7 rounded-full bg-[#16A34A] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-black text-gray-900 block leading-tight">
                    Order Received
                  </span>
                  <span className="text-[10px] text-gray-500">
                    Verified by POS billing counter
                  </span>
                </div>
                <span className="text-[10px] font-bold text-[#16A34A] bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                  Just now
                </span>
              </div>

              {/* Step 2: Packed */}
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-7 h-7 rounded-full bg-[#16A34A] text-white flex items-center justify-center flex-shrink-0 shadow-xs animate-pulse">
                  <Package className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-black text-gray-900 block leading-tight">
                    Packing Fresh Items
                  </span>
                  <span className="text-[10px] text-gray-500">
                    Jivan Supermarket, New Maninagar
                  </span>
                </div>
                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  In progress
                </span>
              </div>

              {/* Step 3: Out for Delivery */}
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-7 h-7 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center flex-shrink-0">
                  <Bike className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-bold text-gray-500 block leading-tight">
                    Out for Delivery
                  </span>
                  <span className="text-[10px] text-gray-400">
                    Delivery partner assigned
                  </span>
                </div>
                <span className="text-[10px] text-gray-400">12 Mins</span>
              </div>
            </div>
          </div>

          {/* Quick Details Box */}
          <div className="bg-white rounded-xl p-3.5 border border-gray-200 text-left text-xs space-y-2 mb-6 shadow-2xs">
            <div className="flex justify-between items-center text-gray-600">
              <span className="flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#16A34A]" /> Delivery To
              </span>
              <strong className="text-[#1A1A1A] font-bold">{shopData.area}, Ahmedabad</strong>
            </div>

            <div className="flex justify-between items-center text-gray-600">
              <span className="flex items-center gap-1.5 font-medium">
                <Banknote className="w-3.5 h-3.5 text-[#16A34A]" /> Payment Method
              </span>
              <strong className="text-[#1A1A1A] uppercase font-black">{selectedPayment} (DEMO)</strong>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5">
            <button
              type="button"
              onClick={fireCrackersAnimation}
              className="flex-1 bg-white hover:bg-red-50 text-[#E11D48] border-2 border-[#E11D48] font-black text-xs sm:text-sm py-3 rounded-xl transition flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <Sparkles className="w-4 h-4 fill-[#E11D48]" />
              <span>Burst More Crackers!</span>
            </button>

            <Link
              href="/"
              className="flex-1 bg-[#16A34A] hover:bg-[#15803D] active:scale-[0.99] text-white font-black text-xs sm:text-sm py-3 rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm shadow-green-700/20"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Empty State
  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4 pb-24 md:pb-16">
        <div className="w-20 h-20 bg-green-50 text-[#16A34A] rounded-2xl flex items-center justify-center mx-auto border border-green-100 shadow-xs">
          <ShoppingBag className="w-9 h-9" />
        </div>
        <h2 className="text-xl font-black text-[#1A1A1A]">
          Your Cart is Empty
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto">
          Stock up on fresh milk, chakki atta, cooking oil, or tea-time munchies from Jivan Supermarket.
        </p>
        <div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-[#E11D48] hover:bg-[#BE123C] active:scale-95 text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-xl transition shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Browse Products</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 pb-24 md:pb-12">
      {/* Header Row */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-5">
        <div>
          <h1 className="text-lg sm:text-2xl font-black text-[#1A1A1A] tracking-tight flex items-center gap-2">
            <span>Checkout &amp; Cart</span>
            <span className="text-xs bg-red-100 text-[#E11D48] font-bold px-2 py-0.5 rounded-full">
              {totalItems} {totalItems === 1 ? "Item" : "Items"}
            </span>
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Direct Dispatch from {shopData.name} ({shopData.area})
          </p>
        </div>
        <Link
          href="/products"
          className="text-xs font-bold text-[#16A34A] hover:underline flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Add More
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-7 space-y-3">
          {items.map((item) => (
            <div
              key={`${item.productId}-${item.variantId}`}
              className="bg-white rounded-xl border border-gray-200 p-3 sm:p-3.5 flex items-center gap-3 sm:gap-4 hover:shadow-xs transition"
            >
              {/* Product Thumbnail */}
              <Link
                href={`/products/${item.productId}`}
                className="relative w-16 h-16 sm:w-20 sm:h-20 bg-[#FAFAFA] rounded-lg overflow-hidden flex-shrink-0 border border-gray-100 p-1 hover:border-[#16A34A] transition"
              >
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  fill
                  sizes="80px"
                  className="object-contain"
                />
              </Link>

              {/* Title & Details */}
              <div className="flex-1 min-w-0">
                <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">
                  {item.product.brand}
                </span>
                <Link
                  href={`/products/${item.productId}`}
                  className="hover:text-[#16A34A] transition"
                >
                  <h3 className="text-xs sm:text-sm font-bold text-[#1A1A1A] truncate hover:text-[#16A34A]">
                    {item.product.name}
                  </h3>
                </Link>
                <span className="inline-block bg-gray-100 text-gray-700 text-[10px] font-semibold px-2 py-0.5 rounded-md mt-1">
                  {item.variant.label}
                </span>

                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xs sm:text-sm font-black text-[#1A1A1A]">
                    ₹{item.variant.price * item.quantity}
                  </span>
                  {item.variant.mrp > item.variant.price && (
                    <span className="text-[11px] text-gray-400 line-through">
                      ₹{item.variant.mrp * item.quantity}
                    </span>
                  )}
                </div>
              </div>

              {/* Stepper Controls & Delete */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="flex items-center bg-[#16A34A] text-white rounded-lg overflow-hidden shadow-2xs border border-green-700">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.productId, item.variantId, -1)}
                    className="p-1 sm:p-1.5 hover:bg-[#15803D] transition"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                  <span className="px-2 text-xs font-black min-w-[1.25rem] text-center select-none">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.productId, item.variantId, 1)}
                    className="p-1 sm:p-1.5 hover:bg-[#15803D] transition"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => removeItem(item.productId, item.variantId)}
                  className="p-1.5 text-gray-400 hover:text-[#E11D48] transition rounded-lg hover:bg-rose-50"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Savings Highlight Card */}
          {discount > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2.5 text-[#E11D48]">
              <Sparkles className="w-4 h-4 text-[#E11D48] flex-shrink-0 fill-[#E11D48]" />
              <span className="text-xs font-bold">
                Super Saver! You are saving <strong>₹{discount}</strong> on this order compared to MRP.
              </span>
            </div>
          )}
        </div>

        {/* Right Column: Checkout Breakdown */}
        <div className="lg:col-span-5 space-y-3.5">
          {/* Demo Delivery Address Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-extrabold text-[#1A1A1A] flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#16A34A]" />
                Delivery Address
              </span>
              <span className="text-[10px] font-black text-[#16A34A] bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                ⚡ 12 Mins
              </span>
            </div>
            <p className="text-xs text-[#1A1A1A] font-bold">
              Demo Customer
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Flat 202, Near Madhav School Road, {shopData.area}, {shopData.city}
            </p>
          </div>

          {/* Payment Method Selector */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-2xs space-y-2.5">
            <span className="text-xs font-extrabold text-[#1A1A1A] block">
              Payment Method
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedPayment("upi")}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition cursor-pointer ${
                  selectedPayment === "upi"
                    ? "border-[#16A34A] bg-green-50 text-[#16A34A] shadow-2xs font-bold"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Smartphone className="w-4 h-4 text-[#16A34A] mb-1" />
                <span className="text-[11px] font-black">UPI (GPay / PhonePe)</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedPayment("cod")}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition cursor-pointer ${
                  selectedPayment === "cod"
                    ? "border-[#16A34A] bg-green-50 text-[#16A34A] shadow-2xs font-bold"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Banknote className="w-4 h-4 text-[#16A34A] mb-1" />
                <span className="text-[11px] font-black">Cash on Delivery</span>
              </button>
            </div>
          </div>

          {/* Final Bill Breakdown */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-2xs space-y-3">
            <h2 className="text-xs font-black text-[#1A1A1A] tracking-wider uppercase border-b border-gray-100 pb-2">
              Bill Summary
            </h2>

            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Items MRP Total</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-[#E11D48] font-bold">
                <span>Store Discount</span>
                <span>- ₹{discount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Delivery Fee</span>
                {deliveryFee === 0 ? (
                  <span className="text-[#16A34A] font-black bg-green-50 border border-green-200 px-2 py-0.5 rounded text-[11px]">
                    FREE (Orders &gt; ₹200)
                  </span>
                ) : (
                  <span>₹{deliveryFee}</span>
                )}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-3 flex justify-between items-center text-sm font-black text-[#1A1A1A]">
              <span>To Pay</span>
              <span className="text-base text-[#16A34A]">₹{total}</span>
            </div>

            {/* Urgent Red Place Order Button */}
            <button
              type="button"
              disabled={isPlacingOrder}
              onClick={handlePlaceOrder}
              className="w-full mt-2 bg-[#E11D48] hover:bg-[#BE123C] active:scale-[0.99] disabled:opacity-75 text-white font-black text-sm py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-md shadow-red-700/20 cursor-pointer"
            >
              {isPlacingOrder ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Confirming Order &amp; Lighting Sparklers...</span>
                </>
              ) : (
                <>
                  <span>Place Order (₹{total})</span>
                  <Zap className="w-4 h-4 fill-white" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1 text-[11px] text-gray-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>Safe &amp; Verified Quick Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
