"use client";
import { useState } from "react";
import { Sparkles, X, ZoomIn } from "lucide-react";

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState(null);

  const categories = ["All", "Birthdays", "Stages", "Baby Showers", "Festive & Car"];

  const galleryItems = [
    { id: 1, category: "Birthdays", title: "Golden Balloon Bliss", image: "/images/birthday_decor.png" },
    { id: 2, category: "Stages", title: "Royal Wedding Stage", image: "/images/stage_decor.png" },
    { id: 3, category: "Baby Showers", title: "Dreamy Clouds Welcome Setup", image: "/images/baby_shower_decor.png" },
    { id: 4, category: "Birthdays", title: "Luxury Kids Theme Arch", image: "/images/kids_birthday_decor.png" },
    { id: 5, category: "Stages", title: "Rose Gold Canopy Walkway", image: "/images/anniversary_decor.png" },
    { id: 6, category: "Festive & Car", title: "Premium Showroom Setup", image: "/images/festival_decor.png" },
    { id: 7, category: "Baby Showers", title: "Garden Flower Carousel Theme", image: "/images/welcome_baby_decor.png" },
    { id: 8, category: "Festive & Car", title: "Traditional Welcome Setup", image: "/images/house_warming_decor.png" },
  ];

  const filteredItems =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="py-12 bg-white relative border-t border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* ── Header ── */}
        <div className="text-center max-w-xl mx-auto space-y-2" data-aos="fade-up">
          <div className="section-badge">
            <Sparkles className="h-3.5 w-3.5 text-brand-gold fill-brand-gold" />
            Visual Portfolio
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-brand-plum leading-tight">
            Our Celebration <span className="text-gold-gradient italic">Gallery</span>
          </h2>
          <p className="text-brand-plum/60 font-sans text-xs sm:text-sm">
            Browse through real photographs of decoration setups we completed across Hyderabad.
          </p>
        </div>

        {/* ── Filter Buttons ── */}
        <div className="flex flex-wrap justify-center items-center gap-2" data-aos="fade-up" data-aos-delay="100">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-300 font-sans ${
                activeCategory === cat
                  ? "bg-brand-plum text-white shadow-sm"
                  : "bg-white text-brand-plum hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Grid ── */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 pt-2">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              className="break-inside-avoid bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group cursor-pointer relative"
              onClick={() => setLightboxImage(item)}
              data-aos="fade-up"
              data-aos-delay={(idx % 4) * 100}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-brand-plum/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span className="text-brand-gold text-[9px] tracking-widest uppercase font-sans font-black mb-0.5">
                  {item.category}
                </span>
                <h3 className="text-white text-xs font-sans font-black tracking-wide">
                  {item.title}
                </h3>
                <div className="absolute top-3 right-3 bg-white/20 p-1.5 rounded-full backdrop-blur-sm border border-white/25 scale-75 group-hover:scale-100 transition-transform duration-300">
                  <ZoomIn className="h-3.5 w-3.5 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 text-white hover:text-brand-gold p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>

          <div
            className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl border border-white/10 shadow-2xl flex flex-col items-center bg-[#1a1a2e]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImage.image}
              alt={lightboxImage.title}
              className="max-w-full max-h-[70vh] object-contain"
            />
            <div className="bg-brand-plum text-white w-full px-6 py-4 text-center border-t border-brand-gold/20">
              <span className="text-brand-gold text-xs uppercase tracking-widest font-sans font-semibold">
                {lightboxImage.category}
              </span>
              <h4 className="text-lg font-serif font-bold text-white mt-1">
                {lightboxImage.title}
              </h4>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
