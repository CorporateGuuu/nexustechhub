import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '../../nexus-techhub-fresh/components/Layout/Layout';
import { useCart } from '../../contexts/CartContext';
import styles from '../../styles/CategoryPage.module.css';

export default function RepairTools() {
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
      id: 'toolkit-pro-65pc',
      name: 'Professional iFixit Repair Toolkit - 65 Pieces',
      price: 149.99,
      originalPrice: 199.99,
      image: '/images/products/professional-toolkit.jpg',
      badge: 'Complete Kit',
      stock: 15
    },
    {
      id: 'toolkit-essentials',
      name: 'Essential Repair Toolkit - 32 Pieces',
      price: 59.99,
      originalPrice: 79.99,
      image: '/images/products/essentials-toolkit.jpg',
      badge: 'Starter Kit',
      stock: 35
    },
    {
      id: 'screwdriver-precision-set',
      name: 'Precision Screwdriver Set - 24 Pieces',
      price: 39.99,
      originalPrice: 49.99,
      image: '/images/products/precision-screwdrivers.jpg',
      badge: 'Magnetic',
      stock: 85
    },
    {
      id: 'screwdriver-torx-set',
      name: 'Torx Screwdriver Set - 12 Pieces',
      price: 29.99,
      originalPrice: 39.99,
      image: '/images/products/torx-screwdrivers.jpg',
      badge: 'Security',
      stock: 95
    },
    {
      id: 'screwdriver-phillips-set',
      name: 'Phillips Screwdriver Set - 8 Pieces',
      price: 19.99,
      originalPrice: 24.99,
      image: '/images/products/phillips-screwdrivers.jpg',
      badge: 'Various Sizes',
      stock: 120
    },
    {
      id: 'heat-gun-professional',
      name: 'Professional Heat Gun with LCD Display',
      price: 79.99,
      originalPrice: 99.99,
      image: '/images/products/heat-gun.jpg',
      badge: 'Digital Control',
      stock: 25
    }
  ];

  return (
    <Layout
      title="Repair Tools & Equipment - Nexus Tech Hub"
      description="Professional repair tools and workshop equipment. Complete toolkits, precision screwdrivers, and specialized equipment for mobile device repairs."
    >
      <div className={styles.categoryPage}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span className={styles.separator}>/</span>
          <Link href="/products">Products</Link>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>Repair Tools</span>
        </div>

        {/* Category Header */}
        <div className={styles.categoryHeader}>
          <div className={styles.categoryInfo}>
            <h1>Repair Tools & Professional Equipment</h1>
            <p>Complete workshop solutions for mobile device repairs. From precision tools to complete toolkits, everything you need for professional repairs.</p>
            <div className={styles.categoryStats}>
              <span className={styles.stat}>150+ Products</span>
              <span className={styles.stat}>Professional Grade</span>
              <span className={styles.stat}>Complete Kits</span>
            </div>
          </div>
          <div className={styles.categoryImage}>
            <img src="/images/categories/repair-tools.jpg" alt="Repair Tools" />
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
                  <div className={styles.productCategory}>Repair Tools</div>
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
          <h2>Why Choose Our Repair Tools?</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🔧</div>
              <h3>Professional Grade</h3>
              <p>Industry-standard tools built for daily use</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>📦</div>
              <h3>Complete Kits</h3>
              <p>Everything you need in one comprehensive package</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🎯</div>
              <h3>Precision Tools</h3>
              <p>Magnetic, anti-slip, and specialized repair tools</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🛡️</div>
              <h3>Durable & Reliable</h3>
              <p>Built to last with professional warranties</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
