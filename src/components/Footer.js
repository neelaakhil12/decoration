import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Sparkles } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-100 pt-12 pb-6 relative overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <img
                src="/logo.png"
                alt="Decor Dazzlers Logo"
                className="h-16 sm:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span className="font-serif font-black text-xl text-brand-plum group-hover:text-brand-gold transition-colors">
                Decor Dazzlers
              </span>
            </Link>
            <p className="text-brand-plum/70 text-xs font-sans leading-relaxed">
              Hyderabad's premium decoration booking platform. We turn normal venues into breathtaking premium celebration layouts, creating unforgettable memories for your family.
            </p>
            {/* Social Links */}
            <div className="flex space-x-3">
              {[
                { name: "Facebook", path: "M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" },
                { name: "Instagram", isStroke: true },
                { name: "YouTube", path: "M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" }
              ].map((soc, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="bg-white border border-gray-200 p-2 rounded-full hover:border-brand-gold hover:bg-brand-gold/10 transition-all duration-300 text-brand-plum"
                  aria-label={soc.name}
                >
                  {soc.isStroke ? (
                    <svg className="h-4.5 w-4.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                  ) : (
                    <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d={soc.path}/>
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-extrabold text-brand-plum mb-4 font-sans">
              Quick Links
            </h4>
            <ul className="space-y-2.5 font-sans text-xs text-brand-plum/80">
              {["Home", "Our Services", "About Us", "Contact Us"].map((lnk, idx) => (
                <li key={idx}>
                  <Link
                    href={lnk === "Home" ? "/" : lnk === "Our Services" ? "/services" : lnk === "About Us" ? "/about" : "/contact"}
                    className="hover:text-brand-gold transition-colors block"
                  >
                    {lnk}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-extrabold text-brand-plum mb-4 font-sans">
              Get In Touch
            </h4>
            <ul className="space-y-3 font-sans text-xs text-brand-plum/80">
              <li className="flex items-start space-x-2">
                <Phone className="h-4 w-4 text-brand-gold shrink-0 mt-0.5" />
                <a href="tel:+919848677418" className="hover:text-brand-gold transition-colors">
                  +91 98486 77418
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="h-4 w-4 text-brand-gold shrink-0 mt-0.5" />
                <a href="mailto:info@decordazzlers.com" className="hover:text-brand-gold transition-colors break-all">
                  info@decordazzlers.com
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-brand-plum">Sonu balloons & Party shop</p>
                  <p className="text-[10px] text-brand-plum/60 mt-0.5 leading-relaxed">
                    New Nagole Main Rd, Samathapuri Colony, Kothapet, Hyderabad, Telangana 500035
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Business Hours */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-extrabold text-brand-plum mb-4 font-sans">
              Business Hours
            </h4>
            <ul className="space-y-3 font-sans text-xs text-brand-plum/80">
              <li className="flex items-start space-x-2">
                <Clock className="h-4 w-4 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-brand-plum">Monday - Sunday</p>
                  <p className="text-[10px] text-brand-plum/60 mt-0.5">
                    9:00 AM - 9:00 PM (IST)
                  </p>
                  <p className="text-[10px] text-brand-gold font-bold mt-1.5 italic">
                    *Open on all public holidays
                  </p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200/80 pt-6 text-center font-sans text-[10px] text-brand-plum/50 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p>© {currentYear} Decor Dazzlers. All Rights Reserved.</p>
          <div className="flex space-x-4">
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
