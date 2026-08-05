"use client";
import { useState } from "react";
import Link from "next/link";
import { Sparkles, Star, Heart, ChevronRight, ShoppingCart } from "lucide-react";
import { useApp } from "@/components/AppContext";

export default function FeaturedServices({
  searchQuery = "",
  selectedCategory = "All",
  onSelectCategory = () => {},
  onAddToCart = () => {},
}) {
  const { services: products, subCategories: appSubCategories, openBookingModal } = useApp();
  const [activeSubCategory, setActiveSubCategory] = useState("All");
  const [favorites, setFavorites] = useState({});

  const categories = [
    { name: "All", label: "All", image: "/images/birthday_decor.png" },
    { name: "Birthday", label: "Birthday", image: "/images/birthday_decor.png" },
    { name: "Baby Welcome", label: "Baby Welcome", image: "/images/welcome_baby_decor.png" },
    { name: "Kid's Party", label: "Kid's Party", image: "/images/kids_birthday_decor.png" },
    { name: "Anniversary", label: "Anniversary", image: "/images/anniversary_decor.png" },
    { name: "Baby Shower", label: "Baby Shower", image: "/images/baby_shower_decor.png" },
    { name: "Stage & Wedding", label: "Stage & Wedding", image: "/images/stage_decor.png" },
    { name: "House Warming", label: "House Warming", image: "/images/house_warming_decor.png" },
    { name: "Festival Decor", label: "Festival Decor", image: "/images/festival_decor.png" },
    { name: "Car Decor", label: "Car Decor", image: "/images/car_decor.png" },
  ];

  const defaultSubCategories = [
    "Wall Decor",
    "Ring Stand",
    "Room Decor",
    "Stage Backdrop",
    "Table/Car Decor",
  ];

  const isCategoryMatch = (productCat = "", selectedCat = "") => {
    if (!selectedCat || selectedCat === "All") return true;
    const p = String(productCat).toLowerCase();
    const s = String(selectedCat).toLowerCase();
    if (p === s) return true;
    if ((s.includes("birthday") || s.includes("kid")) && (p.includes("birthday") || p.includes("kid"))) return true;
    if ((s.includes("romantic") || s.includes("anniversary")) && (p.includes("romantic") || p.includes("anniversary"))) return true;
    if ((s.includes("baby") || s.includes("welcome") || s.includes("shower")) && (p.includes("baby") || p.includes("welcome") || p.includes("shower"))) return true;
    if ((s.includes("stage") || s.includes("wedding")) && (p.includes("stage") || p.includes("wedding"))) return true;
    if ((s.includes("traditional") || s.includes("house")) && (p.includes("traditional") || p.includes("house"))) return true;
    if ((s.includes("specialty") || s.includes("festive") || s.includes("car")) && (p.includes("specialty") || p.includes("festive") || p.includes("car"))) return true;
    return p.includes(s) || s.includes(p);
  };

  const isSubCategoryMatch = (prod, activeSub = "") => {
    if (!activeSub || activeSub === "All") return true;
    const pSub = String(prod.decorShape || prod.subCategory || "").toLowerCase();
    const a = String(activeSub).toLowerCase();

    if (a.includes("wall") && pSub.includes("wall")) return true;
    if (a.includes("ring") && pSub.includes("ring")) return true;
    if (a.includes("room") && pSub.includes("room")) return true;
    if ((a.includes("stage") || a.includes("backdrop")) && (pSub.includes("stage") || pSub.includes("backdrop"))) return true;
    if ((a.includes("table") || a.includes("car")) && (pSub.includes("table") || pSub.includes("car"))) return true;

    return pSub === a || pSub.includes(a) || a.includes(pSub);
  };

  const allAvailableSubCats = Array.from(
    new Set([
      ...(appSubCategories || defaultSubCategories),
      ...(products || [])
        .flatMap((p) => [p.decorShape, p.subCategory])
        .filter((sc) => sc && typeof sc === "string" && sc.trim().length > 0),
    ])
  );

  const activeSubCategoriesWithPackages = allAvailableSubCats.filter((shape) => {
    return (products || []).some((prod) => isSubCategoryMatch(prod, shape));
  });

  const subCategories = ["All", ...activeSubCategoriesWithPackages];

  const filteredProducts = (products || []).filter((prod) => {
    if (searchQuery.trim() !== "") {
      return prod.title.toLowerCase().includes(searchQuery.toLowerCase());
    }
    const matchesCategory = isCategoryMatch(prod.category, selectedCategory);
    const matchesSubCategory = isSubCategoryMatch(prod, activeSubCategory);
    return matchesCategory && matchesSubCategory;
  });

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getWhatsAppLink = (product) => {
    const text = `Hello Decor Dazzlers! I am interested in the "${product.title}" (ID: ${product.id}). Please share availability and details!`;
    return `https://wa.me/917075555987?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="catalog-section" className="py-8 md:py-14 lg:py-16 bg-brand-cream relative border-t border-brand-rosegold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">

        {/* ── Section Header ── */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="section-badge">
            <Sparkles className="h-4 w-4 text-brand-gold" />
            Live Decoration Catalog
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-brand-plum leading-tight">
            Trending <span className="text-gold-gradient italic">Decoration Themes</span>
          </h2>
          <p className="text-brand-plum/60 font-sans text-sm md:text-base">
            Select from curated decoration setups. Setup by background-verified decorators in Hyderabad.
          </p>
        </div>

        {/* ── 1. Explore at a Glance — Category Chips (Hidden on mobile) ── */}
        <div className="hidden md:block space-y-2">
          <div className="flex items-center gap-2 pl-1">
            <Sparkles className="h-4 w-4 text-brand-gold fill-brand-gold" />
            <h3 className="text-xs md:text-base uppercase tracking-wider font-extrabold text-brand-plum/60 font-sans">
              Explore at a Glance
            </h3>
          </div>

          {/* Category chip strip — EboNow style with rounded-top tabs */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(267deg, rgba(212,166,74,0.2) 0%, rgba(246,214,218,0.3) 55%, rgba(216,154,160,0.2) 100%)",
            }}
          >
            <div className="flex items-center gap-1 py-3 px-1 text-center justify-center text-sm md:text-base font-semibold text-brand-plum border-b border-white/60 font-sans">
              ✨ Choose your celebration
            </div>
            <div className="flex gap-2 sm:gap-3 px-4 sm:px-6 pt-4 pb-1 overflow-x-auto scroll-bar-remove justify-start">
              {categories.map((cat) => {
                const isSelected = isCategoryMatch(cat.name, selectedCategory);
                return (
                  <button
                    key={cat.name}
                    id={`cat-chip-${cat.name.toLowerCase().replace(/\s/g, "-")}`}
                    onClick={() => {
                      onSelectCategory(cat.name);
                      setActiveSubCategory("All");
                    }}
                    className={`flex-shrink-0 flex flex-col items-center pt-2.5 px-2 pb-3 rounded-t-xl cursor-pointer transition-all duration-200 select-none ${
                      isSelected
                        ? "bg-white shadow-md scale-105 z-10"
                        : "bg-white/50 border-t border-white/60 hover:bg-white/80"
                    }`}
                    style={{ width: 112, minHeight: 135 }}
                  >
                    <img
                      src={cat.image}
                      alt={cat.label}
                      className="rounded-2xl object-cover shadow-sm"
                      style={{ width: 80, height: 80 }}
                      loading="lazy"
                    />
                    <span className="text-center leading-tight mt-2 text-brand-plum font-sans font-bold text-xs line-clamp-2">
                      {cat.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── 3. Products — Horizontal Scroll on mobile, Grid on desktop ── */}
        {filteredProducts.length > 0 ? (
          <>
            {/* Mobile: horizontal scroll */}
            <div className="md:hidden">
              <div className="flex gap-3 overflow-x-auto scroll-bar-remove pb-2 -mx-4 px-4">
                {filteredProducts.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    isFavorite={!!favorites[prod.id]}
                    onToggleFavorite={() => toggleFavorite(prod.id)}
                    getWhatsAppLink={() => getWhatsAppLink(prod)}
                    onAddToCart={() => onAddToCart(prod)}
                    isMobileScroll={true}
                  />
                ))}
              </div>
            </div>

            {/* Desktop: 3-column grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  isFavorite={!!favorites[prod.id]}
                  onToggleFavorite={() => toggleFavorite(prod.id)}
                  getWhatsAppLink={() => getWhatsAppLink(prod)}
                  onAddToCart={() => onAddToCart(prod)}
                  isMobileScroll={false}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-150">
            <p className="text-sm font-bold text-brand-plum/70 font-sans">
              No decorations match your current filter.
            </p>
            <button
              onClick={() => {
                onSelectCategory("All");
                setActiveSubCategory("All");
              }}
              className="mt-3 text-xs font-bold text-brand-gold underline font-sans cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

function ProductCard({
  product,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
  onBook,
  isMobileScroll,
}) {
  const { openBookingModal } = useApp();

  const detailUrl = `/products/decor/${product.id}/${encodeURIComponent((product.title || "").replace(/\s+/g, "-"))}`;

  return (
    <div
      className={`bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group p-2.5 ${
        isMobileScroll ? "w-[260px] flex-shrink-0" : "w-full"
      }`}
    >
      {/* Image container */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
        <Link href={detailUrl} className="block w-full h-full">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Favorite Button */}
        <button
          type="button"
          onClick={onToggleFavorite}
          className="absolute top-2.5 right-2.5 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:scale-110 transition-transform cursor-pointer z-10"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500"
            }`}
          />
        </button>

        {/* Category Tag on Image (Bottom-Left) */}
        <div className="absolute bottom-2.5 left-2.5 bg-[#1E3A8A] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md font-sans pointer-events-none">
          {product.subCategory || product.category || "Wall Decor"}
        </div>
      </div>

      {/* Content */}
      <div className="pt-3 px-1 pb-1 flex-grow flex flex-col justify-between space-y-2">
        <div className="space-y-1.5">
          {/* Rating Badge */}
          <div className="bg-blue-50 text-blue-900 text-xs font-bold px-2.5 py-0.5 rounded-lg inline-flex items-center gap-1 font-sans w-fit">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            <span>{product.rating}</span>
          </div>

          {/* Title */}
          <Link href={detailUrl} className="block">
            <h3 className="text-sm font-bold text-brand-plum line-clamp-2 leading-snug font-sans hover:text-[#1E3A8A] transition-colors">
              {product.title}
            </h3>
          </Link>

          {/* Price */}
          <div className="flex items-baseline gap-2 pt-0.5">
            <span className="text-lg font-black text-[#1E3A8A] font-sans">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through font-sans">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
        </div>

        {/* Full-width Book Now Pill Button */}
        <div className="pt-1">
          <Link
            href={detailUrl}
            className="w-full bg-[#703A58] hover:bg-[#5C2F48] text-white font-sans text-xs font-bold py-2.5 px-4 rounded-xl shadow-sm transition-all flex items-center justify-center cursor-pointer"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}
