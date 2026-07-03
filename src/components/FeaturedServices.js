"use client";
import { useState, useEffect } from "react";
import { Sparkles, Star, ShoppingCart, MessageCircle, Heart } from "lucide-react";

export default function FeaturedServices({ 
  searchQuery = "", 
  selectedCategory = "All", 
  onSelectCategory = () => {},
  onAddToCart = () => {} 
}) {
  const [activeSubCategory, setActiveSubCategory] = useState("All");
  const [favorites, setFavorites] = useState({});

  // Category Tabs (Ebo-style Category tab list)
  const categories = [
    { name: "All", label: "All Categories", image: "/images/hero_slide_1.png" },
    { name: "Birthday", label: "Birthdays", image: "/images/birthday_decor.png" },
    { name: "Romantic", label: "Romantic", image: "/images/anniversary_decor.png" },
    { name: "Baby Shower", label: "Baby Shower", image: "/images/baby_shower_decor.png" },
    { name: "Stage & Wedding", label: "Weddings", image: "/images/stage_decor.png" },
    { name: "Traditional", label: "Traditional", image: "/images/house_warming_decor.png" },
    { name: "Specialty", label: "Specialty", image: "/images/car_decor.png" }
  ];

  // Subcategory shapes (Ebo-style subcategory scrolling chip list)
  const subCategories = [
    "All",
    "Wall Decor",
    "Ring Stand",
    "Room Decor",
    "Stage Backdrop",
    "Table/Car Decor"
  ];

  // Concrete Event Decoration products (Ebo-style details & badging)
  const products = [
    {
      id: "CLA595",
      title: "Rosegold Chrome Arch Birthday Decor",
      category: "Birthday",
      subCategory: "Wall Decor",
      price: 3499,
      originalPrice: 4999,
      discount: "30% OFF",
      rating: 4.8,
      image: "/images/birthday_decor.png"
    },
    {
      id: "CLA687",
      title: "Dreamy Pastel Floral Baby Shower",
      category: "Baby Shower",
      subCategory: "Room Decor",
      price: 5999,
      originalPrice: 7999,
      discount: "25% OFF",
      rating: 4.9,
      image: "/images/baby_shower_decor.png"
    },
    {
      id: "CLA587",
      title: "Royal Red Rose Canopy Decor",
      category: "Romantic",
      subCategory: "Ring Stand",
      price: 4499,
      originalPrice: 5999,
      discount: "25% OFF",
      rating: 4.8,
      image: "/images/anniversary_decor.png"
    },
    {
      id: "CLA612",
      title: "Whimsical Jungle Safari Kid's Birthday",
      category: "Birthday",
      subCategory: "Stage Backdrop",
      price: 7499,
      originalPrice: 9999,
      discount: "25% OFF",
      rating: 4.7,
      image: "/images/kids_birthday_decor.png"
    },
    {
      id: "CLA714",
      title: "Traditional Mango Leaf Threshold Decor",
      category: "Traditional",
      subCategory: "Wall Decor",
      price: 2499,
      originalPrice: 3499,
      discount: "28% OFF",
      rating: 4.8,
      image: "/images/house_warming_decor.png"
    },
    {
      id: "CLA729",
      title: "Surprise Bedroom Canopy Proposal Setup",
      category: "Romantic",
      subCategory: "Room Decor",
      price: 3999,
      originalPrice: 5499,
      discount: "27% OFF",
      rating: 4.9,
      image: "/images/anniversary_decor.png"
    },
    {
      id: "CLA803",
      title: "Showroom Grand Opening Entrance Balloon Arch",
      category: "Corporate",
      subCategory: "Stage Backdrop",
      price: 4999,
      originalPrice: 6999,
      discount: "28% OFF",
      rating: 4.6,
      image: "/images/birthday_decor.png"
    },
    {
      id: "CLA850",
      title: "Luxury Orchid Car Bonnet Decoration",
      category: "Specialty",
      subCategory: "Table/Car Decor",
      price: 2999,
      originalPrice: 3999,
      discount: "25% OFF",
      rating: 4.7,
      image: "/images/car_decor.png"
    },
    {
      id: "CLA899",
      title: "Premium Golden Marigold Garland Stage",
      category: "Stage & Wedding",
      subCategory: "Stage Backdrop",
      price: 12999,
      originalPrice: 16999,
      discount: "23% OFF",
      rating: 4.9,
      image: "/images/stage_decor.png"
    },
    {
      id: "CLA910",
      title: "Cute Pet-Friendly Paw Birthday Decor",
      category: "Specialty",
      subCategory: "Wall Decor",
      price: 1999,
      originalPrice: 2999,
      discount: "33% OFF",
      rating: 4.8,
      image: "/images/pet_decor.png"
    },
    {
      id: "CLA942",
      title: "Sparkling Golden Lights Festival Decor",
      category: "Traditional",
      subCategory: "Room Decor",
      price: 3499,
      originalPrice: 4999,
      discount: "30% OFF",
      rating: 4.7,
      image: "/images/festival_decor.png"
    }
  ];

  // Dynamically filter products based on active filters and Navbar search query
  const filteredProducts = products.filter((prod) => {
    // 1. Search Query filter (case-insensitive title matching)
    if (searchQuery.trim() !== "") {
      return prod.title.toLowerCase().includes(searchQuery.toLowerCase());
    }

    // 2. Category Tab filter
    const matchesCategory = selectedCategory === "All" || prod.category === selectedCategory;

    // 3. Subcategory Chip filter
    const matchesSubCategory = activeSubCategory === "All" || prod.subCategory === activeSubCategory;

    return matchesCategory && matchesSubCategory;
  });

  const toggleFavorite = (id) => {
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getWhatsAppLink = (product) => {
    const text = `Hello Decor Dazzlers! I am interested in booking the "${product.title}" (ID: ${product.id}) setup. Please share package details and availability!`;
    return `https://wa.me/917075555987?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="catalog-section" className="py-16 bg-brand-cream relative border-t border-brand-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 bg-brand-rosegold/10 border border-brand-rosegold/20 px-4 py-1.5 rounded-full">
            <Sparkles className="h-4 w-4 text-brand-gold" />
            <span className="text-xs uppercase tracking-widest font-sans font-bold text-brand-plum">
              Live Event Catalog
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-brand-plum leading-tight">
            Trending <span className="text-gold-gradient italic">Decoration Themes</span>
          </h2>
          <p className="text-brand-plum/70 font-sans text-xs sm:text-sm">
            Select categories and design layouts. Setup completed by background-verified decorators.
          </p>
        </div>

        {/* 1. Explore at a Glance Categories Tab Row (Ebo horizontal categories) */}
        <div className="space-y-2">
          <h3 className="text-left font-serif text-xs uppercase tracking-wider font-extrabold text-brand-plum/60 flex items-center gap-1.5 pl-1">
            <Sparkles className="h-3.5 w-3.5 text-brand-gold fill-brand-gold" />
            Explore at a Glance
          </h3>
          <div className="flex items-center gap-3 overflow-x-auto py-3 px-1 scroll-bar-remove">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => {
                    onSelectCategory(cat.name);
                    setActiveSubCategory("All"); // Reset subcategory filters on main category change
                  }}
                  className={`flex-shrink-0 flex flex-col items-center p-3 w-28 md:w-36 h-32 md:h-40 rounded-2xl border text-center transition-all cursor-pointer select-none ${
                    isSelected
                      ? "bg-white border-brand-gold shadow-md scale-105"
                      : "bg-gradient-to-b from-white/80 to-white/40 border-brand-rosegold/10 hover:border-brand-gold"
                  }`}
                >
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className="w-16 md:w-24 h-16 md:h-24 rounded-xl md:rounded-2xl object-cover shadow-sm"
                  />
                  <span className="text-xs md:text-sm font-sans font-bold mt-2 md:mt-3 leading-tight text-brand-plum truncate w-full">
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Subcategory shapes (Ebo horizontal shapes) */}
        <div className="flex items-center gap-2 overflow-x-auto py-2 px-1 scroll-bar-remove border-b border-brand-gold/10">
          {subCategories.map((sub) => {
            const isSelected = activeSubCategory === sub;
            return (
              <button
                key={sub}
                onClick={() => setActiveSubCategory(sub)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full border text-xs font-sans font-bold tracking-wide transition-all cursor-pointer ${
                  isSelected
                    ? "bg-brand-plum text-brand-cream border-brand-plum shadow-md"
                    : "bg-white text-brand-plum/70 border-brand-rosegold/10 hover:border-brand-gold hover:text-brand-plum"
                }`}
              >
                {sub}
              </button>
            );
          })}
        </div>

        {/* 3. Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pt-4">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-2xl border border-brand-rosegold/10 hover:border-brand-gold/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
              >
                
                {/* Image Container with Badges */}
                <div className="relative aspect-square w-full bg-brand-cream overflow-hidden">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Favorite button (Like button) */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(prod.id);
                    }}
                    className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/70 hover:bg-white border border-white/80 text-brand-plum/40 hover:text-red-500 transition-colors shadow-sm cursor-pointer z-10"
                    aria-label="Save Favorite"
                  >
                    <Heart 
                      className={`h-4 w-4 transition-transform duration-300 active:scale-125 ${
                        favorites[prod.id] ? "fill-red-500 text-red-500" : ""
                      }`} 
                    />
                  </button>

                  {/* Subcategory Label tag */}
                  <span className="absolute bottom-2.5 left-2.5 bg-brand-plum text-brand-cream text-[9px] font-sans font-bold px-2 py-0.5 rounded shadow-sm border border-brand-gold/10">
                    {prod.subCategory}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-3 sm:p-4 flex flex-col flex-grow text-left space-y-2">
                  
                  {/* Rating & ID row */}
                  <div className="flex items-center justify-between text-[10px] font-sans text-brand-plum/60 font-bold">
                    <span className="bg-brand-gold/15 text-brand-plum px-1.5 py-0.5 rounded flex items-center space-x-0.5 border border-brand-gold/30">
                      <Star className="h-3 w-3 text-brand-gold fill-brand-gold shrink-0" />
                      <span>{prod.rating}</span>
                    </span>
                    <span>ID: {prod.id}</span>
                  </div>

                  {/* Title */}
                  <h4 className="text-xs sm:text-sm font-serif font-bold text-brand-plum group-hover:text-brand-gold transition-colors leading-tight line-clamp-2 min-h-[32px] sm:min-h-[40px]">
                    {prod.title}
                  </h4>

                  {/* Action Buttons */}
                  <div className="pt-2">
                    {/* WhatsApp Enquiry Button */}
                    <a
                      href={getWhatsAppLink(prod)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-brand-plum hover:bg-gold-gradient text-brand-cream hover:text-brand-plum border border-brand-plum hover:border-brand-gold py-2.5 rounded-xl text-xs font-sans font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center space-x-1.5 cursor-pointer shadow-sm hover:shadow-md"
                    >
                      <MessageCircle className="h-4 w-4 shrink-0" />
                      <span>Enquire Now</span>
                    </a>
                  </div>

                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Search results state */
          <div className="py-20 text-center max-w-md mx-auto space-y-4">
            <div className="inline-block p-4 bg-brand-gold/15 rounded-full border border-brand-gold/30">
              <Sparkles className="h-8 w-8 text-brand-gold animate-pulse" />
            </div>
            <h3 className="font-serif text-lg font-bold text-brand-plum">No decoration setups found</h3>
            <p className="text-xs sm:text-sm text-brand-plum/70 font-sans leading-relaxed">
              We couldn't find matches for "{searchQuery}" in this category. Try cleaning your search query or choosing another tab!
            </p>
            <button
              onClick={() => onSelectCategory("All")}
              className="bg-brand-plum text-brand-cream border border-brand-plum px-6 py-2 rounded-full font-sans text-xs tracking-wider uppercase font-bold hover:bg-brand-gold hover:text-brand-plum hover:border-brand-gold transition-all"
            >
              Reset Catalog Filter
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
