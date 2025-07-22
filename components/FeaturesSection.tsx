// components/FeaturesSection.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from 'next/link';

interface Feature {
  id: number;
  icon: JSX.Element;
  title: string;
  description: string;
  detailedDescription: string;
}

const FeaturesSection: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [expandedHeight, setExpandedHeight] = useState<number>(0);
  const detailsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const features: Feature[] = [
    {
      id: 1,
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-8 md:h-12 w-8 md:w-12 text-blue-600 group-hover:text-white transition-colors duration-300" 
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
      title: "Excel File Upload",
      description: "Seamlessly upload and process your Excel project files",
      detailedDescription: "Our drag-and-drop interface makes it simple to upload Excel files containing your project data. Support for .xlsx and .xls formats with automatic column detection for Project Name, Start Date, and End Date fields."
    },
    {
      id: 2,
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-8 md:h-12 w-8 md:w-12 text-blue-600 group-hover:text-white transition-colors duration-300" 
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
      title: "Smart Data Validation",
      description: "Comprehensive validation checks for data integrity",
      detailedDescription: "Advanced validation engine that checks for missing dates, validates date ranges, ensures start dates aren't in the future, and confirms end dates don't exceed 2-year project limits. Get instant feedback on all data quality issues."
    },
    {
      id: 3,
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-8 md:h-12 w-8 md:w-12 text-blue-600 group-hover:text-white transition-colors duration-300" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
      ),
      title: "Issue Reporting",
      description: "Clear, actionable reports highlighting data problems",
      detailedDescription: "Detailed validation reports that categorize issues by type, provide specific row references, and include descriptive error messages. Export reports in multiple formats for easy sharing with your team."
    },
    {
      id: 4,
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-8 md:h-12 w-8 md:w-12 text-blue-600 group-hover:text-white transition-colors duration-300" 
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
      title: "Analytics Dashboard",
      description: "Comprehensive insights and metrics visualization",
      detailedDescription: "Interactive dashboard showing total issues found, categorization by error type, data quality trends, and project timeline analysis. Filter and sort issues to focus on what matters most to your organization."
    }
  ];

  // Validation Rules Section
  const validationRules = [
    { rule: "Start Date ≤ End Date", description: "Ensures logical date sequences" },
    { rule: "No Empty Dates", description: "Identifies missing date fields" },
    { rule: "Start Date ≤ Today", description: "Prevents future start dates" },
    { rule: "Project Duration ≤ 2 Years", description: "Catches unrealistic timeframes" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    hover: {
      y: -10,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const detailVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { 
      height: "auto", 
      opacity: 1,
      transition: {
        height: {
          type: "spring",
          stiffness: 300,
          damping: 20
        },
        opacity: { duration: 0.3 }
      }
    }
  };

  useEffect(() => {
    if (activeFeature !== null && detailsRef.current) {
      const height = detailsRef.current.scrollHeight;
      setExpandedHeight(height + 40);
    } else {
      setExpandedHeight(0);
    }
  }, [activeFeature]);

  const toggleFeature = (id: number) => {
    if (activeFeature === id) {
      setActiveFeature(null);
    } else {
      setActiveFeature(id);
    }
  };

  return (
    <section 
      id="features" 
      ref={sectionRef}
      className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-gray-100 relative"
      style={{ paddingBottom: `calc(4rem + ${expandedHeight}px)` }}
    >
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Powerful Project Validation Features
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6 md:mb-8"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive validation platform provides all the tools you need to ensure your project data quality
            and eliminate common Excel tracking issues.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative mb-16"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              whileHover="hover"
              className="relative flex flex-col z-10"
            >
              <motion.div 
                className={`bg-white rounded-xl shadow-lg hover:shadow-xl p-6 md:p-8 h-full group cursor-pointer 
                  ${activeFeature === feature.id 
                    ? 'bg-blue-50 border-2 border-blue-600 rounded-b-none' 
                    : 'hover:bg-blue-600'} 
                  transition-all duration-300 ease-in-out`}
                onClick={() => toggleFeature(feature.id)}
              >
                <motion.div 
                  className="mb-4 md:mb-6 flex justify-center"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {React.cloneElement(feature.icon, {
                    className: `h-8 md:h-12 w-8 md:w-12 transition-colors duration-300 ${
                      activeFeature === feature.id 
                        ? 'text-blue-600' 
                        : 'text-blue-600 group-hover:text-white'
                    }`
                  })}
                </motion.div>
                <h3 className={`text-xl md:text-2xl font-bold mb-3 md:mb-4 text-center transition-colors duration-300 ${
                  activeFeature === feature.id 
                    ? 'text-gray-800' 
                    : 'text-gray-800 group-hover:text-white'
                }`}>
                  {feature.title}
                </h3>
                <p className={`transition-colors duration-300 text-center text-sm md:text-base ${
                  activeFeature === feature.id 
                    ? 'text-gray-600' 
                    : 'text-gray-600 group-hover:text-white/90'
                }`}>
                  {feature.description}
                </p>
                
                <motion.div
                  className="flex justify-center mt-4"
                  initial={{ opacity: 0.5 }}
                  whileHover={{ opacity: 1, scale: 1.1 }}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 md:h-6 md:w-6 transition-all duration-300 ${
                      activeFeature === feature.id 
                        ? 'transform rotate-180 text-blue-600' 
                        : 'text-gray-400 group-hover:text-white'
                    }`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </motion.div>
              
              {activeFeature === feature.id && (
                <motion.div
                  ref={detailsRef}
                  variants={detailVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="bg-white rounded-b-xl shadow-lg px-6 pt-0 pb-6 overflow-hidden absolute top-full left-0 right-0 z-20 w-full"
                >
                  <div className="pt-6 text-gray-700 text-sm md:text-base">
                    {feature.detailedDescription}
                  </div>
                  <div className="mt-4 flex justify-center">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full text-sm transition-all duration-300 hover:shadow-lg transform hover:scale-105">
                      Learn More
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {activeFeature !== null && (
          <div style={{ height: expandedHeight }} className="w-full"></div>
        )}

                {/* Validation Rules Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
            Data Validation Rules
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {validationRules.map((rule, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors duration-300"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 text-white" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm md:text-base">{rule.rule}</h4>
                  <p className="text-gray-600 text-xs md:text-sm">{rule.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.6, duration: 0.6 }}
  className="text-center"
>
  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
    Ready to validate your project data?
  </h3>

  <Link
    href="/dashboard"
    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 md:py-4 px-8 md:px-10 rounded-full transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 text-sm md:text-base inline-block"
  >
    Start Validation Tool
  </Link>
</motion.div>

      </div>
    </section>
  );
};

export default FeaturesSection;