"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Calendar, ArrowRight } from "lucide-react";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    "/images/hero_slide_1.png",
    "/images/hero_slide_2.png",
    "/images/hero_slide_3.png",
    "/images/hero_slide_4.png",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2000); // 2 seconds transition!
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden min-h-[85vh] flex items-center pt-2 pb-16">
      {/* Slideshow background */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={slide}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide}
              alt={`Luxury Celebration Backdrop ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>



      {/* Decorative Glow Blurs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-brand-gold/15 rounded-full blur-3xl animate-pulse z-15" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-rosegold/15 rounded-full blur-3xl animate-pulse z-15" />

      {/* Custom CSS Floating Balloons */}
      <div className="absolute top-1/4 left-[8%] hidden md:block animate-balloon-float-1 pointer-events-none z-20">
        <div className="w-12 h-16 bg-gradient-to-t from-brand-rosegold to-brand-pink rounded-t-full rounded-b-[45%] relative shadow-lg">
          <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-b-[6px] border-l-transparent border-r-transparent border-b-brand-rosegold" />
          <div className="absolute bottom-[-26px] left-1/2 w-[1px] h-5 bg-brand-rosegold/60" />
        </div>
      </div>
      <div className="absolute top-[15%] right-[10%] hidden md:block animate-balloon-float-2 pointer-events-none z-20">
        <div className="w-14 h-18 bg-gradient-to-t from-brand-gold to-brand-pink/50 rounded-t-full rounded-b-[45%] relative shadow-lg">
          <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-b-[6px] border-l-transparent border-r-transparent border-b-brand-gold" />
          <div className="absolute bottom-[-26px] left-1/2 w-[1px] h-5 bg-brand-gold/60" />
        </div>
      </div>
      <div className="absolute bottom-1/4 left-[15%] hidden md:block animate-balloon-float-3 pointer-events-none z-20">
        <div className="w-10 h-14 bg-gradient-to-t from-brand-plum/40 to-brand-rosegold rounded-t-full rounded-b-[45%] relative shadow-lg">
          <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-b-[6px] border-l-transparent border-r-transparent border-b-brand-rosegold" />
          <div className="absolute bottom-[-26px] left-1/2 w-[1px] h-5 bg-brand-rosegold/60" />
        </div>
      </div>

      {/* Sparkle Particles */}
      <div className="absolute top-[20%] left-[25%] animate-sparkle-glow pointer-events-none z-20">
        <Sparkles className="h-6 w-6 text-brand-gold" />
      </div>
      <div className="absolute bottom-[30%] right-[25%] animate-sparkle-glow pointer-events-none z-20" style={{ animationDelay: "1.5s" }}>
        <Sparkles className="h-5 w-5 text-brand-rosegold" />
      </div>

      {/* Corner Flower Decorative SVG elements */}
      <div className="absolute top-0 right-0 w-48 h-48 opacity-15 pointer-events-none hidden lg:block z-20">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-brand-plum">
          <path d="M100,0 C80,10 60,30 50,50 C40,70 30,90 0,100 C20,90 40,70 50,50 C60,30 80,10 100,0 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Tagline */}
          <div className="inline-flex items-center space-x-2 bg-white/15 border border-white/25 px-4 py-2 rounded-full backdrop-blur-sm shadow-sm animate-bounce" data-aos="fade-down">
            <Sparkles className="h-4 w-4 text-brand-gold animate-spin" style={{ animationDuration: '3s' }} />
            <span className="text-xs uppercase tracking-widest font-sans font-bold text-white">
              Decor Dazzlers Studio
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight drop-shadow-md" data-aos="fade-up" data-aos-delay="100">
            Transforming Celebrations Into <span className="text-white block sm:inline font-serif italic">Magical Memories</span>
          </h1>

          {/* Subheadline */}
          <p className="text-sm sm:text-base md:text-lg font-sans text-white max-w-2xl mx-auto leading-relaxed bg-brand-plum/30 backdrop-blur-[2px] rounded-2xl p-4 inline-block shadow-lg border border-white/10" data-aos="fade-up" data-aos-delay="200">
            Step into a world of elegance. We craft bespoke, premium, and festive decorations tailored perfectly to capture the emotion of your special day.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2" data-aos="fade-up" data-aos-delay="300">
            <Link
              href="/contact"
              className="w-full sm:w-auto bg-gold-gradient text-brand-plum px-8 py-3.5 rounded-full font-sans text-xs tracking-wider uppercase font-bold shadow-lg hover:shadow-xl gold-glow-hover transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
            >
              <Calendar className="h-4 w-4 shrink-0" />
              <span>Book Now</span>
            </Link>
            
            <Link
              href="/services"
              className="w-full sm:w-auto bg-brand-cream/90 text-brand-plum hover:text-brand-cream border border-brand-rosegold px-8 py-3.5 rounded-full font-sans text-xs tracking-wider uppercase font-bold hover:bg-brand-plum hover:border-brand-plum shadow-md transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
            >
              <span>Explore Our Services</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
