import Image from "next/image";
import { MapPin, Clock, Phone, Store, Star, ShieldCheck, ExternalLink } from "lucide-react";
import shopData from "@/data/shop.json";

export default function StoreShowcase() {
  return (
    <section className="bg-gradient-to-br from-white via-emerald-50/20 to-white rounded-2xl sm:rounded-3xl border border-emerald-100/80 p-4 sm:p-7 shadow-xs">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center">
        {/* Left Information */}
        <div className="lg:col-span-7 space-y-3 sm:space-y-4">
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
            <h2 className="text-lg sm:text-2xl font-black text-gray-900 tracking-tight">
              {shopData.name} — {shopData.area}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-1">
              Your trusted neighborhood departmental store for premium groceries, fresh milk, daily pantry staples, and personal care. Walk in or get lightning 20-minute delivery.
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
              className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-3.5 py-2 rounded-xl transition shadow-2xs"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Store: {shopData.phone}</span>
            </a>

            <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200/60">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Direct Billing Counter Guarantee</span>
            </div>
          </div>
        </div>

        {/* Right Real Store Photos */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-2.5 sm:gap-3">
          <div className="relative h-36 sm:h-48 rounded-2xl overflow-hidden shadow-xs border border-gray-200/70 group">
            <Image
              src={shopData.storeImage}
              alt="Jivan Supermarket Storefront in New Maninagar"
              fill
              sizes="(max-width: 640px) 160px, 240px"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <span className="absolute bottom-2 left-2 text-white text-[10px] font-bold px-2 py-0.5 bg-black/40 backdrop-blur-xs rounded-md">
              Storefront
            </span>
          </div>

          <div className="relative h-36 sm:h-48 rounded-2xl overflow-hidden shadow-xs border border-gray-200/70 group">
            <Image
              src={shopData.insideImage}
              alt="Jivan Supermarket Grocery Aisles"
              fill
              sizes="(max-width: 640px) 160px, 240px"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <span className="absolute bottom-2 left-2 text-white text-[10px] font-bold px-2 py-0.5 bg-black/40 backdrop-blur-xs rounded-md">
              Fresh Aisles
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
