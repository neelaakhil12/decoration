import Link from "next/link";
import { Sparkles, Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-plum text-brand-cream border-t border-brand-gold/20 pt-16 pb-8 relative overflow-hidden">
      {/* Background soft glow effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-rosegold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center group">
              <img
                src="/logo.png"
                alt="Decor Dazzlers Logo"
                className="h-16 w-auto object-contain bg-brand-cream rounded-lg p-1"
              />
            </Link>
            <p className="text-brand-pink/80 text-sm leading-relaxed font-sans">
              Transforming standard venues into breathtaking luxury celebration halls. We specialize in dynamic, custom event decoration that creates unforgettable emotional memories.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-cream/10 p-2.5 rounded-full border border-brand-gold/10 hover:border-brand-gold hover:bg-brand-gold/20 transition-all duration-300 group"
                aria-label="Facebook"
              >
                <svg className="h-4 w-4 fill-current text-brand-cream group-hover:text-brand-gold transition-colors" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-cream/10 p-2.5 rounded-full border border-brand-gold/10 hover:border-brand-gold hover:bg-brand-gold/20 transition-all duration-300 group"
                aria-label="Instagram"
              >
                <svg className="h-4 w-4 fill-none stroke-current stroke-2 text-brand-cream group-hover:text-brand-gold transition-colors" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-cream/10 p-2.5 rounded-full border border-brand-gold/10 hover:border-brand-gold hover:bg-brand-gold/20 transition-all duration-300 group"
                aria-label="YouTube"
              >
                <svg className="h-4 w-4 fill-current text-brand-cream group-hover:text-brand-gold transition-colors" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-semibold text-brand-gold mb-6 tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-3 font-sans text-sm">
              <li>
                <Link
                  href="/"
                  className="text-brand-pink/80 hover:text-brand-gold hover:pl-2 transition-all duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-brand-pink/80 hover:text-brand-gold hover:pl-2 transition-all duration-300"
                >
                  Our Services
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-brand-pink/80 hover:text-brand-gold hover:pl-2 transition-all duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-brand-pink/80 hover:text-brand-gold hover:pl-2 transition-all duration-300"
                >
                  Book Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-lg font-serif font-semibold text-brand-gold mb-6 tracking-wide">
              Get In Touch
            </h4>
            <ul className="space-y-4 font-sans text-sm text-brand-pink/85">
              <li className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <a
                    href="tel:+917075555987"
                    className="hover:text-brand-gold transition-colors block"
                  >
                    +91 70755 55987
                  </a>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-brand-gold shrink-0" />
                <a
                  href="mailto:info@decordazzlers.com"
                  className="hover:text-brand-gold transition-colors"
                >
                  info@decordazzlers.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-brand-cream">Sonu balloons & Party shop</p>
                  <p className="text-xs text-brand-pink/80 mt-0.5 leading-relaxed">
                    New Nagole Main Rd, Samathapuri Colony, Kothapet, Hyderabad, Telangana 500035
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Business Timings */}
          <div>
            <h4 className="text-lg font-serif font-semibold text-brand-gold mb-6 tracking-wide">
              Business Hours
            </h4>
            <ul className="space-y-4 font-sans text-sm text-brand-pink/85">
              <li className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-brand-cream">Monday - Sunday</p>
                  <p className="text-xs text-brand-pink/70 mt-1">
                    9:00 AM - 9:00 PM (IST)
                  </p>
                  <p className="text-xs text-brand-gold mt-2 italic">
                    *Open on all public holidays
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-brand-gold/15 pt-8 text-center font-sans text-xs text-brand-pink/60 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {currentYear} Decor Dazzlers. All Rights Reserved.</p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-brand-gold transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-brand-gold transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
