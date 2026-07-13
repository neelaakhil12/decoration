"use client";
import { useState } from "react";
import { Sparkles, Star, Heart, ChevronRight, ShoppingCart } from "lucide-react";

export default function FeaturedServices({
  searchQuery = "",
  selectedCategory = "All",
  onSelectCategory = () => {},
  onAddToCart = () => {},
}) {
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

  const subCategories = [
    "All",
    "Wall Decor",
    "Ring Stand",
    "Room Decor",
    "Stage Backdrop",
    "Table/Car Decor",
  ];

  const products = [
    { id: "CLA595", title: "Rosegold Chrome Arch Birthday Decor", category: "Birthday", subCategory: "Wall Decor", price: 3499, originalPrice: 4999, discount: "30% OFF", rating: 4.8, image: "/images/birthday_decor.png" },
    { id: "CLA687", title: "Dreamy Pastel Floral Baby Shower", category: "Baby Shower", subCategory: "Room Decor", price: 5999, originalPrice: 7999, discount: "25% OFF", rating: 4.9, image: "/images/baby_shower_decor.png" },
    { id: "CLA587", title: "Royal Red Rose Canopy Decor", category: "Romantic", subCategory: "Ring Stand", price: 4499, originalPrice: 5999, discount: "25% OFF", rating: 4.8, image: "/images/anniversary_decor.png" },
    { id: "CLA612", title: "Whimsical Jungle Safari Kid's Birthday", category: "Birthday", subCategory: "Stage Backdrop", price: 7499, originalPrice: 9999, discount: "25% OFF", rating: 4.7, image: "/images/kids_birthday_decor.png" },
    { id: "CLA714", title: "Traditional Mango Leaf Threshold Decor", category: "Traditional", subCategory: "Wall Decor", price: 2499, originalPrice: 3499, discount: "28% OFF", rating: 4.8, image: "/images/house_warming_decor.png" },
    { id: "CLA729", title: "Surprise Bedroom Canopy Proposal Setup", category: "Romantic", subCategory: "Room Decor", price: 3999, originalPrice: 5499, discount: "27% OFF", rating: 4.9, image: "/images/anniversary_decor.png" },
    { id: "CLA803", title: "Showroom Grand Opening Balloon Arch", category: "Stage & Wedding", subCategory: "Stage Backdrop", price: 4999, originalPrice: 6999, discount: "28% OFF", rating: 4.6, image: "/images/stage_decor.png" },
    { id: "CLA850", title: "Luxury Orchid Car Bonnet Decoration", category: "Specialty", subCategory: "Table/Car Decor", price: 2999, originalPrice: 3999, discount: "25% OFF", rating: 4.7, image: "/images/car_decor.png" },
    { id: "CLA899", title: "Premium Golden Marigold Garland Stage", category: "Stage & Wedding", subCategory: "Stage Backdrop", price: 12999, originalPrice: 16999, discount: "23% OFF", rating: 4.9, image: "/images/stage_decor.png" },
    { id: "CLA910", title: "Cute Pet-Friendly Paw Birthday Decor", category: "Specialty", subCategory: "Wall Decor", price: 1999, originalPrice: 2999, discount: "33% OFF", rating: 4.8, image: "/images/pet_decor.png" },
    { id: "CLA942", title: "Sparkling Golden Lights Festival Decor", category: "Traditional", subCategory: "Room Decor", price: 3499, originalPrice: 4999, discount: "30% OFF", rating: 4.7, image: "/images/festival_decor.png" },
  ];

  const filteredProducts = products.filter((prod) => {
    if (searchQuery.trim() !== "") {
      return prod.title.toLowerCase().includes(searchQuery.toLowerCase());
    }
    const matchesCategory = selectedCategory === "All" || prod.category === selectedCategory;
    const matchesSubCategory = activeSubCategory === "All" || prod.subCategory === activeSubCategory;
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
    <section id="catalog-section" className="py-12 md:py-16 bg-white relative border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

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
              {categories.map((cat, idx) => {
                const isSelected = selectedCategory === cat.name;
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
            const isSelected = activeSubCategory === sub;
            return (
              <button
                key={sub}
                id={`subcat-chip-${sub.toLowerCase().replace(/\s/g, "-")}`}
                onClick={() => setActiveSubCategory(sub)}
                className={`flex-shrink-0 px-4 py-2 rounded-full border text-xs md:text-sm font-bold tracking-wide transition-all cursor-pointer font-sans ${
                  isSelected
                    ? "bg-brand-plum text-white border-brand-plum shadow-sm"
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
                    prod={prod}
                    isFavorite={favorites[prod.id]}
                    onToggleFavorite={toggleFavorite}
                    getWhatsAppLink={getWhatsAppLink}
                    onAddToCart={onAddToCart}
                    style={{ width: 165, flexShrink: 0 }}
                  />
                ))}
              </div>
            </div>

            {/* Desktop: 4-col grid with larger gap */}
            <div className="hidden md:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-2">
              {filteredProducts.map((prod, idx) => (
                <ProductCard
                  key={prod.id}
                  prod={prod}
                  isFavorite={favorites[prod.id]}
                  onToggleFavorite={toggleFavorite}
                  getWhatsAppLink={getWhatsAppLink}
                  onAddToCart={onAddToCart}
                  aos="fade-up"
                  aosDelay={(idx % 4) * 100}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="py-20 text-center max-w-md mx-auto space-y-4">
            <div className="inline-block p-4 bg-brand-gold/10 rounded-full border border-brand-gold/30">
              <Sparkles className="h-8 w-8 text-brand-gold animate-pulse" />
            </div>
            <h3 className="font-serif text-lg font-bold text-brand-plum">No decoration setups found</h3>
            <p className="text-xs sm:text-sm text-brand-plum/70 font-sans leading-relaxed">
              We couldn't find matches for "{searchQuery}" in this category. Try a different search or category!
            </p>
            <button
              onClick={() => onSelectCategory("All")}
              className="bg-brand-plum text-white border border-brand-plum px-6 py-2 rounded-full font-sans text-xs tracking-wider uppercase font-bold hover:bg-brand-gold hover:text-brand-plum hover:border-brand-gold transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}

         {/* ── View All CTA ── */}
         {filteredProducts.length > 0 && (
           <div className="flex justify-center pt-4" data-aos="fade-up" data-aos-delay="200">
             <a
               href="/services"
               className="flex items-center gap-2 border-2 border-brand-plum text-brand-plum hover:bg-brand-plum hover:text-white px-8 py-3 rounded-full font-sans font-bold text-sm transition-all duration-300"
             >
               View All Services
               <ChevronRight className="h-4 w-4" />
             </a>
           </div>
         )}

      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PRODUCT CARD — reusable
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function ProductCard({ prod, isFavorite, onToggleFavorite, getWhatsAppLink, onAddToCart = () => {}, style = {}, aos = "", aosDelay = "" }) {
  return (
    <div
      className="product-card flex flex-col overflow-hidden group"
      style={style}
      data-aos={aos || undefined}
      data-aos-delay={aosDelay || undefined}
    >
      {/* Image */}
      <div className="relative aspect-square w-full bg-gray-50 overflow-hidden flex-shrink-0">
        <img
          src={prod.image}
          alt={prod.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Discount badge */}
        {prod.discount && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-[9px] font-bold font-sans px-1.5 py-0.5 rounded shadow-sm">
            {prod.discount}
          </span>
        )}

        {/* Favorite button */}
        <button
          id={`fav-${prod.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(prod.id);
          }}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white border border-white/60 transition-colors shadow-sm cursor-pointer z-10"
          aria-label="Save to favorites"
        >
          <Heart
            className={`h-3.5 w-3.5 transition-transform duration-300 active:scale-125 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-300"
            }`}
          />
        </button>

        {/* Subcategory tag */}
        <span className="absolute bottom-2 left-2 bg-brand-plum/90 text-white text-[8px] font-bold font-sans px-1.5 py-0.5 rounded shadow-sm">
          {prod.subCategory}
        </span>
      </div>

      {/* Card body */}
      <div className="p-2.5 flex flex-col flex-grow gap-1">
        {/* Rating + ID */}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-0.5 bg-brand-gold/10 text-brand-plum text-[9px] font-bold font-sans px-1.5 py-0.5 rounded border border-brand-gold/20">
            <Star className="h-2.5 w-2.5 text-brand-gold fill-brand-gold" />
            {prod.rating}
          </span>
          <span className="text-[9px] text-brand-plum/40 font-sans">ID: {prod.id}</span>
        </div>

        {/* Title */}
        <h4 className="text-[11px] sm:text-xs font-serif font-bold text-brand-plum group-hover:text-brand-gold transition-colors leading-tight line-clamp-2 min-h-[28px]">
          {prod.title}
        </h4>

        {/* Price row */}
        <div className="flex items-baseline gap-1.5">
          <span className="text-sm font-black text-brand-gold font-sans">₹{prod.price.toLocaleString()}</span>
          {prod.originalPrice && (
            <span className="text-[9px] text-gray-400 line-through font-sans">₹{prod.originalPrice.toLocaleString()}</span>
          )}
        </div>

        {/* Dual Actions: Add to Cart + WhatsApp Enquiry */}
        <div className="flex gap-1.5 mt-auto pt-1">
          <button
            id={`add-to-cart-${prod.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(prod);
            }}
            className="flex-1 bg-brand-plum hover:bg-brand-gold text-white hover:text-brand-plum py-2 rounded-xl text-[9px] sm:text-[10px] font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer shadow-sm hover:shadow-md"
          >
            <ShoppingCart className="h-3.5 w-3.5 shrink-0" />
            <span>Add to Cart</span>
          </button>

          <a
            id={`enquire-${prod.id}`}
            href={getWhatsAppLink(prod)}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
            aria-label="Enquire on WhatsApp"
          >
            <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
