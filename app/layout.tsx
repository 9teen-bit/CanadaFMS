import type { Metadata } from 'next';
import { Source_Serif_4 } from 'next/font/google';
import './globals.css';

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Forêt H.E inc. — Forestry Operations',
    template: '%s | Forêt H.E inc.',
  },
  description: 'Professional forestry operations management platform',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={sourceSerif.className}>{children}</body>
    </html>
  );
}