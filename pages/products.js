import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Layout from '../nexus-techhub-fresh/components/Layout/Layout';
import SearchBar from '../components/SearchBar';
import styles from '../styles/Products.module.css';

// Dynamically import client-side components to prevent hydration mismatches
const ProductGrid = dynamic(() => import('../components/ProductGrid'), { ssr: false });
const ProductFilters = dynamic(() => import('../components/ProductFilters'), { ssr: false });

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentFilters, setCurrentFilters] = useState({});

  // Fetch products from API with search and filters
  const fetchProducts = async (filters = {}) => {
    try {
      setLoading(true);
      let url = '/api/products?limit=50';

      // Add search query
      if (searchQuery) {
        url += `&search=${encodeURIComponent(searchQuery)}`;
      }

      // Add category filter
      if (filters.category && filters.category !== 'all') {
        url += `&category=${filters.category}`;
      }

      // Add brand filter
      if (filters.brand && filters.brand !== 'all') {
        url += `&brand=${filters.brand}`;
      }

      // Add price filters
      if (filters.minPrice) {
        url += `&min_price=${filters.minPrice}`;
      }
      if (filters.maxPrice) {
        url += `&max_price=${filters.maxPrice}`;
      }

      // Add other filters
      if (filters.isFeatured) {
        url += `&is_featured=true`;
      }
      if (filters.isNew) {
        url += `&is_new=true`;
      }
      if (filters.inStock) {
        // This would need to be implemented in the API
        // For now, we'll filter client-side
      }

      // Add sorting
      if (filters.sortBy) {
        url += `&sort_by=${filters.sortBy}&sort_order=${filters.sortOrder || 'asc'}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      let filteredProducts = data.success ? (data.data || []) : [];

      // Apply client-side filters that aren't supported by API
      if (filters.inStock) {
        filteredProducts = filteredProducts.filter(product => product.stock > 0);
      }

      if (data.success) {
        setProducts(filteredProducts);
      } else {
        // Show error message instead of fallback to mock data
        setError('Failed to load products. Please try again.');
        setProducts([]);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };



  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    fetchProducts({ ...currentFilters, category });
  };

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    fetchProducts({ ...currentFilters, search: query });
  };

  // Handle filters change
  const handleFiltersChange = (filters) => {
    setCurrentFilters(filters);
    fetchProducts({ ...filters, search: searchQuery });
  };

  // Load products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = [
    { id: 'all', name: 'All Products', url: '/products' },
    { id: 'apple', name: 'Apple', url: '/products/apple' },
    { id: 'samsung', name: 'Samsung', url: '/products/samsung' },
    { id: 'motorola', name: 'Motorola', url: '/products/motorola' },
    { id: 'google', name: 'Google', url: '/products/google' },
    { id: 'other-parts', name: 'Other Parts', url: '/products/other-parts' },
    { id: 'game-console', name: 'Game Console', url: '/products/game-console' },
    { id: 'accessories', name: 'Accessories', url: '/products/accessories' },
    { id: 'tools-supplies', name: 'Tools & Supplies', url: '/products/tools-supplies' },
    { id: 'refurbishing', name: 'Refurbishing', url: '/products/refurbishing' },
    { id: 'board-components', name: 'Board Components', url: '/products/board-components' },
    { id: 'pre-owned-devices', name: 'Pre-Owned Devices', url: '/products/pre-owned-devices' }
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

          {/* Search Bar */}
          <div className={styles.searchSection}>
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search for repair parts, tools, and components..."
            />
          </div>

          {/* Filters */}
          <ProductFilters
            onFiltersChange={handleFiltersChange}
            initialFilters={currentFilters}
          />

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
