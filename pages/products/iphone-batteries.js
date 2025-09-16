import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../../nexus-techhub-fresh/components/Layout/Layout';
import styles from '../../styles/CategoryPage.module.css';

export default function IPhoneBatteries() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/products?category=iPhone Parts&subcategory=batteries&limit=50');
      const data = await response.json();

      if (data.success) {
        setProducts(data.data || []);
      } else {
        setProducts(getMockProducts());
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setProducts(getMockProducts());
    } finally {
      setLoading(false);
    }
  };

  const getMockProducts = () => [
    {
      id: 'ip16-pro-max-battery',
      name: 'iPhone 16 Pro Max Battery Replacement',
      category: 'iPhone Parts',
      subcategory: 'Batteries',
      price: 119.99,
      discount_percentage: 0,
      stock: 45,
      image: '/images/products/iphone-16-pro-max-battery.jpg',
      sku: 'NTH-IP16PM-BAT-001',
      brand: 'Apple',
      description: 'Genuine Apple battery with 1-year warranty'
    },
    {
      id: 'ip16-pro-battery',
      name: 'iPhone 16 Pro Battery Replacement',
      category: 'iPhone Parts',
      subcategory: 'Batteries',
      price: 109.99,
      discount_percentage: 0,
      stock: 52,
      image: '/images/products/iphone-16-pro-battery.jpg',
      sku: 'NTH-IP16P-BAT-001',
      brand: 'Apple',
      description: 'Original capacity battery for iPhone 16 Pro'
    },
    {
      id: 'ip15-battery',
      name: 'iPhone 15 Series Battery Replacement',
      category: 'iPhone Parts',
      subcategory: 'Batteries',
      price: 89.99,
      discount_percentage: 10,
      stock: 120,
      image: '/images/products/iphone-15-battery.jpg',
      sku: 'NTH-IP15-BAT-001',
      brand: 'Apple',
      description: 'Original capacity battery with 1-year warranty'
    }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Layout
      title="iPhone Batteries - Nexus Tech Hub"
      description="High-quality replacement batteries for all iPhone models with warranty."
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
                <Link href="/products/iphone-parts">iPhone Parts</Link>
                <span className={styles.breadcrumbSeparator}>/</span>
                <span className={styles.currentPage}>Batteries</span>
              </div>

              <h1 className={styles.heroTitle}>iPhone Batteries</h1>
              <p className={styles.heroDescription}>
                Premium quality replacement batteries for all iPhone models with full warranty.
              </p>

              <div className={styles.heroStats}>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>25+</div>
                  <div className={styles.statLabel}>Battery Models</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>30 Day</div>
                  <div className={styles.statLabel}>Warranty</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>100%</div>
                  <div className={styles.statLabel}>Capacity</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className={styles.categoryNavigation}>
            <div className={styles.categoryTabs}>
              <Link href="/products/iphone-parts" className={styles.categoryTab}>
                All iPhone Parts
              </Link>
              <Link href="/products/iphone-screens" className={styles.categoryTab}>
                Screens & LCDs
              </Link>
              <Link href="/products/iphone-batteries" className={`${styles.categoryTab} ${styles.active}`}>
                Batteries
              </Link>
              <Link href="/products/iphone-charging" className={styles.categoryTab}>
                Charging Ports
              </Link>
              <Link href="/products/iphone-cameras" className={styles.categoryTab}>
                Cameras
              </Link>
            </div>
          </div>

          {loading ? (
            <div className={styles.loadingState}>
              <div className={styles.loadingSpinner}></div>
              <h3>Loading iPhone batteries...</h3>
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
              <h2>Need Battery Replacement Help?</h2>
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
