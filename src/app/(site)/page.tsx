"use client";
import HeroSection from "@/components/site/HeroSection";
import Counter from "@/components/site/Counter";

export default function HomePage() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <HeroSection />   

      {/* Counter Section */}
      <Counter />
      
      {/* Additional sections from the old code can be added here */}
    </div>
  );
}
