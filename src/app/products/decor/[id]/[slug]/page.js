"use client";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Share2, 
  ArrowLeft, 
  ChevronRight,
  ChevronLeft, 
  Sparkles,
  Edit3,
  CheckCircle2,
  MapPin,
  Calendar,
  Clock,
  PlusCircle,
  X,
  Phone
} from "lucide-react";
import { useApp } from "@/components/AppContext";

export default function ProductDetailPage({ params }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const productId = resolvedParams?.id;

  const { 
    services, 
    addToCart, 
    openBookingModal, 
    location, 
    setIsLocationOpen 
  } = useApp();

  const [product, setProduct] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [activeTabModal, setActiveTabModal] = useState(null); // 'process', 'shape', 'includes'

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("Morning (8:00 AM - 11:00 AM)");

  useEffect(() => {
    if (productId && services) {
      const found = services.find(
        (s) => s.id?.toLowerCase() === productId?.toLowerCase() || s.id === productId
      );
      if (found) {
        setProduct(found);
      } else {
        setProduct(services[0]);
      }
    }
  }, [productId, services]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] py-20 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#2563EB] mb-4" />
        <p className="text-gray-700 font-sans font-bold text-sm">Loading decoration details...</p>
      </div>
    );
  }

  const originalPrice = product.originalPrice || Math.round(product.price * 1.4);
  const savings = originalPrice - product.price;

  // Gallery slider images
  const sliderImages = (product.images && product.images.length > 0)
    ? product.images
    : [product.image || "/images/birthday_decor.png"];
  // Rating & Reviews Data Calculation
  const reviewsList = (product.reviews && product.reviews.length > 0)
    ? product.reviews
    : [
        { id: "rev-1", reviewerName: "Sneha Reddy", rating: 5, comment: "Absolutely loved this decoration setup! The balloons were vibrant, sturdy, and lasted for days. The crew arrived right on time.", date: "2 days ago" },
        { id: "rev-2", reviewerName: "Rahul Verma", rating: 5, comment: "Theme matching was 100% accurate to what was promised. Photobooth area looked extremely luxurious in our family portraits!", date: "1 week ago" },
        { id: "rev-3", reviewerName: "Anjali Mehta", rating: 4, comment: "Very fast installation and clean teardown support. Everyone at our party asked for Decor Dazzlers contact number!", date: "3 weeks ago" }
      ];

  const totalReviews = reviewsList.length;
  const starCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let totalSum = 0;
  reviewsList.forEach((r) => {
    const rval = Math.min(5, Math.max(1, Math.round(r.rating || 5)));
    starCounts[rval] = (starCounts[rval] || 0) + 1;
    totalSum += rval;
  });
  const avgScore = totalReviews > 0 ? (totalSum / totalReviews).toFixed(1) : (product.rating || "4.9");

  const handleShare = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleBookNow = () => {
    openBookingModal({
      ...product,
      eventDate: selectedDate,
      timeSlot: selectedSlot
    });
  };

  return (
    <div className="bg-[#F3F4F6] min-h-screen pb-44 pt-2 sm:pt-4 font-sans">
      
      {/* ── 1. Top Full Image Container with Floating Buttons ── */}
      <div className="relative w-full max-w-2xl mx-auto bg-black aspect-square sm:aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-md">
        <img
          src={sliderImages[activeImageIdx] || product.image || "/images/birthday_decor.png"}
          alt={product.title}
          className="w-full h-full object-contain bg-black transition-all duration-500"
        />

        {/* Floating Top Left: Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 p-2.5 bg-white/90 backdrop-blur-md text-gray-800 rounded-full shadow-lg hover:scale-105 transition-all cursor-pointer z-10"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        {/* Floating Top Right: Share & Heart Wishlist */}
        <div className="absolute top-4 right-4 flex items-center space-x-2.5 z-10">
          <button
            onClick={handleShare}
            className="p-2.5 bg-[#2563EB] text-white rounded-full shadow-lg hover:bg-blue-700 transition-all cursor-pointer"
            title="Share Product"
          >
            <Share2 className="h-4 w-4" />
          </button>
          
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="p-2.5 bg-white/90 backdrop-blur-md text-gray-700 rounded-full shadow-lg hover:scale-105 transition-all cursor-pointer"
            title="Wishlist"
          >
            <Heart className={`h-5 w-5 transition-colors ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"}`} />
          </button>
        </div>

        {/* Previous & Next Navigation Buttons for Multiple Slides */}
        {sliderImages.length > 1 && (
          <>
            <button
              onClick={() => setActiveImageIdx((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1))}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-sm transition-all cursor-pointer z-10"
              title="Previous Photo"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => setActiveImageIdx((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1))}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-sm transition-all cursor-pointer z-10"
              title="Next Photo"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Share Copied Toast */}
        {copiedLink && (
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-black/90 text-white text-xs font-bold px-4 py-2 rounded-full shadow-xl animate-fade-in z-20">
            Link copied to clipboard!
          </div>
        )}

        {/* Image Slider Pagination Dots */}
        {sliderImages.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-1.5 z-10">
            {sliderImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveImageIdx(i)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  activeImageIdx === i ? "w-6 bg-[#2563EB]" : "w-2 bg-white/70"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="max-w-2xl mx-auto px-3 sm:px-4 pt-3 space-y-3">

        {/* ── 2. Three Feature Cards Strip (Service process | Decor Shape | Includes) ── */}
        <div className="grid grid-cols-3 gap-2">
          
          {/* Card 1: Service Process */}
          <div 
            onClick={() => setActiveTabModal('process')}
            className="bg-[#E0F2FE]/80 border border-[#BAE6FD] rounded-2xl p-2.5 flex flex-col justify-between shadow-xs cursor-pointer hover:bg-[#E0F2FE] transition-all"
          >
            <span className="text-[10px] font-bold text-gray-700 block mb-1">Service process</span>
            <div className="flex items-center justify-between">
              <div className="flex -space-x-1.5 overflow-hidden">
                <img src="/images/birthday_decor.png" className="inline-block h-6 w-6 rounded-full ring-1 ring-white object-cover" alt="step" />
                <img src="/images/kids_birthday_decor.png" className="inline-block h-6 w-6 rounded-full ring-1 ring-white object-cover" alt="step" />
              </div>
              <div className="p-1 bg-[#2563EB] text-white rounded-full">
                <ChevronRight className="h-3 w-3" />
              </div>
            </div>
          </div>

          {/* Card 2: Decor Shape */}
          <div 
            onClick={() => setActiveTabModal('shape')}
            className="bg-[#E0F2FE]/80 border border-[#BAE6FD] rounded-2xl p-2.5 flex flex-col justify-between shadow-xs cursor-pointer hover:bg-[#E0F2FE] transition-all"
          >
            <span className="text-[10px] font-bold text-gray-700 block mb-1">Decor Shape</span>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <div className="h-6 w-6 rounded-lg bg-[#2563EB]/20 border border-[#2563EB]/40 flex items-center justify-center text-[9px] font-bold text-[#2563EB]">
                  🔲
                </div>
                <span className="text-[10px] font-bold text-gray-800 line-clamp-1">
                  {product.decorShape || product.subCategory || "Wall Decor"}
                </span>
              </div>
              <div className="p-1 bg-[#2563EB] text-white rounded-full shrink-0">
                <ChevronRight className="h-3 w-3" />
              </div>
            </div>
          </div>

          {/* Card 3: Includes */}
          <div 
            onClick={() => setActiveTabModal('includes')}
            className="bg-[#E0F2FE]/80 border border-[#BAE6FD] rounded-2xl p-2.5 flex flex-col justify-between shadow-xs cursor-pointer hover:bg-[#E0F2FE] transition-all"
          >
            <span className="text-[10px] font-bold text-gray-700 block mb-1">Includes</span>
            <div className="flex items-center justify-between">
              <div className="flex -space-x-1.5 overflow-hidden">
                <span className="inline-flex h-6 w-6 rounded-full bg-amber-400 text-white items-center justify-center text-[10px] font-bold">🎈</span>
                <span className="inline-flex h-6 w-6 rounded-full bg-emerald-500 text-white items-center justify-center text-[10px] font-bold">✨</span>
                <span className="inline-flex h-6 w-6 rounded-full bg-amber-200 text-amber-800 items-center justify-center text-[10px] font-bold">🌸</span>
              </div>
              <div className="p-1 bg-[#2563EB] text-white rounded-full shrink-0">
                <ChevronRight className="h-3 w-3" />
              </div>
            </div>
          </div>

        </div>

        {/* ── 3. Main Product Title & Price Info Card ── */}
        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3.5 border border-gray-100">
          
          {/* Row 1: SubCategory Tag, Title & Star Rating */}
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#EFF6FF] text-[#1D4ED8] text-[11px] font-bold border border-[#BFDBFE]">
                <span className="text-[10px]">🔲</span>
                <span>{product.subCategory || product.category || "Wall Decor"}</span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
                {product.title}
              </h1>
            </div>

            {/* Star Rating Badge */}
            <div className="px-2.5 py-1 rounded-xl bg-[#EFF6FF] text-[#1E40AF] text-xs font-bold flex items-center gap-1 shrink-0 border border-[#BFDBFE]">
              <Star className="h-3.5 w-3.5 fill-[#2563EB] text-[#2563EB]" />
              <span>{product.rating || "4.9"}</span>
            </div>
          </div>

          {/* Row 2: Price Section */}
          <div className="flex items-baseline space-x-2 pt-0.5">
            <span className="text-sm text-gray-400 line-through font-medium">₹{originalPrice}</span>
            <span className="text-2xl font-black text-gray-900">₹{product.price}</span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              ₹{savings} OFF
            </span>
          </div>



          {/* Row 4: Customisable Guarantee Banner */}
          <div className="bg-[#EFF6FF] rounded-xl py-2 px-3 text-center text-xs font-bold text-[#1D4ED8] flex items-center justify-center space-x-1.5">
            <span className="text-sm">🎈</span>
            <span>Balloon Colour & Design are customisable</span>
          </div>

        </div>

        {/* ── 4. Setup Date, Location & Slot Card ── */}
        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3 border border-gray-100">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-gray-600 mb-1">Event Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:border-[#2563EB]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-600 mb-1">Time Slot</label>
              <select
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:border-[#2563EB]"
              >
                <option value="Morning (8:00 AM - 11:00 AM)">Morning (8:00 AM - 11:00 AM)</option>
                <option value="Afternoon (1:00 PM - 4:00 PM)">Afternoon (1:00 PM - 4:00 PM)</option>
                <option value="Evening (5:00 PM - 8:00 PM)">Evening (5:00 PM - 8:00 PM)</option>
              </select>
            </div>
          </div>
        </div>

        {/* ── 4.5 Rating & Reviews Section (Matches User Screenshot) ── */}
        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-5 border border-gray-100 font-sans">
          
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-gray-900 font-sans">
              Rating & Reviews
            </h3>
            <span className="text-xs font-bold text-gray-500">
              {totalReviews} verified reviews
            </span>
          </div>

          {/* Overall Rating & Star Breakdown */}
          <div className="flex items-center gap-6 bg-gray-50/70 p-4 rounded-2xl border border-gray-150">
            
            {/* Left Score Box */}
            <div className="flex flex-col items-center justify-center space-y-1.5 pr-2 shrink-0">
              <div className="flex items-center space-x-1.5">
                <span className="text-3xl font-black text-gray-900">{avgScore}</span>
                <Star className="h-7 w-7 fill-[#2563EB] text-[#2563EB]" />
              </div>
              <span className="bg-blue-100 text-[#2563EB] text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <span>😀</span>
                <span>Excellent</span>
              </span>
            </div>

            {/* Right Progress Bars (5★, 4★, 3★, 2★, 1★) */}
            <div className="flex-1 space-y-1.5">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = starCounts[star] || 0;
                const pct = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : (star === 5 ? 90 : star === 4 ? 10 : 0);
                return (
                  <div key={star} className="flex items-center space-x-2 text-xs font-bold text-gray-600">
                    <span className="w-6 text-right shrink-0 flex items-center justify-end gap-0.5">
                      {star} <Star className="h-3 w-3 fill-[#2563EB] text-[#2563EB]" />
                    </span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#2563EB] rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="w-9 text-right text-[11px] text-gray-500 shrink-0 font-mono">{pct}%</span>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Individual Customer Reviews List */}
          <div className="divide-y divide-gray-100 pt-1">
            {reviewsList.map((rev, idx) => (
              <div key={rev.id || idx} className="py-3.5 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="h-7 w-7 rounded-full bg-[#2563EB] text-white font-bold text-xs flex items-center justify-center font-sans shrink-0 shadow-xs">
                      {(rev.reviewerName || "Customer").charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 flex items-center gap-1 font-sans">
                        <span>{rev.reviewerName || "Verified Customer"}</span>
                        <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 fill-blue-100 shrink-0" />
                      </h4>
                      <div className="flex gap-0.5 mt-0.5">
                        {[...Array(rev.rating || 5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase">{rev.date || "Verified"}</span>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed font-sans pl-9 italic">
                  "{rev.comment}"
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* ── 5. Fixed Sticky Bottom Action Bar (Mobile & Desktop) ── */}
      <div className="fixed bottom-[56px] md:bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2.5 z-40 shadow-2xl">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          
          {/* Price & Savings info */}
          <div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-base sm:text-lg font-black text-gray-900">₹{product.price}</span>
              <span className="text-xs text-gray-400 line-through">₹{originalPrice}</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 block">
              ₹{savings} OFF
            </span>
          </div>

          {/* Action Button: Book Package */}
          <div>
            <button
              onClick={handleBookNow}
              className="px-6 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center space-x-2 shadow-md cursor-pointer transition-all"
            >
              <Calendar className="h-4 w-4" />
              <span>Book Package</span>
            </button>
          </div>

        </div>
      </div>

      {/* ── 6. Popup Modals for Service Process / Shape / Includes ── */}
      {activeTabModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-5 space-y-4 shadow-2xl animate-scale-in">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                {activeTabModal === 'process' && 'Service Process'}
                {activeTabModal === 'shape' && 'Decoration Shape & Specifications'}
                {activeTabModal === 'includes' && 'Package Inclusions'}
              </h3>
              <button 
                onClick={() => setActiveTabModal(null)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-gray-700">
              {activeTabModal === 'process' && (
                <div className="space-y-2">
                  {(product.serviceProcess && product.serviceProcess.length > 0 ? product.serviceProcess : [
                    "Decorator arrives at your selected time slot in Hyderabad.",
                    "Complete setup completed within 60-90 minutes.",
                    "Clean teardown support after event finishes."
                  ]).map((step, idx) => (
                    <div key={idx} className="p-3 bg-blue-50 rounded-xl flex items-start gap-2">
                      <span className="font-bold text-[#2563EB]">{idx + 1}.</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTabModal === 'shape' && (
                <div className="space-y-2">
                  <p className="font-bold text-gray-800">Shape: {product.decorShape || product.subCategory || "Wall Decor"}</p>
                  <p className="text-gray-600">Fits living rooms, bedrooms, hall backdrops, and garden walls seamlessly.</p>
                </div>
              )}

              {activeTabModal === 'includes' && (
                <ul className="space-y-2">
                  {(product.includes && product.includes.length > 0 ? product.includes : [
                    "200+ Premium Metallic Latex Balloons",
                    "Happy Birthday LED Neon Sign / Foil Banner",
                    "Warm LED Fairy String Lights",
                    "Free Delivery & On-Site Setup"
                  ]).map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button
              onClick={() => setActiveTabModal(null)}
              className="w-full bg-[#2563EB] text-white py-2.5 rounded-xl font-bold text-xs"
            >
              Got it
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
