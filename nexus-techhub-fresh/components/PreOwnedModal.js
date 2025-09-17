import React from 'react';
import styles from './PreOwnedModal.module.css';

const PreOwnedModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Pre-Owned Devices</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.heroSection}>
            <h3>Quality Pre-Owned Devices</h3>
            <p>Discover our carefully inspected and refurbished pre-owned devices at competitive prices.</p>
          </div>

          <div className={styles.deviceCategories}>
            <div className={styles.category}>
              <h4>iPhone Series</h4>
              <ul>
                <li>iPhone 15 Pro Max</li>
                <li>iPhone 15 Pro</li>
                <li>iPhone 15 Plus</li>
                <li>iPhone 15</li>
                <li>iPhone 14 Pro Max</li>
                <li>iPhone 14 Pro</li>
                <li>iPhone 14 Plus</li>
                <li>iPhone 14</li>
              </ul>
            </div>

            <div className={styles.category}>
              <h4>Samsung Galaxy</h4>
              <ul>
                <li>Galaxy S24 Ultra</li>
                <li>Galaxy S24 Plus</li>
                <li>Galaxy S24</li>
                <li>Galaxy S23 Ultra</li>
                <li>Galaxy S23 Plus</li>
                <li>Galaxy S23</li>
                <li>Galaxy Note 20 Ultra</li>
                <li>Galaxy Note 20</li>
              </ul>
            </div>

            <div className={styles.category}>
              <h4>iPad Series</h4>
              <ul>
                <li>iPad Pro 12.9"</li>
                <li>iPad Pro 11"</li>
                <li>iPad Air</li>
                <li>iPad</li>
                <li>iPad Mini</li>
              </ul>
            </div>

            <div className={styles.category}>
              <h4>Other Devices</h4>
              <ul>
                <li>Apple Watch Series</li>
                <li>Google Pixel</li>
                <li>Motorola Phones</li>
                <li>Game Consoles</li>
              </ul>
            </div>
          </div>

          <div className={styles.features}>
            <div className={styles.feature}>
              <h5>✓ Quality Assured</h5>
              <p>All devices undergo thorough testing and inspection</p>
            </div>
            <div className={styles.feature}>
              <h5>✓ Warranty Included</h5>
              <p>30-day warranty on all pre-owned devices</p>
            </div>
            <div className={styles.feature}>
              <h5>✓ Competitive Pricing</h5>
              <p>Significant savings compared to new devices</p>
            </div>
          </div>

          <div className={styles.ctaSection}>
            <button className={styles.viewAllButton} onClick={onClose}>
              View All Pre-Owned Devices
            </button>
            <p className={styles.contactInfo}>
              Contact us for specific device availability and pricing
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreOwnedModal;
