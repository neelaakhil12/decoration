"use client";
import { useState } from "react";
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
    { name: "Romantic", label: "Romantic", image: "/images/anniversary_decor.png" },
    { name: "Baby Shower", label: "Baby Shower", image: "/images/baby_shower_decor.png" },
    { name: "Stage & Wedding", label: "Weddings", image: "/images/stage_decor.png" },
    { name: "Traditional", label: "Traditional", image: "/images/house_warming_decor.png" },
    { name: "Specialty", label: "Specialty", image: "/images/car_decor.png" },
  ];

  const defaultSubCategories = [
    "Wall Decor",
    "Ring Stand",
    "Room Decor",
    "Stage Backdrop",
    "Table/Car Decor",
  ];

  const dynamicSubCategories = Array.from(
    new Set([
      ...(appSubCategories || defaultSubCategories),
      ...(products || [])
        .map((p) => p.subCategory)
        .filter((sc) => sc && typeof sc === "string" && sc.trim().length > 0),
    ])
  );

  const subCategories = ["All", ...dynamicSubCategories];

  const isCategoryMatch = (productCat = "", selectedCat = "") => {
    if (!selectedCat || selectedCat === "All") return true;
    const p = String(productCat).toLowerCase();
    const s = String(selectedCat).toLowerCase();
    if (p === s) return true;
    if ((s.includes("birthday") || s.includes("kid")) && (p.includes("birthday") || p.includes("kid"))) return true;
    if ((s.includes("romantic") || s.includes("anniversary")) && (p.includes("romantic") || p.includes("anniversary"))) return true;
    if ((s.includes("baby") || s.includes("welcome")) && (p.includes("baby") || p.includes("welcome"))) return true;
    if ((s.includes("stage") || s.includes("wedding")) && (p.includes("stage") || p.includes("wedding"))) return true;
    if ((s.includes("traditional") || s.includes("house")) && (p.includes("traditional") || p.includes("house"))) return true;
    if ((s.includes("specialty") || s.includes("festive") || s.includes("car")) && (p.includes("specialty") || p.includes("festive") || p.includes("car"))) return true;
    return p.includes(s) || s.includes(p);
  };

  const isSubCategoryMatch = (prodSub = "", activeSub = "") => {
    if (!activeSub || activeSub === "All") return true;
    const p = String(prodSub).toLowerCase();
    const a = String(activeSub).toLowerCase();
    if (p === a) return true;
    if (a.includes("wall") && p.includes("wall")) return true;
    if (a.includes("ring") && p.includes("ring")) return true;
    if (a.includes("room") && p.includes("room")) return true;
    if ((a.includes("stage") || a.includes("backdrop")) && (p.includes("stage") || p.includes("backdrop"))) return true;
    if ((a.includes("table") || a.includes("car")) && (p.includes("table") || p.includes("car"))) return true;
    return p.includes(a) || a.includes(p);
  };

  const filteredProducts = (products || []).filter((prod) => {
    if (searchQuery.trim() !== "") {
      return prod.title.toLowerCase().includes(searchQuery.toLowerCase());
    }
    const matchesCategory = isCategoryMatch(prod.category, selectedCategory);
    const matchesSubCategory = isSubCategoryMatch(prod.subCategory, activeSubCategory);
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
    <section id="catalog-section" className="py-6 md:py-8 bg-white relative border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">

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

        {/* ── 1. Explore at a Glance — Category Chips ── */}
        <div className="space-y-2">
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
            <div className="flex gap-1 px-4 pt-4 pb-0 overflow-x-auto scroll-bar-remove md:justify-center md:gap-6 lg:gap-10">
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
                    className={`flex-shrink-0 flex flex-col items-center pt-3 px-4 pb-4 rounded-t-xl cursor-pointer transition-all duration-200 select-none ${
                      isSelected
                        ? "bg-white shadow-md scale-105"
                        : "bg-white/50 border-t border-white/60 hover:bg-white/80"
                    }`}
                    style={{ width: 130, minHeight: 145 }}
                  >
                    <img
                      src={cat.image}
                      alt={cat.label}
                      className="rounded-2xl object-cover shadow-sm"
                      style={{ width: 96, height: 96 }}
                      loading="lazy"
                    />
                    <span className="text-center leading-tight mt-2.5 text-brand-plum font-sans font-bold text-sm">
                      {cat.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── 2. Subcategory shape chips ── */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 scroll-bar-remove border-b border-gray-100 pb-4 md:justify-center md:gap-4">
          {subCategories.map((sub) => {
            const isSelected = isSubCategoryMatch(sub, activeSubCategory);
            return (
              <button
                key={sub}
                id={`subcat-chip-${sub.toLowerCase().replace(/\s/g, "-")}`}
                onClick={() => setActiveSubCategory(sub)}
                className={`flex-shrink-0 px-4 py-2 rounded-full border text-xs md:text-sm font-bold tracking-wide transition-all cursor-pointer font-sans ${
                  isSelected
                    ? "bg-brand-plum text-white border-brand-plum shadow-md scale-105"
                    : "bg-white text-brand-plum/70 border-gray-200 hover:border-brand-gold hover:text-brand-plum"
                }`}
              >
                {sub}
              </button>
            );
          })}
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

  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group ${
        isMobileScroll ? "w-[260px] flex-shrink-0" : "w-full"
      }`}
    >
      {/* Image container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Favorite Button */}
        <button
          onClick={onToggleFavorite}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-md rounded-full shadow-sm hover:scale-110 transition-transform cursor-pointer"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500"
            }`}
          />
        </button>

        {/* Rating badge */}
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 font-sans">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span>{product.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-grow flex flex-col justify-between space-y-3">
        <div>
          <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider font-sans">
            {product.subCategory}
          </span>
          <h3 className="text-sm font-bold text-brand-plum line-clamp-2 leading-snug font-sans mt-0.5">
            {product.title}
          </h3>
        </div>

        <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-400 line-through font-sans">
              ₹{product.originalPrice}
            </div>
            <div className="text-base font-black text-brand-plum font-sans">
              ₹{product.price}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={onAddToCart}
              className="p-2.5 bg-brand-gold/15 hover:bg-brand-gold text-brand-plum hover:text-white rounded-xl transition-all cursor-pointer"
              title="Add to Cart"
            >
              <ShoppingCart className="h-4 w-4" />
            </button>
            <button
              onClick={() => openBookingModal(product)}
              className="bg-brand-plum hover:bg-brand-plum/90 text-white px-3.5 py-2 rounded-xl text-xs font-bold font-sans flex items-center gap-1 transition-all shadow-sm cursor-pointer"
            >
              <span>Book</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
