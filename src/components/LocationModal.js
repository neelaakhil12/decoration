"use client";
import { useState } from "react";
import { X, MapPin, Navigation, Search, Check } from "lucide-react";

export default function LocationModal({ isOpen, onClose, currentLocation, onSelectLocation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState(currentLocation.city || "Mumbai");

  if (!isOpen) return null;

  const cities = [
    { name: "Mumbai", label: "Mumbai Metro" },
    { name: "Hyderabad", label: "Hyderabad" },
    { name: "Bangalore", label: "Bengaluru" },
    { name: "Pune", label: "Pune Metro" },
    { name: "Delhi", label: "Delhi NCR" },
    { name: "Siliguri", label: "Siliguri" }
  ];

  const suggestedAddresses = searchQuery
    ? [
        `${searchQuery}, Gachibowli, Hyderabad`,
        `${searchQuery}, Andheri West, Mumbai`,
        `${searchQuery}, Indiranagar, Bangalore`,
        `${searchQuery}, Kothrud, Pune`,
        `${searchQuery}, Connaught Place, New Delhi`,
        `${searchQuery}, Hill Cart Road, Siliguri`
      ]
    : [
        "Andheri West, Mumbai, MH",
        "Gachibowli, Hyderabad, TS",
        "Indiranagar, Bengaluru, KA",
        "Kothrud, Pune, MH",
        "Connaught Place, New Delhi, DL",
        "Hill Cart Road, Siliguri, WB"
      ];

  const handleCitySelect = (cityName) => {
    setSelectedCity(cityName);
    onSelectLocation({
      city: cityName,
      address: `${cityName} Center, Area Office`
    });
    onClose();
  };

  const handleAddressSelect = (addressText) => {
    // Detect matching city based on string content
    const matchedCityObj = cities.find(c => 
      addressText.toLowerCase().includes(c.name.toLowerCase())
    );
    const cityName = matchedCityObj ? matchedCityObj.name : selectedCity;

    onSelectLocation({
      city: cityName,
      address: addressText
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div 
        className="w-full max-w-lg bg-brand-cream border border-brand-gold/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-brand-gold/15 flex items-center justify-between bg-brand-plum text-brand-cream">
          <div className="flex items-center space-x-3">
            <MapPin className="h-6 w-6 text-brand-gold" />
            <div>
              <h3 className="font-serif text-lg font-bold text-brand-cream">Select Service Location</h3>
              <p className="text-xs text-brand-pink/70">Providing setups in major Indian cities</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-full hover:bg-white/10 text-brand-cream hover:text-brand-gold transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-grow overflow-y-auto scroll-bar-remove space-y-6">
          
          {/* Current location display */}
          <div className="p-4 bg-brand-pink/20 border border-brand-rosegold/20 rounded-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Navigation className="h-5 w-5 text-brand-plum/70 shrink-0" />
              <div className="text-left">
                <p className="text-[10px] uppercase font-sans font-bold text-brand-rosegold tracking-wider">Currently Selected</p>
                <p className="text-sm font-sans font-bold text-brand-plum leading-tight">
                  {currentLocation.address || `${currentLocation.city} Metro`}
                </p>
              </div>
            </div>
            <span className="text-[10px] font-sans font-extrabold uppercase px-2 py-1 bg-brand-gold/20 text-brand-plum border border-brand-gold/30 rounded-md">
              Active
            </span>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-plum/40" />
            <input
              type="text"
              placeholder="Search address, area or landmark..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-brand-rosegold/20 focus:border-brand-gold pl-12 pr-6 py-3.5 rounded-2xl text-sm text-brand-plum placeholder:text-brand-plum/40 font-sans focus:outline-none focus:ring-1 focus:ring-brand-gold transition-all shadow-sm"
            />
          </div>

          {/* Select City Grid */}
          <div>
            <h4 className="font-serif text-sm font-bold text-brand-plum mb-3">Popular Cities</h4>
            <div className="grid grid-cols-3 gap-3">
              {cities.map((city) => {
                const isSelected = selectedCity === city.name;
                return (
                  <button
                    key={city.name}
                    onClick={() => handleCitySelect(city.name)}
                    className={`p-3 rounded-xl text-center border font-sans text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center space-y-1 ${
                      isSelected
                        ? "bg-brand-plum text-brand-cream border-brand-plum shadow-md"
                        : "bg-white text-brand-plum/80 border-brand-rosegold/10 hover:border-brand-gold hover:bg-brand-pink/5"
                    }`}
                  >
                    <span className="truncate w-full">{city.label}</span>
                    {isSelected && <Check className="h-3.5 w-3.5 text-brand-gold mt-0.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Suggested Locations / Searches */}
          <div>
            <h4 className="font-serif text-sm font-bold text-brand-plum mb-3">
              {searchQuery ? "Search Results" : "Recent / Suggested Locations"}
            </h4>
            <div className="space-y-2">
              {suggestedAddresses.map((addr) => (
                <button
                  key={addr}
                  onClick={() => handleAddressSelect(addr)}
                  className="w-full p-3.5 bg-white hover:bg-brand-pink/5 border border-brand-rosegold/5 hover:border-brand-gold/30 rounded-xl text-left flex items-start space-x-3 transition-colors cursor-pointer"
                >
                  <MapPin className="h-4 w-4 text-brand-rosegold shrink-0 mt-0.5" />
                  <span className="text-xs text-brand-plum/80 font-sans leading-tight">{addr}</span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
