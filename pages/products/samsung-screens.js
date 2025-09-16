import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../../nexus-techhub-fresh/components/Layout/Layout';
import styles from '../../styles/CategoryPage.module.css';

export default function SamsungScreens() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/products?category=Samsung Parts&subcategory=screens&limit=50');
      const data = await response.json();
      setProducts(data.success ? data.data || [] : getMockProducts());
    } catch (err) {
      console.error('Error fetching products:', err);
      setProducts(getMockProducts());
    } finally {
      setLoading(false);
    }
  };

  const getMockProducts = () => [
    {
      id: 'sg-s24-ultra-screen',
      name: 'Samsung Galaxy S24 Ultra AMOLED Screen',
      category: 'Samsung Parts',
      subcategory: 'Screens & LCDs',
      price: 349.99,
      discount_percentage: 8,
      stock: 20,
      image: '/images/products/samsung-s24-ultra-screen.jpg',
      sku: 'NTH-SGS24U-SCREEN-001',
      brand: 'Samsung',
      description: '6.8" Dynamic AMOLED 2X display with S Pen support'
    }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Layout
      title="Samsung Screens & LCDs - Nexus Tech Hub"
      description="High-quality Samsung replacement screens and AMOLED displays with warranty."
    >
      <div className={styles.categoryPage}>
        <div className={styles.heroSection}>
          <div className="container">
            <div className={styles.heroContent}>
              <div className={styles.breadcrumb}>
                <Link href="/">Home</Link>
                <span className={styles.breadcrumbSeparator}>/</span>
                <Link href="/products">Products</Link>
                <span className={styles.breadcrumbSeparator}>/</span>
                <Link href="/products/samsung-parts">Samsung Parts</Link>
                <span className={styles.breadcrumbSeparator}>/</span>
                <span className={styles.currentPage}>Screens & LCDs</span>
              </div>

              <h1 className={styles.heroTitle}>Samsung Screens & LCDs</h1>
              <p className={styles.heroDescription}>
                Premium AMOLED and LCD replacement screens for all Samsung Galaxy models.
              </p>

              <div className={styles.heroStats}>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>60+</div>
                  <div className={styles.statLabel}>Screen Models</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>30 Day</div>
                  <div className={styles.statLabel}>Warranty</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>AMOLED</div>
                  <div className={styles.statLabel}>Technology</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className={styles.categoryNavigation}>
            <div className={styles.categoryTabs}>
              <Link href="/products/samsung-parts" className={styles.categoryTab}>
                All Samsung Parts
              </Link>
              <Link href="/products/samsung-screens" className={`${styles.categoryTab} ${styles.active}`}>
                Screens & LCDs
              </Link>
              <Link href="/products/samsung-batteries" className={styles.categoryTab}>
                Batteries
              </Link>
              <Link href="/products/samsung-charging" className={styles.categoryTab}>
                Charging Ports
              </Link>
              <Link href="/products/samsung-s-pen" className={styles.categoryTab}>
                S Pen
              </Link>
            </div>
          </div>

          {loading ? (
            <div className={styles.loadingState}>
              <div className={styles.loadingSpinner}></div>
              <h3>Loading Samsung screens...</h3>
            </div>
          ) : (
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
                    {product.discount_percentage > 0 && (
                      <div className={styles.discountBadge}>
                        -{product.discount_percentage}%
                      </div>
                    )}
                  </div>

                  <div className={styles.productInfo}>
                    <h3 className={styles.productName}>
                      <Link href={`/products/${product.id}`}>
                        {product.name}
                      </Link>
                    </h3>

                    <div className={styles.productMeta}>
                      <span className={styles.productCategory}>{product.category}</span>
                      <span className={styles.productSku}>SKU: {product.sku}</span>
                    </div>

                    <div className={styles.productPrice}>
                      {product.discount_percentage > 0 ? (
                        <>
                          <span className={styles.originalPrice}>
                            ${(product.price * (1 + product.discount_percentage / 100)).toFixed(2)}
                          </span>
                          <span className={styles.currentPrice}>
                            ${product.price}
                          </span>
                        </>
                      ) : (
                        <span className={styles.currentPrice}>
                          ${product.price}
                        </span>
                      )}
                    </div>

                    <div className={styles.productStock}>
                      {product.stock > 10 ? (
                        <span className={styles.inStock}>✓ In Stock</span>
                      ) : product.stock > 0 ? (
                        <span className={styles.lowStock}>⚠ Only {product.stock} left</span>
                      ) : (
                        <span className={styles.outOfStock}>✗ Out of Stock</span>
                      )}
                    </div>

                    <div className={styles.productActions}>
                      <button className={styles.addToCartBtn}>
                        Add to Cart
                      </button>
                      <Link href={`/products/${product.id}`} className={styles.viewDetailsBtn}>
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className={styles.ctaSection}>
            <div className={styles.ctaContent}>
              <h2>Need Samsung Screen Help?</h2>
              <p>Get expert guidance for AMOLED screen repairs and replacements.</p>
              <div className={styles.ctaButtons}>
                <Link href="/services/support" className={styles.primaryButton}>
                  Get Support
                </Link>
                <Link href="/contact" className={styles.secondaryButton}>
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
