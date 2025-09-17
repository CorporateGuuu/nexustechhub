import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../../nexus-techhub-fresh/components/Layout/Layout';
import { useCart } from '../../contexts/CartContext';
import styles from '../../styles/CategoryPage.module.css';

export default function SamsungParts() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('all');

  // Samsung Parts Data
  const samsungParts = [
    {
      id: 'sg-s24-ultra-screen',
      name: 'Samsung Galaxy S24 Ultra AMOLED Screen',
      price: 349.99,
      originalPrice: 399.99,
      image: '/images/products/samsung-s24-ultra-screen.jpg',
      category: 'Screens',
      model: 'Galaxy S24 Ultra',
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
      category: 'Screens',
      model: 'Galaxy S24 Plus',
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
      category: 'Screens',
      model: 'Galaxy S24',
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
      category: 'Screens',
      model: 'Galaxy S23 Ultra',
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
      category: 'Screens',
      model: 'Galaxy S23 Plus',
      stock: 35,
      rating: 4.8,
      reviews: 78,
      tags: ['screen', 'amoled', 'plus', 's23']
    },
    {
      id: 'sg-s23-ultra-battery',
      name: 'Samsung Galaxy S23 Ultra Battery',
      price: 89.99,
      originalPrice: 99.99,
      image: '/images/products/samsung-s23-ultra-battery.jpg',
      category: 'Batteries',
      model: 'Galaxy S23 Ultra',
      stock: 55,
      rating: 4.6,
      reviews: 145,
      tags: ['battery', 'ultra', 's23', '5000mah']
    },
    {
      id: 'sg-s23-battery',
      name: 'Samsung Galaxy S23 Battery Replacement',
      price: 79.99,
      image: '/images/products/samsung-s23-battery.jpg',
      category: 'Batteries',
      model: 'Galaxy S23 Series',
      stock: 80,
      rating: 4.5,
      reviews: 198,
      tags: ['battery', 's23', '3900mah']
    },
    {
      id: 'sg-s22-ultra-screen',
      name: 'Samsung Galaxy S22 Ultra AMOLED Screen',
      price: 289.99,
      image: '/images/products/samsung-s22-ultra-screen.jpg',
      category: 'Screens',
      model: 'Galaxy S22 Ultra',
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
      category: 'Screens',
      model: 'Galaxy S22 Plus',
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
      category: 'Screens',
      model: 'Galaxy S22',
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
      category: 'Screens',
      model: 'Galaxy S21 Ultra',
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
      category: 'Screens',
      model: 'Galaxy S21 Plus',
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
      category: 'Screens',
      model: 'Galaxy S21',
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
      category: 'Foldable Screens',
      model: 'Galaxy Z Fold 5',
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
      category: 'Foldable Screens',
      model: 'Galaxy Z Fold 4',
      stock: 18,
      rating: 4.8,
      reviews: 67,
      tags: ['screen', 'amoled', 'fold', 'z fold 4', 'foldable']
    },
    {
      id: 'sg-z-fold3-screen',
      name: 'Samsung Galaxy Z Fold 3 Inner Screen',
      price: 499.99,
      image: '/images/products/samsung-z-fold3-screen.jpg',
      category: 'Foldable Screens',
      model: 'Galaxy Z Fold 3',
      stock: 20,
      rating: 4.7,
      reviews: 89,
      tags: ['screen', 'amoled', 'fold', 'z fold 3', 'foldable']
    },
    {
      id: 'sg-z-flip5-screen',
      name: 'Samsung Galaxy Z Flip 5 Outer Screen',
      price: 149.99,
      image: '/images/products/samsung-z-flip5-screen.jpg',
      category: 'Foldable Screens',
      model: 'Galaxy Z Flip 5',
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
      category: 'Foldable Screens',
      model: 'Galaxy Z Flip 4',
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
      category: 'Screens',
      model: 'Galaxy Note 20 Ultra',
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
      category: 'Screens',
      model: 'Galaxy Note 20',
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
      category: 'Screens',
      model: 'Galaxy A54',
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
      category: 'Screens',
      model: 'Galaxy A53',
      stock: 70,
      rating: 4.4,
      reviews: 134,
      tags: ['screen', 'amoled', 'a53', 'a series']
    },
    {
      id: 'sg-a52-screen',
      name: 'Samsung Galaxy A52 LCD Screen Assembly',
      price: 119.99,
      image: '/images/products/samsung-a52-screen.jpg',
      category: 'Screens',
      model: 'Galaxy A52',
      stock: 75,
      rating: 4.3,
      reviews: 112,
      tags: ['screen', 'amoled', 'a52', 'a series']
    },
    {
      id: 'sg-a51-screen',
      name: 'Samsung Galaxy A51 LCD Screen Assembly',
      price: 99.99,
      image: '/images/products/samsung-a51-screen.jpg',
      category: 'Screens',
      model: 'Galaxy A51',
      stock: 80,
      rating: 4.2,
      reviews: 98,
      tags: ['screen', 'amoled', 'a51', 'a series']
    },
    {
      id: 'sg-usb-c-port',
      name: 'Samsung USB-C Charging Port Assembly',
      price: 39.99,
      image: '/images/products/samsung-usb-c-port.jpg',
      category: 'Charging Ports',
      model: 'Galaxy Series',
      stock: 120,
      rating: 4.4,
      reviews: 234,
      tags: ['charging', 'port', 'usb-c', 'galaxy']
    },
    {
      id: 'sg-micro-usb-port',
      name: 'Samsung Micro USB Charging Port Assembly',
      price: 29.99,
      image: '/images/products/samsung-micro-usb-port.jpg',
      category: 'Charging Ports',
      model: 'Galaxy Series',
      stock: 140,
      rating: 4.3,
      reviews: 187,
      tags: ['charging', 'port', 'micro usb', 'galaxy']
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setProducts(samsungParts);
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
    { id: 'all', name: 'All Samsung Parts', count: products.length },
    { id: 'screens', name: 'Screens', count: products.filter(p => p.category === 'Screens').length },
    { id: 'batteries', name: 'Batteries', count: products.filter(p => p.category === 'Batteries').length },
    { id: 'foldable screens', name: 'Foldable Screens', count: products.filter(p => p.category === 'Foldable Screens').length },
    { id: 'charging ports', name: 'Charging Ports', count: products.filter(p => p.category === 'Charging Ports').length }
  ];

  if (loading) {
    return (
      <Layout title="Samsung Parts - Nexus Tech Hub" description="Professional Samsung Galaxy repair parts and components">
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <h3>Loading Samsung Parts...</h3>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title="Samsung Parts - Galaxy Repair Components | Nexus Tech Hub"
      description="Complete range of Samsung Galaxy repair parts including S, A, Note, and Fold series. High-quality screens, batteries, and components."
    >
      <div className={styles.categoryPage}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span className={styles.separator}>/</span>
          <Link href="/products">Products</Link>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>Samsung Parts</span>
        </div>

        {/* Header */}
        <div className={styles.categoryHeader}>
          <div className={styles.headerContent}>
            <h1>Samsung Parts</h1>
            <p>Professional repair parts for all Samsung Galaxy models including S, A, Note, and Fold series</p>
            <div className={styles.headerStats}>
              <span>{products.length} products available</span>
              <span>•</span>
              <span>30-day warranty</span>
              <span>•</span>
              <span>Free shipping</span>
            </div>
          </div>
          <div className={styles.headerImage}>
            <img src="/images/categories/samsung-parts.jpg" alt="Samsung Parts" />
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
