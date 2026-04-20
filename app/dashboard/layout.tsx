'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getPageTitle = () => {
    const segment = pathname.split('/').filter(Boolean).pop() ?? 'dashboard';
    return segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* lg:ml-72 offsets the fixed sidebar on desktop, no offset on mobile */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        <Navbar
          pageTitle={getPageTitle()}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <div className="flex-1 flex flex-col overflow-y-auto">
          <div className="flex-1 p-4 sm:p-6 lg:p-8">
            {children}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}