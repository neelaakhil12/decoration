"use client";
import { useState, useRef } from "react";
import { Star, Quote, Sparkles, ChevronLeft, ChevronRight, MapPin, CheckCircle2 } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sneha Reddy",
    role: "Bride (Grand Wedding Stage)",
    location: "Banjara Hills, Hyderabad",
    review: "Decor Dazzlers turned our wedding hall into an absolute dream palace! The stage setup with fresh roses, crystal chandeliers and fairy lights was beyond anything we imagined. Everyone kept asking who did the decoration!",
    rating: 5,
    date: "2 days ago",
    initial: "S",
    badgeBg: "bg-[#2563EB]"
  },
  {
    id: 2,
    name: "Rahul Verma",
    role: "Parent (1st Birthday Celebration)",
    location: "Gachibowli, Hyderabad",
    review: "The kids birthday decoration was extremely cute and customized perfectly to our jungle safari theme. The balloon ring stand was sturdy, vibrant, and lasted for days. Super fast setup crew!",
    rating: 5,
    date: "1 week ago",
    initial: "R",
    badgeBg: "bg-emerald-600"
  },
  {
    id: 3,
    name: "Anjali Mehta",
    role: "Mother-to-be (Pastel Baby Shower)",
    location: "Jubilee Hills, Hyderabad",
    review: "A beautiful pastel floral theme baby shower that got us all emotional. The attention to detail in the teddy bear photo booth made our family portraits look incredibly luxurious! Thank you so much!",
    rating: 5,
    date: "3 weeks ago",
    initial: "A",
    badgeBg: "bg-sky-600"
  },
  {
    id: 4,
    name: "Vikram & Neha Sharma",
    role: "Couple (Surprise Anniversary Canopy)",
    location: "Kondapur, Hyderabad",
    review: "Booked the bedroom romantic satin canopy & neon light setup for our 5th anniversary. The team arrived right on time, set up everything quietly while my wife was away, and blew her mind!",
    rating: 5,
    date: "4 days ago",
    initial: "V",
    badgeBg: "bg-pink-600"
  },
  {
    id: 5,
    name: "Priyanka Rao",
    role: "Parent (Baby Welcome Home)",
    location: "Madhapur, Hyderabad",
    review: "The baby welcome entry gate balloon arch and cloud theme were so welcoming when we brought our baby girl home from the hospital. Outstanding service and clean teardown!",
    rating: 5,
    date: "2 weeks ago",
    initial: "P",
    badgeBg: "bg-purple-600"
  },
  {
    id: 6,
    name: "Karthik & Family",
    role: "Homeowner (House Warming Puja)",
    location: "Miyapur, Hyderabad",
    review: "Traditional marigold & mango leaf entrance decoration for our Griha Pravesam. The flower quality was super fresh and gave our new home such an auspicious, divine atmosphere.",
    rating: 5,
    date: "1 month ago",
    initial: "K",
    badgeBg: "bg-amber-600"
  },
  {
    id: 7,
    name: "Sandeep Agarwal",
    role: "Business Owner (Store Opening)",
    location: "Hitech City, Hyderabad",
    review: "We ordered balloon pillars & grand entrance arch for our jewelry showroom opening. The setup was completed early in the morning and looked very impressive to all our chief guests.",
    rating: 5,
    date: "5 days ago",
    initial: "S",
    badgeBg: "bg-blue-700"
  },
  {
    id: 8,
    name: "Deepika Chawla",
    role: "Bride's Sister (Haldi & Sangeet Decor)",
    location: "Hitec City, Hyderabad",
    review: "The yellow floral mandap & brass urli flower decor for Haldi ceremony was Instagram perfect! All our family photos came out vibrant. Decor Dazzlers is now our official family event decorator!",
    rating: 5,
    date: "3 weeks ago",
    initial: "D",
    badgeBg: "bg-yellow-600"
  },
  {
    id: 9,
    name: "Rohan Kulkarni",
    role: "Groom (Luxury Wedding Car Decor)",
    location: "Begumpet, Hyderabad",
    review: "Orchid & white rose car bonnet decoration. The flowers stayed fresh throughout our 40km drive across the city. Very professional staff and prompt communication throughout.",
    rating: 5,
    date: "1 week ago",
    initial: "R",
    badgeBg: "bg-[#1E3A8A]"
  },
  {
    id: 10,
    name: "Swati Deshmukh",
    role: "Host (Terrace Candlelight Setup)",
    location: "Kukatpally, Hyderabad",
    review: "Rented the terrace golden fairy light canopy for a private birthday dinner. The ambiance created under the night sky was magical beyond words. Truly an unforgettable experience!",
    rating: 5,
    date: "6 days ago",
    initial: "S",
    badgeBg: "bg-rose-600"
  },
];

