import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <h3 className={styles.title}>Nexus TechHub</h3>
            <p className={styles.description}>
              Your trusted partner for professional repair parts & tools in the UAE.
              Quality products, fast shipping, and expert support.
            </p>
            <div className={styles.contact}>
              <p>📍 FAMC3062</p>
              <p>Compass Building, Al Shohada Road</p>
              <p>AL Hamra Industrial Zone-FZ</p>
              <p>Ras Al Khaimah, United Arab Emirates</p>
              <p>📞 +971 58 553 1029</p>
            </div>
          </div>

          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Products</h4>
            <ul className={styles.links}>
              <li><a href="/iphone-parts">iPhone Parts</a></li>
              <li><a href="/samsung-parts">Samsung Parts</a></li>
              <li><a href="/ipad-parts">iPad Parts</a></li>
              <li><a href="/repair-tools">Repair Tools</a></li>
              <li><a href="/lcd-buyback">LCD Buyback</a></li>
            </ul>
          </div>

          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Support</h4>
            <ul className={styles.links}>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/shipping">Shipping Info</a></li>
              <li><a href="/returns">Returns</a></li>
              <li><a href="/warranty">Warranty</a></li>
              <li><a href="/faq">FAQ</a></li>
            </ul>
          </div>

          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Connect</h4>
            <div className={styles.social}>
              <a href="https://wa.me/971585531029" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
              <a href="mailto:info@nexustechhub.com">
                Email
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; 2024 Nexus TechHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
