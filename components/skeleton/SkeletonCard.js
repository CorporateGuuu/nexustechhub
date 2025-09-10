import React from 'react';
import styles from './SkeletonCard.module.css';

const SkeletonCard = ({
  width = '100%',
  height = '200px',
  borderRadius = '0.5rem',
  className = '',
  showAvatar = false,
  showTitle = true,
  showSubtitle = false,
  showButton = false,
  lines = 3
}) => {
  return (
    <div
      className={`${styles.skeletonCard} ${className}`}
      style={{ width, height }}
    >
      {showAvatar && (
        <div
          className={styles.skeletonAvatar}
          style={{ borderRadius }}
        />
      )}

      <div className={styles.skeletonContent}>
        {showTitle && (
          <div
            className={styles.skeletonTitle}
            style={{ borderRadius }}
          />
        )}

        {showSubtitle && (
          <div
            className={styles.skeletonSubtitle}
            style={{ borderRadius }}
          />
        )}

        {Array.from({ length: lines }, (_, index) => (
          <div
            key={index}
            className={styles.skeletonLine}
            style={{
              width: `${Math.random() * 40 + 60}%`,
              borderRadius
            }}
          />
        ))}

        {showButton && (
          <div
            className={styles.skeletonButton}
            style={{ borderRadius }}
          />
        )}
      </div>
    </div>
  );
};

export default SkeletonCard;
