import React from 'react';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import { GoogleAnalytics } from '../components/Analytics';
import ChatBot from '../components/ChatBot';
import ErrorBoundary from '../components/ErrorBoundary';
import WebVitals from '../components/WebVitals';
import { CartProvider } from '../contexts/CartContext';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

// Import global styles
import '../styles/globals.css';

function AppContent({ Component, pageProps }) {
  return (
    <ErrorBoundary componentName="Application">
      <div className="app-wrapper">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="theme-color" content="#10b981" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <link rel="apple-touch-icon" href="/icons/icon-192x192.svg" />
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>

        {/* Google Analytics */}
        <GoogleAnalytics />

        {/* Core Web Vitals Monitoring */}
        <WebVitals />

        <Header />

        <main>
          <Component {...pageProps} />
        </main>

        <Footer />

        {/* AI Customer Support Chatbot */}
        <ChatBot />
      </div>
    </ErrorBoundary>
  );
}

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <CartProvider>
        <AppContent Component={Component} pageProps={pageProps} />
      </CartProvider>
    </SessionProvider>
  );
}

export default MyApp;
