import React, { Suspense, useEffect, useState } from 'react';
import Head from 'next/head';
import { CartProvider } from '../contexts/CartContext';
import ErrorBoundary from '../components/ErrorBoundary';

// Lazy load third-party components
const WebVitals = React.lazy(() => import('../components/WebVitals'));
const ChatBot = React.lazy(() => import('../components/ChatBot'));

// Import global styles
import '../styles/globals.css';

function AppContent({ Component, pageProps }) {
  return (
    <div className="app-wrapper">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#10b981" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />

        {/* Preload critical resources for better LCP */}
        <link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/_next/static/chunks/framework-f75312fc4004b783.js" as="script" />
        <link rel="preload" href="/_next/static/chunks/vendors-af2c105778c98bb6.js" as="script" />
        <link rel="preload" href="/_next/static/css/1e8a413a9831975f.css" as="style" />

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />

        {/* Preconnect to critical external services */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        {/* Module preload for critical components */}
        <link rel="modulepreload" href="/_next/static/chunks/pages/_app.js" />

        {/* Performance hints */}
        <meta name="format-detection" content="telephone=no" />
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
      </Head>

      <main>
        <Component {...pageProps} />
      </main>
    </div>
  );
}

function ThirdPartyProviders({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Defer third-party loading until after hydration
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <CartProvider>
        {children}
      </CartProvider>
    );
  }

  return (
    <Suspense fallback={
      <CartProvider>
        {children}
      </CartProvider>
    }>
      <CartProvider>
        {children}
        <WebVitals />
        <ChatBot />
      </CartProvider>
    </Suspense>
  );
}

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <ThirdPartyProviders>
        <AppContent Component={Component} pageProps={pageProps} />
      </ThirdPartyProviders>
    </ErrorBoundary>
  );
}

export default MyApp;
