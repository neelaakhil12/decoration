"use client";
import { Star, Quote, Sparkles } from "lucide-react";

export default function TestimonialSection() {
  const testimonials = [
    {
      name: "Sneha Reddy",
      role: "Bride",
      review: "Decor Dazzlers turned our wedding hall into an absolute dream palace! The stage setup with fresh roses and fairy lights was beyond anything we imagined. Absolutely everyone was asking who did the decoration.",
      rating: 5,
      date: "2 days ago",
    },
    {
      name: "Rahul Verma",
      role: "Parent (1st Birthday Celebration)",
      review: "The kids birthday decoration was extremely cute and customized perfectly to our jungle theme. The balloons were of amazing quality and lasted for days. Highly recommend their fast setup crew!",
      rating: 5,
      date: "1 week ago",
    },
    {
      name: "Anjali Mehta",
      role: "Mother-to-be (Baby Shower)",
      review: "A beautiful pastel floral theme baby shower that got us emotional. The attention to details in the photo booth made our family portraits look incredibly luxury. Thank you for the wonderful work!",
      rating: 5,
      date: "3 weeks ago",
    },
  ];

  return (
    <section className="py-12 bg-white border-t border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* ── Header ── */}
        <div className="text-center max-w-xl mx-auto space-y-2" data-aos="fade-up">
          <div className="section-badge">
            <Sparkles className="h-3.5 w-3.5 text-brand-gold fill-brand-gold" />
            Loved by Customers
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-brand-plum leading-tight">
            Loved By <span className="text-gold-gradient italic">Families & Couples</span>
          </h2>
          <p className="text-brand-plum/60 font-sans text-xs sm:text-sm">
            Read stories of how we bring magic to life at celebrations.
          </p>
        </div>

        {/* ── Testimonials Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {testimonials.map((test, idx) => (
            <div
              key={idx}
              className="bg-gray-50 border border-gray-100 hover:border-brand-gold/30 rounded-2xl p-6 relative flex flex-col justify-between shadow-sm transition-all duration-300 hover:shadow-md"
              data-aos="fade-up"
              data-aos-delay={idx * 150}
            >
              {/* Quote icon watermark */}
              <Quote className="absolute top-4 right-4 h-10 w-10 text-brand-gold/10 pointer-events-none" />

              <div className="space-y-4">
                {/* Rating stars */}
                <div className="flex gap-1">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-brand-gold text-brand-gold" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm font-sans text-brand-plum/80 leading-relaxed italic relative z-10">
                  "{test.review}"
                </p>
              </div>

              {/* User details */}
              <div className="flex items-center justify-between border-t border-gray-200/60 pt-4 mt-6">
                <div>
                  <h4 className="text-xs sm:text-sm font-sans font-black text-brand-plum">
                    {test.name}
                  </h4>
                  <p className="text-[10px] font-sans text-brand-plum/50 mt-0.5">
                    {test.role}
                  </p>
                </div>
                <span className="text-[9px] font-sans text-brand-plum/40 font-semibold uppercase">
                  {test.date}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
