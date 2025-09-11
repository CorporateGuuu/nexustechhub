import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import SearchBar from '../components/SearchBar';
import ProductGrid from '../components/ProductGrid';
import styles from '../styles/Search.module.css';

// Search function that queries the database
const searchProducts = async (query) => {
  try {
    if (!query || query.trim() === '') {
      // Return all products if no query
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      return data.success ? data.products : [];
    }

    // Search with query parameter
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Failed to search products');
    }
    const data = await response.json();
    return data.success ? data.products : [];
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

      // Simulate API delay
      setTimeout(() => {
        const results = searchProducts(query);
        setSearchResults(results);
        setIsLoading(false);
      }, 300);
    }
  }, [router.isReady, q]);

  const handleNewSearch = (newQuery) => {
    router.push(`/search?q=${encodeURIComponent(newQuery)}`);
  };

  const getPageTitle = () => {
    if (searchQuery) {
      return `Search Results for "${searchQuery}" | Nexus TechHub`;
    }
    return 'Search Products | Nexus TechHub';
  };

  const getPageDescription = () => {
    if (searchQuery) {
      return `Find ${searchQuery} and other professional repair parts at Nexus TechHub. High-quality components with warranty coverage.`;
    }
    return 'Search our extensive catalog of professional repair parts, tools, and components for iPhone, Samsung, iPad, and more.';
  };

  return (
    <>
      <Head>
        <title>{getPageTitle()}</title>
        <meta name="description" content={getPageDescription()} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`https://nexustechhub.ae/search${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ''}`} />
      </Head>

      <Header />

      <main className={styles.searchPage}>
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
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
