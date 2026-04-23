'use client';

import { useState } from 'react';
import { Search, Filter, FileText, Download, Eye, Plus } from 'lucide-react';
import {NewFieldReportModal, type FieldReportFormData} from '@/components/field-reports/NewFieldReportModal';

const reportsData = [
  {
    id: 'FR-2024-001',
    block: 'Block A - North Section',
    worker: 'Mike Thompson',
    completed_hectares: 45.5,
    rate_per_hectare: 1250,
    report_date: '2024-01-15',
    status: 'Approved',
  },
  {
    id: 'FR-2024-002',
    block: 'Block C - East Ridge',
    worker: 'Sarah Johnson',
    completed_hectares: 38.2,
    rate_per_hectare: 1180,
    report_date: '2024-01-15',
    status: 'Pending',
  },
  {
    id: 'FR-2024-003',
    block: 'Block B - Valley',
    worker: 'David Chen',
    completed_hectares: 22.8,
    rate_per_hectare: 1300,
    report_date: '2024-01-14',
    status: 'Approved',
  },
];

export default function FieldReportsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen]   = useState(false);

  const handleSubmit = (data: FieldReportFormData) => {
    console.log('New field report:', data);
    // wire to your API here
  };

  const filteredReports = reportsData.filter(report =>
    report.block.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.worker.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">

      <NewFieldReportModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />

      {/* Header Actions */}
      <div className="flex flex-wrap justify-between items-center gap-3">
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search field reports"
              className="pl-9 pr-4 py-2 border border-gray-border rounded-xl text-sm focus:outline-none focus:border-forest-primary"
            />
          </div>
          <button
            type="button"
            aria-label="Filter reports"
            className="px-4 py-2 border border-gray-border rounded-xl text-sm hover:bg-gray-bg transition-colors flex items-center gap-2"
          >
            <Filter className="w-4 h-4" aria-hidden="true" />
            Filter
          </button>
          <button
            type="button"
            aria-label="Export reports"
            className="px-4 py-2 border border-gray-border rounded-xl text-sm hover:bg-gray-bg transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            Export
          </button>
        </div>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          aria-label="Create new field report"
          className="bg-forest-primary text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-forest-dark transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" aria-hidden="true" />
          New Report
        </button>
      </div>

      {/* Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Report ID</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Block</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Worker</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Hectares</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Total</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report) => (
                <tr key={report.id} className="border-b border-gray-border hover:bg-gray-bg/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-400 shrink-0" aria-hidden="true" />
                      <span className="text-sm font-medium text-gray-text">{report.id}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-text">{report.block}</td>
                  <td className="py-3 px-4 text-sm text-gray-text">{report.worker}</td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-text">{report.completed_hectares} ha</td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-text" suppressHydrationWarning>
                    ${(report.completed_hectares * report.rate_per_hectare).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">{report.report_date}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2.5 py-1 rounded text-xs font-medium ${
                      report.status === 'Approved'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      type="button"
                      aria-label={`View report ${report.id}`}
                      className="text-forest-primary hover:text-forest-dark transition-colors"
                    >
                      <Eye className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}