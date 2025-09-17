import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../../nexus-techhub-fresh/components/Layout/Layout';
import { useCart } from '../../contexts/CartContext';
import styles from '../../styles/CategoryPage.module.css';

export default function RepairTools() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('all');

  // Repair Tools Data
  const repairTools = [
    {
      id: 'toolkit-pro-65pc',
      name: 'Professional iFixit Repair Toolkit - 65 Pieces',
      price: 199.99,
      originalPrice: 249.99,
      image: '/images/products/professional-toolkit.jpg',
      category: 'Toolkits',
      brand: 'iFixit',
      stock: 15,
      rating: 4.9,
      reviews: 234,
      tags: ['toolkit', 'professional', '65 pieces', 'complete']
    },
    {
      id: 'toolkit-essentials',
      name: 'Essential Repair Toolkit - 32 Pieces',
      price: 89.99,
      image: '/images/products/essentials-toolkit.jpg',
      category: 'Toolkits',
      brand: 'Generic',
      stock: 35,
      rating: 4.6,
      reviews: 187,
      tags: ['toolkit', 'essentials', '32 pieces', 'basic']
    },
    {
      id: 'screwdriver-precision-set',
      name: 'Precision Screwdriver Set - 24 Pieces',
      price: 49.99,
      image: '/images/products/precision-screwdrivers.jpg',
      category: 'Screwdrivers',
      brand: 'Wera',
      stock: 85,
      rating: 4.7,
      reviews: 312,
      tags: ['screwdriver', 'precision', '24 pieces', 'magnetic']
    },
    {
      id: 'screwdriver-torx-set',
      name: 'Torx Screwdriver Set - 12 Pieces',
      price: 39.99,
      image: '/images/products/torx-screwdrivers.jpg',
      category: 'Screwdrivers',
      brand: 'Generic',
      stock: 95,
      rating: 4.5,
      reviews: 198,
      tags: ['screwdriver', 'torx', 'security', 'apple']
    },
    {
      id: 'screwdriver-phillips-set',
      name: 'Phillips Screwdriver Set - 8 Pieces',
      price: 24.99,
      image: '/images/products/phillips-screwdrivers.jpg',
      category: 'Screwdrivers',
      brand: 'Generic',
      stock: 120,
      rating: 4.4,
      reviews: 267,
      tags: ['screwdriver', 'phillips', 'various sizes']
    },
    {
      id: 'screwdriver-pentalobe-set',
      name: 'Pentalobe Screwdriver Set - 5 Pieces',
      price: 29.99,
      image: '/images/products/pentalobe-screwdrivers.jpg',
      category: 'Screwdrivers',
      brand: 'Generic',
      stock: 75,
      rating: 4.6,
      reviews: 145,
      tags: ['screwdriver', 'pentalobe', 'apple', 'security']
    },
    {
      id: 'suction-cup-set',
      name: 'Professional Suction Cup Set - 6 Pieces',
      price: 34.99,
      image: '/images/products/suction-cups.jpg',
      category: 'Opening Tools',
      brand: 'Generic',
      stock: 60,
      rating: 4.5,
      reviews: 178,
      tags: ['suction cup', 'opening tool', 'screen removal']
    },
    {
      id: 'pry-tool-set',
      name: 'Plastic Pry Tool Set - 8 Pieces',
      price: 19.99,
      image: '/images/products/pry-tools.jpg',
      category: 'Opening Tools',
      brand: 'Generic',
      stock: 100,
      rating: 4.3,
      reviews: 234,
      tags: ['pry tool', 'plastic', 'opening', 'safe']
    },
    {
      id: 'heat-gun-professional',
      name: 'Professional Heat Gun with LCD Display',
      price: 79.99,
      originalPrice: 99.99,
      image: '/images/products/heat-gun.jpg',
      category: 'Heat Tools',
      brand: 'Generic',
      stock: 25,
      rating: 4.8,
      reviews: 156,
      tags: ['heat gun', 'professional', 'lcd', 'temperature control']
    },
    {
      id: 'heat-gun-basic',
      name: 'Basic Heat Gun for Repairs',
      price: 39.99,
      image: '/images/products/basic-heat-gun.jpg',
      category: 'Heat Tools',
      brand: 'Generic',
      stock: 45,
      rating: 4.4,
      reviews: 198,
      tags: ['heat gun', 'basic', 'repair', 'adhesive removal']
    },
    {
      id: 'soldering-station',
      name: 'Digital Soldering Station with Stand',
      price: 149.99,
      image: '/images/products/soldering-station.jpg',
      category: 'Soldering',
      brand: 'Generic',
      stock: 20,
      rating: 4.7,
      reviews: 89,
      tags: ['soldering station', 'digital', 'temperature control', 'stand']
    },
    {
      id: 'soldering-iron-kit',
      name: 'Soldering Iron Kit with Tips',
      price: 69.99,
      image: '/images/products/soldering-iron-kit.jpg',
      category: 'Soldering',
      brand: 'Generic',
      stock: 35,
      rating: 4.5,
      reviews: 134,
      tags: ['soldering iron', 'kit', 'tips', 'stand']
    },
    {
      id: 'multimeter-digital',
      name: 'Digital Multimeter with Auto-Ranging',
      price: 59.99,
      image: '/images/products/digital-multimeter.jpg',
      category: 'Testing Tools',
      brand: 'Generic',
      stock: 40,
      rating: 4.6,
      reviews: 167,
      tags: ['multimeter', 'digital', 'auto-ranging', 'testing']
    },
    {
      id: 'logic-board-tester',
      name: 'Logic Board Testing Kit',
      price: 199.99,
      image: '/images/products/logic-board-tester.jpg',
      category: 'Testing Tools',
      brand: 'Generic',
      stock: 15,
      rating: 4.8,
      reviews: 76,
      tags: ['logic board', 'tester', 'diagnostic', 'professional']
    },
    {
      id: 'microscope-digital',
      name: 'Digital Microscope with Stand - 1000x',
      price: 129.99,
      originalPrice: 159.99,
      image: '/images/products/digital-microscope.jpg',
      category: 'Inspection',
      brand: 'Generic',
      stock: 18,
      rating: 4.7,
      reviews: 98,
      tags: ['microscope', 'digital', '1000x', 'inspection']
    },
    {
      id: 'magnifying-lamp',
      name: 'LED Magnifying Lamp with Stand',
      price: 89.99,
      image: '/images/products/magnifying-lamp.jpg',
      category: 'Inspection',
      brand: 'Generic',
      stock: 30,
      rating: 4.5,
      reviews: 145,
      tags: ['magnifying lamp', 'led', 'stand', 'inspection']
    },
    {
      id: 'anti-static-wrist-strap',
      name: 'Anti-Static Wrist Strap with Grounding Cord',
      price: 14.99,
      image: '/images/products/anti-static-wrist-strap.jpg',
      category: 'Safety Equipment',
      brand: 'Generic',
      stock: 80,
      rating: 4.4,
      reviews: 234,
      tags: ['anti-static', 'wrist strap', 'safety', 'grounding']
    },
    {
      id: 'anti-static-mat',
      name: 'Anti-Static Work Mat - 24x18 inches',
      price: 39.99,
      image: '/images/products/anti-static-mat.jpg',
      category: 'Safety Equipment',
      brand: 'Generic',
      stock: 25,
      rating: 4.6,
      reviews: 156,
      tags: ['anti-static', 'mat', 'work surface', 'safety']
    },
    {
      id: 'tweezers-set',
      name: 'Precision Tweezers Set - 6 Pieces',
      price: 24.99,
      image: '/images/products/precision-tweezers.jpg',
      category: 'Hand Tools',
      brand: 'Generic',
      stock: 65,
      rating: 4.5,
      reviews: 198,
      tags: ['tweezers', 'precision', '6 pieces', 'hand tools']
    },
    {
      id: 'cutter-diagonal',
      name: 'Diagonal Cutting Pliers - Professional Grade',
      price: 29.99,
      image: '/images/products/diagonal-cutters.jpg',
      category: 'Hand Tools',
      brand: 'Generic',
      stock: 50,
      rating: 4.6,
      reviews: 167,
      tags: ['cutters', 'diagonal', 'pliers', 'professional']
    },
    {
      id: 'needle-nose-pliers',
      name: 'Long Nose Pliers - 6 inches',
      price: 19.99,
      image: '/images/products/needle-nose-pliers.jpg',
      category: 'Hand Tools',
      brand: 'Generic',
      stock: 70,
      rating: 4.4,
      reviews: 145,
      tags: ['pliers', 'needle nose', 'long nose', '6 inches']
    },
    {
      id: 'spudger-set',
      name: 'Spudger Set - 5 Pieces',
      price: 16.99,
      image: '/images/products/spudger-set.jpg',
      category: 'Opening Tools',
      brand: 'Generic',
      stock: 90,
      rating: 4.3,
      reviews: 178,
      tags: ['spudger', '5 pieces', 'opening tool', 'safe']
    },
    {
      id: 'adhesive-strips',
      name: 'Screen Adhesive Strips - 50 Pack',
      price: 12.99,
      image: '/images/products/adhesive-strips.jpg',
      category: 'Consumables',
      brand: 'Generic',
      stock: 120,
      rating: 4.2,
      reviews: 234,
      tags: ['adhesive', 'strips', 'screen', '50 pack']
    },
    {
      id: 'thermal-paste',
      name: 'High-Quality Thermal Paste - 5g',
      price: 9.99,
      image: '/images/products/thermal-paste.jpg',
      category: 'Consumables',
      brand: 'Generic',
      stock: 150,
      rating: 4.4,
      reviews: 312,
      tags: ['thermal paste', '5g', 'heat transfer', 'consumable']
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setProducts(repairTools);
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
                <div className={styles.productModel}>Brand: {product.brand}</div>

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
