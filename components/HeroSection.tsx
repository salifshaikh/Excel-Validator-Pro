// components/HeroSection.tsx
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface CarouselItem {
  id: number;
  videoUrl: string;
  title: string;
  subtitle: string;
  ctaText?: string;
}

const carouselData: CarouselItem[] = [
  {
    id: 1,
    videoUrl: "https://videos.pexels.com/video-files/6962695/6962695-sd_640_360_25fps.mp4",
    title: "Excel Data Validation",
    subtitle: "Transform your Excel project data into clean, validated datasets with intelligent error detection.",
    ctaText: "Start Validating"
  },
  {
    id: 2,
    videoUrl: "https://videos.pexels.com/video-files/7821854/7821854-sd_640_360_30fps.mp4",
    title: "Smart Data Insights",
    subtitle: "Get comprehensive dashboards showing data quality metrics and validation results.",
    ctaText: "View Dashboard"
  },
  {
    id: 3,
    videoUrl: "https://videos.pexels.com/video-files/3209211/3209211-sd_640_360_25fps.mp4",
    title: "Seamless Integration",
    subtitle: "Upload Excel files and receive instant feedback on data quality issues and inconsistencies.",
    ctaText: "Try Now"
  }
];

const HeroSection: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [activeSlide]);

  const handleNext = () => {
    setDirection(1);
    setActiveSlide((prev) => (prev + 1) % carouselData.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveSlide((prev) => (prev - 1 + carouselData.length) % carouselData.length);
  };

  const goToSlide = (index: number) => {
    if (index !== activeSlide) {
      setDirection(index > activeSlide ? 1 : -1);
      setActiveSlide(index);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: custom * 0.2,
        duration: 0.6, 
        ease: "easeOut" 
      }
    })
  };

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden bg-black">
      {/* Video Background Container */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={activeSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.4 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                handleNext();
              } else if (swipe > swipeConfidenceThreshold) {
                handlePrev();
              }
            }}
            className="absolute inset-0 w-full h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/60 z-10" />
            <video
              src={carouselData[activeSlide].videoUrl}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                filter: 'blur(2px) brightness(0.7)'
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center text-white px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="backdrop-blur-sm bg-black/30 p-6 md:p-8 rounded-xl max-w-4xl w-full mx-auto"
          >
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white drop-shadow-lg"
              custom={0}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
            >
              {carouselData[activeSlide].title}
            </motion.h2>
            <motion.p 
              className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto text-white/90 drop-shadow-md mb-6"
              custom={1}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
            >
              {carouselData[activeSlide].subtitle}
            </motion.p>
            
            {/* Key Features */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto"
              custom={2}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-blue-300 text-sm font-medium">✓ Date Validation</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-green-300 text-sm font-medium">✓ Range Checking</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-red-300 text-sm font-medium">✓ Error Reports</div>
              </div>
            </motion.div>

            <motion.div 
              className="mt-8"
              custom={3}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
            >
              <Link href="/dashboard">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 hover:shadow-xl transform hover:scale-105">
                  {carouselData[activeSlide].ctaText || "Get Started"}
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Carousel Navigation Arrows */}
      <div className="absolute inset-y-0 left-0 z-30 flex items-center">
        <button
          onClick={handlePrev}
          className="bg-black/40 hover:bg-blue-600/80 text-white p-3 rounded-r-lg ml-2 hidden md:block transition-all duration-300"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <div className="absolute inset-y-0 right-0 z-30 flex items-center">
        <button
          onClick={handleNext}
          className="bg-black/40 hover:bg-blue-600/80 text-white p-3 rounded-l-lg mr-2 hidden md:block transition-all duration-300"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      {/* Carousel Navigation Dots */}
      <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center space-x-3">
        {carouselData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === activeSlide 
                ? "bg-blue-600 w-8" 
                : "bg-white/50 w-3 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;