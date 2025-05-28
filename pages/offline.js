import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { analytics } from '../components/Analytics';
import styles from '../styles/Offline.module.css';

function Offline() {
  const [isOnline, setIsOnline] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    // Check online status
    setIsOnline(navigator.onLine);

    // Listen for online/offline events
    const handleOnline = () => {
      setIsOnline(true);
      if (typeof analytics !== 'undefined') {
        analytics.trackEngagement('back_online');
      }
      // Auto-reload when back online
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      if (typeof analytics !== 'undefined') {
        analytics.trackEngagement('went_offline');
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Track offline page view
    if (typeof analytics !== 'undefined') {
      analytics.trackEngagement('offline_page_view');
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    if (typeof analytics !== 'undefined') {
      analytics.trackEngagement('offline_retry_attempt', { attempt: retryCount + 1 });
    }

    // Check if online before reloading
    if (navigator.onLine) {
      window.location.reload();
    } else {
      // Show feedback that still offline
      alert('Still offline. Please check your internet connection.');
    }
  };

  const handleContactOffline = () => {
    if (typeof analytics !== 'undefined') {
      analytics.trackEngagement('offline_contact_attempt');
    }
    // Try to open WhatsApp (works offline if app is installed)
    window.open('https://wa.me/971585531029?text=I was trying to access Nexus TechHub website but I\'m having connection issues.', '_blank');
  };

  return (
    <>
      <Head>
        <title>Offline - Nexus TechHub</title>
        <meta name="description" content="You are currently offline. Please check your internet connection." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className={styles.offlineContainer}>
        <div className={styles.offlineContent}>
          <div className={styles.offlineIcon}>
            {isOnline ? '🌐' : '📱'}
          </div>

          <h1 className={styles.offlineTitle}>
            {isOnline ? 'Connection Restored!' : 'You\'re Offline'}
          </h1>

          <p className={styles.offlineMessage}>
            {isOnline
              ? 'Great! Your internet connection is back. Reloading...'
              : 'It looks like you\'ve lost your internet connection. Please check your connection and try again.'
            }
          </p>

          <div className={styles.status}>
            <div className={`${styles.statusIndicator} ${isOnline ? styles.online : styles.offline}`}>
              {isOnline ? '✅ Online' : '❌ Offline'}
            </div>
          </div>

          <div className={styles.offlineActions}>
            <button
              className={styles.retryButton}
              onClick={handleRetry}
              disabled={isOnline}
            >
              {isOnline ? 'Reloading...' : 'Try Again'}
            </button>

            <Link href="/" className={styles.homeButton}>
              Go Home
            </Link>

            <button
              className={styles.contactButton}
              onClick={handleContactOffline}
            >
              Contact via WhatsApp
            </button>
          </div>

          <div className={styles.offlineTips}>
            <h2>While you're offline:</h2>
            <ul>
              <li>✅ Your browsing data is saved locally</li>
              <li>✅ Forms will be submitted when you're back online</li>
              <li>✅ Some pages may still be available from cache</li>
              <li>✅ WhatsApp contact still works if app is installed</li>
            </ul>
          </div>

          <div className={styles.cachedPages}>
            <h3>Available Offline:</h3>
            <div className={styles.pageLinks}>
              <Link href="/iphone-parts" className={styles.pageLink}>iPhone Parts</Link>
              <Link href="/samsung-parts" className={styles.pageLink}>Samsung Parts</Link>
              <Link href="/contact" className={styles.pageLink}>Contact Info</Link>
            </div>
          </div>

          <div className={styles.businessInfo}>
            <h3>📞 Nexus TechHub Contact:</h3>
            <p><strong>Phone:</strong> +971 58 553 1029</p>
            <p><strong>Location:</strong> Ras Al Khaimah, UAE</p>
            <p><strong>Hours:</strong> 9 AM - 6 PM (UAE Time)</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(Offline);
