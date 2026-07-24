"use client";
import { useState } from "react";
import { X, MapPin, Navigation, Loader2 } from "lucide-react";

export default function LocationModal({ isOpen, onClose, currentLocation = {}, onSelectLocation }) {
  const [isDetecting, setIsDetecting] = useState(false);

  if (!isOpen) return null;

  const handleDetectLocation = () => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setIsDetecting(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          if (res.ok) {
            const data = await res.json();
            if (data && data.address) {
              const city = data.address.city || data.address.town || data.address.village || data.address.state_district || "Hyderabad";
              const area = data.address.suburb || data.address.neighbourhood || data.address.residential || data.address.road || city;
              const fullAddress = `${area}, ${city}`;
              
              onSelectLocation({
                city: city,
                address: fullAddress
              });
              setIsDetecting(false);
              onClose();
              return;
            }
          }
        } catch (err) {
          console.error("Geocoding failed:", err);
        }

        // Fallback
        onSelectLocation({
          city: "Hyderabad",
          address: `Pinned Location (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`
        });
        setIsDetecting(false);
        onClose();
      },
      (error) => {
        setIsDetecting(false);
        alert("Unable to detect GPS position. Please ensure location access is enabled on your device.");
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-sm bg-white border border-brand-gold/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-brand-gold/15 flex items-center justify-between bg-brand-plum text-brand-cream">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-brand-gold/20 rounded-full text-brand-gold">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-white">Pin Your Location</h3>
              <p className="text-[11px] text-brand-pink/80">Get accurate setup & service availability</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-full hover:bg-white/10 text-white hover:text-brand-gold transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          
          {/* Current active location */}
          <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <MapPin className="h-4 w-4 text-brand-gold shrink-0" />
              <div className="text-left">
                <p className="text-[9px] uppercase font-sans font-bold text-gray-400 tracking-wider">Current Location</p>
                <p className="text-xs font-sans font-bold text-brand-plum leading-tight">
                  {currentLocation?.address || `${currentLocation?.city || "Hyderabad"} Metro`}
                </p>
              </div>
            </div>
            <span className="text-[9px] font-sans font-extrabold uppercase px-2 py-0.5 bg-green-100 text-green-700 border border-green-200 rounded-md shrink-0">
              Active
            </span>
          </div>

          {/* GPS Auto-Detect & Pin Button */}
          <button
            onClick={handleDetectLocation}
            disabled={isDetecting}
            className="w-full p-4 bg-brand-plum hover:bg-brand-plum/90 text-white rounded-2xl flex items-center justify-center space-x-3 shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-75"
          >
            {isDetecting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin text-brand-gold" />
                <span className="text-xs font-bold font-sans tracking-wide">Detecting GPS Position...</span>
              </>
            ) : (
              <>
                <Navigation className="h-5 w-5 fill-current text-brand-gold" />
                <span className="text-xs font-bold font-sans tracking-wide uppercase">Pin My Location</span>
              </>
            )}
          </button>

        </div>
      </div>
    </div>
  );
}
