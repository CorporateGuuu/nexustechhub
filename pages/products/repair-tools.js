import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { useCart } from '../../contexts/CartContext';
import styles from '../../styles/CategoryPage.module.css';

export default function RepairTools() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('all');

  // Fetch repair tools from API
  const fetchRepairTools = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/products?category=repair-tools&limit=100');
      const data = await response.json();

      if (data.success) {
        setProducts(data.data || []);
      } else {
        setError('Failed to load repair tools. Please try again.');
        setProducts([]);
      }
    } catch (err) {
      console.error('Error fetching repair tools:', err);
      setError('Failed to load repair tools. Please try again.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepairTools();
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
    { id: 'all', name: 'All Tools', count: products.length },
    { id: 'toolkits', name: 'Toolkits', count: products.filter(p => p.category === 'Toolkits').length },
    { id: 'screwdrivers', name: 'Screwdrivers', count: products.filter(p => p.category === 'Screwdrivers').length },
    { id: 'opening tools', name: 'Opening Tools', count: products.filter(p => p.category === 'Opening Tools').length },
    { id: 'heat tools', name: 'Heat Tools', count: products.filter(p => p.category === 'Heat Tools').length },
    { id: 'soldering', name: 'Soldering', count: products.filter(p => p.category === 'Soldering').length },
    { id: 'testing tools', name: 'Testing Tools', count: products.filter(p => p.category === 'Testing Tools').length },
    { id: 'inspection', name: 'Inspection', count: products.filter(p => p.category === 'Inspection').length },
    { id: 'hand tools', name: 'Hand Tools', count: products.filter(p => p.category === 'Hand Tools').length },
    { id: 'safety equipment', name: 'Safety Equipment', count: products.filter(p => p.category === 'Safety Equipment').length },
    { id: 'consumables', name: 'Consumables', count: products.filter(p => p.category === 'Consumables').length }
  ];

  if (loading) {
    return (
      <Layout title="Repair Tools - Nexus Tech Hub" description="Professional mobile device repair tools and equipment">
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <h3>Loading Repair Tools...</h3>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Repair Tools - Nexus Tech Hub" description="Professional mobile device repair tools and equipment">
        <div className={styles.errorContainer}>
          <h3>Error Loading Products</h3>
          <p>{error}</p>
          <button onClick={fetchRepairTools} className="btn btn-primary">
            Try Again
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title="Repair Tools - Professional Mobile Device Repair Equipment | Nexus Tech Hub"
      description="Complete range of professional repair tools for mobile device technicians. Toolkits, screwdrivers, heat guns, and testing equipment."
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

        {/* Header */}
        <div className={styles.categoryHeader}>
          <div className={styles.headerContent}>
            <h1>Repair Tools</h1>
            <p>Professional-grade repair tools and equipment for mobile device technicians</p>
            <div className={styles.headerStats}>
              <span>{products.length} products available</span>
              <span>•</span>
              <span>Professional quality</span>
              <span>•</span>
              <span>Free shipping</span>
            </div>
          </div>
          <div className={styles.headerImage}>
            <img src="/images/categories/repair-tools.jpg" alt="Repair Tools" />
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
              <h3>No repair tools found</h3>
              <p>We're currently updating our repair tools inventory. Please check back soon!</p>
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
                    <div className={styles.productModel}>Brand: {product.brand}</div>

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
            <Link href="/products/ipad-parts" className={styles.categoryLink}>
              <div className={styles.categoryIcon}>📱</div>
              <div>
                <div className={styles.categoryName}>iPad Parts</div>
                <div className={styles.categoryDesc}>iPad, iPad Air, iPad Pro</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
