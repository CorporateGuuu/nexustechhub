import React from 'react';
import SkeletonProduct from './SkeletonProduct';
import styles from './SkeletonSlider.module.css';

const SkeletonSlider = ({
  slidesPerView = 4,
  className = '',
  showNavigation = true,
  showPagination = true
}) => {
  const skeletonSlides = Array.from({ length: slidesPerView }, (_, index) => (
    <div key={index} className={styles.skeletonSlide}>
      <SkeletonProduct />
    </div>
  ));

  return (
    <div className={`${styles.skeletonSlider} ${className}`}>
      <div className={styles.skeletonHeader}>
        <div className={styles.skeletonTitle} />
        <div className={styles.skeletonSubtitle} />
        <div className={styles.skeletonLink} />
      </div>

      <div className={styles.skeletonCarousel}>
        <div className={styles.skeletonSlides}>
          {skeletonSlides}
        </div>

        {showNavigation && (
          <>
            <div className={`${styles.skeletonNavButton} ${styles.skeletonPrevButton}`} />
            <div className={`${styles.skeletonNavButton} ${styles.skeletonNextButton}`} />
          </>
        )}

        {showPagination && (
          <div className={styles.skeletonPagination}>
            {Array.from({ length: Math.ceil(slidesPerView / 2) }, (_, index) => (
              <div key={index} className={styles.skeletonPaginationBullet} />
            ))}
          </div>
        )}

        <div className={styles.skeletonProgressBar}>
          <div className={styles.skeletonProgressFill} />
        </div>
      </div>
    </div>
  );
};

export default SkeletonSlider;
