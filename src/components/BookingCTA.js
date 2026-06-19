import Link from "next/link";
import { Sparkles, Calendar } from "lucide-react";

export default function BookingCTA() {
  return (
    <section className="py-20 bg-cream-gradient relative overflow-hidden text-center">
      {/* Glow blurs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

      {/* Sparkles */}
      <div className="absolute top-10 left-[15%] animate-sparkle-glow pointer-events-none">
        <Sparkles className="h-5 w-5 text-brand-gold" />
      </div>
      <div className="absolute bottom-10 right-[15%] animate-sparkle-glow pointer-events-none" style={{ animationDelay: "2s" }}>
        <Sparkles className="h-5 w-5 text-brand-rosegold" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/40 border border-brand-gold/20 backdrop-blur-md rounded-3xl p-10 md:p-16 shadow-xl">
          {/* Tagline */}
          <div className="inline-flex items-center space-x-1.5 bg-brand-plum/5 border border-brand-rosegold/30 px-4 py-1.5 rounded-full mb-6">
            <Sparkles className="h-4 w-4 text-brand-gold" />
            <span className="text-xs uppercase tracking-widest font-sans font-bold text-brand-plum">
              Limited slots per month
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-plum mb-6 leading-tight">
            Ready to Plan Your Next <span className="text-gold-gradient italic">Dream Celebration?</span>
          </h2>

          {/* Description */}
          <p className="text-brand-plum/80 font-sans max-w-xl mx-auto mb-8 text-sm sm:text-base leading-relaxed">
            Get in touch today for a free design consultation. Tell us your date, choose your theme, and let our artists handle the magic.
          </p>

          {/* Button */}
          <div className="flex justify-center">
            <Link
              href="/contact"
              className="bg-gold-gradient text-brand-plum px-10 py-4 rounded-full font-sans text-xs tracking-wider uppercase font-bold shadow-lg hover:shadow-xl gold-glow-hover transition-all duration-300 transform hover:-translate-y-0.5 flex items-center space-x-2"
            >
              <Calendar className="h-4 w-4 shrink-0" />
              <span>Book A Consultation</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
