"use client";
import { Phone } from "lucide-react";

export default function FloatingActions() {
  const whatsappUrl = "https://wa.me/917075555987?text=Hello%20Decor%20Dazzlers,%20I%20would%20like%20to%20enquire%20about%20your%20luxury%20decoration%20services%20for%20an%20event!";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
      {/* Call Button */}
      <a
        href="tel:+917075555987"
        className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-plum text-brand-gold border border-brand-gold/45 shadow-xl hover:bg-brand-gold hover:text-brand-plum transition-all duration-300 transform hover:-translate-y-1 gold-glow group relative"
        aria-label="Call Decor Dazzlers"
      >
        <Phone className="h-5 w-5 animate-pulse" />
        <span className="absolute right-14 bg-brand-plum text-brand-cream text-xs px-3 py-1.5 rounded-lg border border-brand-gold/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none font-sans shadow-md">
          Call Now
        </span>
      </a>

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-600 text-white shadow-xl hover:bg-emerald-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-emerald-500/40 group relative"
        aria-label="Chat on WhatsApp"
      >
        <svg
          className="h-5 w-5 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.381 9.806-9.761.001-2.605-1.002-5.054-2.825-6.88C16.429 2.137 13.977 1.135 11.97 1.135c-5.411 0-9.816 4.39-9.82 9.771-.002 2.022.524 3.996 1.524 5.73l-.997 3.64 3.738-.981zM18.06 14.85c-.328-.164-1.944-.96-2.247-1.07-.303-.11-.524-.165-.744.164-.22.33-.852 1.07-1.045 1.29-.193.22-.386.248-.714.083-.328-.164-1.385-.51-2.637-1.628-.974-.87-1.632-1.944-1.823-2.272-.193-.329-.02-.507.144-.67.147-.147.328-.385.493-.577.165-.192.22-.33.329-.55.11-.22.055-.412-.028-.577-.082-.164-.744-1.79-.102-1.943-.22-.53-.448-.445-.655-.445-.206-.002-.44-.002-.673-.002-.232 0-.612.087-.932.44-.32.352-1.22 1.196-1.22 2.915 0 1.72 1.247 3.379 1.422 3.61.175.23 2.456 3.749 5.95 5.257.83.358 1.48.571 1.986.732.834.266 1.593.228 2.193.138.669-.1 2.043-.834 2.332-1.64.29-.806.29-1.498.203-1.64-.087-.14-.32-.224-.648-.388z" />
        </svg>
        <span className="absolute right-14 bg-brand-plum text-brand-cream text-xs px-3 py-1.5 rounded-lg border border-brand-gold/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none font-sans shadow-md">
          WhatsApp Us
        </span>
      </a>
    </div>
  );
}
