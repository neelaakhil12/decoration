"use client";
import { useState, useEffect } from "react";
import { X, Sparkles, MapPin, Compass, Send, Phone, Mail, User, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { useApp } from "@/components/AppContext";

const DECORATION_REQUIREMENTS = [
  { id: "birthday", label: "Birthday Decor", icon: "🎂" },
  { id: "baby_welcome", label: "Baby Welcome", icon: "👶" },
  { id: "kids_party", label: "Kid's Party", icon: "🎈" },
  { id: "anniversary", label: "Anniversary", icon: "💍" },
  { id: "baby_shower", label: "Baby Shower", icon: "🍼" },
  { id: "stage_wedding", label: "Stage & Wedding", icon: "💒" },
  { id: "house_warming", label: "House Warming", icon: "🏡" },
  { id: "festival_decor", label: "Festival Decor", icon: "🪔" },
  { id: "car_decor", label: "Car Decor", icon: "🚗" },
  { id: "something_else", label: "Something Else", icon: "✨" },
];

export default function BookingModal() {
  const { isBookingOpen, closeBookingModal, bookingItem, addBooking } = useApp();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedRequirement, setSelectedRequirement] = useState("Birthday Decor");
  const [selectedThemeTitle, setSelectedThemeTitle] = useState("");
  const [address, setAddress] = useState("");
  const [locationLink, setLocationLink] = useState("");
  const [customNotes, setCustomNotes] = useState("");
  
  const [locating, setLocating] = useState(false);
  const [locatingStatus, setLocatingStatus] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (bookingItem) {
      if (typeof bookingItem === "object" && bookingItem.title) {
        setSelectedThemeTitle(bookingItem.title);
        // Pre-select category if matching
        const cat = bookingItem.category;
        if (cat) {
          const match = DECORATION_REQUIREMENTS.find(
            (r) => r.label.toLowerCase().includes(cat.toLowerCase()) || cat.toLowerCase().includes(r.label.toLowerCase())
          );
          if (match) setSelectedRequirement(match.label);
        }
      } else if (typeof bookingItem === "string") {
        setSelectedRequirement(bookingItem);
        setSelectedThemeTitle("");
      }
    } else {
      setSelectedThemeTitle("");
    }
  }, [bookingItem, isBookingOpen]);

  if (!isBookingOpen) return null;

  // Handle Geolocation Locate Me
  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLocating(true);
    setLocatingStatus("Fetching current location...");
    setError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const mapsUrl = `https://maps.google.com/?q=${latitude},${longitude}`;
        setLocationLink(mapsUrl);
        setLocatingStatus("Current location attached!");
        setLocating(false);
      },
      (err) => {
        console.error("Location error:", err);
        setError("Unable to retrieve current location. You can paste your location link or address manually.");
        setLocating(false);
        setLocatingStatus("");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }

    // Save booking details to Admin Panel
    if (addBooking) {
      addBooking({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        requirement: selectedRequirement,
        selectedTheme: selectedThemeTitle || "General Inquiry",
        address: address.trim(),
        locationLink: locationLink.trim(),
        customNotes: customNotes.trim(),
      });
    }

    // Construct clean WhatsApp Message (no asterisks or special unicode symbols that fail on desktop)
    let messageText = `DECOR DAZZLERS - BOOKING INQUIRY\n`;
    messageText += `----------------------------------------\n`;
    messageText += `Name: ${name.trim()}\n`;
    messageText += `Phone: ${phone.trim()}\n`;
    if (email.trim()) messageText += `Email: ${email.trim()}\n`;
    messageText += `Decoration Requirement: ${selectedRequirement}\n`;
    if (selectedThemeTitle) {
      messageText += `Selected Theme: ${selectedThemeTitle}\n`;
    }
    if (address.trim()) {
      messageText += `Address: ${address.trim()}\n`;
    }
    if (locationLink.trim()) {
      messageText += `Location Link: ${locationLink.trim()}\n`;
    }
    if (customNotes.trim()) {
      messageText += `Other / Custom Requirements: ${customNotes.trim()}\n`;
    }
    messageText += `----------------------------------------\n`;
    messageText += `Sent via Decor Dazzlers Website`;

    const whatsappUrl = `https://wa.me/919848677418?text=${encodeURIComponent(messageText)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, "_blank");
    closeBookingModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white border border-brand-gold/30 rounded-3xl w-full max-w-xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-plum via-[#3B1231] to-brand-plum p-4 sm:p-5 text-white flex items-center justify-between relative flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-brand-gold/20 rounded-2xl text-brand-gold">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-serif font-black tracking-tight text-white">
                Book Your <span className="text-brand-gold italic">Decoration</span>
              </h2>
              <p className="text-xs text-white/70 font-sans">
                Fill details & send direct inquiry to WhatsApp
              </p>
            </div>
          </div>
          <button
            onClick={closeBookingModal}
            className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-all cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Selected Theme Badge if triggered for specific product */}
        {selectedThemeTitle && (
          <div className="bg-brand-cream border-b border-brand-gold/20 px-5 py-2.5 flex items-center gap-2 text-xs font-bold text-brand-plum font-sans">
            <span className="text-brand-gold">Selected Setup:</span>
            <span className="bg-white px-2.5 py-1 rounded-md border border-brand-gold/30 text-brand-plum truncate">
              {selectedThemeTitle}
            </span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSendMessage} className="p-4 sm:p-6 overflow-y-auto space-y-4 font-sans flex-grow">
          
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-bold flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Row 1: Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-brand-plum uppercase tracking-wider mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-brand-gold pl-10 pr-3.5 py-2.5 rounded-xl text-sm text-brand-plum focus:outline-none focus:ring-2 focus:ring-brand-gold/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-plum uppercase tracking-wider mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-brand-gold pl-10 pr-3.5 py-2.5 rounded-xl text-sm text-brand-plum focus:outline-none focus:ring-2 focus:ring-brand-gold/20"
                />
              </div>
            </div>
          </div>

          {/* Email ID */}
          <div>
            <label className="block text-xs font-bold text-brand-plum uppercase tracking-wider mb-1">
              Email ID
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 focus:border-brand-gold pl-10 pr-3.5 py-2.5 rounded-xl text-sm text-brand-plum focus:outline-none focus:ring-2 focus:ring-brand-gold/20"
              />
            </div>
          </div>

          {/* Select Decoration Requirement (Visual Selection Cards + Dropdown fallback) */}
          <div>
            <label className="block text-xs font-bold text-brand-plum uppercase tracking-wider mb-1.5">
              Select Decoration Requirement <span className="text-red-500">*</span>
            </label>
            
            {/* Grid Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-2">
              {DECORATION_REQUIREMENTS.map((req) => {
                const isSelected = selectedRequirement === req.label;
                return (
                  <button
                    type="button"
                    key={req.id}
                    onClick={() => setSelectedRequirement(req.label)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all text-left cursor-pointer ${
                      isSelected
                        ? "bg-brand-plum text-white border-brand-plum shadow-sm"
                        : "bg-gray-50 text-brand-plum/80 border-gray-200 hover:border-brand-gold hover:bg-white"
                    }`}
                  >
                    <span className="text-base">{req.icon}</span>
                    <span className="truncate">{req.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-xs font-bold text-brand-plum uppercase tracking-wider mb-1">
              Full Event Address
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
              <textarea
                rows={2}
                placeholder="Flat / House No., Street, Landmark, Area in Hyderabad..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 focus:border-brand-gold pl-10 pr-3.5 py-2.5 rounded-xl text-sm text-brand-plum focus:outline-none focus:ring-2 focus:ring-brand-gold/20 resize-none"
              />
            </div>
          </div>

          {/* Location Link with "Locate Me" Button */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-brand-plum uppercase tracking-wider">
                Google Maps Location Link
              </label>
              <button
                type="button"
                onClick={handleLocateMe}
                disabled={locating}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-gold hover:text-brand-plum bg-brand-cream border border-brand-gold/30 px-2.5 py-1 rounded-lg hover:border-brand-gold transition-all cursor-pointer"
              >
                <Compass className={`h-3.5 w-3.5 ${locating ? "animate-spin text-brand-plum" : "text-brand-gold"}`} />
                <span>{locating ? "Locating..." : "📍 Locate Me"}</span>
              </button>
            </div>

            <input
              type="url"
              placeholder="Paste Google Maps URL or use 'Locate Me' button"
              value={locationLink}
              onChange={(e) => setLocationLink(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 focus:border-brand-gold px-3.5 py-2.5 rounded-xl text-sm text-brand-plum focus:outline-none focus:ring-2 focus:ring-brand-gold/20"
            />

            {locatingStatus && (
              <p className="text-[11px] font-bold text-green-600 flex items-center gap-1 mt-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                {locatingStatus}
              </p>
            )}
          </div>

          {/* Other Requirements / Custom Note */}
          <div>
            <label className="block text-xs font-bold text-brand-plum uppercase tracking-wider mb-1">
              Other Custom Requirements / Notes
            </label>
            <div className="relative">
              <FileText className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
              <textarea
                rows={2}
                placeholder="Specific balloon colors, event date & time, special theme customization..."
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 focus:border-brand-gold pl-10 pr-3.5 py-2.5 rounded-xl text-sm text-brand-plum focus:outline-none focus:ring-2 focus:ring-brand-gold/20 resize-none"
              />
            </div>
          </div>

          {/* Action Button: Send Message via WhatsApp */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-2xl font-sans font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              <Send className="h-4 w-4" />
              <span>Send Message & Book on WhatsApp</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
