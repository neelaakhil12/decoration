"use client";
import { useState, useEffect } from "react";
import { Sparkles, Star, ChevronLeft, ChevronRight } from "lucide-react";

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Sneha Reddy",
      role: "Bride",
      review: "Decor Dazzlers turned our wedding hall into an absolute dream palace! The stage setup with the fresh roses and fairy lights was beyond anything we imagined. Absolutely everyone was asking who did the decoration.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    },
    {
      name: "Rahul Verma",
      role: "Parent (1st Birthday Celebration)",
      review: "The kids birthday decoration was extremely cute and customized perfectly to our jungle theme. The balloons were of amazing quality and lasted for days. Highly recommend their fast setup crew!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    },
    {
      name: "Anjali Mehta",
      role: "Mother-to-be (Baby Shower)",
      review: "A beautiful pastel floral theme baby shower that got us emotional. The attention to details in the photo booth made our family portraits look incredibly luxury. Thank you for the wonderful work!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80",
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-brand-plum text-brand-cream relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-rosegold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Header */}
        <div className="mb-12" data-aos="fade-up">
          <div className="inline-flex items-center space-x-2 bg-brand-gold/10 border border-brand-gold/25 px-4 py-1.5 rounded-full mb-4">
            <Sparkles className="h-4 w-4 text-brand-gold" />
            <span className="text-xs uppercase tracking-widest font-sans font-bold text-brand-gold">
              Words of Delight
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-cream leading-tight">
            Loved By <span className="text-gold-gradient italic">Families & Couples</span>
          </h2>
        </div>

        {/* Carousel Content */}
        <div className="relative min-h-[320px] flex items-center justify-center" data-aos="zoom-in">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-2 md:left-[-60px] p-3 rounded-full bg-brand-cream/10 border border-brand-gold/20 text-brand-cream hover:bg-brand-gold hover:text-brand-plum transition-all duration-300 z-20 cursor-pointer"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 md:right-[-60px] p-3 rounded-full bg-brand-cream/10 border border-brand-gold/20 text-brand-cream hover:bg-brand-gold hover:text-brand-plum transition-all duration-300 z-20 cursor-pointer"
            aria-label="Next Testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Current Testimonial Slide */}
          <div className="bg-brand-cream/5 border border-brand-gold/20 rounded-3xl p-8 md:p-12 max-w-2xl mx-auto shadow-2xl relative">
            {/* Quote decoration */}
            <span className="absolute top-4 left-6 text-brand-gold/20 text-8xl font-serif leading-none select-none pointer-events-none">
              “
            </span>

            <div className="flex flex-col items-center">
              {/* Rating stars */}
              <div className="flex space-x-1.5 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-brand-gold text-brand-gold" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-brand-pink/90 text-sm sm:text-base md:text-lg font-sans leading-relaxed italic mb-8 relative z-10">
                "{testimonials[currentIndex].review}"
              </p>

              {/* Client Photo & Info */}
              <div className="flex items-center space-x-4">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-brand-gold/60"
                />
                <div className="text-left">
                  <h4 className="text-base font-serif font-bold text-brand-cream">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-brand-pink/60 text-xs font-sans">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Dots */}
        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "bg-brand-gold w-6"
                  : "bg-brand-cream/30 hover:bg-brand-cream/50"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
