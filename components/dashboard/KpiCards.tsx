import { Trees, CheckCircle, Clock, BarChart2, Users, DollarSign, Truck, Home, Award, Calendar } from 'lucide-react';

export function KpiCards() {
  return (
    <div className="space-y-8">

      {/* ── Hero Section - Season Overview ── */}
      <div className="bg-gradient-to-r from-[#0a2e1e] to-[#14532d] rounded-2xl px-6 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-lg">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-[#5DCAA5]" />
            <p className="text-xs font-medium text-[#5DCAA5] uppercase tracking-wider">
              Season 2024 · Gatineau, QC
            </p>
          </div>
          <p className="text-4xl font-bold text-white tracking-tight">
            $416,514
          </p>
          <p className="text-sm text-[#9FE1CB] mt-1">
            Total worker payroll (taxes included)
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { val: '1,539', lbl: 'Total Hectares', icon: Trees },
            { val: '8', lbl: 'Active Contracts', icon: Truck },
            { val: '20', lbl: 'Workers Deployed', icon: Users },
            { val: '167', lbl: 'Days Active', icon: Calendar },
          ].map((stat, i) => (
            <div key={i} className="text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
                <stat.icon className="w-4 h-4 text-[#5DCAA5]" />
                <p className="text-2xl font-bold text-white">{stat.val}</p>
              </div>
              <p className="text-xs text-[#9FE1CB]">{stat.lbl}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Field Operations Section ── */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Trees className="w-4 h-4 text-forest-primary" />
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            Field Operations
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Planned Area Card */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                <Trees className="w-5 h-5 text-forest-primary" />
              </div>
              <span className="text-xs font-medium  text-green-700 px-2 py-1 rounded-full">
                64 Blocks
              </span>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">141 <span className="text-lg font-normal text-gray-500">ha</span></p>
              <p className="text-sm text-gray-600 mt-1">Planned Area</p>
              <p className="text-xs text-gray-400 mt-2">From Rapport Terrain data</p>
            </div>
          </div>

          {/* Completed Blocks Card */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10  rounded-xl flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-xs font-medium  text-green-700 px-2 py-1 rounded-full">
                Completed
              </span>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">2 <span className="text-lg font-normal text-gray-500">/ 64 blocks</span></p>
              <p className="text-sm text-gray-600 mt-1">Blocks Completed</p>
              <p className="text-xs text-green-600 mt-2">↑ Block A confirmed</p>
            </div>
          </div>

          {/* Completion Rate Card */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10  rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <span className="text-xs font-medium  text-amber-700 px-2 py-1 rounded-full">
                In Progress
              </span>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">3.1<span className="text-lg font-normal text-gray-500">%</span></p>
              <p className="text-sm text-gray-600 mt-1">Season Completion Rate</p>
              <p className="text-xs text-gray-400 mt-2">Early season data</p>
            </div>
          </div>

          {/* Average Block Size Card */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10  rounded-xl flex items-center justify-center">
                <BarChart2 className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">0.84<span className="text-lg font-normal text-gray-500"> ha/day</span></p>
              <p className="text-sm text-gray-600 mt-1">Average Productivity</p>
              <p className="text-xs text-gray-400 mt-2">141 ha ÷ 167 days</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Contracts & Clients Section ── */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Truck className="w-4 h-4 text-forest-primary" />
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            Contracts & Clients
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Hectares by Contract Card */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-start justify-between mb-5">
              <div>
                <p className="text-base font-semibold text-gray-900">Hectares by Contract</p>
                <p className="text-sm text-gray-500 mt-1">Rexforet (7 contracts) · Hydro Québec (1 contract)</p>
              </div>
              <span className="text-sm font-semibold text-forest-primary px-3 py-1 rounded-full">
                1,539 ha total
              </span>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Hydro Québec Mec.', val: 313.6, max: 314, color: 'bg-forest-primary' },
                { label: 'Contract 074', val: 300.8, max: 314, color: 'bg-forest-primary' },
                { label: 'Contract 111', val: 205.3, max: 314, color: 'bg-forest-primary' },
                { label: 'Contract 004', val: 177.1, max: 314, color: 'bg-amber-400' },
                { label: 'Contract 325', val: 173.6, max: 314, color: 'bg-forest-primary' },
                { label: 'Contract 036', val: 141.0, max: 314, color: 'bg-forest-primary' },
                { label: 'Contract 330', val: 131.1, max: 314, color: 'bg-forest-primary' },
                { label: 'Contract 331', val: 96.5, max: 314, color: 'bg-amber-400' },
              ].map((row) => (
                <div key={row.label} className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 w-36 shrink-0">{row.label}</span>
                  <div className="flex-1">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${row.color}`}
                        style={{ width: `${(row.val / row.max) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-700 w-12 text-right shrink-0">
                    {row.val} ha
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Clients Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4">
              <Truck className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">2</p>
              <p className="text-sm text-gray-600 mt-1">Active Clients This Season</p>
            </div>
            <div className="space-y-2 mt-4">
              {[
                { name: 'Rexforet', contracts: '7 contracts', color: 'bg-forest-primary' },
                { name: 'Hydro Québec', contracts: '1 contract', color: 'bg-blue-500' },
              ].map((c) => (
                <div key={c.name} className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${c.color}`} />
                    <span className="text-sm font-medium text-gray-700">{c.name}</span>
                  </div>
                  <span className="text-xs text-gray-500">{c.contracts}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500">Operating regions: Maniwaki · Matagami</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Workforce & Payroll Section ── */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-4 h-4 text-forest-primary" />
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            Workforce & Payroll
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Workers Deployed Card */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10  rounded-xl flex items-center justify-center mb-3">
              <Users className="w-5 h-5 text-forest-primary" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">20</p>
              <p className="text-sm text-gray-600 mt-1">Workers Deployed</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs font-medium  text-forest-primary px-2 py-0.5 rounded-full">
                  Season 2024
                </span>
                <span className="text-xs text-gray-400">167 active days</span>
              </div>
              <p className="text-xs text-green-600 mt-2">↑ May 26 – Nov 9</p>
            </div>
          </div>

          {/* Top Earner Card */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10  rounded-xl flex items-center justify-center mb-3">
              <Award className="w-5 h-5 text-forest-primary" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">$63K</p>
              <p className="text-sm text-gray-600 mt-1">Top Earner</p>
              <p className="text-xs text-gray-500 mt-1">N. Kimararungu</p>
              <p className="text-xs text-green-600 mt-2">↑ 4 contracts completed</p>
            </div>
          </div>

          {/* Average Earnings Card */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3">
              <DollarSign className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">$20K</p>
              <p className="text-sm text-gray-600 mt-1">Average Earnings Per Worker</p>
              <p className="text-xs text-gray-400 mt-2">$416,514 ÷ 20 workers</p>
            </div>
          </div>

          {/* Subcontractors Card */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10  rounded-xl flex items-center justify-center mb-3">
              <Truck className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">18</p>
              <p className="text-sm text-gray-600 mt-1">Subcontractor Companies</p>
              <div className="mt-2">
                <span className="text-xs font-medium  text-blue-700 px-2 py-0.5 rounded-full">
                  Registered
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-2">NEQ · PGES certified</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Accommodation Section ── */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Home className="w-4 h-4 text-forest-primary" />
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            Worker Accommodation
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Housing Locations Card */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="w-10 h-10  rounded-xl flex items-center justify-center mb-3">
              <Home className="w-5 h-5 text-forest-primary" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">8</p>
              <p className="text-sm text-gray-600 mt-1">Housing Locations</p>
              <p className="text-xs text-gray-400 mt-2">Linked to 8 contracts</p>
            </div>
          </div>

          {/* Accommodation Types Card */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <p className="text-sm font-semibold text-gray-700 mb-3">Accommodation Types by Location</p>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Hôtel · Location #1', type: 'hotel' },
                { label: 'Maison · Location #2', type: 'house' },
                { label: 'Maison · Location #3', type: 'house' },
                { label: 'Maison · Location #4', type: 'house' },
                { label: 'Appartement · #5', type: 'apartment' },
                { label: 'Appartement · #6', type: 'apartment' },
                { label: 'Appartement · #7', type: 'apartment' },
                { label: 'Pourvoirie · #8', type: 'lodge' },
              ].map((location) => (
                <span
                  key={location.label}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium ${
                    location.type === 'apartment'
                      ? 'bg-amber-50 text-amber-700'
                      : location.type === 'hotel'
                      ? 'bg-purple-50 text-purple-700'
                      : location.type === 'lodge'
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-forest-light text-forest-primary'
                  }`}
                >
                  {location.label}
                </span>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <p className="text-xs text-gray-500">
                  <span className="font-medium">Season period:</span> April 30 – November 15
                </p>
                <p className="text-xs text-gray-500">
                  <span className="font-medium">Regions:</span> Maniwaki · Matagami
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}