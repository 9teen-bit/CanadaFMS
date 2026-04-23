'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {  
  LayoutDashboard, Trees, FileText, Users, Truck,
  Briefcase, Building2, DollarSign, BarChart3, Settings, X,
  ChevronRight, ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const navGroups = [
  {
    label: 'Main',
    items: [
      { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { name: 'Projects',  href: '/dashboard/projects', icon: Trees, badge: '3' },
      { name: 'Field Reports', href: '/dashboard/field-reports', icon: FileText,  badge: '12' },
    ],
  },
  {
    label: 'Workforce',
    items: [
      { name: 'Employees', href: '/dashboard/employees', icon: Users, badge: '20' },
      { name: 'Subcontractors', href: '/dashboard/subcontractors', icon: Truck,  badge: '18' },
      { name: 'Clients', href: '/dashboard/clients', icon: Briefcase },
    ],
  },
  {
    label: 'Operations',
    items: [
      { name: 'Accommodation', href: '/dashboard/accommodation', icon: Building2 },
      { name: 'Finance & Payroll', href: '/dashboard/finance-payroll', icon: DollarSign },
      { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    ],
  },
  {
    label: null,
    items: [
      { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    ],
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['Main', 'Workforce', 'Operations']);

  const toggleGroup = (label: string | null) => {
    if (!label) return;
    setExpandedGroups(prev =>
      prev.includes(label)
        ? prev.filter(g => g !== label)
        : [...prev, label]
    );
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white">

      {/* ── Header Section (Your Logo - Unchanged) ── */}
      <div className="px-4 pt-5 pb-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/icon.svg"
              alt="Forêt H.E inc. logo"
              width={38}
              height={38}
              className="rounded-xl border border-gray-100 shrink-0"
              priority
            />
            <div>
              <p className="text-[15px] font-semibold text-gray-900 leading-tight tracking-tight">
                Forêt H.E inc.
              </p>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">
                Forestry Operations
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Active season indicator - More readable */}
        <div className="flex items-center gap-2 mt-3 bg-gradient-to-r from-forest-light/30 to-transparent rounded-lg px-3 py-2">
          <div className="relative">
            <span className="absolute inline-flex h-2 w-2 rounded-full bg-forest-primary opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-forest-primary" />
          </div>
          <span className="text-xs font-semibold text-forest-primary">Active Season</span>
          <span className="text-xs text-gray-400 ml-auto">
            {new Date().getFullYear()} · Q4
          </span>
        </div>
      </div>

      {/* ── Navigation - Improved Readability ── */}
      <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Main navigation">
        {navGroups.map((group, gi) => {
          const isExpanded = group.label ? expandedGroups.includes(group.label) : true;
          const hasLabel = group.label !== null;
          
          return (
            <div key={gi} className={gi > 0 ? 'mt-4' : ''}>
              {/* Section header with toggle */}
              {hasLabel && (
                <button
                  onClick={() => toggleGroup(group.label)}
                  className="w-full flex items-center justify-between px-3 py-1.5 mb-1 group"
                  aria-expanded={isExpanded}
                >
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 group-hover:text-gray-600 transition-colors">
                    {group.label}
                  </p>
                  <ChevronDown 
                    className={cn(
                      "w-3 h-3 text-gray-500 transition-transform duration-200",
                      isExpanded ? "rotate-0" : "-rotate-90"
                    )}
                  />
                </button>
              )}

              {/* Navigation items */}
              <div className={cn(
                "space-y-0.5 transition-all duration-200",
                !isExpanded && "hidden"
              )}>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    pathname === item.href || pathname.startsWith(item.href + '/');
                  
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={onClose}
                      aria-current={isActive ? 'page' : undefined}
                      className={cn(
                        'group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150',
                        isActive
                          ? 'bg-forest-light/40 text-forest-primary font-medium'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      )}
                    >
                      {/* Active indicator */}
                      {isActive && (
                        <span
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-forest-primary rounded-r-full"
                          aria-hidden="true"
                        />
                      )}
                      
                      {/* Icon */}
                      <Icon
                        className={cn(
                          'w-4 h-4 shrink-0 transition-colors',
                          isActive 
                            ? 'text-forest-primary' 
                            : 'text-gray-400 group-hover:text-gray-600'
                        )}
                        aria-hidden="true"
                      />
                      
                      {/* Label */}
                      <span className="flex-1 text-left">{item.name}</span>
                    
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

    </div>
  );

  return (
    <>
      {/* Desktop sidebar - Fixed width w-64 (unchanged) */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-100 flex-col z-30 shadow-sm">
        <SidebarContent />
      </aside>

      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          aria-hidden="true"
          onClick={onClose}
        />
      )}

      {/* Mobile drawer - Same width w-64 */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-100 flex flex-col z-50 transition-transform duration-300 lg:hidden shadow-xl',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        aria-label="Mobile navigation"
      >
        <SidebarContent />
      </aside>
    </>
  );
};