export default function TestimonialSection() {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }
  };

  return (
    <section className="py-8 md:py-14 lg:py-16 bg-brand-cream border-t border-brand-rosegold/10 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="space-y-2 text-center md:text-left">
            <div className="section-badge inline-flex">
              <Sparkles className="h-3.5 w-3.5 text-brand-gold fill-brand-gold" />
              Verified Hyderabad Reviews
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black text-brand-plum leading-tight">
              Loved By <span className="text-gold-gradient italic">Families & Couples</span>
            </h2>
            <p className="text-brand-plum/60 font-sans text-xs sm:text-sm max-w-xl">
              Read real stories of how our decorators bring magic to life at birthdays, weddings, baby showers & house warmings.
            </p>
          </div>

          {/* Controls & Streaming Badge */}
          <div className="flex items-center justify-center md:justify-end gap-3 shrink-0">
            <div className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-[#1E3A8A] text-[11px] font-bold px-3 py-1.5 rounded-full font-sans shadow-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Live Auto-Streaming</span>
            </div>

            {/* Manual scroll buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={scrollLeft}
                className="p-2.5 rounded-full bg-white border border-gray-200 text-brand-plum hover:bg-brand-plum hover:text-white transition-all shadow-xs cursor-pointer"
                title="Scroll Left"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={scrollRight}
                className="p-2.5 rounded-full bg-white border border-gray-200 text-brand-plum hover:bg-brand-plum hover:text-white transition-all shadow-xs cursor-pointer"
                title="Scroll Right"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Auto-Streaming Horizontal Track Container ── */}
        <div className="relative w-full overflow-hidden pt-2 pb-4">
          
          {/* Gradient Fringes */}
          <div className="absolute top-0 bottom-0 left-0 w-12 bg-gradient-to-r from-brand-cream to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-12 bg-gradient-to-l from-brand-cream to-transparent z-10 pointer-events-none" />

          {/* Marquee Streaming Track */}
          <div ref={scrollRef} className="animate-stream-scroll flex gap-5 overflow-x-auto scrollbar-none py-1">
            {[...testimonials, ...testimonials].map((test, idx) => (
              <div
                key={`${test.id}-${idx}`}
                className="w-[320px] sm:w-[360px] shrink-0 bg-white border border-gray-200/80 hover:border-brand-gold/50 rounded-3xl p-6 relative flex flex-col justify-between shadow-xs hover:shadow-lg transition-all duration-300 group"
              >
                {/* Quote Watermark */}
                <Quote className="absolute top-4 right-4 h-9 w-9 text-brand-plum/10 pointer-events-none group-hover:text-brand-gold/20 transition-colors" />

                <div className="space-y-3">
                  {/* Rating Stars & Location Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {[...Array(test.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-gray-500 font-sans flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-150">
                      <MapPin className="h-3 w-3 text-red-500 shrink-0" />
                      <span className="truncate max-w-[130px]">{test.location}</span>
                    </span>
                  </div>

                  {/* Review Quote */}
                  <p className="text-xs sm:text-sm font-sans text-brand-plum/85 leading-relaxed italic relative z-10 line-clamp-4">
                    "{test.review}"
                  </p>
                </div>

                {/* User Bio Footer */}
                <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-5">
                  <div className="flex items-center space-x-3">
                    <div className={`h-9 w-9 rounded-full ${test.badgeBg} text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0 font-sans`}>
                      {test.initial}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-sans font-bold text-brand-plum leading-snug flex items-center gap-1">
                        <span>{test.name}</span>
                        <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 fill-blue-100 shrink-0" />
                      </h4>
                      <p className="text-[10px] font-sans text-brand-plum/50 font-medium">
                        {test.role}
                      </p>
                    </div>
                  </div>

                  <span className="text-[9px] font-sans text-gray-400 font-bold uppercase tracking-wider shrink-0">
                    {test.date}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Hover Pause Hint */}
        <p className="text-[11px] font-sans text-center text-brand-plum/50 font-medium">
          💡 <span className="font-bold">Hover over any review card</span> to pause streaming & read full customer stories.
        </p>

      </div>
    </section>
  );
}
