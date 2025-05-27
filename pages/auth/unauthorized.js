import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ErrorBoundary from '../../components/ErrorBoundary';
import styles from '../../styles/AuthPages.module.css';

export default function Unauthorized() {
  const { data: session } = useSession();

  return (
    <ErrorBoundary componentName="Unauthorized">
      <Head>
        <title>Access Denied - Nexus TechHub</title>
        <meta name="description" content="You don't have permission to access this page." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <Header />

      <main className={styles.authMain}>
        <div className={styles.authContainer}>
          <div className={styles.authCard}>
            <div className={styles.authHeader}>
              <div className={styles.errorIcon}>🚫</div>
              <h1 className={styles.authTitle}>Access Denied</h1>
              <p className={styles.authSubtitle}>
                You don't have permission to access this page
              </p>
            </div>

            <div className={styles.errorContent}>
              <div className={styles.errorMessage}>
                <h2>Insufficient Permissions</h2>
                <p>
                  The page you're trying to access requires special permissions that your account doesn't have.
                </p>
                
                {session ? (
                  <div className={styles.userInfo}>
                    <p><strong>Current User:</strong> {session.user.email}</p>
                    <p><strong>Account Type:</strong> {session.user.role || 'Customer'}</p>
                  </div>
                ) : (
                  <p>You may need to sign in with a different account.</p>
                )}
              </div>

              <div className={styles.errorActions}>
                <Link href="/" className={styles.primaryBtn}>
                  Go to Homepage
                </Link>
                
                {session ? (
                  <Link href="/dashboard" className={styles.secondaryBtn}>
                    Go to Dashboard
                  </Link>
                ) : (
                  <Link href="/auth/signin" className={styles.secondaryBtn}>
                    Sign In
                  </Link>
                )}
              </div>

              <div className={styles.helpSection}>
                <h3>Need Help?</h3>
                <p>
                  If you believe you should have access to this page, please contact our support team.
                </p>
                <div className={styles.contactInfo}>
                  <p>
                    <strong>Phone:</strong> +971 58 553 1029
                  </p>
                  <p>
                    <strong>Email:</strong> support@nexustechhub.ae
                  </p>
                  <p>
                    <strong>WhatsApp:</strong>{' '}
                    <a 
                      href="https://wa.me/971585531029?text=Hi, I need help with account permissions on the Nexus TechHub website."
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.whatsappLink}
                    >
                      Contact Support
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </ErrorBoundary>
  );
}
