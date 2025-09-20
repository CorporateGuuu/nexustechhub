import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../../nexus-techhub-fresh/components/Layout/Layout';
import { useCart } from '../../contexts/CartContext';
import styles from '../../styles/CategoryPage.module.css';

export default function IPadParts() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('all');

  // Fetch iPad products from API
  const fetchIPadProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/products?brand=Apple&category=ipad-parts&limit=100');
      const data = await response.json();

      if (data.success) {
        setProducts(data.data || []);
      } else {
        setError('Failed to load iPad products. Please try again.');
        setProducts([]);
      }
    } catch (err) {
      console.error('Error fetching iPad products:', err);
      setError('Failed to load iPad products. Please try again.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIPadProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    if (filterBy === 'all') return true;
    return product.category.toLowerCase() === filterBy;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return (b.average_rating || 0) - (a.average_rating || 0);
      case 'newest':
        return new Date(b.created_at || 0) - new Date(a.created_at || 0);
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const handleAddToCart = async (product) => {
    try {
      await addToCart(product, 1);
      // Success feedback
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const categories = [
    { id: 'all', name: 'All iPad Parts', count: products.length },
    { id: 'screens', name: 'Screens', count: products.filter(p => p.category === 'Screens').length },
    { id: 'batteries', name: 'Batteries', count: products.filter(p => p.category === 'Batteries').length },
    { id: 'buttons', name: 'Buttons', count: products.filter(p => p.category === 'Buttons').length },
    { id: 'charging ports', name: 'Charging Ports', count: products.filter(p => p.category === 'Charging Ports').length },
    { id: 'cameras', name: 'Cameras', count: products.filter(p => p.category === 'Cameras').length },
    { id: 'audio', name: 'Audio', count: products.filter(p => p.category === 'Audio').length }
  ];

  if (loading) {
    return (
      <Layout title="iPad Parts - Nexus Tech Hub" description="Professional iPad repair parts and components">
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <h3>Loading iPad Parts...</h3>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="iPad Parts - Nexus Tech Hub" description="Professional iPad repair parts and components">
        <div className={styles.errorContainer}>
          <h3>Error Loading Products</h3>
          <p>{error}</p>
          <button onClick={fetchIPadProducts} className="btn btn-primary">
            Try Again
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title="iPad Parts - Professional Tablet Repair Components | Nexus Tech Hub"
      description="Complete range of iPad repair parts for iPad, iPad Air, and iPad Pro models. High-quality screens, batteries, and components."
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

        {/* Header */}
        <div className={styles.categoryHeader}>
          <div className={styles.headerContent}>
            <h1>iPad Parts</h1>
            <p>Professional repair parts for all iPad models including iPad, iPad Air, iPad Mini, and iPad Pro series</p>
            <div className={styles.headerStats}>
              <span>{products.length} products available</span>
              <span>•</span>
              <span>30-day warranty</span>
              <span>•</span>
              <span>Free shipping</span>
            </div>
          </div>
          <div className={styles.headerImage}>
            <img src="/images/categories/ipad-parts.jpg" alt="iPad Parts" />
          </div>
        </div>

        {/* Filters and Sort */}
        <div className={styles.controls}>
          <div className={styles.filters}>
            <h3>Filter by Category:</h3>
            <div className={styles.filterButtons}>
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`${styles.filterBtn} ${filterBy === category.id ? styles.active : ''}`}
                  onClick={() => setFilterBy(category.id)}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>

          <div className={styles.sort}>
            <label htmlFor="sort">Sort by:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={styles.sortSelect}
            >
              <option value="name">Name (A-Z)</option>
              <option value="price-low">Price (Low to High)</option>
              <option value="price-high">Price (High to Low)</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className={styles.productsGrid}>
          {sortedProducts.length === 0 ? (
            <div className={styles.noProducts}>
              <h3>No iPad products found</h3>
              <p>We're currently updating our iPad parts inventory. Please check back soon!</p>
            </div>
          ) : (
            sortedProducts.map(product => {
              const originalPrice = product.discount_percentage
                ? product.price / (1 - product.discount_percentage / 100)
                : null;

              return (
                <div key={product.id} className={styles.productCard}>
                  <div className={styles.productImage}>
                    <img
                      src={product.image || '/images/products/placeholder.svg'}
                      alt={product.name}
                      onError={(e) => {
                        e.target.src = '/images/products/placeholder.svg';
                      }}
                    />
                    {product.discount_percentage && (
                      <div className={styles.discountBadge}>
                        -{product.discount_percentage}%
                      </div>
                    )}
                    <div className={styles.productOverlay}>
                      <Link href={`/products/${product.slug || product.id}`} className={styles.viewProductBtn}>
                        View Details
                      </Link>
                    </div>
                  </div>

                  <div className={styles.productInfo}>
                    <div className={styles.productCategory}>{product.category}</div>
                    <h3 className={styles.productName}>
                      <Link href={`/products/${product.slug || product.id}`}>{product.name}</Link>
                    </h3>
                    <div className={styles.productModel}>{product.brand} {product.sku}</div>

                    {product.average_rating && (
                      <div className={styles.productRating}>
                        <div className={styles.stars}>
                          {'★'.repeat(Math.floor(product.average_rating))}
                          {'☆'.repeat(5 - Math.floor(product.average_rating))}
                        </div>
                        <span className={styles.ratingValue}>{product.average_rating.toFixed(1)}</span>
                        <span className={styles.reviewCount}>({product.review_count || 0})</span>
                      </div>
                    )}

                    <div className={styles.productPrice}>
                      <span className={styles.currentPrice}>${product.price}</span>
                      {originalPrice && (
                        <span className={styles.originalPrice}>${originalPrice.toFixed(2)}</span>
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

                    <button
                      className={styles.addToCartBtn}
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                    >
                      {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Category Links */}
        <div className={styles.relatedCategories}>
          <h2>Explore More Categories</h2>
          <div className={styles.categoryLinks}>
            <Link href="/products/iphone-parts" className={styles.categoryLink}>
              <div className={styles.categoryIcon}>📱</div>
              <div>
                <div className={styles.categoryName}>iPhone Parts</div>
                <div className={styles.categoryDesc}>iPhone 5 to iPhone 16 series</div>
              </div>
            </Link>
            <Link href="/products/samsung-parts" className={styles.categoryLink}>
              <div className={styles.categoryIcon}>📱</div>
              <div>
                <div className={styles.categoryName}>Samsung Parts</div>
                <div className={styles.categoryDesc}>Galaxy S, A, Note series</div>
              </div>
            </Link>
            <Link href="/products/repair-tools" className={styles.categoryLink}>
              <div className={styles.categoryIcon}>🔧</div>
              <div>
                <div className={styles.categoryName}>Repair Tools</div>
                <div className={styles.categoryDesc}>Professional equipment</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
