import React from 'react';
import Link from 'next/link';
import styles from './Hero.module.css';

const Hero = () => {
  const slides = [
    {
      title: "Premium iPhone Parts",
      subtitle: "Genuine Apple components with warranty",
      image: "/images/products/iphone-15-pro-max-screen.jpg",
      cta: "Shop iPhone Parts",
      link: "/products/iphone-parts"
    },
    {
      title: "Samsung Galaxy Repairs",
      subtitle: "Complete range of Samsung parts & tools",
      image: "/images/products/samsung-s24-ultra-screen.jpg",
      cta: "Shop Samsung Parts",
      link: "/products/samsung-parts"
    },
    {
      title: "Professional Tools",
      subtitle: "iFixit certified repair equipment",
      image: "/images/products/professional-toolkit.jpg",
      cta: "Shop Tools",
      link: "/products/repair-tools"
    }
  ];

  const nextSlide = () => {
    // For now, just log the action - can be enhanced later
    console.log('Next slide clicked');
  };

  const prevSlide = () => {
    // For now, just log the action - can be enhanced later
    console.log('Previous slide clicked');
  };

  return (
    <section className={styles.hero}>
      <div className={styles.heroContainer}>
        {/* Main Hero Content */}
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.badge}>
              <span className={styles.badgeIcon}>⚡</span>
              Premium Quality Parts & Tools
            </div>

            <h1 className={styles.title}>
              Nexus Tech Hub
              <span className={styles.titleAccent}>UAE</span>
            </h1>

            <p className={styles.subtitle}>
              Your trusted partner for professional repair parts & tools in UAE.
              We provide high-quality components for iPhone, Samsung, iPad, and MacBook repairs.
            </p>

            <div className={styles.ctaContainer}>
              <Link href="/products" className={styles.primaryCta}>
                <span>Shop Now</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <Link href="/lcd-buyback" className={styles.secondaryCta}>
                <span>LCD Buyback</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </Link>
            </div>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <div className={styles.statNumber}>5,000+</div>
                <div className={styles.statLabel}>Products</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNumber}>10,000+</div>
                <div className={styles.statLabel}>Happy Customers</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNumber}>24/7</div>
                <div className={styles.statLabel}>Support</div>
              </div>
            </div>
          </div>

          {/* Hero Carousel */}
          <div className={styles.heroCarousel}>
            <div className={styles.carouselContainer}>
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`${styles.carouselSlide} ${index === 0 ? styles.active : ''}`}
                  style={{ transform: `translateX(${(index - 0) * 100}%)` }}
                >
                  <div className={styles.slideContent}>
                    <div className={styles.slideImage}>
                      <img
                        src={slide.image}
                        alt={slide.title}
                        onError={(e) => e.target.src = '/images/products/placeholder.svg'}
                      />
                      <div className={styles.slideOverlay}></div>
                    </div>
                    <div className={styles.slideText}>
                      <h3>{slide.title}</h3>
                      <p>{slide.subtitle}</p>
                      <Link href={slide.link} className={styles.slideCta}>
                        {slide.cta}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Controls */}
            <button className={`${styles.carouselControl} ${styles.prev}`} onClick={prevSlide}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <button className={`${styles.carouselControl} ${styles.next}`} onClick={nextSlide}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>

            {/* Carousel Indicators */}
            <div className={styles.carouselIndicators}>
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.indicator} ${index === 0 ? styles.active : ''}`}
                  onClick={() => console.log('Indicator clicked:', index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className={styles.floatingElements}>
          <div className={styles.floatingCard}>
            <div className={styles.cardIcon}>🚚</div>
            <div className={styles.cardText}>
              <div className={styles.cardTitle}>Free Shipping</div>
              <div className={styles.cardSubtitle}>On orders over AED 500</div>
            </div>
          </div>

          <div className={styles.floatingCard}>
            <div className={styles.cardIcon}>🛡️</div>
            <div className={styles.cardText}>
              <div className={styles.cardTitle}>1 Year Warranty</div>
              <div className={styles.cardSubtitle}>On all parts & tools</div>
            </div>
          </div>

          <div className={styles.floatingCard}>
            <div className={styles.cardIcon}>⚡</div>
            <div className={styles.cardText}>
              <div className={styles.cardTitle}>24/7 Support</div>
              <div className={styles.cardSubtitle}>Expert technical help</div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className={styles.backgroundPattern}>
        <div className={styles.patternGrid}></div>
      </div>
    </section>
  );
};

export default Hero;
