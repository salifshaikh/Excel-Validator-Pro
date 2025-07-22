// components/dashboard/ValidationResultsSection.tsx
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

interface ValidationResultsSectionProps {
  results: {
    issues: Array<{
      issueType: string;
      severity: string;
    }>;
  };
}

const ValidationResultsSection: React.FC<ValidationResultsSectionProps> = ({ results }) => {
  // Group issues by type
  const issuesByType = results.issues.reduce((acc, issue) => {
    acc[issue.issueType] = (acc[issue.issueType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Group issues by severity
  const issuesBySeverity = results.issues.reduce((acc, issue) => {
    acc[issue.severity] = (acc[issue.severity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = {
    labels: Object.keys(issuesByType),
    datasets: [
      {
        data: Object.values(issuesByType),
        backgroundColor: [
          '#3B82F6',
          '#EF4444',
          '#F59E0B',
          '#10B981',
          '#8B5CF6',
        ],
        borderWidth: 0,
      },
    ],
  };

  const barData = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [
      {
        label: 'Issues by Severity',
        data: [
          issuesBySeverity.high || 0,
          issuesBySeverity.medium || 0,
          issuesBySeverity.low || 0,
        ],
        backgroundColor: ['#EF4444', '#F59E0B', '#10B981'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <h3 className="text-lg font-bold text-gray-800 mb-4">Issues by Type</h3>
        <div className="h-64">
          <Pie data={pieData} options={chartOptions} />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <h3 className="text-lg font-bold text-gray-800 mb-4">Issues by Severity</h3>
        <div className="h-64">
          <Bar data={barData} options={chartOptions} />
        </div>
      </motion.div>
    </div>
  );
};

export default ValidationResultsSection;