import React from 'react';
import styles from './LoadingSpinner.module.css';

export default function LoadingSpinner({ 
  size = 'medium', 
  color = 'primary', 
  text = '', 
  fullScreen = false,
  overlay = false 
}) {
  const sizeClass = styles[`spinner${size.charAt(0).toUpperCase() + size.slice(1)}`];
  const colorClass = styles[`spinner${color.charAt(0).toUpperCase() + color.slice(1)}`];
  
  const spinner = (
    <div className={`${styles.spinner} ${sizeClass} ${colorClass}`}>
      <div className={styles.spinnerCircle}></div>
      <div className={styles.spinnerCircle}></div>
      <div className={styles.spinnerCircle}></div>
      <div className={styles.spinnerCircle}></div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className={styles.fullScreenContainer}>
        <div className={styles.fullScreenContent}>
          {spinner}
          {text && <p className={styles.loadingText}>{text}</p>}
        </div>
      </div>
    );
  }

  if (overlay) {
    return (
      <div className={styles.overlayContainer}>
        <div className={styles.overlayContent}>
          {spinner}
          {text && <p className={styles.loadingText}>{text}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.inlineContainer}>
      {spinner}
      {text && <span className={styles.inlineText}>{text}</span>}
    </div>
  );
}

// Skeleton loading component for content placeholders
export function SkeletonLoader({ 
  lines = 3, 
  width = '100%', 
  height = '1rem',
  className = '' 
}) {
  return (
    <div className={`${styles.skeletonContainer} ${className}`}>
      {Array.from({ length: lines }, (_, index) => (
        <div
          key={index}
          className={styles.skeletonLine}
          style={{
            width: Array.isArray(width) ? width[index] || width[0] : width,
            height: Array.isArray(height) ? height[index] || height[0] : height,
          }}
        />
      ))}
    </div>
  );
}

// Card skeleton for product cards
export function ProductCardSkeleton() {
  return (
    <div className={styles.productCardSkeleton}>
      <div className={styles.skeletonImage}></div>
      <div className={styles.skeletonContent}>
        <SkeletonLoader lines={2} width={['80%', '60%']} height="1rem" />
        <SkeletonLoader lines={1} width="40%" height="1.5rem" />
        <div className={styles.skeletonActions}>
          <SkeletonLoader lines={1} width="45%" height="2.5rem" />
          <SkeletonLoader lines={1} width="45%" height="2.5rem" />
        </div>
      </div>
    </div>
  );
}

// Page skeleton for full page loading
export function PageSkeleton() {
  return (
    <div className={styles.pageSkeleton}>
      {/* Header skeleton */}
      <div className={styles.skeletonHeader}>
        <SkeletonLoader lines={1} width="200px" height="2rem" />
        <SkeletonLoader lines={1} width="300px" height="1rem" />
      </div>
      
      {/* Content skeleton */}
      <div className={styles.skeletonGrid}>
        {Array.from({ length: 6 }, (_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
