import React, { useState, useEffect, useRef } from 'react';
import SearchBar from './SearchBar';
import OptimizedImage from './OptimizedImage';
import styles from './Hero.module.css';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const progressRef = useRef(null);

  const slides = [
    {
      id: 1,
      title: "Professional Repair Parts & Tools",
      subtitle: "Your trusted partner for high-quality phone, tablet, and laptop repair parts in the UAE. Fast shipping, competitive prices, and expert support.",
      image: "/images/hero-repair-parts.svg",
      alt: "Professional mobile repair parts and tools - Nexus TechHub UAE",
      stats: [
        { number: "10,000+", label: "Parts Available" },
        { number: "24/7", label: "Support" },
        { number: "UAE", label: "Fast Delivery" }
      ]
    },
    {
      id: 2,
      title: "Premium iPhone & Samsung Parts",
      subtitle: "Genuine OEM and aftermarket parts for iPhone and Samsung devices. Screen replacements, batteries, and accessories with warranty.",
      image: "/images/hero-iphone-parts.svg",
      alt: "Premium iPhone and Samsung repair parts - Nexus TechHub UAE",
      stats: [
        { number: "5,000+", label: "iPhone Parts" },
        { number: "3,000+", label: "Samsung Parts" },
        { number: "99%", label: "Satisfaction Rate" }
      ]
    },
    {
      id: 3,
      title: "Expert Repair Tools & Equipment",
      subtitle: "Professional-grade tools for technicians and DIY repairs. From precision screwdrivers to advanced diagnostic equipment.",
      image: "/images/hero-tools.svg",
      alt: "Professional repair tools and equipment - Nexus TechHub UAE",
      stats: [
        { number: "500+", label: "Tools Available" },
        { number: "Expert", label: "Technical Support" },
        { number: "Global", label: "Shipping" }
      ]
    }
  ];

  const SLIDE_DURATION = 5000; // 5 seconds per slide
  const PROGRESS_UPDATE_INTERVAL = 50; // Update progress every 50ms

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [currentSlide]);

  const startAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressRef.current) clearInterval(progressRef.current);

    if (!isPaused) {
      // Progress bar animation
      let currentProgress = 0;
      progressRef.current = setInterval(() => {
        currentProgress += (PROGRESS_UPDATE_INTERVAL / SLIDE_DURATION) * 100;
        setProgress(currentProgress);

        if (currentProgress >= 100) {
          clearInterval(progressRef.current);
        }
      }, PROGRESS_UPDATE_INTERVAL);

      // Auto slide change
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setProgress(0);
      }, SLIDE_DURATION);
    }
  };

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
    setProgress(0);
    startAutoSlide();
  };

  const handlePrevSlide = () => {
    const newIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    handleSlideChange(newIndex);
  };

  const handleNextSlide = () => {
    const newIndex = (currentSlide + 1) % slides.length;
    handleSlideChange(newIndex);
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    startAutoSlide();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      handlePrevSlide();
    } else if (e.key === 'ArrowRight') {
      handleNextSlide();
    }
  };

  const currentSlideData = slides[currentSlide];

  return (
    <section
      className={styles.hero}
      role="banner"
      aria-labelledby={`hero-heading-${currentSlide}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      style={{ minHeight: '500px', position: 'relative' }}
    >
      {/* Progress Bar */}
      <div className={styles.progressBar}>
        <div
          className={`${styles.progressFill}`}
          style={{ width: `${progress}%` }}
          aria-hidden="true"
        />
      </div>

      {/* Navigation Arrows */}
      <button
        className={`${styles.navArrow} ${styles.prevArrow}`}
        onClick={handlePrevSlide}
        aria-label="Previous slide"
        type="button"
        style={{ zIndex: 30 }}
      >
        ‹
      </button>
      <button
        className={`${styles.navArrow} ${styles.nextArrow}`}
        onClick={handleNextSlide}
        aria-label="Next slide"
        type="button"
        style={{ zIndex: 30 }}
      >
        ›
      </button>

      {/* Slide Indicators */}
      <div className={styles.indicators} role="tablist" aria-label="Slide indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${index === currentSlide ? styles.active : ''}`}
            onClick={() => handleSlideChange(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-selected={index === currentSlide}
            role="tab"
            type="button"
          />
        ))}
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <h1 id={`hero-heading-${currentSlide}`} className={styles.title}>
            {currentSlideData.title}
          </h1>
          <p className={styles.subtitle}>
            {currentSlideData.subtitle}
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
            {currentSlideData.stats.map((stat, index) => (
              <div key={index} className={styles.stat}>
                <span className={styles.statNumber} aria-label={`Over ${stat.number} ${stat.label.toLowerCase()}`}>
                  {stat.number}
                </span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <figure className={styles.image} role="img" aria-labelledby={`hero-image-caption-${currentSlide}`}>
          <OptimizedImage
            src={currentSlideData.image}
            alt={currentSlideData.alt}
            width={600}
            height={400}
            priority={true}
            className={styles.heroImage}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <figcaption id={`hero-image-caption-${currentSlide}`} className={styles.srOnly}>
            Illustration showing various mobile repair tools and parts including screwdrivers, screens, and batteries
          </figcaption>
        </figure>
      </div>

      {/* Pause Indicator */}
      {isPaused && (
        <div className={styles.pauseIndicator} aria-hidden="true">
          <span>⏸️</span>
        </div>
      )}
    </section>
  );
}
