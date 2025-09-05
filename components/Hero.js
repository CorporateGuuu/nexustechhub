import React from 'react';
import SearchBar from './SearchBar';
import OptimizedImage from './OptimizedImage';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero} role="banner" aria-labelledby="hero-heading">
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 id="hero-heading" className={styles.title}>
            Professional Repair Parts & Tools
          </h1>
          <p className={styles.subtitle}>
            Your trusted partner for high-quality phone, tablet, and laptop repair parts in the UAE.
            Fast shipping, competitive prices, and expert support.
          </p>

          <div className={styles.searchSection} role="search" aria-label="Search for products">
            <SearchBar placeholder="Search for iPhone parts, Samsung batteries, repair tools..." />
          </div>

          <nav className={styles.buttons} role="navigation" aria-label="Main actions">
            <a href="/products" className={`${styles.btn} ${styles.btnPrimary}`} aria-describedby="shop-description">
              Shop Now
            </a>
            <span id="shop-description" className={styles.srOnly}>
              Browse our collection of repair parts and tools
            </span>
            <a href="/contact" className={`${styles.btn} ${styles.btnSecondary}`} aria-describedby="contact-description">
              Contact Us
            </a>
            <span id="contact-description" className={styles.srOnly}>
              Get in touch with our support team
            </span>
          </nav>

          <div className={styles.stats} role="region" aria-labelledby="stats-heading">
            <h2 id="stats-heading" className={styles.srOnly}>Company Statistics</h2>
            <div className={styles.stat}>
              <span className={styles.statNumber} aria-label="Over 10,000 parts available">10,000+</span>
              <span className={styles.statLabel}>Parts Available</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber} aria-label="24 hours a day, 7 days a week">24/7</span>
              <span className={styles.statLabel}>Support</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber} aria-label="United Arab Emirates">UAE</span>
              <span className={styles.statLabel}>Fast Delivery</span>
            </div>
          </div>
        </div>

        <figure className={styles.image} role="img" aria-labelledby="hero-image-caption">
          <OptimizedImage
            src="/images/hero-repair-parts.svg"
            alt="Professional mobile repair parts and tools - Nexus TechHub UAE"
            width={600}
            height={400}
            priority={true}
            className={styles.heroImage}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <figcaption id="hero-image-caption" className={styles.srOnly}>
            Illustration showing various mobile repair tools and parts including screwdrivers, screens, and batteries
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
