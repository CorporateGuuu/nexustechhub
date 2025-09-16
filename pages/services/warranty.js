import React from 'react';
import Link from 'next/link';
import Layout from '../../nexus-techhub-fresh/components/Layout/Layout';
import styles from '../../styles/Services.module.css';

export default function Warranty() {
  return (
    <Layout
      title="Warranty Claims - Nexus Tech Hub"
      description="Professional warranty claims service for defective parts. Fast processing and replacement for all our repair components."
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
                <span className={styles.currentPage}>Warranty Claims</span>
              </div>

              <h1 className={styles.heroTitle}>Warranty Claims</h1>
              <p className={styles.heroDescription}>
                Hassle-free warranty service for all our repair parts. Fast processing, free replacements,
                and dedicated support for defective components within the warranty period.
              </p>

              <div className={styles.heroStats}>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>30 Days</div>
                  <div className={styles.statLabel}>Standard Warranty</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>24hrs</div>
                  <div className={styles.statLabel}>Claim Processing</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>Free</div>
                  <div className={styles.statLabel}>Replacement Shipping</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Warranty Coverage */}
        <div className={styles.benefitsSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Warranty Coverage</h2>
            <div className={styles.benefitsGrid}>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h3>Manufacturing Defects</h3>
                <p>Coverage for parts that fail due to manufacturing defects or material issues.</p>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4-5h-2V7h2v5zm4 3h-2v-9h2v9z"/>
                  </svg>
                </div>
                <h3>Premature Failure</h3>
                <p>Protection against parts that fail before their expected lifespan.</p>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <h3>Installation Damage</h3>
                <p>Coverage for damage caused during professional installation by certified technicians.</p>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13 12h7v1.5h-7V12zm0-2.5h7V11h-7V9.5zm0 5h7V16h-7v-1.5zM21 4H3c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 15h-9V6h9v13z"/>
                  </svg>
                </div>
                <h3>Compatibility Issues</h3>
                <p>Warranty for parts that fail due to documented compatibility issues.</p>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3>Extended Warranty</h3>
                <p>Optional extended warranty available for additional peace of mind.</p>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h3>Free Replacements</h3>
                <p>Free replacement parts and return shipping for approved warranty claims.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Warranty Terms */}
        <div className={styles.processSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Warranty Terms & Conditions</h2>
            <div className={styles.warrantyTerms}>
              <div className={styles.termCard}>
                <h3>Standard Warranty Period</h3>
                <ul>
                  <li>All parts: 30 days from purchase date</li>
                  <li>Screens and displays: 30 days</li>
                  <li>Batteries: 30 days</li>
                  <li>Charging components: 30 days</li>
                  <li>Repair tools: 90 days</li>
                </ul>
              </div>

              <div className={styles.termCard}>
                <h3>What's Covered</h3>
                <ul>
                  <li>Manufacturing defects</li>
                  <li>Material failures</li>
                  <li>Premature component failure</li>
                  <li>Installation-related damage</li>
                  <li>Documented compatibility issues</li>
                </ul>
              </div>

              <div className={styles.termCard}>
                <h3>What's Not Covered</h3>
                <ul>
                  <li>Physical damage from misuse</li>
                  <li>Water damage</li>
                  <li>Normal wear and tear</li>
                  <li>Damage from unqualified repairs</li>
                  <li>Parts modified or tampered with</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Claim Process */}
        <div className={styles.benefitsSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>How to File a Warranty Claim</h2>
            <div className={styles.processSteps}>
              <div className={styles.processStep}>
                <div className={styles.stepNumber}>1</div>
                <h3>Gather Information</h3>
                <p>Collect your order number, invoice, and photos of the defective part.</p>
              </div>

              <div className={styles.processStep}>
                <div className={styles.stepNumber}>2</div>
                <h3>Contact Support</h3>
                <p>Email warranty@nexustechhub.com or call +971 58 553 1029 with your details.</p>
              </div>

              <div className={styles.processStep}>
                <div className={styles.stepNumber}>3</div>
                <h3>Return the Part</h3>
                <p>We'll provide a prepaid return label for the defective component.</p>
              </div>

              <div className={styles.processStep}>
                <div className={styles.stepNumber}>4</div>
                <h3>Receive Replacement</h3>
                <p>Get your replacement part shipped free of charge within 24-48 hours.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Required Information */}
        <div className={styles.processSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Required Information for Claims</h2>
            <div className={styles.requiredInfo}>
              <div className={styles.infoItem}>
                <h3>Order Details</h3>
                <ul>
                  <li>Order number or invoice number</li>
                  <li>Date of purchase</li>
                  <li>Part description and SKU</li>
                  <li>Purchase amount</li>
                </ul>
              </div>

              <div className={styles.infoItem}>
                <h3>Defect Description</h3>
                <ul>
                  <li>Detailed description of the issue</li>
                  <li>When the problem was first noticed</li>
                  <li>Photos of the defective part</li>
                  <li>Serial number (if applicable)</li>
                </ul>
              </div>

              <div className={styles.infoItem}>
                <h3>Proof of Installation</h3>
                <ul>
                  <li>Installation date</li>
                  <li>Technician certification (if applicable)</li>
                  <li>Installation photos</li>
                  <li>Device information</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className={styles.benefitsSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Warranty FAQ</h2>
            <div className={styles.faqGrid}>
              <div className={styles.faqItem}>
                <h3>How long does warranty processing take?</h3>
                <p>Most warranty claims are processed within 24-48 hours. Complex cases may take up to 5 business days.</p>
              </div>

              <div className={styles.faqItem}>
                <h3>Do I need to return the defective part?</h3>
                <p>Yes, defective parts must be returned for inspection. We provide prepaid return shipping labels.</p>
              </div>

              <div className={styles.faqItem}>
                <h3>Can I get a refund instead of replacement?</h3>
                <p>We prioritize replacements, but refunds are available for discontinued parts or special circumstances.</p>
              </div>

              <div className={styles.faqItem}>
                <h3>What if the replacement part also fails?</h3>
                <p>Replacement parts come with full warranty coverage. Multiple failures are thoroughly investigated.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={styles.ctaSection}>
          <div className="container">
            <div className={styles.ctaContent}>
              <h2>Need to File a Warranty Claim?</h2>
              <p>Our warranty team is here to help you get your replacement parts quickly and efficiently.</p>
              <div className={styles.ctaButtons}>
                <a href="mailto:warranty@nexustechhub.com" className={styles.primaryButton}>
                  File Warranty Claim
                </a>
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
