'use client';

import { useState } from 'react';
import { Plus, Search, Building2, Phone, Mail, TrendingUp } from 'lucide-react';

const clientsData = [
  {
    id: 1,
    company_name: 'BC Timber Sales',
    contact_person: 'James Wilson',
    phone: '(604) 555-2000',
    email: 'james@bctimber.ca',
    total_revenue: 450000,
    active_projects: 3,
  },
  {
    id: 2,
    company_name: 'Canfor Corp',
    contact_person: 'Emily Brown',
    phone: '(604) 555-2001',
    email: 'emily@canfor.com',
    total_revenue: 380000,
    active_projects: 2,
  },
];

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-border rounded-xl text-sm focus:outline-none focus:border-forest-primary"
          />
        </div>
        <button className="bg-forest-primary text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-forest-dark transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Client
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {clientsData.map((client) => (
          <div key={client.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-3  rounded-xl">
                <Building2 className="w-6 h-6 text-forest-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-text">{client.company_name}</h3>
                <p className="text-sm text-gray-500">Contact: {client.contact_person}</p>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{client.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{client.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Revenue: ${(client.total_revenue / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{client.active_projects} active projects</span>
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