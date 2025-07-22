// components/dashboard/MetricsDashboard.tsx
"use client";
import React from 'react';
import { motion } from 'framer-motion';

interface MetricsDashboardProps {
  results: {
    totalRows: number;
    validRows: number;
    issues: any[];
  };
}

const MetricsDashboard: React.FC<MetricsDashboardProps> = ({ results }) => {
  const errorRate = ((results.issues.length / results.totalRows) * 100).toFixed(1);
  const successRate = ((results.validRows / results.totalRows) * 100).toFixed(1);

  const metrics = [
    {
      label: 'Total Projects',
      value: results.totalRows,
      icon: '📊',
      color: 'bg-blue-500',
    },
    {
      label: 'Valid Projects',
      value: results.validRows,
      icon: '✅',
      color: 'bg-green-500',
    },
    {
      label: 'Issues Found',
      value: results.issues.length,
      icon: '⚠️',
      color: 'bg-yellow-500',
    },
    {
      label: 'Success Rate',
      value: `${successRate}%`,
      icon: '📈',
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">{metric.icon}</span>
            <div className={`w-2 h-2 rounded-full ${metric.color}`} />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">{metric.value}</h3>
          <p className="text-sm text-gray-600 mt-1">{metric.label}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default MetricsDashboard;