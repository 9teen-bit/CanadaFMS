'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,

} from 'recharts';;

// Revenue trend data over months
const revenueTrend = [
  { month: 'Jan', revenue: 125000, projects: 8 },
  { month: 'Feb', revenue: 142000, projects: 9 },
  { month: 'Mar', revenue: 168000, projects: 10 },
  { month: 'Apr', revenue: 195000, projects: 11 },
  { month: 'May', revenue: 217000, projects: 12 },
  { month: 'Jun', revenue: 245000, projects: 12 },
  { month: 'Jul', revenue: 278000, projects: 13 },
  { month: 'Aug', revenue: 312000, projects: 14 },
  { month: 'Sep', revenue: 298000, projects: 13 },
  { month: 'Oct', revenue: 325000, projects: 14 },
  { month: 'Nov', revenue: 347000, projects: 12 },
  { month: 'Dec', revenue: 358000, projects: 11 },
];

export function ChartsSection() {
  return (
    <div className="space-y-6">

      {/* Additional row for more detailed analytics */}
      <div className="grid grid-cols-1 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-text mb-4">Monthly Revenue & Projects Overview</h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={revenueTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis 
                yAxisId="left"
                stroke="#166534"
                tickFormatter={(value) => `$${value / 1000}K`}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                stroke="#6B7280"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  border: '1px solid #E5E7EB',
                }}
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                stroke="#166534"
                strokeWidth={3}
                name="Revenue ($)"
                dot={{ fill: '#166534', r: 4 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="projects"
                stroke="#52B788"
                strokeWidth={3}
                name="Active Projects"
                dot={{ fill: '#52B788', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}