import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.newsletter}>
        <h3>Subscribe to our Newsletter</h3>
        <form>
          <input type="email" placeholder="Enter your email" aria-label="Email address" />
          <button type="submit">Subscribe</button>
        </form>
      </div>

      <div className={styles.services}>
        <div className={styles.serviceTile}>
          <h4>Fast Shipping</h4>
          <p>Get your parts quickly with our reliable shipping.</p>
        </div>
        <div className={styles.serviceTile}>
          <h4>Quality Guarantee</h4>
          <p>All parts come with a quality guarantee for peace of mind.</p>
        </div>
        <div className={styles.serviceTile}>
          <h4>Expert Support</h4>
          <p>Our team is here to help you with any questions or issues.</p>
        </div>
      </div>

      <div className={styles.links}>
        <ul>
          <li><a href="/about">About Us</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/privacy">Privacy Policy</a></li>
          <li><a href="/terms">Terms of Service</a></li>
        </ul>
      </div>

      <div className={styles.payment}>
        <p>&copy; 2024 Nexus TechHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
