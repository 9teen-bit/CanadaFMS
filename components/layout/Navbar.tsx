'use client';

import { Bell, ChevronDown, User, Menu } from 'lucide-react';

interface NavbarProps {
  pageTitle?: string;
  onMenuClick: () => void;
}

export function Navbar({ pageTitle = 'Dashboard', onMenuClick }: NavbarProps) {
  return (
    <header className="bg-white border-b border-gray-border px-4 sm:px-6 lg:px-8 py-4 sticky top-0 z-20">
      <div className="flex items-center justify-between gap-4">

        <div className="flex items-center gap-3 min-w-0">
          {/* Hamburger — mobile only */}
          <button
            type="button"
            aria-label="Open navigation menu"
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors shrink-0"
          >
            <Menu className="w-5 h-5 text-gray-text" aria-hidden="true" />
          </button>

          <div className="min-w-0">
            <h1 className="text-lg sm:text-2xl font-bold text-gray-text truncate">{pageTitle}</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5 hidden sm:block">
              {pageTitle === 'Dashboard'
                ? "Welcome back, John. Here's your forestry operations overview."
                : `Manage and track all ${pageTitle.toLowerCase()}`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Notifications */}
          <button
            type="button"
            aria-label="View notifications"
            className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <Bell className="w-5 h-5 text-gray-text" aria-hidden="true" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" aria-hidden="true" />
          </button>

          {/* Profile */}
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
    </header>
  );
}