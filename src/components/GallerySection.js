"use client";
import { useState } from "react";
import { Sparkles, X, ZoomIn } from "lucide-react";

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState(null);

  const categories = ["All", "Birthdays", "Stages", "Baby Showers", "Festive & Car"];

  const galleryItems = [
    {
      id: 1,
      category: "Birthdays",
      title: "Golden Balloon Bliss",
      image: "/images/birthday_decor.png",
    },
    {
      id: 2,
      category: "Stages",
      title: "Royal Wedding Garland Stage",
      image: "/images/stage_decor.png",
    },
    {
      id: 3,
      category: "Baby Showers",
      title: "Dreamy Clouds Welcome Setup",
      image: "/images/baby_shower_decor.png",
    },
    {
      id: 4,
      category: "Birthdays",
      title: "Luxury Kids Theme Arch",
      image: "/images/kids_birthday_decor.png",
    },
    {
      id: 5,
      category: "Stages",
      title: "Rose Gold Canopy Walkway",
      image: "/images/anniversary_decor.png",
    },
    {
      id: 6,
      category: "Festive & Car",
      title: "Premium Showroom Sparkle Setup",
      image: "/images/festival_decor.png",
    },
    {
      id: 7,
      category: "Baby Showers",
      title: "Garden Flower Carousel Theme",
      image: "/images/welcome_baby_decor.png",
    },
    {
      id: 8,
      category: "Festive & Car",
      title: "Traditional Welcome Setup",
      image: "/images/house_warming_decor.png",
    },
  ];

  const filteredItems =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <section className="py-24 bg-brand-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
          <div className="inline-flex items-center space-x-2 bg-brand-pink border border-brand-rosegold/30 px-4 py-1.5 rounded-full mb-4">
            <Sparkles className="h-4 w-4 text-brand-gold" />
            <span className="text-xs uppercase tracking-widest font-sans font-bold text-brand-plum">
              Visual Splendor
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-plum mb-6 leading-tight">
            Our Celebration <span className="text-gold-gradient italic">Gallery</span>
          </h2>
          <p className="text-brand-plum/80 font-sans max-w-xl mx-auto text-sm sm:text-base">
            Browse through real photographs of event decorations we completed, illustrating visual excellence and festive magic.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-12" data-aos="fade-up">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 font-sans ${
                activeCategory === cat
                  ? "bg-brand-plum text-brand-cream shadow-md"
                  : "bg-white text-brand-plum hover:bg-brand-pink/40 border border-brand-rosegold/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-Style Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="break-inside-avoid bg-white rounded-2xl overflow-hidden shadow-sm border border-brand-rosegold/10 group cursor-pointer relative"
              onClick={() => setLightboxImage(item)}
              data-aos="zoom-in"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-brand-plum/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-brand-gold text-[10px] tracking-widest uppercase font-sans font-semibold mb-1">
                  {item.category}
                </span>
                <h3 className="text-white text-base font-serif font-bold tracking-wide">
                  {item.title}
                </h3>
                <div className="absolute top-4 right-4 bg-white/20 p-2 rounded-full backdrop-blur-sm border border-white/25 scale-75 group-hover:scale-100 transition-transform duration-300">
                  <ZoomIn className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-plum/95 backdrop-blur-md p-4 animate-fade-in">
          {/* Close trigger */}
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 text-brand-cream hover:text-brand-gold p-3 focus:outline-none bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300"
            aria-label="Close Preview"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Modal content */}
          <div
            className="relative max-w-4xl max-h-[80vh] overflow-hidden rounded-2xl border border-brand-gold/30 shadow-2xl flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImage.image}
              alt={lightboxImage.title}
              className="max-w-full max-h-[70vh] object-contain rounded-t-2xl"
            />
            <div className="bg-brand-plum text-brand-cream w-full px-6 py-4 text-center border-t border-brand-gold/20">
              <span className="text-brand-gold text-xs uppercase tracking-widest font-sans font-semibold">
                {lightboxImage.category}
              </span>
              <h4 className="text-xl font-serif font-bold text-brand-cream mt-1">
                {lightboxImage.title}
              </h4>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
