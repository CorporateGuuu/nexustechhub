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

// Product Card Skeleton Component
export function ProductCardSkeleton() {
  return (
    <div className={styles.productCardSkeleton}>
      <div className={styles.skeletonImage}></div>
      <div className={styles.skeletonContent}>
        <div className={styles.skeletonLine} style={{ height: '1.25rem', width: '80%' }}></div>
        <div className={styles.skeletonLine} style={{ height: '1rem', width: '60%', marginTop: '0.5rem' }}></div>
        <div className={styles.skeletonLine} style={{ height: '1.5rem', width: '40%', marginTop: '0.75rem' }}></div>
        <div className={styles.skeletonLine} style={{ height: '1rem', width: '50%', marginTop: '0.5rem' }}></div>
        <div className={styles.skeletonActions}>
          <div className={styles.skeletonLine} style={{ height: '2.5rem', width: '45%' }}></div>
          <div className={styles.skeletonLine} style={{ height: '2.5rem', width: '45%' }}></div>
        </div>
      </div>
    </div>
  );
}


