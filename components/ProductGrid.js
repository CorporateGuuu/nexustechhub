import React from 'react';
import Link from 'next/link';
import styles from '../styles/Search.module.css';

const ProductGrid = ({ products, categoryTitle }) => {
  return (
    <div className={styles.productGrid}>
      <h2 className={styles.categoryTitle}>{categoryTitle}</h2>
      <div className={styles.productsContainer}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <div className={styles.productImage}>
              <img
                src={product.image || '/images/products/placeholder.svg'}
                alt={product.name}
                onError={(e) => e.target.src = '/images/products/placeholder.svg'}
              />
            </div>
            <div className={styles.productInfo}>
              <h3 className={styles.productName}>
                <Link href={`/products/${product.id}`}>
                  {product.name}
                </Link>
              </h3>
              <p className={styles.productCategory}>{product.category}</p>
              <p className={styles.productModel}>{product.model}</p>
              <div className={styles.productPrice}>
                {product.originalPrice && product.originalPrice > product.price ? (
                  <>
                    <span className={styles.originalPrice}>${product.originalPrice.toFixed(2)}</span>
                    <span className={styles.currentPrice}>${product.price.toFixed(2)}</span>
                  </>
                ) : (
                  <span className={styles.currentPrice}>${product.price.toFixed(2)}</span>
                )}
              </div>
              <div className={styles.productStock}>
                {product.inStock ? (
                  <span className={styles.inStock}>In Stock</span>
                ) : (
                  <span className={styles.outOfStock}>Out of Stock</span>
                )}
              </div>
              <Link href={`/products/${product.id}`} className={styles.viewProductButton}>
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
