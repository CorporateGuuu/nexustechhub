import React from 'react';
import Link from 'next/link';
import styles from '../styles/Search.module.css';

const ProductGrid = ({ products, categoryTitle }) => {
  return (
    <div className={styles.productGrid}>
      <h2 className={styles.categoryTitle}>{categoryTitle}</h2>
      <div className={styles.productsContainer}>
        {products.map((product) => {
          // Calculate discounted price if discount_percentage exists
          const discountedPrice = product.discount_percentage
            ? product.price * (1 - product.discount_percentage / 100)
            : product.price;

          return (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.productImage}>
                <img
                  src={product.image || '/images/products/placeholder.svg'}
                  alt={product.name}
                  onError={(e) => e.target.src = '/images/products/placeholder.svg'}
                />
                {product.is_featured && (
                  <span className={styles.featuredBadge}>Featured</span>
                )}
                {product.is_new && (
                  <span className={styles.newBadge}>New</span>
                )}
              </div>
              <div className={styles.productInfo}>
                <h3 className={styles.productName}>
                  <Link href={`/products/${product.id}`}>
                    {product.name}
                  </Link>
                </h3>
                <p className={styles.productCategory}>{product.category}</p>
                {product.brand && (
                  <p className={styles.productBrand}>{product.brand}</p>
                )}
                <div className={styles.productPrice}>
                  {product.discount_percentage > 0 ? (
                    <>
                      <span className={styles.originalPrice}>${product.price.toFixed(2)}</span>
                      <span className={styles.currentPrice}>${discountedPrice.toFixed(2)}</span>
                      <span className={styles.discountBadge}>-{product.discount_percentage}%</span>
                    </>
                  ) : (
                    <span className={styles.currentPrice}>${product.price.toFixed(2)}</span>
                  )}
                </div>
                <div className={styles.productStock}>
                  {product.stock > 0 ? (
                    <span className={styles.inStock}>In Stock ({product.stock})</span>
                  ) : (
                    <span className={styles.outOfStock}>Out of Stock</span>
                  )}
                </div>
                <Link href={`/products/${product.id}`} className={styles.viewProductButton}>
                  View Details
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductGrid;
