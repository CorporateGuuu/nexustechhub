import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { useCart } from '../../contexts/CartContext';
import styles from '../../styles/CategoryPage.module.css';

export default function IPhoneParts() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('all');

  // iPhone Parts Data
  const iphoneParts = [
    {
      id: 'ip15-pro-max-screen',
      name: 'iPhone 15 Pro Max OLED Screen - Aftermarket Pro',
      price: 399.99,
      originalPrice: 449.99,
      image: '/images/products/iphone-15-pro-max-screen.jpg',
      category: 'Screens',
      model: 'iPhone 15 Pro Max',
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
      category: 'Screens',
      model: 'iPhone 15 Pro',
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
      category: 'Screens',
      model: 'iPhone 15 Plus',
      stock: 40,
      rating: 4.7,
      reviews: 89,
      tags: ['screen', 'lcd', '15', 'plus']
    },
    {
      id: 'ip15-battery',
      name: 'iPhone 15 Series Battery Replacement',
      price: 89.99,
      image: '/images/products/iphone-15-battery.jpg',
      category: 'Batteries',
      model: 'iPhone 15 Series',
      stock: 120,
      rating: 4.6,
      reviews: 312,
      tags: ['battery', '15', 'replacement']
    },
    {
      id: 'ip14-pro-max-screen',
      name: 'iPhone 14 Pro Max OLED Screen Assembly',
      price: 329.99,
      image: '/images/products/iphone-14-pro-max-screen.jpg',
      category: 'Screens',
      model: 'iPhone 14 Pro Max',
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
      category: 'Screens',
      model: 'iPhone 14 Pro',
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
      category: 'Screens',
      model: 'iPhone 14 Plus',
      stock: 55,
      rating: 4.7,
      reviews: 92,
      tags: ['screen', 'lcd', '14', 'plus']
    },
    {
      id: 'ip14-battery',
      name: 'iPhone 14 Battery Replacement',
      price: 79.99,
      image: '/images/products/iphone-14-battery.jpg',
      category: 'Batteries',
      model: 'iPhone 14 Series',
      stock: 85,
      rating: 4.5,
      reviews: 267,
      tags: ['battery', '14', 'replacement']
    },
    {
      id: 'ip13-pro-max-screen',
      name: 'iPhone 13 Pro Max OLED Screen Assembly',
      price: 279.99,
      image: '/images/products/iphone-13-pro-max-screen.jpg',
      category: 'Screens',
      model: 'iPhone 13 Pro Max',
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
      category: 'Screens',
      model: 'iPhone 13 Pro',
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
      category: 'Screens',
      model: 'iPhone 13 Mini',
      stock: 45,
      rating: 4.7,
      reviews: 76,
      tags: ['screen', 'oled', '13', 'mini']
    },
    {
      id: 'ip13-battery',
      name: 'iPhone 13 Series Battery Replacement',
      price: 69.99,
      image: '/images/products/iphone-13-battery.jpg',
      category: 'Batteries',
      model: 'iPhone 13 Series',
      stock: 95,
      rating: 4.6,
      reviews: 298,
      tags: ['battery', '13', 'replacement']
    },
    {
      id: 'ip12-pro-max-screen',
      name: 'iPhone 12 Pro Max OLED Screen Assembly',
      price: 229.99,
      image: '/images/products/iphone-12-pro-max-screen.jpg',
      category: 'Screens',
      model: 'iPhone 12 Pro Max',
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
      category: 'Screens',
      model: 'iPhone 12 Pro',
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
      category: 'Screens',
      model: 'iPhone 12 Mini',
      stock: 48,
      rating: 4.7,
      reviews: 89,
      tags: ['screen', 'oled', '12', 'mini']
    },
    {
      id: 'ip12-charging-port',
      name: 'iPhone 12 Series Charging Port Assembly',
      price: 49.99,
      image: '/images/products/iphone-12-charging.jpg',
      category: 'Charging Ports',
      model: 'iPhone 12 Series',
      stock: 150,
      rating: 4.4,
      reviews: 234,
      tags: ['charging', 'port', 'lightning', '12']
    },
    {
      id: 'ip11-pro-max-screen',
      name: 'iPhone 11 Pro Max LCD Screen Assembly',
      price: 149.99,
      image: '/images/products/iphone-11-pro-max-screen.jpg',
      category: 'Screens',
      model: 'iPhone 11 Pro Max',
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
      category: 'Screens',
      model: 'iPhone 11 Pro',
      stock: 78,
      rating: 4.7,
      reviews: 156,
      tags: ['screen', 'lcd', '11', 'pro']
    },
    {
      id: 'ip11-battery',
      name: 'iPhone 11 Series Battery Replacement',
      price: 59.99,
      image: '/images/products/iphone-11-battery.jpg',
      category: 'Batteries',
      model: 'iPhone 11 Series',
      stock: 110,
      rating: 4.5,
      reviews: 289,
      tags: ['battery', '11', 'replacement']
    },
    {
      id: 'ip-se-2022-screen',
      name: 'iPhone SE (2022) LCD Screen Assembly',
      price: 89.99,
      image: '/images/products/iphone-se-2022-screen.jpg',
      category: 'Screens',
      model: 'iPhone SE (2022)',
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
      category: 'Screens',
      model: 'iPhone SE (2020)',
      stock: 92,
      rating: 4.5,
      reviews: 87,
      tags: ['screen', 'lcd', 'se', '2020']
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setProducts(iphoneParts);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
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
    { id: 'all', name: 'All iPhone Parts', count: products.length },
    { id: 'screens', name: 'Screens', count: products.filter(p => p.category === 'Screens').length },
    { id: 'batteries', name: 'Batteries', count: products.filter(p => p.category === 'Batteries').length },
    { id: 'charging ports', name: 'Charging Ports', count: products.filter(p => p.category === 'Charging Ports').length }
  ];

  if (loading) {
    return (
      <Layout title="iPhone Parts - Nexus Tech Hub" description="Professional iPhone repair parts and components">
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <h3>Loading iPhone Parts...</h3>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title="iPhone Parts - Professional Repair Components | Nexus Tech Hub"
      description="Complete range of iPhone repair parts from iPhone 5 to iPhone 16 series. High-quality screens, batteries, and components with warranty."
    >
      <div className={styles.categoryPage}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span className={styles.separator}>/</span>
          <Link href="/products">Products</Link>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>iPhone Parts</span>
        </div>

        {/* Header */}
        <div className={styles.categoryHeader}>
          <div className={styles.headerContent}>
            <h1>iPhone Parts</h1>
            <p>Professional repair parts for all iPhone models from iPhone 5 to iPhone 16 series</p>
            <div className={styles.headerStats}>
              <span>{products.length} products available</span>
              <span>•</span>
              <span>30-day warranty</span>
              <span>•</span>
              <span>Free shipping</span>
            </div>
          </div>
          <div className={styles.headerImage}>
            <img src="/images/categories/iphone-parts.jpg" alt="iPhone Parts" />
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
                <div className={styles.productCategory}>{product.category}</div>
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

        {/* Load More / Pagination could be added here */}

        {/* Category Links */}
        <div className={styles.relatedCategories}>
          <h2>Explore More Categories</h2>
          <div className={styles.categoryLinks}>
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
