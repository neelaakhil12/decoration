"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Star, ShoppingCart, ChevronRight, Heart, ArrowRight } from "lucide-react";
import { useApp } from "@/components/AppContext";

export default function GallerySection({ isHomePage = false, limit = null }) {
  const { searchQuery, setSearchQuery, selectedCategory, services, galleryItems, subCategories: appSubCategories, openBookingModal, addToCart } = useApp();
  const [eventCategory, setEventCategory] = useState("All");
  const [selectedShape, setSelectedShape] = useState("All");
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    if (selectedCategory) {
      setEventCategory(selectedCategory);
      setSelectedShape("All");
    }
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, [selectedCategory]);

  // Combine products/services with gallery data to ensure full price & buy now card format
  const displayItems = (services && services.length > 0 ? services : galleryItems || []).map((item) => ({
    id: item.id || Math.random().toString(),
    title: item.title,
    category: item.category,
    subCategory: item.subCategory || item.category || "DECORATION SETUP",
    decorShape: item.decorShape || item.subCategory || "Wall Decor",
    image: item.image,
    price: item.price || 3499,
    originalPrice: item.originalPrice || 4999,
    rating: item.rating || 4.8,
  }));

  // Search filter matcher
  const isSearchMatch = (item, query) => {
    if (!query || !query.trim()) return true;
    const q = query.toLowerCase().trim();
    const title = String(item.title || "").toLowerCase();
    const category = String(item.category || "").toLowerCase();
    const subCategory = String(item.subCategory || "").toLowerCase();
    const decorShape = String(item.decorShape || "").toLowerCase();

    return (
      title.includes(q) ||
      category.includes(q) ||
      subCategory.includes(q) ||
      decorShape.includes(q)
    );
  };

  // 1. Matches celebration event type (e.g. Birthday, Baby Welcome, Anniversary)
  const isEventMatch = (item, cat) => {
    if (!cat || cat === "All") return true;
    const target = cat.toLowerCase().trim();
    const itemCat = String(item.category || "").toLowerCase().trim();
    const itemTitle = String(item.title || "").toLowerCase().trim();

    if (itemCat === target || itemCat.includes(target) || target.includes(itemCat)) return true;
    if ((target.includes("birthday") || target.includes("kid")) && (itemCat.includes("birthday") || itemCat.includes("kid") || itemTitle.includes("birthday"))) return true;
    if ((target.includes("romantic") || target.includes("anniversary")) && (itemCat.includes("romantic") || itemCat.includes("anniversary") || itemTitle.includes("anniversary"))) return true;
    if ((target.includes("baby") || target.includes("welcome") || target.includes("shower")) && (itemCat.includes("baby") || target.includes("welcome") || itemCat.includes("welcome") || itemCat.includes("shower") || itemTitle.includes("baby"))) return true;
    if ((target.includes("stage") || target.includes("wedding")) && (itemCat.includes("stage") || itemCat.includes("wedding"))) return true;
    if ((target.includes("traditional") || target.includes("house")) && (itemCat.includes("traditional") || itemCat.includes("house"))) return true;
    if ((target.includes("specialty") || target.includes("festive") || target.includes("car")) && (itemCat.includes("specialty") || itemCat.includes("festive") || itemCat.includes("car"))) return true;

    return false;
  };

  // 2. Matches decor shape (Ring Stand, Stage Backdrop, Wall Decor, Room Decor, Table/Car Decor)
  const isShapeMatch = (item, shape) => {
    if (!shape || shape === "All") return true;
    const target = shape.toLowerCase().trim();
    const itemSub = String(item.decorShape || item.subCategory || "").toLowerCase().trim();

    if (target.includes("wall") && itemSub.includes("wall")) return true;
    if (target.includes("ring") && itemSub.includes("ring")) return true;
    if (target.includes("room") && itemSub.includes("room")) return true;
    if ((target.includes("stage") || target.includes("backdrop")) && (itemSub.includes("stage") || itemSub.includes("backdrop"))) return true;
    if ((target.includes("table") || target.includes("car")) && (itemSub.includes("table") || itemSub.includes("car"))) return true;

    return itemSub === target || itemSub.includes(target) || target.includes(itemSub);
  };

  // Filter packages for selected celebration event category and search query
  const eventFilteredItems = displayItems.filter(
    (item) => isEventMatch(item, eventCategory) && isSearchMatch(item, searchQuery)
  );

  // Determine available shape categories for this celebration event
  const defaultSubCats = ["Wall Decor", "Ring Stand", "Room Decor", "Stage Backdrop", "Table/Car Decor"];
  const allAvailableShapes = Array.from(
    new Set([
      ...(appSubCategories || defaultSubCats),
      ...(eventFilteredItems || [])
        .flatMap((s) => [s.decorShape, s.subCategory])
        .filter((sc) => sc && typeof sc === "string" && sc.trim().length > 0)
    ])
  );

  const activeShapesWithPackages = allAvailableShapes.filter((shape) => {
    return eventFilteredItems.some((item) => isShapeMatch(item, shape));
  });

  const shapeCategories = ["All", ...activeShapesWithPackages];

  // Final items filtered by shape
  const filteredItems = eventFilteredItems.filter((item) => isShapeMatch(item, selectedShape));
  const displayedItems = isHomePage ? filteredItems.slice(0, 8) : (limit ? filteredItems.slice(0, limit) : filteredItems);

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="gallery" className="py-8 md:py-14 lg:py-16 bg-brand-cream relative border-t border-brand-rosegold/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="section-badge">
            <Sparkles className="h-4 w-4 text-brand-gold" />
            {eventCategory !== "All" ? `${eventCategory} Packages` : "Our Packages Catalog"}
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-brand-plum leading-tight">
            {eventCategory !== "All" ? (
              <>
                {eventCategory} <span className="text-gold-gradient italic">Decoration Packages</span>
              </>
            ) : (
              <>
                Our Decoration <span className="text-gold-gradient italic">Packages</span>
              </>
            )}
          </h2>
          <p className="text-brand-plum/60 font-sans text-sm sm:text-base">
            Explore decoration packages with pricing, ratings, inclusions, and instant booking setup.
          </p>

        {/* Active Search Banner */}
        {searchQuery && searchQuery.trim().length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center justify-between font-sans shadow-xs max-w-2xl mx-auto">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-blue-950 font-medium">
                Search results for: <strong className="text-brand-plum font-black">"{searchQuery}"</strong>
              </span>
              <span className="bg-[#2563EB] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full">
                {filteredItems.length} found
              </span>
            </div>
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs font-bold text-red-600 hover:underline cursor-pointer"
            >
              Clear Search ✕
            </button>
          </div>
        )}

          {/* Reset Event Filter Pill if filtering by specific celebration */}
          {eventCategory !== "All" && (
            <div className="pt-1 flex items-center justify-center gap-2">
              <span className="text-xs font-bold text-brand-plum/70 font-sans">
                Filtered by celebration: <strong className="text-brand-plum">{eventCategory}</strong>
              </span>
              <button
                onClick={() => setEventCategory("All")}
                className="text-xs font-bold text-brand-gold underline hover:text-brand-plum transition-colors font-sans cursor-pointer"
              >
                View All Celebrations
              </button>
            </div>
          )}
        </div>

        {/* Category Filters — SubCategory Decor Shape Pills */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 scroll-bar-remove border-b border-gray-100 pb-4 md:justify-center md:flex-wrap md:gap-3">
          {shapeCategories.map((cat) => {
            const isSelected = selectedShape === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedShape(cat)}
                className={`flex-shrink-0 px-4.5 py-2 rounded-full border text-xs md:text-sm font-bold tracking-wide transition-all cursor-pointer font-sans whitespace-nowrap ${isSelected
                    ? "bg-brand-plum text-white border-brand-plum shadow-md scale-105"
                    : "bg-white text-brand-plum/70 border-gray-200 hover:border-brand-gold hover:text-brand-plum"
                  }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid (Matching 2nd screenshot) */}
        {displayedItems.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayedItems.map((product) => {
                const detailUrl = `/products/decor/${product.id}/${encodeURIComponent((product.title || "").replace(/\s+/g, "-"))}`;
                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group p-2.5"
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
                        onClick={() => toggleFavorite(product.id)}
                        className="absolute top-2.5 right-2.5 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:scale-110 transition-transform cursor-pointer z-10"
                      >
                        <Heart
                          className={`h-4 w-4 transition-colors ${favorites[product.id] ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500"
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
              })}
            </div>

            {/* View All Packages CTA Button for Homepage */}
            {isHomePage && (
              <div className="text-center pt-6">
                <Link
                  href="/gallery"
                  className="inline-flex items-center gap-2 bg-brand-plum hover:bg-[#5C2F48] text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-wider px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <span>View All Packages</span>
                  <ArrowRight className="h-4 w-4 text-brand-gold" />
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-150">
            <p className="text-sm font-bold text-brand-plum/70 font-sans">
              No decoration packages available for {selectedShape !== "All" ? `"${selectedShape}" in ${eventCategory}` : `"${eventCategory}"`}.
            </p>
            <button
              onClick={() => {
                setSelectedShape("All");
                setEventCategory("All");
              }}
              className="mt-3 text-xs font-bold text-brand-gold underline font-sans cursor-pointer"
            >
              View All Packages
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
