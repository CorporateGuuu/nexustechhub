import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '../../nexus-techhub-fresh/components/Layout/Layout';
import { useCart } from '../../contexts/CartContext';
import styles from '../../styles/CategoryPage.module.css';

export default function IPadParts() {
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
      id: 'ipad-pro-12-9-screen',
      name: 'iPad Pro 12.9" Liquid Retina XDR Display',
      price: 149.99,
      originalPrice: 199.99,
      image: '/images/products/ipad-pro-12-9-screen.jpg',
      badge: 'Premium Grade',
      stock: 18
    },
    {
      id: 'ipad-pro-11-screen',
      name: 'iPad Pro 11" Liquid Retina Display',
      price: 119.99,
      originalPrice: 159.99,
      image: '/images/products/ipad-pro-11-screen.jpg',
      badge: 'Tandem OLED',
      stock: 25
    },
    {
      id: 'ipad-air-5-screen',
      name: 'iPad Air 5th Gen LCD Screen Assembly',
      price: 89.99,
      originalPrice: 119.99,
      image: '/images/products/ipad-air-5-screen.jpg',
      badge: 'Liquid Retina',
      stock: 35
    },
    {
      id: 'ipad-pro-battery',
      name: 'iPad Pro Battery Replacement',
      price: 49.99,
      originalPrice: 69.99,
      image: '/images/products/ipad-pro-battery.jpg',
      badge: 'High Capacity',
      stock: 50
    },
    {
      id: 'ipad-mini-6-screen',
      name: 'iPad Mini 6 LCD Screen Assembly',
      price: 79.99,
      originalPrice: 99.99,
      image: '/images/products/ipad-mini-6-screen.jpg',
      badge: '8.3" Display',
      stock: 40
    },
    {
      id: 'ipad-home-button',
      name: 'iPad Home Button Assembly',
      price: 19.99,
      originalPrice: 29.99,
      image: '/images/products/ipad-home-button.jpg',
      badge: 'Touch ID',
      stock: 90
    }
  ];

  return (
    <Layout
      title="iPad Parts Wholesale - Nexus Tech Hub"
      description="Complete range of iPad repair parts and components. Wholesale pricing on screens, batteries, and accessories for all iPad models."
    >
      <div className={styles.categoryPage}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span className={styles.separator}>/</span>
          <Link href="/products">Products</Link>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>iPad Parts</span>
        </div>

        {/* Category Header */}
        <div className={styles.categoryHeader}>
          <div className={styles.categoryInfo}>
            <h1>iPad & Tablet Components Wholesale</h1>
            <p>Professional repair parts for iPad, iPad Air, iPad Pro, and iPad Mini. Complete range of components with OEM compatibility and warranty.</p>
            <div className={styles.categoryStats}>
              <span className={styles.stat}>200+ Products</span>
              <span className={styles.stat}>All iPad Models</span>
              <span className={styles.stat}>Tablet Specialists</span>
            </div>
          </div>
          <div className={styles.categoryImage}>
            <img src="/images/categories/ipad-parts.jpg" alt="iPad Parts" />
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
                  <div className={styles.productCategory}>iPad Parts</div>
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
          <h2>Why Choose Our iPad Parts?</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>📱</div>
              <h3>All iPad Models</h3>
              <p>Complete coverage from iPad to iPad Pro series</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🛠️</div>
              <h3>Professional Repairs</h3>
              <p>Specialized tools and parts for tablet repairs</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🔄</div>
              <h3>Touch & Display</h3>
              <p>High-quality digitizers and display assemblies</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>📊</div>
              <h3>Bulk Solutions</h3>
              <p>Wholesale pricing for repair businesses</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
