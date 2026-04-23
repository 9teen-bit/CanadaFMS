import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  fallback: ['system-ui', '-apple-system', 'sans-serif'],
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
      <body className={`${cormorant.variable} ${inter.variable} font-serif antialiased`}>
        {children}
      </body>
    </html>
  );
}