// components/dashboard/IssuesTable.tsx
"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Issue {
  row: number;
  projectName: string;
  issueType: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  startDate?: string;
  endDate?: string;
}

interface IssuesTableProps {
  issues: Issue[];
}

const IssuesTable: React.FC<IssuesTableProps> = ({ issues }) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'row' | 'severity'>('row');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredIssues = issues
    .filter((issue) => {
      if (filter !== 'all' && issue.severity !== filter) return false;
      if (searchTerm && !issue.projectName.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'row') return a.row - b.row;
      const severityOrder = { high: 0, medium: 1, low: 2 };
      return severityOrder[a.severity] - severityOrder[b.severity];
    });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getIssueIcon = (issueType: string) => {
    switch (issueType) {
      case 'Invalid Date Range':
        return '📅';
      case 'Future Start Date':
        return '🔮';
      case 'Missing Date':
        return '❓';
      case 'Excessive Duration':
        return '⏰';
      default:
        return '⚠️';
    }
  };

  const exportToCSV = () => {
    const headers = ['Row', 'Project Name', 'Issue Type', 'Description', 'Severity', 'Start Date', 'End Date'];
    const csvContent = [
      headers.join(','),
      ...filteredIssues.map(issue => [
        issue.row,
        `"${issue.projectName}"`,
        `"${issue.issueType}"`,
        `"${issue.description}"`,
        issue.severity,
        issue.startDate || '',
        issue.endDate || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `validation_results_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-white rounded-xl shadow-sm overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800">Validation Issues</h3>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {/* Search */}
            <div className="relative flex-1 sm:flex-initial">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              />
              <svg
                className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Filter */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            >
              <option value="all">All Severities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'row' | 'severity')}
              className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            >
              <option value="row">Sort by Row</option>
              <option value="severity">Sort by Severity</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Container with horizontal scroll */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[768px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Row
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project Name
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Issue Type
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dates
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Severity
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <AnimatePresence>
              {filteredIssues.length > 0 ? (
                filteredIssues.map((issue, index) => (
                  <motion.tr
                    key={`${issue.row}-${index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {issue.row}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {issue.projectName}
                    </td>
                                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="flex items-center gap-2">
                        <span>{getIssueIcon(issue.issueType)}</span>
                        {issue.issueType}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-600">
                      <div className="max-w-xs lg:max-w-sm xl:max-w-md truncate" title={issue.description}>
                        {issue.description}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div className="text-xs">
                        {issue.startDate && <div>Start: {issue.startDate}</div>}
                        {issue.endDate && <div>End: {issue.endDate}</div>}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(
                          issue.severity
                        )}`}
                      >
                        {issue.severity.toUpperCase()}
                      </span>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 sm:px-6 py-8 text-center text-gray-500">
                    No issues found matching your criteria
                  </td>
                </tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Footer with Export Button */}
      <div className="p-4 sm:p-6 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600 text-center sm:text-left">
            Showing {filteredIssues.length} of {issues.length} issues
          </p>
          <button 
            onClick={exportToCSV}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Export Results
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default IssuesTable;