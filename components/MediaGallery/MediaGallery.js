import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Thumbs, Navigation } from 'swiper/modules';
import Image from 'next/image';
import styles from './MediaGallery.module.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/thumbs';
import 'swiper/css/navigation';

// Lightbox Component
const Lightbox = ({ media, currentIndex, onClose, onNext, onPrev }) => {
  const currentItem = media[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrev();
          break;
        case 'ArrowRight':
          onNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, onNext, onPrev]);

  return (
    <div className={styles.lightbox} onClick={onClose}>
      <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.lightboxClose} onClick={onClose} aria-label="Close lightbox">
          ×
        </button>

        {currentItem.type === 'video' ? (
          <video
            src={currentItem.src}
            controls
            autoPlay
            className={styles.lightboxMedia}
            poster={currentItem.poster}
          />
        ) : (
          <Image
            src={currentItem.src}
            alt={currentItem.alt || `Media ${currentIndex + 1}`}
            fill
            className={styles.lightboxMedia}
          />
        )}

        {currentItem.caption && (
          <div className={styles.lightboxCaption}>
            {currentItem.caption}
          </div>
        )}

        {media.length > 1 && (
          <>
            <button className={`${styles.lightboxNav} ${styles.lightboxPrev}`} onClick={onPrev} aria-label="Previous">
              ‹
            </button>
            <button className={`${styles.lightboxNav} ${styles.lightboxNext}`} onClick={onNext} aria-label="Next">
              ›
            </button>
          </>
        )}

        <div className={styles.lightboxCounter}>
          {currentIndex + 1} of {media.length}
        </div>
      </div>
    </div>
  );
};

const MediaGallery = ({ media = [], autoplay = true, autoplayDelay = 3000, showThumbs = true }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches && isPlaying) {
        setIsPlaying(false);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [isPlaying]);

  // Toggle autoplay
  const toggleAutoplay = () => {
    setIsPlaying(!isPlaying);
  };

  if (!media || media.length === 0) {
    return <div className={styles.noMedia}>No media available</div>;
  }

  return (
    <div className={styles.galleryContainer}>
      {/* Autoplay Controls */}
      {media.length > 1 && (
        <div className={styles.controls}>
          <button
            onClick={toggleAutoplay}
            className={styles.autoplayButton}
            aria-label={isPlaying ? 'Pause autoplay' : 'Start autoplay'}
            aria-pressed={isPlaying}
          >
            {isPlaying ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <polygon points="5,3 19,12 5,21"></polygon>
              </svg>
            )}
          </button>
          <span className={styles.slideCounter} aria-live="polite">
            {currentSlide + 1} of {media.length}
          </span>
        </div>
      )}

      {/* Main Swiper */}
      <Swiper
        modules={[Autoplay, Thumbs, Navigation]}
        spaceBetween={10}
        slidesPerView={1}
        thumbs={{ swiper: thumbsSwiper }}
        autoplay={isPlaying && !prefersReducedMotion ? { delay: autoplayDelay, disableOnInteraction: false } : false}
        navigation={{
          nextEl: '.gallery-next',
          prevEl: '.gallery-prev',
        }}
        onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
        className={styles.mainSwiper}
        a11y={{
          prevSlideMessage: 'Previous media item',
          nextSlideMessage: 'Next media item',
          firstSlideMessage: 'First media item',
          lastSlideMessage: 'Last media item',
          paginationBulletMessage: 'Go to media item {{index}}',
        }}
      >
        {media.map((item, index) => (
          <SwiperSlide key={index}>
            {item.type === 'video' ? (
              <video
                src={item.src}
                controls
                className={styles.mediaItem}
                poster={item.poster}
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <Image
                src={item.src}
                alt={item.alt || `Media ${index + 1}`}
                fill
                className={styles.mediaItem}
                priority={index === 0}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      {media.length > 1 && (
        <>
          <button
            className={`${styles.navButton} ${styles.prevButton} gallery-prev`}
            aria-label="Previous media item"
          >
            ‹
          </button>
          <button
            className={`${styles.navButton} ${styles.nextButton} gallery-next`}
            aria-label="Next media item"
          >
            ›
          </button>
        </>
      )}

      {/* Thumbnails Swiper */}
      {showThumbs && media.length > 1 && (
        <Swiper
          modules={[Thumbs]}
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          watchSlidesProgress
          className={styles.thumbsSwiper}
          breakpoints={{
            640: {
              slidesPerView: 4,
            },
            768: {
              slidesPerView: 6,
            },
            1024: {
              slidesPerView: 8,
            },
          }}
          a11y={{
            enabled: true,
            prevSlideMessage: 'Previous thumbnail',
            nextSlideMessage: 'Next thumbnail',
          }}
        >
          {media.map((item, index) => (
            <SwiperSlide key={index}>
              {item.type === 'video' ? (
                <video
                  src={item.src}
                  className={styles.thumbItem}
                  muted
                  aria-label={`Video thumbnail ${index + 1}`}
                />
              ) : (
                <Image
                  src={item.src}
                  alt={item.alt || `Thumbnail for media item ${index + 1}`}
                  fill
                  className={styles.thumbItem}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default MediaGallery;
