import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Thumbs, Navigation } from 'swiper/modules';
import Image from 'next/image';
import styles from './MediaGallery.module.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/thumbs';
import 'swiper/css/navigation';

const MediaGallery = ({ media = [], autoplay = true, autoplayDelay = 3000, showThumbs = true }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  if (!media || media.length === 0) {
    return <div className={styles.noMedia}>No media available</div>;
  }

  return (
    <div className={styles.galleryContainer}>
      {/* Main Swiper */}
      <Swiper
        modules={[Autoplay, Thumbs, Navigation]}
        spaceBetween={10}
        slidesPerView={1}
        thumbs={{ swiper: thumbsSwiper }}
        autoplay={autoplay ? { delay: autoplayDelay, disableOnInteraction: false } : false}
        navigation
        className={styles.mainSwiper}
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
        >
          {media.map((item, index) => (
            <SwiperSlide key={index}>
              {item.type === 'video' ? (
                <video
                  src={item.src}
                  className={styles.thumbItem}
                  muted
                />
              ) : (
                <Image
                  src={item.src}
                  alt={item.alt || `Thumbnail ${index + 1}`}
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
