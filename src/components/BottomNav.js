"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid, Sparkles, Info, Phone } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  const tabs = [
    { name: "Home", href: "/", icon: Home },
    { name: "Services", href: "/services", icon: Grid },
    { name: "Packages", href: "/gallery", icon: Sparkles },
    { name: "About", href: "/about", icon: Info },
    { name: "Contact", href: "/contact", icon: Phone },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-45 md:hidden bg-white border-t border-gray-100 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] flex items-center justify-around py-1.5 px-1 backdrop-blur-md">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = pathname === tab.href;
        
        return (
          <Link
            key={tab.name}
            href={tab.href}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-all relative ${
              isActive 
                ? "text-brand-gold scale-105" 
                : "text-brand-plum/60 hover:text-brand-plum"
            }`}
          >
            <div className="relative">
              <Icon className={`h-4.5 w-4.5 ${isActive ? "stroke-[2.2]" : "stroke-[1.6]"}`} />
            </div>
            <span className="text-[9px] font-sans font-bold mt-1 tracking-wide uppercase whitespace-nowrap">
              {tab.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
