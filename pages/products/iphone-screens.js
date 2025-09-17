import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../../nexus-techhub-fresh/components/Layout/Layout';
import { useCart } from '../../contexts/CartContext';
import styles from '../../styles/CategoryPage.module.css';

export default function IPhoneScreens() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('all');

  // iPhone Screens Data
  const iphoneScreens = [
    {
      id: 'ip15-pro-max-screen',
      name: 'iPhone 15 Pro Max OLED Screen - Aftermarket Pro',
      price: 399.99,
      originalPrice: 449.99,
      image: '/images/products/iphone-15-pro-max-screen.jpg',
      model: 'iPhone 15 Pro Max',
      type: 'OLED',
      size: '6.7"',
      stock: 25,
      rating: 4.8,
      reviews: 156,
      tags: ['screen', 'oled', '15', 'pro max']
    },
    {
      id: 'ip15-pro-screen',
      name: 'iPhone 15 Pro OLED Screen Assembly',
      price: 349.99,
      image: '/images/products/iphone-15-pro-screen.jpg',
      model: 'iPhone 15 Pro',
      type: 'OLED',
      size: '6.1"',
      stock: 35,
      rating: 4.9,
      reviews: 203,
      tags: ['screen', 'oled', '15', 'pro']
    },
    {
      id: 'ip15-plus-screen',
      name: 'iPhone 15 Plus LCD Screen Assembly',
      price: 249.99,
      image: '/images/products/iphone-15-plus-screen.jpg',
      model: 'iPhone 15 Plus',
      type: 'LCD',
      size: '6.7"',
      stock: 40,
      rating: 4.7,
      reviews: 89,
      tags: ['screen', 'lcd', '15', 'plus']
    },
    {
      id: 'ip14-pro-max-screen',
      name: 'iPhone 14 Pro Max OLED Screen Assembly',
      price: 329.99,
      image: '/images/products/iphone-14-pro-max-screen.jpg',
      model: 'iPhone 14 Pro Max',
      type: 'OLED',
      size: '6.7"',
      stock: 28,
      rating: 4.8,
      reviews: 145,
      tags: ['screen', 'oled', '14', 'pro max']
    },
    {
      id: 'ip14-pro-screen',
      name: 'iPhone 14 Pro OLED Screen Assembly',
      price: 299.99,
      image: '/images/products/iphone-14-pro-screen.jpg',
      model: 'iPhone 14 Pro',
      type: 'OLED',
      size: '6.1"',
      stock: 45,
      rating: 4.9,
      reviews: 178,
      tags: ['screen', 'oled', '14', 'pro']
    },
    {
      id: 'ip14-plus-screen',
      name: 'iPhone 14 Plus LCD Screen Assembly',
      price: 199.99,
      image: '/images/products/iphone-14-plus-screen.jpg',
      model: 'iPhone 14 Plus',
      type: 'LCD',
      size: '6.7"',
      stock: 55,
      rating: 4.7,
      reviews: 92,
      tags: ['screen', 'lcd', '14', 'plus']
    },
    {
      id: 'ip13-pro-max-screen',
      name: 'iPhone 13 Pro Max OLED Screen Assembly',
      price: 279.99,
      image: '/images/products/iphone-13-pro-max-screen.jpg',
      model: 'iPhone 13 Pro Max',
      type: 'OLED',
      size: '6.7"',
      stock: 32,
      rating: 4.8,
      reviews: 134,
      tags: ['screen', 'oled', '13', 'pro max']
    },
    {
      id: 'ip13-pro-screen',
      name: 'iPhone 13 Pro OLED Screen Assembly',
      price: 249.99,
      originalPrice: 279.99,
      image: '/images/products/iphone-13-pro-screen.jpg',
      model: 'iPhone 13 Pro',
      type: 'OLED',
      size: '6.1"',
      stock: 60,
      rating: 4.9,
      reviews: 189,
      tags: ['screen', 'oled', '13', 'pro']
    },
    {
      id: 'ip13-mini-screen',
      name: 'iPhone 13 Mini OLED Screen Assembly',
      price: 199.99,
      image: '/images/products/iphone-13-mini-screen.jpg',
      model: 'iPhone 13 Mini',
      type: 'OLED',
      size: '5.4"',
      stock: 45,
      rating: 4.7,
      reviews: 76,
      tags: ['screen', 'oled', '13', 'mini']
    },
    {
      id: 'ip12-pro-max-screen',
      name: 'iPhone 12 Pro Max OLED Screen Assembly',
      price: 229.99,
      image: '/images/products/iphone-12-pro-max-screen.jpg',
      model: 'iPhone 12 Pro Max',
      type: 'OLED',
      size: '6.7"',
      stock: 38,
      rating: 4.8,
      reviews: 123,
      tags: ['screen', 'oled', '12', 'pro max']
    },
    {
      id: 'ip12-pro-screen',
      name: 'iPhone 12 Pro OLED Screen Assembly',
      price: 199.99,
      image: '/images/products/iphone-12-pro-screen.jpg',
      model: 'iPhone 12 Pro',
      type: 'OLED',
      size: '6.1"',
      stock: 52,
      rating: 4.9,
      reviews: 167,
      tags: ['screen', 'oled', '12', 'pro']
    },
    {
      id: 'ip12-mini-screen',
      name: 'iPhone 12 Mini OLED Screen Assembly',
      price: 179.99,
      image: '/images/products/iphone-12-mini-screen.jpg',
      model: 'iPhone 12 Mini',
      type: 'OLED',
      size: '5.4"',
      stock: 48,
      rating: 4.7,
      reviews: 89,
      tags: ['screen', 'oled', '12', 'mini']
    },
    {
      id: 'ip11-pro-max-screen',
      name: 'iPhone 11 Pro Max LCD Screen Assembly',
      price: 149.99,
      image: '/images/products/iphone-11-pro-max-screen.jpg',
      model: 'iPhone 11 Pro Max',
      type: 'LCD',
      size: '6.5"',
      stock: 65,
      rating: 4.6,
      reviews: 145,
      tags: ['screen', 'lcd', '11', 'pro max']
    },
    {
      id: 'ip11-pro-screen',
      name: 'iPhone 11 Pro LCD Screen Assembly',
      price: 129.99,
      image: '/images/products/iphone-11-pro-screen.jpg',
      model: 'iPhone 11 Pro',
      type: 'LCD',
      size: '5.8"',
      stock: 78,
      rating: 4.7,
      reviews: 156,
      tags: ['screen', 'lcd', '11', 'pro']
    },
    {
      id: 'ip-se-2022-screen',
      name: 'iPhone SE (2022) LCD Screen Assembly',
      price: 89.99,
      image: '/images/products/iphone-se-2022-screen.jpg',
      model: 'iPhone SE (2022)',
      type: 'LCD',
      size: '4.7"',
      stock: 85,
      rating: 4.6,
      reviews: 98,
      tags: ['screen', 'lcd', 'se', '2022']
    },
    {
      id: 'ip-se-2020-screen',
      name: 'iPhone SE (2020) LCD Screen Assembly',
      price: 79.99,
      image: '/images/products/iphone-se-2020-screen.jpg',
      model: 'iPhone SE (2020)',
      type: 'LCD',
      size: '4.7"',
      stock: 92,
      rating: 4.5,
      reviews: 87,
      tags: ['screen', 'lcd', 'se', '2020']
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setProducts(iphoneScreens);
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
    { id: 'all', name: 'All iPhone Screens', count: products.length },
    { id: 'oled', name: 'OLED Screens', count: products.filter(p => p.type === 'OLED').length },
    { id: 'lcd', name: 'LCD Screens', count: products.filter(p => p.type === 'LCD').length }
  ];

  if (loading) {
    return (
      <Layout title="iPhone Screens - Nexus Tech Hub" description="Professional iPhone screen replacements and LCD assemblies">
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <h3>Loading iPhone Screens...</h3>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title="iPhone Screens & LCDs - Professional Display Replacements | Nexus Tech Hub"
      description="Complete range of iPhone screen assemblies from iPhone 5 to iPhone 16. OLED and LCD displays with warranty."
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
          <span className={styles.current}>Screens & LCDs</span>
        </div>

        {/* Header */}
        <div className={styles.categoryHeader}>
          <div className={styles.headerContent}>
            <h1>iPhone Screens & LCDs</h1>
            <p>Professional screen replacement assemblies for all iPhone models</p>
            <div className={styles.headerStats}>
              <span>{products.length} screen models available</span>
              <span>•</span>
              <span>30-day warranty</span>
              <span>•</span>
              <span>Free shipping</span>
            </div>
          </div>
          <div className={styles.headerImage}>
            <img src="/images/categories/iphone-screens.jpg" alt="iPhone Screens" />
          </div>
        </div>

        {/* Category Tabs */}
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
                {product.originalPrice && (
                  <div className={styles.discountBadge}>
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </div>
                )}
                <div className={styles.productOverlay}>
                  <Link href={`/products/${product.id}`} className={styles.viewProductBtn}>
                    View Details
                  </Link>
                </div>
              </div>

              <div className={styles.productInfo}>
                <div className={styles.productCategory}>{product.type} Screen</div>
                <h3 className={styles.productName}>
                  <Link href={`/products/${product.id}`}>{product.name}</Link>
                </h3>
                <div className={styles.productModel}>{product.model} • {product.size}</div>

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
                  {product.originalPrice && (
                    <span className={styles.originalPrice}>${product.originalPrice}</span>
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
          ))}
        </div>

        {/* CTA Section */}
        <div className={styles.ctaSection}>
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
    </Layout>
  );
}
