'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from '../styles/ProductGrid.module.css';

const ProductGrid = ({ products, categoryTitle }) => {
  const [showScrollGradient, setShowScrollGradient] = useState(false);
  const gridRef = useRef(null);

  // Detect scroll to show gradient effects
  useEffect(() => {
    const handleScroll = () => {
      if (gridRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = gridRef.current;
        const isNearBottom = scrollTop + clientHeight >= scrollHeight - 300; // Increased threshold
        const hasScrollableContent = scrollHeight > clientHeight;

        // Debug logging (remove in production)
        console.log('Scroll detection:', {
          scrollTop,
          scrollHeight,
          clientHeight,
          isNearBottom,
          hasScrollableContent,
          showGradient: hasScrollableContent ? isNearBottom : true
        });

        // Only show gradient if there's scrollable content and user is near bottom
        if (hasScrollableContent) {
          setShowScrollGradient(isNearBottom);
        } else {
          // If no scrollable content, show gradient after a delay to encourage exploration
          setTimeout(() => {
            console.log('Showing gradient for non-scrollable content');
            setShowScrollGradient(true);
          }, 2000);
        }
      }
    };

    const gridElement = gridRef.current;
    if (gridElement) {
      console.log('Adding scroll listener to grid element');
      gridElement.addEventListener('scroll', handleScroll);
      // Check initial state after component mounts
      setTimeout(() => {
        console.log('Checking initial scroll state');
        handleScroll();
      }, 100);
    }

    return () => {
      if (gridElement) {
        console.log('Removing scroll listener');
        gridElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [products]); // Re-run when products change

  // Handle scroll to bottom
  const handleScrollToBottom = () => {
    if (gridRef.current) {
      gridRef.current.scrollTo({
        top: gridRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={styles.productGrid}>
      <div className={styles.gridHeader}>
        <h2 className={styles.categoryTitle}>{categoryTitle}</h2>
        <div className={styles.productCount}>
          {products.length} products
        </div>
      </div>

      <div
        ref={gridRef}
        className={`${styles.productsGrid} ${showScrollGradient ? styles.scrollGradient : ''}`}
      >
        {products.map((product) => {
          // Calculate discounted price if discount_percentage exists
          const discountedPrice = product.discount_percentage
            ? product.price * (1 - product.discount_percentage / 100)
            : product.price;

          return (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.productImageContainer}>
                <Link href={`/products/${product.id}`} className={styles.productImageLink}>
                  <img
                    src={product.image || '/images/products/placeholder.svg'}
                    alt={product.name}
                    className={styles.productImage}
                    onError={(e) => e.target.src = '/images/products/placeholder.svg'}
                  />
                </Link>

                {/* Badges */}
                <div className={styles.productBadges}>
                  {product.is_featured && (
                    <span className={styles.featuredBadge}>Featured</span>
                  )}
                  {product.is_new && (
                    <span className={styles.newBadge}>New</span>
                  )}
                  {product.discount_percentage > 0 && (
                    <span className={styles.discountBadge}>-{product.discount_percentage}%</span>
                  )}
                </div>

                {/* Quick Actions */}
                <div className={styles.quickActions}>
                  <button className={styles.quickViewBtn} title="Quick View">
                    👁️
                  </button>
                  <button className={styles.addToCartBtn} title="Add to Cart">
                    🛒
                  </button>
                </div>
              </div>

              <div className={styles.productInfo}>
                <div className={styles.productCategory}>
                  {product.category}
                </div>

                <h3 className={styles.productName}>
                  <Link href={`/products/${product.id}`}>
                    {product.name}
                  </Link>
                </h3>

                {product.brand && (
                  <div className={styles.productBrand}>
                    by {product.brand}
                  </div>
                )}

                <div className={styles.productRating}>
                  <div className={styles.stars}>
                    ⭐⭐⭐⭐⭐
                  </div>
                  <span className={styles.reviewCount}>(4.5)</span>
                </div>

                <div className={styles.productPrice}>
                  {product.discount_percentage > 0 ? (
                    <>
                      <span className={styles.originalPrice}>${product.price.toFixed(2)}</span>
                      <span className={styles.currentPrice}>${discountedPrice.toFixed(2)}</span>
                    </>
                  ) : (
                    <span className={styles.currentPrice}>${product.price.toFixed(2)}</span>
                  )}
                </div>

                <div className={styles.productStock}>
                  {product.stock > 0 ? (
                    <span className={styles.inStock}>
                      ✓ In Stock ({product.stock})
                    </span>
                  ) : (
                    <span className={styles.outOfStock}>
                      ✗ Out of Stock
                    </span>
                  )}
                </div>

                <div className={styles.productActions}>
                  <Link href={`/products/${product.id}`} className={styles.viewDetailsBtn}>
                    View Details
                  </Link>
                  <button
                    className={`${styles.addToCartBtn} ${product.stock === 0 ? styles.disabled : ''}`}
                    disabled={product.stock === 0}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Load More Button */}
      {products.length >= 20 && (
        <div className={styles.loadMoreContainer}>
          <button className={styles.loadMoreBtn}>
            Load More Products
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
