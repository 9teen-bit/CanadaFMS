'use client';

import { useState } from 'react';
import { Plus, Search, Phone, MapPin, Building2, Calendar, MoreVertical } from 'lucide-react';
import { NewAccommodationModal, type AccommodationFormData} from '@/components/acommodation/NewAcommodationModal';
const accommodationData = [
  {
    id: 1,
    name: 'Lodge Maniwaki',
    category: 'Hôtel',
    address: 'Maniwaki, QC',
    responsible: '',
    contact: '819-210-7704',
    contract: 'Contrat 24-06-330',
    lease_start: '2024-06-13',
    lease_end: '2024-09-26',
  },
  {
    id: 2,
    name: 'Résidence Matagami',
    category: 'Maison',
    address: 'Matagami, QC',
    responsible: '',
    contact: '819-740-5597',
    contract: 'Contrat 24-10-04, 074, 111',
    lease_start: '2024-06-19',
    lease_end: '2024-09-30',
  },
  {
    id: 3,
    name: 'Maison Terrain #3',
    category: 'Maison',
    address: 'Matagami, QC',
    responsible: '',
    contact: '819-352-3493',
    contract: 'Contrat 24-10-04, 074, 111',
    lease_start: '2024-06-19',
    lease_end: '2024-09-30',
  },
  {
    id: 4,
    name: 'Maison Terrain #4',
    category: 'Maison',
    address: 'Matagami, QC',
    responsible: '',
    contact: '819-739-2851',
    contract: 'Contrat 24-10-04, 074, 111',
    lease_start: '2024-06-19',
    lease_end: '2024-09-30',
  },
  {
    id: 5,
    name: 'Appartement Matagami',
    category: 'Appartement',
    address: 'Matagami, QC',
    responsible: '',
    contact: '819-762-0884',
    contract: 'Contrat 24-08-36',
    lease_start: '2024-08-01',
    lease_end: '2024-08-30',
  },
  {
    id: 6,
    name: 'Appartement Maniwaki',
    category: 'Appartement',
    address: 'Maniwaki, QC',
    responsible: '',
    contact: '819-441-5426',
    contract: 'Contrat 24-07-331',
    lease_start: '2024-07-01',
    lease_end: '2024-07-31',
  },
  {
    id: 7,
    name: 'Appartement Nord',
    category: 'Appartement',
    address: 'Maniwaki, QC',
    responsible: '',
    contact: '819-449-8312',
    contract: 'Contrat 24-07-325',
    lease_start: '2024-10-18',
    lease_end: '2024-11-15',
  },
  {
    id: 8,
    name: 'Pourvoirie Terrain',
    category: 'Pourvoirie',
    address: 'Matagami, QC',
    responsible: '',
    contact: '819-762-0884',
    contract: 'Contrat 23-08-39',
    lease_start: '2024-04-30',
    lease_end: '2024-05-03',
  },
];

const categoryColors: Record<string, string> = {
  'Hôtel':       'bg-blue-50 text-blue-700',
  'Maison':      'bg-forest-light text-forest-primary',
  'Appartement': 'bg-amber-50 text-amber-700',
  'Motel':       'bg-purple-50 text-purple-700',
  'Pourvoirie':  'bg-gray-100 text-gray-600',
};

const categoryCount = (data: typeof accommodationData) =>
  data.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);

export default function AccommodationPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);

  const counts = categoryCount(accommodationData);
  const categories = ['All', ...Object.keys(counts)];

  const filtered = accommodationData.filter(a => {
    const matchSearch =
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.contract.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = filterCategory === 'All' || a.category === filterCategory;
    return matchSearch && matchCategory;
  });

  const handleSubmit = (data: AccommodationFormData) => {
    console.log('New accommodation:', data);
  };

  return (
    <div className="space-y-6">

      <NewAccommodationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />

      {/* ── Summary strip ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total locations', value: accommodationData.length },
          { label: 'Maisons',         value: counts['Maison'] ?? 0 },
          { label: 'Appartements',    value: counts['Appartement'] ?? 0 },
          { label: 'Other types',     value: (counts['Hôtel'] ?? 0) + (counts['Pourvoirie'] ?? 0) + (counts['Motel'] ?? 0) },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-gray-100 rounded-2xl px-5 py-4">
            <p className="text-xm text-gray-400 mb-1">{s.label}</p>
            <p className="text-2xl font-medium text-gray-800 leading-none">{s.value}</p>
          </div>
        ))}
      </div>

      {/* ── Toolbar ── */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2 items-center">
          {/* Search */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              aria-hidden="true"
            />
            <input
              type="text"
              placeholder="Search locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search accommodation"
              className="pl-9 pr-4 py-2 border border-gray-border rounded-xl text-sm focus:outline-none focus:border-forest-primary w-52"
            />
          </div>

          {/* Category filter pills */}
          <div className="flex gap-1.5 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilterCategory(cat)}
                aria-pressed={filterCategory === cat}
                aria-label={`Filter by ${cat}`}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                  filterCategory === cat
                    ? 'bg-forest-primary text-white'
                    : 'bg-white border border-gray-border text-gray-500 hover:bg-gray-50'
                }`}
              >
                {cat}
                {cat !== 'All' && (
                  <span className="ml-1 opacity-70">{counts[cat]}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          aria-label="Add new accommodation"
          className="bg-forest-primary text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-forest-dark transition-colors flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" aria-hidden="true" />
          Add Location
        </button>
      </div>

      {/* ── Cards grid ── */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400 text-sm">
          No locations match your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-gray-200 transition-all hover:shadow-sm flex flex-col gap-4"
            >
              {/* Card header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl  flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5 text-forest-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-800 leading-tight">{item.name}</h3>
                    <span className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded-full mt-1 ${categoryColors[item.category] ?? 'bg-gray-100 text-gray-600'}`}>
                      {item.category}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label={`More options for ${item.name}`}
                  className="text-gray-300 hover:text-gray-500 transition-colors p-1"
                >
                  <MoreVertical className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>

              {/* Details */}
              <div className="space-y-2">
                {item.address && (
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <MapPin className="w-3.5 h-3.5 text-gray-300 shrink-0" aria-hidden="true" />
                    {item.address}
                  </div>
                )}
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Phone className="w-3.5 h-3.5 text-gray-300 shrink-0" aria-hidden="true" />
                  {item.contact}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="w-3.5 h-3.5 text-gray-300 shrink-0" aria-hidden="true" />
                  {item.lease_start} → {item.lease_end}
                </div>
              </div>

              {/* Contract tag */}
              <div className="pt-3 border-t border-gray-50">
                <p className="text-[10px] text-gray-400 mb-1">Contract</p>
                <p className="text-xs font-medium text-forest-primary truncate">{item.contract}</p>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}