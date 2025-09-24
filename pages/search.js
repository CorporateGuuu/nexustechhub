import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import ProductGrid from '../components/ProductGrid';
import styles from '../styles/Search.module.css';

// Search products using real API
const searchProducts = async (query) => {
  try {
    const response = await fetch(`/api/products?search=${encodeURIComponent(query)}&limit=50`);
    const data = await response.json();

    if (data.success) {
      return data.data.map(product => ({
        id: product.id,
        name: product.name,
        category: product.category,
        model: product.brand || 'Universal',
        price: product.price,
        originalPrice: product.discount_percentage > 0 ? product.price / (1 - product.discount_percentage / 100) : null,
        inStock: product.stock > 0,
        image: product.image,
        description: product.description,
        specifications: [], // TODO: Add specifications from API
        compatibility: [product.brand || 'Universal'],
        sku: product.sku,
        discount_percentage: product.discount_percentage || 0,
        stock: product.stock
      }));
    } else {
      console.error('Search API error:', data.error);
      return [];
    }
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
};

export default function Search() {
  const router = useRouter();
  const { q } = router.query;
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (router.isReady) {
      const query = q || '';
      setSearchQuery(query);
      setIsLoading(true);

      // Call the async search function
      searchProducts(query).then(results => {
        setSearchResults(results);
        setIsLoading(false);
      }).catch(error => {
        console.error('Search error:', error);
        setSearchResults([]);
        setIsLoading(false);
      });
    }
  }, [router.isReady, q]);

  const handleNewSearch = (newQuery) => {
    router.push(`/search?q=${encodeURIComponent(newQuery)}`);
  };

  const getPageTitle = () => {
    if (searchQuery) {
      return `Search Results for "${searchQuery}" | Nexus Tech Hub`;
    }
    return 'Search Products | Nexus Tech Hub';
  };

  const getPageDescription = () => {
    if (searchQuery) {
      return `Find ${searchQuery} and other professional repair parts at Nexus Tech Hub. High-quality components with warranty coverage.`;
    }
    return 'Search our extensive catalog of professional repair parts, tools, and components for iPhone, Samsung, iPad, and more.';
  };

  return (
    <Layout
      title={getPageTitle()}
      description={getPageDescription()}
    >
      <div className={styles.searchPage}>
        <div className={styles.container}>
          <div className={styles.searchHeader}>
            <h1 className={styles.title}>
              {searchQuery ? `Search Results for "${searchQuery}"` : 'Search Products'}
            </h1>
            <div className={styles.searchBarContainer}>
              <SearchBar
                onSearch={handleNewSearch}
                placeholder="Search for repair parts, tools, and components..."
              />
            </div>
          </div>

          {isLoading ? (
            <div className={styles.loading}>
              <div className="loading-spinner"></div>
              <p>Searching products...</p>
            </div>
          ) : (
            <>
              <div className={styles.resultsInfo}>
                <p>
                  {searchResults.length > 0
                    ? `Found ${searchResults.length} product${searchResults.length !== 1 ? 's' : ''}`
                    : 'No products found'
                  }
                  {searchQuery && ` for "${searchQuery}"`}
                </p>
              </div>

              {searchResults.length > 0 ? (
                <ProductGrid
                  products={searchResults}
                  categoryTitle={searchQuery ? `Search Results` : 'All Products'}
                />
              ) : (
                <div className={styles.noResults}>
                  <h2>No products found</h2>
                  <p>Try adjusting your search terms or browse our categories:</p>
                  <div className={styles.categoryLinks}>
                    <a href="/iphone-parts">iPhone Parts</a>
                    <a href="/samsung-parts">Samsung Parts</a>
                    <a href="/ipad-parts">iPad Parts</a>
                    <a href="/repair-tools">Repair Tools</a>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
