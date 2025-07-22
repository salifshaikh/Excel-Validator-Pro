// components/dashboard/FileUploadSection.tsx
"use client";
import React, { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';

interface FileUploadSectionProps {
  onFileUpload: (file: File) => void;
  isLoading: boolean;
  uploadProgress: number;
  compact?: boolean;
}

const FileUploadSection: React.FC<FileUploadSectionProps> = ({
  onFileUpload,
  isLoading,
  uploadProgress,
  compact = false,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedFile(file);
      onFileUpload(file);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
    maxFiles: 1,
    disabled: isLoading,
  });

  if (compact && selectedFile && !isLoading) {
    return (
      <div className="bg-white rounded-xl p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Current File</h2>
        <div className="p-4 bg-green-50 rounded-lg mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-green-900">{selectedFile.name}</p>
              <p className="text-sm text-green-700">
                {(selectedFile.size / 1024).toFixed(2)} KB
              </p>
            </div>
            <svg
              className="w-8 h-8 text-green-600"
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
        </div>
        <button
          onClick={() => setSelectedFile(null)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors text-sm"
        >
          Upload New File
        </button>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl ${compact ? 'p-4' : 'shadow-sm p-6'}`}>
      <h2 className={`${compact ? 'text-lg' : 'text-xl'} font-bold text-gray-800 mb-4`}>
        {compact ? 'Upload New File' : 'Upload Excel File'}
      </h2>
      
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg text-center cursor-pointer transition-all
          ${compact ? 'p-4' : 'p-8'}
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: isDragActive ? 1.1 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <svg
            className={`${compact ? 'w-12 h-12' : 'w-16 h-16'} text-gray-400 mx-auto mb-4`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </motion.div>

        {isDragActive ? (
          <p className="text-blue-600 font-medium text-sm">Drop the file here...</p>
        ) : (
          <div>
            <p className={`text-gray-700 font-medium mb-1 ${compact ? 'text-sm' : ''}`}>
              Drag & drop your Excel file here
            </p>
            <p className={`text-gray-500 ${compact ? 'text-xs' : 'text-sm'}`}>
              or click to browse
            </p>
          </div>
        )}
      </div>

      {!compact && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-2">Required Format:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Project Name (Column A)</li>
            <li>• Start Date (Column B)</li>
            <li>• End Date (Column C)</li>
          </ul>
        </div>
      )}

      {/* Upload Progress */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Validating...</span>
              <span className="text-sm font-medium text-gray-800">{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-blue-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${uploadProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FileUploadSection;