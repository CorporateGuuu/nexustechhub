import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '../../nexus-techhub-fresh/components/Layout/Layout';
import { useCart } from '../../contexts/CartContext';
import styles from '../../styles/CategoryPage.module.css';

export default function IPhoneParts() {
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
      id: 'ip15-pro-max-screen',
      name: 'iPhone 15 Pro Max OLED Screen - Aftermarket Pro',
      price: 89.99,
      originalPrice: 129.99,
      image: '/images/products/iphone-15-pro-max-screen.jpg',
      badge: 'Bulk Discount',
      stock: 25
    },
    {
      id: 'ip15-pro-screen',
      name: 'iPhone 15 Pro OLED Screen Assembly',
      price: 79.99,
      originalPrice: 109.99,
      image: '/images/products/iphone-15-pro-screen.jpg',
      badge: 'OEM Quality',
      stock: 35
    },
    {
      id: 'ip15-plus-screen',
      name: 'iPhone 15 Plus LCD Screen Assembly',
      price: 69.99,
      originalPrice: 99.99,
      image: '/images/products/iphone-15-plus-screen.jpg',
      badge: 'Premium Grade',
      stock: 40
    },
    {
      id: 'ip15-battery',
      name: 'iPhone 15 Series Battery Replacement',
      price: 39.99,
      originalPrice: 49.99,
      image: '/images/products/iphone-15-battery.jpg',
      badge: 'High Capacity',
      stock: 120
    },
    {
      id: 'ip14-pro-max-screen',
      name: 'iPhone 14 Pro Max OLED Screen Assembly',
      price: 79.99,
      originalPrice: 109.99,
      image: '/images/products/iphone-14-pro-max-screen.jpg',
      badge: 'ProMotion',
      stock: 28
    },
    {
      id: 'ip14-pro-screen',
      name: 'iPhone 14 Pro OLED Screen Assembly',
      price: 69.99,
      originalPrice: 99.99,
      image: '/images/products/iphone-14-pro-screen.jpg',
      badge: 'Dynamic Island',
      stock: 45
    }
  ];

  return (
    <Layout
      title="iPhone Parts Wholesale - Nexus Tech Hub"
      description="Complete range of iPhone repair parts from iPhone 5 to iPhone 16. Wholesale pricing on screens, batteries, and components."
    >
      <div className={styles.categoryPage}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span className={styles.separator}>/</span>
          <Link href="/products">Products</Link>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>iPhone Parts</span>
        </div>

        {/* Category Header */}
        <div className={styles.categoryHeader}>
          <div className={styles.categoryInfo}>
            <h1>iPhone Parts Wholesale</h1>
            <p>Complete range of iPhone components from iPhone 5 to latest iPhone 16 series. All parts tested and guaranteed for compatibility.</p>
            <div className={styles.categoryStats}>
              <span className={styles.stat}>500+ Products</span>
              <span className={styles.stat}>Bulk Discounts Available</span>
              <span className={styles.stat}>30 Days Warranty</span>
            </div>
          </div>
          <div className={styles.categoryImage}>
            <img src="/images/categories/iphone-parts.jpg" alt="iPhone Parts" />
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
                  <div className={styles.productCategory}>iPhone Parts</div>
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
          <h2>Why Choose Our iPhone Parts?</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🔧</div>
              <h3>Professional Grade</h3>
              <p>All parts meet OEM specifications and quality standards</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>📦</div>
              <h3>Bulk Pricing</h3>
              <p>Competitive wholesale pricing with volume discounts</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🛡️</div>
              <h3>Quality Guarantee</h3>
              <p>30 days warranty on all parts with technical support</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🚚</div>
              <h3>Fast Shipping</h3>
              <p>Express worldwide shipping with tracking</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
