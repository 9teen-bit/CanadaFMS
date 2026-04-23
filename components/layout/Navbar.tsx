'use client';

import { Bell, ChevronDown, User, Menu, X } from 'lucide-react'; // Added X for the modal close
import React, { useState } from 'react';

interface NavbarProps {
  pageTitle?: string;
  onMenuClick: () => void;
}

export function Navbar({ pageTitle = 'Dashboard', onMenuClick }: NavbarProps) {
  // 1. Add state to control the modal
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-border px-4 sm:px-6 lg:px-8 py-4 sticky top-0 z-20">
      <div className="flex items-center justify-between gap-4">

        {/* ... (Previous Left Side Content) ... */}
        <div className="flex items-center gap-3 min-w-0">
          <button type="button" onClick={onMenuClick} className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors shrink-0">
            <Menu className="w-5 h-5 text-gray-text" />
          </button>
          <div className="min-w-0">
            <h1 className="text-lg sm:text-2xl font-bold text-gray-text truncate">{pageTitle}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* 2. Update Notification Bell Button */}
          <button
            type="button"
            aria-label="View notifications"
            onClick={() => setIsNotificationOpen(true)} // Open on click
            className={`relative p-2 rounded-xl transition-colors ${isNotificationOpen ? 'bg-gray-100' : 'hover:bg-gray-100'
              }`}
          >
            <Bell className="w-5 h-5 text-gray-text" aria-hidden="true" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" aria-hidden="true" />
          </button>

          {/* ... (Profile Section) ... */}
          <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 border-l border-gray-border">
              {/* Name — hidden on small screens */}
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-text">Romain Ishimwe</p>
                <p className="text-xs text-gray-400">Forestry Manager</p>
              </div>
              <button
                type="button"
                aria-label="Open profile menu"
                className="flex items-center gap-1.5 p-1.5 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-forest-primary flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" aria-hidden="true" />
                </div>
                <ChevronDown className="w-4 h-4 text-gray-text hidden sm:block" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

      {/* 3. Render the Notification Modal/Dropdown */}
      {isNotificationOpen && (
        <>
          {/* Backdrop to close when clicking outside */}
          <div
            className="fixed inset-0 z-30"
            onClick={() => setIsNotificationOpen(false)}
          />

          {/* Simple Notification Dropdown/Modal */}
          <div className="absolute right-4 sm:right-6 lg:right-8 top-20 w-80 bg-white border border-gray-border rounded-2xl shadow-xl z-40 overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-5 py-4 border-b border-gray-border flex justify-between items-center bg-gray-50/50">
              <h3 className="font-semibold text-gray-text">Notifications</h3>
              <button
                type="button"
                onClick={() => setIsNotificationOpen(false)}
                className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {/* Example Notifications */}
              <div className="px-5 py-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors">
                <p className="text-sm font-medium text-gray-text">New Employee Added</p>
                <p className="text-xs text-gray-500 mt-1">Jean Magambo was added to the system.</p>
                <p className="text-[10px] text-gray-400 mt-2">2 mins ago</p>
              </div>
              <div className="px-5 py-4 hover:bg-gray-50 cursor-pointer transition-colors">
                <p className="text-sm font-medium text-gray-text">Safety Report Due</p>
                <p className="text-xs text-gray-500 mt-1">Weekly safety checks need approval.</p>
                <p className="text-[10px] text-gray-400 mt-2">1 hour ago</p>
              </div>
            </div>

            <div className="px-5 py-3 border-t border-gray-border bg-gray-50/50 text-center">
              <button className="text-xs font-semibold text-forest-primary hover:text-forest-dark">
                View all notifications
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
}

