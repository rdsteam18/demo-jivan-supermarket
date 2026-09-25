"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Clock, Phone, Store, Star, ShieldCheck, Camera, CheckCircle2 } from "lucide-react";
import shopData from "@/data/shop.json";

export default function StoreShowcase() {
  const images = shopData.galleryImages || [
    { url: shopData.storeImage, caption: "Store Entrance & Main Board" },
    { url: shopData.insideImage, caption: "Grocery & Daily Essentials Aisles" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-gradient-to-br from-white via-emerald-50/20 to-white rounded-2xl sm:rounded-3xl border border-emerald-100/80 p-4 sm:p-7 shadow-xs">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">
        {/* Left Information */}
        <div className="lg:col-span-6 space-y-3 sm:space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-3 py-1 rounded-full">
              <Store className="w-3.5 h-3.5 text-emerald-700" />
              <span>Verified Supermarket Partner</span>
            </span>

            {/* Google Rating Badge */}
            <span className="inline-flex items-center gap-1 text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200/80 px-2.5 py-1 rounded-full">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span>4.4 Rating (87+ Local Reviews)</span>
            </span>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              {shopData.name} — {shopData.area}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-1">
              Your genuine neighborhood departmental store. Order online with 12-minute doorstep delivery or walk into our fully stocked, air-conditioned aisles.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700 pt-1">
            <div className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-gray-100 shadow-2xs">
              <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-gray-900 block">Address</span>
                <span className="text-gray-500 text-[11px] leading-tight block">
                  Block C, S P Square, Beside Ramol Police Station, Near Croma, New Maninagar
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-gray-100 shadow-2xs">
              <Clock className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-gray-900 block">Store Timings</span>
                <span className="text-gray-500 text-[11px] leading-tight block">
                  {shopData.openingHours}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <a
              href={`tel:${shopData.phone.replace(/[^0-9+]/g, "")}`}
              className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl transition shadow-2xs"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Store: {shopData.phone}</span>
            </a>

            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200/60">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Direct Billing Counter Guarantee</span>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2 text-[11px] text-gray-500">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% Authentic Store Photos from New Maninagar, Ahmedabad</span>
          </div>
        </div>

        {/* Right Real Store Gallery */}
        <div className="lg:col-span-6 space-y-2.5">
          {/* Main Active Image */}
          <div className="relative h-56 sm:h-72 w-full rounded-2xl overflow-hidden shadow-sm border border-gray-200/80 bg-gray-100 group">
            <Image
              src={images[activeIndex].url}
              alt={images[activeIndex].caption}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-all duration-300 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
            
            <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20">
              <Camera className="w-3 h-3 text-emerald-400" />
              <span>Photo {activeIndex + 1} of {images.length}</span>
            </div>

            <div className="absolute bottom-3 left-3 right-3 text-white">
              <p className="text-xs sm:text-sm font-bold drop-shadow-sm">
                {images[activeIndex].caption}
              </p>
              <p className="text-[10px] text-white/80">
                Jivan Supermarket • New Maninagar
              </p>
            </div>
          </div>

          {/* Thumbnail Selector Rail */}
          <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`relative h-12 sm:h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  activeIndex === idx
                    ? "border-emerald-600 ring-2 ring-emerald-500/30 scale-95"
                    : "border-gray-200/80 hover:border-emerald-300 opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={img.url}
                  alt={img.caption}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
