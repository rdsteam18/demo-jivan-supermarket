"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, SlidersHorizontal, RotateCcw, PackageSearch, Zap } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";
import { Product } from "@/types";

function ProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "All";

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc" | "discount">("default");

  const allProducts: Product[] = productsData as Product[];

  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((product) => {
        const matchesCategory =
          selectedCategory === "All" ||
          product.category.toLowerCase() === selectedCategory.toLowerCase();

        const query = searchTerm.toLowerCase().trim();
        const matchesSearch =
          !query ||
          product.name.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query);

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        const aMinPrice = Math.min(...a.variants.map((v) => v.price));
        const bMinPrice = Math.min(...b.variants.map((v) => v.price));

        const aMaxDiscount = Math.max(
          ...a.variants.map((v) => Math.round(((v.mrp - v.price) / v.mrp) * 100))
        );
        const bMaxDiscount = Math.max(
          ...b.variants.map((v) => Math.round(((v.mrp - v.price) / v.mrp) * 100))
        );

        if (sortBy === "price-asc") return aMinPrice - bMinPrice;
        if (sortBy === "price-desc") return bMinPrice - aMinPrice;
        if (sortBy === "discount") return bMaxDiscount - aMaxDiscount;
        return 0;
      });
  }, [allProducts, selectedCategory, searchTerm, sortBy]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSortBy("default");
    router.push("/products");
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-5 pb-20 md:pb-8">
      {/* 1. Header & Search Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-gray-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-2xl font-black text-[#1A1A1A] tracking-tight">
              All Grocery Aisles
            </h1>
            <span className="text-[10px] sm:text-xs font-black bg-green-100 text-[#16A34A] px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <Zap className="w-3 h-3 text-[#16A34A] fill-[#16A34A]" />
              ⚡ 12 Min Delivery
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
            100% Genuine stock from Jivan Supermarket, New Maninagar
          </p>
        </div>

        {/* In-page Search Bar */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search by brand or grocery name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-white border border-gray-200 focus:border-[#16A34A] focus:ring-3 focus:ring-green-500/10 rounded-xl text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 shadow-2xs outline-none transition-all"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* 2. Category Filter Chips & Sort Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Category Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none -mx-1 px-1">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`text-xs px-3.5 py-1.5 rounded-xl font-bold transition whitespace-nowrap cursor-pointer ${
              selectedCategory === "All"
                ? "bg-[#16A34A] text-white shadow-xs"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            All Items
          </button>
          {categoriesData.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`text-xs px-3.5 py-1.5 rounded-xl font-semibold transition whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.name
                  ? "bg-[#16A34A] text-white shadow-xs font-bold"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
          <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-xs text-gray-500 font-medium">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "default" | "price-asc" | "price-desc" | "discount")}
            className="text-xs font-bold bg-white border border-gray-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-[#16A34A] text-gray-800 shadow-2xs cursor-pointer"
          >
            <option value="default">Most Popular</option>
            <option value="price-asc">Price: Low to High (₹)</option>
            <option value="price-desc">Price: High to Low (₹)</option>
            <option value="discount">Highest Discount (%)</option>
          </select>
        </div>
      </div>

      {/* 3. Product Count Meta */}
      <div className="flex items-center justify-between text-xs text-gray-500 font-medium px-0.5">
        <span>
          Showing <strong>{filteredProducts.length}</strong> items
        </span>
        {(searchTerm || selectedCategory !== "All" || sortBy !== "default") && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-[#16A34A] hover:underline font-bold cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            Reset Filters
          </button>
        )}
      </div>

      {/* 4. Product Grid OR Empty State */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center max-w-md mx-auto my-8 space-y-3 shadow-xs">
          <div className="w-14 h-14 bg-red-50 text-[#E11D48] rounded-2xl flex items-center justify-center mx-auto border border-red-100">
            <PackageSearch className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-[#1A1A1A]">
            No matching products found
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            We couldn&apos;t find items matching your query. Try searching for milk, atta, oil, tea, or reset your filters.
          </p>
          <button
            onClick={resetFilters}
            className="inline-flex items-center gap-1.5 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-xs cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            View All Products
          </button>
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-12 text-center text-xs text-gray-500">
          Loading aisle products...
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
