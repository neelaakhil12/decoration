"use client";
import Hero from "@/components/Hero";
import FeaturedServices from "@/components/FeaturedServices";
import WhyChooseUs from "@/components/WhyChooseUs";
import GallerySection from "@/components/GallerySection";
import TestimonialSection from "@/components/TestimonialSection";
import BookingCTA from "@/components/BookingCTA";
import { useApp } from "@/components/AppContext";

export default function Home() {
  const { searchQuery, selectedCategory, setSelectedCategory, addToCart } = useApp();

  const handleSelectCategory = (catKey) => {
    setSelectedCategory(catKey);
    setTimeout(() => {
      document.getElementById("catalog-section")?.scrollIntoView({ 
        behavior: "smooth", 
        block: "start" 
      });
    }, 100);
  };

  return (
    <>
      <Hero onSelectCategory={handleSelectCategory} />
      <FeaturedServices
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onAddToCart={addToCart}
      />
      <WhyChooseUs />
      <GallerySection />
      <TestimonialSection />
      <BookingCTA />
    </>
  );
}
