import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../../nexus-techhub-fresh/components/Layout/Layout';
import { useCart } from '../../contexts/CartContext';
import styles from '../../styles/CategoryPage.module.css';

export default function IPadParts() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('all');

  // iPad Parts Data
  const ipadParts = [
    {
      id: 'ipad-pro-12-9-m4-screen',
      name: 'iPad Pro 12.9" (M4) Ultra Retina XDR Display',
      price: 599.99,
      originalPrice: 699.99,
      image: '/images/products/ipad-pro-12-9-m4-screen.jpg',
      category: 'Screens',
      model: 'iPad Pro 12.9" M4',
      stock: 12,
      rating: 4.9,
      reviews: 45,
      tags: ['screen', 'oled', 'pro', '12.9', 'm4']
    },
    {
      id: 'ipad-pro-12-9-screen',
      name: 'iPad Pro 12.9" Liquid Retina XDR Display',
      price: 499.99,
      originalPrice: 549.99,
      image: '/images/products/ipad-pro-12-9-screen.jpg',
      category: 'Screens',
      model: 'iPad Pro 12.9"',
      stock: 18,
      rating: 4.8,
      reviews: 67,
      tags: ['screen', 'oled', 'pro', '12.9']
    },
    {
      id: 'ipad-pro-11-m4-screen',
      name: 'iPad Pro 11" (M4) Ultra Retina Display',
      price: 449.99,
      image: '/images/products/ipad-pro-11-m4-screen.jpg',
      category: 'Screens',
      model: 'iPad Pro 11" M4',
      stock: 20,
      rating: 4.9,
      reviews: 52,
      tags: ['screen', 'oled', 'pro', '11', 'm4']
    },
    {
      id: 'ipad-pro-11-screen',
      name: 'iPad Pro 11" Liquid Retina Display',
      price: 349.99,
      image: '/images/products/ipad-pro-11-screen.jpg',
      category: 'Screens',
      model: 'iPad Pro 11"',
      stock: 25,
      rating: 4.7,
      reviews: 78,
      tags: ['screen', 'oled', 'pro', '11']
    },
    {
      id: 'ipad-pro-10-5-screen',
      name: 'iPad Pro 10.5" Liquid Retina Display',
      price: 299.99,
      image: '/images/products/ipad-pro-10-5-screen.jpg',
      category: 'Screens',
      model: 'iPad Pro 10.5"',
      stock: 28,
      rating: 4.6,
      reviews: 89,
      tags: ['screen', 'liquid retina', 'pro', '10.5']
    },
    {
      id: 'ipad-air-5-screen',
      name: 'iPad Air 5th Gen LCD Screen Assembly',
      price: 249.99,
      originalPrice: 279.99,
      image: '/images/products/ipad-air-5-screen.jpg',
      category: 'Screens',
      model: 'iPad Air 5th Gen',
      stock: 35,
      rating: 4.7,
      reviews: 94,
      tags: ['screen', 'liquid retina', 'air', '10.9']
    },
    {
      id: 'ipad-air-4-screen',
      name: 'iPad Air 4th Gen LCD Screen Assembly',
      price: 229.99,
      image: '/images/products/ipad-air-4-screen.jpg',
      category: 'Screens',
      model: 'iPad Air 4th Gen',
      stock: 42,
      rating: 4.6,
      reviews: 76,
      tags: ['screen', 'liquid retina', 'air', '10.9']
    },
    {
      id: 'ipad-mini-6-screen',
      name: 'iPad Mini 6 LCD Screen Assembly',
      price: 199.99,
      image: '/images/products/ipad-mini-6-screen.jpg',
      category: 'Screens',
      model: 'iPad Mini 6',
      stock: 40,
      rating: 4.5,
      reviews: 65,
      tags: ['screen', 'liquid retina', 'mini', '8.3']
    },
    {
      id: 'ipad-mini-5-screen',
      name: 'iPad Mini 5 LCD Screen Assembly',
      price: 179.99,
      image: '/images/products/ipad-mini-5-screen.jpg',
      category: 'Screens',
      model: 'iPad Mini 5',
      stock: 48,
      rating: 4.4,
      reviews: 58,
      tags: ['screen', 'retina', 'mini', '7.9']
    },
    {
      id: 'ipad-pro-battery',
      name: 'iPad Pro Battery Replacement',
      price: 129.99,
      originalPrice: 149.99,
      image: '/images/products/ipad-pro-battery.jpg',
      category: 'Batteries',
      model: 'iPad Pro Series',
      stock: 50,
      rating: 4.6,
      reviews: 112,
      tags: ['battery', 'pro', 'replacement']
    },
    {
      id: 'ipad-air-battery',
      name: 'iPad Air Battery Replacement',
      price: 99.99,
      image: '/images/products/ipad-air-battery.jpg',
      category: 'Batteries',
      model: 'iPad Air Series',
      stock: 65,
      rating: 4.5,
      reviews: 87,
      tags: ['battery', 'air', 'replacement']
    },
    {
      id: 'ipad-home-button',
      name: 'iPad Home Button Assembly',
      price: 49.99,
      image: '/images/products/ipad-home-button.jpg',
      category: 'Buttons',
      model: 'iPad Series',
      stock: 90,
      rating: 4.3,
      reviews: 134,
      tags: ['home button', 'touch id', 'flex cable']
    },
    {
      id: 'ipad-lightning-port',
      name: 'iPad Lightning Charging Port',
      price: 39.99,
      image: '/images/products/ipad-lightning-port.jpg',
      category: 'Charging Ports',
      model: 'iPad Series',
      stock: 110,
      rating: 4.4,
      reviews: 156,
      tags: ['charging', 'port', 'lightning']
    },
    {
      id: 'ipad-usb-c-port',
      name: 'iPad USB-C Charging Port',
      price: 45.99,
      image: '/images/products/ipad-usb-c-port.jpg',
      category: 'Charging Ports',
      model: 'iPad Pro/Air',
      stock: 85,
      rating: 4.5,
      reviews: 98,
      tags: ['charging', 'port', 'usb-c']
    },
    {
      id: 'ipad-digitizer',
      name: 'iPad Touch Digitizer Replacement',
      price: 89.99,
      image: '/images/products/ipad-digitizer.jpg',
      category: 'Touch Components',
      model: 'iPad Series',
      stock: 60,
      rating: 4.6,
      reviews: 76,
      tags: ['digitizer', 'touch screen', 'replacement']
    },
    {
      id: 'ipad-speaker',
      name: 'iPad Speaker Assembly',
      price: 34.99,
      image: '/images/products/ipad-speaker.jpg',
      category: 'Audio',
      model: 'iPad Series',
      stock: 95,
      rating: 4.4,
      reviews: 87,
      tags: ['speaker', 'audio', 'sound']
    },
    {
      id: 'ipad-mic',
      name: 'iPad Microphone Assembly',
      price: 29.99,
      image: '/images/products/ipad-mic.jpg',
      category: 'Audio',
      model: 'iPad Series',
      stock: 100,
      rating: 4.3,
      reviews: 65,
      tags: ['microphone', 'audio', 'input']
    },
    {
      id: 'ipad-camera',
      name: 'iPad Rear Camera Assembly',
      price: 79.99,
      image: '/images/products/ipad-camera.jpg',
      category: 'Cameras',
      model: 'iPad Series',
      stock: 55,
      rating: 4.5,
      reviews: 92,
      tags: ['camera', 'rear', 'photography']
    },
    {
      id: 'ipad-front-camera',
      name: 'iPad Front Camera Assembly',
      price: 59.99,
      image: '/images/products/ipad-front-camera.jpg',
      category: 'Cameras',
      model: 'iPad Series',
      stock: 70,
      rating: 4.4,
      reviews: 78,
      tags: ['camera', 'front', 'facetime']
    },
    {
      id: 'ipad-wifi-antenna',
      name: 'iPad WiFi Antenna Assembly',
      price: 24.99,
      image: '/images/products/ipad-wifi-antenna.jpg',
      category: 'Connectivity',
      model: 'iPad Series',
      stock: 120,
      rating: 4.2,
      reviews: 45,
      tags: ['wifi', 'antenna', 'connectivity']
    },
    {
      id: 'ipad-power-button',
      name: 'iPad Power Button Flex Cable',
      price: 19.99,
      image: '/images/products/ipad-power-button.jpg',
      category: 'Buttons',
      model: 'iPad Series',
      stock: 140,
      rating: 4.1,
      reviews: 98,
      tags: ['power button', 'flex cable', 'button']
    },
    {
      id: 'ipad-volume-buttons',
      name: 'iPad Volume Buttons Assembly',
      price: 16.99,
      image: '/images/products/ipad-volume-buttons.jpg',
      category: 'Buttons',
      model: 'iPad Series',
      stock: 150,
      rating: 4.0,
      reviews: 76,
      tags: ['volume buttons', 'buttons', 'audio control']
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setProducts(ipadParts);
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
