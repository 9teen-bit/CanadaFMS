'use client';

import { useState } from 'react';
import { Plus, Search, Building2, Phone, Mail, DollarSign } from 'lucide-react';

const subcontractorsData = [
  {
    id: 1,
    company_name: 'GreenForest Ltd',
    manager_name: 'Robert Green',
    phone: '(604) 555-1000',
    email: 'contact@greenforest.com',
    contract_rate: 1250,
    status: 'Active',
    projects_completed: 8,
  },
  {
    id: 2,
    company_name: 'TimberPro Inc',
    manager_name: 'Sarah Miller',
    phone: '(604) 555-1001',
    email: 'info@timberpro.com',
    contract_rate: 1180,
    status: 'Active',
    projects_completed: 5,
  },
];

export default function SubcontractorsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search subcontractors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-border rounded-xl text-sm focus:outline-none focus:border-forest-primary"
          />
        </div>
        <button className="bg-forest-primary text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-forest-dark transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Subcontractor
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {subcontractorsData.map((sub) => (
          <div key={sub.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-forest-light rounded-xl">
                <Building2 className="w-6 h-6 text-forest-primary" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-text">{sub.company_name}</h3>
                    <p className="text-sm text-gray-500">Manager: {sub.manager_name}</p>
                  </div>
                  <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    {sub.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{sub.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{sub.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Rate: ${sub.contract_rate}/ha</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{sub.projects_completed} projects</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}