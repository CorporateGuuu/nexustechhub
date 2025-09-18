import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Hero.module.css';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "iPhone Parts Wholesale",
      subtitle: "Bulk pricing on screens, batteries, and components",
      image: "/images/products/iphone-15-pro-max-screen.jpg",
      cta: "Shop iPhone Parts",
      link: "/products/iphone-parts"
    },
    {
      title: "Samsung Galaxy Parts",
      subtitle: "OEM quality parts for all Galaxy models",
      image: "/images/products/samsung-s24-ultra-screen.jpg",
      cta: "Shop Samsung Parts",
      link: "/products/samsung-parts"
    },
    {
      title: "iPad & Tablet Components",
      subtitle: "Professional repair parts for tablets",
      image: "/images/products/ipad-pro-12-9-screen.jpg",
      cta: "Shop iPad Parts",
      link: "/products/ipad-parts"
    },
    {
      title: "Repair Tools & Equipment",
      subtitle: "Complete workshop solutions",
      image: "/images/products/professional-toolkit.jpg",
      cta: "Shop Tools",
      link: "/products/repair-tools"
    }
  ];

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className={styles.hero}>
      <div className={styles.heroContainer}>
        {/* Main Hero Content */}
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.badge}>
              <span className={styles.badgeIcon}>🏢</span>
              Trusted Wholesale Supplier
            </div>

            <h1 className={styles.title}>
              Nexus Tech Hub
              <span className={styles.titleAccent}>Wholesale</span>
            </h1>

            <p className={styles.subtitle}>
              Leading wholesale supplier of cellphone repair parts and accessories.
              Serving repair professionals worldwide with quality components for iPhone, Samsung, and iPad repairs.
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
                <div className={styles.statNumber}>10,000+</div>
                <div className={styles.statLabel}>Wholesale Products</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNumber}>2,500+</div>
                <div className={styles.statLabel}>Business Partners</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNumber}>24/7</div>
                <div className={styles.statLabel}>Technical Support</div>
              </div>
            </div>
          </div>

          {/* Hero Carousel */}
          <div className={styles.heroCarousel}>
            <div className={styles.carouselContainer}>
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`${styles.carouselSlide} ${index === currentSlide ? styles.active : ''}`}
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

            {/* Carousel Indicators */}
            <div className={styles.carouselIndicators}>
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.indicator} ${index === currentSlide ? styles.active : ''}`}
                  onClick={() => goToSlide(index)}
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
