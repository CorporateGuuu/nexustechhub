import React from 'react';
import Link from 'next/link';
import Layout from '../../nexus-techhub-fresh/components/Layout/Layout';
import styles from '../../styles/Services.module.css';

export default function Support() {
  return (
    <Layout
      title="Technical Support - Nexus Tech Hub"
      description="Professional technical support for repair technicians. Get expert help with device repairs, part compatibility, and troubleshooting."
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
                <span className={styles.currentPage}>Technical Support</span>
              </div>

              <h1 className={styles.heroTitle}>Technical Support</h1>
              <p className={styles.heroDescription}>
                Expert technical assistance for repair professionals. Get help with complex repairs,
                part compatibility issues, and device troubleshooting from certified technicians.
              </p>

              <div className={styles.heroStats}>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>24/7</div>
                  <div className={styles.statLabel}>Support Available</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>15 min</div>
                  <div className={styles.statLabel}>Average Response</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>98%</div>
                  <div className={styles.statLabel}>Resolution Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Support Services */}
        <div className={styles.benefitsSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Support Services</h2>
            <div className={styles.benefitsGrid}>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h3>Repair Guidance</h3>
                <p>Step-by-step repair instructions and troubleshooting guides for complex repairs.</p>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4-5h-2V7h2v5zm4 3h-2v-9h2v9z"/>
                  </svg>
                </div>
                <h3>Part Compatibility</h3>
                <p>Expert advice on part compatibility and interchangeability across device models.</p>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <h3>Technical Documentation</h3>
                <p>Access to detailed technical documentation, schematics, and service manuals.</p>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3>Remote Diagnostics</h3>
                <p>Remote troubleshooting and diagnostics support for repair issues.</p>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13 12h7v1.5h-7V12zm0-2.5h7V11h-7V9.5zm0 5h7V16h-7v-1.5zM21 4H3c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 15h-9V6h9v13z"/>
                  </svg>
                </div>
                <h3>Software Support</h3>
                <p>Assistance with device software, firmware updates, and diagnostic tools.</p>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3>Training Resources</h3>
                <p>Access to video tutorials, repair guides, and training materials.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Support Channels */}
        <div className={styles.processSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Support Channels</h2>
            <div className={styles.supportChannels}>
              <div className={styles.channelCard}>
                <div className={styles.channelIcon}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <h3>Email Support</h3>
                <p>support@nexustechhub.com</p>
                <p className={styles.channelResponse}>Response within 2 hours</p>
              </div>

              <div className={styles.channelCard}>
                <div className={styles.channelIcon}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </div>
                <h3>Phone Support</h3>
                <p>+971 58 553 1029</p>
                <p className={styles.channelResponse}>Mon-Sat: 9AM-6PM GST</p>
              </div>

              <div className={styles.channelCard}>
                <div className={styles.channelIcon}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h3>Live Chat</h3>
                <p>Available on website</p>
                <p className={styles.channelResponse}>24/7 instant support</p>
              </div>

              <div className={styles.channelCard}>
                <div className={styles.channelIcon}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4-5h-2V7h2v5zm4 3h-2v-9h2v9z"/>
                  </svg>
                </div>
                <h3>WhatsApp</h3>
                <p>+971 58 553 1029</p>
                <p className={styles.channelResponse}>Business hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className={styles.benefitsSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
            <div className={styles.faqGrid}>
              <div className={styles.faqItem}>
                <h3>How quickly can I get support?</h3>
                <p>Email responses within 2 hours during business hours, live chat instant, phone support during business hours.</p>
              </div>

              <div className={styles.faqItem}>
                <h3>Do you support all device brands?</h3>
                <p>Yes, we provide support for iPhone, Samsung, iPad, and other major smartphone and tablet brands.</p>
              </div>

              <div className={styles.faqItem}>
                <h3>Is technical support free?</h3>
                <p>Basic technical support is free for all customers. Premium support packages available for high-volume repair shops.</p>
              </div>

              <div className={styles.faqItem}>
                <h3>Can you help with custom repairs?</h3>
                <p>Yes, our technical team can provide guidance on custom repairs and modifications.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={styles.ctaSection}>
          <div className="container">
            <div className={styles.ctaContent}>
              <h2>Need Technical Support?</h2>
              <p>Our expert technicians are ready to help you with any repair questions or issues.</p>
              <div className={styles.ctaButtons}>
                <a href="mailto:support@nexustechhub.com" className={styles.primaryButton}>
                  Email Support
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
