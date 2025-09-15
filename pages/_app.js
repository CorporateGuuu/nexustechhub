import React from 'react';
import Head from 'next/head';
import { CartProvider } from '../contexts/CartContext';
import ErrorBoundary from '../components/ErrorBoundary';
import WebVitals from '../components/WebVitals';
import ChatBot from '../components/ChatBot';

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
      </Head>

      <main>
        <Component {...pageProps} />
      </main>
    </div>
  );
}

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <CartProvider>
        <AppContent Component={Component} pageProps={pageProps} />
        <WebVitals />
        <ChatBot />
      </CartProvider>
    </ErrorBoundary>
  );
}

export default MyApp;
