import React from 'react';
import { useSession } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import Head from 'next/head';
import UnifiedHeader from '../UnifiedHeader/UnifiedHeader';
import UnifiedFooter from '../UnifiedFooter/UnifiedFooter';
import DeviceGradingPopup from '../DeviceGradingPopup';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import ChatbotUI from '../Chatbot/ChatbotUI';
import WhatsAppButton from '../WhatsApp/WhatsAppButton';
import AdvancedSEO from '../SEO/AdvancedSEO';
import dynamic from 'next/dynamic';
import styles from './Layout.module.css';
import 'react-toastify/dist/ReactToastify.css';

// Dynamically import PWA components to avoid SSR issues
const PWAInstallPrompt = dynamic(
  () => import('../PWAInstallPrompt/PWAInstallPrompt'),
  { ssr: false }
);

const EnhancedPWAManager = dynamic(
  () => import('../PWA/EnhancedPWAManager'),
  { ssr: false }
);

export default function Layout({
  children,
  title,
  description,
  seoProps = {},
  showAdvancedSEO = true
}) {
  const { data: session } = useSession();

  const pageTitle = title
    ? `${title} | Nexus TechHub`
    : 'Nexus TechHub - Professional Mobile Repair Parts UAE';

  const pageDescription = description || 'Premium quality mobile device repair parts in UAE. iPhone, Samsung, iPad parts with warranty. Located in Ras Al Khaimah. Fast shipping across UAE.';

  return (
    <div className={styles.layout}>
      {/* Enhanced SEO */}
      {showAdvancedSEO ? (
        <AdvancedSEO
          title={pageTitle}
          description={pageDescription}
          canonicalUrl={typeof window !== 'undefined' ? window.location.href : undefined}
          {...seoProps}
        />
      ) : (
        <Head>
          <title>{pageTitle}</title>
          <meta name="description" content={pageDescription} />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
          <link rel="icon" href="/favicon.ico" />

          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content={pageTitle} />
          <meta property="og:description" content={pageDescription} />
          <meta property="og:image" content="/images/og-image.jpg" />

          {/* Twitter */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:title" content={pageTitle} />
          <meta property="twitter:description" content={pageDescription} />
          <meta property="twitter:image" content="/images/og-image.jpg" />
        </Head>
      )}

      <ErrorBoundary>
        <UnifiedHeader />
      </ErrorBoundary>

      <main className={styles.main}>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </main>

      <ErrorBoundary>
        <UnifiedFooter />
      </ErrorBoundary>

      {/* Show the device grading popup only for non-authenticated users */}
      {!session && (
        <ErrorBoundary>
          <DeviceGradingPopup />
        </ErrorBoundary>
      )}

      {/* Chatbot and WhatsApp buttons */}
      <ErrorBoundary>
        <ChatbotUI />
      </ErrorBoundary>

      <ErrorBoundary>
        <WhatsAppButton />
      </ErrorBoundary>

      {/* Enhanced PWA Manager */}
      <ErrorBoundary>
        <EnhancedPWAManager />
      </ErrorBoundary>

      {/* PWA Install Prompt (Legacy) */}
      <ErrorBoundary>
        <PWAInstallPrompt />
      </ErrorBoundary>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastStyle={{
          backgroundColor: '#ffffff',
          color: '#1f2937',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        }}
      />
    </div>
  );
}
