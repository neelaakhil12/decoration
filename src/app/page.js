"use client";
import { useRouter } from "next/navigation";
import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";
import GallerySection from "@/components/GallerySection";
import RecentProjectsSection from "@/components/RecentProjectsSection";
import TestimonialSection from "@/components/TestimonialSection";
import BookingCTA from "@/components/BookingCTA";
import { useApp } from "@/components/AppContext";

export default function Home() {
  const router = useRouter();
  const { setSelectedCategory } = useApp();

  const handleSelectCategory = (catKey) => {
    setSelectedCategory(catKey);
    router.push("/gallery");
  };

  return (
    <>
      <Hero onSelectCategory={handleSelectCategory} />
      <WhyChooseUs />
      <GallerySection isHomePage={true} />
      <RecentProjectsSection />
      <TestimonialSection />
      <BookingCTA />
    </>
  );
}
