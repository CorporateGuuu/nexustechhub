import React from 'react';
import Link from 'next/link';
import styles from './PromoBanner.module.css';

const PromoBanner = () => {
  const promos = [
    {
      id: 1,
      title: 'Free Shipping',
      subtitle: 'On orders over $50',
      description: 'Get free standard shipping on all orders over $50. No code needed!',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="15" height="13"></rect>
          <polygon points="16,8 20,8 23,11 23,16 16,16 16,8"></polygon>
          <circle cx="5.5" cy="18.5" r="2.5"></circle>
          <circle cx="18.5" cy="18.5" r="2.5"></circle>
        </svg>
      ),
      gradient: 'linear-gradient(135deg, #20b2aa, #4fd1c7)'
    },
    {
      id: 2,
      title: 'Expert Support',
      subtitle: '24/7 Technical Help',
      description: 'Our certified technicians are here to help with installation and troubleshooting.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
          <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
        </svg>
      ),
      gradient: 'linear-gradient(135deg, #38a169, #68d391)'
    },
    {
      id: 3,
      title: 'Quality Guarantee',
      subtitle: '90-Day Warranty',
      description: 'All parts come with our comprehensive 90-day warranty for peace of mind.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          <path d="m9 12 2 2 4-4"></path>
        </svg>
      ),
      gradient: 'linear-gradient(135deg, #4fd1c7, #20b2aa)'
    }
  ];

  return (
    <section className={styles.promoBanner}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Why Choose Nexus TechHub?</h2>
          <p className={styles.subtitle}>
            Experience the difference with our premium UAE service and quality parts
          </p>
        </div>

        <div className={styles.promosGrid}>
          {promos.map((promo) => (
            <div
              key={promo.id}
              className={styles.promoCard}
              style={{ background: promo.gradient }}
            >
              <div className={styles.cardContent}>
                <div className={styles.iconContainer}>
                  {promo.icon}
                </div>

                <div className={styles.textContent}>
                  <h3 className={styles.promoTitle}>{promo.title}</h3>
                  <p className={styles.promoSubtitle}>{promo.subtitle}</p>
                  <p className={styles.promoDescription}>{promo.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.specialOffer}>
          <div className={styles.offerContent}>
            <div className={styles.offerText}>
              <h3 className={styles.offerTitle}>🎉 Limited Time Offer</h3>
              <p className={styles.offerDescription}>
                Get <strong>15% OFF</strong> your first order with code <strong>WELCOME15</strong>
              </p>
            </div>
            <div className={styles.offerActions}>
              <Link href="/products" className={styles.shopNowBtn}>
                Shop Now
              </Link>
              <span className={styles.offerCode}>Code: WELCOME15</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
