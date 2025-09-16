import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/SearchBar.module.css';

const SearchBar = ({ placeholder = "Search for products, parts, tools...", onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Popular search terms for suggestions
  const popularSearches = [
    'iPhone 15 screen',
    'Samsung battery',
    'iPad Pro screen',
    'repair toolkit',
    'charging port',
    'OLED display',
    'suction cup',
    'precision screwdriver',
    'heat gun',
    'screen adhesive'
  ];

  // Product categories for quick access
  const categories = [
    { name: 'iPhone Parts', slug: 'iphone-parts', count: '20+ products' },
    { name: 'Samsung Parts', slug: 'samsung-parts', count: '25+ products' },
    { name: 'iPad Parts', slug: 'ipad-parts', count: '15+ products' },
    { name: 'Repair Tools', slug: 'repair-tools', count: '20+ products' }
  ];

  // Mock search results for demonstration
  const mockSearchResults = [
    { id: 'ip15-pro-screen', name: 'iPhone 15 Pro OLED Screen Assembly', category: 'iPhone Parts', price: 349.99 },
    { id: 'sg-s24-screen', name: 'Samsung Galaxy S24 OLED Screen Assembly', category: 'Samsung Parts', price: 279.99 },
    { id: 'ipad-pro-screen', name: 'iPad Pro 11" Liquid Retina Display', category: 'iPad Parts', price: 349.99 },
    { id: 'toolkit-pro', name: 'Professional iFixit Repair Toolkit', category: 'Repair Tools', price: 199.99 },
    { id: 'ip15-battery', name: 'iPhone 15 Series Battery Replacement', category: 'iPhone Parts', price: 89.99 },
    { id: 'heat-gun', name: 'Professional Heat Gun with LCD Display', category: 'Repair Tools', price: 89.99 }
  ];

  // Handle search input
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 0) {
      setIsLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        const filtered = mockSearchResults.filter(item =>
          item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.category.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filtered.slice(0, 5)); // Limit to 5 suggestions
        setIsLoading(false);
      }, 300);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsLoading(false);
    }
  };

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      if (onSearch) {
        onSearch(query);
      } else {
        // Default behavior - redirect to search page
        window.location.href = `/search?q=${encodeURIComponent(query)}`;
      }
      setShowSuggestions(false);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.name);
    setShowSuggestions(false);
    // You could redirect to product page here
    // window.location.href = `/products/${suggestion.id}`;
  };

  // Handle popular search click
  const handlePopularSearch = (term) => {
    setQuery(term);
    setShowSuggestions(false);
    if (onSearch) {
      onSearch(term);
    } else {
      window.location.href = `/search?q=${encodeURIComponent(term)}`;
    }
  };

  // Handle category click
  const handleCategoryClick = (category) => {
    window.location.href = `/products/${category.slug}`;
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.search-container')) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <div className={styles.searchInputWrapper}>
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder={placeholder}
            className={styles.searchInput}
            autoComplete="off"
          />
          <button type="submit" className={styles.searchButton}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="M21 21l-4.35-4.35"></path>
            </svg>
          </button>
        </div>

        {/* Search Suggestions Dropdown */}
        {showSuggestions && (
          <div className={styles.suggestionsDropdown}>
            {/* Loading state */}
            {isLoading && (
              <div className={styles.loadingState}>
                <div className={styles.loadingSpinner}></div>
                <span>Searching...</span>
              </div>
            )}

            {/* Search results */}
            {!isLoading && suggestions.length > 0 && (
              <div className={styles.suggestionsSection}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionTitle}>Products</span>
                </div>
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className={styles.suggestionItem}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <div className={styles.suggestionContent}>
                      <div className={styles.suggestionName}>{suggestion.name}</div>
                      <div className={styles.suggestionMeta}>
                        <span className={styles.suggestionCategory}>{suggestion.category}</span>
                        <span className={styles.suggestionPrice}>${suggestion.price}</span>
                      </div>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </div>
                ))}
              </div>
            )}

            {/* Popular searches */}
            {!isLoading && query.length === 0 && (
              <div className={styles.suggestionsSection}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionTitle}>Popular Searches</span>
                </div>
                <div className={styles.popularSearches}>
                  {popularSearches.map((term, index) => (
                    <button
                      key={index}
                      className={styles.popularSearchTag}
                      onClick={() => handlePopularSearch(term)}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Categories */}
            {!isLoading && (
              <div className={styles.suggestionsSection}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionTitle}>Browse Categories</span>
                </div>
                <div className={styles.categoriesGrid}>
                  {categories.map((category) => (
                    <div
                      key={category.slug}
                      className={styles.categoryItem}
                      onClick={() => handleCategoryClick(category)}
                    >
                      <div className={styles.categoryName}>{category.name}</div>
                      <div className={styles.categoryCount}>{category.count}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No results */}
            {!isLoading && query.length > 0 && suggestions.length === 0 && (
              <div className={styles.noResults}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="M21 21l-4.35-4.35"></path>
                  <line x1="13" y1="9" x2="9" y2="13"></line>
                  <line x1="9" y1="9" x2="13" y2="13"></line>
                </svg>
                <div className={styles.noResultsText}>
                  <div className={styles.noResultsTitle}>No products found</div>
                  <div className={styles.noResultsSubtitle}>Try adjusting your search terms</div>
                </div>
              </div>
            )}
          </div>
        )}
      </form>

      {/* Search shortcuts for mobile */}
      <div className={styles.searchShortcuts}>
        <Link href="/products/iphone-parts" className={styles.shortcutLink}>
          iPhone Parts
        </Link>
        <Link href="/products/samsung-parts" className={styles.shortcutLink}>
          Samsung Parts
        </Link>
        <Link href="/products/repair-tools" className={styles.shortcutLink}>
          Tools
        </Link>
      </div>
    </div>
  );
};

export default SearchBar;
