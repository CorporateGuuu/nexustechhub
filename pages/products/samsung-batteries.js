import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import styles from '../../styles/CategoryPage.module.css';

export default function SamsungBatteries() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/products?category=Samsung Parts&subcategory=batteries&limit=50');
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
      id: 'sg-s24-ultra-battery',
      name: 'Samsung Galaxy S24 Ultra Battery',
      category: 'Samsung Parts',
      subcategory: 'Batteries',
      price: 89.99,
      discount_percentage: 5,
      stock: 55,
      image: '/images/products/samsung-s24-ultra-battery.jpg',
      sku: 'NTH-SGS24U-BAT-001',
      brand: 'Samsung',
      description: '5000mAh high-capacity battery replacement'
    }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Layout
      title="Samsung Batteries - Nexus Tech Hub"
      description="High-quality replacement batteries for all Samsung Galaxy models with warranty."
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
                <span className={styles.currentPage}>Batteries</span>
              </div>

              <h1 className={styles.heroTitle}>Samsung Batteries</h1>
              <p className={styles.heroDescription}>
                Premium quality replacement batteries for all Samsung Galaxy models with full warranty.
              </p>

              <div className={styles.heroStats}>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>35+</div>
                  <div className={styles.statLabel}>Battery Models</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>30 Day</div>
                  <div className={styles.statLabel}>Warranty</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>OEM</div>
                  <div className={styles.statLabel}>Quality</div>
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
              <Link href="/products/samsung-screens" className={styles.categoryTab}>
                Screens & LCDs
              </Link>
              <Link href="/products/samsung-batteries" className={`${styles.categoryTab} ${styles.active}`}>
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
              <h3>Loading Samsung batteries...</h3>
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
              <h2>Need Samsung Battery Help?</h2>
              <p>Contact our technical support for battery replacement guidance.</p>
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
