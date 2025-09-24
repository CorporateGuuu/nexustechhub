import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import styles from '../../styles/CategoryPage.module.css';

export default function ToolKits() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/products?category=Repair Tools&subcategory=tool-kits&limit=50');
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
      id: 'toolkit-pro-65pc',
      name: 'Professional iFixit Repair Toolkit - 65 Pieces',
      category: 'Repair Tools',
      subcategory: 'Tool Kits',
      price: 199.99,
      discount_percentage: 15,
      stock: 15,
      image: '/images/products/professional-toolkit.jpg',
      sku: 'NTH-TOOLKIT-PRO65-001',
      brand: 'iFixit',
      description: 'Complete professional toolkit for mobile device repairs'
    },
    {
      id: 'toolkit-essentials',
      name: 'Essential Repair Toolkit - 32 Pieces',
      category: 'Repair Tools',
      subcategory: 'Tool Kits',
      price: 89.99,
      discount_percentage: 0,
      stock: 35,
      image: '/images/products/essentials-toolkit.jpg',
      sku: 'NTH-TOOLKIT-ESSENTIALS-001',
      brand: 'Generic',
      description: 'Essential tools for basic mobile repairs'
    }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Layout
      title="Repair Tool Kits - Nexus Tech Hub"
      description="Professional repair toolkits and essential tools for mobile device technicians."
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
                <Link href="/products/repair-tools">Repair Tools</Link>
                <span className={styles.breadcrumbSeparator}>/</span>
                <span className={styles.currentPage}>Tool Kits</span>
              </div>

              <h1 className={styles.heroTitle}>Repair Tool Kits</h1>
              <p className={styles.heroDescription}>
                Professional and essential toolkits for mobile device repair technicians.
                Complete sets with all the tools you need for successful repairs.
              </p>

              <div className={styles.heroStats}>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>5+</div>
                  <div className={styles.statLabel}>Complete Kits</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>90 Day</div>
                  <div className={styles.statLabel}>Warranty</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>Pro</div>
                  <div className={styles.statLabel}>Grade Tools</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className={styles.categoryNavigation}>
            <div className={styles.categoryTabs}>
              <Link href="/products/repair-tools" className={styles.categoryTab}>
                All Repair Tools
              </Link>
              <Link href="/products/tool-kits" className={`${styles.categoryTab} ${styles.active}`}>
                Tool Kits
              </Link>
              <Link href="/products/precision-tools" className={styles.categoryTab}>
                Precision Sets
              </Link>
              <Link href="/products/essential-kits" className={styles.categoryTab}>
                Essential Kits
              </Link>
              <Link href="/products/screwdrivers" className={styles.categoryTab}>
                Screwdrivers
              </Link>
              <Link href="/products/heat-guns" className={styles.categoryTab}>
                Heat Guns
              </Link>
            </div>
          </div>

          {loading ? (
            <div className={styles.loadingState}>
              <div className={styles.loadingSpinner}></div>
              <h3>Loading tool kits...</h3>
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
              <h2>Need Professional Tools?</h2>
              <p>Get the complete toolkit you need for professional mobile repairs.</p>
              <div className={styles.ctaButtons}>
                <Link href="/services/support" className={styles.primaryButton}>
                  Get Tool Advice
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
