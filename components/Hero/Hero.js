import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Hero.module.css';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const progressRef = useRef(null);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const slides = [
    {
      id: 1,
      imageUrl: "/images/hero-repair.jpg",
      badge: "Trusted by 10,000+ Professionals",
      title: "Empower Your Repair Business",
      subtitle: "Transform customer devices with confidence using our premium parts and expert tools. Join thousands of technicians who trust Nexus TechHub for reliable repairs.",
      ctaText: "Start Repairing",
      ctaLink: "/products",
      secondaryCtaText: "Get Expert Support",
      secondaryCtaLink: "/contact"
    },
    {
      id: 2,
      imageUrl: "/images/hero-tools.jpg",
      badge: "Complete Tool Solutions",
      title: "Everything You Need, One Place",
      subtitle: "From precision screwdrivers to advanced diagnostic tools, access professional-grade equipment that ensures perfect repairs every time.",
      ctaText: "Explore Tools",
      ctaLink: "/repair-tools",
      secondaryCtaText: "Build Your Kit",
      secondaryCtaLink: "/products?category=repair-tools"
    },
    {
      id: 3,
      imageUrl: "/images/hero-parts.jpg",
      badge: "Quality You Can Trust",
      title: "Genuine Parts, Guaranteed Results",
      subtitle: "Experience the difference with authentic OEM parts. Our rigorous testing ensures every component meets the highest standards for professional repairs.",
      ctaText: "Shop Genuine Parts",
      ctaLink: "/genuine-parts-program",
      secondaryCtaText: "View Warranty",
      secondaryCtaLink: "/quality-standards"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  // Progress animation
  useEffect(() => {
    if (isPaused) return;

    const startTime = Date.now();
    const duration = 5000; // 5 seconds

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress < 100) {
        progressRef.current = requestAnimationFrame(updateProgress);
      } else {
        nextSlide();
      }
    };

    progressRef.current = requestAnimationFrame(updateProgress);

    return () => {
      if (progressRef.current) {
        cancelAnimationFrame(progressRef.current);
      }
    };
  }, [currentSlide, isPaused]);

  // Auto slide with pause functionality
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setTimeout(nextSlide, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [currentSlide, isPaused]);

  // Handle mouse enter/leave for pause functionality
  const handleMouseEnter = () => {
    setIsPaused(true);
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
    }
    if (progressRef.current) {
      cancelAnimationFrame(progressRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    setProgress(0);
  };

  // Touch event handlers for swipe gestures
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    handleSwipeGesture();
  };

  const handleSwipeGesture = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const deltaX = touchStartX.current - touchEndX.current;
    const swipeThreshold = 50; // Minimum swipe distance in px

    if (deltaX > swipeThreshold) {
      // Swipe left - next slide
      nextSlide();
    } else if (deltaX < -swipeThreshold) {
      // Swipe right - previous slide
      prevSlide();
    }

    // Reset touch positions
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const currentSlideData = slides[currentSlide];

  return (
    <section
      className={styles.hero}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.slider}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
            style={{ backgroundImage: `url(${slide.imageUrl})` }}
          >
            <div className={styles.overlay}></div>
            <div className={styles.content}>
              <span className={styles.badge}>{slide.badge}</span>
              <h1 className={styles.title}>{slide.title}</h1>
              <p className={styles.subtitle}>{slide.subtitle}</p>
              <div className={styles.ctaContainer}>
                <Link href={slide.ctaLink} className={styles.cta}>
                  {slide.ctaText}
                </Link>
                <Link href={slide.secondaryCtaLink} className={styles.secondaryCta}>
                  {slide.secondaryCtaText}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slider Navigation */}
      <button className={`${styles.sliderBtn} ${styles.prevBtn}`} onClick={prevSlide} aria-label="Previous slide">
        ‹
      </button>
      <button className={`${styles.sliderBtn} ${styles.nextBtn}`} onClick={nextSlide} aria-label="Next slide">
        ›
      </button>

      {/* Slider Indicators */}
      <div className={styles.indicators}>
        {slides.map((_, index) => (
          <div key={index} className={styles.indicatorWrapper}>
            <button
              className={`${styles.indicator} ${index === currentSlide ? styles.active : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
            {index === currentSlide && (
              <div
                className={styles.progressBar}
                style={{ width: `${progress}%` }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statNumber}>5,000+</span>
          <span className={styles.statLabel}>Products</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNumber}>10,000+</span>
          <span className={styles.statLabel}>Happy Customers</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNumber}>24/7</span>
          <span className={styles.statLabel}>Support</span>
        </div>
      </div>
    </section>
  );
};

