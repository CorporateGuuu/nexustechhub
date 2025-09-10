import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, A11y } from 'swiper/modules';
import SkeletonSlider from '../skeleton/SkeletonSlider';
import styles from './FeaturedProducts.module.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const FeaturedProducts = ({ products }) => {
  const swiperRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!swiperRef.current) return;

      // Only handle keyboard navigation when the carousel is focused
      const carousel = swiperRef.current.el;
      if (!carousel.contains(document.activeElement)) return;

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          swiperRef.current.slidePrev();
          break;
        case 'ArrowRight':
          event.preventDefault();
          swiperRef.current.slideNext();
          break;
        case 'Home':
          event.preventDefault();
          swiperRef.current.slideTo(0);
          break;
        case 'End':
          event.preventDefault();
          swiperRef.current.slideTo(products.length - 1);
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [products]);

  if (isLoading) {
    return (
      <section className={styles.featuredProducts}>
        <SkeletonSlider slidesPerView={4} />
      </section>
    );
  }

  if (!products || products.length === 0) {
    return (
      <section className={styles.featuredProducts}>
        <h2 className={styles.title}>Featured Products</h2>
        <p className={styles.subtitle}>
          Discover our most popular repair parts and tools, trusted by professionals worldwide.
        </p>
        <div className={styles.noProducts}>
          <p>No featured products available at the moment.</p>
          <Link href="/products" className={styles.viewAll}>
            Browse All Products
          </Link>
        </div>
      </section>
    );
  }

  // Progress tracking for autoplay
  const updateProgress = () => {
    if (swiperRef.current && swiperRef.current.autoplay) {
      const autoplay = swiperRef.current.autoplay;
      const progressValue = (autoplay.timeLeft / autoplay.delay) * 100;
      setProgress(100 - progressValue);
    }
  };

  const toggleAutoplay = () => {
    if (swiperRef.current && swiperRef.current.autoplay) {
      if (isPlaying) {
        swiperRef.current.autoplay.stop();
        setIsPlaying(false);
      } else {
        swiperRef.current.autoplay.start();
        setIsPlaying(true);
      }
    }
  };

  return (
    <section className={styles.featuredProducts}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Featured Products</h2>
          <p className={styles.subtitle}>
            Discover our most popular repair parts and tools, trusted by professionals worldwide.
          </p>
        </div>
        <Link href="/products" className={styles.viewAll}>
          View All Products
        </Link>
      </div>

      <div className={styles.carouselContainer}>
        <Swiper
          modules={[Autoplay, Navigation, Pagination, A11y]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={{
            nextEl: '.featured-products-next',
            prevEl: '.featured-products-prev',
          }}
          pagination={{
            el: '.featured-products-pagination',
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={products.length > 3}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onAutoplayTimeLeft={(swiper, timeLeft, percentage) => {
            setProgress((1 - percentage) * 100);
          }}
          onAutoplayStart={() => setIsPlaying(true)}
          onAutoplayStop={() => setIsPlaying(false)}
          onAutoplayPause={() => setIsPlaying(false)}
          onAutoplayResume={() => setIsPlaying(true)}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 24,
            },
          }}
          className={styles.productsSwiper}
          tabIndex={0}
          role="region"
          aria-label="Featured products carousel"
          a11y={{
            prevSlideMessage: 'Previous products',
            nextSlideMessage: 'Next products',
            firstSlideMessage: 'This is the first slide',
            lastSlideMessage: 'This is the last slide',
            paginationBulletMessage: 'Go to slide {{index}}',
            enabled: true,
          }}
        >
          {products.map((product, index) => (
            <SwiperSlide key={product.id}>
              <article className={styles.product} role="article" aria-labelledby={`product-title-${product.id}`}>
                <div className={styles.imageContainer}>
                  <Image
                    src={product.imageUrl || '/images/placeholder.png'}
                    alt={`${product.name} - ${product.category} repair part`}
                    width={300}
                    height={200}
                    className={styles.image}
                    loading="lazy"
                  />
                  {product.badge && (
                    <div className={styles.badge} aria-label={`Product badge: ${product.badge}`}>
                      {product.badge}
                    </div>
                  )}
                </div>

                <div className={styles.content}>
                  <div className={styles.category} aria-label={`Category: ${product.category}`}>
                    {product.category}
                  </div>
                  <h3 id={`product-title-${product.id}`} className={styles.name}>
                    {product.name}
                  </h3>
                  <div className={styles.price} aria-label={`Price: ${product.price.toFixed(2)} US dollars`}>
                    <span className={styles.salePrice}>${product.price.toFixed(2)}</span>
                  </div>
                  <Link
                    href={`/products/${product.id}`}
                    className={styles.viewDetails}
                    aria-label={`View details for ${product.name} - ${product.category}`}
                  >
                    View Details
                  </Link>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button
          className={`${styles.navButton} ${styles.prevButton} featured-products-prev`}
          aria-label="Previous products"
        >
          ‹
        </button>
        <button
          className={`${styles.navButton} ${styles.nextButton} featured-products-next`}
          aria-label="Next products"
        >
          ›
        </button>

        {/* Custom Pagination */}
        <div className={`${styles.pagination} featured-products-pagination`}></div>

        {/* Progress Bar */}
        <div className={styles.progressContainer}>
          <div
            className={styles.progressBar}
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Autoplay Control */}
        <button
          className={styles.autoplayControl}
          onClick={toggleAutoplay}
          aria-label={isPlaying ? 'Pause autoplay' : 'Resume autoplay'}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>
      </div>
    </section>
  );
};

export default FeaturedProducts;
