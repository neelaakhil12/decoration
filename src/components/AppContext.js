"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

const AppContext = createContext();

const defaultServices = [
  // BIRTHDAY
  { id: "CLA595", title: "Rosegold Chrome Arch Birthday Decor", category: "Birthday", subCategory: "Wall Decor", price: 3499, originalPrice: 4999, discount: "30% OFF", rating: 4.8, image: "/images/birthday_decor.png" },
  { id: "CLA612", title: "Whimsical Jungle Safari Kid's Birthday", category: "Birthday", subCategory: "Stage Backdrop", price: 7499, originalPrice: 9999, discount: "25% OFF", rating: 4.7, image: "/images/kids_birthday_decor.png" },
  { id: "CLA596", title: "Golden Balloon Ring Birthday Arch", category: "Birthday", subCategory: "Ring Stand", price: 3999, originalPrice: 5499, discount: "27% OFF", rating: 4.9, image: "/images/birthday_decor.png" },
  { id: "CLA597", title: "Premium Birthday Canopy & Room Balloons", category: "Birthday", subCategory: "Room Decor", price: 4499, originalPrice: 5999, discount: "25% OFF", rating: 4.8, image: "/images/birthday_decor.png" },
  { id: "CLA598", title: "Cake Table & Balloon Bouquet Setup", category: "Birthday", subCategory: "Table/Car Decor", price: 2499, originalPrice: 3499, discount: "28% OFF", rating: 4.6, image: "/images/birthday_decor.png" },

  // ROMANTIC / ANNIVERSARY
  { id: "CLA587", title: "Royal Red Rose Canopy Decor", category: "Romantic", subCategory: "Ring Stand", price: 4499, originalPrice: 5999, discount: "25% OFF", rating: 4.8, image: "/images/anniversary_decor.png" },
  { id: "CLA729", title: "Surprise Bedroom Canopy Proposal Setup", category: "Romantic", subCategory: "Room Decor", price: 3999, originalPrice: 5499, discount: "27% OFF", rating: 4.9, image: "/images/anniversary_decor.png" },
  { id: "CLA588", title: "Heart Floral Wall & Neon Light Setup", category: "Romantic", subCategory: "Wall Decor", price: 3299, originalPrice: 4599, discount: "28% OFF", rating: 4.7, image: "/images/anniversary_decor.png" },
  { id: "CLA589", title: "Romantic Candlelight Stage & Canopy", category: "Romantic", subCategory: "Stage Backdrop", price: 6999, originalPrice: 8999, discount: "22% OFF", rating: 4.9, image: "/images/anniversary_decor.png" },
  { id: "CLA590", title: "Dining Table & Rose Petals Decor", category: "Romantic", subCategory: "Table/Car Decor", price: 1999, originalPrice: 2999, discount: "33% OFF", rating: 4.6, image: "/images/anniversary_decor.png" },

  // BABY SHOWER / BABY WELCOME
  { id: "CLA687", title: "Dreamy Pastel Floral Baby Shower", category: "Baby Shower", subCategory: "Room Decor", price: 5999, originalPrice: 7999, discount: "25% OFF", rating: 4.9, image: "/images/baby_shower_decor.png" },
  { id: "CLA688", title: "Teddy Bear & Clouds Welcome Wall", category: "Baby Shower", subCategory: "Wall Decor", price: 3499, originalPrice: 4999, discount: "30% OFF", rating: 4.8, image: "/images/welcome_baby_decor.png" },
  { id: "CLA689", title: "Pastel Balloon Ring Baby Shower Arch", category: "Baby Shower", subCategory: "Ring Stand", price: 4299, originalPrice: 5999, discount: "28% OFF", rating: 4.7, image: "/images/baby_shower_decor.png" },
  { id: "CLA690", title: "Royal Carousel Baby Shower Stage", category: "Baby Shower", subCategory: "Stage Backdrop", price: 7999, originalPrice: 10999, discount: "27% OFF", rating: 4.9, image: "/images/welcome_baby_decor.png" },
  { id: "CLA691", title: "Welcome Baby Gift Table & Bonnet Decor", category: "Baby Shower", subCategory: "Table/Car Decor", price: 2199, originalPrice: 2999, discount: "26% OFF", rating: 4.6, image: "/images/welcome_baby_decor.png" },

  // STAGE & WEDDING
  { id: "CLA803", title: "Showroom Grand Opening Balloon Arch", category: "Stage & Wedding", subCategory: "Stage Backdrop", price: 4999, originalPrice: 6999, discount: "28% OFF", rating: 4.6, image: "/images/stage_decor.png" },
  { id: "CLA899", title: "Premium Golden Marigold Garland Stage", category: "Stage & Wedding", subCategory: "Stage Backdrop", price: 12999, originalPrice: 16999, discount: "23% OFF", rating: 4.9, image: "/images/stage_decor.png" },
  { id: "CLA804", title: "Flower Backdrop & Fairy Light Entrance", category: "Stage & Wedding", subCategory: "Wall Decor", price: 5499, originalPrice: 7499, discount: "26% OFF", rating: 4.8, image: "/images/stage_decor.png" },
  { id: "CLA805", title: "Circular Floral Canopy Wedding Arch", category: "Stage & Wedding", subCategory: "Ring Stand", price: 6499, originalPrice: 8499, discount: "23% OFF", rating: 4.7, image: "/images/stage_decor.png" },
  { id: "CLA806", title: "Haldi & Sangeet Room Seating Setup", category: "Stage & Wedding", subCategory: "Room Decor", price: 4999, originalPrice: 6999, discount: "28% OFF", rating: 4.8, image: "/images/stage_decor.png" },
  { id: "CLA807", title: "Wedding Car Bonnet & Doli Flowers", category: "Stage & Wedding", subCategory: "Table/Car Decor", price: 3499, originalPrice: 4999, discount: "30% OFF", rating: 4.7, image: "/images/stage_decor.png" },

  // TRADITIONAL / HOUSE WARMING
  { id: "CLA714", title: "Traditional Mango Leaf Threshold Decor", category: "Traditional", subCategory: "Wall Decor", price: 2499, originalPrice: 3499, discount: "28% OFF", rating: 4.8, image: "/images/house_warming_decor.png" },
  { id: "CLA942", title: "Sparkling Golden Lights Festival Decor", category: "Traditional", subCategory: "Room Decor", price: 3499, originalPrice: 4999, discount: "30% OFF", rating: 4.7, image: "/images/festival_decor.png" },
  { id: "CLA715", title: "Traditional Puja Mandap & Floral Stage", category: "Traditional", subCategory: "Stage Backdrop", price: 6499, originalPrice: 8999, discount: "27% OFF", rating: 4.9, image: "/images/house_warming_decor.png" },
  { id: "CLA716", title: "Marigold Floral Ring Mandap Setup", category: "Traditional", subCategory: "Ring Stand", price: 3999, originalPrice: 5499, discount: "27% OFF", rating: 4.8, image: "/images/house_warming_decor.png" },
  { id: "CLA717", title: "Puja Kalash & Entrance Garland Setup", category: "Traditional", subCategory: "Table/Car Decor", price: 1899, originalPrice: 2699, discount: "29% OFF", rating: 4.6, image: "/images/house_warming_decor.png" },

  // SPECIALTY / CAR
  { id: "CLA850", title: "Luxury Orchid Car Bonnet Decoration", category: "Specialty", subCategory: "Table/Car Decor", price: 2999, originalPrice: 3999, discount: "25% OFF", rating: 4.7, image: "/images/car_decor.png" },
  { id: "CLA910", title: "Cute Pet-Friendly Paw Birthday Decor", category: "Specialty", subCategory: "Wall Decor", price: 1999, originalPrice: 2999, discount: "33% OFF", rating: 4.8, image: "/images/pet_decor.png" },
  { id: "CLA851", title: "Showroom Launch Balloon Ring Stand", category: "Specialty", subCategory: "Ring Stand", price: 4499, originalPrice: 5999, discount: "25% OFF", rating: 4.8, image: "/images/car_decor.png" },
  { id: "CLA852", title: "Special Theme Room Surprise Setup", category: "Specialty", subCategory: "Room Decor", price: 3499, originalPrice: 4999, discount: "30% OFF", rating: 4.7, image: "/images/pet_decor.png" },
  { id: "CLA853", title: "Specialty Event & Party Stage Setup", category: "Specialty", subCategory: "Stage Backdrop", price: 6999, originalPrice: 9499, discount: "26% OFF", rating: 4.9, image: "/images/car_decor.png" },
];

