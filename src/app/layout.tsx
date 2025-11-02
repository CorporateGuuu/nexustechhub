import React from 'react';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { CartProvider } from '../../contexts/CartContext';
import { QuoteProvider } from '../../contexts/QuoteContext';
import { AuthProvider } from '../../contexts/AuthContext';
import { OrderProvider } from '../../contexts/OrderContext';
import ErrorBoundary from '../components/ErrorBoundary';
import ClientProviders from './ClientProviders';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import NonCriticalCSS from '../components/NonCriticalCSS';
import CartDrawer from '../components/CartDrawer';

export const metadata: Metadata = {
  title: 'Nexus Tech Hub - Professional Mobile Repair Parts UAE',
  description: 'Professional mobile device repair parts and services in UAE. Specializing in iPhone, Samsung, and iPad replacement parts with quality guarantee.',
  viewport: 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes',
  themeColor: '#ef4444',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.svg',
    apple: [
      { url: '/icons/icon-192x192.svg', sizes: '192x192', type: 'image/svg+xml' },
      { url: '/icons/icon-512x512.svg', sizes: '512x512', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
  },
  formatDetection: {
    telephone: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Nexus Tech Hub',
  },
  other: {
    'x-dns-prefetch-control': 'on',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Nexus Tech Hub',
    'msapplication-TileColor': '#ef4444',
    'msapplication-config': '/browserconfig.xml',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <body>
        <ErrorBoundary>
          <NonCriticalCSS />
          <ClientProviders>
            <AuthProvider>
              <QuoteProvider>
                <CartProvider>
                  <OrderProvider>
                    <div className="app-wrapper">
                      <Header />
                      <main>
                        {children}
                      </main>
                      <Footer />
                      <BackToTop />
                      <CartDrawer />
                    </div>
                  </OrderProvider>
                </CartProvider>
              </QuoteProvider>
            </AuthProvider>
          </ClientProviders>
          <Analytics />
        </ErrorBoundary>
      </body>
    </html>
  );
}
