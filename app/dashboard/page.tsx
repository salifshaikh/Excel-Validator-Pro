// app/dashboard/page.tsx
"use client";
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import FileUploadSection from '@/components/dashboard/FileUploadSection';
import ValidationResultsSection from '@/components/dashboard/ValidationResultsSection';
import MetricsDashboard from '@/components/dashboard/MetricsDashboard';
import IssuesTable from '@/components/dashboard/IssuesTable';
import ErrorDisplay from '@/components/dashboard/ErrorDisplay';

interface ValidationResult {
  totalRows: number;
  validRows: number;
  issues: Issue[];
  processedAt: string;
  fileName: string;
}

interface Issue {
  row: number;
  projectName: string;
  issueType: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  startDate?: string;
  endDate?: string;
}

export default function DashboardPage() {
  const [validationResults, setValidationResults] = useState<ValidationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = useCallback(async (file: File) => {
    setIsLoading(true);
    setUploadProgress(0);
    setValidationResults(null);
    setError(null); // Clear any previous errors

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:8000/api/validate', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Validation failed');
      }

      const data = await response.json();
      setValidationResults(data);
      setUploadProgress(100);
    } catch (error) {
      console.error('Error validating file:', error);
      clearInterval(progressInterval);
      setUploadProgress(0);
      
      // Set error message
      setError(error instanceof Error ? error.message : 'Failed to validate file. Please ensure your Excel file contains the required columns: Project Name, Start Date, and End Date.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-xl">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 mb-2"
              >
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                  <svg
                    className="w-8 h-8 text-white"
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
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  Data Validation Dashboard
                </h1>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-blue-100 text-lg ml-14"
              >
                Upload and validate your Excel project files with intelligent error detection
              </motion.p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="/">
                <button className="group bg-white/20 hover:bg-white hover:text-blue-600 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 transition-transform group-hover:-translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Back to Home
                </button>
              </Link>
            </motion.div>
          </div>

          {validationResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="bg-green-400 w-3 h-3 rounded-full animate-pulse"></div>
                <span className="text-sm">
                  Last validated: <strong>{validationResults.fileName}</strong>
                </span>
              </div>
              <span className="text-sm text-blue-100">
                {new Date(validationResults.processedAt).toLocaleString()}
              </span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Error Display */}
        <AnimatePresence>
          {error && (
            <ErrorDisplay error={error} onDismiss={() => setError(null)} />
          )}
        </AnimatePresence>

        {!validationResults ? (
          // Initial upload state - centered
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <FileUploadSection 
              onFileUpload={handleFileUpload}
              isLoading={isLoading}
              uploadProgress={uploadProgress}
            />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 bg-white rounded-xl shadow-sm p-12 text-center"
            >
              <div className="max-w-md mx-auto">
                <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No Data Yet</h3>
                <p className="text-gray-600">Upload an Excel file to start validating your project data</p>
                
                {/* File Requirements Card */}
                <div className="mt-8 bg-blue-50 rounded-lg p-4 text-left">
                  <h4 className="font-semibold text-blue-900 mb-2">File Requirements</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Excel format (.xlsx or .xls)
                    </li>
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Must contain columns: Project Name, Start Date, End Date
                    </li>
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Column names are case-insensitive
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          // Results state - full width
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                <div className="lg:col-span-1">
                  <FileUploadSection 
                    onFileUpload={handleFileUpload}
                    isLoading={isLoading}
                    uploadProgress={uploadProgress}
                    compact={true}
                  />
                </div>
                <div className="lg:col-span-2">
                  <MetricsDashboard results={validationResults} />
                </div>
              </div>
            </div>

            <ValidationResultsSection results={validationResults} />
            <IssuesTable issues={validationResults.issues} />
          </motion.div>
        )}
      </div>
    </div>
  );
}