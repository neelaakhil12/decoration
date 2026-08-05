"use client";
import { useState } from "react";
import { Sparkles, Play, Image as ImageIcon, Video, X } from "lucide-react";
import { useApp } from "@/components/AppContext";

const fallbackProjectsData = [
  {
    id: "proj-1",
    title: "Pastel Balloon Arch & Neon Backdrop Setup",
    type: "photo",
    image: "/images/birthday_decor.png",
  },
  {
    id: "proj-2",
    title: "Royal Golden Ring Stand Wedding Stage",
    type: "video",
    image: "/images/stage_decor.png",
    videoUrl: "/hero_video.mp4",
  },
  {
    id: "proj-3",
    title: "Cozy Satin Canopy & Candlelight Setup",
    type: "photo",
    image: "/images/anniversary_decor.png",
  },
  {
    id: "proj-4",
    title: "Dreamy Baby Welcome Home Entrance",
    type: "photo",
    image: "/images/welcome_baby_decor.png",
  },
  {
    id: "proj-5",
    title: "Jungle Safari Kids Birthday Theme Walkthrough",
    type: "video",
    image: "/images/kids_birthday_decor.png",
    videoUrl: "/hero_video.mp4",
  },
  {
    id: "proj-6",
    title: "Traditional Marigold & Brass House Warming",
    type: "photo",
    image: "/images/house_warming_decor.png",
  },
  {
    id: "proj-7",
    title: "Luxury Showroom Grand Opening Setup",
    type: "video",
    image: "/images/car_decor.png",
    videoUrl: "/hero_video.mp4",
  },
  {
    id: "proj-8",
    title: "Pastel Cloud Baby Shower Canopy",
    type: "photo",
    image: "/images/baby_shower_decor.png",
  }
];

export default function RecentProjectsPage() {
  const { galleryItems } = useApp();
  const [selectedMediaType, setSelectedMediaType] = useState("photo");
  const [activeMediaModal, setActiveMediaModal] = useState(null);

  const activeItems = (galleryItems && galleryItems.length > 0)
    ? galleryItems
    : fallbackProjectsData;

  const filteredProjects = activeItems.filter((item) => {
    const itemType = item.type === "image" ? "photo" : item.type;
    return itemType === selectedMediaType;
  });

  return (
    <div className="bg-brand-cream min-h-screen pb-16">
      {/* ── Page Header Banner ── */}
      <section className="relative overflow-hidden bg-brand-plum text-brand-cream py-12 md:py-16">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-rosegold/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-brand-gold/10 border border-brand-gold/20 px-4 py-1.5 rounded-full">
            <Sparkles className="h-4 w-4 text-brand-gold" />
            <span className="text-xs uppercase tracking-widest font-sans font-bold text-brand-cream">
              Live Showcase
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-black text-brand-cream leading-tight">
            Our Recent <span className="text-gold-gradient italic">Projects</span>
          </h1>
          <p className="text-brand-pink/80 font-sans max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Browse our real decoration setup photos and live setup video reels.
          </p>
        </div>
      </section>

      {/* ── Media Filter Tabs (Photos / Videos) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <div className="flex items-center justify-center gap-3">
          {[
            { id: "photo", label: "Photos 📸", icon: ImageIcon },
            { id: "video", label: "Setup Videos 🎥", icon: Video },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = selectedMediaType === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedMediaType(tab.id)}
                className={`px-8 py-3 rounded-full text-sm md:text-base font-extrabold tracking-wide transition-all cursor-pointer font-sans flex items-center gap-2.5 ${
                  isSelected
                    ? "bg-brand-plum text-white shadow-lg scale-105"
                    : "bg-white text-brand-plum/70 border border-gray-200 hover:border-brand-gold hover:text-brand-plum"
                }`}
              >
                <Icon className={`h-5 w-5 ${isSelected ? "text-brand-gold" : "text-brand-plum/50"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Project Showcase Grid ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setActiveMediaModal(project)}
                className="bg-white rounded-3xl border border-gray-150 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer p-2.5"
              >
                {/* Image / Video Thumbnail */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Play Button Overlay if Video */}
                  {project.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-brand-gold/90 text-brand-plum flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 border-2 border-white">
                        <Play className="h-5 w-5 fill-brand-plum text-brand-plum ml-1" />
                      </div>
                    </div>
                  )}

                  {/* Badge */}
                  <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-white/20 font-sans">
                    {project.type === "video" ? (
                      <>
                        <Video className="h-3 w-3 text-red-400" />
                        <span>VIDEO</span>
                      </>
                    ) : (
                      <>
                        <ImageIcon className="h-3 w-3 text-brand-gold" />
                        <span>PHOTO</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Card Title Only */}
                <div className="p-3">
                  <h3 className="text-sm font-bold text-brand-plum font-sans leading-snug line-clamp-2 group-hover:text-brand-gold transition-colors">
                    {project.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-200">
            <p className="text-base font-bold text-brand-plum/70 font-sans">
              No items available in this category.
            </p>
          </div>
        )}
      </section>

      {/* ── Modal Lightbox for Full Photo / Video View ── */}
      {activeMediaModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-150 bg-brand-cream">
              <h3 className="text-base font-serif font-bold text-brand-plum">
                {activeMediaModal.title}
              </h3>
              <button
                onClick={() => setActiveMediaModal(null)}
                className="p-2 rounded-full bg-white border border-gray-200 text-brand-plum hover:bg-brand-plum hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content — Photo or Video */}
            <div className="relative bg-black flex-grow flex items-center justify-center min-h-[300px] max-h-[70vh] overflow-hidden">
              {activeMediaModal.type === "video" ? (
                <video
                  src={activeMediaModal.videoUrl || "/hero_video.mp4"}
                  controls
                  autoPlay
                  className="w-full h-full object-contain max-h-[70vh]"
                />
              ) : (
                <img
                  src={activeMediaModal.image}
                  alt={activeMediaModal.title}
                  className="w-full h-full object-contain max-h-[70vh]"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
