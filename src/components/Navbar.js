"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Search, ShoppingBag, Bolt, User, ChevronDown } from "lucide-react";

export default function Navbar({
  location = { city: "Mumbai", address: "Mumbai Metro" },
  onOpenLocationModal = () => {},
  searchQuery = "",
  onSearchChange = () => {},
  cartCount = 0
}) {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About Us", href: "/about" },
    { name: "Gallery", href: "/#gallery" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-brand-cream border-b border-brand-gold/15 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        {/* DESKTOP VIEWPORT (md and up) */}
        <div className="hidden md:flex items-center justify-between gap-4 h-20">
          
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center group">
            <img
              src="/logo.png"
              alt="Decor Dazzlers Logo"
              className="h-28 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Search Bar */}
          {pathname === "/" && (
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-brand-plum/40" />
              <input
                type="text"
                placeholder="Search balloon art, stage setups, birthdays..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-white border border-brand-rosegold/15 focus:border-brand-gold pl-11 pr-4 py-2.5 rounded-full text-xs text-brand-plum font-sans focus:outline-none focus:ring-1 focus:ring-brand-gold shadow-inner"
              />
            </div>
          )}

          {/* Right Navigation */}
          <div className="flex items-center space-x-6 shrink-0">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-sans text-[11px] tracking-wider uppercase font-bold transition-all relative ${
                    isActive ? "text-brand-gold" : "text-brand-plum hover:text-brand-gold"
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
        </div>

        {/* MOBILE VIEWPORT (smaller than md) */}
        <div className="md:hidden flex flex-col space-y-2.5">
          {/* Row 1: Logo (Left) & Book Now Button (Right) */}
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center shrink-0">
              <img
                src="/logo.png"
                alt="Decor Dazzlers Logo"
                className="h-20 w-auto object-contain"
              />
            </Link>

            <Link
              href="/contact"
              className="bg-brand-plum text-brand-cream border border-brand-plum px-4 py-2 rounded-full font-sans text-xs tracking-wider uppercase font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              Book Now
            </Link>
          </div>

          {/* Row 2: Search Bar */}
          {pathname === "/" && (
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-plum/40" />
              <input
                type="text"
                placeholder="Search balloon, birthday, floral..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-white border border-brand-rosegold/15 focus:border-brand-gold pl-10 pr-4 py-2.5 rounded-xl text-xs text-brand-plum font-sans focus:outline-none focus:ring-1 focus:ring-brand-gold"
              />
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}
