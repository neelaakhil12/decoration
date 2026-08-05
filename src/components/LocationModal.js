"use client";
import { useState, useEffect } from "react";
import { X, MapPin, Check } from "lucide-react";

export default function LocationModal({ isOpen, onClose, currentLocation = {}, onSelectLocation }) {
  const [plotNo, setPlotNo] = useState("");
  const [customAddressInput, setCustomAddressInput] = useState("");

  useEffect(() => {
    if (currentLocation?.address) {
      setCustomAddressInput(currentLocation.address);
    } else {
      setCustomAddressInput("Chaitanya Hills, Hyderabad");
    }
  }, [currentLocation]);

  if (!isOpen) return null;

  const handleSaveCustomLocation = () => {
    const plotPrefix = plotNo.trim() ? `Plot ${plotNo.trim().replace(/^plot\s*/i, "")}, ` : "";
    let finalAddress = customAddressInput.trim();

    if (!finalAddress) {
      finalAddress = `${plotPrefix}Chaitanya Hills, Hyderabad`;
    } else if (plotPrefix && !finalAddress.toLowerCase().includes("plot")) {
      finalAddress = `${plotPrefix}${finalAddress}`;
    }

    onSelectLocation({
      city: "Hyderabad",
      address: finalAddress,
    });
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md bg-white border border-brand-gold/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-scale-in max-h-[90vh]"
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
              <p className="text-[11px] text-brand-pink/80">Set exact plot, colony & area details</p>
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
        <div className="p-5 space-y-4 overflow-y-auto">
          
          {/* Current active location display */}
          <div className="p-3.5 bg-brand-cream/50 border border-brand-gold/20 rounded-2xl flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <MapPin className="h-4 w-4 text-brand-gold shrink-0" />
              <div className="text-left">
                <p className="text-[9px] uppercase font-sans font-bold text-gray-400 tracking-wider">Active Pinned Location</p>
                <p className="text-xs font-sans font-bold text-brand-plum leading-tight">
                  {currentLocation?.address || `${currentLocation?.city || "Hyderabad"} Metro`}
                </p>
              </div>
            </div>
            <span className="text-[9px] font-sans font-extrabold uppercase px-2 py-0.5 bg-green-100 text-green-700 border border-green-200 rounded-md shrink-0">
              Active
            </span>
          </div>

          {/* Plot & Exact Colony Address Form */}
          <div className="space-y-3 pt-1">
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-1 space-y-1">
                <label className="block text-[10px] uppercase font-sans font-bold text-brand-plum/80">
                  Plot / Flat No.
                </label>
                <input
                  type="text"
                  placeholder="e.g. Plot 42"
                  value={plotNo}
                  onChange={(e) => setPlotNo(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 focus:border-brand-gold rounded-xl text-xs font-sans text-brand-plum focus:outline-none"
                />
              </div>

              <div className="col-span-2 space-y-1">
                <label className="block text-[10px] uppercase font-sans font-bold text-brand-plum/80">
                  Colony / Street / Area
                </label>
                <input
                  type="text"
                  placeholder="e.g. Chaitanya Hills, Hyderabad"
                  value={customAddressInput}
                  onChange={(e) => setCustomAddressInput(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 focus:border-brand-gold rounded-xl text-xs font-sans text-brand-plum focus:outline-none"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleSaveCustomLocation}
              className="w-full bg-gold-gradient text-brand-plum py-2.5 rounded-xl font-sans text-xs tracking-wider uppercase font-bold shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center space-x-1.5"
            >
              <Check className="h-4 w-4" />
              <span>Confirm & Pin Location</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
