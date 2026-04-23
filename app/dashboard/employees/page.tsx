'use client';

import { useState } from 'react';
import { Plus, Search, Mail, Phone, User, MoreVertical } from 'lucide-react';
import { NewEmployeeModal, type EmployeeFormData } from '@/components/employees/NewEmployeeModal';

const employeesData = [
  {
    id: 1,
    first_name: 'John',
    last_name: 'Anderson',
    email: 'john.anderson@forestly.com',
    phone: '(604) 555-0123',
    position: 'Forestry Manager',
    status: 'Active',
  },
  {
    id: 2,
    first_name: 'Sarah',
    last_name: 'Johnson',
    email: 'sarah.johnson@forestly.com',
    phone: '(604) 555-0124',
    position: 'Field Supervisor',
    status: 'Active',
  },
  {
    id: 3,
    first_name: 'Mike',
    last_name: 'Thompson',
    email: 'mike.thompson@forestly.com',
    phone: '(604) 555-0125',
    position: 'Brush Cutter Operator',
    status: 'On Leave',
  },
];

export default function EmployeesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen]   = useState(false);

  const handleSubmit = (data: EmployeeFormData) => {
    console.log('New employee:', data);
    // API reserved place
  };

  const filteredEmployees = employeesData.filter(emp =>
    `${emp.first_name} ${emp.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">

      <NewEmployeeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />

      {/* Header */}
      <div className="flex justify-between items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search employees"
            className="w-full pl-9 pr-4 py-2 border border-gray-border rounded-xl text-sm focus:outline-none focus:border-forest-primary"
          />
        </div>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          aria-label="Add new employee"
          className="bg-forest-primary text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-forest-dark transition-colors flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" aria-hidden="true" />
          Add Employee
        </button>
      </div>

      {/* Grid — unchanged */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <div key={employee.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full  flex items-center justify-center">
                  <User className="w-6 h-6 text-forest-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-text">
                    {employee.first_name} {employee.last_name}
                  </h3>
                  <p className="text-xs text-gray-500">{employee.position}</p>
                </div>
              </div>
              <button
                type="button"
                aria-label={`More options for ${employee.first_name} ${employee.last_name}`}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <MoreVertical className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-gray-400 shrink-0" aria-hidden="true" />
                <span className="text-gray-600 truncate">{employee.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-gray-400 shrink-0" aria-hidden="true" />
                <span className="text-gray-600">{employee.phone}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-border">
              <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                employee.status === 'Active'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {employee.status}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}



