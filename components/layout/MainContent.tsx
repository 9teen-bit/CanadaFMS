import { ReactNode } from 'react';

interface MainContentProps {
  children: ReactNode;
}

export function MainContent({ children }: MainContentProps) {
  return (
    <main className="min-h-screen">
      <div className="p-4 sm:p-6 lg:p-8">
        {children}
      </div>
    </main>
  );
}