// pages/index.tsx
import React from "react";
import HomeHeader from "@/components/HomeHeader";
import HomeFooter from "@/components/HomeFooter";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FeaturesSection from "@/components/FeaturesSection";
import ContactSection from "@/components/ContactSection";
import { AnimatePresence } from "framer-motion";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HomeHeader />
      <AnimatePresence>
        <main>
          <HeroSection />
          <AboutSection />
          <FeaturesSection />
          <ContactSection />
        </main>
      </AnimatePresence>
      <HomeFooter />
    </div>
  );
};

export default Home;