import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import styles from '../styles/Legal.module.css';

export default function Terms() {
  const sections = [
    {
      title: 'Acceptance of Terms',
      content: [
        'By accessing and using Nexus Tech Hub\'s website and services, you accept and agree to be bound by the terms and provision of this agreement.',
        'If you do not agree to abide by the above, please do not use this service.',
        'These terms apply to all visitors, users, and others who access or use our service.'
      ]
    },
    {
      title: 'Products and Services',
      content: [
        'We offer mobile device repair parts, tools, and related services for professional technicians.',
        'All products are subject to availability and may be discontinued without notice.',
        'We reserve the right to modify product specifications, pricing, and availability.',
        'Custom orders are subject to separate terms and conditions as outlined in our custom order process.'
      ]
    },
    {
      title: 'Pricing and Payment',
      content: [
        'All prices are subject to change without notice.',
        'Payment is due at the time of order unless otherwise arranged.',
        'We accept various payment methods as displayed at checkout.',
        'Taxes and shipping charges will be added to the order total.',
        'All payments are processed securely through encrypted connections.'
      ]
    },
    {
      title: 'Shipping and Delivery',
      content: [
        'We ship worldwide with various shipping options available.',
        'Delivery times are estimates and not guaranteed.',
        'Risk of loss passes to the buyer upon delivery to the carrier.',
        'Additional charges may apply for remote locations or special handling.',
        'We are not responsible for delays caused by customs or carrier issues.'
      ]
    },
    {
      title: 'Returns and Warranty',
      content: [
        'Products may be returned within 30 days of purchase for a full refund.',
        'Items must be in original condition and packaging.',
        'Return shipping costs are the responsibility of the buyer unless the item is defective.',
        'Our warranty covers manufacturing defects for 30 days from purchase.',
        'Warranty does not cover misuse, accidents, or unauthorized modifications.'
      ]
    },
    {
      title: 'User Accounts',
      content: [
        'You are responsible for maintaining the confidentiality of your account credentials.',
        'You agree to provide accurate and complete information when creating an account.',
        'You are responsible for all activities that occur under your account.',
        'We reserve the right to terminate accounts that violate these terms.',
        'Account information may be used for order processing and customer service.'
      ]
    },
    {
      title: 'Prohibited Uses',
      content: [
        'Using our services for any unlawful purpose or to solicit others to perform unlawful acts.',
        'Attempting to gain unauthorized access to our systems or networks.',
        'Interfering with the proper functioning of our website or services.',
        'Using automated tools to access our services without permission.',
        'Posting false, misleading, or defamatory content.'
      ]
    },
    {
      title: 'Intellectual Property',
      content: [
        'All content on our website is owned by Nexus Tech Hub or our licensors.',
        'You may not reproduce, distribute, or create derivative works without permission.',
        'Our trademarks, service marks, and trade dress may not be used without authorization.',
        'Product images and descriptions are for reference only.',
        'Copyright infringement will result in account termination and legal action.'
      ]
    }
  ];

  const contactInfo = {
    email: 'legal@nexustechhub.com',
    phone: '+971 50 123 4567',
    address: 'Ras Al Khaimah, UAE'
  };

  return (
    <Layout
      title="Terms of Service - Nexus Tech Hub | Terms & Conditions"
      description="Read our terms of service and conditions for using Nexus Tech Hub's website and services. Legal agreements and user guidelines."
    >
      <div className={styles.legalPage}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>Terms of Service</span>
        </div>

        {/* Header */}
        <div className={styles.header}>
          <h1>Terms of Service</h1>
          <p>Last updated: January 2025</p>
        </div>

        {/* Introduction */}
        <div className={styles.intro}>
          <div className={styles.container}>
            <p>
              Welcome to Nexus Tech Hub. These Terms of Service ("Terms") govern your use of our website,
              products, and services. Please read these Terms carefully before using our services.
            </p>
            <p>
              By accessing or using our services, you agree to be bound by these Terms. If you disagree
              with any part of these terms, then you may not access our services.
            </p>
          </div>
        </div>

        {/* Terms Sections */}
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

        {/* Limitation of Liability */}
        <div className={styles.specialSection}>
          <div className={styles.container}>
            <h2>Limitation of Liability</h2>
            <p>
              In no event shall Nexus Tech Hub, nor its directors, employees, partners, agents, suppliers,
              or affiliates, be liable for any indirect, incidental, special, consequential, or punitive
              damages, including without limitation, loss of profits, data, use, goodwill, or other
              intangible losses, resulting from your use of our services.
            </p>
            <p>
              Our total liability shall not exceed the amount paid by you for the products or services
              that are the subject of the claim.
            </p>
          </div>
        </div>

        {/* Governing Law */}
        <div className={styles.specialSection}>
          <div className={styles.container}>
            <h2>Governing Law</h2>
            <p>
              These Terms shall be interpreted and governed by the laws of the United Arab Emirates,
              without regard to its conflict of law provisions. Our failure to enforce any right or
              provision of these Terms will not be considered a waiver of those rights.
            </p>
            <p>
              Any disputes arising from these Terms shall be resolved through binding arbitration
              in Ras Al Khaimah, UAE.
            </p>
          </div>
        </div>

        {/* Changes to Terms */}
        <div className={styles.updatesSection}>
          <div className={styles.container}>
            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms at any time. If a revision is
              material, we will try to provide at least 30 days notice prior to any new terms taking effect.
            </p>
            <p>
              What constitutes a material change will be determined at our sole discretion. By continuing
              to access or use our service after those revisions become effective, you agree to be bound
              by the revised terms.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className={styles.contactSection}>
          <div className={styles.container}>
            <h2>Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us:
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

        {/* Related Links */}
        <div className={styles.relatedLinks}>
          <div className={styles.container}>
            <h2>Related Policies</h2>
            <div className={styles.linksGrid}>
              <Link href="/privacy" className={styles.policyLink}>
                <h3>Privacy Policy</h3>
                <p>How we collect and protect your personal information</p>
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
