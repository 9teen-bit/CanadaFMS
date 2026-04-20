'use client';

import { X, FileText } from 'lucide-react';
import { useState } from 'react';

interface NewFieldReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FieldReportFormData) => void;
}

export interface FieldReportFormData {
  block: string;
  worker: string;
  completed_hectares: string;
  rate_per_hectare: string;
  report_date: string;
  status: string;
  notes: string;
}

const initialForm: FieldReportFormData = {
  block: '',
  worker: '',
  completed_hectares: '',
  rate_per_hectare: '',
  report_date: '',
  status: 'Pending',
  notes: '',
};

export function NewFieldReportModal({ isOpen, onClose, onSubmit }: NewFieldReportModalProps) {
  const [form, setForm] = useState<FieldReportFormData>(initialForm);
  const [errors, setErrors] = useState<Partial<FieldReportFormData>>({});

  if (!isOpen) return null;

  const validate = () => {
    const e: Partial<FieldReportFormData> = {};
    if (!form.block.trim())              e.block              = 'Block is required';
    if (!form.worker.trim())             e.worker             = 'Worker name is required';
    if (!form.completed_hectares.trim()) e.completed_hectares = 'Completed hectares is required';
    if (!form.rate_per_hectare.trim())   e.rate_per_hectare   = 'Rate per hectare is required';
    if (!form.report_date)               e.report_date        = 'Report date is required';
    if (form.completed_hectares && isNaN(Number(form.completed_hectares))) {
      e.completed_hectares = 'Must be a valid number';
    }
    if (form.rate_per_hectare && isNaN(Number(form.rate_per_hectare))) {
      e.rate_per_hectare = 'Must be a valid number';
    }
    return e;
  };

  const totalAmount =
    form.completed_hectares && form.rate_per_hectare
      ? (Number(form.completed_hectares) * Number(form.rate_per_hectare)).toLocaleString()
      : '—';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FieldReportFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
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

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const field = (
    id: keyof FieldReportFormData,
    label: string,
    props: React.InputHTMLAttributes<HTMLInputElement>,
    required = true
  ) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}{required && <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>}
      </label>
      <input
        id={id}
        name={id}
        value={form[id]}
        onChange={handleChange}
        required={required}
        aria-describedby={errors[id] ? `${id}-error` : undefined}
        className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-forest-primary transition-colors ${
          errors[id] ? 'border-red-400 bg-red-50' : 'border-gray-border'
        }`}
        {...props}
      />
      {errors[id] && (
        <p id={`${id}-error`} className="text-xs text-red-500 mt-1" role="alert">
          {errors[id]}
        </p>
      )}
    </div>
  );

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={handleBackdrop}
    >
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-border shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-forest-light rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-forest-primary" aria-hidden="true" />
            </div>
            <div>
              <h2 id="modal-title" className="text-base font-semibold text-gray-text">
                New field report
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">Record daily field activity</p>
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

        {/* Form body */}
        <form onSubmit={handleSubmit} noValidate className="flex-1 overflow-y-auto">
          <div className="px-6 py-5 space-y-4">

            {/* Block */}
            {field('block', 'Block / section', {
              type: 'text',
              placeholder: 'e.g. Block A — North Section',
            })}

            {/* Worker */}
            {field('worker', 'Worker name', {
              type: 'text',
              placeholder: 'e.g. Jean Magambo',
            })}

            {/* Hectares + Rate — 2 col */}
            <div className="grid grid-cols-2 gap-4">
              {field('completed_hectares', 'Hectares completed', {
                type: 'number',
                min: '0',
                step: '0.01',
                placeholder: '0.00',
              })}
              {field('rate_per_hectare', 'Rate per hectare ($)', {
                type: 'number',
                min: '0',
                step: '0.01',
                placeholder: '0.00',
              })}
            </div>

            {/* Live total */}
            <div className="flex items-center justify-between bg-forest-light/20 rounded-xl px-4 py-3">
              <span className="text-sm text-gray-600">Calculated total</span>
              <span className="text-sm font-semibold text-forest-primary">
                {totalAmount !== '—' ? `$${totalAmount}` : '—'}
              </span>
            </div>

            {/* Date + Status — 2 col */}
            <div className="grid grid-cols-2 gap-4">
              {field('report_date', 'Report date', { type: 'date' })}

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  aria-label="Select report status"
                  className="w-full px-4 py-2.5 border border-gray-border rounded-xl text-sm focus:outline-none focus:border-forest-primary bg-white transition-colors"
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
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
                placeholder="Any additional details about this report…"
                className="w-full px-4 py-2.5 border border-gray-border rounded-xl text-sm focus:outline-none focus:border-forest-primary transition-colors resize-none"
              />
            </div>

          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-border flex items-center justify-between gap-3 shrink-0">
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
                Save report
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
}