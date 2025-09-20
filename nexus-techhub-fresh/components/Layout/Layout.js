import React, { Suspense } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import styles from './Layout.module.css';

// Lazy load heavy components
const Header = dynamic(() => import('../Header/Header'), {
  loading: () => <div className={styles.headerPlaceholder}></div>
});

const Footer = dynamic(() => import('../Footer/Footer'), {
  loading: () => <div className={styles.footerPlaceholder}></div>
});

export default function Layout({ children, title, description }) {
  const pageTitle = title 
    ? `${title} | Nexus Tech Hub`
    : 'Nexus Tech Hub - Professional Repair Parts & Tools';

  const pageDescription = description ||
    'Nexus Tech Hub offers high-quality mobile device parts and repair tools for professionals and DIY enthusiasts in UAE.';

  return (
    <div className={styles.layout}>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
        
        {/* Business Information */}
        <meta name="author" content="Nexus Tech Hub" />
        <meta name="contact" content="+971 58 553 1029" />
        <meta name="location" content="Compass Building, Al Shohada Road, AL Hamra Industrial Zone-FZ, Ras Al Khaimah, United Arab Emirates" />
      </Head>

      <Header />

      <main className={styles.main}>
        {children}
      </main>

      <Footer />
    </div>
  );
}
