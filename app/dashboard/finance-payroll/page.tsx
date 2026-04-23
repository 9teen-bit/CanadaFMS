'use client';

import { useState } from 'react';
import { Plus, Search, Download, TrendingUp, Users, DollarSign, BarChart2 } from 'lucide-react';
import { NewPayrollModal, type PayrollFormData } from '@/components/finance/NewPayrollModal';

const payrollData = [
  { id: 1, name: 'NEHEMIE KIMARARUNGU', contracts: 4, hectares: 94.39, total: 63460.85, start: '2024-05-26', end: '2024-10-26' },
  { id: 2, name: 'JEAN MAGAMBO', contracts: 3, hectares: 67.16, total: 53419.24, start: '2024-05-26', end: '2024-11-09' },
  { id: 3, name: 'JEAN CLAUDE NTAWUMENYA', contracts: 4, hectares: 68.53, total: 46349.97, start: '2024-05-26', end: '2024-10-26' },
  { id: 4, name: 'JONAS PALUKU', contracts: 3, hectares: 63.47, total: 45321.54, start: '2024-05-26', end: '2024-09-13' },
  { id: 5, name: 'BAPTISTE TWAGIRAMUNGU', contracts: 2, hectares: 24.84, total: 27969.43, start: '2024-07-01', end: '2024-11-09' },
  { id: 6, name: 'SALEH GAHAMANYI', contracts: 3, hectares: 33.72, total: 24148.96, start: '2024-05-26', end: '2024-09-28' },
  { id: 7, name: 'ABDALLAH MASUDI', contracts: 2, hectares: 32.30, total: 23472.31, start: '2024-05-26', end: '2024-09-28' },
  { id: 8, name: 'OLIVIER MALIYABABA', contracts: 2, hectares: 32.68, total: 23963.98, start: '2024-05-26', end: '2024-09-28' },
  { id: 9, name: 'CHRISTOPHE NDACYAYIZEYE', contracts: 2, hectares: 25.13, total: 18668.39, start: '2024-05-26', end: '2024-09-28' },
  { id: 10, name: 'CADEAU NDARUSHINZE', contracts: 2, hectares: 24.11, total: 17777.12, start: '2024-05-26', end: '2024-08-31' },
  { id: 11, name: 'EPHREM KAYUMBA', contracts: 2, hectares: 23.57, total: 15451.82, start: '2024-05-26', end: '2024-08-17' },
  { id: 12, name: 'AMANI HABONIMANA', contracts: 1, hectares: 8.98, total: 7180.74, start: '2024-05-26', end: '2024-07-20' },
  { id: 13, name: 'BISHONGO CHIMWANGA', contracts: 1, hectares: 8.30, total: 9880.87, start: '2024-09-15', end: '2024-10-26' },
  { id: 14, name: 'JIMMY BYIRINGIRO', contracts: 1, hectares: 7.86, total: 5542.00, start: '2024-10-18', end: '2024-11-06' },
  { id: 15, name: 'MATHIAS NTAGISANIMANA', contracts: 1, hectares: 2.80, total: 2000.00, start: '2024-10-18', end: '2024-11-06' },
  { id: 16, name: 'CONSCIENCE IRAKOZE', contracts: 1, hectares: 1.95, total: 2934.60, start: '2024-10-18', end: '2024-11-06' },
  { id: 17, name: 'CELSE GABINEMA', contracts: 1, hectares: 1.25, total: 1601.60, start: '2024-10-30', end: '2024-11-09' },
  { id: 18, name: 'FRANCO NKUNDA', contracts: 1, hectares: 3.67, total: 2401.06, start: '2024-05-26', end: '2024-06-08' },
  { id: 19, name: 'JEAN SAFARI', contracts: 1, hectares: 1.98, total: 2301.00, start: '2024-05-26', end: '2024-07-06' },
  { id: 20, name: 'OLIVIER BYISHIMO', contracts: 3, hectares: 41.74, total: 30597.88, start: '2024-05-26', end: '2024-09-14' },
];

const totalPayroll = payrollData.reduce((s, r) => s + r.total, 0);
const totalHectares = payrollData.reduce((s, r) => s + r.hectares, 0);
const avgEarnings = totalPayroll / payrollData.length;
const topEarner = payrollData.reduce((a, b) => a.total > b.total ? a : b);

