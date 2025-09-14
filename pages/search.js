import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import SearchBar from '../components/SearchBar';
import ProductGrid from '../components/ProductGrid';
import styles from '../styles/Search.module.css';

// Mock search function - in production, this would query a database
const searchProducts = (query) => {
  const allProducts = [
    // iPhone Parts
    {
      id: 'ip15-screen-oled',
      name: 'iPhone 15 Pro OLED Screen Assembly',
      category: 'iPhone Parts',
      model: 'iPhone 15 Pro',
      price: 299.99,
      originalPrice: 349.99,
      inStock: true,
      image: '/images/products/placeholder.svg',
      description: 'High-quality OLED replacement screen for iPhone 15 Pro',
      specifications: ['OLED Display', 'Touch Digitizer Included', '6-Month Warranty'],
      compatibility: ['iPhone 15 Pro'],
      sku: 'NTH-IP15P-SCREEN-001'
    },
    {
      id: 'ip14-battery',
      name: 'iPhone 14 Battery Replacement',
      category: 'iPhone Parts',
      model: 'iPhone 14',
      price: 89.99,
      originalPrice: null,
      inStock: true,
      image: '/images/products/placeholder.svg',
      description: 'Original capacity battery replacement for iPhone 14',
      specifications: ['3279mAh Capacity', 'Li-ion Technology', '1-Year Warranty'],
      compatibility: ['iPhone 14'],
      sku: 'NTH-IP14-BAT-001'
    },
    // Samsung Parts
    {
      id: 'sg-s24-screen-oled',
      name: 'Samsung Galaxy S24 OLED Screen Assembly',
      category: 'Samsung Parts',
      model: 'Galaxy S24',
      price: 249.99,
      originalPrice: 279.99,
      inStock: true,
      image: '/images/products/placeholder.svg',
      description: 'High-quality OLED replacement screen for Samsung Galaxy S24',
      specifications: ['OLED Display', 'Touch Digitizer Included', '6-Month Warranty'],
      compatibility: ['Samsung Galaxy S24'],
      sku: 'NTH-SGS24-SCREEN-001'
    },
    {
      id: 'sg-s23-battery',
      name: 'Samsung Galaxy S23 Battery Replacement',
      category: 'Samsung Parts',
      model: 'Galaxy S23',
      price: 79.99,
      originalPrice: null,
      inStock: true,
      image: '/images/products/placeholder.svg',
      description: 'Original capacity battery replacement for Samsung Galaxy S23',
      specifications: ['3900mAh Capacity', 'Li-ion Technology', '1-Year Warranty'],
      compatibility: ['Samsung Galaxy S23'],
      sku: 'NTH-SGS23-BAT-001'
    },
    // iPad Parts
    {
      id: 'ipad-pro12-lcd',
      name: 'iPad Pro 12.9" LCD Assembly',
      category: 'iPad Parts',
      model: 'iPad Pro 12.9"',
      price: 299.99,
      originalPrice: 349.99,
      inStock: true,
      image: '/images/products/placeholder.svg',
      description: 'High-resolution LCD assembly for iPad Pro 12.9" with touch digitizer',
      specifications: ['12.9" LCD Display', 'Touch Digitizer Included', '6-Month Warranty'],
      compatibility: ['iPad Pro 12.9" (6th Gen)', 'iPad Pro 12.9" (5th Gen)'],
      sku: 'NTH-IPPRO12-LCD-001'
    },
    {
      id: 'ipad-air5-digitizer',
      name: 'iPad Air 5th Gen Digitizer',
      category: 'iPad Parts',
      model: 'iPad Air 5th Gen',
      price: 159.99,
      originalPrice: null,
      inStock: true,
      image: '/images/products/placeholder.svg',
      description: 'Touch digitizer replacement for iPad Air 5th Generation',
      specifications: ['10.9" Touch Digitizer', 'Oleophobic Coating', '6-Month Warranty'],
      compatibility: ['iPad Air 5th Generation (2022)'],
      sku: 'NTH-IPAIR5-DIGIT-001'
    },
    // Repair Tools
    {
      id: 'toolkit-pro-50pc',
      name: 'Professional Repair Tool Kit - 50 Pieces',
      category: 'Repair Tools',
      model: 'Universal',
      price: 149.99,
      originalPrice: 179.99,
      inStock: true,
      image: '/images/products/placeholder.svg',
      description: 'Complete professional repair tool kit for mobile device technicians',
      specifications: ['50+ Precision Tools', 'Anti-Static Mat Included', 'Carrying Case'],
      compatibility: ['iPhone', 'Samsung', 'iPad', 'Universal'],
      sku: 'NTH-TOOLS-PRO50-001'
    },
    {
      id: 'screwdriver-precision',
      name: 'Precision Screwdriver Set - iPhone/Samsung',
      category: 'Repair Tools',
      model: 'Universal',
      price: 39.99,
      originalPrice: null,
      inStock: true,
      image: '/images/products/placeholder.svg',
      description: 'High-precision screwdriver set for iPhone and Samsung repairs',
      specifications: ['15 Precision Bits', 'Magnetic Tips', 'Ergonomic Handle'],
      compatibility: ['iPhone', 'Samsung', 'iPad', 'Universal'],
      sku: 'NTH-TOOLS-SCREW-001'
    }
  ];

  if (!query || query.trim() === '') {
    return allProducts;
  }

  const searchTerm = query.toLowerCase().trim();

  return allProducts.filter(product => {
    return (
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.model.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.specifications.some(spec => spec.toLowerCase().includes(searchTerm)) ||
      product.compatibility.some(comp => comp.toLowerCase().includes(searchTerm))
    );
  });
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
