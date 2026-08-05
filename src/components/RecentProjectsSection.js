"use client";
import { useState } from "react";
import Link from "next/link";
import { Sparkles, Play, Image as ImageIcon, Video, ArrowRight, X } from "lucide-react";
import { useApp } from "@/components/AppContext";

const fallbackPreviewProjects = [
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
    id: "proj-5",
    title: "Jungle Safari Kids Birthday Theme Walkthrough",
    type: "video",
    image: "/images/kids_birthday_decor.png",
    videoUrl: "/hero_video.mp4",
  },
];

export default function RecentProjectsSection() {
  const { galleryItems } = useApp();
  const [activeMediaModal, setActiveMediaModal] = useState(null);

  let displayedProjects = fallbackPreviewProjects;

  if (galleryItems && galleryItems.length > 0) {
    const photos = galleryItems.filter((i) => i.type === "photo" || i.type === "image").slice(0, 2);
    const videos = galleryItems.filter((i) => i.type === "video").slice(0, 2);
    const combined = [...photos, ...videos];
    if (combined.length > 0) {
      displayedProjects = combined;
    }
  }

  return (
    <section className="py-8 md:py-14 lg:py-16 bg-brand-cream relative border-t border-brand-rosegold/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* ── Section Header ── */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="section-badge">
            <Sparkles className="h-4 w-4 text-brand-gold" />
            Live Setup Showcase
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-brand-plum leading-tight">
            Our Recent <span className="text-gold-gradient italic">Projects</span>
          </h2>
          <p className="text-brand-plum/60 font-sans text-sm sm:text-base">
            Take a look at real event setups executed by our background-verified decorators across Hyderabad.
          </p>
        </div>

        {/* ── 2 Photos & 2 Videos Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          {displayedProjects.map((project) => (
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

              {/* Title Only */}
              <div className="p-3">
                <h3 className="text-sm font-bold text-brand-plum font-sans leading-snug line-clamp-2 group-hover:text-brand-gold transition-colors">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* ── View More Button Redirecting to /recent-projects ── */}
        <div className="text-center pt-4">
          <Link
            href="/recent-projects"
            className="inline-flex items-center gap-2 bg-brand-plum hover:bg-[#5C2F48] text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-wider px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <span>View More Projects</span>
            <ArrowRight className="h-4 w-4 text-brand-gold" />
          </Link>
        </div>

      </div>

      {/* ── Modal Lightbox for Preview ── */}
      {activeMediaModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
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
    </section>
  );
}
