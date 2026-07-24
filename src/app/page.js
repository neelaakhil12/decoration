"use client";
import { useRouter } from "next/navigation";
import Hero from "@/components/Hero";
import FeaturedServices from "@/components/FeaturedServices";
import WhyChooseUs from "@/components/WhyChooseUs";
import GallerySection from "@/components/GallerySection";
import TestimonialSection from "@/components/TestimonialSection";
import BookingCTA from "@/components/BookingCTA";
import { useApp } from "@/components/AppContext";

export default function Home() {
  const router = useRouter();
  const { searchQuery, selectedCategory, setSelectedCategory, addToCart } = useApp();

  const handleSelectCategory = (catKey) => {
    let normalized = catKey;
    if (catKey === "Birthday") normalized = "Birthdays";
    if (catKey === "Romantic") normalized = "Anniversary";
    if (catKey === "Traditional") normalized = "House Warming";
    if (catKey === "Specialty") normalized = "Festive & Car";
    if (catKey === "Stage & Wedding") normalized = "Stages & Weddings";

    setSelectedCategory(normalized);

    // Redirect to the dedicated Gallery page (/gallery)
    router.push("/gallery");
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
