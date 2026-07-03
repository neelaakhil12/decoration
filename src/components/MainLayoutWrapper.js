"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import FloatingActions from "@/components/FloatingActions";
import LocationModal from "@/components/LocationModal";
import { useApp } from "@/components/AppContext";

export default function MainLayoutWrapper({ children }) {
  const {
    location,
    selectLocation,
    searchQuery,
    setSearchQuery,
    cartCount,
    isLocationOpen,
    setIsLocationOpen
  } = useApp();

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
      <main className="flex-grow pt-44 md:pt-28 pb-16 md:pb-0">
        {children}
      </main>

      <Footer />
      <FloatingActions />
      <BottomNav cartCount={cartCount} />

      <LocationModal
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
        currentLocation={location}
        onSelectLocation={selectLocation}
      />
    </>
  );
}
