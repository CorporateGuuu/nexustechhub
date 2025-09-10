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


