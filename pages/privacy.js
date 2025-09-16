import React from 'react';
import Link from 'next/link';
import Layout from '../nexus-techhub-fresh/components/Layout/Layout';
import styles from '../styles/Terms.module.css';

function PrivacyPolicy() {
  return (
    <Layout
      title="Privacy Policy - Nexus Tech Hub"
      description="Learn about how Nexus Tech Hub collects, uses, and protects your personal information."
    >
      <div className={styles.legalPage}>
        <div className={styles.container}>
          {/* Page Header */}
          <div className={styles.pageHeader}>
            <h1>Privacy Policy</h1>
            <div className={styles.lastUpdated}>Last updated: September 15, 2025</div>
          </div>

          {/* Table of Contents */}
          <div className={styles.tableOfContents}>
            <div className={styles.tocTitle}>Table of Contents</div>
            <div className={styles.tocList}>
              <div className={styles.tocItem}>
                <a href="#introduction" className={styles.tocLink}>1. Introduction</a>
              </div>
              <div className={styles.tocItem}>
                <a href="#information-collect" className={styles.tocLink}>2. Information We Collect</a>
              </div>
              <div className={styles.tocItem}>
                <a href="#how-we-use" className={styles.tocLink}>3. How We Use Your Information</a>
              </div>
              <div className={styles.tocItem}>
                <a href="#disclosure" className={styles.tocLink}>4. Disclosure of Your Information</a>
              </div>
              <div className={styles.tocItem}>
                <a href="#cookies" className={styles.tocLink}>5. Cookies and Tracking Technologies</a>
              </div>
              <div className={styles.tocItem}>
                <a href="#privacy-rights" className={styles.tocLink}>6. Your Privacy Rights</a>
              </div>
              <div className={styles.tocItem}>
                <a href="#data-security" className={styles.tocLink}>7. Data Security</a>
              </div>
              <div className={styles.tocItem}>
                <a href="#children-privacy" className={styles.tocLink}>8. Children's Privacy</a>
              </div>
              <div className={styles.tocItem}>
                <a href="#changes" className={styles.tocLink}>9. Changes to This Privacy Policy</a>
              </div>
              <div className={styles.tocItem}>
                <a href="#contact-privacy" className={styles.tocLink}>10. Contact Us</a>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className={styles.contentSection}>
            <div className={styles.section} id="introduction">
              <h2 className={styles.sectionTitle}>1. Introduction</h2>
              <div className={styles.sectionContent}>
                <p>
                  Nexus Tech Hub ("we," "our," or "us") respects your privacy and is committed to protecting your personal information.
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website,
                  including any other media form, media channel, mobile website, or mobile application related or connected thereto (collectively, the "Site").
                </p>
                <p>
                  Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the Site.
                </p>
              </div>
            </div>

            <div className={styles.section} id="information-collect">
              <h2 className={styles.sectionTitle}>2. Information We Collect</h2>
              <div className={styles.sectionContent}>
                <h3>Personal Information</h3>
                <p>We may collect personal information that you voluntarily provide to us when you:</p>
                <ul>
                  <li>Register on the Site</li>
                  <li>Place an order</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Participate in contests, surveys, or promotions</li>
                  <li>Contact our customer service</li>
                </ul>
                <p>The personal information we may collect includes:</p>
                <ul>
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Mailing address</li>
                  <li>Phone number</li>
                  <li>Payment information (credit card numbers, billing address)</li>
                </ul>

                <h3>Automatically Collected Information</h3>
                <p>When you access the Site, we may automatically collect certain information, including:</p>
                <ul>
                  <li>Device information (browser type, operating system, device type)</li>
                  <li>IP address</li>
                  <li>Browsing actions and patterns</li>
                  <li>Referring website</li>
                  <li>Date and time of access</li>
                </ul>
              </div>
            </div>

            <div className={styles.section} id="how-we-use">
              <h2 className={styles.sectionTitle}>3. How We Use Your Information</h2>
              <div className={styles.sectionContent}>
                <p>We may use the information we collect for various purposes, including:</p>
                <ul>
                  <li>Processing and fulfilling orders</li>
                  <li>Creating and managing your account</li>
                  <li>Providing customer service</li>
                  <li>Sending transactional emails (order confirmations, shipping updates)</li>
                  <li>Sending marketing communications (if you've opted in)</li>
                  <li>Improving our website and products</li>
                  <li>Analyzing usage patterns and trends</li>
                  <li>Detecting and preventing fraud</li>
                  <li>Complying with legal obligations</li>
                </ul>
              </div>
            </div>

            <div className={styles.section} id="disclosure">
              <h2 className={styles.sectionTitle}>4. Disclosure of Your Information</h2>
              <div className={styles.sectionContent}>
                <p>We may share your information in the following situations:</p>

                <h3>Business Partners and Service Providers</h3>
                <p>
                  We may share your information with third-party service providers who perform services on our behalf, such as payment processing,
                  order fulfillment, data analysis, email delivery, hosting services, and customer service.
                </p>

                <h3>Legal Requirements</h3>
                <p>
                  We may disclose your information if required to do so by law or in response to valid requests by public authorities
                  (e.g., a court or government agency).
                </p>

                <h3>Business Transfers</h3>
                <p>
                  We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets,
                  financing, or acquisition of all or a portion of our business to another company.
                </p>
              </div>
            </div>

            <div className={styles.section} id="cookies">
              <h2 className={styles.sectionTitle}>5. Cookies and Tracking Technologies</h2>
              <div className={styles.sectionContent}>
                <p>
                  We use cookies and similar tracking technologies to track activity on our Site and store certain information.
                  Cookies are files with a small amount of data that may include an anonymous unique identifier.
                </p>
                <p>
                  You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However,
                  if you do not accept cookies, you may not be able to use some portions of our Site.
                </p>
                <p>We use cookies for:</p>
                <ul>
                  <li>Keeping you signed in</li>
                  <li>Understanding how you use our site</li>
                  <li>Remembering items in your shopping cart</li>
                  <li>Personalizing your experience</li>
                </ul>
              </div>
            </div>

            <div className={styles.section} id="privacy-rights">
              <h2 className={styles.sectionTitle}>6. Your Privacy Rights</h2>
              <div className={styles.sectionContent}>
                <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
                <ul>
                  <li>Right to access your personal information</li>
                  <li>Right to correct inaccurate information</li>
                  <li>Right to request deletion of your information</li>
                  <li>Right to restrict processing of your information</li>
                  <li>Right to data portability</li>
                  <li>Right to object to processing</li>
                </ul>
                <p>
                  To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
                </p>
              </div>
            </div>

            <div className={styles.section} id="data-security">
              <h2 className={styles.sectionTitle}>7. Data Security</h2>
              <div className={styles.sectionContent}>
                <p>
                  We have implemented appropriate technical and organizational security measures designed to protect the security of any personal
                  information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over
                  the Internet or information storage technology can be guaranteed to be 100% secure.
                </p>
              </div>
            </div>

            <div className={styles.section} id="children-privacy">
              <h2 className={styles.sectionTitle}>8. Children's Privacy</h2>
              <div className={styles.sectionContent}>
                <p>
                  Our Site is not intended for children under 13 years of age. We do not knowingly collect personal information from children
                  under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
                </p>
              </div>
            </div>

            <div className={styles.section} id="changes">
              <h2 className={styles.sectionTitle}>9. Changes to This Privacy Policy</h2>
              <div className={styles.sectionContent}>
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page
                  and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
                </p>
              </div>
            </div>

            <div className={styles.section} id="contact-privacy">
              <h2 className={styles.sectionTitle}>10. Contact Us</h2>
              <div className={styles.sectionContent}>
                <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
                <div className={styles.contactInfo}>
                  <h3>Contact Details</h3>
                  <p><strong>Email:</strong> privacy@nexustechhub.com</p>
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

export default React.memo(PrivacyPolicy);
