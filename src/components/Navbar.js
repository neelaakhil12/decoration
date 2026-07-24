"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { MapPin, Search, Phone, Menu, X, ChevronDown, ShoppingBag } from "lucide-react";
import { useApp } from "@/components/AppContext";

export default function Navbar({
  location = { city: "Hyderabad", address: "Hyderabad Metro" },
  onOpenLocationModal = () => {},
  searchQuery = "",
  onSearchChange = () => {},
  cartCount = 0
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setIsCartOpen, openBookingModal } = useApp();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About Us", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-45 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.08)]"
          : "bg-white border-b border-gray-100"
      }`}
    >
      {/* ─── DESKTOP NAV ─── */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-32 gap-4">

            {/* Left: Logo */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <Link href="/" className="flex items-center gap-3.5 group">
                <img
                  src="/logo.png"
                  alt="Decor Dazzlers Logo"
                  className="h-28 lg:h-30 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
                <span className="font-serif font-black text-2xl lg:text-3xl text-brand-plum tracking-tight group-hover:text-brand-gold transition-colors font-sans whitespace-nowrap">
                  Decor Dazzlers
                </span>
              </Link>
            </div>

            {/* Center: Nav Links */}
            <div className="flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-[12px] font-bold tracking-wider uppercase transition-all relative font-sans ${
                      isActive ? "text-brand-gold" : "text-brand-plum/80 hover:text-brand-gold"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute left-0 bottom-[-4px] w-full h-[2px] bg-brand-gold rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right: Location + Cart + WhatsApp/Book */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {/* Location pill */}
              <div 
                onClick={onOpenLocationModal}
                className="flex items-center gap-1.5 bg-brand-cream border border-brand-gold/20 px-3 py-2 rounded-full cursor-pointer hover:border-brand-gold hover:shadow-sm transition-all"
                title="Click to pin or change location"
              >
                <MapPin className="h-3.5 w-3.5 text-brand-gold flex-shrink-0" />
                <span className="text-[11px] font-bold text-brand-plum font-sans whitespace-nowrap">
                  {location?.city || "Hyderabad"}
                </span>
              </div>

              {/* Shopping Cart Icon */}
              <div 
                onClick={() => setIsCartOpen(true)}
                className="relative cursor-pointer p-2.5 border border-gray-150 rounded-full hover:bg-brand-gold/10 hover:border-brand-gold/40 transition-all group"
              >
                <ShoppingBag className="h-4 w-4 text-brand-plum group-hover:text-brand-gold" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-[9px] font-black h-4.5 w-4.5 flex items-center justify-center shadow-sm animate-pulse">
                    {cartCount}
                  </span>
                )}
              </div>

              {/* Book Button */}
              <button
                onClick={() => openBookingModal()}
                className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white hover:text-white px-4 py-2.5 rounded-full font-sans text-[11px] font-bold tracking-wide uppercase transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
              >
                <Phone className="h-3.5 w-3.5 flex-shrink-0" />
                <span>Book Now</span>
              </button>
            </div>

          </div>

          {/* Search Bar Row — desktop only */}
          {pathname === "/" && (
            <div className="pb-3 -mt-1">
              <div className="relative max-w-lg mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-plum/35 pointer-events-none" />
                <input
                  type="text"
                  id="navbar-search"
                  placeholder="Search balloon art, birthday decor, stage setups..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-brand-gold pl-11 pr-4 py-2.5 rounded-full text-[13px] text-brand-plum font-sans focus:outline-none focus:ring-2 focus:ring-brand-gold/20 shadow-inner"
                  autoComplete="off"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ─── MOBILE NAV ─── */}
      <div className="md:hidden">
        <div className="px-4 pt-3 pb-2.5 space-y-2.5">
          {/* Row 1: Logo + Cart + Book */}
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
              <img
                src="/logo.png"
                alt="Decor Dazzlers Logo"
                className="h-18 sm:h-22 w-auto object-contain transition-all"
              />
              <div className="flex flex-col font-serif font-black text-sm sm:text-base leading-tight text-brand-plum tracking-tight">
                <span>Decor</span>
                <span className="text-brand-gold">Dazzlers</span>
              </div>
            </Link>

            <div className="flex items-center gap-2">
              {/* Shopping Cart - mobile */}
              <div 
                onClick={() => setIsCartOpen(true)}
                className="relative cursor-pointer p-1.5 border border-gray-200 rounded-full bg-white"
              >
                <ShoppingBag className="h-4 w-4 text-brand-plum" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-[8px] font-bold h-3.5 w-3.5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>

              <button
                onClick={() => openBookingModal()}
                className="bg-brand-plum text-white px-3 py-1.5 rounded-full font-sans text-[10px] tracking-wider uppercase font-bold cursor-pointer"
              >
                Book Now
              </button>
            </div>
          </div>

          {/* Row 2: Search bar */}
          {pathname === "/" && (
            <div className="w-full">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-plum/35 pointer-events-none" />
                <input
                  type="text"
                  id="mobile-search"
                  placeholder="Search balloon, birthday, floral..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-brand-gold pl-10 pr-4 py-2.5 rounded-xl text-[13px] text-brand-plum font-sans focus:outline-none focus:ring-1 focus:ring-brand-gold"
                  autoComplete="off"
                />
              </div>
            </div>
          )}

          {/* Row 3: Quick location info */}
          <div 
            onClick={onOpenLocationModal}
            className="flex items-center justify-between text-[11px] text-brand-plum/70 font-sans py-1 border-b border-gray-100 cursor-pointer hover:bg-gray-50/80 rounded px-1 transition-all"
            title="Click to pin or change location"
          >
            <div className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-brand-gold flex-shrink-0" />
              <span>
                Serving <strong className="text-brand-plum font-bold underline decoration-brand-gold">{location?.address || location?.city || "Hyderabad"}</strong> · <strong className="text-brand-plum font-bold">Same Day Setup Available</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── SLIDE-DOWN MEGA MENU (desktop) ─── */}
      {mobileMenuOpen && (
        <div className="hidden md:block border-t border-gray-100 bg-white/98 backdrop-blur-sm shadow-lg">
          <div className="max-w-7xl mx-auto px-8 py-6 flex items-start gap-12">
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-brand-plum/50 mb-3 font-sans">
                Navigate
              </p>
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-sans font-semibold text-brand-plum hover:text-brand-gold hover:pl-2 transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-brand-plum/50 mb-3 font-sans">
                Contact Us
              </p>
              <div className="space-y-2">
                <a href="tel:+919848677418" className="flex items-center gap-2 text-sm font-sans text-brand-plum hover:text-brand-gold transition-colors">
                  <Phone className="h-4 w-4 text-brand-gold" />
                  +91 98486 77418
                </a>
                <p className="text-xs font-sans text-brand-plum/60">Hyderabad, Telangana</p>
              </div>
            </div>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="ml-auto text-brand-plum/40 hover:text-brand-plum transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
