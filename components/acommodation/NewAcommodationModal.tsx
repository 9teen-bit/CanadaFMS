'use client';

import { X, Building2 } from 'lucide-react';
import { useState } from 'react';

interface NewAccommodationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AccommodationFormData) => void;
}

export interface AccommodationFormData {
  name: string;
  category: string;
  address: string;
  responsible: string;
  contact: string;
  contract: string;
  lease_start: string;
  lease_end: string;
  notes: string;
}

const initialForm: AccommodationFormData = {
  name: '',
  category: '',
  address: '',
  responsible: '',
  contact: '',
  contract: '',
  lease_start: '',
  lease_end: '',
  notes: '',
};

export function NewAccommodationModal({ isOpen, onClose, onSubmit }: NewAccommodationModalProps) {
  const [form, setForm] = useState<AccommodationFormData>(initialForm);
  const [errors, setErrors] = useState<Partial<AccommodationFormData>>({});

  if (!isOpen) return null;

  const validate = () => {
    const e: Partial<AccommodationFormData> = {};
    if (!form.name.trim())       e.name       = 'Name is required';
    if (!form.category)          e.category   = 'Category is required';
    if (!form.contact.trim())    e.contact    = 'Contact number is required';
    if (!form.contract.trim())   e.contract   = 'Contract reference is required';
    if (!form.lease_start)       e.lease_start = 'Start date is required';
    if (!form.lease_end)         e.lease_end  = 'End date is required';
    if (form.lease_start && form.lease_end && form.lease_end <= form.lease_start) {
      e.lease_end = 'End date must be after start date';
    }
    return e;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof AccommodationFormData]) {
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

  const inputClass = (key: keyof AccommodationFormData) =>
    `w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-forest-primary transition-colors ${
      errors[key] ? 'border-red-400 bg-red-50' : 'border-gray-border'
    }`;

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="accommodation-modal-title"
      onClick={handleBackdrop}
    >
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-border shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-forest-light rounded-xl flex items-center justify-center">
              <Building2 className="w-5 h-5 text-forest-primary" aria-hidden="true" />
            </div>
            <div>
              <h2 id="accommodation-modal-title" className="text-base font-semibold text-gray-text">
                Add accommodation
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">Register a new housing location</p>
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

            {/* Name + Category */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Name <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <input
                  id="name" name="name" type="text"
                  value={form.name} onChange={handleChange}
                  placeholder="e.g. Lodge Maniwaki"
                  aria-required="true"
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={inputClass('name')}
                />
                {errors.name && <p id="name-error" className="text-xs text-red-500 mt-1" role="alert">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Category <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <select
                  id="category" name="category"
                  value={form.category} onChange={handleChange}
                  aria-required="true"
                  aria-describedby={errors.category ? 'category-error' : undefined}
                  className={`${inputClass('category')} bg-white`}
                >
                  <option value="">Select type</option>
                  <option value="Hôtel">Hôtel</option>
                  <option value="Maison">Maison</option>
                  <option value="Appartement">Appartement</option>
                  <option value="Motel">Motel</option>
                  <option value="Pourvoirie">Pourvoirie</option>
                </select>
                {errors.category && <p id="category-error" className="text-xs text-red-500 mt-1" role="alert">{errors.category}</p>}
              </div>
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1.5">
                Address
              </label>
              <input
                id="address" name="address" type="text"
                value={form.address} onChange={handleChange}
                placeholder="e.g. 247 Rue de la Vaudaire, Gatineau QC"
                className={inputClass('address')}
              />
            </div>

            {/* Responsible + Contact */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="responsible" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Responsible
                </label>
                <input
                  id="responsible" name="responsible" type="text"
                  value={form.responsible} onChange={handleChange}
                  placeholder="Contact person"
                  className={inputClass('responsible')}
                />
              </div>
              <div>
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Phone <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <input
                  id="contact" name="contact" type="tel"
                  value={form.contact} onChange={handleChange}
                  placeholder="(819) 555-0100"
                  aria-required="true"
                  aria-describedby={errors.contact ? 'contact-error' : undefined}
                  className={inputClass('contact')}
                />
                {errors.contact && <p id="contact-error" className="text-xs text-red-500 mt-1" role="alert">{errors.contact}</p>}
              </div>
            </div>

            {/* Contract */}
            <div>
              <label htmlFor="contract" className="block text-sm font-medium text-gray-700 mb-1.5">
                Contract reference <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                id="contract" name="contract" type="text"
                value={form.contract} onChange={handleChange}
                placeholder="e.g. Contrat 24-06-330"
                aria-required="true"
                aria-describedby={errors.contract ? 'contract-error' : undefined}
                className={inputClass('contract')}
              />
              {errors.contract && <p id="contract-error" className="text-xs text-red-500 mt-1" role="alert">{errors.contract}</p>}
            </div>

            {/* Lease dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="lease_start" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Lease start <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <input
                  id="lease_start" name="lease_start" type="date"
                  value={form.lease_start} onChange={handleChange}
                  aria-required="true"
                  aria-describedby={errors.lease_start ? 'lease_start-error' : undefined}
                  className={inputClass('lease_start')}
                />
                {errors.lease_start && <p id="lease_start-error" className="text-xs text-red-500 mt-1" role="alert">{errors.lease_start}</p>}
              </div>
              <div>
                <label htmlFor="lease_end" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Lease end <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <input
                  id="lease_end" name="lease_end" type="date"
                  value={form.lease_end} onChange={handleChange}
                  aria-required="true"
                  aria-describedby={errors.lease_end ? 'lease_end-error' : undefined}
                  className={inputClass('lease_end')}
                />
                {errors.lease_end && <p id="lease_end-error" className="text-xs text-red-500 mt-1" role="alert">{errors.lease_end}</p>}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="acc-notes" className="block text-sm font-medium text-gray-700 mb-1.5">
                Notes
              </label>
              <textarea
                id="acc-notes" name="notes" rows={3}
                value={form.notes} onChange={handleChange}
                placeholder="Any additional details about this location…"
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
                Save location
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
}