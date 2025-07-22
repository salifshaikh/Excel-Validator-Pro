"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface NavItemProps {
  label: string;
  sectionId: string;
  isScrolled: boolean;
  onSectionClick: (id: string) => void;
}

const NavItem: React.FC<NavItemProps> = ({ label, sectionId, isScrolled, onSectionClick }) => {
  return (
    <motion.button
      onClick={() => onSectionClick(sectionId)}
      className={`font-medium transition-colors duration-300 relative group ${
        isScrolled ? "text-gray-700" : "text-white"
      } hover:text-blue-500`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {label}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
    </motion.button>
  );
};

const DataValidatorHeader: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle smooth scroll to sections
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      setMobileMenuOpen(false);
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { label: "Home", sectionId: "home" },
    { label: "About", sectionId: "about" },
    { label: "Features", sectionId: "features" },
    { label: "Contact", sectionId: "contact" },
  ];

  const headerVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, height: 0, overflow: "hidden" },
    open: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
  };

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "py-3 bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-100" 
          : "py-4 bg-transparent"
      }`}
      initial="initial"
      animate="animate"
      variants={headerVariants}
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        <Link href="/">
          <motion.div 
            className="flex items-center space-x-3 cursor-pointer group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Logo Icon */}
            <div className={`p-2 rounded-xl transition-all duration-300 ${
              scrolled 
                ? "bg-blue-100 group-hover:bg-blue-200" 
                : "bg-white/20 group-hover:bg-white/30 backdrop-blur-sm"
            }`}>
              <svg 
                className={`w-8 h-8 transition-colors duration-300 ${
                  scrolled ? "text-blue-600" : "text-white"
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </div>
            <div>
              <h1 className={`text-2xl font-bold transition-colors duration-300 ${
                scrolled ? "text-gray-800" : "text-white"
              }`}>
                DataValidator
              </h1>
              <p className={`text-xs font-medium transition-colors duration-300 ${
                scrolled ? "text-blue-600" : "text-blue-200"
              }`}>
                PRO
              </p>
            </div>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <NavItem
              key={item.sectionId}
              label={item.label}
              sectionId={item.sectionId}
              isScrolled={scrolled}
              onSectionClick={scrollToSection}
            />
          ))}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          
          <Link href="/dashboard">
            <motion.button 
              className="px-6 py-2 bg-gradient-to-r from-gray-500 to-blue-600 text-white text-sm font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              Dashboard
            </motion.button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <motion.button 
          className="lg:hidden p-2 rounded-lg"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            className={`w-6 h-6 transition-all duration-300 ${
              scrolled ? "stroke-gray-700" : "stroke-white"
            }`}
          >
            <motion.path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              animate={{ 
                rotate: mobileMenuOpen ? 45 : 0,
                scale: mobileMenuOpen ? 0.9 : 1
              }}
              transition={{ duration: 0.2 }}
            />
          </svg>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        className="lg:hidden bg-white/95 backdrop-blur-md shadow-xl border-t border-gray-100"
        variants={mobileMenuVariants}
        initial="closed"
        animate={mobileMenuOpen ? "open" : "closed"}
      >
        <nav className="flex flex-col py-4 px-4 space-y-1">
          {navItems.map((item, index) => (
            <motion.button
              key={item.sectionId}
              onClick={() => scrollToSection(item.sectionId)}
              className="flex items-center py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: mobileMenuOpen ? 1 : 0,
                x: mobileMenuOpen ? 0 : -20
              }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              {item.label}
            </motion.button>
          ))}
          
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="flex flex-col space-y-3">
              <motion.button 
                className="w-full py-3 px-4 border border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
              >
                Try Demo
              </motion.button>
              
              <Link href="/upload" className="w-full">
                <motion.button 
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-semibold shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Upload Excel
                </motion.button>
              </Link>
            </div>
          </div>
        </nav>
      </motion.div>
    </motion.header>
  );
};

export default DataValidatorHeader;