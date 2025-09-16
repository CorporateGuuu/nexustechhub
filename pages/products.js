import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../nexus-techhub-fresh/components/Layout/Layout';
import ProductGrid from '../components/ProductGrid';
import styles from '../styles/Products.module.css';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Fetch products from API
  const fetchProducts = async (category = 'all') => {
    try {
      setLoading(true);
      let url = '/api/products?limit=50';

      if (category !== 'all') {
        url += `&category=${category}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setProducts(data.data || []);
      } else {
        // Fallback to mock data if API fails
        setProducts(getMockProducts(category));
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      // Fallback to mock data
      setProducts(getMockProducts(category));
    } finally {
      setLoading(false);
    }
  };

  // Mock products for fallback
  const getMockProducts = (category) => {
    const allProducts = [
      {
        id: 'ip15-screen-oled',
        name: 'iPhone 15 Pro OLED Screen Assembly',
        category: 'iPhone Parts',
        price: 299.99,
        discount_percentage: 0,
        stock: 50,
        image: '/images/products/placeholder.svg',
        sku: 'NTH-IP15P-SCREEN-001'
      },
      {
        id: 'ip14-battery',
        name: 'iPhone 14 Battery Replacement',
        category: 'iPhone Parts',
        price: 89.99,
        discount_percentage: 0,
        stock: 100,
        image: '/images/products/placeholder.svg',
        sku: 'NTH-IP14-BAT-001'
      },
      {
        id: 'sg-s24-screen-oled',
        name: 'Samsung Galaxy S24 OLED Screen Assembly',
        category: 'Samsung Parts',
        price: 249.99,
        discount_percentage: 0,
        stock: 30,
        image: '/images/products/placeholder.svg',
        sku: 'NTH-SGS24-SCREEN-001'
      },
      {
        id: 'sg-s23-battery',
        name: 'Samsung Galaxy S23 Battery Replacement',
        category: 'Samsung Parts',
        price: 79.99,
        discount_percentage: 0,
        stock: 80,
        image: '/images/products/placeholder.svg',
        sku: 'NTH-SGS23-BAT-001'
      },
      {
        id: 'ipad-pro12-lcd',
        name: 'iPad Pro 12.9" LCD Assembly',
        category: 'iPad Parts',
        price: 299.99,
        discount_percentage: 0,
        stock: 25,
        image: '/images/products/placeholder.svg',
        sku: 'NTH-IPPRO12-LCD-001'
      },
      {
        id: 'ipad-air5-digitizer',
        name: 'iPad Air 5th Gen Digitizer',
        category: 'iPad Parts',
        price: 159.99,
        discount_percentage: 0,
        stock: 45,
        image: '/images/products/placeholder.svg',
        sku: 'NTH-IPAIR5-DIGIT-001'
      },
      {
        id: 'toolkit-pro-50pc',
        name: 'Professional Repair Tool Kit - 50 Pieces',
        category: 'Repair Tools',
        price: 149.99,
        discount_percentage: 0,
        stock: 20,
        image: '/images/products/placeholder.svg',
        sku: 'NTH-TOOLS-PRO50-001'
      },
      {
        id: 'screwdriver-precision',
        name: 'Precision Screwdriver Set - iPhone/Samsung',
        category: 'Repair Tools',
        price: 39.99,
        discount_percentage: 0,
        stock: 150,
        image: '/images/products/placeholder.svg',
        sku: 'NTH-TOOLS-SCREW-001'
      }
    ];

    if (category === 'all') {
      return allProducts;
    }

    return allProducts.filter(product => {
      switch (category) {
        case 'iphone-parts':
          return product.category === 'iPhone Parts';
        case 'samsung-parts':
          return product.category === 'Samsung Parts';
        case 'ipad-parts':
          return product.category === 'iPad Parts';
        case 'repair-tools':
          return product.category === 'Repair Tools';
        default:
          return true;
      }
    });
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    fetchProducts(category);
  };

  // Load products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = [
    { id: 'all', name: 'All Products', url: '/products' },
    { id: 'iphone-parts', name: 'iPhone Parts', url: '/products/iphone-parts' },
    { id: 'samsung-parts', name: 'Samsung Parts', url: '/products/samsung-parts' },
    { id: 'ipad-parts', name: 'iPad Parts', url: '/products/ipad-parts' },
    { id: 'repair-tools', name: 'Repair Tools', url: '/products/repair-tools' }
  ];

  const getCategoryTitle = () => {
    const category = categories.find(cat => cat.id === selectedCategory);
    return category ? category.name : 'All Products';
  };

  return (
    <Layout
      title="Professional Repair Parts & Tools"
      description="High-quality mobile device repair parts and professional tools for iPhone, Samsung, iPad, and more."
    >
      <div className={styles.productsPage}>
        <div className="container">
          {/* Page Header */}
          <div className={styles.pageHeader}>
            <h1>Professional Repair Parts & Tools</h1>
            <p>High-quality components and tools for professional mobile device repairs</p>
          </div>

          {/* Category Navigation */}
          <div className={styles.categoryNav}>
            {categories.map((category) => (
              <button
                key={category.id}
                className={`${styles.categoryButton} ${selectedCategory === category.id ? styles.active : ''}`}
                onClick={() => handleCategoryChange(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className={styles.loading}>
              <div className="loading-spinner"></div>
              <p>Loading products...</p>
            </div>
          ) : error ? (
            <div className={styles.error}>
              <p>Error loading products: {error}</p>
              <button onClick={() => fetchProducts(selectedCategory)} className="btn btn-primary">
                Try Again
              </button>
            </div>
          ) : (
            <ProductGrid
              products={products}
              categoryTitle={getCategoryTitle()}
            />
          )}

          {/* Call to Action */}
          <div className={styles.ctaSection}>
            <h2>Need Help Finding the Right Part?</h2>
            <p>Our expert technicians are here to help you find the perfect replacement parts for your repair needs.</p>
            <div className={styles.ctaButtons}>
              <Link href="/contact" className="btn btn-primary">
                Contact Support
              </Link>
              <Link href="/about" className="btn btn-secondary">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
