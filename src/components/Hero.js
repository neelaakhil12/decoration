"use client";
import { useState, useEffect } from "react";
import { Zap, Calendar, Star, CheckCircle, MapPin, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function Hero({ onSelectCategory = () => {} }) {
  const [celebrationIndex, setCelebrationIndex] = useState(0);
  const [activeBanner, setActiveBanner] = useState(0);
  const [activeCatChip, setActiveCatChip] = useState(0);

  const celebrations = [
    "Birthday 🎂",
    "Anniversary 💍",
    "Kid's Party 🎈",
    "Baby Shower 🍼",
    "Welcome Baby 👶",
    "Festival Decor 🪔",
  ];

  const promotionalBanners = [
    {
      title: "15% OFF First Order",
      gradient: "linear-gradient(135deg, #5C2E46 0%, #8A4F6E 100%)",
      tag: "Limited Offer",
    },
    {
      title: "Same Day Setup in 90 Mins",
      gradient: "linear-gradient(135deg, #C89B3C 0%, #D4A64A 100%)",
      tag: "Express Setup",
    },
    {
      title: "Custom Dream Themes",
      gradient: "linear-gradient(135deg, #D89AA0 0%, #5C2E46 100%)",
      tag: "Bespoke Art",
    },
  ];

  // Category posters grid — EboNow-style 4-col grid
  const categoryPosters = [
    { name: "Birthday Decor", key: "Birthday", image: "/images/birthday_decor.png", span: "col-span-2", aspect: "2/1" },
    { name: "Baby Welcome", key: "Baby Shower", image: "/images/welcome_baby_decor.png", span: "col-span-2", aspect: "2/1" },
    { name: "Kid's Party", key: "Birthday", image: "/images/kids_birthday_decor.png", span: "col-span-1", aspect: "1/1" },
    { name: "Anniversary", key: "Romantic", image: "/images/anniversary_decor.png", span: "col-span-1", aspect: "1/1" },
    { name: "Baby Shower", key: "Baby Shower", image: "/images/baby_shower_decor.png", span: "col-span-1", aspect: "1/1" },
    { name: "Stage & Wedding", key: "Stage & Wedding", image: "/images/stage_decor.png", span: "col-span-1", aspect: "1/1" },
    { name: "House Warming", key: "Traditional", image: "/images/house_warming_decor.png", span: "col-span-1", aspect: "1/1" },
    { name: "Festival Decor", key: "Traditional", image: "/images/festival_decor.png", span: "col-span-1", aspect: "1/1" },
    { name: "Car Decor", key: "Specialty", image: "/images/car_decor.png", span: "col-span-1", aspect: "1/1" },
    { name: "Something Else", key: "Specialty", image: "/images/pet_decor.png", span: "col-span-1", aspect: "1/1" },
  ];

  // Category chips (Explore at a glance)
  const categoryChips = [
    { name: "Birthday", image: "/images/birthday_decor.png" },
    { name: "Baby Welcome", image: "/images/welcome_baby_decor.png" },
    { name: "Kid's Party", image: "/images/kids_birthday_decor.png" },
    { name: "Anniversary", image: "/images/anniversary_decor.png" },
    { name: "Baby Shower", image: "/images/baby_shower_decor.png" },
    { name: "Stage Decor", image: "/images/stage_decor.png" },
  ];

  useEffect(() => {
    const textTimer = setInterval(() => {
      setCelebrationIndex((prev) => (prev + 1) % celebrations.length);
    }, 2000);
    const bannerTimer = setInterval(() => {
      setActiveBanner((prev) => (prev + 1) % promotionalBanners.length);
    }, 4000);
    return () => {
      clearInterval(textTimer);
      clearInterval(bannerTimer);
    };
  }, []);

  const handleScrollToCatalog = () => {
    document.getElementById("catalog-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };

  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* ────────────────────────────────────────────────────────
           DESKTOP: Full-width stacked hero
      ─────────────────────────────────────────────────────── */}
      <div className="hidden md:block w-full">

        {/* ── 1. Full-width Promotional Banner Slider ── */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            background: promotionalBanners[activeBanner].gradient,
            minHeight: 220,
          }}
          data-aos="fade-down"
          data-aos-duration="1000"
        >
          <div className="max-w-7xl mx-auto px-8 lg:px-16 h-full flex flex-col justify-end py-10">
            <span className="text-white/60 text-[11px] uppercase tracking-widest font-bold font-sans mb-2">
              {promotionalBanners[activeBanner].tag}
            </span>
            <div className="text-white font-black text-4xl lg:text-5xl font-sans leading-tight max-w-2xl">
              {promotionalBanners[activeBanner].title}
            </div>
            <div className="text-white/70 text-sm font-sans mt-2">
              Decor Dazzlers · Hyderabad — Same day setup available
            </div>
          </div>

          {/* Slide dots */}
          <div className="absolute bottom-6 right-10 flex gap-2 z-10">
            {promotionalBanners.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveBanner(i)}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  i === activeBanner ? "w-8 bg-white" : "w-2.5 bg-white/35"
                }`}
              />
            ))}
          </div>

          {/* Decorative elements */}
          <div className="absolute top-6 right-20 text-7xl opacity-10 select-none pointer-events-none">🎉</div>
          <div className="absolute bottom-6 right-52 text-5xl opacity-10 select-none pointer-events-none">🎈</div>
          <div className="absolute top-10 right-60 text-4xl opacity-10 select-none pointer-events-none">✨</div>
        </div>

        {/* ── 2. "What are you celebrating?" Header ── */}
        <div 
          className="max-w-7xl mx-auto px-8 lg:px-16 pt-8 pb-4 flex items-center justify-between"
          data-aos="fade-up"
        >
          <div>
            <h2 className="text-2xl font-serif font-black text-brand-plum leading-tight">
              What are you <span className="text-brand-gold italic">celebrating?</span>
            </h2>
            <p className="text-xs text-brand-plum/55 font-sans mt-1">
              Pick a theme below — our verified decorators will set it up in Hyderabad
            </p>
          </div>
          <div className="flex items-center gap-2 text-base font-sans font-bold text-brand-plum">
            <span className="text-brand-plum/60 text-sm">Now celebrating:</span>
            <div className="relative overflow-hidden font-black text-brand-gold font-sans h-8 w-48">
              <div
                className="transition-transform duration-500 ease-out"
                style={{ transform: `translateY(-${celebrationIndex * 32}px)` }}
              >
                {celebrations.map((txt) => (
                  <div key={txt} className="h-8 flex items-center text-lg">
                    {txt}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── 3. Full-width Category Poster Grid ── */}
        <div className="max-w-7xl mx-auto px-8 lg:px-16 pb-10">
          <div className="grid grid-cols-5 gap-4">
            {categoryPosters.map((cat, idx) => (
              <div
                key={idx}
                onClick={() => {
                  onSelectCategory(cat.key);
                  handleScrollToCatalog();
                }}
                className={`relative rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-all duration-300 ${
                  idx < 2 ? "col-span-2" : "col-span-1"
                }`}
                style={{ aspectRatio: idx < 2 ? "2/1" : "1/1" }}
                data-aos="fade-up"
                data-aos-delay={idx * 75}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading={idx < 4 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                <div className="absolute inset-0 bg-brand-gold/0 group-hover:bg-brand-gold/10 transition-all duration-300" />
                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <p className="text-white font-black text-sm lg:text-base leading-tight font-sans group-hover:text-brand-gold transition-colors drop-shadow">
                    {cat.name}
                  </p>
                  <span className="text-[10px] text-brand-gold font-sans tracking-wider uppercase font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Explore Now →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ───────────────────────────────────────────────────
           MOBILE: Full-screen app-like experience (Fine as confirmed by User)
      ─────────────────────────────────────────────────── */}
      <div className="md:hidden w-full bg-white">
        <PhoneAppUI
          activeBanner={activeBanner}
          promotionalBanners={promotionalBanners}
          celebrationIndex={celebrationIndex}
          celebrations={celebrations}
          categoryPosters={categoryPosters}
          categoryChips={categoryChips}
          activeCatChip={activeCatChip}
          setActiveCatChip={setActiveCatChip}
          onSelectCategory={onSelectCategory}
          isMobile={true}
        />
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PHONE APP UI — renders inside the phone frame OR mobile
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function PhoneAppUI({
  activeBanner,
  promotionalBanners,
  celebrationIndex,
  celebrations,
  categoryPosters,
  categoryChips,
  activeCatChip,
  setActiveCatChip,
  onSelectCategory,
  isMobile = false,
}) {
  return (
    <div className="flex flex-col w-full bg-white min-h-full">

      {/* ── Hero Banner Slider ── */}
      <div
        className="relative w-full overflow-hidden flex-shrink-0"
        style={{
          background: promotionalBanners[activeBanner].gradient,
          minHeight: 180,
        }}
      >
        {/* Banner content */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 z-10">
          <span className="text-white/70 text-[9px] uppercase tracking-widest font-bold font-sans mb-1">
            {promotionalBanners[activeBanner].tag}
          </span>
          <div className="text-white font-black text-xl font-sans leading-tight">
            {promotionalBanners[activeBanner].title}
          </div>
          <div className="text-white/80 text-[10px] font-sans mt-1">
            Decor Dazzlers · Hyderabad
          </div>
        </div>

        {/* Banner dots */}
        <div className="absolute bottom-3 right-4 flex gap-1 z-10">
          {promotionalBanners.map((_, i) => (
            <span
              key={i}
              className={`block h-1.5 rounded-full transition-all ${
                i === activeBanner ? "w-4 bg-white" : "w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* Decorative emoji */}
        <div className="absolute top-4 right-6 text-4xl opacity-30 select-none">🎉</div>
        <div className="absolute top-8 right-16 text-2xl opacity-20 select-none">🎈</div>
      </div>

      {/* ── Speed + Schedule badges ── */}
      <div className="flex items-center gap-2 px-3 pt-3 pb-1 flex-shrink-0">
        <div className="flex items-center gap-1 text-brand-gold font-black text-base font-sans">
          <Zap className="h-4 w-4 fill-brand-gold" />
          <span>90 <span className="text-sm">mins</span></span>
        </div>
        <div className="w-px h-4 bg-gray-200 mx-1" />
        <span className="bg-brand-gold text-white text-[9px] font-bold font-sans px-2 py-0.5 rounded-full flex items-center gap-1">
          <Calendar className="h-2.5 w-2.5" />
          Book upto <span className="text-yellow-200 font-black">90 days</span>
        </span>
        <div className="w-px h-4 bg-gray-200 mx-1" />
        <div className="flex items-center gap-1 text-[9px] text-brand-plum/60 font-sans">
          <MapPin className="h-2.5 w-2.5 text-brand-gold" />
          <span className="font-semibold text-brand-plum">Hyderabad</span>
          <ChevronDown className="h-2.5 w-2.5" />
        </div>
      </div>

      {/* ── "What are you celebrating?" text ── */}
      <div className="flex items-center gap-1 px-3 py-2 flex-shrink-0 border-b border-gray-100">
        <span className="font-semibold text-brand-plum font-sans text-sm">
          What are you celebrating?
        </span>
        <div
          className="relative overflow-hidden font-black text-brand-gold font-sans text-sm h-6"
          style={{ width: 120 }}
        >
          <div
            className="transition-transform duration-500 ease-out"
            style={{ transform: `translateY(-${celebrationIndex * 24}px)` }}
          >
            {celebrations.map((txt) => (
              <div
                key={txt}
                className="flex items-center pl-1"
                style={{ height: 24 }}
              >
                {txt}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Category Posters Grid ── */}
      <div className="grid grid-cols-4 gap-1.5 px-2 pt-2 flex-shrink-0">
        {categoryPosters.map((cat, idx) => (
          <div
            key={cat.name}
            onClick={() => onSelectCategory(cat.key)}
            className={`relative rounded-lg overflow-hidden cursor-pointer group ${
              idx < 2 ? "col-span-2" : "col-span-1"
            }`}
            style={{ aspectRatio: idx < 2 ? "2/1" : "1/1" }}
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading={idx < 4 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-1.5 left-1.5 right-1 text-left">
              <p className="text-white font-bold leading-tight font-sans text-[10px]">
                {cat.name}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── "Explore at a Glance" category chip strip ── */}
      <div className="mt-3 flex-shrink-0">
        <div
          className="rounded-t-xl mx-2"
          style={{
            background: "linear-gradient(267deg, rgba(212,166,74,0.25) 0%, rgba(246,214,218,0.35) 55%, rgba(216,154,160,0.25) 100%)",
          }}
        >
          <div className="flex items-center justify-center gap-1 py-1.5 text-[10px] font-semibold text-brand-plum font-sans border-b border-white/60">
            ✨ Explore at a glance ✨
          </div>
          <div className="flex gap-1 px-2 pt-2 pb-3 overflow-x-auto scroll-bar-remove">
            {categoryChips.map((chip, idx) => (
              <div
                key={chip.name}
                onClick={() => {
                  setActiveCatChip(idx);
                  onSelectCategory(chip.name);
                }}
                className={`flex-shrink-0 flex flex-col items-center pt-1 px-2 pb-2 rounded-t-xl cursor-pointer transition-all ${
                  activeCatChip === idx
                    ? "bg-white shadow-sm scale-105"
                    : "bg-white/50 border-t border-white/60"
                }`}
                style={{ width: 68, minHeight: 78 }}
              >
                <img
                  src={chip.image}
                  alt={chip.name}
                  className="rounded-xl object-cover"
                  style={{ width: 44, height: 44 }}
                  loading="lazy"
                />
                <div
                  className="text-center leading-tight mt-1 text-brand-plum font-sans font-medium text-[9px]"
                >
                  {chip.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Subcategory shape chips ── */}
      <div className="flex gap-1.5 px-2 py-2 overflow-x-auto scroll-bar-remove border-b border-gray-100 flex-shrink-0">
        {["Wall Decor", "Ring Stand", "Room Decor", "Stage", "Car Decor"].map((shape, idx) => (
          <div
            key={shape}
            className={`flex-shrink-0 flex items-center gap-1.5 border rounded-lg px-2 py-0.5 cursor-pointer ${
              idx === 0
                ? "border-brand-gold/50 bg-brand-gold/10 text-brand-plum"
                : "border-gray-200 bg-white text-gray-500"
            }`}
            style={{ fontSize: 10, fontWeight: 600 }}
          >
            {shape}
          </div>
        ))}
      </div>

      {/* ── Trending in Hyderabad ── */}
      <div className="mt-2 px-2 pb-4">
        <div className="font-bold text-brand-plum font-sans mb-2 text-[13px] text-left">
          🔥 Trending in Hyderabad
        </div>
        <div className="flex gap-2 overflow-x-auto scroll-bar-remove">
          {[
            { title: "Rosegold Chrome Arch", price: 3499, rating: 4.8, image: "/images/birthday_decor.png", shape: "Wall Decor" },
            { title: "Royal Canopy Proposal", price: 3999, rating: 4.9, image: "/images/anniversary_decor.png", shape: "Room Decor" },
            { title: "Jungle Safari Kids Party", price: 7499, rating: 4.7, image: "/images/kids_birthday_decor.png", shape: "Stage" },
            { title: "Pastel Floral Baby Shower", price: 5999, rating: 4.9, image: "/images/baby_shower_decor.png", shape: "Room Decor" },
          ].map((prod, i) => (
            <div
              key={i}
              className="flex-shrink-0 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
              style={{ width: 140 }}
            >
              <div className="relative" style={{ aspectRatio: "1/1" }}>
                <img src={prod.image} alt={prod.title} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute top-1.5 right-1.5 bg-white/80 backdrop-blur-sm rounded-full p-1">
                  <svg viewBox="0 0 24 24" className="h-3 w-3 text-gray-300 fill-current">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <span
                  className="absolute bottom-1 left-1 bg-brand-plum text-white rounded px-1"
                  style={{ fontSize: 7, fontWeight: 700 }}
                >
                  {prod.shape}
                </span>
              </div>
              <div className="p-1.5 space-y-0.5 text-left">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-0.5 bg-brand-gold/10 text-brand-plum rounded px-1 py-0.5" style={{ fontSize: 8, fontWeight: 700 }}>
                    ⭐ {prod.rating}
                  </span>
                </div>
                <div className="text-brand-plum font-semibold font-sans leading-tight text-[10px]">
                  {prod.title}
                </div>
                <div className="font-black text-brand-gold font-sans text-[11px]">
                  ₹{prod.price.toLocaleString()}
                </div>
                <a
                  href={`https://wa.me/917075555987?text=I'm interested in ${prod.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center text-white font-bold rounded-lg py-1 mt-1 transition-all text-[9px]"
                  style={{
                    background: "linear-gradient(135deg, #5C2E46, #8A4F6E)",
                  }}
                >
                  Enquire Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
