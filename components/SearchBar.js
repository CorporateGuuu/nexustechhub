import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './SearchBar.module.css';

export default function SearchBar({ placeholder = "Search for repair parts...", onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      if (onSearch) {
        onSearch(searchTerm.trim());
      } else {
        // Navigate to search results page
        router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      }
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleBlur = () => {
    if (!searchTerm) {
      setIsExpanded(false);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setIsExpanded(false);
  };

  return (
    <div className={`${styles.searchContainer} ${isExpanded ? styles.expanded : ''}`}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <div className={styles.searchInputContainer}>
          <svg
            className={styles.searchIcon}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>

          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            className={styles.searchInput}
            autoComplete="off"
          />

          {searchTerm && (
            <button
              type="button"
              onClick={clearSearch}
              className={styles.clearButton}
              aria-label="Clear search"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>

        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>

      {/* Quick suggestions */}
      {isExpanded && (
        <div className={styles.suggestions}>
          <div className={styles.suggestionCategory}>
            <h4>Popular Searches:</h4>
            <div className={styles.suggestionTags}>
              <button type="button" onClick={() => setSearchTerm('iPhone screen')}>iPhone screen</button>
              <button type="button" onClick={() => setSearchTerm('Samsung battery')}>Samsung battery</button>
              <button type="button" onClick={() => setSearchTerm('iPad screen')}>iPad screen</button>
              <button type="button" onClick={() => setSearchTerm('repair tools')}>repair tools</button>
              <button type="button" onClick={() => setSearchTerm('digitizer')}>digitizer</button>
              <button type="button" onClick={() => setSearchTerm('charging port')}>charging port</button>
            </div>
          </div>

          <div className={styles.suggestionCategory}>
            <h4>Categories:</h4>
            <div className={styles.suggestionTags}>
              <button type="button" onClick={() => router.push('/iphone-parts')}>iPhone Parts</button>
              <button type="button" onClick={() => router.push('/samsung-parts')}>Samsung Parts</button>
              <button type="button" onClick={() => router.push('/ipad-parts')}>iPad Parts</button>
              <button type="button" onClick={() => router.push('/repair-tools')}>Repair Tools</button>
              <button type="button" onClick={() => router.push('/lcd-buyback')}>LCD Buyback</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
