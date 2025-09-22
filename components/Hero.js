import React from 'react';
import Link from 'next/link';
import styles from '../styles/Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroText}>
              <h1>Professional Mobile Repair Parts & Wholesale Supplies</h1>
              <p>Complete range of iPhone, Samsung, and iPad replacement parts with quality guarantee. Trusted by repair shops worldwide.</p>
              <div className={styles.heroButtons}>
                <Link href="/products" className={styles.primaryBtn}>
                  Shop Now
                </Link>
                <Link href="/contact" className={styles.secondaryBtn}>
                  Get Quote
                </Link>
              </div>
              <div className={styles.heroFeatures}>
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>✓</span>
                  <span>Quality Guaranteed</span>
                </div>
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>✓</span>
                  <span>Fast Shipping</span>
                </div>
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>✓</span>
                  <span>Bulk Discounts</span>
                </div>
              </div>
            </div>
            <div className={styles.heroImage}>
              <img
                src="/images/hero/repair-workshop.jpg"
                alt="Professional mobile repair workshop"
                onError={(e) => {
                  e.target.src = '/images/placeholder.svg';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
