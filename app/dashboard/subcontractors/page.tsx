'use client';

import { useState } from 'react';
import { Plus, Search, Building2, Phone, Mail, FileCheck, AlertCircle, MoreVertical } from 'lucide-react';
import { NewSubcontractorModal, type SubcontractorFormData } from '@/components/subcontractors/NewSubcontactorModal';

const subcontractorsData = [
  {
    id: 1,
    company_name: '9462-4699 Québec INC',
    responsible: 'PHOCOS',
    address: 'Gatineau, QC',
    phone: '819-592-1835',
    email: 'forethe.inc@gmail.com',
    neq: '9462469900',
    contract_signed: 'OUI',
    cnesst: 'OUI',
    tps_tvq: 'OUI',
    status: 'Active',
  },
  {
    id: 2,
    company_name: 'GR FORET INC',
    responsible: 'GUIDO',
    address: 'Gatineau, QC',
    phone: '819-440-2210',
    email: '',
    neq: '9445651400',
    contract_signed: 'OUI',
    cnesst: 'OUI',
    tps_tvq: 'OUI',
    status: 'Active',
  },
  {
    id: 3,
    company_name: 'NBB SERVICES FORET INC',
    responsible: 'BRUCE',
    address: 'Maniwaki, QC',
    phone: '819-441-0033',
    email: '',
    neq: '9438381700',
    contract_signed: 'OUI',
    cnesst: 'NON',
    tps_tvq: 'OUI',
    status: 'Active',
  },
  {
    id: 4,
    company_name: 'MUGABOINNOCENT2023 INC',
    responsible: 'INNOCENT',
    address: 'Matagami, QC',
    phone: '819-762-1100',
    email: '',
    neq: '9493031000',
    contract_signed: 'NON',
    cnesst: 'OUI',
    tps_tvq: 'NON',
    status: 'Pending',
  },
  {
    id: 5,
    company_name: 'MA. SERVICES FORET INC',
    responsible: 'ALOYS',
    address: 'Gatineau, QC',
    phone: '819-210-4455',
    email: '',
    neq: '9445651400',
    contract_signed: 'OUI',
    cnesst: 'OUI',
    tps_tvq: 'OUI',
    status: 'Active',
  },
  {
    id: 6,
    company_name: 'FEUILLUS INC',
    responsible: 'ALBERIC',
    address: 'Maniwaki, QC',
    phone: '819-441-8877',
    email: '',
    neq: '9395206700',
    contract_signed: 'OUI',
    cnesst: 'NON',
    tps_tvq: 'OUI',
    status: 'Active',
  },
];

const complianceScore = (sub: typeof subcontractorsData[0]) => {
  let score = 0;
  if (sub.contract_signed === 'OUI') score++;
  if (sub.cnesst === 'OUI') score++;
  if (sub.tps_tvq === 'OUI') score++;
  return score;
};

export default function SubcontractorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Active' | 'Pending'>('All');
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = (data: SubcontractorFormData) => {
    console.log('New subcontractor:', data);
  };

  const filtered = subcontractorsData.filter(s => {
    const matchSearch =
      s.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.responsible.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'All' || s.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const activeCount = subcontractorsData.filter(s => s.status === 'Active').length;
  const pendingCount = subcontractorsData.filter(s => s.status === 'Pending').length;
  const compliantCount = subcontractorsData.filter(s => complianceScore(s) === 3).length;

  return (
    <div className="space-y-6">

      <NewSubcontractorModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />

      {/* ── Summary strip ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total registered', value: subcontractorsData.length },
          { label: 'Active', value: activeCount },
          { label: 'Pending', value: pendingCount },
          { label: 'Fully compliant', value: compliantCount },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-gray-100 rounded-2xl px-5 py-4">
            <p className="text-xs text-gray-400 mb-1">{s.label}</p>
            <p className="text-2xl font-medium text-gray-800 leading-none">{s.value}</p>
          </div>
        ))}
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
              placeholder="Search subcontractors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search subcontractors"
              className="pl-9 pr-4 py-2 border border-gray-border rounded-xl text-sm focus:outline-none focus:border-forest-primary w-56"
            />
          </div>

          {(['All', 'Active', 'Pending'] as const).map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setFilterStatus(status)}
              aria-pressed={filterStatus === status ? "true" : "false"}
              aria-label={`Filter by ${status}`}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${filterStatus === status
                  ? 'bg-forest-primary text-white'
                  : 'bg-white border border-gray-border text-gray-500 hover:bg-gray-50'
                }`}
            >
              {status}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          aria-label="Add new subcontractor"
          className="bg-forest-primary text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-forest-dark transition-colors flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" aria-hidden="true" />
          Add Subcontractor
        </button>
      </div>

      {/* ── Cards grid ── */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400 text-sm">
          No subcontractors match your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map((sub) => {
            const score = complianceScore(sub);
            const isFullyCompliant = score === 3;
            return (
              <div
                key={sub.id}
                className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-gray-200 hover:shadow-sm transition-all flex flex-col gap-4"
              >
                {/* Card header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-forest-light flex items-center justify-center shrink-0">
                      <Building2 className="w-5 h-5 text-forest-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-800 leading-tight">
                        {sub.company_name}
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5" >
                        Resp. — {sub.responsible}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${sub.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                      }`}>
                      {sub.status}
                    </span>
                    <button
                      type="button"
                      aria-label={`More options for ${sub.company_name}`}
                      className="text-gray-300 hover:text-gray-500 transition-colors p-1"
                    >
                      <MoreVertical className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                {/* Contact row */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Phone className="w-3.5 h-3.5 text-gray-300 shrink-0" aria-hidden="true" />
                    {sub.phone}
                  </div>
                  {sub.email && (
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Mail className="w-3.5 h-3.5 text-gray-300 shrink-0" aria-hidden="true" />
                      <span className="truncate">{sub.email}</span>
                    </div>
                  )}
                </div>

                {/* NEQ */}
                <div className="bg-gray-50 rounded-xl px-3 py-2.5">
                  <p className="text-[10px] text-gray-400 mb-0.5">NEQ</p>
                  <p className="text-xs font-medium text-gray-700 font-mono" >{sub.neq}</p>
                </div>

                {/* Compliance badges */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex gap-2 flex-wrap">
                    {[
                      { label: 'Contrat', val: sub.contract_signed },
                      { label: 'CNESST', val: sub.cnesst },
                      { label: 'TPS/TVQ', val: sub.tps_tvq },
                    ].map((item) => (
                      <span
                        key={item.label}
                        className={`text-[10px] font-medium px-2 py-1 rounded-lg flex items-center gap-1 ${item.val === 'OUI'
                            ? 'bg-green-50 text-green-700'
                            : 'bg-red-50 text-red-500'
                          }`}
                      >
                        {item.val === 'OUI'
                          ? <FileCheck className="w-3 h-3" aria-hidden="true" />
                          : <AlertCircle className="w-3 h-3" aria-hidden="true" />
                        }
                        {item.label}
                      </span>
                    ))}
                  </div>

                  {/* Compliance score dot indicator */}
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3].map((n) => (
                      <span
                        key={n}
                        className={`w-2 h-2 rounded-full ${score >= n ? 'bg-forest-primary' : 'bg-gray-200'
                          }`}
                        aria-hidden="true"
                      />
                    ))}
                    <span className="text-[10px] text-gray-400 ml-1">
                      {isFullyCompliant ? 'Compliant' : `${score}/3`}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}