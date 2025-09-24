import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { useCart } from '../../contexts/CartContext';
import styles from '../../styles/CategoryPage.module.css';

export default function SamsungScreens() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('all');

  // Samsung Screens Data
  const samsungScreens = [
    {
      id: 'sg-s24-ultra-screen',
      name: 'Samsung Galaxy S24 Ultra AMOLED Screen',
      price: 349.99,
      originalPrice: 399.99,
      image: '/images/products/samsung-s24-ultra-screen.jpg',
      model: 'Galaxy S24 Ultra',
      type: 'Dynamic AMOLED 2X',
      size: '6.8"',
      stock: 20,
      rating: 4.9,
      reviews: 87,
      tags: ['screen', 'amoled', 'ultra', 's24', 's pen']
    },
    {
      id: 'sg-s24-plus-screen',
      name: 'Samsung Galaxy S24 Plus AMOLED Screen',
      price: 299.99,
      image: '/images/products/samsung-s24-plus-screen.jpg',
      model: 'Galaxy S24 Plus',
      type: 'Dynamic AMOLED 2X',
      size: '6.7"',
      stock: 28,
      rating: 4.8,
      reviews: 65,
      tags: ['screen', 'amoled', 'plus', 's24']
    },
    {
      id: 'sg-s24-screen',
      name: 'Samsung Galaxy S24 OLED Screen Assembly',
      price: 279.99,
      image: '/images/products/samsung-s24-screen.jpg',
      model: 'Galaxy S24',
      type: 'Dynamic AMOLED 2X',
      size: '6.2"',
      stock: 30,
      rating: 4.7,
      reviews: 54,
      tags: ['screen', 'amoled', 's24']
    },
    {
      id: 'sg-s23-ultra-screen',
      name: 'Samsung Galaxy S23 Ultra AMOLED Screen',
      price: 319.99,
      image: '/images/products/samsung-s23-ultra-screen.jpg',
      model: 'Galaxy S23 Ultra',
      type: 'Dynamic AMOLED 2X',
      size: '6.8"',
      stock: 22,
      rating: 4.9,
      reviews: 112,
      tags: ['screen', 'amoled', 'ultra', 's23', 's pen']
    },
    {
      id: 'sg-s23-plus-screen',
      name: 'Samsung Galaxy S23 Plus AMOLED Screen',
      price: 269.99,
      image: '/images/products/samsung-s23-plus-screen.jpg',
      model: 'Galaxy S23 Plus',
      type: 'Dynamic AMOLED 2X',
      size: '6.6"',
      stock: 35,
      rating: 4.8,
      reviews: 78,
      tags: ['screen', 'amoled', 'plus', 's23']
    },
    {
      id: 'sg-s23-screen',
      name: 'Samsung Galaxy S23 AMOLED Screen Assembly',
      price: 249.99,
      image: '/images/products/samsung-s23-screen.jpg',
      model: 'Galaxy S23',
      type: 'Dynamic AMOLED 2X',
      size: '6.1"',
      stock: 40,
      rating: 4.6,
      reviews: 91,
      tags: ['screen', 'amoled', 's23']
    },
    {
      id: 'sg-s22-ultra-screen',
      name: 'Samsung Galaxy S22 Ultra AMOLED Screen',
      price: 289.99,
      image: '/images/products/samsung-s22-ultra-screen.jpg',
      model: 'Galaxy S22 Ultra',
      type: 'Dynamic AMOLED 2X',
      size: '6.8"',
      stock: 25,
      rating: 4.8,
      reviews: 134,
      tags: ['screen', 'amoled', 'ultra', 's22', 's pen']
    },
    {
      id: 'sg-s22-plus-screen',
      name: 'Samsung Galaxy S22 Plus AMOLED Screen',
      price: 249.99,
      image: '/images/products/samsung-s22-plus-screen.jpg',
      model: 'Galaxy S22 Plus',
      type: 'Dynamic AMOLED 2X',
      size: '6.6"',
      stock: 40,
      rating: 4.7,
      reviews: 89,
      tags: ['screen', 'amoled', 'plus', 's22']
    },
    {
      id: 'sg-s22-screen',
      name: 'Samsung Galaxy S22 AMOLED Screen Assembly',
      price: 229.99,
      image: '/images/products/samsung-s22-screen.jpg',
      model: 'Galaxy S22',
      type: 'Dynamic AMOLED 2X',
      size: '6.1"',
      stock: 45,
      rating: 4.6,
      reviews: 76,
      tags: ['screen', 'amoled', 's22']
    },
    {
      id: 'sg-s21-ultra-screen',
      name: 'Samsung Galaxy S21 Ultra AMOLED Screen',
      price: 259.99,
      image: '/images/products/samsung-s21-ultra-screen.jpg',
      model: 'Galaxy S21 Ultra',
      type: 'Dynamic AMOLED 2X',
      size: '6.8"',
      stock: 30,
      rating: 4.8,
      reviews: 156,
      tags: ['screen', 'amoled', 'ultra', 's21']
    },
    {
      id: 'sg-s21-plus-screen',
      name: 'Samsung Galaxy S21 Plus AMOLED Screen',
      price: 219.99,
      image: '/images/products/samsung-s21-plus-screen.jpg',
      model: 'Galaxy S21 Plus',
      type: 'Dynamic AMOLED 2X',
      size: '6.7"',
      stock: 42,
      rating: 4.7,
      reviews: 98,
      tags: ['screen', 'amoled', 'plus', 's21']
    },
    {
      id: 'sg-s21-screen',
      name: 'Samsung Galaxy S21 AMOLED Screen Assembly',
      price: 199.99,
      image: '/images/products/samsung-s21-screen.jpg',
      model: 'Galaxy S21',
      type: 'Dynamic AMOLED 2X',
      size: '6.2"',
      stock: 50,
      rating: 4.6,
      reviews: 87,
      tags: ['screen', 'amoled', 's21']
    },
    {
      id: 'sg-z-fold5-screen',
      name: 'Samsung Galaxy Z Fold 5 Inner Screen',
      price: 599.99,
      originalPrice: 699.99,
      image: '/images/products/samsung-z-fold5-screen.jpg',
      model: 'Galaxy Z Fold 5',
      type: 'Foldable AMOLED',
      size: '7.6"',
      stock: 15,
      rating: 4.9,
      reviews: 43,
      tags: ['screen', 'amoled', 'fold', 'z fold 5', 'foldable']
    },
    {
      id: 'sg-z-fold4-screen',
      name: 'Samsung Galaxy Z Fold 4 Inner Screen',
      price: 549.99,
      image: '/images/products/samsung-z-fold4-screen.jpg',
      model: 'Galaxy Z Fold 4',
      type: 'Foldable AMOLED',
      size: '7.6"',
      stock: 18,
      rating: 4.8,
      reviews: 67,
      tags: ['screen', 'amoled', 'fold', 'z fold 4', 'foldable']
    },
    {
      id: 'sg-z-flip5-screen',
      name: 'Samsung Galaxy Z Flip 5 Outer Screen',
      price: 149.99,
      image: '/images/products/samsung-z-flip5-screen.jpg',
      model: 'Galaxy Z Flip 5',
      type: 'Super AMOLED',
      size: '3.4"',
      stock: 35,
      rating: 4.6,
      reviews: 54,
      tags: ['screen', 'amoled', 'flip', 'z flip 5', 'outer']
    },
    {
      id: 'sg-z-flip4-screen',
      name: 'Samsung Galaxy Z Flip 4 Outer Screen',
      price: 129.99,
      image: '/images/products/samsung-z-flip4-screen.jpg',
      model: 'Galaxy Z Flip 4',
      type: 'Super AMOLED',
      size: '3.4"',
      stock: 40,
      rating: 4.5,
      reviews: 78,
      tags: ['screen', 'amoled', 'flip', 'z flip 4', 'outer']
    },
    {
      id: 'sg-note20-ultra-screen',
      name: 'Samsung Galaxy Note 20 Ultra Screen',
      price: 199.99,
      image: '/images/products/samsung-note20-ultra-screen.jpg',
      model: 'Galaxy Note 20 Ultra',
      type: 'Super AMOLED Plus',
      size: '6.9"',
      stock: 40,
      rating: 4.7,
      reviews: 123,
      tags: ['screen', 'amoled', 'note', 'note 20', 's pen']
    },
    {
      id: 'sg-note20-screen',
      name: 'Samsung Galaxy Note 20 Screen Assembly',
      price: 179.99,
      image: '/images/products/samsung-note20-screen.jpg',
      model: 'Galaxy Note 20',
      type: 'Super AMOLED Plus',
      size: '6.7"',
      stock: 45,
      rating: 4.6,
      reviews: 98,
      tags: ['screen', 'amoled', 'note', 'note 20', 's pen']
    },
    {
      id: 'sg-a54-screen',
      name: 'Samsung Galaxy A54 LCD Screen Assembly',
      price: 149.99,
      image: '/images/products/samsung-a54-screen.jpg',
      model: 'Galaxy A54',
      type: 'Super AMOLED',
      size: '6.4"',
      stock: 65,
      rating: 4.5,
      reviews: 156,
      tags: ['screen', 'amoled', 'a54', 'a series']
    },
    {
      id: 'sg-a53-screen',
      name: 'Samsung Galaxy A53 LCD Screen Assembly',
      price: 129.99,
      image: '/images/products/samsung-a53-screen.jpg',
      model: 'Galaxy A53',
      type: 'Super AMOLED',
      size: '6.5"',
      stock: 70,
      rating: 4.4,
      reviews: 134,
      tags: ['screen', 'amoled', 'a53', 'a series']
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setProducts(samsungScreens);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = products.filter(product => {
    if (filterBy === 'all') return true;
    return product.type.toLowerCase().includes(filterBy);
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
    { id: 'all', name: 'All Samsung Screens', count: products.length },
    { id: 'dynamic amoled', name: 'Dynamic AMOLED', count: products.filter(p => p.type.includes('Dynamic AMOLED')).length },
    { id: 'super amoled', name: 'Super AMOLED', count: products.filter(p => p.type.includes('Super AMOLED')).length },
    { id: 'foldable', name: 'Foldable Screens', count: products.filter(p => p.type.includes('Foldable')).length }
  ];

  if (loading) {
    return (
      <Layout title="Samsung Screens - Nexus Tech Hub" description="Professional Samsung Galaxy screen replacements and LCD assemblies">
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <h3>Loading Samsung Screens...</h3>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title="Samsung Screens & LCDs - Professional Display Replacements | Nexus Tech Hub"
      description="Complete range of Samsung Galaxy screen assemblies including S, A, Note, and Fold series. AMOLED displays with warranty."
    >
      <div className={styles.categoryPage}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span className={styles.separator}>/</span>
          <Link href="/products">Products</Link>
          <span className={styles.separator}>/</span>
          <Link href="/products/samsung-parts">Samsung Parts</Link>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>Screens & LCDs</span>
        </div>

        {/* Header */}
        <div className={styles.categoryHeader}>
          <div className={styles.headerContent}>
            <h1>Samsung Screens & LCDs</h1>
            <p>Professional screen replacement assemblies for all Samsung Galaxy models</p>
            <div className={styles.headerStats}>
              <span>{products.length} screen models available</span>
              <span>•</span>
              <span>30-day warranty</span>
              <span>•</span>
              <span>Free shipping</span>
            </div>
          </div>
          <div className={styles.headerImage}>
            <img src="/images/categories/samsung-screens.jpg" alt="Samsung Screens" />
          </div>
        </div>

        {/* Category Tabs */}
        <div className={styles.categoryTabs}>
          <Link href="/products/samsung-parts" className={styles.categoryTab}>
            All Samsung Parts
          </Link>
          <Link href="/products/samsung-screens" className={`${styles.categoryTab} ${styles.active}`}>
            Screens & LCDs
          </Link>
          <Link href="/products/samsung-batteries" className={styles.categoryTab}>
            Batteries
          </Link>
          <Link href="/products/samsung-charging" className={styles.categoryTab}>
            Charging Ports
          </Link>
          <Link href="/products/samsung-s-pen" className={styles.categoryTab}>
            S Pen
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
                <div className={styles.productCategory}>{product.type}</div>
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
