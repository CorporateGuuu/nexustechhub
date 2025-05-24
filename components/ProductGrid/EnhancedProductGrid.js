import React, { useState, useMemo } from 'react';
import EnhancedProductCard from '../ProductCard/EnhancedProductCard';
import styles from './EnhancedProductGrid.module.css';

const EnhancedProductGrid = ({ 
  products = [], 
  title = "Products", 
  subtitle = "",
  showFilters = true,
  showSorting = true,
  itemsPerPage = 12,
  gridColumns = "auto-fit"
}) => {
  const [sortBy, setSortBy] = useState('featured');
  const [filterBy, setFilterBy] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Apply filters
    if (filterBy !== 'all') {
      switch (filterBy) {
        case 'new':
          filtered = filtered.filter(product => product.isNew);
          break;
        case 'sale':
          filtered = filtered.filter(product => product.originalPrice && product.price < product.originalPrice);
          break;
        case 'featured':
          filtered = filtered.filter(product => product.isFeatured);
          break;
        case 'in-stock':
          filtered = filtered.filter(product => product.inStock !== false);
          break;
        default:
          break;
      }
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
      case 'featured':
      default:
        // Keep original order for featured
        break;
    }

    return filtered;
  }, [products, sortBy, filterBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredAndSortedProducts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of grid
    document.querySelector(`.${styles.productGrid}`)?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  };

  if (!products || products.length === 0) {
    return (
      <section className={styles.productGridSection}>
        <div className={styles.container}>
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M16 16s-1.5-2-4-2-4 2-4 2"></path>
                <line x1="9" y1="9" x2="9.01" y2="9"></line>
                <line x1="15" y1="9" x2="15.01" y2="9"></line>
              </svg>
            </div>
            <h3>No products found</h3>
            <p>Try adjusting your filters or check back later for new products.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.productGridSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <h2 className={styles.title}>{title}</h2>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
          
          {/* Results Count */}
          <div className={styles.resultsCount}>
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredAndSortedProducts.length)} of {filteredAndSortedProducts.length} products
          </div>
        </div>

        {/* Filters and Controls */}
        {(showFilters || showSorting) && (
          <div className={styles.controls}>
            <div className={styles.leftControls}>
              {/* Filters */}
              {showFilters && (
                <div className={styles.filterGroup}>
                  <label htmlFor="filter-select" className={styles.controlLabel}>Filter:</label>
                  <select 
                    id="filter-select"
                    value={filterBy} 
                    onChange={(e) => {
                      setFilterBy(e.target.value);
                      setCurrentPage(1);
                    }}
                    className={styles.select}
                  >
                    <option value="all">All Products</option>
                    <option value="new">New Arrivals</option>
                    <option value="sale">On Sale</option>
                    <option value="featured">Featured</option>
                    <option value="in-stock">In Stock</option>
                  </select>
                </div>
              )}

              {/* Sorting */}
              {showSorting && (
                <div className={styles.sortGroup}>
                  <label htmlFor="sort-select" className={styles.controlLabel}>Sort by:</label>
                  <select 
                    id="sort-select"
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className={styles.select}
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name A-Z</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              )}
            </div>

            <div className={styles.rightControls}>
              {/* View Mode Toggle */}
              <div className={styles.viewModeToggle}>
                <button 
                  className={`${styles.viewModeBtn} ${viewMode === 'grid' ? styles.active : ''}`}
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid View"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                </button>
                <button 
                  className={`${styles.viewModeBtn} ${viewMode === 'list' ? styles.active : ''}`}
                  onClick={() => setViewMode('list')}
                  aria-label="List View"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="8" y1="6" x2="21" y2="6"></line>
                    <line x1="8" y1="12" x2="21" y2="12"></line>
                    <line x1="8" y1="18" x2="21" y2="18"></line>
                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className={`${styles.productGrid} ${styles[viewMode]} ${styles[gridColumns]}`}>
          {paginatedProducts.map((product) => (
            <EnhancedProductCard 
              key={product.id} 
              product={product}
              showQuickView={true}
              showWishlist={true}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button 
              className={styles.pageBtn}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous Page"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              const isVisible = page === 1 || page === totalPages || 
                               (page >= currentPage - 1 && page <= currentPage + 1);
              
              if (!isVisible) {
                if (page === currentPage - 2 || page === currentPage + 2) {
                  return <span key={page} className={styles.ellipsis}>...</span>;
                }
                return null;
              }

              return (
                <button
                  key={page}
                  className={`${styles.pageBtn} ${page === currentPage ? styles.active : ''}`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              );
            })}

            <button 
              className={styles.pageBtn}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next Page"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default EnhancedProductGrid;
