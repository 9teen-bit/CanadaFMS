'use client';

import { X, Trees } from 'lucide-react';
import { useState } from 'react';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProjectFormData) => void;
}

export interface ProjectFormData {
  block_name: string;
  client: string;
  planned_hectares: string;
  start_date: string;
  end_date: string;
  region: string;
  notes: string;
}

const initialForm: ProjectFormData = {
  block_name: '',
  client: '',
  planned_hectares: '',
  start_date: '',
  end_date: '',
  region: '',
  notes: '',
};

export function NewProjectModal({ isOpen, onClose, onSubmit }: NewProjectModalProps) {
  const [form, setForm] = useState<ProjectFormData>(initialForm);
  const [errors, setErrors] = useState<Partial<ProjectFormData>>({});

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Partial<ProjectFormData> = {};
    if (!form.block_name.trim())      newErrors.block_name      = 'Block name is required';
    if (!form.client.trim())          newErrors.client          = 'Client is required';
    if (!form.planned_hectares.trim()) newErrors.planned_hectares = 'Planned hectares is required';
    if (!form.start_date)             newErrors.start_date      = 'Start date is required';
    if (!form.end_date)               newErrors.end_date        = 'End date is required';
    if (form.start_date && form.end_date && form.end_date <= form.start_date) {
      newErrors.end_date = 'End date must be after start date';
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSubmit(form);
    setForm(initialForm);
    setErrors({});
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof ProjectFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-forest-light rounded-xl flex items-center justify-center">
              <Trees className="w-5 h-5 text-forest-primary" aria-hidden="true" />
            </div>
            <div>
              <h2 id="modal-title" className="text-base font-semibold text-gray-text">
                New project
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">Fill in the details below</p>
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

            {/* Block name */}
            <div>
              <label htmlFor="block_name" className="block text-sm font-medium text-gray-700 mb-1.5">
                Block name <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                id="block_name"
                name="block_name"
                type="text"
                value={form.block_name}
                onChange={handleChange}
                placeholder="e.g. Block A — North Section"
                aria-required="true"
                aria-describedby={errors.block_name ? 'block_name-error' : undefined}
                className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-forest-primary transition-colors ${
                  errors.block_name ? 'border-red-400 bg-red-50' : 'border-gray-border'
                }`}
              />
              {errors.block_name && (
                <p id="block_name-error" className="text-xs text-red-500 mt-1" role="alert">
                  {errors.block_name}
                </p>
              )}
            </div>

            {/* Client */}
            <div>
              <label htmlFor="client" className="block text-sm font-medium text-gray-700 mb-1.5">
                Client <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                id="client"
                name="client"
                type="text"
                value={form.client}
                onChange={handleChange}
                placeholder="e.g. Rexforet, Hydro Québec"
                aria-required="true"
                aria-describedby={errors.client ? 'client-error' : undefined}
                className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-forest-primary transition-colors ${
                  errors.client ? 'border-red-400 bg-red-50' : 'border-gray-border'
                }`}
              />
              {errors.client && (
                <p id="client-error" className="text-xs text-red-500 mt-1" role="alert">
                  {errors.client}
                </p>
              )}
            </div>

            {/* Hectares + Region — 2 col */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="planned_hectares" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Planned hectares <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <input
                  id="planned_hectares"
                  name="planned_hectares"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.planned_hectares}
                  onChange={handleChange}
                  placeholder="e.g. 141.0"
                  aria-required="true"
                  aria-describedby={errors.planned_hectares ? 'hectares-error' : undefined}
                  className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-forest-primary transition-colors ${
                    errors.planned_hectares ? 'border-red-400 bg-red-50' : 'border-gray-border'
                  }`}
                />
                {errors.planned_hectares && (
                  <p id="hectares-error" className="text-xs text-red-500 mt-1" role="alert">
                    {errors.planned_hectares}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Region
                </label>
                <select
                  id="region"
                  name="region"
                  value={form.region}
                  onChange={handleChange}
                  aria-label="Select region"
                  className="w-full px-4 py-2.5 border border-gray-border rounded-xl text-sm focus:outline-none focus:border-forest-primary transition-colors bg-white"
                >
                  <option value="">Select region</option>
                  <option value="Maniwaki">Maniwaki</option>
                  <option value="Matagami">Matagami</option>
                  <option value="Gatineau">Gatineau</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Dates — 2 col */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="start_date" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Start date <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <input
                  id="start_date"
                  name="start_date"
                  type="date"
                  value={form.start_date}
                  onChange={handleChange}
                  aria-required="true"
                  aria-describedby={errors.start_date ? 'start-error' : undefined}
                  className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-forest-primary transition-colors ${
                    errors.start_date ? 'border-red-400 bg-red-50' : 'border-gray-border'
                  }`}
                />
                {errors.start_date && (
                  <p id="start-error" className="text-xs text-red-500 mt-1" role="alert">
                    {errors.start_date}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="end_date" className="block text-sm font-medium text-gray-700 mb-1.5">
                  End date <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <input
                  id="end_date"
                  name="end_date"
                  type="date"
                  value={form.end_date}
                  onChange={handleChange}
                  aria-required="true"
                  aria-describedby={errors.end_date ? 'end-error' : undefined}
                  className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-forest-primary transition-colors ${
                    errors.end_date ? 'border-red-400 bg-red-50' : 'border-gray-border'
                  }`}
                />
                {errors.end_date && (
                  <p id="end-error" className="text-xs text-red-500 mt-1" role="alert">
                    {errors.end_date}
                  </p>
                )}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1.5">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                value={form.notes}
                onChange={handleChange}
                placeholder="Any additional details about this project…"
                className="w-full px-4 py-2.5 border border-gray-border rounded-xl text-sm focus:outline-none focus:border-forest-primary transition-colors resize-none"
              />
            </div>

          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-border flex items-center justify-between gap-3">
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
                Create project
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
}