import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage('Please enter your email address');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Thank you for subscribing!');
        setEmail('');
      } else {
        setMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setMessage('Network error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <footer className={styles.footer}>
      {/* Main Footer Content */}
      <div className={styles.footerContent}>
        <div className={styles.footerGrid}>

          {/* Company Info */}
          <div className={styles.footerSection}>
            <div className={styles.footerLogo}>
              <h3>Nexus Tech Hub</h3>
              <p className={styles.footerTagline}>Professional Mobile Repair Parts</p>
            </div>
            <p className={styles.footerDescription}>
              Your trusted wholesale partner for iPhone, Samsung, and iPad repair parts.
              Quality components with fast shipping worldwide.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink} aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className={styles.socialLink} aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className={styles.socialLink} aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className={styles.socialLink} aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.017 0C8.396 0 7.909.016 6.695.072 5.48.127 4.699.26 4.029.509c-.67.25-1.238.582-1.807.582S1.455.759.785.509C.115.26-.666.127-1.881.072-3.095.016-3.582 0-7.203 0S-8.916.016-10.13.072c-1.215.055-1.996.188-2.666.437-.67.25-1.238.582-1.807.832S-16.455.759-17.125.509c-.67-.25-1.451-.383-2.666-.437C-20.005.016-20.492 0-24.113 0s-3.582.016-4.796.072c-1.215.055-1.996.188-2.666.437-.67.25-1.238.582-1.807.832S-28.455.759-29.125.509c-.67-.25-1.451-.383-2.666-.437C-32.005.016-32.492 0-36.113 0v24c3.621 0 4.108-.016 5.322-.072 1.215-.055 1.996-.188 2.666-.437.67-.25 1.238-.582 1.807-.832s1.137-.582 1.807-.832c.67-.25 1.451-.383 2.666-.437 1.215-.055 1.702-.072 5.323-.072s4.108.016 5.322.072c1.215.055 1.996.188 2.666.437.67.25 1.238.582 1.807.832s1.137.582 1.807.832c.67.25 1.451.383 2.666.437 1.215.055 1.702.072 5.323.072V0z"/>
                  <path d="M12.017 5.838a6.179 6.179 0 100 12.358 6.179 6.179 0 000-12.358zm0 10.191a4.012 4.012 0 110-8.024 4.012 4.012 0 010 8.024zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.footerSection}>
            <h4 className={styles.footerHeading}>Quick Links</h4>
            <ul className={styles.footerLinks}>
              <li><Link href="/products">All Products</Link></li>
              <li><Link href="/products/iphone-parts">iPhone Parts</Link></li>
              <li><Link href="/products/samsung-parts">Samsung Parts</Link></li>
              <li><Link href="/products/ipad-parts">iPad Parts</Link></li>
              <li><Link href="/products/repair-tools">Repair Tools</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className={styles.footerSection}>
            <h4 className={styles.footerHeading}>Categories</h4>
            <ul className={styles.footerLinks}>
              <li><Link href="/products/iphone-screens">Screens & LCDs</Link></li>
              <li><Link href="/products/iphone-batteries">Batteries</Link></li>
              <li><Link href="/products/iphone-charging">Charging Ports</Link></li>
              <li><Link href="/products/iphone-cameras">Cameras</Link></li>
              <li><Link href="/products/samsung-screens">Samsung Screens</Link></li>
              <li><Link href="/products/samsung-batteries">Samsung Batteries</Link></li>
              <li><Link href="/products/tool-kits">Tool Kits</Link></li>
            </ul>
          </div>

          {/* Services & Support */}
          <div className={styles.footerSection}>
            <h4 className={styles.footerHeading}>Services & Support</h4>
            <ul className={styles.footerLinks}>
              <li><Link href="/services/bulk-ordering">Bulk Ordering</Link></li>
              <li><Link href="/services/custom-orders">Custom Orders</Link></li>
              <li><Link href="/services/support">Technical Support</Link></li>
              <li><Link href="/lcd-buyback">LCD Buyback</Link></li>
              <li><Link href="/services/training">Repair Training</Link></li>
              <li><Link href="/services/warranty">Warranty Claims</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className={styles.footerSection}>
            <h4 className={styles.footerHeading}>Contact Info</h4>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span>Ras Al Khaimah, UAE</span>
              </div>
              <div className={styles.contactItem}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span>+971 58 553 1029</span>
              </div>
              <div className={styles.contactItem}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span>sales@nexustechhub.com</span>
              </div>
              <div className={styles.contactItem}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span>Mon - Sat: 9AM - 6PM</span>
              </div>
            </div>
          </div>

          {/* Shipping Info */}
          <div className={styles.footerSection}>
            <h4 className={styles.footerHeading}>Shipping Partners</h4>
            <div className={styles.shippingInfo}>
              <div className={styles.shippingItem}>
                <span className={styles.shippingLogo}>FedEx</span>
                <span>FedEx</span>
              </div>
              <div className={styles.shippingItem}>
                <span className={styles.shippingLogo}>UPS</span>
                <span>UPS</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Authorized Distributors Section */}
      <div className={styles.distributorsSection}>
        <div className={styles.distributorsContent}>
          <h3 className={styles.distributorsTitle}>Authorized Distributors</h3>
          <div className={styles.distributorsGrid}>
            <div className={styles.distributorItem}>
              <div className={styles.distributorLogo}>
                <img src="/images/apple-logo.svg" alt="Apple" />
              </div>
              <span className={styles.distributorText}>Authorized Distributor</span>
            </div>
            <div className={styles.distributorItem}>
              <div className={styles.distributorLogo}>
                <img src="/images/google-logo.svg" alt="Google" />
              </div>
              <span className={styles.distributorText}>Authorized Distributor</span>
            </div>
            <div className={styles.distributorItem}>
              <div className={styles.distributorLogo}>
                <img src="/images/oneplus-logo.svg" alt="OnePlus" />
              </div>
              <span className={styles.distributorText}>Authorized Distributor</span>
            </div>
            <div className={styles.distributorItem}>
              <div className={styles.distributorLogo}>
                <img src="/images/motorola-logo.svg" alt="Motorola" />
              </div>
              <span className={styles.distributorText}>Authorized Distributor</span>
            </div>
            <div className={styles.distributorItem}>
              <div className={styles.distributorLogo}>
                <img src="/images/lg-logo.svg" alt="LG" />
              </div>
              <span className={styles.distributorText}>Authorized Distributor</span>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications Section */}
      <div className={styles.certificationsSection}>
        <div className={styles.certificationsContent}>
          <h3 className={styles.certificationsTitle}>Certifications</h3>
          <div className={styles.certificationsGrid}>
            <div className={styles.certificationItem}>
              <div className={styles.certificationLogo}>
                <img src="/images/iso-45001-logo.svg" alt="ISO 45001" />
              </div>
              <span className={styles.certificationText}>Certified</span>
            </div>
            <div className={styles.certificationItem}>
              <div className={styles.certificationLogo}>
                <img src="/images/iso-9001-logo.svg" alt="ISO 9001" />
              </div>
              <span className={styles.certificationText}>Certified</span>
            </div>
            <div className={styles.certificationItem}>
              <div className={styles.certificationLogo}>
                <img src="/images/iso-14001-logo.svg" alt="ISO 14001" />
              </div>
              <span className={styles.certificationText}>Certified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className={styles.newsletterSection}>
        <div className={styles.newsletterContent}>
          <div className={styles.newsletterText}>
            <h3>Stay Updated with Latest Parts</h3>
            <p>Subscribe to get exclusive deals and new product announcements</p>
          </div>
          <form className={styles.newsletterForm} onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className={styles.newsletterInput}
              aria-label="Email address for newsletter"
              disabled={isSubmitting}
            />
            <button
              type="submit"
              className={styles.newsletterButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          {message && (
            <div className={`${styles.message} ${message.includes('Thank you') ? styles.success : styles.error}`}>
              {message}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className={styles.footerBottom}>
        <div className={styles.footerBottomContent}>
          <div className={styles.copyright}>
            <p>&copy; 2024 Nexus Tech Hub. All rights reserved.</p>
          </div>
          <div className={styles.footerBottomLinks}>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/sitemap">Sitemap</Link>
          </div>
          <div className={styles.paymentMethods}>
            <span className={styles.paymentLabel}>We Accept:</span>
            <div className={styles.paymentIcons}>
              <span className={styles.paymentIcon}>Credit Cards</span>
              <span className={styles.paymentIcon}>Cash</span>
              <span className={styles.paymentIcon}>Bank Transfer</span>
              <span className={styles.paymentIcon}>Mobile Payment</span>
              <span className={styles.paymentIcon}>Bitcoin</span>
              <span className={styles.paymentIcon}>Cryptocurrency</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
