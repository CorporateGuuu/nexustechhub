import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { useCart } from '../../contexts/CartContext';
import styles from '../../styles/CategoryPage.module.css';

export default function IPhoneCameras() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('all');

  // iPhone Cameras Data
  const iphoneCameras = [
    {
      id: 'ip15-pro-max-camera',
      name: 'iPhone 15 Pro Max Rear Camera Assembly',
      price: 149.99,
      image: '/images/products/iphone-15-pro-max-camera.jpg',
      model: 'iPhone 15 Pro Max',
      type: 'Triple Camera',
      stock: 45,
      rating: 4.7,
      reviews: 156,
      tags: ['camera', 'rear', 'triple', '15', 'pro max']
    },
    {
      id: 'ip15-pro-camera',
      name: 'iPhone 15 Pro Rear Camera Assembly',
      price: 139.99,
      image: '/images/products/iphone-15-pro-camera.jpg',
      model: 'iPhone 15 Pro',
      type: 'Triple Camera',
      stock: 52,
      rating: 4.8,
      reviews: 189,
      tags: ['camera', 'rear', 'triple', '15', 'pro']
    },
    {
      id: 'ip15-plus-camera',
      name: 'iPhone 15 Plus Dual Rear Camera Assembly',
      price: 119.99,
      image: '/images/products/iphone-15-plus-camera.jpg',
      model: 'iPhone 15 Plus',
      type: 'Dual Camera',
      stock: 68,
      rating: 4.6,
      reviews: 134,
      tags: ['camera', 'rear', 'dual', '15', 'plus']
    },
    {
      id: 'ip15-camera',
      name: 'iPhone 15 Dual Rear Camera Assembly',
      price: 109.99,
      image: '/images/products/iphone-15-camera.jpg',
      model: 'iPhone 15',
      type: 'Dual Camera',
      stock: 75,
      rating: 4.5,
      reviews: 167,
      tags: ['camera', 'rear', 'dual', '15']
    },
    {
      id: 'ip14-pro-max-camera',
      name: 'iPhone 14 Pro Max Rear Camera Assembly',
      price: 129.99,
      image: '/images/products/iphone-14-pro-max-camera.jpg',
      model: 'iPhone 14 Pro Max',
      type: 'Triple Camera',
      stock: 38,
      rating: 4.7,
      reviews: 145,
      tags: ['camera', 'rear', 'triple', '14', 'pro max']
    },
    {
      id: 'ip14-pro-camera',
      name: 'iPhone 14 Pro Rear Camera Assembly',
      price: 119.99,
      image: '/images/products/iphone-14-pro-camera.jpg',
      model: 'iPhone 14 Pro',
      type: 'Triple Camera',
      stock: 45,
      rating: 4.8,
      reviews: 178,
      tags: ['camera', 'rear', 'triple', '14', 'pro']
    },
    {
      id: 'ip14-plus-camera',
      name: 'iPhone 14 Plus Dual Rear Camera Assembly',
      price: 99.99,
      image: '/images/products/iphone-14-plus-camera.jpg',
      model: 'iPhone 14 Plus',
      type: 'Dual Camera',
      stock: 62,
      rating: 4.5,
      reviews: 123,
      tags: ['camera', 'rear', 'dual', '14', 'plus']
    },
    {
      id: 'ip14-camera',
      name: 'iPhone 14 Dual Rear Camera Assembly',
      price: 89.99,
      image: '/images/products/iphone-14-camera.jpg',
      model: 'iPhone 14',
      type: 'Dual Camera',
      stock: 70,
      rating: 4.4,
      reviews: 156,
      tags: ['camera', 'rear', 'dual', '14']
    },
    {
      id: 'ip13-pro-max-camera',
      name: 'iPhone 13 Pro Max Rear Camera Assembly',
      price: 109.99,
      image: '/images/products/iphone-13-pro-max-camera.jpg',
      model: 'iPhone 13 Pro Max',
      type: 'Triple Camera',
      stock: 42,
      rating: 4.6,
      reviews: 134,
      tags: ['camera', 'rear', 'triple', '13', 'pro max']
    },
    {
      id: 'ip13-pro-camera',
      name: 'iPhone 13 Pro Rear Camera Assembly',
      price: 99.99,
      image: '/images/products/iphone-13-pro-camera.jpg',
      model: 'iPhone 13 Pro',
      type: 'Triple Camera',
      stock: 48,
      rating: 4.7,
      reviews: 167,
      tags: ['camera', 'rear', 'triple', '13', 'pro']
    },
    {
      id: 'ip13-camera',
      name: 'iPhone 13 Dual Rear Camera Assembly',
      price: 79.99,
      image: '/images/products/iphone-13-camera.jpg',
      model: 'iPhone 13, 13 Mini',
      type: 'Dual Camera',
      stock: 65,
      rating: 4.3,
      reviews: 145,
      tags: ['camera', 'rear', 'dual', '13']
    },
    {
      id: 'ip12-pro-max-camera',
      name: 'iPhone 12 Pro Max Rear Camera Assembly',
      price: 89.99,
      image: '/images/products/iphone-12-pro-max-camera.jpg',
      model: 'iPhone 12 Pro Max',
      type: 'Triple Camera',
      stock: 35,
      rating: 4.5,
      reviews: 123,
      tags: ['camera', 'rear', 'triple', '12', 'pro max']
    },
    {
      id: 'ip12-pro-camera',
      name: 'iPhone 12 Pro Rear Camera Assembly',
      price: 79.99,
      image: '/images/products/iphone-12-pro-camera.jpg',
      model: 'iPhone 12 Pro',
      type: 'Triple Camera',
      stock: 40,
      rating: 4.6,
      reviews: 156,
      tags: ['camera', 'rear', 'triple', '12', 'pro']
    },
    {
      id: 'ip12-camera',
      name: 'iPhone 12 Dual Rear Camera Assembly',
      price: 69.99,
      image: '/images/products/iphone-12-camera.jpg',
      model: 'iPhone 12, 12 Mini',
      type: 'Dual Camera',
      stock: 58,
      rating: 4.2,
      reviews: 134,
      tags: ['camera', 'rear', 'dual', '12']
    },
    {
      id: 'ip11-pro-max-camera',
      name: 'iPhone 11 Pro Max Rear Camera Assembly',
      price: 59.99,
      image: '/images/products/iphone-11-pro-max-camera.jpg',
      model: 'iPhone 11 Pro Max',
      type: 'Triple Camera',
      stock: 45,
      rating: 4.3,
      reviews: 112,
      tags: ['camera', 'rear', 'triple', '11', 'pro max']
    },
    {
      id: 'ip11-pro-camera',
      name: 'iPhone 11 Pro Rear Camera Assembly',
      price: 54.99,
      image: '/images/products/iphone-11-pro-camera.jpg',
      model: 'iPhone 11 Pro',
      type: 'Triple Camera',
      stock: 52,
      rating: 4.4,
      reviews: 145,
      tags: ['camera', 'rear', 'triple', '11', 'pro']
    },
    {
      id: 'ip11-camera',
      name: 'iPhone 11 Dual Rear Camera Assembly',
      price: 49.99,
      image: '/images/products/iphone-11-camera.jpg',
      model: 'iPhone 11',
      type: 'Dual Camera',
      stock: 68,
      rating: 4.1,
      reviews: 167,
      tags: ['camera', 'rear', 'dual', '11']
    },
    {
      id: 'ip-xr-camera',
      name: 'iPhone XR Single Rear Camera Assembly',
      price: 39.99,
      image: '/images/products/iphone-xr-camera.jpg',
      model: 'iPhone XR',
      type: 'Single Camera',
      stock: 75,
      rating: 4.0,
      reviews: 134,
      tags: ['camera', 'rear', 'single', 'xr']
    },
    {
      id: 'ip-x-camera',
      name: 'iPhone X Dual Rear Camera Assembly',
      price: 44.99,
      image: '/images/products/iphone-x-camera.jpg',
      model: 'iPhone X',
      type: 'Dual Camera',
      stock: 55,
      rating: 4.2,
      reviews: 123,
      tags: ['camera', 'rear', 'dual', 'x']
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setProducts(iphoneCameras);
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
    { id: 'all', name: 'All Cameras', count: products.length },
    { id: 'triple', name: 'Triple Camera', count: products.filter(p => p.type === 'Triple Camera').length },
    { id: 'dual', name: 'Dual Camera', count: products.filter(p => p.type === 'Dual Camera').length },
    { id: 'single', name: 'Single Camera', count: products.filter(p => p.type === 'Single Camera').length }
  ];

  if (loading) {
    return (
      <Layout title="iPhone Cameras - Nexus Tech Hub" description="Professional iPhone camera replacements and assemblies">
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <h3>Loading iPhone Cameras...</h3>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title="iPhone Cameras - Professional Camera Replacements | Nexus Tech Hub"
      description="Rear camera assemblies for all iPhone models from iPhone X to iPhone 15. Triple, dual, and single camera systems."
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
          <span className={styles.current}>Cameras</span>
        </div>

        {/* Header */}
        <div className={styles.categoryHeader}>
          <div className={styles.headerContent}>
            <h1>iPhone Cameras</h1>
            <p>Rear camera assemblies for all iPhone models with advanced photography capabilities</p>
            <div className={styles.headerStats}>
              <span>{products.length} camera models available</span>
              <span>•</span>
              <span>30-day warranty</span>
              <span>•</span>
              <span>Free shipping</span>
            </div>
          </div>
          <div className={styles.headerImage}>
            <img src="/images/categories/iphone-cameras.jpg" alt="iPhone Cameras" />
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
          <Link href="/products/iphone-charging" className={styles.categoryTab}>
            Charging Ports
          </Link>
          <Link href="/products/iphone-cameras" className={`${styles.categoryTab} ${styles.active}`}>
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
                <div className={styles.productCategory}>{product.type}</div>
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
