'use client';

import { X, Building2 } from 'lucide-react';
import { useCallback, useState } from 'react';

interface NewSubcontractorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: SubcontractorFormData) => void;
}

export interface SubcontractorFormData {
    company_name: string;
    responsible: string;
    address: string;
    neq: string;
    pges_certificate: string;
    phone: string;
    email: string;
    contract_signed: string;
    cnesst: string;
    tps_tvq: string;
    notes: string;
}

const initialForm: SubcontractorFormData = {
    company_name: '',
    responsible: '',
    address: '',
    neq: '',
    pges_certificate: '',
    phone: '',
    email: '',
    contract_signed: '',
    cnesst: '',
    tps_tvq: '',
    notes: '',
};

const Field = ({
    id, label, required = true, children, error,
}: {
    id: string;
    label: string;
    required?: boolean;
    children: React.ReactNode;
    error?: string;
}) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1.5">
            {label}
            {required && <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>}
        </label>
        {children}
        {error && (
            <p id={`${id}-error`} className="text-xs text-red-500 mt-1" role="alert">
                {error}
            </p>
        )}
    </div>

);


export function NewSubcontractorModal({ isOpen, onClose, onSubmit }: NewSubcontractorModalProps) {

    const [form, setForm] = useState<SubcontractorFormData>(initialForm);
    const [errors, setErrors] = useState<Partial<SubcontractorFormData>>({});
    const [step, setStep] = useState<1 | 2>(1);

    const handleChange = useCallback((
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof SubcontractorFormData]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    }, [errors]);


    if (!isOpen) return null;

    const validateStep1 = () => {
        const e: Partial<SubcontractorFormData> = {};
        if (!form.company_name.trim()) e.company_name = 'Company name is required';
        if (!form.responsible.trim()) e.responsible = 'Responsible person is required';
        if (!form.phone.trim()) e.phone = 'Phone number is required';
        if (form.email && !/\S+@\S+\.\S+/.test(form.email)) {
            e.email = 'Enter a valid email address';
        }
        return e;
    };

    const validateStep2 = () => {
        const e: Partial<SubcontractorFormData> = {};
        if (!form.neq.trim()) e.neq = 'NEQ number is required';
        if (!form.cnesst) e.cnesst = 'CNESST status is required';
        if (!form.tps_tvq) e.tps_tvq = 'TPS/TVQ status is required';
        return e;
    };


    const handleNext = () => {
        const e = validateStep1();
        if (Object.keys(e).length > 0) { setErrors(e); return; }
        setErrors({});
        setStep(2);
    };

    const handleBack = () => {
        setErrors({});
        setStep(1);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = validateStep2();
        if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
        onSubmit(form);
        setForm(initialForm);
        setErrors({});
        setStep(1);
        onClose();
    };

    const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) { setStep(1); onClose(); }
    };

    const inputClass = (key: keyof SubcontractorFormData) =>
        `w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-forest-primary transition-colors ${errors[key] ? 'border-red-400 bg-red-50' : 'border-gray-border'
        }`;



    return (

        <div
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="subcontractor-modal-title"
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
                            <h2 id="subcontractor-modal-title" className="text-base font-semibold text-gray-text">
                                Add subcontractor
                            </h2>
                            <p className="text-xs text-gray-400 mt-0.5">
                                Step {step} of 2 — {step === 1 ? 'Company info' : 'Legal & compliance'}
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        aria-label="Close modal"
                        onClick={() => { setStep(1); onClose(); }}
                        className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-5 h-5" aria-hidden="true" />
                    </button>
                </div>

                {/* Step indicator */}
                <div className="px-6 pt-4 shrink-0">
                    <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-forest-primary" />
                        <div className={`flex-1 h-1.5 rounded-full transition-colors duration-300 ${step === 2 ? 'bg-forest-primary' : 'bg-gray-200'
                            }`} />
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} noValidate className="flex-1 overflow-y-auto">
                    <div className="px-6 py-5 space-y-4">

                        {step === 1 && (
                            <>
                                {/* Company + Responsible */}
                                <Field id="company_name" label="Company name" error={errors.company_name}>
                                    <input

                                        id="company_name" name="company_name" type="text"
                                        value={form.company_name} onChange={handleChange}
                                        placeholder="e.g. 9462-4699 Québec INC / PHOCOS"
                                        aria-required="true"
                                        aria-describedby={errors.company_name ? 'company_name-error' : undefined}
                                        className={inputClass('company_name')}
                                    />
                                </Field>

                                <Field id="responsible" label="Responsible person" error={errors.responsible}>
                                    <input
                                        id="responsible" name="responsible" type="text"
                                        value={form.responsible} onChange={handleChange}
                                        placeholder="Full name of the responsible"
                                        aria-required="true"
                                        aria-describedby={errors.responsible ? 'responsible-error' : undefined}
                                        className={inputClass('responsible')}
                                    />
                                </Field>

                                <Field id="sub-address" label="Address" required={false}>
                                    <input
                                        id="sub-address" name="address" type="text"
                                        value={form.address} onChange={handleChange}
                                        placeholder="e.g. 247 Rue de la Vaudaire, Gatineau QC"
                                        className={inputClass('address')}
                                    />
                                </Field>

                                {/* Phone + Email */}
                                <div className="grid grid-cols-2 gap-4">
                                    <Field id="sub-phone" label="Phone" error={errors.phone}>
                                        <input
                                            id="sub-phone" name="phone" type="tel"
                                            value={form.phone} onChange={handleChange}
                                            placeholder="(819) 555-0100"
                                            aria-required="true"
                                            aria-describedby={errors.phone ? 'sub-phone-error' : undefined}
                                            className={inputClass('phone')}
                                        />
                                    </Field>
                                    <Field id="sub-email" label="Email" required={false} error={errors.email}>
                                        <input
                                            id="sub-email" name="email" type="email"
                                            value={form.email} onChange={handleChange}
                                            placeholder="contact@company.com"
                                            aria-describedby={errors.email ? 'sub-email-error' : undefined}
                                            className={inputClass('email')}
                                        />
                                    </Field>
                                </div>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                {/* NEQ */}
                                <Field id="neq" label="NEQ — Numéro d'entreprise du Québec" error={errors.neq}>
                                    <input
                                        id="neq" name="neq" type="text"
                                        value={form.neq} onChange={handleChange}
                                        placeholder="10-digit NEQ number"
                                        maxLength={10}
                                        aria-required="true"
                                        aria-describedby={errors.neq ? 'neq-error' : undefined}
                                        className={inputClass('neq')}
                                    />
                                </Field>

                                {/* PGES Certificate */}
                                <Field id="pges_certificate" label="PGES certificate number" required={false}>
                                    <input
                                        id="pges_certificate" name="pges_certificate" type="text"
                                        value={form.pges_certificate} onChange={handleChange}
                                        placeholder="Certificate number"
                                        className={inputClass('pges_certificate')}
                                    />
                                </Field>

                                {/* Contract signed */}
                                <Field id="contract_signed" label="Contract signed (2025)" required={false}>
                                    <select
                                        id="contract_signed" name="contract_signed"
                                        value={form.contract_signed} onChange={handleChange}
                                        aria-label='Contract signed'
                                        className={`${inputClass('contract_signed')} bg-white`}
                                    >
                                        <option value="">Select status</option>
                                        <option value="OUI">OUI — Signed</option>
                                        <option value="NON">NON — Not signed</option>
                                    </select>
                                </Field>

                                {/* CNESST + TPS/TVQ */}
                                <div className="grid grid-cols-2 gap-4">
                                    <Field id="cnesst" label="CNESST 2025" error={errors.cnesst}>
                                        <select
                                            id="cnesst" name="cnesst"
                                            value={form.cnesst} onChange={handleChange}
                                            aria-label='CNESST 2025'
                                            aria-required="true"
                                            aria-describedby={errors.cnesst ? 'cnesst-error' : undefined}
                                            className={`${inputClass('cnesst')} bg-white`}
                                        >
                                            <option value="">Select</option>
                                            <option value="OUI">OUI — Valid</option>
                                            <option value="NON">NON — Missing</option>
                                        </select>
                                    </Field>

                                    <Field id="tps_tvq" label="TPS / TVQ" error={errors.tps_tvq}>
                                        <select
                                            id="tps_tvq" name="tps_tvq"
                                            value={form.tps_tvq} onChange={handleChange}
                                            aria-label='TPS /TVQ'
                                            aria-required="true"
                                            aria-describedby={errors.tps_tvq ? 'tps_tvq-error' : undefined}
                                            className={`${inputClass('tps_tvq')} bg-white`}
                                        >
                                            <option value="">Select</option>
                                            <option value="OUI">OUI — Registered</option>
                                            <option value="NON">NON — Not registered</option>
                                        </select>
                                    </Field>
                                </div>

                                {/* Compliance summary */}
                                {(form.cnesst || form.tps_tvq || form.contract_signed) && (
                                    <div className="bg-gray-50 rounded-xl px-4 py-3 space-y-2">
                                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                            Compliance summary
                                        </p>
                                        {[
                                            { label: 'Contract signed', val: form.contract_signed },
                                            { label: 'CNESST', val: form.cnesst },
                                            { label: 'TPS / TVQ', val: form.tps_tvq },
                                        ].map(item => item.val && (
                                            <div key={item.label} className="flex items-center justify-between">
                                                <span className="text-xs text-gray-500">{item.label}</span>
                                                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${item.val === 'OUI'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-red-100 text-red-600'
                                                    }`}>
                                                    {item.val}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Notes */}
                                <Field id="sub-notes" label="Notes" required={false}>
                                    <textarea
                                        id="sub-notes" name="notes" rows={3}
                                        value={form.notes} onChange={handleChange}
                                        placeholder="Any additional details about this subcontractor…"
                                        className="w-full px-4 py-2.5 border border-gray-border rounded-xl text-sm focus:outline-none focus:border-forest-primary transition-colors resize-none"
                                    />
                                </Field>
                            </>
                        )}

                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 border-t border-gray-border flex items-center justify-between gap-3 shrink-0">
                        <p className="text-xs text-gray-400">
                            <span className="text-red-500">*</span> Required fields
                        </p>
                        <div className="flex gap-3">
                            {step === 1 ? (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => { setStep(1); onClose(); }}
                                        className="px-5 py-2.5 border border-gray-border rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        className="px-5 py-2.5 bg-forest-primary text-white rounded-xl text-sm font-medium hover:bg-forest-dark transition-colors"
                                    >
                                        Next →
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="px-5 py-2.5 border border-gray-border rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                                    >
                                        ← Back
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-5 py-2.5 bg-forest-primary text-white rounded-xl text-sm font-medium hover:bg-forest-dark transition-colors"
                                    >
                                        Save subcontractor
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </form>

            </div>
        </div>
    );
}