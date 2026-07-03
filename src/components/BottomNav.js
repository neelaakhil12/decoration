"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid, Calendar, ShoppingBag } from "lucide-react";

export default function BottomNav({ cartCount = 0 }) {
  const pathname = usePathname();
  const whatsappUrl = "https://wa.me/917075555987?text=Hello%20Decor%20Dazzlers,%20I%20would%20like%20to%20enquire%20about%20your%20luxury%20decoration%20services!";

  const tabs = [
    { name: "Home", href: "/", icon: Home },
    { name: "Services", href: "/services", icon: Grid },
    { name: "Bookings", href: "/contact", icon: Calendar },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-brand-cream border-t border-brand-gold/20 shadow-[0_-5px_15px_rgba(92,46,70,0.06)] flex items-center justify-around py-2 px-4 backdrop-blur-md">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.name}
            href={tab.href}
            className={`flex flex-col items-center justify-center flex-1 py-1.5 transition-all ${
              isActive 
                ? "text-brand-gold scale-105" 
                : "text-brand-plum/70 hover:text-brand-plum"
            }`}
          >
            <Icon className={`h-5 w-5 ${isActive ? "stroke-[2.5]" : "stroke-[1.8]"}`} />
            <span className="text-[10px] font-sans font-bold mt-1 tracking-wider uppercase">
              {tab.name}
            </span>
          </Link>
        );
      })}

      {/* WhatsApp Chat tab (Ebo-style Support) */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center flex-1 py-1.5 text-brand-plum/70 hover:text-brand-plum transition-all"
      >
        <svg
          className="h-5 w-5 fill-emerald-600 shrink-0"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.381 9.806-9.761.001-2.605-1.002-5.054-2.825-6.88C16.429 2.137 13.977 1.135 11.97 1.135c-5.411 0-9.816 4.39-9.82 9.771-.002 2.022.524 3.996 1.524 5.73l-.997 3.64 3.738-.981zM18.06 14.85c-.328-.164-1.944-.96-2.247-1.07-.303-.11-.524-.165-.744.164-.22.33-.852 1.07-1.045 1.29-.193.22-.386.248-.714.083-.328-.164-1.385-.51-2.637-1.628-.974-.87-1.632-1.944-1.823-2.272-.193-.329-.02-.507.144-.67.147-.147.328-.385.493-.577.165-.192.22-.33.329-.55.11-.22.055-.412-.028-.577-.082-.164-.744-1.79-.102-1.943-.22-.53-.448-.445-.655-.445-.206-.002-.44-.002-.673-.002-.232 0-.612.087-.932.44-.32.352-1.22 1.196-1.22 2.915 0 1.72 1.247 3.379 1.422 3.61.175.23 2.456 3.749 5.95 5.257.83.358 1.48.571 1.986.732.834.266 1.593.228 2.193.138.669-.1 2.043-.834 2.332-1.64.29-.806.29-1.498.203-1.64-.087-.14-.32-.224-.648-.388z" />
        </svg>
        <span className="text-[10px] font-sans font-bold mt-1 tracking-wider uppercase text-emerald-600">
          Chat
        </span>
      </a>

      {/* Cart/Bag Tab */}
      <Link
        href="/contact?action=enquire"
        className="flex flex-col items-center justify-center flex-1 py-1.5 text-brand-plum/70 hover:text-brand-plum transition-all relative"
      >
        <div className="relative">
          <ShoppingBag className="h-5 w-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-brand-gold text-brand-plum border border-brand-cream text-[9px] font-sans font-extrabold rounded-full h-4.5 w-4.5 flex items-center justify-center shadow-md animate-bounce">
              {cartCount}
            </span>
          )}
        </div>
        <span className="text-[10px] font-sans font-bold mt-1 tracking-wider uppercase">
          Cart
        </span>
      </Link>
    </div>
  );
}
