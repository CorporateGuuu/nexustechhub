import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../../nexus-techhub-fresh/components/Layout/Layout';
import { useCart } from '../../contexts/CartContext';
import styles from '../../styles/CategoryPage.module.css';

export default function IPhoneCharging() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('all');

  // iPhone Charging Ports Data
  const iphoneCharging = [
    {
      id: 'ip15-charging-port',
      name: 'iPhone 15 Series USB-C Charging Port',
      price: 49.99,
      image: '/images/products/iphone-15-charging.jpg',
      model: 'iPhone 15, 15 Plus, 15 Pro, 15 Pro Max',
      type: 'USB-C',
      stock: 150,
      rating: 4.5,
      reviews: 234,
      tags: ['charging', 'port', 'usb-c', '15']
    },
    {
      id: 'ip14-charging-port',
      name: 'iPhone 14 Series USB-C Charging Port',
      price: 45.99,
      image: '/images/products/iphone-14-charging.jpg',
      model: 'iPhone 14, 14 Plus, 14 Pro, 14 Pro Max',
      type: 'USB-C',
      stock: 135,
      rating: 4.4,
      reviews: 198,
      tags: ['charging', 'port', 'usb-c', '14']
    },
    {
      id: 'ip13-charging-port',
      name: 'iPhone 13 Series USB-C Charging Port',
      price: 42.99,
      image: '/images/products/iphone-13-charging.jpg',
      model: 'iPhone 13, 13 Mini, 13 Pro, 13 Pro Max',
      type: 'USB-C',
      stock: 120,
      rating: 4.5,
      reviews: 267,
      tags: ['charging', 'port', 'usb-c', '13']
    },
    {
      id: 'ip12-charging-port',
      name: 'iPhone 12 Series Charging Port Assembly',
      price: 39.99,
      image: '/images/products/iphone-12-charging.jpg',
      model: 'iPhone 12, 12 Mini, 12 Pro, 12 Pro Max',
      type: 'Lightning',
      stock: 180,
      rating: 4.3,
      reviews: 312,
      tags: ['charging', 'port', 'lightning', '12']
    },
    {
      id: 'ip11-charging-port',
      name: 'iPhone 11 Series Charging Port Assembly',
      price: 35.99,
      image: '/images/products/iphone-11-charging.jpg',
      model: 'iPhone 11, 11 Pro, 11 Pro Max',
      type: 'Lightning',
      stock: 165,
      rating: 4.2,
      reviews: 289,
      tags: ['charging', 'port', 'lightning', '11']
    },
    {
      id: 'ip-xs-max-charging-port',
      name: 'iPhone XS Max Charging Port Assembly',
      price: 32.99,
      image: '/images/products/iphone-xs-max-charging.jpg',
      model: 'iPhone XS Max',
      type: 'Lightning',
      stock: 95,
      rating: 4.1,
      reviews: 156,
      tags: ['charging', 'port', 'lightning', 'xs max']
    },
    {
      id: 'ip-xs-charging-port',
      name: 'iPhone XS Charging Port Assembly',
      price: 31.99,
      image: '/images/products/iphone-xs-charging.jpg',
      model: 'iPhone XS',
      type: 'Lightning',
      stock: 110,
      rating: 4.0,
      reviews: 134,
      tags: ['charging', 'port', 'lightning', 'xs']
    },
    {
      id: 'ip-xr-charging-port',
      name: 'iPhone XR Charging Port Assembly',
      price: 30.99,
      image: '/images/products/iphone-xr-charging.jpg',
      model: 'iPhone XR',
      type: 'Lightning',
      stock: 125,
      rating: 4.1,
      reviews: 198,
      tags: ['charging', 'port', 'lightning', 'xr']
    },
    {
      id: 'ip-x-charging-port',
      name: 'iPhone X Charging Port Assembly',
      price: 29.99,
      image: '/images/products/iphone-x-charging.jpg',
      model: 'iPhone X',
      type: 'Lightning',
      stock: 100,
      rating: 4.0,
      reviews: 167,
      tags: ['charging', 'port', 'lightning', 'x']
    },
    {
      id: 'ip-8-plus-charging-port',
      name: 'iPhone 8 Plus Charging Port Assembly',
      price: 27.99,
      image: '/images/products/iphone-8-plus-charging.jpg',
      model: 'iPhone 8 Plus',
      type: 'Lightning',
      stock: 140,
      rating: 3.9,
      reviews: 145,
      tags: ['charging', 'port', 'lightning', '8 plus']
    },
    {
      id: 'ip-8-charging-port',
      name: 'iPhone 8 Charging Port Assembly',
      price: 26.99,
      image: '/images/products/iphone-8-charging.jpg',
      model: 'iPhone 8',
      type: 'Lightning',
      stock: 155,
      rating: 3.8,
      reviews: 123,
      tags: ['charging', 'port', 'lightning', '8']
    },
    {
      id: 'ip-7-plus-charging-port',
      name: 'iPhone 7 Plus Charging Port Assembly',
      price: 24.99,
      image: '/images/products/iphone-7-plus-charging.jpg',
      model: 'iPhone 7 Plus',
      type: 'Lightning',
      stock: 120,
      rating: 3.7,
      reviews: 98,
      tags: ['charging', 'port', 'lightning', '7 plus']
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setProducts(iphoneCharging);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = products.filter(product => {
    if (filterBy === 'all') return true;
    return product.type.toLowerCase() === filterBy;
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
    { id: 'all', name: 'All Charging Ports', count: products.length },
    { id: 'usb-c', name: 'USB-C Ports', count: products.filter(p => p.type === 'USB-C').length },
    { id: 'lightning', name: 'Lightning Ports', count: products.filter(p => p.type === 'Lightning').length }
  ];

  if (loading) {
    return (
      <Layout title="iPhone Charging Ports - Nexus Tech Hub" description="Professional iPhone charging port replacements">
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <h3>Loading iPhone Charging Ports...</h3>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title="iPhone Charging Ports - Professional Port Replacements | Nexus Tech Hub"
      description="USB-C and Lightning charging port assemblies for all iPhone models. Fast shipping and warranty."
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
          <span className={styles.current}>Charging Ports</span>
        </div>

        {/* Header */}
        <div className={styles.categoryHeader}>
          <div className={styles.headerContent}>
            <h1>iPhone Charging Ports</h1>
            <p>USB-C and Lightning charging port assemblies for all iPhone models</p>
            <div className={styles.headerStats}>
              <span>{products.length} port models available</span>
              <span>•</span>
              <span>30-day warranty</span>
              <span>•</span>
              <span>Free shipping</span>
            </div>
          </div>
          <div className={styles.headerImage}>
            <img src="/images/categories/iphone-charging.jpg" alt="iPhone Charging Ports" />
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
          <Link href="/products/iphone-batteries" className={styles.categoryTab}>
            Batteries
          </Link>
          <Link href="/products/iphone-charging" className={`${styles.categoryTab} ${styles.active}`}>
            Charging Ports
          </Link>
          <Link href="/products/iphone-cameras" className={styles.categoryTab}>
            Cameras
          </Link>
        </div>

        {/* Filters and Sort */}
        <div className={styles.controls}>
          <div className={styles.filters}>
            <h3>Filter by Type:</h3>
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
                <div className={styles.productCategory}>{product.type} Port</div>
                <h3 className={styles.productName}>
                  <Link href={`/products/${product.id}`}>{product.name}</Link>
                </h3>
                <div className={styles.productModel}>{product.model}</div>

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
