'use client';

import { X, Users } from 'lucide-react';
import React, { useState } from 'react';

interface NewEmployeeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: EmployeeFormData) => void;
}

export interface EmployeeFormData {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    position: string;
    date_of_birth: string;
    nas: string;
    emergency_contact: string;
    emergency_phone: string;
    status: string;
}

const initialForm: EmployeeFormData = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    position: '',
    date_of_birth: '',
    nas: '',
    emergency_contact: '',
    emergency_phone: '',
    status: 'Active',

};

const positions = [
    'Forestly Manager',
    'Filed Supervisor',
    'Brush Cutter OPerator',
    'Debroussailleur',
    'Equipment Operator',
    'Safety Officer',
    'Other',
];


const Field = ({
    id, label, required = true, children, error,
}: {
    id: string; label: string; required?: Boolean;
    children: React.ReactNode; error?: string;
}) => (
    <div>
        <label htmlFor={id} className='block text-sm font-medium text-gray-700 mb-1.5'>{label} {required && <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>}
        </label>
        {children}
        {error && (
            <p id={`${id}-error`} className='text-xs text-red-500 mt-1' role='alert'>{error}</p>
        )}
    </div>
);
export function NewEmployeeModal({ isOpen, onClose, onSubmit }: NewEmployeeModalProps) {
    const [form, setForm] = useState<EmployeeFormData>(initialForm);
    const [errors, setErrors] = useState<Partial<EmployeeFormData>>({});
    const [step, setStep] = useState<1 | 2>(1);

    if (!isOpen) return null;

    const validateStep1 = () => {
        const e: Partial<EmployeeFormData> = {};
        if (!form.first_name.trim()) e.first_name = 'First name is required';
        if (!form.last_name.trim()) e.last_name = 'Last name is required';
        if (!form.email.trim()) e.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
        if (!form.phone.trim()) e.phone = 'Phone number is required';
        if (!form.position) e.position = 'Position is required';
        return e;
    };

    const validateStep2 = () => {
        const e: Partial<EmployeeFormData> = {};
        if (!form.date_of_birth) e.date_of_birth = 'Date of birth is required';
        if (!form.nas.trim()) e.nas = 'NAS is required';
        else if (form.nas.replace(/\s/g, '').length !== 9) e.nas = 'NAS must be 9 digits';
        if (!form.emergency_contact.trim()) e.emergency_contact = 'Emergency contact is required';
        if (!form.emergency_phone.trim()) e.emergency_phone = 'Emergency phone number is required';
        return e;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof EmployeeFormData]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
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
        setErrors(initialForm);
        setErrors({});
        setStep(1);
        onClose();
    };

    const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) { setStep(1); onClose(); }
    };

    const inputClass = (key: keyof EmployeeFormData) =>
        `w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:border-forest-primary transition-colors ${errors[key] ? 'border-red-400 bg-red-50' : 'border-gray-border'
        }`;


    return (
        <div
            className='fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4'
            role="dialog"
            aria-modal="true"
            aria-labelledby="employee-modal-title"
            onClick={handleBackdrop}
        >
            <div className='bg-white rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-xl'>

                {/*Header*/}
                <div className='flex items-center justify-between px-6 py-5 border-b border-gray-border shrink-0'>
                    <div className='flex items-center gap-3'>
                        <div className='w-9 h-9 bg-forest-light rounded-xl flex items-center justify-center'>
                            <Users className='w-5 h-5 text-forest-primary' aria-hidden="true" />
                        </div>
                        <div>
                            <h2 id="employee-modal-title" className="text-base font-semibold text-gray-text">
                                Add employee
                            </h2>
                            <p className='text-xs text-gray-400 mt-0.5'>
                                Step {step} of 2 - {step === 1 ? 'Basic information' : 'Personal & emergency'}
                            </p>
                        </div>
                    </div>
                    <button
                        type='button'
                        aria-label='CloseModal'
                        onClick={() => { setStep(1); onClose(); }}
                        className='p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600'
                    >
                        <X className='w-5 h-5' aria-hidden="true" />
                    </button>

                </div>
                {/* Step indicator */}
                <div className="px-6 pt-4 shrink-0">
                    <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-forest-primary" />
                        <div className={`flex-1 h-1.5 rounded-full transition-colors ${step === 2 ? 'bg-forest-primary' : 'bg-gray-200'
                            }`} />
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} noValidate className="flex-1 overflow-y-auto">
                    <div className="px-6 py-5 space-y-4">

                        {step === 1 && (
                            <>
                                {/* Name row */}
                                <div className="grid grid-cols-2 gap-4">
                                    <Field id="first_name" label="First name" error={errors.first_name}>
                                        <input
                                            id="first_name" name="first_name" type="text"
                                            value={form.first_name} onChange={handleChange}
                                            placeholder="Jean" aria-required="true"
                                            aria-describedby={errors.first_name ? 'first_name-error' : undefined}
                                            className={inputClass('first_name')}
                                        />
                                    </Field>
                                    <Field id="last_name" label="Last name" error={errors.last_name}>
                                        <input
                                            id="last_name" name="last_name" type="text"
                                            value={form.last_name} onChange={handleChange}
                                            placeholder="Magambo" aria-required="true"
                                            aria-describedby={errors.last_name ? 'last_name-error' : undefined}
                                            className={inputClass('last_name')}
                                        />
                                    </Field>
                                </div>

                                <Field id="email" label="Email address" error={errors.email}>
                                    <input
                                        id="email" name="email" type="email"
                                        value={form.email} onChange={handleChange}
                                        placeholder="jean.magambo@forestly.com" aria-required="true"
                                        aria-describedby={errors.email ? 'email-error' : undefined}
                                        className={inputClass('email')}
                                    />
                                </Field>

                                <Field id="phone" label="Phone number" error={errors.phone}>
                                    <input
                                        id="phone" name="phone" type="tel"
                                        value={form.phone} onChange={handleChange}
                                        placeholder="(819) 555-0100" aria-required="true"
                                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                                        className={inputClass('phone')}
                                    />
                                </Field>

                                <Field id="position" label="Position" error={errors.position}>
                                    <select
                                        id="position" name="position"
                                        value={form.position} onChange={handleChange}
                                        aria-label="Position"
                                        aria-required="true"
                                        aria-describedby={errors.position ? 'position-error' : undefined}
                                        className={`${inputClass('position')} bg-white`}
                                    >
                                        <option value="">Select a position</option>
                                        {positions.map(p => (
                                            <option key={p} value={p}>{p}</option>
                                        ))}
                                    </select>
                                </Field>

                                <Field id="status" label="Status" required={false}>
                                    <select
                                        id="status" name="status"
                                        value={form.status} onChange={handleChange}
                                        aria-label="Employee status"
                                        className="w-full px-4 py-2.5 border border-gray-border rounded-xl text-sm focus:outline-none focus:border-forest-primary bg-white transition-colors"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="On Leave">On Leave</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </Field>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <Field id="date_of_birth" label="Date of birth" error={errors.date_of_birth}>
                                    <input
                                        id="date_of_birth" name="date_of_birth" type="date"
                                        value={form.date_of_birth} onChange={handleChange}
                                        aria-label="Date of birth"
                                        aria-required="true"
                                        aria-describedby={errors.date_of_birth ? 'date_of_birth-error' : undefined}
                                        className={inputClass('date_of_birth')}
                                    />
                                </Field>

                                <Field id="nas" label="NAS (Social Insurance Number)" error={errors.nas}>
                                    <input
                                        id="nas" name="nas" type="text"
                                        value={form.nas} onChange={handleChange}
                                        placeholder="000 000 000" maxLength={11}
                                        aria-required="true"
                                        aria-describedby={errors.nas ? 'nas-error' : undefined}
                                        className={inputClass('nas')}
                                    />
                                </Field>

                                <div className="border-t border-gray-border pt-4">
                                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
                                        Emergency contact
                                    </p>
                                    <div className="space-y-4">
                                        <Field id="emergency_contact" label="Contact name" error={errors.emergency_contact}>
                                            <input
                                                id="emergency_contact" name="emergency_contact" type="text"
                                                value={form.emergency_contact} onChange={handleChange}
                                                placeholder="Full name" aria-required="true"
                                                aria-describedby={errors.emergency_contact ? 'emergency_contact-error' : undefined}
                                                className={inputClass('emergency_contact')}
                                            />
                                        </Field>
                                        <Field id="emergency_phone" label="Contact phone" error={errors.emergency_phone}>
                                            <input
                                                id="emergency_phone" name="emergency_phone" type="tel"
                                                value={form.emergency_phone} onChange={handleChange}
                                                placeholder="(819) 555-0100" aria-required="true"
                                                aria-describedby={errors.emergency_phone ? 'emergency_phone-error' : undefined}
                                                className={inputClass('emergency_phone')}
                                            />
                                        </Field>
                                    </div>
                                </div>
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
                                        onClick={onClose}
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
                                        Save employee
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