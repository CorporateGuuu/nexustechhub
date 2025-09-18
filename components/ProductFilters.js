'use client';

import React, { useState, useEffect } from 'react';
import styles from '../styles/ProductFilters.module.css';

const ProductFilters = ({ onFiltersChange, initialFilters = {} }) => {
  const [filters, setFilters] = useState({
    category: initialFilters.category || 'all',
    minPrice: initialFilters.minPrice || '',
    maxPrice: initialFilters.maxPrice || '',
    brand: initialFilters.brand || 'all',
    inStock: initialFilters.inStock || false,
    isFeatured: initialFilters.isFeatured || false,
    isNew: initialFilters.isNew || false,
    sortBy: initialFilters.sortBy || 'name',
    sortOrder: initialFilters.sortOrder || 'asc'
  });

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch categories and brands
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        // Fetch categories
        const categoriesResponse = await fetch('/api/categories');
        const categoriesData = await categoriesResponse.json();
        if (categoriesData.success) {
          setCategories(categoriesData.data || []);
        }

        // Fetch brands from products
        const productsResponse = await fetch('/api/products?limit=1000');
        const productsData = await productsResponse.json();
        if (productsData.success) {
          const uniqueBrands = [...new Set(productsData.data
            .map(product => product.brand)
            .filter(brand => brand && brand !== 'null' && brand !== 'undefined')
          )];
          setBrands(uniqueBrands);
        }
      } catch (error) {
        console.error('Error fetching filter options:', error);
      }
    };

    fetchFilterOptions();
  }, []);

  // Apply filters when they change
  useEffect(() => {
    if (onFiltersChange) {
      onFiltersChange(filters);
    }
  }, [filters, onFiltersChange]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: 'all',
      minPrice: '',
      maxPrice: '',
      brand: 'all',
      inStock: false,
      isFeatured: false,
      isNew: false,
      sortBy: 'name',
      sortOrder: 'asc'
    });
  };

  const hasActiveFilters = () => {
    return filters.category !== 'all' ||
           filters.minPrice !== '' ||
           filters.maxPrice !== '' ||
           filters.brand !== 'all' ||
           filters.inStock ||
           filters.isFeatured ||
           filters.isNew;
  };

  return (
    <div className={styles.filtersContainer}>
      {/* Filter Toggle Button */}
      <button
        className={styles.filterToggle}
        onClick={() => setShowFilters(!showFilters)}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
        </svg>
        Filters
        {hasActiveFilters() && <span className={styles.activeFilterDot}></span>}
      </button>

      {/* Filters Panel */}
      {showFilters && (
        <div className={styles.filtersPanel}>
          <div className={styles.filtersHeader}>
            <h3>Filter Products</h3>
            {hasActiveFilters() && (
              <button className={styles.clearFilters} onClick={clearFilters}>
                Clear All
              </button>
            )}
          </div>

          <div className={styles.filtersGrid}>
            {/* Category Filter */}
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Category</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className={styles.filterSelect}
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Brand Filter */}
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Brand</label>
              <select
                value={filters.brand}
                onChange={(e) => handleFilterChange('brand', e.target.value)}
                className={styles.filterSelect}
              >
                <option value="all">All Brands</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Price Range</label>
              <div className={styles.priceInputs}>
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  className={styles.priceInput}
                  min="0"
                  step="0.01"
                />
                <span className={styles.priceSeparator}>-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  className={styles.priceInput}
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            {/* Stock Status */}
            <div className={styles.filterGroup}>
              <label className={styles.filterCheckbox}>
                <input
                  type="checkbox"
                  checked={filters.inStock}
                  onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                />
                <span className={styles.checkboxText}>In Stock Only</span>
              </label>
            </div>

            {/* Featured Products */}
            <div className={styles.filterGroup}>
              <label className={styles.filterCheckbox}>
                <input
                  type="checkbox"
                  checked={filters.isFeatured}
                  onChange={(e) => handleFilterChange('isFeatured', e.target.checked)}
                />
                <span className={styles.checkboxText}>Featured Products</span>
              </label>
            </div>

            {/* New Products */}
            <div className={styles.filterGroup}>
              <label className={styles.filterCheckbox}>
                <input
                  type="checkbox"
                  checked={filters.isNew}
                  onChange={(e) => handleFilterChange('isNew', e.target.checked)}
                />
                <span className={styles.checkboxText}>New Products</span>
              </label>
            </div>

            {/* Sort Options */}
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Sort By</label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className={styles.filterSelect}
              >
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="created_at">Newest</option>
                <option value="stock_quantity">Stock</option>
              </select>
            </div>

            {/* Sort Order */}
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Order</label>
              <select
                value={filters.sortOrder}
                onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
                className={styles.filterSelect}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFilters;
