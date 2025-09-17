import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../../nexus-techhub-fresh/components/Layout/Layout';
import { useCart } from '../../contexts/CartContext';
import styles from '../../styles/CategoryPage.module.css';

export default function IPhoneBatteries() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('all');

  // iPhone Batteries Data
  const iphoneBatteries = [
    {
      id: 'ip15-battery',
      name: 'iPhone 15 Series Battery Replacement',
      price: 89.99,
      image: '/images/products/iphone-15-battery.jpg',
      model: 'iPhone 15, 15 Plus, 15 Pro, 15 Pro Max',
      capacity: 'Original Apple capacity',
      stock: 120,
      rating: 4.6,
      reviews: 312,
      tags: ['battery', '15', 'replacement']
    },
    {
      id: 'ip14-battery',
      name: 'iPhone 14 Battery Replacement',
      price: 79.99,
      image: '/images/products/iphone-14-battery.jpg',
      model: 'iPhone 14, 14 Plus, 14 Pro, 14 Pro Max',
      capacity: 'Original Apple capacity',
      stock: 85,
      rating: 4.5,
      reviews: 267,
      tags: ['battery', '14', 'replacement']
    },
    {
      id: 'ip13-battery',
      name: 'iPhone 13 Series Battery Replacement',
      price: 69.99,
      image: '/images/products/iphone-13-battery.jpg',
      model: 'iPhone 13, 13 Mini, 13 Pro, 13 Pro Max',
      capacity: 'Original Apple capacity',
      stock: 95,
      rating: 4.6,
      reviews: 298,
      tags: ['battery', '13', 'replacement']
    },
    {
      id: 'ip12-battery',
      name: 'iPhone 12 Series Battery Replacement',
      price: 59.99,
      image: '/images/products/iphone-12-battery.jpg',
      model: 'iPhone 12, 12 Mini, 12 Pro, 12 Pro Max',
      capacity: 'Original Apple capacity',
      stock: 110,
      rating: 4.5,
      reviews: 234,
      tags: ['battery', '12', 'replacement']
    },
    {
      id: 'ip11-battery',
      name: 'iPhone 11 Series Battery Replacement',
      price: 49.99,
      image: '/images/products/iphone-11-battery.jpg',
      model: 'iPhone 11, 11 Pro, 11 Pro Max',
      capacity: 'Original Apple capacity',
      stock: 140,
      rating: 4.4,
      reviews: 345,
      tags: ['battery', '11', 'replacement']
    },
    {
      id: 'ip-xs-max-battery',
      name: 'iPhone XS Max Battery Replacement',
      price: 39.99,
      image: '/images/products/iphone-xs-max-battery.jpg',
      model: 'iPhone XS Max',
      capacity: 'Original Apple capacity',
      stock: 75,
      rating: 4.3,
      reviews: 189,
      tags: ['battery', 'xs max', 'replacement']
    },
    {
      id: 'ip-xs-battery',
      name: 'iPhone XS Battery Replacement',
      price: 35.99,
      image: '/images/products/iphone-xs-battery.jpg',
      model: 'iPhone XS',
      capacity: 'Original Apple capacity',
      stock: 90,
      rating: 4.2,
      reviews: 156,
      tags: ['battery', 'xs', 'replacement']
    },
    {
      id: 'ip-xr-battery',
      name: 'iPhone XR Battery Replacement',
      price: 34.99,
      image: '/images/products/iphone-xr-battery.jpg',
      model: 'iPhone XR',
      capacity: 'Original Apple capacity',
      stock: 105,
      rating: 4.3,
      reviews: 278,
      tags: ['battery', 'xr', 'replacement']
    },
    {
      id: 'ip-x-battery',
      name: 'iPhone X Battery Replacement',
      price: 32.99,
      image: '/images/products/iphone-x-battery.jpg',
      model: 'iPhone X',
      capacity: 'Original Apple capacity',
      stock: 85,
      rating: 4.2,
      reviews: 198,
      tags: ['battery', 'x', 'replacement']
    },
    {
      id: 'ip-8-plus-battery',
      name: 'iPhone 8 Plus Battery Replacement',
      price: 29.99,
      image: '/images/products/iphone-8-plus-battery.jpg',
      model: 'iPhone 8 Plus',
      capacity: 'Original Apple capacity',
      stock: 120,
      rating: 4.1,
      reviews: 234,
      tags: ['battery', '8 plus', 'replacement']
    },
    {
      id: 'ip-8-battery',
      name: 'iPhone 8 Battery Replacement',
      price: 27.99,
      image: '/images/products/iphone-8-battery.jpg',
      model: 'iPhone 8',
      capacity: 'Original Apple capacity',
      stock: 135,
      rating: 4.0,
      reviews: 187,
      tags: ['battery', '8', 'replacement']
    },
    {
      id: 'ip-7-plus-battery',
      name: 'iPhone 7 Plus Battery Replacement',
      price: 25.99,
      image: '/images/products/iphone-7-plus-battery.jpg',
      model: 'iPhone 7 Plus',
      capacity: 'Original Apple capacity',
      stock: 95,
      rating: 3.9,
      reviews: 145,
      tags: ['battery', '7 plus', 'replacement']
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setProducts(iphoneBatteries);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = products.filter(product => {
    if (filterBy === 'all') return true;
    return product.model.toLowerCase().includes(filterBy);
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id.localeCompare(a.id);
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
    { id: 'all', name: 'All iPhone Batteries', count: products.length },
    { id: '15', name: 'iPhone 15 Series', count: products.filter(p => p.model.includes('15')).length },
    { id: '14', name: 'iPhone 14 Series', count: products.filter(p => p.model.includes('14')).length },
    { id: '13', name: 'iPhone 13 Series', count: products.filter(p => p.model.includes('13')).length },
    { id: '12', name: 'iPhone 12 Series', count: products.filter(p => p.model.includes('12')).length },
    { id: '11', name: 'iPhone 11 Series', count: products.filter(p => p.model.includes('11')).length }
  ];

  if (loading) {
    return (
      <Layout title="iPhone Batteries - Nexus Tech Hub" description="Professional iPhone battery replacements with warranty">
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <h3>Loading iPhone Batteries...</h3>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title="iPhone Batteries - Professional Battery Replacements | Nexus Tech Hub"
      description="Original capacity iPhone battery replacements for all models from iPhone 7 to iPhone 15. 30-day warranty."
    >
      <div className={styles.categoryPage}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span className={styles.separator}>/</span>
          <Link href="/products">Products</Link>
          <span className={styles.separator}>/</span>
          <Link href="/products/iphone-parts">iPhone Parts</Link>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>Batteries</span>
        </div>

        {/* Header */}
        <div className={styles.categoryHeader}>
          <div className={styles.headerContent}>
            <h1>iPhone Batteries</h1>
            <p>Original capacity battery replacements for all iPhone models</p>
            <div className={styles.headerStats}>
              <span>{products.length} battery models available</span>
              <span>•</span>
              <span>30-day warranty</span>
              <span>•</span>
              <span>Free shipping</span>
            </div>
          </div>
          <div className={styles.headerImage}>
            <img src="/images/categories/iphone-batteries.jpg" alt="iPhone Batteries" />
          </div>
        </div>

        {/* Category Tabs */}
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

        {/* Filters and Sort */}
        <div className={styles.controls}>
          <div className={styles.filters}>
            <h3>Filter by Series:</h3>
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
          {sortedProducts.map(product => (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.productImage}>
                <img
                  src={product.image}
                  alt={product.name}
                  onError={(e) => {
                    e.target.src = '/images/products/placeholder.svg';
                  }}
                />
                <div className={styles.productOverlay}>
                  <Link href={`/products/${product.id}`} className={styles.viewProductBtn}>
                    View Details
                  </Link>
                </div>
              </div>

              <div className={styles.productInfo}>
                <div className={styles.productCategory}>Battery Replacement</div>
                <h3 className={styles.productName}>
                  <Link href={`/products/${product.id}`}>{product.name}</Link>
                </h3>
                <div className={styles.productModel}>{product.model}</div>
                <div className={styles.productSpecs}>{product.capacity}</div>

                <div className={styles.productRating}>
                  <div className={styles.stars}>
                    {'★'.repeat(Math.floor(product.rating))}
                    {'☆'.repeat(5 - Math.floor(product.rating))}
                  </div>
                  <span className={styles.ratingValue}>{product.rating}</span>
                  <span className={styles.reviewCount}>({product.reviews})</span>
                </div>

                <div className={styles.productPrice}>
                  <span className={styles.currentPrice}>${product.price}</span>
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
          ))}
        </div>

        {/* CTA Section */}
        <div className={styles.ctaSection}>
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
    </Layout>
  );
}
