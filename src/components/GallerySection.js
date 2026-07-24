"use client";
import { useState, useEffect } from "react";
import { Sparkles, X, ZoomIn, Play, Film } from "lucide-react";
import { useApp } from "@/components/AppContext";

export default function GallerySection() {
  const { selectedCategory, galleryItems, openBookingModal } = useApp();
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxItem, setLightboxItem] = useState(null);

  useEffect(() => {
    if (selectedCategory) {
      let cat = selectedCategory;
      if (cat === "Birthday") cat = "Birthdays";
      if (cat === "Romantic") cat = "Anniversary";
      if (cat === "Traditional") cat = "House Warming";
      if (cat === "Specialty") cat = "Festive & Car";
      if (cat === "Stage & Wedding") cat = "Stages & Weddings";

      setActiveCategory(cat);
    }
  }, [selectedCategory]);

  const categories = [
    "All",
    "Birthdays",
    "Baby Welcome",
    "Kid's Party",
    "Anniversary",
    "Baby Shower",
    "Stages & Weddings",
    "House Warming",
    "Festive & Car"
  ];

  const filteredItems = (galleryItems || []).filter((item) => {
    if (activeCategory === "All") return true;
    return item.category === activeCategory;
  });

  return (
    <section id="gallery" className="py-6 md:py-8 bg-white relative border-t border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3" data-aos="fade-up">
          <div className="section-badge">
            <Sparkles className="h-4 w-4 text-brand-gold" />
            Decoration Portfolio
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-brand-plum leading-tight">
            Our Celebration <span className="text-gold-gradient italic">Gallery</span>
          </h2>
          <p className="text-brand-plum/60 font-sans text-sm sm:text-base">
            Explore real decoration setups created by Decor Dazzlers across Hyderabad.
          </p>
        </div>

        {/* Category Filters — Single row horizontal scroll on mobile */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 scroll-bar-remove border-b border-gray-100 pb-4 md:justify-center md:flex-wrap md:gap-3">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-full border text-xs md:text-sm font-bold tracking-wide transition-all cursor-pointer font-sans whitespace-nowrap ${
                  isSelected
                    ? "bg-brand-plum text-white border-brand-plum shadow-md scale-105"
                    : "bg-white text-brand-plum/70 border-gray-200 hover:border-brand-gold hover:text-brand-plum"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setLightboxItem(item)}
                className="group relative bg-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer aspect-[4/3]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Video Indicator Badge */}
                {item.type === "video" && (
                  <div className="absolute top-3 left-3 bg-red-600/90 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-1 rounded-full flex items-center space-x-1 shadow-md font-sans">
                    <Film className="h-3 w-3" />
                    <span>Reel</span>
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[9px] font-bold px-2 py-0.5 rounded-md uppercase font-sans">
                  {item.category}
                </div>

                {/* Overlay with Play or Zoom Icon */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-plum/90 via-brand-plum/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <div className="flex items-center space-x-2 text-white mb-1">
                    {item.type === "video" ? (
                      <div className="p-2 bg-brand-gold rounded-full text-brand-plum">
                        <Play className="h-4 w-4 fill-current ml-0.5" />
                      </div>
                    ) : (
                      <div className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white">
                        <ZoomIn className="h-4 w-4" />
                      </div>
                    )}
                    <span className="text-xs font-bold font-sans line-clamp-1">{item.title}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-150">
            <p className="text-sm font-bold text-brand-plum/70 font-sans">
              No photos or reels available for "{activeCategory}".
            </p>
            <button
              onClick={() => setActiveCategory("All")}
              className="mt-3 text-xs font-bold text-brand-gold underline font-sans cursor-pointer"
            >
              View All Photos
            </button>
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="relative max-w-4xl w-full bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col max-h-[90vh]">
            
            {/* Close Button */}
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black text-white rounded-full transition-colors cursor-pointer"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Media Area */}
            <div className="flex-1 overflow-hidden flex items-center justify-center bg-black min-h-[300px]">
              {lightboxItem.type === "video" && lightboxItem.videoUrl ? (
                <video
                  src={lightboxItem.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full max-h-[70vh] object-contain"
                />
              ) : (
                <img
                  src={lightboxItem.image}
                  alt={lightboxItem.title}
                  className="w-full h-full max-h-[70vh] object-contain"
                />
              )}
            </div>

            {/* Caption */}
            <div className="p-4 bg-brand-plum text-white flex items-center justify-between border-t border-white/10">
              <div>
                <span className="text-[10px] text-brand-gold font-bold uppercase tracking-wider font-sans">
                  {lightboxItem.category} • {lightboxItem.type === "video" ? "Video Reel" : "Setup Photo"}
                </span>
                <h3 className="text-sm font-bold font-sans mt-0.5">{lightboxItem.title}</h3>
              </div>
              <button
                onClick={() => {
                  const item = lightboxItem;
                  setLightboxItem(null);
                  openBookingModal(item);
                }}
                className="bg-brand-gold hover:bg-brand-gold/90 text-brand-plum px-4 py-2 rounded-xl text-xs font-bold font-sans transition-all cursor-pointer"
              >
                Book This Setup
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
