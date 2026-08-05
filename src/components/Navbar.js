"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Search, Phone, Menu, X, ChevronDown, ShoppingBag } from "lucide-react";
import { useApp } from "@/components/AppContext";

export default function Navbar({
  location = { city: "Hyderabad", address: "Hyderabad Metro" },
  onOpenLocationModal = () => {},
  searchQuery = "",
  onSearchChange = () => {},
  cartCount = 0
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { services, galleryItems, setIsCartOpen, openBookingModal } = useApp();

  const allProducts = (services && services.length > 0) ? services : (galleryItems || []);
  const searchResults = (searchQuery && searchQuery.trim().length > 0)
    ? allProducts.filter((item) => {
        const q = searchQuery.toLowerCase().trim();
        const title = String(item.title || "").toLowerCase();
        const category = String(item.category || "").toLowerCase();
        const subCategory = String(item.subCategory || "").toLowerCase();
        const decorShape = String(item.decorShape || "").toLowerCase();
        return title.includes(q) || category.includes(q) || subCategory.includes(q) || decorShape.includes(q);
      })
    : [];

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Our Packages", href: "/gallery" },
    { name: "Recent Projects", href: "/recent-projects" },
    { name: "About Us", href: "/about" },
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

            {/* Right: Book Now Button */}
            <div className="flex items-center gap-3 flex-shrink-0">
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

          {/* Search Bar Row — desktop & mobile accessible */}
          {!pathname.startsWith("/admin") && (
            <div className="pb-3 -mt-1 relative">
              <div className="relative max-w-lg mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-plum/35 pointer-events-none" />
                <input
                  type="text"
                  id="navbar-search"
                  placeholder="Search balloon art, birthday decor, stage setups..."
                  value={searchQuery}
                  onFocus={() => setIsSearchFocused(true)}
                  onChange={(e) => {
                    const val = e.target.value;
                    onSearchChange(val);
                    setIsSearchFocused(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setIsSearchFocused(false);
                      if (pathname === "/") {
                        const el = document.getElementById("gallery");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      } else {
                        router.push("/gallery");
                      }
                    }
                  }}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-brand-gold pl-11 pr-10 py-2.5 rounded-full text-[13px] text-brand-plum font-sans focus:outline-none focus:ring-2 focus:ring-brand-gold/20 shadow-inner"
                  autoComplete="off"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      onSearchChange("");
                      setIsSearchFocused(false);
                    }}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-brand-plum rounded-full cursor-pointer"
                    title="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}

                {/* Floating Live Search Dropdown */}
                {searchQuery.trim().length > 0 && isSearchFocused && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-fade-in max-h-96 overflow-y-auto">
                    <div className="p-3 bg-brand-cream/80 border-b border-gray-150 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-brand-plum uppercase tracking-wider font-sans">
                        Search Results ({searchResults.length})
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setIsSearchFocused(false);
                          if (pathname === "/") {
                            const el = document.getElementById("gallery");
                            if (el) el.scrollIntoView({ behavior: "smooth" });
                          } else {
                            router.push("/gallery");
                          }
                        }}
                        className="text-[11px] font-bold text-[#2563EB] hover:underline flex items-center gap-1 cursor-pointer font-sans"
                      >
                        <span>View All Packages</span>
                        <ChevronDown className="h-3 w-3 -rotate-90" />
                      </button>
                    </div>

                    {searchResults.length > 0 ? (
                      <div className="divide-y divide-gray-100">
                        {searchResults.slice(0, 6).map((product) => {
                          const slugTitle = (product.title || "decoration-package").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
                          return (
                            <Link
                              key={product.id}
                              href={`/products/decor/${product.id}/${slugTitle}`}
                              onClick={() => {
                                setIsSearchFocused(false);
                              }}
                              className="p-3 flex items-center space-x-3 hover:bg-blue-50/60 transition-colors group cursor-pointer text-left"
                            >
                              <img
                                src={product.image || "/images/birthday_decor.png"}
                                alt={product.title}
                                className="h-11 w-11 rounded-xl object-cover border border-gray-200 shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#2563EB] truncate font-sans">
                                  {product.title}
                                </h4>
                                <div className="flex items-center space-x-2 text-[10px] text-gray-500 font-sans mt-0.5">
                                  <span className="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-bold">
                                    {product.decorShape || product.subCategory || "Wall Decor"}
                                  </span>
                                  <span>{product.category || "Decoration"}</span>
                                </div>
                              </div>
                              <div className="text-right shrink-0">
                                <span className="text-xs font-black text-[#2563EB] font-sans">
                                  ₹{product.price || 3499}
                                </span>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="p-5 text-center text-xs text-gray-500 font-sans">
                        No packages found for "<strong className="text-brand-plum">{searchQuery}</strong>". Try searching <em>birthday, stage, balloon, wall decor</em>.
                      </div>
                    )}
                  </div>
                )}
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
              <button
                onClick={() => openBookingModal()}
                className="bg-brand-plum text-white px-3 py-1.5 rounded-full font-sans text-[10px] tracking-wider uppercase font-bold cursor-pointer"
              >
                Book Now
              </button>
            </div>
          </div>

          {/* Row 2: Search bar for mobile */}
          {!pathname.startsWith("/admin") && (
            <div className="w-full relative">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-plum/35 pointer-events-none" />
                <input
                  type="text"
                  id="mobile-search"
                  placeholder="Search balloon, birthday, floral..."
                  value={searchQuery}
                  onFocus={() => setIsSearchFocused(true)}
                  onChange={(e) => {
                    const val = e.target.value;
                    onSearchChange(val);
                    setIsSearchFocused(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setIsSearchFocused(false);
                      if (pathname === "/") {
                        const el = document.getElementById("gallery");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      } else {
                        router.push("/gallery");
                      }
                    }
                  }}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-brand-gold pl-10 pr-9 py-2.5 rounded-xl text-[13px] text-brand-plum font-sans focus:outline-none focus:ring-1 focus:ring-brand-gold"
                  autoComplete="off"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      onSearchChange("");
                      setIsSearchFocused(false);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-brand-plum rounded-full cursor-pointer"
                    title="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}

                {/* Mobile Floating Live Search Dropdown */}
                {searchQuery.trim().length > 0 && isSearchFocused && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-fade-in max-h-80 overflow-y-auto">
                    <div className="p-2.5 bg-brand-cream/80 border-b border-gray-150 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-brand-plum uppercase tracking-wider font-sans">
                        Results ({searchResults.length})
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setIsSearchFocused(false);
                          if (pathname === "/") {
                            const el = document.getElementById("gallery");
                            if (el) el.scrollIntoView({ behavior: "smooth" });
                          } else {
                            router.push("/gallery");
                          }
                        }}
                        className="text-[10px] font-bold text-[#2563EB] hover:underline cursor-pointer font-sans"
                      >
                        View All
                      </button>
                    </div>

                    {searchResults.length > 0 ? (
                      <div className="divide-y divide-gray-100">
                        {searchResults.slice(0, 5).map((product) => {
                          const slugTitle = (product.title || "decoration-package").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
                          return (
                            <Link
                              key={product.id}
                              href={`/products/decor/${product.id}/${slugTitle}`}
                              onClick={() => {
                                setIsSearchFocused(false);
                              }}
                              className="p-2.5 flex items-center space-x-2.5 hover:bg-blue-50/60 transition-colors group cursor-pointer text-left"
                            >
                              <img
                                src={product.image || "/images/birthday_decor.png"}
                                alt={product.title}
                                className="h-10 w-10 rounded-lg object-cover border border-gray-200 shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#2563EB] truncate font-sans">
                                  {product.title}
                                </h4>
                                <p className="text-[10px] text-gray-500 font-sans truncate">
                                  {product.category} · {product.decorShape || "Wall Decor"}
                                </p>
                              </div>
                              <span className="text-xs font-black text-[#2563EB] font-sans shrink-0">
                                ₹{product.price || 3499}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="p-4 text-center text-xs text-gray-500 font-sans">
                        No results for "{searchQuery}"
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}


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
