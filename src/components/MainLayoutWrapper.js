"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import FloatingActions from "@/components/FloatingActions";
import CartDrawer from "@/components/CartDrawer";
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
    cartCount,
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
        cartCount={cartCount}
      />
      
      {/* Account for header height and bottom mobile navigation height */}
      <main className="flex-grow pt-[205px] md:pt-44 pb-16 md:pb-0 bg-white">
        {children}
      </main>

      <Footer />
      <FloatingActions />
      <BottomNav cartCount={cartCount} />
      <CartDrawer />
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
