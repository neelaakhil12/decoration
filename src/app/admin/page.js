"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Plus, Trash2, Edit3, Upload, Film, Image as ImageIcon, 
  LogOut, Sparkles, Layers, RefreshCw, X, ExternalLink,
  Search, ShieldCheck, Menu, Filter, Check, LayoutGrid, Sliders
} from "lucide-react";
import { useApp } from "@/components/AppContext";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { 
    services, addService, updateService, deleteService,
    galleryItems, addGalleryItem, updateGalleryItem, deleteGalleryItem,
    heroSliders, addHeroSlider, updateHeroSlider, deleteHeroSlider,
    subCategories: appSubCategories, addSubCategory, deleteSubCategory,
    categoryPosters, addCategoryPoster, updateCategoryPoster, deleteCategoryPoster,
    reloadFromSupabase 
  } = useApp();

  const [activeTab, setActiveTab] = useState("services"); // "services" | "sliders" | "gallery" | "categories"
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
  const [serviceForm, setServiceForm] = useState({
    title: "",
    category: "Birthday",
    subCategory: "Wall Decor",
    price: "",
    originalPrice: "",
    discount: "25% OFF",
    rating: "4.8",
    image: "/images/birthday_decor.png",
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

  // Handle Cloudinary File Upload
  const handleFileUpload = async (e, type = "image", callback) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("resource_type", type === "video" ? "video" : "image");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.url) {
        callback(data.url);
      } else {
        alert("Upload failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading file");
    } finally {
      setIsUploading(false);
    }
  };

  // Submit Service Form (Add or Edit)
  const handleSaveService = async (e) => {
    e.preventDefault();
    const payload = {
      ...serviceForm,
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
    if (editingGalleryItem) {
      await updateGalleryItem(editingGalleryItem.id, galleryForm);
    } else {
      await addGalleryItem(galleryForm);
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
        className={`fixed md:static inset-y-0 left-0 z-50 w-72 bg-brand-plum text-white flex flex-col justify-between p-6 border-r border-brand-gold/20 shadow-2xl transition-transform duration-300 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="space-y-6">
          
          {/* Brand Logo & Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src="/logo.png"
                alt="Decor Dazzlers Logo"
                className="h-12 w-auto object-contain bg-white/10 p-1.5 rounded-xl border border-brand-gold/30"
              />
              <div>
                <h2 className="font-serif font-black text-base text-white leading-tight">
                  Decor Dazzlers
                </h2>
                <span className="inline-flex items-center text-[10px] text-brand-gold font-bold uppercase tracking-wider">
                  <ShieldCheck className="h-3 w-3 mr-1" /> Admin Studio
                </span>
              </div>
            </div>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="md:hidden text-gray-400 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Separate Navigation Sections */}
          <div className="space-y-3">
            <div className="text-[10px] uppercase font-extrabold tracking-widest text-brand-pink/50 px-3 mb-1">
              Section 1: Home Packages
            </div>

            <button
              onClick={() => {
                setActiveTab("services");
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "services"
                  ? "bg-brand-gold text-brand-plum shadow-lg font-black scale-102"
                  : "bg-white/5 text-white/80 hover:bg-white/15 hover:text-white"
              }`}
            >
              <div className="flex items-center space-x-3">
                <LayoutGrid className="h-4 w-4" />
                <span>Home Catalog Packages</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                activeTab === "services" ? "bg-brand-plum text-brand-gold" : "bg-white/10 text-white"
              }`}>
                {services.length}
              </span>
            </button>

            <div className="text-[10px] uppercase font-extrabold tracking-widest text-brand-pink/50 px-3 pt-2 mb-1">
              Section 2: Hero Promotional Sliders
            </div>

            <button
              onClick={() => {
                setActiveTab("sliders");
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "sliders"
                  ? "bg-brand-gold text-brand-plum shadow-lg font-black scale-102"
                  : "bg-white/5 text-white/80 hover:bg-white/15 hover:text-white"
              }`}
            >
              <div className="flex items-center space-x-3">
                <Sliders className="h-4 w-4" />
                <span>Hero Top Banners</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                activeTab === "sliders" ? "bg-brand-plum text-brand-gold" : "bg-white/10 text-white"
              }`}>
                {(heroSliders || []).length}
              </span>
            </button>

            <div className="text-[10px] uppercase font-extrabold tracking-widest text-brand-pink/50 px-3 pt-2 mb-1">
              Section 3: Gallery Page
            </div>

            <button
              onClick={() => {
                setActiveTab("gallery");
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "gallery"
                  ? "bg-brand-gold text-brand-plum shadow-lg font-black scale-102"
                  : "bg-white/5 text-white/80 hover:bg-white/15 hover:text-white"
              }`}
            >
              <div className="flex items-center space-x-3">
                <ImageIcon className="h-4 w-4" />
                <span>Gallery Photos & Reels</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                activeTab === "gallery" ? "bg-brand-plum text-brand-gold" : "bg-white/10 text-white"
              }`}>
                {galleryItems.length}
              </span>
            </button>

            <div className="text-[10px] uppercase font-extrabold tracking-widest text-brand-pink/50 px-3 pt-2 mb-1">
              Section 4: Celebration Categories
            </div>

            <button
              onClick={() => {
                setActiveTab("categories");
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "categories"
                  ? "bg-brand-gold text-brand-plum shadow-lg font-black scale-102"
                  : "bg-white/5 text-white/80 hover:bg-white/15 hover:text-white"
              }`}
            >
              <div className="flex items-center space-x-3">
                <Sparkles className="h-4 w-4 text-brand-gold" />
                <span>Celebration Cards</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                activeTab === "categories" ? "bg-brand-plum text-brand-gold" : "bg-white/10 text-white"
              }`}>
                {(categoryPosters || []).length}
              </span>
            </button>
          </div>

        </div>

        {/* Sidebar Footer — Profile & Logout */}
        <div className="space-y-4 pt-6 border-t border-white/10">
          <div className="px-2">
            <p className="text-[10px] uppercase text-brand-pink/60 font-bold tracking-wider">Logged in as</p>
            <p className="text-xs font-bold text-white truncate">{adminEmail || "admin@decordazzlers.com"}</p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 py-3 bg-red-500/20 hover:bg-red-600 text-white rounded-2xl text-xs font-bold transition-all shadow-sm cursor-pointer border border-red-400/30"
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
                    ? "Home Page Decoration Packages" 
                    : activeTab === "sliders"
                    ? "Hero Top Promotional Sliders"
                    : "Gallery Page Portfolio (Photos & Reels)"}
                </span>
              </h1>
              <p className="text-xs text-gray-500 font-sans mt-0.5">
                {activeTab === "services"
                  ? `Manage all ${services.length} Home Catalog packages and subcategories`
                  : activeTab === "sliders"
                  ? `Manage all ${(heroSliders || []).length} top promotional slider banners`
                  : `Manage all ${galleryItems.length} Gallery Page photos and video reels`}
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
                    category: "Birthday",
                    subCategory: "Wall Decor",
                    price: "",
                    originalPrice: "",
                    discount: "25% OFF",
                    rating: "4.8",
                    image: "/images/birthday_decor.png",
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
                Add New {activeTab === "services" ? "Home Package" : activeTab === "sliders" ? "Hero Slider" : "Gallery Item"}
              </span>
              <span className="sm:hidden">Add</span>
            </button>

          </div>
        </header>

        {/* Subcategory Filter Strip — ONLY for Home Catalog Packages Section */}
        {activeTab === "services" && (
          <div className="bg-white border-b border-gray-150 px-4 sm:px-8 py-3 flex items-center space-x-2 overflow-x-auto scroll-bar-remove">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider font-sans mr-2 flex items-center shrink-0">
              <Filter className="h-3.5 w-3.5 mr-1 text-brand-gold" /> Filter Subcategory:
            </span>
            {subCategoriesList.map((sub) => {
              const isSelected = selectedSubCatFilter === sub;
              return (
                <button
                  key={sub}
                  onClick={() => setSelectedSubCatFilter(sub)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap font-sans shrink-0 ${
                    isSelected
                      ? "bg-brand-plum text-white shadow-sm scale-105"
                      : "bg-gray-100 text-brand-plum/70 hover:bg-gray-200"
                  }`}
                >
                  {sub}
                </button>
              );
            })}

            <button
              onClick={() => {
                setNewSubCatName("");
                setSubCatModalOpen(true);
              }}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-brand-gold/20 text-brand-plum border border-brand-gold/40 hover:bg-brand-gold hover:text-brand-plum transition-all cursor-pointer whitespace-nowrap font-sans shrink-0 flex items-center space-x-1"
              title="Manage & Add Subcategories"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Subcategory</span>
            </button>
          </div>
        )}

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
                              setServiceForm(service);
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

          {/* SECTION 2: HERO PROMOTIONAL SLIDERS */}
          {activeTab === "sliders" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredSliders.map((slider) => (
                <div
                  key={slider.id}
                  className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Slider Preview Banner */}
                  <div
                    className="p-6 text-white relative flex flex-col justify-center min-h-[160px]"
                    style={{ background: slider.gradient }}
                  >
                    <span className="text-white/70 text-[10px] font-black uppercase tracking-widest font-sans mb-1">
                      {slider.tag}
                    </span>
                    <h3 className="font-sans font-black text-2xl leading-tight drop-shadow-sm">
                      {slider.title}
                    </h3>
                    <p className="text-xs text-white/80 font-sans mt-2">
                      {slider.subtitle || "Decor Dazzlers · Hyderabad"}
                    </p>
                  </div>

                  {/* Slider Details & Controls */}
                  <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[11px] text-gray-400 font-mono">ID: {slider.id}</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setEditingSlider(slider);
                          setSliderForm(slider);
                          setSliderModalOpen(true);
                        }}
                        className="flex items-center space-x-1 px-3.5 py-2 rounded-xl bg-white border border-gray-200 hover:border-brand-gold hover:bg-brand-gold/10 text-brand-plum transition-all cursor-pointer shadow-sm text-xs font-bold"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                        <span>Edit Slider</span>
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete slider "${slider.title}"?`)) {
                            deleteHeroSlider(slider.id);
                          }
                        }}
                        className="flex items-center space-x-1 px-3.5 py-2 rounded-xl bg-red-50 border border-red-200 hover:bg-red-500 hover:text-white text-red-500 transition-all cursor-pointer shadow-sm text-xs font-bold"
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
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-brand-gold/30">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h3 className="font-serif text-xl font-black text-brand-plum">
                {editingService ? "Edit Home Catalog Package" : "Add New Home Package"}
              </h3>
              <button onClick={() => setServiceModalOpen(false)} className="p-2 text-gray-400 hover:text-brand-plum rounded-full hover:bg-gray-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-4 font-sans">
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
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs text-brand-plum focus:border-brand-gold focus:outline-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-brand-plum uppercase tracking-wider">
                    Subcategory (Shape Chip)
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
                    <span>{isCustomSubCatActive ? "Select Existing Subcategory" : "+ Create New Subcategory"}</span>
                  </button>
                </div>

                {!isCustomSubCatActive ? (
                  <select
                    value={serviceForm.subCategory}
                    onChange={(e) => {
                      if (e.target.value === "__NEW_SUBCAT__") {
                        setIsCustomSubCatActive(true);
                        setCustomSubCatInput("");
                      } else {
                        setServiceForm({ ...serviceForm, subCategory: e.target.value });
                      }
                    }}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs text-brand-plum focus:border-brand-gold focus:outline-none font-bold text-brand-plum"
                  >
                    {availableSubCategories.map((sc) => (
                      <option key={sc} value={sc}>
                        {sc}
                      </option>
                    ))}
                    <option value="__NEW_SUBCAT__">+ Add New Custom Subcategory...</option>
                  </select>
                ) : (
                  <div className="space-y-1.5">
                    <input
                      type="text"
                      required
                      value={customSubCatInput}
                      onChange={(e) => {
                        setCustomSubCatInput(e.target.value);
                        setServiceForm({ ...serviceForm, subCategory: e.target.value });
                      }}
                      placeholder="e.g. Balloon Canopy, Terrace Setup, Neon Arch"
                      className="w-full bg-white border-2 border-brand-gold rounded-xl px-4 py-3 text-xs text-brand-plum focus:outline-none font-bold shadow-sm"
                    />
                    <p className="text-[10px] text-gray-500 font-sans">
                      This new subcategory will automatically appear as a filter chip on both the home page and admin panel.
                    </p>
                  </div>
                )}
              </div>

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

              {/* Image Upload */}
              <div>
                <label className="block text-xs font-bold text-brand-plum uppercase tracking-wider mb-1.5">
                  Package Image
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={serviceForm.image}
                    onChange={(e) => setServiceForm({ ...serviceForm, image: e.target.value })}
                    placeholder="/images/birthday_decor.png or Image URL"
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-xs text-brand-plum focus:border-brand-gold focus:outline-none"
                  />
                  <label className="bg-brand-plum text-white px-4 py-3 rounded-xl text-xs font-bold cursor-pointer hover:bg-brand-plum/90 flex items-center space-x-1.5 shadow-sm">
                    <Upload className="h-4 w-4 text-brand-gold" />
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, "image", (url) => setServiceForm((prev) => ({ ...prev, image: url })))}
                    />
                  </label>
                </div>
                {isUploading && <p className="text-[10px] text-brand-gold mt-1 animate-pulse font-bold">Uploading file...</p>}
              </div>

              <div className="pt-4 flex justify-end space-x-3 border-t border-gray-100">
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
                        videoUrl: url 
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
