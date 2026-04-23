'use client';

import { X, DollarSign } from 'lucide-react';
import { useState } from 'react';

interface NewPayrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PayrollFormData) => void;
}

export interface PayrollFormData {
  employee_name: string;
  contract: string;
  donneur_ouvrage: string;
  hectares: string;
  rate_per_hectare: string;
  start_date: string;
  end_date: string;
  notes: string;
}

const initialForm: PayrollFormData = {
  employee_name: '',
  contract: '',
  donneur_ouvrage: '',
  hectares: '',
  rate_per_hectare: '',
  start_date: '',
  end_date: '',
  notes: '',
};

const contracts = [
  'HYDRO QUEBEC / C4512996207',
  'REXFORET MANIWAKI / 24-06-330',
  'REXFORET MATAGAMI / 24-07-331',
  'REXFORET MATAGAMI / 24-07-325',
  'REXFORET MATAGAMI / 24-08-036',
  'REXFORET MATAGAMI / 24-10-004',
  'REXFORET MANIWAKI / 24-10-074',
  'REXFORET MATAGAMI / 24-10-111',
];

export function NewPayrollModal({ isOpen, onClose, onSubmit }: NewPayrollModalProps) {
  const [form, setForm] = useState<PayrollFormData>(initialForm);
  const [errors, setErrors] = useState<Partial<PayrollFormData>>({});

  if (!isOpen) return null;

  const total =
    form.hectares && form.rate_per_hectare
      ? (Number(form.hectares) * Number(form.rate_per_hectare)).toLocaleString('en-CA', {
          style: 'currency', currency: 'CAD', maximumFractionDigits: 2,
        })
      : null;

  const validate = () => {
    const e: Partial<PayrollFormData> = {};
    if (!form.employee_name.trim()) e.employee_name   = 'Employee name is required';
    if (!form.contract)             e.contract        = 'Contract is required';
    if (!form.hectares.trim())      e.hectares        = 'Hectares is required';
    else if (isNaN(Number(form.hectares))) e.hectares = 'Must be a valid number';
    if (!form.rate_per_hectare.trim())    e.rate_per_hectare = 'Rate is required';
    else if (isNaN(Number(form.rate_per_hectare))) e.rate_per_hectare = 'Must be a valid number';
    if (!form.start_date) e.start_date = 'Start date is required';
    if (!form.end_date)   e.end_date   = 'End date is required';
    if (form.start_date && form.end_date && form.end_date <= form.start_date) {
      e.end_date = 'End date must be after start date';
    }
    return e;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof PayrollFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    onSubmit(form);
    setForm(initialForm);
    setErrors({});
    onClose();
  };

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const inputClass = (key: keyof PayrollFormData) =>
    `w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-forest-primary transition-colors ${
      errors[key] ? 'border-red-400 bg-red-50' : 'border-gray-border'
    }`;

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="payroll-modal-title"
      onClick={handleBackdrop}
    >
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-border shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-forest-light rounded-xl flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-forest-primary" aria-hidden="true" />
            </div>
            <div>
              <h2 id="payroll-modal-title" className="text-base font-semibold text-gray-text">
                Add payroll entry
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">Record worker earnings for a contract</p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close modal"
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="flex-1 overflow-y-auto">
          <div className="px-6 py-5 space-y-4">

            {/* Employee */}
            <div>
              <label htmlFor="employee_name" className="block text-sm font-medium text-gray-700 mb-1.5">
                Employee name <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                id="employee_name" name="employee_name" type="text"
                value={form.employee_name} onChange={handleChange}
                placeholder="e.g. Jean Magambo"
                aria-required="true"
                aria-describedby={errors.employee_name ? 'employee_name-error' : undefined}
                className={inputClass('employee_name')}
              />
              {errors.employee_name && (
                <p id="employee_name-error" className="text-xs text-red-500 mt-1" role="alert">
                  {errors.employee_name}
                </p>
              )}
            </div>

            {/* Contract */}
            <div>
              <label htmlFor="contract" className="block text-sm font-medium text-gray-700 mb-1.5">
                Contract <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <select
                id="contract" name="contract"
                value={form.contract} onChange={handleChange}
                aria-required="true"
                aria-describedby={errors.contract ? 'contract-error' : undefined}
                className={`${inputClass('contract')} bg-white`}
              >
                <option value="">Select contract</option>
                {contracts.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {errors.contract && (
                <p id="contract-error" className="text-xs text-red-500 mt-1" role="alert">
                  {errors.contract}
                </p>
              )}
            </div>

            {/* Donneur d'ouvrage */}
            <div>
              <label htmlFor="donneur_ouvrage" className="block text-sm font-medium text-gray-700 mb-1.5">
                Donneur d'ouvrage
              </label>
              <input
                id="donneur_ouvrage" name="donneur_ouvrage" type="text"
                value={form.donneur_ouvrage} onChange={handleChange}
                placeholder="e.g. Hydro Québec / Rexforet"
                className={inputClass('donneur_ouvrage')}
              />
            </div>

            {/* Hectares + Rate */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="hectares" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Hectares <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <input
                  id="hectares" name="hectares" type="number"
                  min="0" step="0.001"
                  value={form.hectares} onChange={handleChange}
                  placeholder="0.000"
                  aria-required="true"
                  aria-describedby={errors.hectares ? 'hectares-error' : undefined}
                  className={inputClass('hectares')}
                />
                {errors.hectares && (
                  <p id="hectares-error" className="text-xs text-red-500 mt-1" role="alert">
                    {errors.hectares}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="rate_per_hectare" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Rate / ha ($) <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <input
                  id="rate_per_hectare" name="rate_per_hectare" type="number"
                  min="0" step="0.01"
                  value={form.rate_per_hectare} onChange={handleChange}
                  placeholder="0.00"
                  aria-required="true"
                  aria-describedby={errors.rate_per_hectare ? 'rate-error' : undefined}
                  className={inputClass('rate_per_hectare')}
                />
                {errors.rate_per_hectare && (
                  <p id="rate-error" className="text-xs text-red-500 mt-1" role="alert">
                    {errors.rate_per_hectare}
                  </p>
                )}
              </div>
            </div>

            {/* Live total */}
            {total && (
              <div className="flex items-center justify-between bg-forest-light/20 border border-forest-light rounded-xl px-4 py-3">
                <span className="text-sm text-gray-600">Calculated total (taxes incl.)</span>
                <span className="text-sm font-semibold text-forest-primary">{total}</span>
              </div>
            )}

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="pay_start_date" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Start date <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <input
                  id="pay_start_date" name="start_date" type="date"
                  value={form.start_date} onChange={handleChange}
                  aria-required="true"
                  aria-describedby={errors.start_date ? 'start_date-error' : undefined}
                  className={inputClass('start_date')}
                />
                {errors.start_date && (
                  <p id="start_date-error" className="text-xs text-red-500 mt-1" role="alert">
                    {errors.start_date}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="pay_end_date" className="block text-sm font-medium text-gray-700 mb-1.5">
                  End date <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <input
                  id="pay_end_date" name="end_date" type="date"
                  value={form.end_date} onChange={handleChange}
                  aria-required="true"
                  aria-describedby={errors.end_date ? 'end_date-error' : undefined}
                  className={inputClass('end_date')}
                />
                {errors.end_date && (
                  <p id="end_date-error" className="text-xs text-red-500 mt-1" role="alert">
                    {errors.end_date}
                  </p>
                )}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="pay-notes" className="block text-sm font-medium text-gray-700 mb-1.5">
                Notes
              </label>
              <textarea
                id="pay-notes" name="notes" rows={2}
                value={form.notes} onChange={handleChange}
                placeholder="Any additional details…"
                className="w-full px-4 py-2.5 border border-gray-border rounded-xl text-sm focus:outline-none focus:border-forest-primary transition-colors resize-none"
              />
            </div>

          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-border flex items-center justify-between shrink-0">
            <p className="text-xs text-gray-400">
              <span className="text-red-500">*</span> Required fields
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 border border-gray-border rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-forest-primary text-white rounded-xl text-sm font-medium hover:bg-forest-dark transition-colors"
              >
                Save entry
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
}