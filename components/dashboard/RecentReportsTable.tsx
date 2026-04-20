'use client';

import { FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const recentReports = [
  {
    id: 'FR-2024-001',
    block: 'Block A - North Section',
    worker: 'Mike Thompson',
    completedHectares: 45.5,
    date: '2024-01-15',
    status: 'completed' as const,
  },
  {
    id: 'FR-2024-002',
    block: 'Block C - East Ridge',
    worker: 'Sarah Johnson',
    completedHectares: 38.2,
    date: '2024-01-15',
    status: 'completed' as const,
  },
  {
    id: 'FR-2024-003',
    block: 'Block B - Valley',
    worker: 'David Chen',
    completedHectares: 22.8,
    date: '2024-01-14',
    status: 'in-progress' as const,
  },
  {
    id: 'FR-2024-004',
    block: 'Block D - West Hills',
    worker: 'Robert Miller',
    completedHectares: 0,
    date: '2024-01-16',
    status: 'pending' as const,
  },
];

const statusConfig = {
  completed: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', label: 'Completed' },
  'in-progress': { icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50', label: 'In Progress' },
  pending: { icon: AlertCircle, color: 'text-yellow-600', bg: 'bg-yellow-50', label: 'Pending' },
};

export function RecentReportsTable() {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-text">Recent Field Reports</h3>
        <button className="text-sm text-forest-primary hover:text-forest-dark font-medium">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-border">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Report ID</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Block</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Worker</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Hectares</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentReports.map((report) => {
              const StatusIcon = statusConfig[report.status].icon;
              return (
                <tr key={report.id} className="border-b border-gray-border hover:bg-gray-bg/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-text">{report.id}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-text">{report.block}</td>
                  <td className="py-3 px-4 text-sm text-gray-text">{report.worker}</td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-text">
                    {report.completedHectares > 0 ? `${report.completedHectares} ha` : '-'}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">{report.date}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig[report.status].bg} ${statusConfig[report.status].color}`}>
                      <StatusIcon className="w-3 h-3" />
                      {statusConfig[report.status].label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}