'use client';

import { useState } from 'react';
import { User, Bell, Shield, Database, FileText, Globe, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const settingsSections = [
  { id: 'profile',       name: 'Profile',           icon: User },
  { id: 'notifications', name: 'Notifications',     icon: Bell },
  { id: 'security',      name: 'Security',          icon: Shield },
  { id: 'data',          name: 'Data',   icon: Database },
  { id: 'reports',       name: 'Report Settings',   icon: FileText },
  { id: 'regional',      name: 'Regional', icon: Globe },
];

const notificationItems = [
  'Email Notifications',
  'Push Notifications',
  'Weekly Reports',
  'Project Updates',
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile');
  const [menuOpen, setMenuOpen] = useState(false);

  const activeItem = settingsSections.find(s => s.id === activeSection);
  const ActiveIcon = activeItem?.icon ?? User;

  const handleSelect = (id: string) => {
    setActiveSection(id);
    setMenuOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-8">

      {/* ── Mobile: dropdown trigger ── */}
      <div className="md:hidden">
        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="settings-menu"
          aria-label="Open settings menu"
          onClick={() => setMenuOpen(prev => !prev)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-border rounded-xl text-sm font-medium text-gray-text shadow-sm"
        >
          <span className="flex items-center gap-2">
            <ActiveIcon className="w-4 h-4 text-forest-primary" aria-hidden="true" />
            {activeItem?.name}
          </span>
          <ChevronDown
            className={cn('w-4 h-4 text-gray-400 transition-transform duration-200', menuOpen && 'rotate-180')}
            aria-hidden="true"
          />
        </button>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div
            id="settings-menu"
            role="menu"
            className="mt-1 bg-white border border-gray-border rounded-xl shadow-md overflow-hidden"
          >
            {settingsSections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  type="button"
                  role="menuitem"
                  aria-current={isActive ? 'true' : undefined}
                  onClick={() => handleSelect(section.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors border-b border-gray-border last:border-0',
                    isActive
                      ? 'bg-forest-light text-forest-primary font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  )}
                >
                  <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                  {section.name}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Desktop: sidebar ── */}
      <div className="hidden md:block w-56 shrink-0">
        <div className="card sticky top-4">
          <nav className="space-y-1" aria-label="Settings sections">
            {settingsSections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  type="button"
                  aria-pressed={isActive}
                  aria-label={`Go to ${section.name} settings`}
                  onClick={() => handleSelect(section.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all',
                    isActive
                      ? 'bg-forest-light text-forest-primary font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  )}
                >
                  <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                  {section.name}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* ── Content panel ── */}
      <div className="flex-1 card min-w-0">

        {activeSection === 'profile' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-text">Profile settings</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="full-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full name
                </label>
                <input
                  id="full-name"
                  type="text"
                  defaultValue="Romain Ishimwe"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 border border-gray-border rounded-xl focus:outline-none focus:border-forest-primary"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  defaultValue="romainishimwe4@gmail.com"
                  placeholder="Enter your email address"
                  className="w-full px-4 py-2 border border-gray-border rounded-xl focus:outline-none focus:border-forest-primary"
                />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <input
                  id="role"
                  type="text"
                  defaultValue="Forestry Manager"
                  disabled
                  aria-disabled="true"
                  placeholder="Your assigned role"
                  className="w-full px-4 py-2 border border-gray-border rounded-xl bg-gray-50 cursor-not-allowed"
                />
              </div>
              <button
                type="submit"
                aria-label="Save profile changes"
                className="bg-forest-primary text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-forest-dark transition-colors"
              >
                Save changes
              </button>
            </div>
          </div>
        )}

        {activeSection === 'notifications' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-text">Notification preferences</h2>
            <div className="space-y-2">
              {notificationItems.map((item) => {
                const id = item.toLowerCase().replace(/\s+/g, '-');
                return (
                  <div key={item} className="flex items-center justify-between py-3 border-b border-gray-border last:border-0">
                    <label htmlFor={id} className="text-sm text-gray-700 cursor-pointer">
                      {item}
                    </label>
                    <div className="relative inline-flex items-center shrink-0">
                      <input
                        id={id}
                        type="checkbox"
                        defaultChecked
                        aria-label={`Toggle ${item}`}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-forest-primary" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeSection === 'security' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-text">Security settings</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
                  Current password
                </label>
                <input
                  id="current-password"
                  type="password"
                  placeholder="Enter your current password"
                  autoComplete="current-password"
                  className="w-full px-4 py-2 border border-gray-border rounded-xl focus:outline-none focus:border-forest-primary"
                />
              </div>
              <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                  New password
                </label>
                <input
                  id="new-password"
                  type="password"
                  placeholder="Enter your new password"
                  autoComplete="new-password"
                  className="w-full px-4 py-2 border border-gray-border rounded-xl focus:outline-none focus:border-forest-primary"
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm new password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  placeholder="Re-enter your new password"
                  autoComplete="new-password"
                  className="w-full px-4 py-2 border border-gray-border rounded-xl focus:outline-none focus:border-forest-primary"
                />
              </div>
              <button
                type="submit"
                aria-label="Update account password"
                className="bg-forest-primary text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-forest-dark transition-colors"
              >
                Update password
              </button>
            </div>
          </div>
        )}

        {activeSection === 'data' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-text">Data management</h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between py-3 border-b border-gray-border">
                <div>
                  <p className="text-sm font-medium text-gray-700">Export all data</p>
                  <p className="text-xs text-gray-500 mt-0.5">Download all your forestry data as CSV</p>
                </div>
                <button
                  type="button"
                  aria-label="Export all data as CSV"
                  className="shrink-0 px-4 py-2 border border-gray-border rounded-xl text-sm hover:bg-gray-50 transition-colors"
                >
                  Export
                </button>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-border">
                <div>
                  <p className="text-sm font-medium text-gray-700">Import Excel files</p>
                  <p className="text-xs text-gray-500 mt-0.5">Import data from existing Excel sheets</p>
                </div>
                <button
                  type="button"
                  aria-label="Import data from Excel files"
                  className="shrink-0 px-4 py-2 border border-gray-border rounded-xl text-sm hover:bg-gray-50 transition-colors"
                >
                  Import
                </button>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-red-600">Delete all data</p>
                  <p className="text-xs text-gray-500 mt-0.5">Permanently delete all your data</p>
                </div>
                <button
                  type="button"
                  aria-label="Permanently delete all data"
                  className="shrink-0 px-4 py-2 border border-red-300 text-red-600 rounded-xl text-sm hover:bg-red-50 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'reports' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-text">Report settings</h2>
            <p className="text-sm text-gray-500">Report configuration options will appear here.</p>
          </div>
        )}

        {activeSection === 'regional' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-text">Regional settings</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                  Language
                </label>
                <select
                  id="language"
                  aria-label="Select language"
                  className="w-full px-4 py-2 border border-gray-border rounded-xl focus:outline-none focus:border-forest-primary bg-white text-sm"
                >
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                </select>
              </div>
              <div>
                <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">
                  Timezone
                </label>
                <select
                  id="timezone"
                  aria-label="Select timezone"
                  className="w-full px-4 py-2 border border-gray-border rounded-xl focus:outline-none focus:border-forest-primary bg-white text-sm"
                >
                  <option value="America/Toronto">Eastern Time — Toronto</option>
                  <option value="America/Vancouver">Pacific Time — Vancouver</option>
                  <option value="America/Winnipeg">Central Time — Winnipeg</option>
                </select>
              </div>
              <button
                type="submit"
                aria-label="Save regional settings"
                className="bg-forest-primary text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-forest-dark transition-colors"
              >
                Save changes
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}