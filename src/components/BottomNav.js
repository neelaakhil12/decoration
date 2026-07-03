"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid, Info, Image, Phone } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  const tabs = [
    { name: "Home", href: "/", icon: Home },
    { name: "Services", href: "/services", icon: Grid },
    { name: "About Us", href: "/about", icon: Info },
    { name: "Gallery", href: "/#gallery", icon: Image },
    { name: "Contact Us", href: "/contact", icon: Phone },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-brand-cream border-t border-brand-gold/20 shadow-[0_-5px_15px_rgba(92,46,70,0.06)] flex items-center justify-around py-2 px-1 backdrop-blur-md">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.name}
            href={tab.href}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
              isActive 
                ? "text-brand-gold scale-105" 
                : "text-brand-plum/70 hover:text-brand-plum"
            }`}
          >
            <Icon className={`h-4.5 w-4.5 ${isActive ? "stroke-[2.5]" : "stroke-[1.8]"}`} />
            <span className="text-[8px] font-sans font-bold mt-1 tracking-wider uppercase whitespace-nowrap">
              {tab.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
