import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/db';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchInputRef = useRef(null);
  const router = useRouter();
  const debounceTimer = useRef(null);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('id, name, slug')
          .order('name');

        if (error) throw error;
        setCategories(data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Debounced search function
  const debouncedSearch = useCallback(async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      // Search categories
      const { data: categoryResults, error: categoryError } = await supabase
        .from('categories')
        .select('id, name, slug')
        .ilike('name', `%${query}%`)
        .limit(3);

      if (categoryError) throw categoryError;

      // Search products
      const { data: productResults, error: productError } = await supabase
        .from('products')
        .select('id, name, slug')
        .ilike('name', `%${query}%`)
        .limit(3);

      if (productError) throw productError;

      // Combine and format suggestions
      const categorySuggestions = (categoryResults || []).map(cat => ({
        id: `cat-${cat.id}`,
        name: cat.name,
        type: 'category',
        url: `/products?category=${cat.id}`
      }));

      const productSuggestions = (productResults || []).map(prod => ({
        id: `prod-${prod.id}`,
        name: prod.name,
        type: 'product',
        url: `/products/${prod.slug}`
      }));

      setSuggestions([...categorySuggestions, ...productSuggestions]);
    } catch (error) {
      console.error('Error searching:', error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Clear previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Set new timer for debounced search
    debounceTimer.current = setTimeout(() => {
      debouncedSearch(value);
    }, 300); // 300ms debounce
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchTerm)}`);
      setIsExpanded(false);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    router.push(suggestion.url);
    setSearchTerm('');
    setSuggestions([]);
    setIsExpanded(false);
  };

  // Toggle search bar expansion
  const toggleSearchBar = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      // Focus the input when expanding
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 100);
    }
  };

  // Close search bar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.searchContainer}>
      <button
        className={styles.searchToggle}
        onClick={toggleSearchBar}
        aria-label="Toggle search"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>

      <div className={`${styles.searchBar} ${isExpanded ? styles.expanded : ''}`}>
        <form onSubmit={handleSearchSubmit} ref={searchInputRef}>
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className={styles.searchInput}
            aria-label="Search products"
          />
          <button type="submit" className={styles.searchButton} aria-label="Search">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </form>

        {loading && (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
          </div>
        )}

        {suggestions.length > 0 && !loading && (
          <div className={styles.suggestions}>
            {suggestions.map(suggestion => (
              <div
                key={suggestion.id}
                className={styles.suggestionItem}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className={styles.suggestionName}>{suggestion.name}</div>
                <div className={styles.suggestionType}>
                  {suggestion.type === 'category' ? 'Category' : 'Product'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
