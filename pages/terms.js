import React from 'react';
import Link from 'next/link';
import Layout from '../nexus-techhub-fresh/components/Layout/Layout';
import styles from '../styles/Terms.module.css';

export default function Terms() {
  return (
    <Layout
      title="Terms of Service - Nexus Tech Hub"
      description="Terms of Service for Nexus Tech Hub - Professional mobile repair parts and services in UAE."
    >
      <div className={styles.legalPage}>
        <div className={styles.container}>
          {/* Page Header */}
          <div className={styles.pageHeader}>
            <h1>Terms of Service</h1>
            <div className={styles.lastUpdated}>Last updated: September 15, 2025</div>
          </div>

          {/* Table of Contents */}
          <div className={styles.tableOfContents}>
            <div className={styles.tocTitle}>Table of Contents</div>
            <div className={styles.tocList}>
              <div className={styles.tocItem}>
                <a href="#acceptance" className={styles.tocLink}>1. Acceptance of Terms</a>
              </div>
              <div className={styles.tocItem}>
                <a href="#license" className={styles.tocLink}>2. Use License</a>
              </div>
              <div className={styles.tocItem}>
                <a href="#products" className={styles.tocLink}>3. Product Information</a>
              </div>
              <div className={styles.tocItem}>
                <a href="#pricing" className={styles.tocLink}>4. Pricing and Payment</a>
              </div>
              <div className={styles.tocItem}>
                <a href="#shipping" className={styles.tocLink}>5. Shipping and Delivery</a>
              </div>
              <div className={styles.tocItem}>
                <a href="#returns" className={styles.tocLink}>6. Returns and Refunds</a>
              </div>
              <div className={styles.tocItem}>
                <a href="#warranty" className={styles.tocLink}>7. Warranty</a>
              </div>
              <div className={styles.tocItem}>
                <a href="#liability" className={styles.tocLink}>8. Limitation of Liability</a>
              </div>
              <div className={styles.tocItem}>
                <a href="#privacy" className={styles.tocLink}>9. Privacy Policy</a>
              </div>
              <div className={styles.tocItem}>
                <a href="#governing-law" className={styles.tocLink}>10. Governing Law</a>
              </div>
              <div className={styles.tocItem}>
                <a href="#contact" className={styles.tocLink}>11. Contact Information</a>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className={styles.contentSection}>
            <div className={styles.section} id="acceptance">
              <h2 className={styles.sectionTitle}>1. Acceptance of Terms</h2>
              <div className={styles.sectionContent}>
                <p>
                  By accessing and using Nexus Tech Hub's website and services, you accept and agree to be bound by the terms and provision of this agreement.
                </p>
              </div>
            </div>

            <div className={styles.section} id="license">
              <h2 className={styles.sectionTitle}>2. Use License</h2>
              <div className={styles.sectionContent}>
                <p>
                  Permission is granted to temporarily download one copy of the materials on Nexus Tech Hub's website for personal, non-commercial transitory viewing only.
                </p>
              </div>
            </div>

            <div className={styles.section} id="products">
              <h2 className={styles.sectionTitle}>3. Product Information</h2>
              <div className={styles.sectionContent}>
                <p>
                  All product descriptions, specifications, and pricing are subject to change without notice. We strive to provide accurate information, but cannot guarantee that all information is complete or current.
                </p>
              </div>
            </div>

            <div className={styles.section} id="pricing">
              <h2 className={styles.sectionTitle}>4. Pricing and Payment</h2>
              <div className={styles.sectionContent}>
                <p>
                  All prices are subject to change without notice. Payment terms are as specified on our website. We accept major credit cards and other payment methods as indicated.
                </p>
              </div>
            </div>

            <div className={styles.section} id="shipping">
              <h2 className={styles.sectionTitle}>5. Shipping and Delivery</h2>
              <div className={styles.sectionContent}>
                <p>
                  Shipping costs and delivery times are as specified on our website. We are not responsible for delays caused by factors beyond our control.
                </p>
              </div>
            </div>

            <div className={styles.section} id="returns">
              <h2 className={styles.sectionTitle}>6. Returns and Refunds</h2>
              <div className={styles.sectionContent}>
                <p>
                  Returns are accepted within 30 days of purchase, subject to our return policy. Refunds will be processed according to the original payment method.
                </p>
              </div>
            </div>

            <div className={styles.section} id="warranty">
              <h2 className={styles.sectionTitle}>7. Warranty</h2>
              <div className={styles.sectionContent}>
                <p>
                  All products come with manufacturer warranty as specified. Nexus Tech Hub provides additional warranty coverage for certain products.
                </p>
              </div>
            </div>

            <div className={styles.section} id="liability">
              <h2 className={styles.sectionTitle}>8. Limitation of Liability</h2>
              <div className={styles.sectionContent}>
                <p>
                  In no event shall Nexus Tech Hub or its suppliers be liable for any damages arising out of the use or inability to use the materials on our website.
                </p>
              </div>
            </div>

            <div className={styles.section} id="privacy">
              <h2 className={styles.sectionTitle}>9. Privacy Policy</h2>
              <div className={styles.sectionContent}>
                <p>
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of our website.
                </p>
              </div>
            </div>

            <div className={styles.section} id="governing-law">
              <h2 className={styles.sectionTitle}>10. Governing Law</h2>
              <div className={styles.sectionContent}>
                <p>
                  These terms and conditions are governed by and construed in accordance with the laws of the United Arab Emirates.
                </p>
              </div>
            </div>

            <div className={styles.section} id="contact">
              <h2 className={styles.sectionTitle}>11. Contact Information</h2>
              <div className={styles.sectionContent}>
                <p>
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className={styles.contactInfo}>
                  <h3>Contact Details</h3>
                  <p><strong>Email:</strong> info@nexustechhub.com</p>
                  <p><strong>Phone:</strong> +971 58 553 1029</p>
                  <p><strong>Address:</strong> Compass Building, Al Shohada Road, AL Hamra Industrial Zone-FZ, Ras Al Khaimah, UAE</p>
                </div>
              </div>
            </div>
          </div>

          {/* Back to Home */}
          <div className={styles.backToHome}>
            <Link href="/" className={styles.backLink}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
