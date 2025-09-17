import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout/Layout';
import styles from '../../styles/Account.module.css';

export default function Account() {
  return (
    <Layout
      title="My Account - Nexus Tech Hub"
      description="Manage your account, orders, and preferences"
    >
      <div className={styles.accountPage}>
        <div className={styles.container}>
          {/* Page Header */}
          <div className={styles.pageHeader}>
            <h1>My Account</h1>
            <p>Manage your account settings and preferences.</p>
          </div>

          <div className={styles.accountContainer}>
            {/* Sidebar Navigation */}
            <div className={styles.sidebar}>
              <div className={styles.userInfo}>
                <div className={styles.userAvatar}>
                  <span>N</span>
                </div>
                <div className={styles.userDetails}>
                  <h3>Guest User</h3>
                  <p>Please sign in to access your account</p>
                </div>
              </div>

              <nav className={styles.accountNav}>
                <Link href="/contact" className={styles.navItem}>
                  Contact Support
                </Link>
                <Link href="/products" className={styles.navItem}>
                  Browse Products
                </Link>
                <Link href="/cart" className={styles.navItem}>
                  View Cart
                </Link>
              </nav>
            </div>

            {/* Main Content */}
            <div className={styles.mainContent}>
              <div className={styles.tabContent}>
                <h2>Account Access</h2>
                <p>To access your account features, please sign in or create an account.</p>

                <div className={styles.authPrompt}>
                  <h3>Sign In Required</h3>
                  <p>Access your order history, wishlist, addresses, and account preferences by signing in.</p>

                  <div className={styles.authActions}>
                    <Link href="/auth/signin" className={styles.authButton}>
                      Sign In
                    </Link>
                    <Link href="/auth/register" className={styles.authButton}>
                      Create Account
                    </Link>
                  </div>
                </div>

                <div className={styles.guestFeatures}>
                  <h3>Available Features</h3>
                  <div className={styles.featuresGrid}>
                    <div className={styles.feature}>
                      <div className={styles.featureIcon}>🛍️</div>
                      <div className={styles.featureContent}>
                        <h4>Browse Products</h4>
                        <p>Explore our complete catalog of repair parts</p>
                      </div>
                    </div>
                    <div className={styles.feature}>
                      <div className={styles.featureIcon}>🛒</div>
                      <div className={styles.featureContent}>
                        <h4>Add to Cart</h4>
                        <p>Save items for purchase when you're ready</p>
                      </div>
                    </div>
                    <div className={styles.feature}>
                      <div className={styles.featureIcon}>📞</div>
                      <div className={styles.featureContent}>
                        <h4>Contact Support</h4>
                        <p>Get help from our expert technicians</p>
                      </div>
                    </div>
                    <div className={styles.feature}>
                      <div className={styles.featureIcon}>📋</div>
                      <div className={styles.featureContent}>
                        <h4>View Information</h4>
                        <p>Access detailed product specifications</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
