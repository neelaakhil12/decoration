"use client";
import { Sparkles, Calendar, Phone } from "lucide-react";
import { useApp } from "@/components/AppContext";

export default function BookingCTA() {
  const { openBookingModal } = useApp();

  return (
    <section className="py-12 bg-white relative overflow-hidden border-t border-gray-100">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center" data-aos="zoom-in">
        <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm">

          
          {/* Tagline */}
          <div className="section-badge mb-4">
            <Sparkles className="h-3.5 w-3.5 text-brand-gold" />
            Limited setup slots per day
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-brand-plum mb-4 leading-tight">
            Ready to Plan Your Next <span className="text-gold-gradient italic">Dream Celebration?</span>
          </h2>

          {/* Description */}
          <p className="text-brand-plum/70 font-sans max-w-xl mx-auto mb-6 text-xs sm:text-sm leading-relaxed">
            Get in touch today for a free design consultation. Tell us your date, select your custom theme, and let our verified artists handle the setup in Hyderabad.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              id="cta-whatsapp"
              onClick={() => openBookingModal()}
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white px-8 py-3 rounded-full font-sans text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-sm hover:shadow-md w-full sm:w-auto cursor-pointer"
            >
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-current flex-shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>Book Decoration Theme</span>
            </button>

            <a
              id="cta-call"
              href="tel:+917075555987"
              className="flex items-center justify-center gap-2 bg-brand-plum hover:bg-brand-gold text-white hover:text-brand-plum px-8 py-3 rounded-full font-sans text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-sm w-full sm:w-auto"
            >
              <Phone className="h-4 w-4 flex-shrink-0" />
              <span>Call +91 70755 55987</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
