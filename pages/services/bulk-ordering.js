import React from 'react';
import Link from 'next/link';
import Layout from '../../nexus-techhub-fresh/components/Layout/Layout';
import styles from '../../styles/Services.module.css';

export default function BulkOrdering() {
  return (
    <Layout
      title="Bulk Ordering - Nexus Tech Hub"
      description="Professional bulk ordering services for iPhone, Samsung, and iPad repair parts. Wholesale pricing and fast delivery worldwide."
    >
      <div className={styles.servicePage}>
        {/* Hero Section */}
        <div className={styles.heroSection}>
          <div className="container">
            <div className={styles.heroContent}>
              <div className={styles.breadcrumb}>
                <Link href="/">Home</Link>
                <span className={styles.breadcrumbSeparator}>/</span>
                <Link href="/services">Services</Link>
                <span className={styles.breadcrumbSeparator}>/</span>
                <span className={styles.currentPage}>Bulk Ordering</span>
              </div>

              <h1 className={styles.heroTitle}>Bulk Ordering Services</h1>
              <p className={styles.heroDescription}>
                Streamline your repair business with our professional bulk ordering solutions.
                Competitive wholesale pricing, fast delivery, and dedicated account management.
              </p>

              <div className={styles.heroStats}>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>5000+</div>
                  <div className={styles.statLabel}>Parts in Stock</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>24-48hrs</div>
                  <div className={styles.statLabel}>Processing Time</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>99.5%</div>
                  <div className={styles.statLabel}>Order Accuracy</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className={styles.benefitsSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Why Choose Our Bulk Ordering?</h2>
            <div className={styles.benefitsGrid}>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3>Wholesale Pricing</h3>
                <p>Competitive bulk pricing with volume discounts up to 25% off retail prices.</p>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <h3>Dedicated Account Manager</h3>
                <p>Personal account manager to handle your orders and provide technical support.</p>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13 12h7v1.5h-7V12zm0-2.5h7V11h-7V9.5zm0 5h7V16h-7v-1.5zM21 4H3c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 15h-9V6h9v13z"/>
                  </svg>
                </div>
                <h3>Priority Shipping</h3>
                <p>Express shipping options with tracking and guaranteed delivery times.</p>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 1l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3>Quality Guarantee</h3>
                <p>All parts come with our 30-day warranty and quality assurance guarantee.</p>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4-5h-2V7h2v5zm4 3h-2v-9h2v9z"/>
                  </svg>
                </div>
                <h3>Inventory Management</h3>
                <p>Real-time inventory tracking and automated reorder alerts.</p>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h3>Flexible Payment Terms</h3>
                <p>Net 30 payment terms available for qualified business accounts.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div className={styles.processSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>How Bulk Ordering Works</h2>
            <div className={styles.processSteps}>
              <div className={styles.processStep}>
                <div className={styles.stepNumber}>1</div>
                <h3>Contact Our Sales Team</h3>
                <p>Get in touch with our bulk ordering specialists to discuss your requirements.</p>
              </div>

              <div className={styles.processStep}>
                <div className={styles.stepNumber}>2</div>
                <h3>Receive Custom Quote</h3>
                <p>Get a personalized quote with volume discounts and shipping estimates.</p>
              </div>

              <div className={styles.processStep}>
                <div className={styles.stepNumber}>3</div>
                <h3>Place Your Order</h3>
                <p>Submit your order through our secure bulk ordering portal.</p>
              </div>

              <div className={styles.processStep}>
                <div className={styles.stepNumber}>4</div>
                <h3>Fast Processing & Shipping</h3>
                <p>Your order is processed within 24-48 hours and shipped worldwide.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={styles.ctaSection}>
          <div className="container">
            <div className={styles.ctaContent}>
              <h2>Ready to Start Bulk Ordering?</h2>
              <p>Contact our sales team today to set up your wholesale account and get started with bulk ordering.</p>
              <div className={styles.ctaButtons}>
                <Link href="/contact" className={styles.primaryButton}>
                  Contact Sales Team
                </Link>
                <a href="tel:+971585531029" className={styles.secondaryButton}>
                  Call +971 58 553 1029
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
