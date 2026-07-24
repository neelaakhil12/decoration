"use client";
import { useState, useEffect, useRef } from "react";
import { Zap, Calendar, Award, ShieldCheck, Heart } from "lucide-react";

function AnimatedStatItem({ target, decimals = 0, suffix = "", label, isVisible }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setCount(0);
      return;
    }

    const duration = 1800; // 1.8 seconds animation
    const startTime = performance.now();
    let animationFrameId;

    const updateCount = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Ease-out cubic animation formula for smooth slowdown at end
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = target * easeOutProgress;

      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, target]);

  const formattedValue = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count).toLocaleString("en-US");

  return (
    <div className="space-y-1 py-2 px-1 flex flex-col justify-center items-center">
      <div className="text-2xl sm:text-3xl lg:text-4xl font-sans font-black text-brand-gold tracking-tight">
        {formattedValue}{suffix}
      </div>
      <p className="text-[11px] sm:text-xs font-sans font-medium text-brand-pink/80 leading-tight">
        {label}
      </p>
    </div>
  );
}

export default function WhyChooseUs() {
  const statsContainerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (statsContainerRef.current) {
      observer.observe(statsContainerRef.current);
    }

    return () => {
      if (statsContainerRef.current) {
        observer.unobserve(statsContainerRef.current);
      }
    };
  }, []);

  const stats = [
    { target: 10000, suffix: "+", label: "Happy Customers" },
    { target: 50000, suffix: "+", label: "Orders Completed" },
    { target: 5, suffix: "+", label: "Cities Served" },
    { target: 4.9, decimals: 1, suffix: "/5", label: "Average Rating" },
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
    <section className="py-6 md:py-8 bg-white relative border-t border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 md:space-y-8">
        
        {/* ── Stats Strip Row with Scroll-Triggered Counting Animation ── */}
        <div 
          ref={statsContainerRef}
          className="rounded-3xl stats-strip text-white p-5 sm:p-8 md:p-10 shadow-xl relative overflow-hidden"
        >
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 text-center lg:divide-x divide-white/10">
            {stats.map((s) => (
              <AnimatedStatItem
                key={s.label}
                target={s.target}
                decimals={s.decimals || 0}
                suffix={s.suffix}
                label={s.label}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>

        {/* ── Core Value Propositions ── */}
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
