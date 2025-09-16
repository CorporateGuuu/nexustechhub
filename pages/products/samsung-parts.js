import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '../../nexus-techhub-fresh/components/Layout/Layout';
import { useCart } from '../../contexts/CartContext';
import styles from '../../styles/CategoryPage.module.css';

export default function SamsungParts() {
  const { addToCart } = useCart();
  const [addingToCart, setAddingToCart] = useState(null);

  const handleAddToCart = async (product) => {
    setAddingToCart(product.id);
    try {
      await addToCart(product, 1);
      // Success - could add toast notification here
    } catch (error) {
      console.error('Failed to add to cart:', error);
      // Error handling - could add error toast here
    } finally {
      setAddingToCart(null);
    }
  };
  const products = [
    {
      id: 'sg-s24-ultra-screen',
      name: 'Samsung Galaxy S24 Ultra Screen Assembly',
      price: 79.99,
      originalPrice: 109.99,
      image: '/images/products/samsung-s24-ultra-screen.jpg',
      badge: 'OEM Quality',
      stock: 20
    },
    {
      id: 'sg-s24-plus-screen',
      name: 'Samsung Galaxy S24 Plus AMOLED Screen',
      price: 69.99,
      originalPrice: 99.99,
      image: '/images/products/samsung-s24-plus-screen.jpg',
      badge: 'Premium Grade',
      stock: 28
    },
    {
      id: 'sg-s24-screen',
      name: 'Samsung Galaxy S24 OLED Screen Assembly',
      price: 59.99,
      originalPrice: 89.99,
      image: '/images/products/samsung-s24-screen.jpg',
      badge: 'High Quality',
      stock: 30
    },
    {
      id: 'sg-s23-ultra-battery',
      name: 'Samsung Galaxy S23 Ultra Battery',
      price: 39.99,
      originalPrice: 49.99,
      image: '/images/products/samsung-s23-ultra-battery.jpg',
      badge: '5000mAh',
      stock: 55
    },
    {
      id: 'sg-z-fold5-screen',
      name: 'Samsung Galaxy Z Fold 5 Inner Screen',
      price: 149.99,
      originalPrice: 199.99,
      image: '/images/products/samsung-z-fold5-screen.jpg',
      badge: 'Foldable',
      stock: 15
    },
    {
      id: 'sg-a54-screen',
      name: 'Samsung Galaxy A54 LCD Screen Assembly',
      price: 49.99,
      originalPrice: 69.99,
      image: '/images/products/samsung-a54-screen.jpg',
      badge: 'AMOLED',
      stock: 65
    }
  ];

  return (
    <Layout
      title="Samsung Parts Wholesale - Nexus Tech Hub"
      description="Complete range of Samsung Galaxy repair parts. Wholesale pricing on screens, batteries, and components for all Galaxy models."
    >
      <div className={styles.categoryPage}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span className={styles.separator}>/</span>
          <Link href="/products">Products</Link>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>Samsung Parts</span>
        </div>

        {/* Category Header */}
        <div className={styles.categoryHeader}>
          <div className={styles.categoryInfo}>
            <h1>Samsung Galaxy Parts Wholesale</h1>
            <p>Complete range of Samsung Galaxy components from Galaxy S series to Note, A series, and foldables. OEM quality parts with competitive pricing.</p>
            <div className={styles.categoryStats}>
              <span className={styles.stat}>600+ Products</span>
              <span className={styles.stat}>All Galaxy Models</span>
              <span className={styles.stat}>OEM Compatible</span>
            </div>
          </div>
          <div className={styles.categoryImage}>
            <img src="/images/categories/samsung-parts.jpg" alt="Samsung Parts" />
          </div>
        </div>

        {/* Products Grid */}
        <div className={styles.productsSection}>
          <div className={styles.productsGrid}>
            {products.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <div className={styles.productImage}>
                  <img
                    src={product.image}
                    alt={product.name}
                    onError={(e) => {
                      e.target.src = '/images/products/placeholder.svg';
                      e.target.style.opacity = '0.7';
                    }}
                    loading="lazy"
                  />
                  <div className={styles.productBadge}>{product.badge}</div>
                  <div className={styles.productOverlay}>
                    <Link href={`/products/${product.id}`} className={styles.viewProductBtn}>
                      View Product
                    </Link>
                  </div>
                </div>

                <div className={styles.productInfo}>
                  <div className={styles.productCategory}>Samsung Parts</div>
                  <h3 className={styles.productName}>
                    <Link href={`/products/${product.id}`}>{product.name}</Link>
                  </h3>

                  <div className={styles.productPrice}>
                    <span className={styles.currentPrice}>${product.price}</span>
                    {product.originalPrice && (
                      <span className={styles.originalPrice}>${product.originalPrice}</span>
                    )}
                  </div>

                  <div className={styles.stockStatus}>
                    {product.stock > 10 ? (
                      <span className={styles.inStock}>✓ In Stock</span>
                    ) : product.stock > 0 ? (
                      <span className={styles.lowStock}>⚠ Low Stock</span>
                    ) : (
                      <span className={styles.outOfStock}>✗ Out of Stock</span>
                    )}
                  </div>

                  <button
                    className={styles.addToCartBtn}
                    onClick={() => handleAddToCart(product)}
                    disabled={addingToCart === product.id || product.stock === 0}
                  >
                    {addingToCart === product.id ? 'Adding...' :
                     product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Features */}
        <div className={styles.categoryFeatures}>
          <h2>Why Choose Our Samsung Parts?</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>📱</div>
              <h3>All Galaxy Models</h3>
              <p>Complete coverage from Galaxy S to Z series</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>⭐</div>
              <h3>OEM Quality</h3>
              <p>Original equipment manufacturer specifications</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🛡️</div>
              <h3>Compatibility</h3>
              <p>Guaranteed fitment for all supported models</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>📦</div>
              <h3>Bulk Discounts</h3>
              <p>Volume pricing for business customers</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
