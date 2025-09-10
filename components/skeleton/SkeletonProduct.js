import React from 'react';
import styles from './SkeletonProduct.module.css';

const SkeletonProduct = ({
  width = '100%',
  height = '300px',
  borderRadius = '0.5rem',
  className = ''
}) => {
  return (
    <div
      className={`${styles.skeletonProduct} ${className}`}
      style={{ width, height, borderRadius }}
    >
      <div className={styles.skeletonImage} />
      <div className={styles.skeletonDetails}>
        <div className={styles.skeletonTitle} />
        <div className={styles.skeletonCategory} />
        <div className={styles.skeletonPrice} />
        <div className={styles.skeletonButton} />
      </div>
    </div>
  );
};

export default SkeletonProduct;
