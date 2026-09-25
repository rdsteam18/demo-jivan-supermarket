import Link from "next/link";
import { MapPin, Phone, Clock, ShieldCheck } from "lucide-react";
import shopData from "@/data/shop.json";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 mt-16 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-gray-900">
          {/* Shop Details */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white font-black flex items-center justify-center text-base">
                J
              </div>
              <h3 className="text-lg font-black text-white tracking-tight">
                {shopData.name}
              </h3>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-md">
              {shopData.description}
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/70 border border-emerald-800/80 px-3 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Authentic &amp; Fresh FMCG Products</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-xs space-y-2.5">
            <h4 className="text-sm font-bold text-white mb-3 tracking-wide">
              Quick Navigation
            </h4>
            <div>
              <Link href="/" className="hover:text-emerald-400 transition">
                Home
              </Link>
            </div>
            <div>
              <Link href="/products" className="hover:text-emerald-400 transition">
                All Grocery Aisles
              </Link>
            </div>
            <div>
              <Link href="/products?category=Dairy+%26+Breakfast" className="hover:text-emerald-400 transition">
                Dairy &amp; Breakfast
              </Link>
            </div>
            <div>
              <Link href="/products?category=Atta%2C+Rice+%26+Dals" className="hover:text-emerald-400 transition">
                Atta, Rice &amp; Cooking Oils
              </Link>
            </div>
            <div>
              <Link href="/cart" className="hover:text-emerald-400 transition">
                Your Shopping Cart
              </Link>
            </div>
          </div>

          {/* Contact & Hours */}
          <div className="text-xs space-y-3">
            <h4 className="text-sm font-bold text-white mb-3 tracking-wide">
              Store Timings &amp; Contact
            </h4>
            <div className="flex items-start gap-2 text-gray-300">
              <MapPin className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>
                {shopData.address}, {shopData.city}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Clock className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>{shopData.openingHours}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Phone className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>Call / WhatsApp: {shopData.phone}</span>
            </div>
          </div>
        </div>

        {/* Demo Notice */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-3">
          <p>© 2026 {shopData.name}. All rights reserved.</p>
          <div className="bg-gray-900 text-amber-300 px-3 py-1 rounded-md text-[11px] font-medium border border-gray-800">
            Interactive Storefront Demo • Created for Jivan Supermarket, New Maninagar
          </div>
        </div>
      </div>
    </footer>
  );
}
