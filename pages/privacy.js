import React from 'react';
import Link from 'next/link';
import Layout from '../nexus-techhub-fresh/components/Layout/Layout';
import styles from '../styles/Legal.module.css';

export default function Privacy() {
  const sections = [
    {
      title: 'Information We Collect',
      content: [
        'Personal information you provide (name, email, phone, address)',
        'Payment information for order processing',
        'Order history and preferences',
        'Device information for technical support',
        'Website usage data and analytics'
      ]
    },
    {
      title: 'How We Use Your Information',
      content: [
        'Process and fulfill your orders',
        'Provide customer support and technical assistance',
        'Send order confirmations and shipping updates',
        'Improve our products and services',
        'Send marketing communications (with consent)',
        'Ensure website security and prevent fraud'
      ]
    },
    {
      title: 'Information Sharing',
      content: [
        'We do not sell your personal information to third parties',
        'Limited sharing with service providers for order fulfillment',
        'Legal compliance when required by law',
        'Business transfers in case of company sale',
        'With your explicit consent for specific purposes'
      ]
    },
    {
      title: 'Data Security',
      content: [
        'Industry-standard encryption for data transmission',
        'Secure storage of personal and payment information',
        'Regular security audits and updates',
        'Employee access controls and training',
        'Incident response procedures for data breaches'
      ]
    },
    {
      title: 'Your Rights',
      content: [
        'Access and review your personal information',
        'Correct inaccurate or incomplete data',
        'Request deletion of your personal information',
        'Opt-out of marketing communications',
        'Data portability for your information',
        'Withdraw consent for data processing'
      ]
    },
    {
      title: 'Cookies and Tracking',
      content: [
        'Essential cookies for website functionality',
        'Analytics cookies to improve user experience',
        'Marketing cookies for targeted advertising',
        'Cookie preferences can be managed in browser settings',
        'Third-party cookies from service providers'
      ]
    }
  ];

  const contactInfo = {
    email: 'privacy@nexustechhub.com',
    phone: '+971 50 123 4567',
    address: 'Ras Al Khaimah, UAE'
  };

  return (
    <Layout
      title="Privacy Policy - Nexus Tech Hub | Data Protection & Privacy"
      description="Learn about how Nexus Tech Hub collects, uses, and protects your personal information. Our commitment to data privacy and security."
    >
      <div className={styles.legalPage}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>Privacy Policy</span>
        </div>

        {/* Header */}
        <div className={styles.header}>
          <h1>Privacy Policy</h1>
          <p>Last updated: January 2025</p>
        </div>

        {/* Introduction */}
        <div className={styles.intro}>
          <div className={styles.container}>
            <p>
              At Nexus Tech Hub, we are committed to protecting your privacy and ensuring the security
              of your personal information. This Privacy Policy explains how we collect, use, and
              safeguard your data when you use our website and services.
            </p>
            <p>
              By using our services, you agree to the collection and use of information in accordance
              with this policy. We will not use or share your information except as described in this
              Privacy Policy.
            </p>
          </div>
        </div>

        {/* Policy Sections */}
        <div className={styles.sections}>
          <div className={styles.container}>
            {sections.map((section, index) => (
              <div key={index} className={styles.section}>
                <h2>{section.title}</h2>
                <ul>
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className={styles.contactSection}>
          <div className={styles.container}>
            <h2>Contact Us About Privacy</h2>
            <p>
              If you have any questions about this Privacy Policy or our data practices,
              please contact our Data Protection Officer:
            </p>

            <div className={styles.contactGrid}>
              <div className={styles.contactItem}>
                <h3>📧 Email</h3>
                <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
              </div>
              <div className={styles.contactItem}>
                <h3>📞 Phone</h3>
                <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
              </div>
              <div className={styles.contactItem}>
                <h3>📍 Address</h3>
                <address>{contactInfo.address}</address>
              </div>
            </div>
          </div>
        </div>

        {/* Updates Section */}
        <div className={styles.updatesSection}>
          <div className={styles.container}>
            <h2>Policy Updates</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices
              or legal requirements. We will notify you of any material changes by posting the new
              Privacy Policy on this page and updating the "Last updated" date.
            </p>
            <p>
              We encourage you to review this Privacy Policy periodically to stay informed about
              how we protect your information.
            </p>
          </div>
        </div>

        {/* Related Links */}
        <div className={styles.relatedLinks}>
          <div className={styles.container}>
            <h2>Related Policies</h2>
            <div className={styles.linksGrid}>
              <Link href="/terms" className={styles.policyLink}>
                <h3>Terms of Service</h3>
                <p>Our terms and conditions for using our services</p>
                <span className={styles.linkArrow}>→</span>
              </Link>
              <Link href="/contact" className={styles.policyLink}>
                <h3>Contact Us</h3>
                <p>Get in touch with our customer service team</p>
                <span className={styles.linkArrow}>→</span>
              </Link>
              <Link href="/faq" className={styles.policyLink}>
                <h3>FAQ</h3>
                <p>Find answers to common questions</p>
                <span className={styles.linkArrow}>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Back to Top */}
        <div className={styles.backToTop}>
          <Link href="/" className={styles.backLink}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </Layout>
  );
}
