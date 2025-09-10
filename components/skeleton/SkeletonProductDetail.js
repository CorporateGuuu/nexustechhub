import React from 'react';
import styles from './SkeletonProductDetail.module.css';

const SkeletonProductDetail = () => {
  return (
    <main className={styles.productDetail}>
      <div className={styles.container}>
        {/* Breadcrumb Skeleton */}
        <nav className={styles.breadcrumb}>
          <div className={styles.breadcrumbItem} />
          <div className={styles.breadcrumbSeparator} />
          <div className={styles.breadcrumbItem} />
          <div className={styles.breadcrumbSeparator} />
          <div className={styles.breadcrumbItem} />
        </nav>

        <div className={styles.productContent}>
          {/* Product Image Skeleton */}
          <div className={styles.productImage}>
            <div className={styles.mainImage} />
            <div className={styles.saleTag} />
          </div>

          {/* Product Info Skeleton */}
          <div className={styles.productInfo}>
            <div className={styles.productName} />
            <div className={styles.productModel} />
            <div className={styles.productSku} />

            <div className={styles.priceSection}>
              <div className={styles.currentPrice} />
              <div className={styles.originalPrice} />
            </div>

            <div className={styles.stockStatus} />

            <div className={styles.description}>
              <div className={styles.descriptionLine} />
              <div className={styles.descriptionLine} />
              <div className={styles.descriptionLine} />
            </div>

            <div className={styles.specifications}>
              <div className={styles.specsTitle} />
              <div className={styles.specsList}>
                <div className={styles.specItem} />
                <div className={styles.specItem} />
                <div className={styles.specItem} />
                <div className={styles.specItem} />
              </div>
            </div>

            <div className={styles.compatibility}>
              <div className={styles.compatibilityTitle} />
              <div className={styles.compatibilityList}>
                <div className={styles.compatibilityTag} />
                <div className={styles.compatibilityTag} />
                <div className={styles.compatibilityTag} />
              </div>
            </div>

            <div className={styles.quantitySection}>
              <div className={styles.quantityLabel} />
              <div className={styles.quantityControls}>
                <div className={styles.quantityButton} />
                <div className={styles.quantityInput} />
                <div className={styles.quantityButton} />
              </div>
            </div>

            <div className={styles.actions}>
              <div className={styles.quoteButton} />
              <div className={styles.contactButton} />
            </div>

            <div className={styles.productFeatures}>
              <div className={styles.feature} />
              <div className={styles.feature} />
              <div className={styles.feature} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SkeletonProductDetail;
