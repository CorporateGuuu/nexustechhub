import React from 'react';
import Link from 'next/link';
import Layout from '../../nexus-techhub-fresh/components/Layout/Layout';
import styles from '../../styles/Services.module.css';

export default function CustomOrders() {
  return (
    <Layout
      title="Custom Orders - Nexus Tech Hub"
      description="Custom repair parts ordering service. Get specialized components and hard-to-find parts for your repair business."
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
                <span className={styles.currentPage}>Custom Orders</span>
              </div>

              <h1 className={styles.heroTitle}>Custom Orders</h1>
              <p className={styles.heroDescription}>
                Need specialized parts or hard-to-find components? Our custom ordering service
                connects you with premium suppliers worldwide to get exactly what you need.
              </p>

              <div className={styles.heroStats}>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>150+</div>
                  <div className={styles.statLabel}>Global Suppliers</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>7-14 days</div>
                  <div className={styles.statLabel}>Average Lead Time</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>95%</div>
                  <div className={styles.statLabel}>Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className={styles.benefitsSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Custom Ordering Services</h2>
            <div className={styles.benefitsGrid}>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3>Rare & Obsolete Parts</h3>
                <p>Source hard-to-find components for older device models and discontinued products.</p>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4-5h-2V7h2v5zm4 3h-2v-9h2v9z"/>
                  </svg>
                </div>
                <h3>Bulk Custom Orders</h3>
                <p>Large quantity orders for specific parts with custom specifications and branding.</p>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h3>Quality Assurance</h3>
                <p>All custom parts undergo rigorous testing and quality control before delivery.</p>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <h3>Dedicated Sourcing</h3>
                <p>Personal sourcing specialist to find and negotiate the best suppliers for your needs.</p>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13 12h7v1.5h-7V12zm0-2.5h7V11h-7V9.5zm0 5h7V16h-7v-1.5zM21 4H3c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 15h-9V6h9v13z"/>
                  </svg>
                </div>
                <h3>Import & Customs</h3>
                <p>Complete import assistance including customs clearance and documentation.</p>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3>Technical Consultation</h3>
                <p>Expert advice on part compatibility and technical specifications.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div className={styles.processSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Custom Order Process</h2>
            <div className={styles.processSteps}>
              <div className={styles.processStep}>
                <div className={styles.stepNumber}>1</div>
                <h3>Submit Requirements</h3>
                <p>Provide detailed specifications, quantities, and timeline for your custom order.</p>
              </div>

              <div className={styles.processStep}>
                <div className={styles.stepNumber}>2</div>
                <h3>Supplier Research</h3>
                <p>Our team researches and identifies the best suppliers for your specific requirements.</p>
              </div>

              <div className={styles.processStep}>
                <div className={styles.stepNumber}>3</div>
                <h3>Quote & Approval</h3>
                <p>Receive detailed quotes with pricing, lead times, and terms for your approval.</p>
              </div>

              <div className={styles.processStep}>
                <div className={styles.stepNumber}>4</div>
                <h3>Order Processing</h3>
                <p>Once approved, we handle ordering, quality control, and shipping logistics.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Examples Section */}
        <div className={styles.benefitsSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Common Custom Orders</h2>
            <div className={styles.examplesGrid}>
              <div className={styles.exampleCard}>
                <h3>Legacy Device Parts</h3>
                <p>iPhone 4S, 5, 6 series components and accessories</p>
                <div className={styles.exampleLeadTime}>Lead Time: 10-14 days</div>
              </div>

              <div className={styles.exampleCard}>
                <h3>Specialized Tools</h3>
                <p>Custom repair tools and specialized equipment</p>
                <div className={styles.exampleLeadTime}>Lead Time: 7-10 days</div>
              </div>

              <div className={styles.exampleCard}>
                <h3>Bulk Cable Assemblies</h3>
                <p>Custom length cables and connector configurations</p>
                <div className={styles.exampleLeadTime}>Lead Time: 14-21 days</div>
              </div>

              <div className={styles.exampleCard}>
                <h3>Branded Components</h3>
                <p>Custom branded parts and packaging solutions</p>
                <div className={styles.exampleLeadTime}>Lead Time: 21-30 days</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={styles.ctaSection}>
          <div className="container">
            <div className={styles.ctaContent}>
              <h2>Need Custom Parts?</h2>
              <p>Contact our custom ordering specialists to discuss your specific requirements and get started.</p>
              <div className={styles.ctaButtons}>
                <Link href="/contact" className={styles.primaryButton}>
                  Request Custom Quote
                </Link>
                <a href="mailto:sales@nexustechhub.com" className={styles.secondaryButton}>
                  Email: sales@nexustechhub.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