const defaultGalleryItems = [
  // BIRTHDAYS
  { id: 1, type: "image", category: "Birthdays", title: "Golden Balloon Bliss Arch Setup", image: "/images/birthday_decor.png" },
  { id: 2, type: "video", category: "Birthdays", title: "Grand Birthday Ring & Balloon Drop (Video)", image: "/images/birthday_decor.png", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-party-balloons-falling-down-41604-large.mp4" },
  { id: 3, type: "image", category: "Birthdays", title: "Rosegold Chrome & Pastel Backdrop", image: "/images/kids_birthday_decor.png" },

  // BABY WELCOME
  { id: 4, type: "image", category: "Baby Welcome", title: "Dreamy Clouds & Teddy Baby Welcome", image: "/images/welcome_baby_decor.png" },
  { id: 5, type: "video", category: "Baby Welcome", title: "Baby Welcome Home Entry Reveal (Video)", image: "/images/welcome_baby_decor.png", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-little-girl-playing-with-balloons-41603-large.mp4" },

  // KID'S PARTY
  { id: 6, type: "image", category: "Kid's Party", title: "Jungle Safari Kingdom Stage Setup", image: "/images/kids_birthday_decor.png" },
  { id: 7, type: "video", category: "Kid's Party", title: "Superheroes & Castle Balloon Walkway (Video)", image: "/images/kids_birthday_decor.png", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-kids-playing-with-balloons-at-a-party-41605-large.mp4" },

  // ANNIVERSARY
  { id: 8, type: "image", category: "Anniversary", title: "Royal Red Rose Proposal Canopy", image: "/images/anniversary_decor.png" },
  { id: 9, type: "video", category: "Anniversary", title: "Romantic Candlelight & Rose Surprise (Video)", image: "/images/anniversary_decor.png", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-sparklers-at-a-party-41602-large.mp4" },

  // BABY SHOWER
  { id: 10, type: "image", category: "Baby Shower", title: "Pastel Floral Baby Shower Ring Backdrop", image: "/images/baby_shower_decor.png" },
  { id: 11, type: "image", category: "Baby Shower", title: "Garden Flower Carousel Theme", image: "/images/welcome_baby_decor.png" },

  // STAGES & WEDDINGS
  { id: 12, type: "image", category: "Stages & Weddings", title: "Royal Wedding Reception Floral Stage", image: "/images/stage_decor.png" },
  { id: 13, type: "video", category: "Stages & Weddings", title: "Showroom Opening & Stage Lights (Video)", image: "/images/stage_decor.png", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-wedding-reception-venue-with-lights-41606-large.mp4" },

  // HOUSE WARMING
  { id: 14, type: "image", category: "House Warming", title: "Traditional Mango Leaf & Marigold Threshold", image: "/images/house_warming_decor.png" },
  { id: 15, type: "image", category: "House Warming", title: "Traditional Puja Floral Mandap Setup", image: "/images/house_warming_decor.png" },

  // FESTIVE & CAR
  { id: 16, type: "image", category: "Festive & Car", title: "Luxury Orchid Car Bonnet Decoration", image: "/images/car_decor.png" },
  { id: 17, type: "video", category: "Festive & Car", title: "Sparkling Lights Festival Gate (Video)", image: "/images/festival_decor.png", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-sparklers-at-a-party-41602-large.mp4" },
];

const defaultHeroSliders = [
  {
    id: "SLD001",
    title: "Custom Dream Themes",
    tag: "BESPOKE ART",
    gradient: "linear-gradient(135deg, #4A1525 0%, #6B2137 50%, #8C2D4A 100%)",
    subtitle: "Decor Dazzlers · Hyderabad — Same day setup available",
  },
  {
    id: "SLD002",
    title: "Flat 25% Off Kids Birthday Setup",
    tag: "SPECIAL OFFER",
    gradient: "linear-gradient(135deg, #1E3A8A 0%, #3B82F6 50%, #60A5FA 100%)",
    subtitle: "Magical themes for boys & girls — Free balloon delivery",
  },
  {
    id: "SLD003",
    title: "Premium Candlelight Canopy Setup",
    tag: "ROMANTIC VIBES",
    gradient: "linear-gradient(135deg, #881337 0%, #E11D48 50%, #FB7185 100%)",
    subtitle: "Surprise your loved ones with breathtaking bedroom canopies",
  },
];

const defaultCategoryPosters = [
  { id: "CAT001", name: "Birthday Decor", key: "Birthdays", image: "/images/birthday_decor.png", span: "col-span-2", aspect: "2/1" },
  { id: "CAT002", name: "Baby Welcome", key: "Baby Welcome", image: "/images/welcome_baby_decor.png", span: "col-span-2", aspect: "2/1" },
  { id: "CAT003", name: "Kid's Party", key: "Kid's Party", image: "/images/kids_birthday_decor.png", span: "col-span-1", aspect: "1/1" },
  { id: "CAT004", name: "Anniversary", key: "Anniversary", image: "/images/anniversary_decor.png", span: "col-span-1", aspect: "1/1" },
  { id: "CAT005", name: "Baby Shower", key: "Baby Shower", image: "/images/baby_shower_decor.png", span: "col-span-1", aspect: "1/1" },
  { id: "CAT006", name: "Stage & Wedding", key: "Stages & Weddings", image: "/images/stage_decor.png", span: "col-span-1", aspect: "1/1" },
  { id: "CAT007", name: "House Warming", key: "House Warming", image: "/images/house_warming_decor.png", span: "col-span-1", aspect: "1/1" },
  { id: "CAT008", name: "Festival Decor", key: "Festive & Car", image: "/images/festival_decor.png", span: "col-span-1", aspect: "1/1" },
  { id: "CAT009", name: "Car Decor", key: "Festive & Car", image: "/images/car_decor.png", span: "col-span-1", aspect: "1/1" },
  { id: "CAT010", name: "Something Else", key: "All", image: "/images/pet_decor.png", span: "col-span-1", aspect: "1/1" },
];

export function AppProvider({ children }) {
  const [location, setLocation] = useState({ city: "Hyderabad", address: "Hyderabad Metro" });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingItem, setBookingItem] = useState(null);

  const openBookingModal = (itemOrCategory = null) => {
    setBookingItem(itemOrCategory);
    setIsBookingOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingOpen(false);
    setBookingItem(null);
  };

  // Dynamic Data State
  const [services, setServices] = useState(defaultServices);
  const [galleryItems, setGalleryItems] = useState(defaultGalleryItems);
  const [heroSliders, setHeroSliders] = useState(defaultHeroSliders);
  const [categoryPosters, setCategoryPosters] = useState(defaultCategoryPosters);

  const defaultSubCategories = ["Wall Decor", "Ring Stand", "Room Decor", "Stage Backdrop", "Table/Car Decor"];
  const [subCategories, setSubCategories] = useState(defaultSubCategories);

  // Load stored data on mount if available in localStorage
  useEffect(() => {
    try {
      const savedSubCats = localStorage.getItem("decor_subcategories");
      if (savedSubCats) {
        const parsed = JSON.parse(savedSubCats);
        if (parsed && parsed.length > 0) {
          setSubCategories(Array.from(new Set([...defaultSubCategories, ...parsed])));
        }
      }
      const savedSliders = localStorage.getItem("decor_hero_sliders");
      if (savedSliders) {
        const parsed = JSON.parse(savedSliders);
        if (parsed && parsed.length > 0) setHeroSliders(parsed);
      }
      const savedServices = localStorage.getItem("decor_services");
      if (savedServices) {
        const parsed = JSON.parse(savedServices);
        if (parsed && parsed.length > 0) setServices(parsed);
      }
      const savedGallery = localStorage.getItem("decor_gallery_items");
      if (savedGallery) {
        const parsed = JSON.parse(savedGallery);
        if (parsed && parsed.length > 0) setGalleryItems(parsed);
      }
      const savedCategoryPosters = localStorage.getItem("decor_category_posters");
      if (savedCategoryPosters) {
        const parsed = JSON.parse(savedCategoryPosters);
        if (parsed && parsed.length > 0) setCategoryPosters(parsed);
      }
    } catch (e) {
      console.error("Error reading localStorage on mount:", e);
    }
  }, []);

  // Sync across tabs via window storage event
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "decor_hero_sliders" && e.newValue) {
        try { setHeroSliders(JSON.parse(e.newValue)); } catch (err) {}
      }
      if (e.key === "decor_services" && e.newValue) {
        try { setServices(JSON.parse(e.newValue)); } catch (err) {}
      }
      if (e.key === "decor_gallery_items" && e.newValue) {
        try { setGalleryItems(JSON.parse(e.newValue)); } catch (err) {}
      }
      if (e.key === "decor_category_posters" && e.newValue) {
        try { setCategoryPosters(JSON.parse(e.newValue)); } catch (err) {}
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const saveToLocal = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {}
  };

  // Fetch Services, Gallery & Sliders from Supabase with Fallback
  const loadSupabaseData = useCallback(async () => {
    try {
      // 1. Fetch Services
      const { data: dbServices, error: servError } = await supabase
        .from("services")
        .select("*")
        .order("created_at", { ascending: false });

      if (!servError && dbServices && dbServices.length > 0) {
        setServices(dbServices);
        saveToLocal("decor_services", dbServices);
      }

      // 2. Fetch Gallery Items
      const { data: dbGallery, error: galError } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });

      if (!galError && dbGallery && dbGallery.length > 0) {
        setGalleryItems(dbGallery);
        saveToLocal("decor_gallery_items", dbGallery);
      }

      // 3. Fetch Hero Sliders
      const { data: dbSliders, error: sldError } = await supabase
        .from("sliders")
        .select("*")
        .order("created_at", { ascending: false });

      if (!sldError && dbSliders && dbSliders.length > 0) {
        setHeroSliders(dbSliders);
        saveToLocal("decor_hero_sliders", dbSliders);
      }

      // 4. Fetch Category Posters
      const { data: dbCategories, error: catError } = await supabase
        .from("category_posters")
        .select("*")
        .order("created_at", { ascending: true });

      if (!catError && dbCategories && dbCategories.length > 0) {
        setCategoryPosters(dbCategories);
        saveToLocal("decor_category_posters", dbCategories);
      }
    } catch (err) {
      console.warn("Supabase load fallback triggered:", err);
    }
  }, []);

  useEffect(() => {
    // Check local saved location
    const saved = localStorage.getItem("decor_user_location");
    if (saved) {
      try {
        setLocation(JSON.parse(saved));
      } catch (e) {}
    } else {
      const timer = setTimeout(() => {
        setIsLocationOpen(true);
      }, 700);
      return () => clearTimeout(timer);
    }

    loadSupabaseData();
  }, [loadSupabaseData]);

  // SERVICES CRUD
  const addService = async (newService) => {
    const serviceObj = {
      id: "CLA" + Math.floor(100 + Math.random() * 900),
      ...newService,
      created_at: new Date().toISOString(),
    };

    setServices((prev) => {
      const updated = [serviceObj, ...prev];
      saveToLocal("decor_services", updated);
      return updated;
    });

    try {
      await supabase.from("services").insert([serviceObj]);
    } catch (e) {
      console.error("Supabase insert error:", e);
    }
  };

  const updateService = async (id, updatedService) => {
    setServices((prev) => {
      const updated = prev.map((item) => (item.id === id ? { ...item, ...updatedService } : item));
      saveToLocal("decor_services", updated);
      return updated;
    });

    try {
      await supabase.from("services").update(updatedService).eq("id", id);
    } catch (e) {
      console.error("Supabase update error:", e);
    }
  };

  const deleteService = async (id) => {
    setServices((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      saveToLocal("decor_services", updated);
      return updated;
    });

    try {
      await supabase.from("services").delete().eq("id", id);
    } catch (e) {
      console.error("Supabase delete error:", e);
    }
  };

  // GALLERY CRUD
  const addGalleryItem = async (newItem) => {
    const galleryObj = {
      id: Date.now(),
      ...newItem,
      created_at: new Date().toISOString(),
    };

    setGalleryItems((prev) => {
      const updated = [galleryObj, ...prev];
      saveToLocal("decor_gallery_items", updated);
      return updated;
    });

    try {
      await supabase.from("gallery").insert([galleryObj]);
    } catch (e) {
      console.error("Supabase gallery insert error:", e);
    }
  };

  const updateGalleryItem = async (id, updatedItem) => {
    setGalleryItems((prev) => {
      const updated = prev.map((item) => (item.id === id ? { ...item, ...updatedItem } : item));
      saveToLocal("decor_gallery_items", updated);
      return updated;
    });

    try {
      await supabase.from("gallery").update(updatedItem).eq("id", id);
    } catch (e) {
      console.error("Supabase gallery update error:", e);
    }
  };

  const deleteGalleryItem = async (id) => {
    setGalleryItems((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      saveToLocal("decor_gallery_items", updated);
      return updated;
    });

    try {
      await supabase.from("gallery").delete().eq("id", id);
    } catch (e) {
      console.error("Supabase gallery delete error:", e);
    }
  };

  // HERO SLIDERS CRUD
  const addHeroSlider = async (newSlider) => {
    const sliderObj = {
      id: "SLD" + Math.floor(100 + Math.random() * 900),
      ...newSlider,
      created_at: new Date().toISOString(),
    };

    setHeroSliders((prev) => {
      const updated = [sliderObj, ...prev];
      saveToLocal("decor_hero_sliders", updated);
      return updated;
    });

    try {
      await supabase.from("sliders").insert([sliderObj]);
    } catch (e) {
      console.error("Supabase slider insert error:", e);
    }
  };

  const updateHeroSlider = async (id, updatedSlider) => {
    setHeroSliders((prev) => {
      const updated = prev.map((item) => (item.id === id ? { ...item, ...updatedSlider } : item));
      saveToLocal("decor_hero_sliders", updated);
      return updated;
    });

    try {
      await supabase.from("sliders").update(updatedSlider).eq("id", id);
    } catch (e) {
      console.error("Supabase slider update error:", e);
    }
  };

  const deleteHeroSlider = async (id) => {
    setHeroSliders((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      saveToLocal("decor_hero_sliders", updated);
      return updated;
    });

    try {
      await supabase.from("sliders").delete().eq("id", id);
    } catch (e) {
      console.error("Supabase slider delete error:", e);
    }
  };

  // CATEGORY POSTERS CRUD
  const addCategoryPoster = async (newPoster) => {
    const posterObj = {
      id: "CAT" + Math.floor(100 + Math.random() * 900),
      span: "col-span-1",
      aspect: "1/1",
      ...newPoster,
      created_at: new Date().toISOString(),
    };

    setCategoryPosters((prev) => {
      const updated = [...prev, posterObj];
      saveToLocal("decor_category_posters", updated);
      return updated;
    });

    try {
      await supabase.from("category_posters").insert([posterObj]);
    } catch (e) {
      console.error("Supabase category poster insert error:", e);
    }
  };

  const updateCategoryPoster = async (id, updatedPoster) => {
    setCategoryPosters((prev) => {
      const updated = prev.map((item) => (item.id === id ? { ...item, ...updatedPoster } : item));
      saveToLocal("decor_category_posters", updated);
      return updated;
    });

    try {
      await supabase.from("category_posters").update(updatedPoster).eq("id", id);
    } catch (e) {
      console.error("Supabase category poster update error:", e);
    }
  };

  const deleteCategoryPoster = async (id) => {
    setCategoryPosters((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      saveToLocal("decor_category_posters", updated);
      return updated;
    });

    try {
      await supabase.from("category_posters").delete().eq("id", id);
    } catch (e) {
      console.error("Supabase category poster delete error:", e);
    }
  };

  // Subcategories CRUD
  const addSubCategory = (newSubCat) => {
    if (!newSubCat || !newSubCat.trim()) return;
    const trimmed = newSubCat.trim();
    setSubCategories((prev) => {
      if (prev.includes(trimmed)) return prev;
      const updated = [...prev, trimmed];
      saveToLocal("decor_subcategories", updated);
      return updated;
    });
  };

  const deleteSubCategory = (subCatToDelete) => {
    setSubCategories((prev) => {
      const updated = prev.filter((item) => item !== subCatToDelete);
      saveToLocal("decor_subcategories", updated);
      return updated;
    });
  };

  // Location Handlers
  const selectLocation = (loc) => {
    setLocation(loc);
    localStorage.setItem("decor_user_location", JSON.stringify(loc));
    setIsLocationOpen(false);
  };

  // Cart Handlers
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateCartQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <AppContext.Provider
      value={{
        location,
        selectLocation,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        cart,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        isLocationOpen,
        setIsLocationOpen,
        isCartOpen,
        setIsCartOpen,
        isBookingOpen,
        setIsBookingOpen,
        bookingItem,
        openBookingModal,
        closeBookingModal,
        services,
        addService,
        updateService,
        deleteService,
        galleryItems,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        heroSliders,
        addHeroSlider,
        updateHeroSlider,
        deleteHeroSlider,
        subCategories,
        addSubCategory,
        deleteSubCategory,
        categoryPosters,
        addCategoryPoster,
        updateCategoryPoster,
        deleteCategoryPoster,
        reloadFromSupabase: loadSupabaseData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
