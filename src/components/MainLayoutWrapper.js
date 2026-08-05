"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import FloatingActions from "@/components/FloatingActions";
import LocationModal from "@/components/LocationModal";
import BookingModal from "@/components/BookingModal";
import { useApp } from "@/components/AppContext";

export default function MainLayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin") || pathname?.startsWith("/adminlogin");

  const {
    location,
    selectLocation,
    searchQuery,
    setSearchQuery,
    isLocationOpen,
    setIsLocationOpen
  } = useApp();

  if (isAdminRoute) {
    return (
      <main className="min-h-screen bg-white">
        {children}
      </main>
    );
  }

  return (
    <>
      <Navbar
        location={location}
        onOpenLocationModal={() => setIsLocationOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      {/* Account for header height and bottom mobile navigation height */}
      <main className="flex-grow pt-[135px] md:pt-38 pb-0 bg-brand-cream">
        {children}
      </main>

      <Footer />
      <FloatingActions />
      <BottomNav />
      <LocationModal
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
        currentLocation={location}
        onSelectLocation={selectLocation}
      />
      <BookingModal />
    </>
  );
}
