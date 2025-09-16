import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../../nexus-techhub-fresh/components/Layout/Layout';
import ProductGrid from '../../components/ProductGrid';
import styles from '../../styles/CategoryPage.module.css';

export default function IPhoneScreens() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch iPhone screen products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/products?category=iPhone Parts&subcategory=screens&limit=50');
      const data = await response.json();

      if (data.success) {
        setProducts(data.data || []);
      } else {
        // Fallback to mock data
        setProducts(getMockProducts());
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setProducts(getMockProducts());
    } finally {
      setLoading(false);
    }
  };

  // Mock iPhone screen products
  const getMockProducts = () => [
    {
      id: 'ip16-pro-max-screen',
      name: 'iPhone 16 Pro Max Super Retina XDR OLED Display',
      category: 'iPhone Parts',
      subcategory: 'Screens & LCDs',
      price: 449.99,
      discount_percentage: 5,
      stock: 15,
      image: '/images/products/iphone-16-pro-max-screen.jpg',
      sku: 'NTH-IP16PM-SCREEN-001',
      brand: 'Apple',
      description: 'Genuine Apple OLED display with ProMotion technology and Dynamic Island'
    },
    {
      id: 'ip16-pro-screen',
      name: 'iPhone 16 Pro OLED Screen Assembly',
      category: 'iPhone Parts',
      subcategory: 'Screens & LCDs',
      price: 399.99,
      discount_percentage: 0,
      stock: 22,
      image: '/images/products/iphone-16-pro-screen.jpg',
      sku: 'NTH-IP16P-SCREEN-001',
      brand: 'Apple',
      description: '6.3" Super Retina XDR OLED display with ProMotion and Dynamic Island'
    },
    {
      id: 'ip16-plus-screen',
      name: 'iPhone 16 Plus LCD Screen Assembly',
      category: 'iPhone Parts',
      subcategory: 'Screens & LCDs',
      price: 329.99,
      discount_percentage: 0,
      stock: 28,
      image: '/images/products/iphone-16-plus-screen.jpg',
      sku: 'NTH-IP16PLUS-SCREEN-001',
      brand: 'Apple',
      description: '6.7" Super Retina XDR LCD display with Ceramic Shield'
    },
    {
      id: 'ip15-pro-max-screen',
      name: 'iPhone 15 Pro Max Super Retina XDR OLED Display',
      category: 'iPhone Parts',
      subcategory: 'Screens & LCDs',
      price: 399.99,
      discount_percentage: 8,
      stock: 25,
      image: '/images/products/iphone-15-pro-max-screen.jpg',
      sku: 'NTH-IP15PM-SCREEN-001',
      brand: 'Apple',
      description: '6.7" Super Retina XDR OLED display with ProMotion technology'
    },
    {
      id: 'ip15-pro-screen',
      name: 'iPhone 15 Pro OLED Screen Assembly',
      category: 'iPhone Parts',
      subcategory: 'Screens & LCDs',
      price: 349.99,
      discount_percentage: 0,
      stock: 35,
      image: '/images/products/iphone-15-pro-screen.jpg',
      sku: 'NTH-IP15P-SCREEN-001',
      brand: 'Apple',
      description: '6.1" Super Retina XDR OLED display with ProMotion'
    },
    {
      id: 'ip15-plus-screen',
      name: 'iPhone 15 Plus LCD Screen Assembly',
      category: 'iPhone Parts',
      subcategory: 'Screens & LCDs',
      price: 249.99,
      discount_percentage: 0,
      stock: 40,
      image: '/images/products/iphone-15-plus-screen.jpg',
      sku: 'NTH-IP15PLUS-SCREEN-001',
      brand: 'Apple',
      description: '6.7" Super Retina XDR LCD display with Ceramic Shield'
    },
    {
      id: 'ip14-pro-max-screen',
      name: 'iPhone 14 Pro Max OLED Screen Assembly',
      category: 'iPhone Parts',
      subcategory: 'Screens & LCDs',
      price: 329.99,
      discount_percentage: 0,
      stock: 28,
      image: '/images/products/iphone-14-pro-max-screen.jpg',
      sku: 'NTH-IP14PM-SCREEN-001',
      brand: 'Apple',
      description: '6.7" Super Retina XDR OLED display with ProMotion'
    },
    {
      id: 'ip14-pro-screen',
      name: 'iPhone 14 Pro OLED Screen Assembly',
      category: 'iPhone Parts',
      subcategory: 'Screens & LCDs',
      price: 299.99,
      discount_percentage: 0,
      stock: 45,
      image: '/images/products/iphone-14-pro-screen.jpg',
      sku: 'NTH-IP14P-SCREEN-001',
      brand: 'Apple',
      description: '6.1" Super Retina XDR OLED display with ProMotion'
    }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Layout
      title="iPhone Screens & LCDs - Nexus Tech Hub"
      description="High-quality iPhone replacement screens and LCD displays. OLED and LCD assemblies for all iPhone models with warranty."
    >
      <div className={styles.categoryPage}>
        {/* Hero Section */}
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
                <span className={styles.currentPage}>Screens & LCDs</span>
              </div>

              <h1 className={styles.heroTitle}>iPhone Screens & LCDs</h1>
              <p className={styles.heroDescription}>
                Premium quality replacement screens for all iPhone models. OLED and LCD displays
                with full warranty and professional installation support.
              </p>

              <div className={styles.heroStats}>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>50+</div>
                  <div className={styles.statLabel}>Screen Models</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>30 Day</div>
                  <div className={styles.statLabel}>Warranty</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>99%</div>
                  <div className={styles.statLabel}>Compatibility</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          {/* Category Navigation */}
          <div className={styles.categoryNavigation}>
            <div className={styles.categoryTabs}>
              <Link href="/products/iphone-parts" className={styles.categoryTab}>
                All iPhone Parts
              </Link>
              <Link href="/products/iphone-screens" className={`${styles.categoryTab} ${styles.active}`}>
                Screens & LCDs
              </Link>
              <Link href="/products/iphone-batteries" className={styles.categoryTab}>
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

          {/* Products Grid */}
          {loading ? (
            <div className={styles.loadingState}>
              <div className={styles.loadingSpinner}></div>
              <h3>Loading iPhone screens...</h3>
            </div>
          ) : error ? (
            <div className={styles.errorState}>
              <div className={styles.errorIcon}>⚠️</div>
              <h3>Unable to load products</h3>
              <p>{error}</p>
              <button onClick={fetchProducts} className={styles.retryButton}>
                Try Again
              </button>
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

          {/* Technical Information */}
          <div className={styles.technicalInfo}>
            <h2>Screen Replacement Guide</h2>
            <div className={styles.infoGrid}>
              <div className={styles.infoCard}>
                <h3>OLED vs LCD Technology</h3>
                <p>Learn the differences between OLED and LCD displays and which is right for your repair.</p>
              </div>

              <div className={styles.infoCard}>
                <h3>Installation Tips</h3>
                <p>Professional tips for successful screen replacement and avoiding common mistakes.</p>
              </div>

              <div className={styles.infoCard}>
                <h3>Compatibility Guide</h3>
                <p>Complete compatibility matrix for all iPhone models and screen assemblies.</p>
              </div>

              <div className={styles.infoCard}>
                <h3>Troubleshooting</h3>
                <p>Common issues after screen replacement and how to resolve them.</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className={styles.ctaSection}>
            <div className={styles.ctaContent}>
              <h2>Need Help Choosing the Right Screen?</h2>
              <p>Our technical support team can help you select the perfect replacement screen for your specific iPhone model.</p>
              <div className={styles.ctaButtons}>
                <Link href="/services/support" className={styles.primaryButton}>
                  Get Technical Support
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
