// components/AboutSection.tsx
"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface FeatureItem {
  id: number;
  icon: JSX.Element;
  title: string;
  description: string;
}

const AboutSection: React.FC = () => {
  
  const features: FeatureItem[] = [
    {
      id: 1,
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6 text-blue-600" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
      ),
      title: "Accurate Validation",
      description: "Precise date and range validation"
    },
    {
      id: 2,
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6 text-blue-600" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M13 10V3L4 14h7v7l9-11h-7z" 
          />
        </svg>
      ),
      title: "Instant Processing",
      description: "Real-time validation results"
    },
    {
      id: 3,
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6 text-blue-600" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" 
          />
        </svg>
      ),
      title: "Detailed Reports",
      description: "Comprehensive error analytics"
    },
    {
      id: 4,
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6 text-blue-600" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
          />
        </svg>
      ),
      title: "Easy Upload",
      description: "Simple Excel file processing"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="about" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">About DataValidate Pro</h2>
          <motion.div 
            className="w-20 h-1 bg-blue-600 mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          ></motion.div>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
          <motion.div 
            className="lg:w-1/2 w-full"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-xl">
              <Image
                src="/images/datavalid.avif"
                alt="Excel Data Validation Dashboard"
                fill
                className="object-cover rounded-lg transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </motion.div>

          <motion.div 
            className="lg:w-1/2 w-full"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 border-l-4 border-blue-600 pl-4">
              Solving Excel Data Quality Problems
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed text-sm md:text-base">
              DataValidate Pro was created to address the common data quality issues that plague Excel-based 
              project management. Our intelligent validation system automatically detects inconsistencies in 
              project dates, identifies missing information, and flags unrealistic timeframes.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed text-sm md:text-base">
              Whether you're dealing with missing start dates, end dates before start dates, or projects 
              extending unreasonably far into the future, our platform provides clear insights and 
              actionable recommendations to clean up your data.
            </p>
            
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {features.map((feature) => (
                <motion.div 
                  key={feature.id} 
                  className="flex items-start group"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base md:text-lg font-medium text-gray-800">{feature.title}</h4>
                    <p className="text-gray-600 mt-1 text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats Section */}
            <motion.div 
              className="mt-8 grid grid-cols-3 gap-4 bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">99%</div>
                <div className="text-xs text-gray-600">Accuracy Rate</div>
              </div>
              <div className="text-center border-l border-gray-200">
                <div className="text-2xl font-bold text-green-600">&lt;1s</div>
                <div className="text-xs text-gray-600">Processing Time</div>
              </div>
              <div className="text-center border-l border-gray-200">
                <div className="text-2xl font-bold text-purple-600">10+</div>
                <div className="text-xs text-gray-600">Validation Rules</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;