export default function FinancePayrollPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'total' | 'name' | 'hectares'>('total');
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = (data: PayrollFormData) => {
    console.log('New payroll entry:', data);
  };

  const filtered = payrollData
    .filter(r =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'total') return b.total - a.total;
      if (sortBy === 'hectares') return b.hectares - a.hectares;
      return a.name.localeCompare(b.name);
    });

  const maxTotal = Math.max(...payrollData.map(r => r.total));

  return (
    <div className="space-y-6">

      <NewPayrollModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />

      {/* ── KPI strip ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3" suppressHydrationWarning >
        {[
          {
            icon: DollarSign,
            iconColor: 'text-forest-primary',
            label: 'Total payroll',
            value: `$${(totalPayroll / 1000).toFixed(1)}K`,
            sub: 'Taxes included · 2024',
          },
          {
            icon: Users,
            iconColor: 'text-blue-500',
            label: 'Workers paid',
            value: payrollData.length.toString(),
            sub: 'May 26 – Nov 9, 2024',
          },
          {
            icon: TrendingUp,
            iconColor: 'text-amber-500',
            label: 'Average earnings',
            value: `$${Math.round(avgEarnings / 1000)}K`,
            sub: 'Per worker this season',
          },
          {
            icon: BarChart2,
            iconColor: 'text-forest-primary',
            label: 'Total hectares',
            value: `${totalHectares.toFixed(1)} ha`,
            sub: `Across ${payrollData.length} workers`,
          },
        ].map((card, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center`}>
                <card.icon className={`w-4 h-4 ${card.iconColor}`} aria-hidden="true" />
              </div>
            </div>
            <p className="text-2xl font-medium text-gray-800 leading-none tracking-tight" suppressHydrationWarning >
              {card.value}
            </p>
            <p className="text-xs text-gray-600 mt-1.5">{card.label}</p>
            <p className="text-[10px] text-gray-500 mt-0.5 italic">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* ── Top earner highlight ── */}
      <div className="bg-[#0a2e1e] rounded-2xl px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 justify-between">
        <div>
          <p className="text-[10px] text-[#5DCAA5] uppercase tracking-widest mb-1">
            Season top earner
          </p>
          <p className="text-white font-medium text-base capitalize">
            {topEarner.name.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}
          </p>
          <p className="text-[#9FE1CB] text-xs mt-0.5">
            {topEarner.contracts} contracts · {topEarner.hectares} ha worked
          </p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-medium text-white tracking-tight leading-none" suppressHydrationWarning >
            {`$${topEarner.total.toLocaleString('en-US')}`}
          </p>
          <p className="text-[#5DCAA5] text-xs mt-1">taxes included</p>
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2 items-center">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              aria-hidden="true"
            />
            <input
              type="text"
              placeholder="Search workers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search payroll records"
              className="pl-9 pr-4 py-2 border border-gray-border rounded-xl text-sm focus:outline-none focus:border-forest-primary w-52"
            />
          </div>

          {/* Sort pills */}
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => setSortBy('total')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium ${sortBy === 'total'
                  ? 'bg-forest-primary text-white'
                  : 'bg-white border border-gray-border'
                }`}
            >
              By earnings
            </button>
            <button
              type="button"
              onClick={() => setSortBy('hectares')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium ${sortBy === 'hectares'
                  ? 'bg-forest-primary text-white'
                  : 'bg-white border border-gray-border'
                }`}
            >
              By hectares
            </button>
            <button
              type="button"
              onClick={() => setSortBy('name')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium ${sortBy === 'name'
                  ? 'bg-forest-primary text-white'
                  : 'bg-white border border-gray-border'
                }`}
            >
              By name
            </button>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Export payroll as CSV"
            className="px-4 py-2 border border-gray-border rounded-xl text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 text-gray-500"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            Export
          </button>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            aria-label="Add new payroll entry"
            className="bg-forest-primary text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-forest-dark transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            Add Entry
          </button>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/60">
                <th className="text-left py-3 px-5 text-xs font-medium text-gray-600">#</th>
                <th className="text-left py-3 px-5 text-xs font-medium text-gray-500">Worker</th>
                <th className="text-left py-3 px-5 text-xs font-medium text-gray-500">Contracts</th>
                <th className="text-left py-3 px-5 text-xs font-medium text-gray-500">Hectares</th>
                <th className="text-left py-3 px-5 text-xs font-medium text-gray-500">Period</th>
                <th className="text-left py-3 px-5 text-xs font-medium text-gray-500">Earnings bar</th>
                <th className="text-right py-3 px-5 text-xs font-medium text-gray-500">Total</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => {
                const pct = Math.round((row.total / maxTotal) * 100);
                const isTop = row.id === topEarner.id;
                return (
                  <tr
                    key={row.id}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors last:border-0"
                  >
                    <td className="py-3.5 px-5 text-xs text-gray-300">{i + 1}</td>
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-forest-light flex items-center justify-center text-forest-primary text-[10px] font-medium shrink-0">
                          {row.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                        </div>
                        <div>
                          <p className="text-xm font-medium text-gray-600 capitalize leading-tight">
                            {row.name.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}
                          </p>
                          {isTop && (
                            <span className="text-[12px] bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded-full font-medium">
                              top earner
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-5">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                        {row.contracts}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-xs text-gray-600 font-medium">
                      {row.hectares.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-5 text-xs text-gray-400">
                      {row.start} → {row.end}
                    </td>
                    <td className="py-3.5 px-5 min-w-[120px]">
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-forest-primary transition-all"
                          style={{ width: `${pct}%` }}
                          aria-label={`${pct}% of top earner`}
                        />
                      </div>
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <span className="text-sm font-medium text-gray-800">
                        {`$${row.total.toLocaleString('en-US')}`}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>

            {/* Totals footer */}
            <tfoot>
              <tr className="border-t-2 border-gray-100 bg-gray-50/80">
                <td className="py-3.5 px-5" />
                <td className="py-3.5 px-5 text-xs font-medium text-gray-600">
                  {filtered.length} workers
                </td>
                <td className="py-3.5 px-5" />
                <td className="py-3.5 px-5 text-xs font-medium text-gray-600">
                  {filtered.reduce((s, r) => s + r.hectares, 0).toFixed(2)} ha
                </td>
                <td className="py-3.5 px-5" />
                <td className="py-3.5 px-5" />
                <td className="py-3.5 px-5 text-right text-sm font-semibold text-forest-primary">
                  {`$${filtered.reduce((s, r) => s + r.total, 0).toLocaleString('en-US')}`}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

    </div>
  );
}