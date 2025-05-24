import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './EnhancedProductCard.module.css';

const EnhancedProductCard = ({ product, showQuickView = true, showWishlist = true }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    // Add wishlist logic here
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Add quick view logic here
    console.log('Quick view for product:', product.id);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Add to cart logic here
    console.log('Add to cart:', product.id);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const discountPercentage = product.originalPrice && product.price < product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className={styles.productCard}>
      <Link href={`/products/${product.slug || product.id}`} className={styles.cardLink}>
        <div className={styles.imageContainer}>
          {/* Product Image */}
          <div className={styles.imageWrapper}>
            <Image
              src={product.image || '/images/placeholder-product.jpg'}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`${styles.productImage} ${imageLoaded ? styles.loaded : ''}`}
              onLoad={() => setImageLoaded(true)}
            />
            
            {/* Overlay on hover */}
            <div className={styles.imageOverlay}>
              <div className={styles.overlayActions}>
                {showQuickView && (
                  <button 
                    className={styles.quickViewBtn}
                    onClick={handleQuickView}
                    aria-label="Quick View"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                )}
                <button 
                  className={styles.addToCartBtn}
                  onClick={handleAddToCart}
                  aria-label="Add to Cart"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className={styles.badges}>
            {product.isNew && (
              <span className={styles.badge + ' ' + styles.newBadge}>New</span>
            )}
            {discountPercentage > 0 && (
              <span className={styles.badge + ' ' + styles.discountBadge}>
                -{discountPercentage}%
              </span>
            )}
            {product.inStock === false && (
              <span className={styles.badge + ' ' + styles.outOfStockBadge}>
                Out of Stock
              </span>
            )}
            {product.isFeatured && (
              <span className={styles.badge + ' ' + styles.featuredBadge}>
                Featured
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          {showWishlist && (
            <button 
              className={`${styles.wishlistBtn} ${isWishlisted ? styles.wishlisted : ''}`}
              onClick={handleWishlistToggle}
              aria-label="Add to Wishlist"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          )}
        </div>

        {/* Product Info */}
        <div className={styles.productInfo}>
          {/* Category */}
          {product.category && (
            <span className={styles.category}>{product.category}</span>
          )}

          {/* Product Name */}
          <h3 className={styles.productName}>{product.name}</h3>

          {/* Rating */}
          {product.rating && (
            <div className={styles.rating}>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className={`${styles.star} ${i < Math.floor(product.rating) ? styles.filled : ''}`}
                    xmlns="http://www.w3.org/2000/svg" 
                    width="14" 
                    height="14" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                ))}
              </div>
              <span className={styles.ratingText}>({product.reviewCount || 0})</span>
            </div>
          )}

          {/* Price */}
          <div className={styles.priceContainer}>
            <span className={styles.currentPrice}>{formatPrice(product.price)}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className={styles.originalPrice}>{formatPrice(product.originalPrice)}</span>
            )}
          </div>

          {/* Stock Status */}
          <div className={styles.stockStatus}>
            {product.inStock !== false ? (
              <span className={styles.inStock}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                In Stock
              </span>
            ) : (
              <span className={styles.outOfStock}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
                Out of Stock
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EnhancedProductCard;
