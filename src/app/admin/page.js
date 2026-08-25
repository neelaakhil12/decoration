"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Plus, Trash2, Edit3, Upload, Film, Image as ImageIcon, 
  LogOut, Sparkles, Layers, RefreshCw, X, ExternalLink,
  Search, ShieldCheck, Menu, Filter, Check, LayoutGrid, Sliders,
  Phone, Mail, MessageSquare, MapPin, Calendar, Clock, CheckCircle2, AlertCircle
} from "lucide-react";
import { useApp } from "@/components/AppContext";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { 
    services, addService, updateService, deleteService,
    galleryItems, addGalleryItem, updateGalleryItem, deleteGalleryItem,
    heroSliders, addHeroSlider, updateHeroSlider, deleteHeroSlider,
    heroVideoUrl, updateHeroVideoUrl,
    subCategories: appSubCategories, addSubCategory, deleteSubCategory,
    categoryPosters, addCategoryPoster, updateCategoryPoster, deleteCategoryPoster,
    bookings, updateBookingStatus, deleteBooking,
    reloadFromSupabase 
  } = useApp();

  const [activeTab, setActiveTab] = useState("services"); // "services" | "hero-video" | "gallery" | "categories" | "bookings"
  const [heroVideoInput, setHeroVideoInput] = useState("");
  const [heroVideoSavedMessage, setHeroVideoSavedMessage] = useState("");
  const [bookingFilterStatus, setBookingFilterStatus] = useState("All");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubCatFilter, setSelectedSubCatFilter] = useState("All");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Category Poster Form Modal State
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    key: "Birthdays",
    image: "/images/birthday_decor.png",
    span: "col-span-1",
  });

  // Subcategory Modal State
  const [subCatModalOpen, setSubCatModalOpen] = useState(false);
  const [newSubCatName, setNewSubCatName] = useState("");

  // Service Form Modal State
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [isCustomSubCatActive, setIsCustomSubCatActive] = useState(false);
  const [customSubCatInput, setCustomSubCatInput] = useState("");
  const [newIncludeInput, setNewIncludeInput] = useState("");
  const [newProcessInput, setNewProcessInput] = useState("");
  const [newImageInput, setNewImageInput] = useState("");
  const [newReviewerName, setNewReviewerName] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState("");
  const [newReviewDate, setNewReviewDate] = useState("2 days ago");
  const [serviceForm, setServiceForm] = useState({
    title: "",
    category: "Birthday Decor",
    subCategory: "Wall Decor",
    decorShape: "Wall Decor",
    price: "",
    originalPrice: "",
    discount: "",
    rating: "4.9",
    image: "",
    images: [],
    customisableNote: "",
    includes: [],
    serviceProcess: [],
    reviews: []
  });

  // Slider Form Modal State
  const [sliderModalOpen, setSliderModalOpen] = useState(false);
  const [editingSlider, setEditingSlider] = useState(null);
  const [sliderForm, setSliderForm] = useState({
    title: "",
    tag: "BESPOKE ART",
    gradient: "linear-gradient(135deg, #4A1525 0%, #6B2137 50%, #8C2D4A 100%)",
    subtitle: "Decor Dazzlers · Hyderabad — Same day setup available",
  });

  // Gallery Form Modal State
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [editingGalleryItem, setEditingGalleryItem] = useState(null);
  const [galleryForm, setGalleryForm] = useState({
    title: "",
    category: "Birthdays",
    type: "image",
    image: "/images/birthday_decor.png",
    videoUrl: "",
  });

  // Track unread bookings count
  const [lastSeenBookingsCount, setLastSeenBookingsCount] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("decor_last_seen_bookings_count");
      if (stored !== null) {
        setLastSeenBookingsCount(parseInt(stored, 10) || 0);
      }
    }
  }, []);

  // Clear unread count when opening the bookings tab
  useEffect(() => {
    if (activeTab === "bookings" && bookings) {
      const currentCount = bookings.length;
      setLastSeenBookingsCount(currentCount);
      if (typeof window !== "undefined") {
        localStorage.setItem("decor_last_seen_bookings_count", currentCount.toString());
      }
    }
  }, [activeTab, bookings]);

  const unreadBookingsCount = Math.max(0, (bookings || []).length - lastSeenBookingsCount);

  useEffect(() => {
    const auth = localStorage.getItem("decor_admin_auth");
    const email = localStorage.getItem("decor_admin_email");
    if (!auth) {
      router.push("/adminlogin");
    } else {
      setIsAuthenticated(true);
      if (email) setAdminEmail(email);
    }
  }, [router]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-plum text-white font-sans font-bold">
        <div className="flex items-center space-x-3">
          <RefreshCw className="h-6 w-6 animate-spin text-brand-gold" />
          <span>Verifying Admin Session...</span>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("decor_admin_auth");
    localStorage.removeItem("decor_admin_email");
    router.push("/adminlogin");
  };

  // Direct Cloudinary Upload (bypasses Vercel 4.5MB serverless payload limit for large videos)
  const uploadDirectToCloudinary = async (file, type = "image") => {
    const resourceType = type === "video" ? "video" : "image";

    // 1. Direct signed stream to Cloudinary CDN
    try {
      const sigRes = await fetch("/api/upload?folder=decorations");
      if (sigRes.ok) {
        const { signature, timestamp, apiKey, cloudName, folder } = await sigRes.json();
        if (signature && apiKey && cloudName) {
          const directForm = new FormData();
          directForm.append("file", file);
          directForm.append("api_key", apiKey);
          directForm.append("timestamp", timestamp);
          directForm.append("signature", signature);
          directForm.append("folder", folder);

          const cdnRes = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
            {
              method: "POST",
              body: directForm,
            }
          );
          const cdnData = await cdnRes.json();
          if (cdnData.secure_url) {
            return cdnData.secure_url;
          }
        }
      }
    } catch (e) {
      console.warn("Direct upload fallback triggered:", e);
    }

    // 2. Server API Fallback
    const formData = new FormData();
    formData.append("file", file);
    formData.append("resource_type", resourceType);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.url) return data.url;
    throw new Error(data.error || "Upload failed");
  };

  // Handle Cloudinary File Upload
  const handleFileUpload = async (e, type = "image", callback) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadDirectToCloudinary(file, type);
      if (url) {
        callback(url);
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading file: " + (err.message || "Unknown error"));
    } finally {
      setIsUploading(false);
    }
  };

  // Handle Cloudinary Multiple Files Upload
  const handleMultipleFilesUpload = async (e, callback) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsUploading(true);
    try {
      const uploadedUrls = [];
      for (const file of files) {
        const url = await uploadDirectToCloudinary(file, "image");
        if (url) {
          uploadedUrls.push(url);
        }
      }

      if (uploadedUrls.length > 0) {
        callback(uploadedUrls);
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading images: " + (err.message || "Unknown error"));
    } finally {
      setIsUploading(false);
    }
  };

  // Submit Service Form (Add or Edit)
  const handleSaveService = async (e) => {
    e.preventDefault();
    const finalDecorShape = serviceForm.decorShape || serviceForm.subCategory || "Wall Decor";
    const finalImages = (serviceForm.images && serviceForm.images.length > 0)
      ? serviceForm.images
      : [serviceForm.image || "/images/birthday_decor.png"];

    const payload = {
      ...serviceForm,
      image: finalImages[0] || serviceForm.image || "/images/birthday_decor.png",
      decorShape: finalDecorShape,
      images: finalImages,
      customisableNote: serviceForm.customisableNote || "Balloon Colour & Design are customisable",
      includes: serviceForm.includes || [],
      serviceProcess: serviceForm.serviceProcess || [],
      price: Number(serviceForm.price) || 2999,
      originalPrice: Number(serviceForm.originalPrice) || 3999,
      rating: Number(serviceForm.rating) || 4.8,
    };

    if (editingService) {
      await updateService(editingService.id, payload);
    } else {
      await addService(payload);
    }

    setServiceModalOpen(false);
    setEditingService(null);
  };

  // Submit Slider Form (Add or Edit)
  const handleSaveSlider = async (e) => {
    e.preventDefault();
    if (editingSlider) {
      await updateHeroSlider(editingSlider.id, sliderForm);
    } else {
      await addHeroSlider(sliderForm);
    }

    setSliderModalOpen(false);
    setEditingSlider(null);
    setSliderForm({
      title: "",
      tag: "BESPOKE ART",
      gradient: "linear-gradient(135deg, #4A1525 0%, #6B2137 50%, #8C2D4A 100%)",
      subtitle: "Decor Dazzlers · Hyderabad — Same day setup available",
    });
  };

  // Submit Gallery Form (Add or Edit)
  const handleSaveGalleryItem = async (e) => {
    e.preventDefault();
    const hasVideo = !!(galleryForm.videoUrl && galleryForm.videoUrl.trim().length > 0);
    const finalType = hasVideo ? "video" : (galleryForm.type || "image");

    let finalImage = galleryForm.image?.trim();
    if (!finalImage || finalImage === "") {
      if (hasVideo && galleryForm.videoUrl.includes("res.cloudinary.com")) {
        finalImage = galleryForm.videoUrl.replace(/\.[^/.]+$/, ".jpg");
      } else {
        finalImage = "/images/birthday_decor.png";
      }
    }

    const payload = {
      ...galleryForm,
      type: finalType,
      image: finalImage,
      videoUrl: galleryForm.videoUrl?.trim() || null,
    };

    if (editingGalleryItem) {
      await updateGalleryItem(editingGalleryItem.id, payload);
    } else {
      await addGalleryItem(payload);
    }

    setGalleryModalOpen(false);
    setEditingGalleryItem(null);
    setGalleryForm({
      title: "",
      category: "Birthdays",
      type: "image",
      image: "/images/birthday_decor.png",
      videoUrl: "",
    });
  };

  const filteredServices = services.filter((s) => {
    const matchesSearch = 
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.subCategory.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSubCat = 
      selectedSubCatFilter === "All" || s.subCategory === selectedSubCatFilter;

    return matchesSearch && matchesSubCat;
  });

  const filteredSliders = (heroSliders || []).filter((sld) =>
    sld.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sld.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGalleryItems = galleryItems.filter((g) =>
    g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const defaultSubCats = ["Wall Decor", "Ring Stand", "Room Decor", "Stage Backdrop", "Table/Car Decor"];
  const availableSubCategories = Array.from(
    new Set([
      ...(appSubCategories || defaultSubCats),
      ...(services || [])
        .map((s) => s.subCategory)
        .filter((sc) => sc && typeof sc === "string" && sc.trim().length > 0)
    ])
  );
  const subCategoriesList = ["All", ...availableSubCategories];

  return (
    <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
      
      {/* ── SIDEBAR (DESKTOP & MOBILE DRAWER) ── */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-72 bg-white text-gray-900 flex flex-col justify-between p-6 border-r border-gray-200 shadow-xl transition-transform duration-300 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="space-y-6">
          
          {/* Brand Logo & Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3.5">
              <div className="h-14 w-14 rounded-2xl bg-white p-1 border border-gray-200 shadow-md flex items-center justify-center shrink-0 overflow-hidden">
                <img
                  src="/logo.png"
                  alt="Decor Dazzlers Logo"
                  className="h-full w-full object-contain filter contrast-105 saturate-110 drop-shadow-xs"
                />
              </div>
              <div>
                <h2 className="font-serif font-black text-lg text-brand-plum leading-tight tracking-tight">
                  Decor Dazzlers
                </h2>
                <span className="inline-flex items-center text-[10px] text-brand-gold font-black uppercase tracking-wider">
                  <ShieldCheck className="h-3.5 w-3.5 mr-1 text-brand-gold" /> Admin Studio
                </span>
              </div>
            </div>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="md:hidden text-gray-400 hover:text-gray-700 p-1"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Separate Navigation Sections */}
          <div className="space-y-3">
            <div className="text-[10px] uppercase font-extrabold tracking-widest text-gray-400 px-3 mb-1">
              Section 1: Decoration Packages
            </div>

            <button
              onClick={() => {
                setActiveTab("services");
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "services"
                  ? "bg-brand-plum text-white shadow-md font-black scale-102"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-brand-plum border border-gray-150"
              }`}
            >
              <div className="flex items-center space-x-3">
                <LayoutGrid className={`h-4 w-4 ${activeTab === "services" ? "text-brand-gold" : "text-gray-500"}`} />
                <span>Create Decoration Packages</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                activeTab === "services" ? "bg-brand-gold text-brand-plum" : "bg-gray-200 text-gray-700"
              }`}>
                {services.length}
              </span>
            </button>

            <div className="text-[10px] uppercase font-extrabold tracking-widest text-gray-400 px-3 pt-2 mb-1">
              Section 2: Hero Background Video
            </div>

            <button
              onClick={() => {
                setActiveTab("hero-video");
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "hero-video"
                  ? "bg-brand-plum text-white shadow-md font-black scale-102"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-brand-plum border border-gray-150"
              }`}
            >
              <div className="flex items-center space-x-3">
                <Film className={`h-4 w-4 ${activeTab === "hero-video" ? "text-brand-gold" : "text-gray-500"}`} />
                <span>Hero Video Studio</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                activeTab === "hero-video" ? "bg-brand-gold text-brand-plum" : "bg-blue-100 text-blue-700"
              }`}>
                LIVE
              </span>
            </button>

            <div className="text-[10px] uppercase font-extrabold tracking-widest text-gray-400 px-3 pt-2 mb-1">
              Section 3: Our Recent Projects
            </div>

            <button
              onClick={() => {
                setActiveTab("gallery");
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "gallery"
                  ? "bg-brand-plum text-white shadow-md font-black scale-102"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-brand-plum border border-gray-150"
              }`}
            >
              <div className="flex items-center space-x-3">
                <ImageIcon className={`h-4 w-4 ${activeTab === "gallery" ? "text-brand-gold" : "text-gray-500"}`} />
                <span>Our Recent Projects</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                activeTab === "gallery" ? "bg-brand-gold text-brand-plum" : "bg-gray-200 text-gray-700"
              }`}>
                {galleryItems.length}
              </span>
            </button>

            <div className="text-[10px] uppercase font-extrabold tracking-widest text-gray-400 px-3 pt-2 mb-1">
              Section 4: Celebration Categories
            </div>

            <button
              onClick={() => {
                setActiveTab("categories");
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "categories"
                  ? "bg-brand-plum text-white shadow-md font-black scale-102"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-brand-plum border border-gray-150"
              }`}
            >
              <div className="flex items-center space-x-3">
                <Sparkles className={`h-4 w-4 ${activeTab === "categories" ? "text-brand-gold" : "text-gray-500"}`} />
                <span>Celebration Cards</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                activeTab === "categories" ? "bg-brand-gold text-brand-plum" : "bg-gray-200 text-gray-700"
              }`}>
                {(categoryPosters || []).length}
              </span>
            </button>

            <div className="text-[10px] uppercase font-extrabold tracking-widest text-gray-400 px-3 pt-2 mb-1">
              Section 5: Customer Orders
            </div>

            <button
              onClick={() => {
                setActiveTab("bookings");
                setMobileSidebarOpen(false);
                setLastSeenBookingsCount((bookings || []).length);
                if (typeof window !== "undefined") {
                  localStorage.setItem("decor_last_seen_bookings_count", (bookings || []).length.toString());
                }
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "bookings"
                  ? "bg-brand-plum text-white shadow-md font-black scale-102"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-brand-plum border border-gray-150"
              }`}
            >
              <div className="flex items-center space-x-3">
                <MessageSquare className={`h-4 w-4 ${activeTab === "bookings" ? "text-brand-gold" : "text-emerald-600"}`} />
                <span>Booking Inquiries</span>
              </div>
              {unreadBookingsCount > 0 ? (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-red-500 text-white animate-pulse shadow-xs">
                  {unreadBookingsCount}
                </span>
              ) : null}
            </button>
          </div>

        </div>

        {/* Sidebar Footer — Profile & Logout */}
        <div className="space-y-4 pt-6 border-t border-gray-200">
          <div className="px-2">
            <p className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Logged in as</p>
            <p className="text-xs font-bold text-gray-800 truncate">{adminEmail || "admin@decordazzlers.com"}</p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 py-3 bg-red-50 hover:bg-red-600 hover:text-white text-red-600 rounded-2xl text-xs font-bold transition-all shadow-xs cursor-pointer border border-red-200"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout Account</span>
          </button>
        </div>

      </aside>

      {/* Backdrop overlay for mobile sidebar */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
        />
      )}

      {/* ── MAIN WORKSPACE CONTENT ── */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-gray-50">
        
        {/* Top Sticky Header */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 rounded-xl bg-gray-100 text-brand-plum"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <h1 className="font-serif font-black text-xl sm:text-2xl text-brand-plum leading-none flex items-center space-x-2">
                <span>
                  {activeTab === "services" 
                    ? "Create Decoration Packages" 
                    : activeTab === "hero-video"
                    ? "Hero Background Video Studio"
                    : activeTab === "categories"
                    ? "Hero Category Posters"
                    : activeTab === "bookings"
                    ? "Customer Orders & Inquiries"
                    : "Our Recent Projects Studio (Photos & Videos)"}
                </span>
              </h1>
              <p className="text-xs text-gray-500 font-sans mt-0.5">
                {activeTab === "services"
                  ? `Manage all ${services.length} Decoration packages and subcategories`
                  : activeTab === "hero-video"
                  ? "Upload or change active hero background video file across desktop and mobile"
                  : activeTab === "categories"
                  ? "Manage main home page category posters and images"
                  : activeTab === "bookings"
                  ? "Manage customer booking requests and location details"
                  : `Upload, Edit, Update or Delete all ${galleryItems.length} Recent Project Photos & Setup Videos`}
              </p>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center space-x-3">
            
            {/* Search Box */}
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-100 border border-gray-200 pl-9 pr-3 py-2 rounded-xl text-xs text-brand-plum focus:outline-none focus:border-brand-gold w-44 md:w-60 font-sans"
              />
            </div>

            <button
              onClick={reloadFromSupabase}
              className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-brand-plum transition-colors cursor-pointer"
              title="Sync with Supabase Database"
            >
              <RefreshCw className="h-4 w-4" />
            </button>

            <button
              onClick={() => {
                if (activeTab === "services") {
                  setEditingService(null);
                  setServiceForm({
                    title: "",
                    category: "Birthday Decor",
                    subCategory: "Wall Decor",
                    decorShape: "Wall Decor",
                    price: "",
                    originalPrice: "",
                    discount: "",
                    rating: "4.9",
                    image: "",
                    images: [],
                    customisableNote: "",
                    includes: [],
                    serviceProcess: [],
                    reviews: []
                  });
                  setServiceModalOpen(true);
                } else if (activeTab === "sliders") {
                  setEditingSlider(null);
                  setSliderForm({
                    title: "",
                    tag: "BESPOKE ART",
                    gradient: "linear-gradient(135deg, #4A1525 0%, #6B2137 50%, #8C2D4A 100%)",
                    subtitle: "Decor Dazzlers · Hyderabad — Same day setup available",
                  });
                  setSliderModalOpen(true);
                } else {
                  setEditingGalleryItem(null);
                  setGalleryForm({
                    title: "",
                    category: "Birthdays",
                    type: "image",
                    image: "/images/birthday_decor.png",
                    videoUrl: "",
                  });
                  setGalleryModalOpen(true);
                }
              }}
              className="bg-brand-gold hover:bg-brand-gold/90 text-brand-plum px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center space-x-1.5 transition-all shadow-md cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">
                Add New {activeTab === "services" ? "Decoration Package" : activeTab === "sliders" ? "Hero Slider" : "Recent Project"}
              </span>
              <span className="sm:hidden">Add</span>
            </button>

          </div>
        </header>



        {/* Content Body Grid */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
          
          {/* SECTION 1: HOME CATALOG PACKAGES */}
          {activeTab === "services" && (
            <>
              {filteredServices.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredServices.map((service) => (
                    <div
                      key={service.id}
                      className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div>
                        {/* Image & Tags */}
                        <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <span className="absolute top-3 right-3 bg-brand-gold text-brand-plum text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm font-sans">
                            {service.subCategory}
                          </span>
                        </div>

                        {/* Card Details */}
                        <div className="p-5 space-y-3">
                          <h3 className="font-bold text-sm text-brand-plum line-clamp-2 leading-snug font-sans">
                            {service.title}
                          </h3>
                          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                            <div>
                              <span className="text-gray-400 line-through text-xs font-sans block">
                                ₹{service.originalPrice}
                              </span>
                              <span className="font-black text-brand-plum text-lg font-sans">
                                ₹{service.price}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Admin Quick Control Buttons */}
                      <div className="p-4 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-[11px] text-gray-400 font-mono">ID: {service.id}</span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              setEditingService(service);
                              setServiceForm({
                                ...service,
                                decorShape: service.decorShape || service.subCategory || "Wall Decor",
                                includes: (service.includes && service.includes.length > 0) ? service.includes : [],
                                serviceProcess: (service.serviceProcess && service.serviceProcess.length > 0) ? service.serviceProcess : [],
                                images: (service.images && service.images.length > 0) ? service.images : (service.image ? [service.image] : []),
                                reviews: (service.reviews && service.reviews.length > 0) ? service.reviews : [
                                  { id: "rev-1", reviewerName: "Sneha Reddy", rating: 5, comment: "Absolutely loved this decoration setup! The balloons were vibrant, sturdy, and lasted for days. The crew arrived right on time.", date: "2 days ago" },
                                  { id: "rev-2", reviewerName: "Rahul Verma", rating: 5, comment: "Theme matching was 100% accurate to what was promised. Photobooth area looked extremely luxurious in our family portraits!", date: "1 week ago" }
                                ]
                              });
                              setServiceModalOpen(true);
                            }}
                            className="flex items-center space-x-1 px-3.5 py-2 rounded-xl bg-white border border-gray-200 hover:border-brand-gold hover:bg-brand-gold/10 text-brand-plum transition-all cursor-pointer shadow-sm text-xs font-bold"
                            title="Edit Package"
                          >
                            <Edit3 className="h-3.5 w-3.5 text-brand-plum" />
                            <span>Edit Package</span>
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete "${service.title}"?`)) {
                                deleteService(service.id);
                              }
                            }}
                            className="flex items-center space-x-1 px-3.5 py-2 rounded-xl bg-red-50 border border-red-200 hover:bg-red-500 hover:text-white text-red-500 transition-all cursor-pointer shadow-sm text-xs font-bold"
                            title="Delete Package"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-3xl border border-gray-200 space-y-3">
                  <p className="text-sm font-bold text-gray-500">No decoration packages found for "{selectedSubCatFilter}".</p>
                  <button
                    onClick={() => setSelectedSubCatFilter("All")}
                    className="text-xs font-bold text-brand-gold underline cursor-pointer"
                  >
                    Reset Subcategory Filter
                  </button>
                </div>
              )}
            </>
          )}

          {/* SECTION 2: HERO BACKGROUND VIDEO MANAGEMENT */}
          {activeTab === "hero-video" && (
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Header card */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-brand-plum text-brand-gold rounded-2xl">
                      <Film className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="font-serif font-black text-xl text-brand-plum">
                        Hero Section Video Control
                      </h2>
                      <p className="text-xs text-gray-500 font-sans mt-0.5">
                        Upload or link a new hero background video that plays on mobile & desktop hero section.
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full font-mono">
                    Active Status: LIVE
                  </span>
                </div>

                {heroVideoSavedMessage && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between animate-fadeIn font-sans">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span>{heroVideoSavedMessage}</span>
                    </div>
                    <button onClick={() => setHeroVideoSavedMessage("")} className="text-green-800 hover:text-black">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {/* Live Video Preview Box */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum font-sans">
                    Current Active Video Preview
                  </label>
                  <div className="relative rounded-2xl overflow-hidden bg-black aspect-video max-h-[340px] shadow-lg border border-gray-800 flex items-center justify-center">
                    <video
                      key={heroVideoUrl}
                      src={heroVideoUrl || "/hero_video.mp4"}
                      controls
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover max-h-[340px]"
                    />
                  </div>
                  <p className="text-[11px] text-gray-400 font-mono">
                    Current URL: {heroVideoUrl || "/hero_video.mp4"}
                  </p>
                </div>

                {/* Update Video Controls */}
                <div className="pt-4 border-t border-gray-100 space-y-4 font-sans">
                  
                  {/* File Upload Option */}
                  <div>
                    <label className="block text-xs font-bold text-brand-plum uppercase tracking-wider mb-2">
                      Upload Video File (.mp4, .webm, .mov)
                    </label>
                    <div className="flex items-center space-x-3">
                      <label className={`flex-1 flex items-center justify-center space-x-2 border-2 border-dashed border-brand-gold/40 hover:border-brand-gold bg-brand-cream/30 hover:bg-brand-cream/60 p-4 rounded-2xl cursor-pointer transition-all ${
                        isUploading ? "opacity-50 pointer-events-none" : ""
                      }`}>
                        {isUploading ? (
                          <>
                            <RefreshCw className="h-5 w-5 text-brand-plum animate-spin" />
                            <span className="text-xs font-bold text-brand-plum">Uploading Video to CDN...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="h-5 w-5 text-brand-gold" />
                            <span className="text-xs font-bold text-brand-plum">Choose Video File from PC</span>
                          </>
                        )}
                        <input
                          type="file"
                          accept="video/*"
                          className="hidden"
                          onChange={(e) => {
                            handleFileUpload(e, "video", (uploadedUrl) => {
                              updateHeroVideoUrl(uploadedUrl);
                              setHeroVideoSavedMessage("New hero video successfully uploaded and published live!");
                            });
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Reset Control */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-sans">
                      Need to restore original default video?
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        updateHeroVideoUrl("/hero_video.mp4");
                        setHeroVideoSavedMessage("Hero video reset to default (/hero_video.mp4).");
                      }}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
                    >
                      Reset to Default Video
                    </button>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* SECTION 3: GALLERY PHOTOS & REELS */}
          {activeTab === "gallery" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGalleryItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative aspect-video bg-gray-100 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-3 left-3 bg-brand-plum text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm font-sans">
                        {item.category}
                      </span>
                      <span className={`absolute top-3 right-3 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center space-x-1 font-sans ${
                        item.type === "video" ? "bg-red-600" : "bg-blue-600"
                      }`}>
                        {item.type === "video" ? <Film className="h-3 w-3 mr-1" /> : <ImageIcon className="h-3 w-3 mr-1" />}
                        <span>{item.type}</span>
                      </span>
                    </div>

                    <div className="p-5 space-y-2">
                      <h3 className="font-bold text-sm text-brand-plum line-clamp-2 font-sans">
                        {item.title}
                      </h3>
                      {item.type === "video" && item.videoUrl && (
                        <p className="text-[11px] text-gray-500 font-mono truncate bg-gray-50 p-2 rounded-xl border border-gray-100">
                          Video URL: {item.videoUrl}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[11px] text-gray-400 font-mono">ID: {item.id}</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setEditingGalleryItem(item);
                          setGalleryForm(item);
                          setGalleryModalOpen(true);
                        }}
                        className="flex items-center space-x-1 px-3 py-2 rounded-xl bg-white border border-gray-200 hover:border-brand-gold hover:bg-brand-gold/10 text-brand-plum transition-all cursor-pointer shadow-sm text-xs font-bold"
                        title="Edit Item"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete "${item.title}"?`)) {
                            deleteGalleryItem(item.id);
                          }
                        }}
                        className="flex items-center space-x-1 px-3 py-2 rounded-xl bg-red-50 border border-red-200 hover:bg-red-500 hover:text-white text-red-500 transition-all cursor-pointer shadow-sm text-xs font-bold"
                        title="Delete Item"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SECTION 4: HOMEPAGE CELEBRATION CATEGORIES */}
          {activeTab === "categories" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
                <div>
                  <h3 className="text-lg font-serif font-black text-brand-plum">
                    Homepage Celebration Cards ("What are you celebrating?")
                  </h3>
                  <p className="text-xs text-gray-500 font-sans mt-0.5">
                    Add, edit, or delete the main category cards displayed on the homepage.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingCategory(null);
                    setCategoryForm({
                      name: "",
                      key: "Birthdays",
                      image: "/images/birthday_decor.png",
                    });
                    setCategoryModalOpen(true);
                  }}
                  className="flex items-center space-x-2 px-5 py-3 rounded-2xl bg-brand-gold hover:bg-brand-plum text-brand-plum hover:text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Category Card</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {(categoryPosters || []).map((cat) => (
                  <div
                    key={cat.id || cat.name}
                    className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span className="absolute top-3 right-3 bg-brand-plum text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm font-sans">
                          Filter: {cat.key || "All"}
                        </span>
                      </div>

                      <div className="p-4 space-y-1">
                        <h4 className="font-bold text-base text-brand-plum font-sans">
                          {cat.name}
                        </h4>
                        <p className="text-xs text-gray-400 font-sans">
                          Filter Key: <strong className="text-brand-gold">{cat.key || "All"}</strong>
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setEditingCategory(cat);
                          setCategoryForm({
                            name: cat.name || "",
                            key: cat.key || "Birthdays",
                            image: cat.image || "/images/birthday_decor.png",
                          });
                          setCategoryModalOpen(true);
                        }}
                        className="flex items-center space-x-1 px-3 py-2 rounded-xl bg-white border border-gray-200 hover:border-brand-gold hover:bg-brand-gold/10 text-brand-plum transition-all cursor-pointer shadow-sm text-xs font-bold"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete category "${cat.name}"?`)) {
                            deleteCategoryPoster(cat.id);
                          }
                        }}
                        className="flex items-center space-x-1 px-3 py-2 rounded-xl bg-red-50 border border-red-200 hover:bg-red-500 hover:text-white text-red-500 transition-all cursor-pointer shadow-sm text-xs font-bold"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 5: CUSTOMER BOOKINGS & INQUIRIES */}
          {activeTab === "bookings" && (
            <div className="space-y-6 font-sans">
              
              {/* Header & Status Filters */}
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-serif font-black text-brand-plum flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-emerald-600" />
                    <span>Customer Booking Inquiries</span>
                  </h3>
                  <p className="text-xs text-gray-500 font-sans mt-0.5">
                    Real-time inquiries submitted by users from the "Book Now" website modal.
                  </p>
                </div>

                <div className="flex items-center space-x-2 bg-gray-100 p-1.5 rounded-2xl">
                  {["All", "New", "Contacted", "Completed"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setBookingFilterStatus(st)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        bookingFilterStatus === st
                          ? "bg-brand-plum text-white shadow-md font-extrabold"
                          : "text-gray-600 hover:text-brand-plum"
                      }`}
                    >
                      {st} {st === "All" ? `(${(bookings || []).length})` : `(${(bookings || []).filter(b => (b.status || "New") === st).length})`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bookings List / Cards */}
              {(() => {
                const filteredBookings = (bookings || []).filter(b => {
                  if (bookingFilterStatus === "All") return true;
                  return (b.status || "New") === bookingFilterStatus;
                });

                if (filteredBookings.length === 0) {
                  return (
                    <div className="bg-white p-12 text-center rounded-3xl border border-gray-200 space-y-3">
                      <MessageSquare className="h-10 w-10 text-gray-300 mx-auto" />
                      <h4 className="font-bold text-base text-gray-700">No Booking Inquiries Found</h4>
                      <p className="text-xs text-gray-500">
                        {bookingFilterStatus === "All"
                          ? "No bookings have been submitted yet."
                          : `No bookings found with status "${bookingFilterStatus}".`}
                      </p>
                    </div>
                  );
                }

                return (
                  <div className="space-y-4">
                    {filteredBookings.map((b) => (
                      <div
                        key={b.id}
                        className={`bg-white border rounded-3xl p-6 shadow-sm hover:shadow-md transition-all space-y-4 relative overflow-hidden ${
                          (b.status || "New") === "New"
                            ? "border-emerald-300 ring-2 ring-emerald-500/10"
                            : "border-gray-200"
                        }`}
                      >
                        {/* Card Top Banner */}
                        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4">
                          <div className="flex items-center space-x-3">
                            <span className="bg-brand-plum text-white font-mono text-xs font-bold px-3 py-1 rounded-xl">
                              ID: {b.id}
                            </span>
                            <span className="text-xs text-gray-400 font-mono flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {b.created_at ? new Date(b.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "Recently"}
                            </span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold text-gray-500">Status:</span>
                            <select
                              value={b.status || "New"}
                              onChange={(e) => updateBookingStatus(b.id, e.target.value)}
                              className={`text-xs font-black px-3 py-1.5 rounded-xl border focus:outline-none cursor-pointer ${
                                (b.status || "New") === "New"
                                  ? "bg-emerald-100 border-emerald-300 text-emerald-800"
                                  : (b.status || "New") === "Contacted"
                                  ? "bg-blue-100 border-blue-300 text-blue-800"
                                  : "bg-gray-100 border-gray-300 text-gray-700"
                              }`}
                            >
                              <option value="New">🟢 New Inquiry</option>
                              <option value="Contacted">🔵 Contacted</option>
                              <option value="Completed">✅ Completed</option>
                            </select>

                            <button
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete inquiry from ${b.name}?`)) {
                                  deleteBooking(b.id);
                                }
                              }}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                              title="Delete Booking"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        {/* Customer & Booking Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          
                          {/* Col 1: Customer Contact Info */}
                          <div className="space-y-2 bg-gray-50/80 p-4 rounded-2xl border border-gray-100">
                            <p className="text-[10px] font-black uppercase text-brand-plum tracking-wider">Customer Details</p>
                            <h4 className="font-bold text-base text-brand-plum">{b.name}</h4>
                            
                            <div className="flex items-center space-x-2 text-xs font-bold text-gray-700">
                              <Phone className="h-3.5 w-3.5 text-brand-gold" />
                              <a href={`tel:${b.phone}`} className="hover:underline text-brand-plum">{b.phone}</a>
                            </div>

                            {b.email && (
                              <div className="flex items-center space-x-2 text-xs text-gray-600 truncate">
                                <Mail className="h-3.5 w-3.5 text-brand-gold" />
                                <a href={`mailto:${b.email}`} className="hover:underline truncate">{b.email}</a>
                              </div>
                            )}

                            <div className="pt-2 flex items-center space-x-2">
                              <a
                                href={`https://wa.me/91${b.phone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(b.name)},%20regarding%20your%20Decor%20Dazzlers%20booking%20inquiry...`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 shadow-sm transition-all"
                              >
                                <MessageSquare className="h-3.5 w-3.5" />
                                <span>WhatsApp Chat</span>
                              </a>
                              <a
                                href={`tel:${b.phone}`}
                                className="bg-brand-plum hover:bg-brand-plum/90 text-white p-2 rounded-xl text-xs font-bold flex items-center justify-center transition-all"
                                title="Call Customer"
                              >
                                <Phone className="h-3.5 w-3.5" />
                              </a>
                            </div>
                          </div>

                          {/* Col 2: Decoration Requirement */}
                          <div className="space-y-2 bg-gray-50/80 p-4 rounded-2xl border border-gray-100">
                            <p className="text-[10px] font-black uppercase text-brand-plum tracking-wider">Decoration Requirements</p>
                            
                            <div>
                              <span className="text-xs text-gray-400 block">Category:</span>
                              <span className="font-bold text-sm text-brand-plum bg-brand-gold/20 text-brand-plum px-3 py-1 rounded-lg inline-block mt-0.5">
                                {b.requirement || "General Inquiry"}
                              </span>
                            </div>

                            {b.selectedTheme && b.selectedTheme !== "General Inquiry" && (
                              <div className="pt-1 space-y-1">
                                <span className="text-xs text-gray-400 block">Selected Package:</span>
                                <span className="font-bold text-xs text-brand-plum font-serif block">
                                  {b.selectedTheme}
                                </span>
                                {b.packageUrl && (
                                  <a
                                    href={b.packageUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center space-x-1 text-[11px] font-bold text-brand-gold hover:underline bg-brand-plum text-white px-2.5 py-1 rounded-lg shadow-xs mt-1"
                                  >
                                    <ExternalLink className="h-3 w-3 text-brand-gold" />
                                    <span>View Package Page 🔗</span>
                                  </a>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Col 3: Address & Location Link */}
                          <div className="space-y-2 bg-gray-50/80 p-4 rounded-2xl border border-gray-100">
                            <p className="text-[10px] font-black uppercase text-brand-plum tracking-wider">Location & Notes</p>

                            {b.address && (
                              <div className="text-xs text-gray-700 leading-relaxed">
                                <strong className="text-brand-plum block mb-0.5">Address:</strong>
                                {b.address}
                              </div>
                            )}

                            {b.locationLink && (
                              <div className="pt-1">
                                <a
                                  href={b.locationLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-600 hover:underline bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-200"
                                >
                                  <MapPin className="h-3.5 w-3.5 text-red-500" />
                                  <span>Open Google Maps Link 📍</span>
                                </a>
                              </div>
                            )}

                            {b.customNotes && (
                              <div className="pt-2 text-xs text-gray-600 bg-white p-2.5 rounded-xl border border-gray-200 font-mono">
                                <strong className="text-brand-plum block font-sans text-[10px] uppercase">Notes:</strong>
                                {b.customNotes}
                              </div>
                            )}
                          </div>

                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}

            </div>
          )}

        </main>
      </div>

      {/* SUBCATEGORY MANAGEMENT MODAL */}
      {subCatModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-brand-gold/30">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="font-serif text-xl font-black text-brand-plum">
                  Add New Subcategory
                </h3>
                <p className="text-xs text-gray-500 font-sans mt-0.5">
                  Create new subcategories like Balloon Canopy, Ring Stand, Neon Decor
                </p>
              </div>
              <button onClick={() => setSubCatModalOpen(false)} className="p-2 text-gray-400 hover:text-brand-plum rounded-full hover:bg-gray-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Add Subcategory Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (newSubCatName.trim()) {
                  addSubCategory(newSubCatName.trim());
                  setSelectedSubCatFilter(newSubCatName.trim());
                  setNewSubCatName("");
                  setSubCatModalOpen(false);
                }
              }}
              className="space-y-4 font-sans"
            >
              <div>
                <label className="block text-xs font-bold text-brand-plum uppercase tracking-wider mb-1.5">
                  Subcategory Name
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={newSubCatName}
                  onChange={(e) => setNewSubCatName(e.target.value)}
                  placeholder="e.g. Neon Arch, Terrace Setup, Balloon Canopy"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs text-brand-plum focus:border-brand-gold focus:outline-none font-bold"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setSubCatModalOpen(false)}
                  className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-brand-plum hover:bg-brand-plum/90 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer shadow-md flex items-center space-x-1.5"
                >
                  <Plus className="h-4 w-4 text-brand-gold" />
                  <span>Save Subcategory</span>
                </button>
              </div>
            </form>

            {/* Current Active Subcategories Pill List */}
            <div className="pt-3 border-t border-gray-100">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 font-sans">
                All Active Subcategories ({availableSubCategories.length})
              </label>
              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1">
                {availableSubCategories.map((subCat) => (
                  <div
                    key={subCat}
                    className="flex items-center space-x-1 px-3 py-1 rounded-full bg-gray-100 text-brand-plum text-xs font-bold border border-gray-200"
                  >
                    <span>{subCat}</span>
                    {!defaultSubCats.includes(subCat) && (
                      <button
                        type="button"
                        onClick={() => deleteSubCategory(subCat)}
                        className="p-0.5 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50"
                        title="Delete Custom Subcategory"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SERVICE MODAL (ADD / EDIT HOME PACKAGE) */}
      {serviceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-brand-gold/30 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 sticky top-0 bg-white z-10">
              <div>
                <h3 className="font-serif text-xl font-black text-brand-plum">
                  {editingService ? "Edit Home Catalog Package" : "Add New Home Package"}
                </h3>
                <p className="text-xs text-gray-500 font-sans mt-0.5">
                  Configure package details, decor shape, service process steps, and inclusions.
                </p>
              </div>
              <button onClick={() => setServiceModalOpen(false)} className="p-2 text-gray-400 hover:text-brand-plum rounded-full hover:bg-gray-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-5 font-sans">
              
              {/* 1. Basic Info */}
              <div>
                <label className="block text-xs font-bold text-brand-plum uppercase tracking-wider mb-1.5">
                  Package Title
                </label>
                <input
                  type="text"
                  required
                  value={serviceForm.title}
                  onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                  placeholder="e.g. Rosegold Chrome Arch Birthday Decor"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs text-brand-plum focus:border-brand-gold focus:outline-none font-bold"
                />
              </div>

              {/* 2. Celebration Category & Decor Shape Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Celebration Category Dropdown */}
                <div>
                  <label className="block text-xs font-bold text-brand-plum uppercase tracking-wider mb-1.5">
                    Celebration Category
                  </label>
                  <select
                    value={serviceForm.category || "Birthday Decor"}
                    onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs text-brand-plum focus:border-brand-gold focus:outline-none font-bold cursor-pointer"
                  >
                    <option value="Birthday Decor">Birthday Decor</option>
                    <option value="Baby Welcome">Baby Welcome</option>
                    <option value="Kid's Party">Kid's Party</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Baby Shower">Baby Shower</option>
                    <option value="Stage & Wedding">Stage & Wedding</option>
                    <option value="House Warming">House Warming</option>
                    <option value="Festival Decor">Festival Decor</option>
                    <option value="Car Decor">Car Decor</option>
                    <option value="Something Else">Something Else</option>
                  </select>
                </div>

                {/* Decor Shape Filter Dropdown / Custom Input */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-brand-plum uppercase tracking-wider">
                      Decor Shape Filter
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setIsCustomSubCatActive(!isCustomSubCatActive);
                        if (!isCustomSubCatActive) {
                          setCustomSubCatInput("");
                        }
                      }}
                      className="text-[11px] font-bold text-brand-gold hover:underline cursor-pointer flex items-center space-x-1"
                    >
                      <Plus className="h-3 w-3" />
                      <span>{isCustomSubCatActive ? "Select Existing" : "+ New Shape"}</span>
                    </button>
                  </div>

                  {!isCustomSubCatActive ? (
                    <select
                      value={serviceForm.decorShape || serviceForm.subCategory || "Wall Decor"}
                      onChange={(e) => {
                        if (e.target.value === "__NEW_SUBCAT__") {
                          setIsCustomSubCatActive(true);
                          setCustomSubCatInput("");
                        } else {
                          setServiceForm({ 
                            ...serviceForm, 
                            subCategory: e.target.value,
                            decorShape: e.target.value
                          });
                        }
                      }}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs text-brand-plum focus:border-brand-gold focus:outline-none font-bold cursor-pointer"
                    >
                      <option value="Wall Decor">Wall Decor</option>
                      <option value="Ring Stand">Ring Stand</option>
                      <option value="Room Decor">Room Decor</option>
                      <option value="Stage Backdrop">Stage Backdrop</option>
                      <option value="Table/Car Decor">Table/Car Decor</option>
                      {availableSubCategories
                        .filter((sc) => !["Wall Decor", "Ring Stand", "Room Decor", "Stage Backdrop", "Table/Car Decor"].includes(sc))
                        .map((sc) => (
                          <option key={sc} value={sc}>
                            {sc}
                          </option>
                        ))}
                      <option value="__NEW_SUBCAT__">+ Add New Custom Decor Shape...</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      required
                      value={customSubCatInput}
                      onChange={(e) => {
                        setCustomSubCatInput(e.target.value);
                        setServiceForm({ 
                          ...serviceForm, 
                          subCategory: e.target.value,
                          decorShape: e.target.value
                        });
                      }}
                      placeholder="e.g. Terrace Canopy, Entrance Arch"
                      className="w-full bg-white border-2 border-brand-gold rounded-xl px-4 py-3 text-xs text-brand-plum focus:outline-none font-bold"
                    />
                  )}
                </div>

              </div>

              {/* 3. Pricing Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-plum uppercase tracking-wider mb-1.5">
                    Offer Price (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={serviceForm.price}
                    onChange={(e) => setServiceForm({ ...serviceForm, price: e.target.value })}
                    placeholder="3499"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-xs text-brand-plum focus:border-brand-gold focus:outline-none font-bold text-base"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-plum uppercase tracking-wider mb-1.5">
                    Original Price (₹)
                  </label>
                  <input
                    type="number"
                    value={serviceForm.originalPrice}
                    onChange={(e) => setServiceForm({ ...serviceForm, originalPrice: e.target.value })}
                    placeholder="4999"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-xs text-brand-plum focus:border-brand-gold focus:outline-none"
                  />
                </div>
              </div>

              {/* 4. Multiple Images & Slides Gallery Manager */}
              <div className="space-y-3 bg-amber-50/50 p-4 rounded-2xl border border-amber-200">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-xs font-bold text-brand-plum uppercase tracking-wider">
                      Package Slides & Decoration Images
                    </label>
                    <p className="text-[10px] text-gray-500 font-sans">
                      Upload multiple images to showcase different angles & setups for this package slider.
                    </p>
                  </div>
                  <span className="text-xs font-black text-brand-plum bg-amber-200/60 px-2.5 py-1 rounded-full border border-amber-300">
                    {(serviceForm.images && serviceForm.images.length > 0 ? serviceForm.images.length : (serviceForm.image ? 1 : 0))} Images
                  </span>
                </div>

                {/* Upload Buttons Row */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <label className="bg-brand-plum hover:bg-brand-plum/90 text-white px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer flex items-center space-x-1.5 shadow-sm">
                    <Upload className="h-4 w-4 text-brand-gold" />
                    <span>Upload Multiple Images (Select Files)</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => handleMultipleFilesUpload(e, (urls) => {
                        setServiceForm((prev) => {
                          const existing = prev.images && prev.images.length > 0 ? prev.images : [prev.image || urls[0]];
                          const combined = Array.from(new Set([...existing, ...urls]));
                          return {
                            ...prev,
                            image: prev.image || combined[0],
                            images: combined
                          };
                        });
                      })}
                    />
                  </label>
                </div>



                {isUploading && <p className="text-[10px] text-brand-gold animate-pulse font-bold">Uploading files to cloud storage...</p>}

                {/* Thumbnails Gallery Strip */}
                {((serviceForm.images && serviceForm.images.length > 0) || (serviceForm.image && serviceForm.image.trim())) ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    {((serviceForm.images && serviceForm.images.length > 0)
                      ? serviceForm.images
                      : [serviceForm.image]
                    ).map((imgUrl, idx) => {
                      const isCover = (serviceForm.image === imgUrl) || idx === 0;
                      return (
                        <div key={idx} className={`relative rounded-xl overflow-hidden border-2 bg-black aspect-square group shadow-sm ${isCover ? "border-brand-gold ring-2 ring-brand-gold/30" : "border-gray-200"}`}>
                          <img src={imgUrl} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover" />
                          
                          {/* Cover Badge */}
                          <div className="absolute top-1.5 left-1.5">
                            {isCover ? (
                              <span className="bg-brand-gold text-brand-plum text-[9px] font-black px-1.5 py-0.5 rounded shadow">
                                COVER
                              </span>
                            ) : (
                              <span className="bg-black/60 text-white text-[9px] font-bold px-1.5 py-0.5 rounded backdrop-blur-sm">
                                #{idx + 1}
                              </span>
                            )}
                          </div>

                          {/* Action buttons on hover */}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-1">
                            {!isCover && (
                              <button
                                type="button"
                                onClick={() => {
                                  setServiceForm((prev) => {
                                    const list = prev.images || [prev.image];
                                    const updated = [imgUrl, ...list.filter((u) => u !== imgUrl)];
                                    return { ...prev, image: imgUrl, images: updated };
                                  });
                                }}
                                className="text-[9px] font-bold bg-brand-gold text-brand-plum px-2 py-1 rounded shadow cursor-pointer hover:scale-105 transition-transform"
                              >
                                Make Cover
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => {
                                setServiceForm((prev) => {
                                  const list = (prev.images && prev.images.length > 0) ? prev.images : (prev.image ? [prev.image] : []);
                                  const updated = list.filter((_, i) => i !== idx);
                                  return {
                                    ...prev,
                                    image: updated[0] || "",
                                    images: updated
                                  };
                                });
                              }}
                              className="p-1 bg-red-600 text-white rounded-full hover:bg-red-700 cursor-pointer"
                              title="Remove image slide"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-amber-300 rounded-2xl p-4 text-center text-xs text-amber-800 font-bold bg-white/70 font-sans">
                    📷 No package photos uploaded yet. Select files above to upload decoration slides.
                  </div>
                )}
              </div>

              {/* 5. Customisation Note / Badge Field */}
              <div>
                <label className="block text-xs font-bold text-brand-plum uppercase tracking-wider mb-1.5">
                  Customisation Note / Highlight Banner
                </label>
                <input
                  type="text"
                  value={serviceForm.customisableNote ?? ""}
                  onChange={(e) => setServiceForm({ ...serviceForm, customisableNote: e.target.value })}
                  placeholder="e.g. 🎈 Balloon Colour & Design are customisable"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs text-brand-plum focus:border-brand-gold focus:outline-none font-bold"
                />
              </div>

              {/* 5. Package Inclusions ("Includes") Manager */}
              <div className="space-y-2 bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-brand-plum uppercase tracking-wider">
                    Package Inclusions ("Includes")
                  </label>
                  <span className="text-[11px] font-bold text-brand-gold">
                    {serviceForm.includes?.length || 0} Items
                  </span>
                </div>

                {/* List of inclusions */}
                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                  {(serviceForm.includes || []).map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-gray-200 text-xs">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                        <span className="text-gray-800 font-medium">{item}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = serviceForm.includes.filter((_, i) => i !== idx);
                          setServiceForm({ ...serviceForm, includes: updated });
                        }}
                        className="text-gray-400 hover:text-red-600 p-1 cursor-pointer"
                        title="Remove Inclusion"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add new inclusion input */}
                <div className="flex items-center space-x-2 pt-1">
                  <input
                    type="text"
                    value={newIncludeInput}
                    onChange={(e) => setNewIncludeInput(e.target.value)}
                    placeholder="e.g. 200+ Premium Latex Balloons, Fairy Lights"
                    className="flex-1 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-brand-plum focus:border-brand-gold focus:outline-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (newIncludeInput.trim()) {
                          setServiceForm({
                            ...serviceForm,
                            includes: [...(serviceForm.includes || []), newIncludeInput.trim()]
                          });
                          setNewIncludeInput("");
                        }
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newIncludeInput.trim()) {
                        setServiceForm({
                          ...serviceForm,
                          includes: [...(serviceForm.includes || []), newIncludeInput.trim()]
                        });
                        setNewIncludeInput("");
                      }
                    }}
                    className="px-3.5 py-2 bg-brand-gold text-brand-plum rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-brand-gold/90 transition-all shrink-0 cursor-pointer"
                  >
                    + Add Item
                  </button>
                </div>
              </div>

              {/* 6. Service Process Steps Manager */}
              <div className="space-y-2 bg-purple-50/50 p-4 rounded-2xl border border-purple-100">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-brand-plum uppercase tracking-wider">
                    Service Process Steps
                  </label>
                  <span className="text-[11px] font-bold text-brand-plum">
                    {serviceForm.serviceProcess?.length || 0} Steps
                  </span>
                </div>

                {/* List of steps */}
                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                  {(serviceForm.serviceProcess || []).map((step, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-gray-200 text-xs">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-[#2563EB] shrink-0">{idx + 1}.</span>
                        <span className="text-gray-800 font-medium">{step}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = serviceForm.serviceProcess.filter((_, i) => i !== idx);
                          setServiceForm({ ...serviceForm, serviceProcess: updated });
                        }}
                        className="text-gray-400 hover:text-red-600 p-1 cursor-pointer"
                        title="Remove Step"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add new process step input */}
                <div className="flex items-center space-x-2 pt-1">
                  <input
                    type="text"
                    value={newProcessInput}
                    onChange={(e) => setNewProcessInput(e.target.value)}
                    placeholder="e.g. Decorator arrives at your venue with setup materials"
                    className="flex-1 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-brand-plum focus:border-brand-gold focus:outline-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (newProcessInput.trim()) {
                          setServiceForm({
                            ...serviceForm,
                            serviceProcess: [...(serviceForm.serviceProcess || []), newProcessInput.trim()]
                          });
                          setNewProcessInput("");
                        }
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newProcessInput.trim()) {
                        setServiceForm({
                          ...serviceForm,
                          serviceProcess: [...(serviceForm.serviceProcess || []), newProcessInput.trim()]
                        });
                        setNewProcessInput("");
                      }
                    }}
                    className="px-3.5 py-2 bg-brand-plum text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-brand-plum/90 transition-all shrink-0 cursor-pointer"
                  >
                    + Add Step
                  </button>
                </div>
              </div>

              {/* 7. Package Customer Reviews Manager */}
              <div className="space-y-3 bg-amber-50/60 p-4 rounded-2xl border border-amber-200/60 font-sans">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-brand-plum uppercase tracking-wider">
                    Customer Ratings & Reviews
                  </label>
                  <span className="text-[11px] font-bold text-amber-800">
                    {serviceForm.reviews?.length || 0} Reviews
                  </span>
                </div>

                {/* List of current reviews for this package */}
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {(serviceForm.reviews || []).map((rev, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-xl border border-gray-200 space-y-1 text-xs relative group">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-brand-plum">{rev.reviewerName}</span>
                          <span className="flex items-center gap-0.5 text-amber-600 font-extrabold text-[11px] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            {rev.rating} ★
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] text-gray-400 font-medium">{rev.date || "Verified"}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = (serviceForm.reviews || []).filter((_, i) => i !== idx);
                              setServiceForm({ ...serviceForm, reviews: updated });
                            }}
                            className="text-gray-400 hover:text-red-600 p-1 cursor-pointer"
                            title="Delete Review"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-600 italic text-[11px]">"{rev.comment}"</p>
                    </div>
                  ))}
                </div>

                {/* Form to add a new review for this package */}
                <div className="bg-white p-3.5 rounded-xl border border-amber-200 space-y-2.5">
                  <p className="text-[11px] font-bold text-brand-plum uppercase tracking-wider">Add New Customer Review:</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      value={newReviewerName}
                      onChange={(e) => setNewReviewerName(e.target.value)}
                      placeholder="Reviewer Name (e.g. Sneha Reddy)"
                      className="bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-brand-plum font-medium"
                    />
                    
                    <select
                      value={newReviewRating}
                      onChange={(e) => setNewReviewRating(Number(e.target.value))}
                      className="bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs font-bold text-amber-700"
                    >
                      <option value={5}>5 Stars ★★★★★</option>
                      <option value={4}>4 Stars ★★★★</option>
                      <option value={3}>3 Stars ★★★</option>
                      <option value={2}>2 Stars ★★</option>
                      <option value={1}>1 Star ★</option>
                    </select>

                    <input
                      type="text"
                      value={newReviewDate}
                      onChange={(e) => setNewReviewDate(e.target.value)}
                      placeholder="Date (e.g. 2 days ago)"
                      className="bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-brand-plum font-medium"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      placeholder="Review Comment (e.g. Stunning decoration, setup was fast and flawless!)"
                      className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-brand-plum font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newReviewerName.trim() && newReviewComment.trim()) {
                          const newRevObj = {
                            id: `rev-${Date.now()}`,
                            reviewerName: newReviewerName.trim(),
                            rating: newReviewRating,
                            comment: newReviewComment.trim(),
                            date: newReviewDate.trim() || "Recently"
                          };
                          setServiceForm({
                            ...serviceForm,
                            reviews: [...(serviceForm.reviews || []), newRevObj]
                          });
                          setNewReviewerName("");
                          setNewReviewComment("");
                        }
                      }}
                      className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-bold shrink-0 cursor-pointer shadow-xs uppercase tracking-wider"
                    >
                      + Add Review
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit / Cancel Buttons */}
              <div className="pt-4 flex justify-end space-x-3 border-t border-gray-100 sticky bottom-0 bg-white z-10">
                <button
                  type="button"
                  onClick={() => setServiceModalOpen(false)}
                  className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-6 py-2.5 bg-brand-plum hover:bg-brand-plum/90 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer shadow-md"
                >
                  {editingService ? "Update Package" : "Create Package"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* HERO SLIDER MODAL (ADD / EDIT BANNER SLIDER) */}
      {sliderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-brand-gold/30">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h3 className="font-serif text-xl font-black text-brand-plum">
                {editingSlider ? "Edit Hero Promotional Slider" : "Add New Hero Slider"}
              </h3>
              <button onClick={() => setSliderModalOpen(false)} className="p-2 text-gray-400 hover:text-brand-plum rounded-full hover:bg-gray-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSlider} className="space-y-4 font-sans">
              <div>
                <label className="block text-xs font-bold text-brand-plum uppercase tracking-wider mb-1.5">
                  Banner Title
                </label>
                <input
                  type="text"
                  required
                  value={sliderForm.title}
                  onChange={(e) => setSliderForm({ ...sliderForm, title: e.target.value })}
                  placeholder="e.g. Custom Dream Themes"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs text-brand-plum focus:border-brand-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-plum uppercase tracking-wider mb-1.5">
                  Tag / Badge Text
                </label>
                <input
                  type="text"
                  required
                  value={sliderForm.tag}
                  onChange={(e) => setSliderForm({ ...sliderForm, tag: e.target.value })}
                  placeholder="e.g. BESPOKE ART or LIMITED OFFER"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs text-brand-plum focus:border-brand-gold focus:outline-none font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-plum uppercase tracking-wider mb-1.5">
                  Subtitle Line
                </label>
                <input
                  type="text"
                  value={sliderForm.subtitle}
                  onChange={(e) => setSliderForm({ ...sliderForm, subtitle: e.target.value })}
                  placeholder="e.g. Decor Dazzlers · Hyderabad — Same day setup available"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs text-brand-plum focus:border-brand-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-plum uppercase tracking-wider mb-1.5">
                  Banner Gradient Theme
                </label>
                <select
                  value={sliderForm.gradient}
                  onChange={(e) => setSliderForm({ ...sliderForm, gradient: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs text-brand-plum focus:border-brand-gold focus:outline-none font-bold"
                >
                  <option value="linear-gradient(135deg, #4A1525 0%, #6B2137 50%, #8C2D4A 100%)">Deep Plum & Rosegold</option>
                  <option value="linear-gradient(135deg, #1E3A8A 0%, #3B82F6 50%, #60A5FA 100%)">Royal Ocean Blue</option>
                  <option value="linear-gradient(135deg, #881337 0%, #E11D48 50%, #FB7185 100%)">Romantic Rose Red</option>
                  <option value="linear-gradient(135deg, #C89B3C 0%, #D4A64A 100%)">Golden Sunshine</option>
                  <option value="linear-gradient(135deg, #064E3B 0%, #10B981 100%)">Emerald Party Green</option>
                </select>
              </div>

              {/* Banner Live Preview */}
              <div>
                <label className="block text-xs font-bold text-brand-plum uppercase tracking-wider mb-1.5">
                  Live Banner Preview
                </label>
                <div
                  className="p-5 rounded-2xl text-white relative min-h-[120px] flex flex-col justify-center shadow-inner"
                  style={{ background: sliderForm.gradient }}
                >
                  <span className="text-white/70 text-[9px] font-black uppercase tracking-widest font-sans mb-1">
                    {sliderForm.tag || "TAG PREVIEW"}
                  </span>
                  <h4 className="font-sans font-black text-xl leading-tight">
                    {sliderForm.title || "Banner Title Preview"}
                  </h4>
                  <p className="text-[11px] text-white/80 font-sans mt-1">
                    {sliderForm.subtitle || "Subtitle Preview"}
                  </p>
                </div>
              </div>

              <div className="pt-4 flex justify-end space-x-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setSliderModalOpen(false)}
                  className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-brand-plum hover:bg-brand-plum/90 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer shadow-md"
                >
                  {editingSlider ? "Update Slider" : "Create Slider"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* GALLERY MODAL (ADD / EDIT GALLERY ITEM) */}
      {galleryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-brand-gold/30">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h3 className="font-serif text-xl font-black text-brand-plum">
                {editingGalleryItem ? "Edit Gallery Item" : "Add Gallery Photo / Video"}
              </h3>
              <button onClick={() => setGalleryModalOpen(false)} className="p-2 text-gray-400 hover:text-brand-plum rounded-full hover:bg-gray-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveGalleryItem} className="space-y-4 font-sans">
              <div>
                <label className="block text-xs font-bold text-brand-plum uppercase tracking-wider mb-1.5">
                  Item Title
                </label>
                <input
                  type="text"
                  required
                  value={galleryForm.title}
                  onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                  placeholder="e.g. Grand Birthday Balloon Drop"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs text-brand-plum focus:border-brand-gold focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-brand-plum uppercase tracking-wider mb-1.5">
                    Category
                  </label>
                  <select
                    value={galleryForm.category}
                    onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs text-brand-plum focus:border-brand-gold focus:outline-none"
                  >
                    <option value="Birthdays">Birthdays</option>
                    <option value="Baby Welcome">Baby Welcome</option>
                    <option value="Kid's Party">Kid's Party</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Baby Shower">Baby Shower</option>
                    <option value="Stages & Weddings">Stages & Weddings</option>
                    <option value="House Warming">House Warming</option>
                    <option value="Festive & Car">Festive & Car</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-plum uppercase tracking-wider mb-1.5">
                    Media Type
                  </label>
                  <select
                    value={galleryForm.type}
                    onChange={(e) => setGalleryForm({ ...galleryForm, type: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs text-brand-plum focus:border-brand-gold focus:outline-none font-bold"
                  >
                    <option value="image">Photo (Image)</option>
                    <option value="video">Video Reel 🎬</option>
                  </select>
                </div>
              </div>

              {/* Photo / Thumbnail Image Upload */}
              <div>
                <label className="block text-xs font-bold text-brand-plum uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>Photo / Thumbnail Cover</span>
                  <span className="text-[10px] text-gray-400 font-normal">Displayed on gallery grid</span>
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={galleryForm.image}
                    onChange={(e) => setGalleryForm({ ...galleryForm, image: e.target.value })}
                    placeholder="/images/birthday_decor.png or Image URL"
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-xs text-brand-plum focus:border-brand-gold focus:outline-none"
                  />
                  <label className="bg-brand-plum text-white px-4 py-3 rounded-xl text-xs font-bold cursor-pointer hover:bg-brand-plum/90 flex items-center space-x-1.5 shadow-sm whitespace-nowrap">
                    <Upload className="h-4 w-4 text-brand-gold" />
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, "image", (url) => setGalleryForm((prev) => ({ ...prev, image: url })))}
                    />
                  </label>
                </div>
              </div>

              {/* Video File / Reel Upload Section */}
              <div className={`p-4 rounded-2xl border transition-all ${
                galleryForm.type === "video" 
                  ? "bg-red-50/60 border-red-200 shadow-sm" 
                  : "bg-gray-50 border-gray-200"
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-brand-plum uppercase tracking-wider flex items-center space-x-1.5">
                    <Film className="h-4 w-4 text-red-600" />
                    <span>Video File Upload / Reel URL</span>
                  </label>
                  {galleryForm.type === "video" && (
                    <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                      Video Mode Active
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={galleryForm.videoUrl || ""}
                    onChange={(e) => setGalleryForm({ 
                      ...galleryForm, 
                      videoUrl: e.target.value,
                      type: e.target.value.trim() ? "video" : galleryForm.type 
                    })}
                    placeholder="Upload video file or paste MP4 / Reel URL"
                    className="flex-1 bg-white border border-gray-200 rounded-xl px-3 py-3 text-xs text-brand-plum focus:border-brand-gold focus:outline-none font-mono"
                  />
                  <label className="bg-red-600 text-white px-4 py-3 rounded-xl text-xs font-bold cursor-pointer hover:bg-red-700 flex items-center space-x-1.5 shadow-md whitespace-nowrap">
                    <Film className="h-4 w-4 text-yellow-300" />
                    <span>Upload Video</span>
                    <input
                      type="file"
                      accept="video/mp4,video/webm,video/ogg,video/quicktime,video/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, "video", (url) => setGalleryForm((prev) => ({ 
                        ...prev, 
                        type: "video", 
                        videoUrl: url,
                        image: (!prev.image || prev.image === "/images/birthday_decor.png") 
                          ? (url.includes("res.cloudinary.com") ? url.replace(/\.[^/.]+$/, ".jpg") : prev.image)
                          : prev.image
                      })))}
                    />
                  </label>
                </div>
                <p className="text-[10px] text-gray-500 mt-1.5">
                  Supported formats: .mp4, .webm, .mov. Selecting or uploading a video automatically sets Media Type to Video Reel.
                </p>
              </div>

              {isUploading && (
                <div className="flex items-center space-x-2 text-brand-plum bg-brand-gold/20 p-3 rounded-xl">
                  <div className="w-4 h-4 border-2 border-brand-plum border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-xs font-bold">Uploading file to Cloudinary... Please wait.</span>
                </div>
              )}

              <div className="pt-4 flex justify-end space-x-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setGalleryModalOpen(false)}
                  className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-6 py-2.5 bg-brand-plum hover:bg-brand-plum/90 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer shadow-md"
                >
                  {editingGalleryItem ? "Update Item" : "Create Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── 5. CATEGORY POSTER MODAL ── */}
      {categoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm font-sans">
          <div className="bg-white border border-brand-gold/30 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl space-y-4 p-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center space-x-2 text-brand-plum">
                <Sparkles className="h-5 w-5 text-brand-gold" />
                <h3 className="font-serif font-black text-lg">
                  {editingCategory ? "Edit Celebration Category" : "Add New Celebration Category"}
                </h3>
              </div>
              <button
                onClick={() => setCategoryModalOpen(false)}
                className="text-gray-400 hover:text-brand-plum transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (editingCategory) {
                  await updateCategoryPoster(editingCategory.id, categoryForm);
                } else {
                  await addCategoryPoster(categoryForm);
                }
                setCategoryModalOpen(false);
                setEditingCategory(null);
              }}
              className="space-y-4"
            >
              {/* Category Name */}
              <div>
                <label className="block text-xs font-bold text-brand-plum uppercase tracking-wider mb-1.5">
                  Category Display Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Birthday Decor, Baby Welcome, Haldi Setup"
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-brand-gold rounded-xl px-4 py-3 text-xs text-brand-plum font-sans focus:outline-none"
                />
              </div>

              {/* Filter Key */}
              <div>
                <label className="block text-xs font-bold text-brand-plum uppercase tracking-wider mb-1.5">
                  Catalog Filter Key
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Birthdays, Baby Welcome, Romantic, Stages & Weddings"
                  value={categoryForm.key}
                  onChange={(e) => setCategoryForm({ ...categoryForm, key: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-brand-gold rounded-xl px-4 py-3 text-xs text-brand-plum font-sans focus:outline-none"
                />
                <p className="text-[11px] text-gray-400 mt-1 font-sans">
                  Clicking this category card on the homepage will filter catalog themes matching this key.
                </p>
              </div>

              {/* Cover Image Upload / URL */}
              <div>
                <label className="block text-xs font-bold text-brand-plum uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>Cover Image</span>
                  <span className="text-[10px] text-gray-400 font-normal">Displayed on poster card</span>
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    required
                    value={categoryForm.image}
                    onChange={(e) => setCategoryForm({ ...categoryForm, image: e.target.value })}
                    placeholder="/images/birthday_decor.png or Image URL"
                    className="flex-1 bg-gray-50 border border-gray-200 focus:border-brand-gold rounded-xl px-3 py-3 text-xs text-brand-plum focus:outline-none"
                  />
                  <label className="bg-brand-plum text-white px-4 py-3 rounded-xl text-xs font-bold cursor-pointer hover:bg-brand-plum/90 flex items-center space-x-1.5 shadow-sm whitespace-nowrap">
                    <Upload className="h-4 w-4 text-brand-gold" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, "image", (url) => setCategoryForm((prev) => ({ ...prev, image: url })))}
                    />
                  </label>
                </div>
              </div>

              {isUploading && (
                <div className="flex items-center space-x-2 text-brand-plum bg-brand-gold/20 p-3 rounded-xl">
                  <div className="w-4 h-4 border-2 border-brand-plum border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-xs font-bold">Uploading file to Cloudinary... Please wait.</span>
                </div>
              )}

              <div className="pt-4 flex justify-end space-x-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setCategoryModalOpen(false)}
                  className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold cursor-pointer font-sans"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-6 py-2.5 bg-brand-plum hover:bg-brand-plum/90 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer shadow-md font-sans"
                >
                  {editingCategory ? "Update Category" : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
