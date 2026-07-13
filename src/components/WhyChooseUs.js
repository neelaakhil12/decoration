"use client";
import { Zap, Calendar, Award, ShieldCheck, Heart } from "lucide-react";

export default function WhyChooseUs() {
  const stats = [
    { num: "10,000+", label: "Happy Customers" },
    { num: "50,000+", label: "Orders Completed" },
    { num: "5+", label: "Cities Served" },
    { num: "4.9/5", label: "Average Rating" },
  ];

  const features = [
    {
      title: "90-Min Express Setup",
      desc: "Instant decoration options ready in as fast as 90 minutes from booking. Perfect for last-minute surprises.",
      icon: Zap,
    },
    {
      title: "Scheduled Bookings",
      desc: "Plan ahead with ease. Book your decoration setup up to 90 days in advance.",
      icon: Calendar,
    },
    {
      title: "Verified Decorators",
      desc: "All our on-field crew members are trained, background-verified professionals who deliver pristine work.",
      icon: ShieldCheck,
    },
    {
      title: "Transparent & Affordable",
      desc: "Best quality setups at wholesale rates. What you see is what you pay—no hidden surprises.",
      icon: Award,
    },
  ];

  return (
    <section className="py-12 bg-white relative border-t border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* ── Stats Strip Row ── */}
        <div 
          className="rounded-3xl stats-strip text-white p-8 md:p-10 shadow-xl relative overflow-hidden"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            {stats.map((s, idx) => (
              <div 
                key={s.label} 
                className={`space-y-1 ${idx > 1 ? "pt-6 lg:pt-0" : ""} ${idx === 1 ? "pt-6 lg:pt-0 border-t-0" : ""}`}
                data-aos="zoom-in"
                data-aos-delay={idx * 150}
              >
                <div className="text-3xl sm:text-4xl font-sans font-black text-brand-gold">
                  {s.num}
                </div>
                <p className="text-xs sm:text-sm font-sans font-medium text-brand-pink/80">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Core Value Propositions (Ebo style features) ── */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2" data-aos="fade-up">
            <div className="section-badge">
              <Heart className="h-3.5 w-3.5 text-brand-gold fill-brand-gold" />
              Decor Dazzlers Trust
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-brand-plum leading-tight">
              Why Choose Our <span className="text-gold-gradient italic">Decoration Service?</span>
            </h2>
            <p className="text-brand-plum/60 font-sans text-xs sm:text-sm">
              We make booking decorations as easy as ordering food online.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="bg-gray-50 border border-gray-100 hover:border-brand-gold/40 p-6 rounded-2xl transition-all duration-300 flex flex-col items-center text-center shadow-sm hover:shadow-md group"
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                >
                  <div className="bg-brand-gold/10 p-3 rounded-xl mb-4 group-hover:bg-brand-gold/20 transition-all">
                    <Icon className="h-6 w-6 text-brand-gold" />
                  </div>
                  <h3 className="text-sm font-sans font-black text-brand-plum mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-xs font-sans text-brand-plum/65 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
