"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 bg-brand-cream py-4 border-b border-brand-gold/15 shadow-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <img
              src="/logo.png"
              alt="Decor Dazzlers Logo"
              className="h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative font-sans text-xs tracking-widest uppercase transition-colors duration-300 ${
                    isActive
                      ? "text-brand-gold font-bold"
                      : "text-brand-plum hover:text-brand-gold"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute left-0 bottom-[-6px] w-full h-[2px] bg-brand-gold rounded-full" />
                  )}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="bg-gold-gradient text-brand-plum px-6 py-2.5 rounded-full font-sans text-xs tracking-wider uppercase font-bold gold-glow-hover transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-plum hover:text-brand-gold p-2 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-brand-cream border-t border-brand-gold/15 animate-fade-in absolute top-full left-0 w-full shadow-2xl">
          <div className="px-4 pt-2 pb-6 space-y-2 text-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-3 rounded-lg text-sm tracking-widest uppercase font-bold transition-all duration-300 ${
                    isActive
                      ? "text-brand-gold bg-brand-gold/10"
                      : "text-brand-plum hover:text-brand-gold"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-4 px-3">
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-gold-gradient text-brand-plum px-6 py-3 rounded-full font-sans text-xs tracking-wider uppercase font-bold gold-glow"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
