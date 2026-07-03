"use client";
import { useState, useEffect } from "react";
import { Sparkles, ArrowRight, Star } from "lucide-react";

export default function Hero({ onSelectCategory = () => {} }) {
  const [celebrationIndex, setCelebrationIndex] = useState(0);
  const [activeBanner, setActiveBanner] = useState(0);

  const celebrations = [
    "Birthday 🎂",
    "Anniversary 💍",
    "Kid's Party 🎈",
    "Baby Shower 🍼",
    "Welcome Baby 👶",
    "Festival Decor 🪔"
  ];

  const promotionalBanners = [
    {
      title: "15% OFF First Order",
      desc: "Transform your home with premium balloon layouts.",
      image: "/images/promo_banner_1.png",
      tag: "Limited Offer",
      badge: "Save 15%"
    },
    {
      title: "90-Min Same Day Delivery",
      desc: "Instant decorations across major metro networks.",
      image: "/images/promo_banner_2.png",
      tag: "Express Setup",
      badge: "Fast Delivery"
    },
    {
      title: "Custom Dream Themes",
      desc: "Tell our luxury decorators your unique vision.",
      image: "/images/promo_banner_3.png",
      tag: "Bespoke Art",
      badge: "Premium"
    }
  ];

  const categories = [
    { name: "Birthday Decor", key: "Birthday", image: "/images/birthday_decor.png", span: "col-span-2", aspect: "aspect-[2/1]" },
    { name: "Baby Welcome", key: "Baby Shower", image: "/images/welcome_baby_decor.png", span: "col-span-2", aspect: "aspect-[2/1]" },
    { name: "Kid's Party", key: "Birthday", image: "/images/kids_birthday_decor.png", span: "col-span-1", aspect: "aspect-square" },
    { name: "Anniversary", key: "Romantic", image: "/images/anniversary_decor.png", span: "col-span-1", aspect: "aspect-square" },
    { name: "Baby Shower", key: "Baby Shower", image: "/images/baby_shower_decor.png", span: "col-span-1", aspect: "aspect-square" },
    { name: "Stage & Wedding", key: "Stage & Wedding", image: "/images/stage_decor.png", span: "col-span-1", aspect: "aspect-square" },
    { name: "House Warming", key: "Traditional", image: "/images/house_warming_decor.png", span: "col-span-1", aspect: "aspect-square" },
    { name: "Festival Decor", key: "Traditional", image: "/images/festival_decor.png", span: "col-span-1", aspect: "aspect-square" },
    { name: "Car Decor", key: "Specialty", image: "/images/car_decor.png", span: "col-span-1", aspect: "aspect-square" },
    { name: "Pet Birthday", key: "Specialty", image: "/images/pet_decor.png", span: "col-span-1", aspect: "aspect-square" }
  ];

  useEffect(() => {
    const textTimer = setInterval(() => {
      setCelebrationIndex((prev) => (prev + 1) % celebrations.length);
    }, 2500);

    const bannerTimer = setInterval(() => {
      setActiveBanner((prev) => (prev + 1) % promotionalBanners.length);
    }, 5000);

    return () => {
      clearInterval(textTimer);
      clearInterval(bannerTimer);
    };
  }, []);

  return (
    <section className="bg-brand-cream pt-6 pb-12 relative overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-10 left-[10%] w-72 h-72 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-[10%] w-72 h-72 bg-brand-rosegold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        
        {/* Promotional Sliders Section (Ebo-style header banners) */}
        <div className="relative rounded-3xl overflow-hidden shadow-lg w-full aspect-[2.2/1] sm:aspect-[3/1] md:aspect-[3.5/1] transition-all duration-500 bg-brand-cream">
          {promotionalBanners.map((banner, index) => (
            <div
              key={banner.image}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === activeBanner ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              {/* Background Image */}
              <img
                src={banner.image}
                alt={banner.title}
                className="absolute inset-0 w-full h-full object-cover z-0"
              />
            </div>
          ))}

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-6 sm:left-10 z-20 flex space-x-1.5">
            {promotionalBanners.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveBanner(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeBanner === index ? "bg-white w-5" : "bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Celebrating Header */}
        <div className="text-center py-2">
          <div className="inline-flex items-center justify-center space-x-2 border-b border-brand-gold/20 pb-2">
            <h2 className="text-lg sm:text-xl md:text-2xl font-serif font-extrabold text-brand-plum">
              What are you celebrating?
            </h2>
            <div className="relative h-10 md:h-12 w-52 md:w-64 overflow-hidden font-sans font-black text-brand-gold text-lg sm:text-xl md:text-2xl">
              <div
                className="transition-transform duration-500 ease-out h-full"
                style={{ transform: `translateY(-${celebrationIndex * 100}%)` }}
              >
                {celebrations.map((txt) => (
                  <div key={txt} className="h-full flex items-center justify-start pl-2 whitespace-nowrap">
                    {txt}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Categories Banner Grid (Ebo Grid Spanning Layout) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat, idx) => (
            <div
              key={cat.name}
              onClick={() => onSelectCategory(cat.key)}
              className={`${cat.span} ${cat.aspect} relative rounded-2xl overflow-hidden border border-brand-rosegold/10 hover:border-brand-gold/60 transition-all duration-300 shadow-sm hover:shadow-xl cursor-pointer group shrink-0 bg-white`}
              data-aos="fade-up"
              data-aos-delay={(idx % 4) * 100}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                loading="lazy"
              />
              {/* Soft overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-plum/70 via-brand-plum/10 to-transparent flex flex-col justify-end p-4">
                <div className="text-left text-white space-y-0.5">
                  <p className="text-[11px] sm:text-xs font-sans tracking-widest font-black uppercase text-brand-gold">
                    Explore
                  </p>
                  <h3 className="text-sm sm:text-base font-serif font-extrabold leading-tight text-white group-hover:text-brand-gold transition-colors">
                    {cat.name}
                  </h3>
                </div>
                <div className="absolute right-4 bottom-4 w-7 h-7 rounded-full bg-brand-cream/10 border border-white/20 flex items-center justify-center text-white group-hover:bg-brand-gold group-hover:text-brand-plum transition-all duration-300 shadow-md">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
