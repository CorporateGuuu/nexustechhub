import React from 'react';
import SearchBar from './SearchBar';
import OptimizedImage from './OptimizedImage';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Professional Repair Parts & Tools
          </h1>
          <p className={styles.subtitle}>
            Your trusted partner for high-quality phone, tablet, and laptop repair parts in the UAE.
            Fast shipping, competitive prices, and expert support.
          </p>
          <div className={styles.searchSection}>
            <SearchBar placeholder="Search for iPhone parts, Samsung batteries, repair tools..." />
          </div>

          <div className={styles.buttons}>
            <a href="/products" className={`${styles.btn} ${styles.btnPrimary}`}>
              Shop Now
            </a>
            <a href="/contact" className={`${styles.btn} ${styles.btnSecondary}`}>
              Contact Us
            </a>
          </div>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>10,000+</span>
              <span className={styles.statLabel}>Parts Available</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>24/7</span>
              <span className={styles.statLabel}>Support</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>UAE</span>
              <span className={styles.statLabel}>Fast Delivery</span>
            </div>
          </div>
        </div>
        <div className={styles.image}>
          <OptimizedImage
            src="/images/hero-repair-parts.svg"
            alt="Professional mobile repair parts and tools - Nexus TechHub UAE"
            width={600}
            height={400}
            priority={true}
            className={styles.heroImage}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
