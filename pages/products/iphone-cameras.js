import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../../nexus-techhub-fresh/components/Layout/Layout';
import styles from '../../styles/CategoryPage.module.css';

export default function IPhoneCameras() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/products?category=iPhone Parts&subcategory=cameras&limit=50');
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
      id: 'ip16-pro-camera',
      name: 'iPhone 16 Pro Camera Module Assembly',
      category: 'iPhone Parts',
      subcategory: 'Cameras',
      price: 199.99,
      discount_percentage: 0,
      stock: 25,
      image: '/images/products/iphone-16-pro-camera.jpg',
      sku: 'NTH-IP16P-CAMERA-001',
      brand: 'Apple',
      description: 'Complete camera module with advanced sensors'
    }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Layout
      title="iPhone Cameras - Nexus Tech Hub"
      description="Professional replacement camera modules for all iPhone models."
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
                <span className={styles.currentPage}>Cameras</span>
              </div>

              <h1 className={styles.heroTitle}>iPhone Cameras</h1>
              <p className={styles.heroDescription}>
                Professional replacement camera modules for all iPhone models with advanced sensors.
              </p>

              <div className={styles.heroStats}>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>15+</div>
                  <div className={styles.statLabel}>Camera Models</div>
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
              <Link href="/products/iphone-parts" className={styles.categoryTab}>
                All iPhone Parts
              </Link>
              <Link href="/products/iphone-screens" className={styles.categoryTab}>
                Screens & LCDs
              </Link>
              <Link href="/products/iphone-batteries" className={styles.categoryTab}>
                Batteries
              </Link>
              <Link href="/products/iphone-charging" className={styles.categoryTab}>
                Charging Ports
              </Link>
              <Link href="/products/iphone-cameras" className={`${styles.categoryTab} ${styles.active}`}>
                Cameras
              </Link>
            </div>
          </div>

          {loading ? (
            <div className={styles.loadingState}>
              <div className={styles.loadingSpinner}></div>
              <h3>Loading camera modules...</h3>
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
                      <span className={styles.currentPrice}>
                        ${product.price}
                      </span>
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
              <h2>Need Camera Repair Help?</h2>
              <p>Get expert guidance for camera module repairs and replacements.</p>
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
