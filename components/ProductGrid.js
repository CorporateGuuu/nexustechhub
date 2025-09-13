import React, { useState } from 'react';
import Link from 'next/link';
import QuoteRequestModal from './QuoteRequestModal';
import ErrorBoundary from './ErrorBoundary';
import LoadingSpinner, { ProductCardSkeleton } from './LoadingSpinner';
import { ProductImage } from './OptimizedImage';
import styles from './ProductGrid.module.css';

export default function ProductGrid({ products, categoryTitle, isLoading = false }) {
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('all');
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Get unique models for filtering
  const uniqueModels = [...new Set(products.map(product => product.model))];

  // Handle quote request
  const handleQuoteRequest = (product) => {
    setSelectedProduct({
      name: product.name,
      sku: product.sku,
      category: categoryTitle,
      price: product.price
    });
    setQuoteModalOpen(true);
  };

  // Filter and sort products
  const filteredProducts = products.filter(product => {
    if (filterBy === 'all') return true;
    if (filterBy === 'in-stock') return product.inStock;
    if (filterBy === 'on-sale') return product.originalPrice;
    return product.model === filterBy;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED'
    }).format(price);
  };

  // Handle loading state
  if (isLoading) {
    return (
      <section className={styles.productGrid}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>{categoryTitle}</h2>
            <p className={styles.subtitle}>
              Professional-grade replacement parts with warranty coverage
            </p>
          </div>

          <div className={styles.loadingContainer}>
            <LoadingSpinner size="large" text="Loading products..." />
          </div>

          <div className={styles.grid}>
            {Array.from({ length: 6 }, (_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <ErrorBoundary componentName="Product Grid">
    <section className={styles.productGrid}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{categoryTitle}</h2>
          <p className={styles.subtitle}>
            Professional-grade replacement parts with warranty coverage
          </p>
        </div>

        <div className={styles.controls}>
          <div className={styles.filters}>
            <label className={styles.filterLabel}>Filter:</label>
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className={styles.select}
            >
              <option value="all">All Products</option>
              <option value="in-stock">In Stock</option>
              <option value="on-sale">On Sale</option>
              {uniqueModels.map(model => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
          </div>

          <div className={styles.sorting}>
            <label className={styles.sortLabel}>Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={styles.select}
            >
              <option value="name">Name A-Z</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className={styles.grid}>
          {sortedProducts.map(product => (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.imageContainer}>
                <ProductImage
                  product={{
                    ...product,
                    image: product.image || '/images/products/placeholder.svg'
                  }}
                  width={280}
                  height={200}
                  className={styles.productImage}
                  showBadge={true}
                />
              </div>

              <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productModel}>{product.model}</p>

                <div className={styles.priceContainer}>
                  <span className={styles.currentPrice}>
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className={styles.originalPrice}>
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                <div className={styles.stockStatus}>
                  {product.inStock ? (
                    <span className={styles.inStock}>✓ In Stock</span>
                  ) : (
                    <span className={styles.outOfStock}>⚠ Out of Stock</span>
                  )}
                </div>

                <div className={styles.actions}>
                  <Link href={`/products/${product.slug}`} className={styles.viewButton}>
                    View Details
                  </Link>
                  <button
                    className={styles.quoteButton}
                    disabled={!product.inStock}
                    onClick={() => handleQuoteRequest(product)}
                  >
                    Request Quote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className={styles.noResults}>
            <p>No products found matching your criteria.</p>
          </div>
        )}
      </div>

      <QuoteRequestModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        preselectedProduct={selectedProduct}
      />
    </section>
    </ErrorBoundary>
  );
}
