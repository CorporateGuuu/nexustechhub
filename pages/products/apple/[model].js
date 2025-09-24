import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import { useCart } from '../../../contexts/CartContext';
import styles from '../../../styles/ModelPage.module.css';

export default function AppleModel() {
  const router = useRouter();
  const { model } = router.query;
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('parts');

  // Fetch products from database API
  const fetchProductsFromAPI = async (modelSlug) => {
    try {
      // Map model slugs to category filters
      const categoryMap = {
        'iphone-17-air': 'iphone',
        'iphone-17-pro-max': 'iphone',
        'iphone-17-pro': 'iphone',
        'iphone-17': 'iphone',
        'iphone-16-pro-max': 'iphone',
        'iphone-16-pro': 'iphone',
        'iphone-16-plus': 'iphone',
        'iphone-16': 'iphone',
        'iphone-15-pro-max': 'iphone',
        'iphone-15-pro': 'iphone',
        'iphone-15-plus': 'iphone',
        'iphone-15': 'iphone',
        'iphone-14-pro-max': 'iphone',
        'iphone-14-pro': 'iphone',
        'iphone-14-plus': 'iphone',
        'iphone-14': 'iphone',
        'iphone-13-pro-max': 'iphone',
        'iphone-13-pro': 'iphone',
        'iphone-13-mini': 'iphone',
        'iphone-13': 'iphone'
      };

      const categorySlug = categoryMap[modelSlug] || 'iphone';

      const response = await fetch(`/api/products?category=${categorySlug}&limit=50`);
      const data = await response.json();

      if (data.success && data.data) {
        return data.data;
      }

      // Fallback to mock data if API fails
      return getMockProductsForModel(modelSlug);
    } catch (error) {
      console.error('Error fetching products:', error);
      return getMockProductsForModel(modelSlug);
    }
  };

  // Mock data for different Apple product models (fallback)
  const getModelData = (modelSlug) => {
    const modelMap = {
      // iPhone models
      'iphone-17-air': {
        name: 'iPhone 17 Air',
        displayName: 'iPhone 17 Air',
        category: 'iPhone',
        releaseYear: '2025',
        display: '6.1" Super Retina XDR OLED',
        processor: 'Apple A18',
        storage: ['128GB', '256GB', '512GB'],
        colors: ['Black Titanium', 'White Titanium', 'Blue Titanium', 'Natural Titanium']
      },
      'iphone-17-pro-max': {
        name: 'iPhone 17 Pro Max',
        displayName: 'iPhone 17 Pro Max',
        category: 'iPhone',
        releaseYear: '2025',
        display: '6.9" Super Retina XDR OLED',
        processor: 'Apple A18 Pro',
        storage: ['256GB', '512GB', '1TB'],
        colors: ['Black Titanium', 'White Titanium', 'Blue Titanium', 'Natural Titanium']
      },
      'iphone-17-pro': {
        name: 'iPhone 17 Pro',
        displayName: 'iPhone 17 Pro',
        category: 'iPhone',
        releaseYear: '2025',
        display: '6.3" Super Retina XDR OLED',
        processor: 'Apple A18 Pro',
        storage: ['128GB', '256GB', '512GB', '1TB'],
        colors: ['Black Titanium', 'White Titanium', 'Blue Titanium', 'Natural Titanium']
      },
      'iphone-17': {
        name: 'iPhone 17',
        displayName: 'iPhone 17',
        category: 'iPhone',
        releaseYear: '2025',
        display: '6.1" Super Retina XDR OLED',
        processor: 'Apple A18',
        storage: ['128GB', '256GB', '512GB'],
        colors: ['Midnight', 'Starlight', 'Blue', 'Purple', 'Red']
      },

      // Apple Watch models
      'watch-series-9-45mm': {
        name: 'Apple Watch Series 9 (45MM)',
        displayName: 'Apple Watch Series 9 (45MM)',
        category: 'Watch',
        releaseYear: '2023',
        display: '45mm Retina LTPO OLED',
        processor: 'Apple S9',
        storage: ['64GB'],
        colors: ['Midnight', 'Starlight', 'Silver', 'Pink', 'Product Red']
      },
      'watch-series-9-41mm': {
        name: 'Apple Watch Series 9 (41MM)',
        displayName: 'Apple Watch Series 9 (41MM)',
        category: 'Watch',
        releaseYear: '2023',
        display: '41mm Retina LTPO OLED',
        processor: 'Apple S9',
        storage: ['64GB'],
        colors: ['Midnight', 'Starlight', 'Silver', 'Pink', 'Product Red']
      },
      'watch-ultra-2-49mm': {
        name: 'Apple Watch Ultra 2 (49MM)',
        displayName: 'Apple Watch Ultra 2 (49MM)',
        category: 'Watch',
        releaseYear: '2023',
        display: '49mm Retina LTPO OLED',
        processor: 'Apple S9',
        storage: ['64GB'],
        colors: ['Titanium']
      },

      // AirPods models
      'airpods-pro-2nd-gen': {
        name: 'AirPods Pro (2nd Gen)',
        displayName: 'AirPods Pro (2nd Generation)',
        category: 'AirPods',
        releaseYear: '2022',
        features: ['Active Noise Cancellation', 'Transparency Mode', 'Spatial Audio'],
        colors: ['White']
      }
    };

    return modelMap[modelSlug] || {
      name: modelSlug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      displayName: modelSlug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      category: 'Apple Product',
      releaseYear: '2025',
      colors: ['Black', 'White']
    };
  };

  const modelData = getModelData(model);

  // Mock products for fallback
  const getMockProductsForModel = (modelSlug) => {
    const mockProducts = [
      {
        id: `${modelSlug}-screen`,
        name: `${modelData.displayName} Screen Assembly`,
        price: 299.99,
        image: `/images/products/${modelSlug}-screen.jpg`,
        compatibility: modelData.displayName,
        type: 'Premium OLED display replacement',
        stock: 25,
        rating: 4.8,
        reviews: 156
      },
      {
        id: `${modelSlug}-battery`,
        name: `${modelData.displayName} Battery Replacement`,
        price: 79.99,
        image: `/images/products/${modelSlug}-battery.jpg`,
        capacity: 'Original Apple capacity',
        compatibility: modelData.displayName,
        stock: 40,
        rating: 4.6,
        reviews: 203
      },
      {
        id: `${modelSlug}-charging-port`,
        name: `${modelData.displayName} Charging Port`,
        price: 49.99,
        image: `/images/products/${modelSlug}-charging.jpg`,
        compatibility: modelData.displayName,
        type: 'USB-C charging assembly',
        stock: 60,
        rating: 4.4,
        reviews: 89
      }
    ];

    return mockProducts;
  };

  // Parts data for the specific model (legacy function)
  const getPartsForModel = (modelSlug, category) => {
    return getMockProductsForModel(modelSlug);
  };

  useEffect(() => {
    const loadProducts = async () => {
      if (model) {
        setLoading(true);
        try {
          const fetchedProducts = await fetchProductsFromAPI(model);
          setProducts(fetchedProducts);
        } catch (error) {
          console.error('Error loading products:', error);
          // Fallback to mock data
          const parts = getPartsForModel(model, selectedCategory);
          setProducts(parts);
        } finally {
          setLoading(false);
        }
      }
    };

    loadProducts();
  }, [model, selectedCategory]);

  const handleAddToCart = async (product) => {
    try {
      await addToCart(product, 1);
      // Success feedback
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const categories = [
    { id: 'parts', name: 'Repair Parts', icon: '🔧' },
    { id: 'batteries', name: 'Batteries', icon: '🔋' },
    { id: 'accessories', name: 'Accessories', icon: '🎧' }
  ];

  if (loading) {
    return (
      <Layout title={`${modelData.displayName} Parts - Nexus Tech Hub`} description={`Repair parts for ${modelData.displayName}`}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <h3>Loading {modelData.displayName} parts...</h3>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${modelData.displayName} Parts - Professional Repair Components | Nexus Tech Hub`}
      description={`Complete range of repair parts for ${modelData.displayName}. High-quality components with warranty.`}
    >
      <div className={styles.modelPage}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span className={styles.separator}>/</span>
          <Link href="/products">Products</Link>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>{modelData.displayName}</span>
        </div>

        {/* Model Header */}
        <div className={styles.modelHeader}>
          <div className={styles.modelInfo}>
            <h1>{modelData.displayName} Parts</h1>
            <div className={styles.modelSpecs}>
              <span>📅 Released: {modelData.releaseYear}</span>
              {modelData.display && <span>📺 Display: {modelData.display}</span>}
              {modelData.processor && <span>🖥️ Processor: {modelData.processor}</span>}
              {modelData.storage && <span>💾 Storage: {modelData.storage.join(', ')}</span>}
              {modelData.features && <span>✨ Features: {modelData.features.join(', ')}</span>}
            </div>
            <div className={styles.modelColors}>
              <span>🎨 Colors: {modelData.colors.join(', ')}</span>
            </div>
          </div>
          <div className={styles.modelImage}>
            <img
              src={`/images/apple/${model}.jpg`}
              alt={modelData.displayName}
              onError={(e) => {
                e.target.src = '/images/products/placeholder.svg';
              }}
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className={styles.categoryTabs}>
          {categories.map(category => (
            <button
              key={category.id}
              className={`${styles.categoryTab} ${selectedCategory === category.id ? styles.active : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className={styles.categoryIcon}>{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Parts Grid */}
        <div className={styles.partsGrid}>
          {products.map(product => (
            <div key={product.id} className={styles.partCard}>
              <div className={styles.partImage}>
                <img
                  src={product.image}
                  alt={product.name}
                  onError={(e) => {
                    e.target.src = '/images/products/placeholder.svg';
                  }}
                />
                <div className={styles.partOverlay}>
                  <Link href={`/products/${product.id}`} className={styles.viewDetailsBtn}>
                    View Details
                  </Link>
                </div>
              </div>

              <div className={styles.partInfo}>
                <h3 className={styles.partName}>
                  <Link href={`/products/${product.id}`}>{product.name}</Link>
                </h3>
                <div className={styles.partSpecs}>
                  <p><strong>Type:</strong> {product.type}</p>
                  <p><strong>Compatibility:</strong> {product.compatibility}</p>
                  {product.capacity && <p><strong>Capacity:</strong> {product.capacity}</p>}
                </div>

                <div className={styles.partRating}>
                  <div className={styles.stars}>
                    {'★'.repeat(Math.floor(product.rating))}
                    {'☆'.repeat(5 - Math.floor(product.rating))}
                  </div>
                  <span className={styles.ratingValue}>{product.rating}</span>
                  <span className={styles.reviewCount}>({product.reviews})</span>
                </div>

                <div className={styles.partPrice}>
                  <span className={styles.currentPrice}>${product.price}</span>
                </div>

                <div className={styles.partStock}>
                  {product.stock > 10 ? (
                    <span className={styles.inStock}>✓ In Stock</span>
                  ) : product.stock > 0 ? (
                    <span className={styles.lowStock}>⚠ Only {product.stock} left</span>
                  ) : (
                    <span className={styles.outOfStock}>✗ Out of Stock</span>
                  )}
                </div>

                <button
                  className={styles.addToCartBtn}
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
                >
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Related Models */}
        <div className={styles.relatedModels}>
          <h2>Other {modelData.category} Models</h2>
          <div className={styles.modelsGrid}>
            {modelData.category === 'Watch' && (
              <>
                <Link href="/products/apple/watch-series-9-45mm" className={styles.modelLink}>
                  Watch Series 9 (45MM)
                </Link>
                <Link href="/products/apple/watch-series-9-41mm" className={styles.modelLink}>
                  Watch Series 9 (41MM)
                </Link>
                <Link href="/products/apple/watch-ultra-2-49mm" className={styles.modelLink}>
                  Watch Ultra 2 (49MM)
                </Link>
                <Link href="/products/apple/watch-series-8-45mm" className={styles.modelLink}>
                  Watch Series 8 (45MM)
                </Link>
              </>
            )}
            {modelData.category === 'AirPods' && (
              <>
                <Link href="/products/apple/airpods-pro-2nd-gen" className={styles.modelLink}>
                  AirPods Pro (2nd Gen)
                </Link>
                <Link href="/products/apple/airpods-3rd-gen" className={styles.modelLink}>
                  AirPods (3rd Gen)
                </Link>
                <Link href="/products/apple/airpods-max" className={styles.modelLink}>
                  AirPods Max
                </Link>
              </>
            )}
            {modelData.category === 'iPod' && (
              <>
                <Link href="/products/apple/ipod-touch-7" className={styles.modelLink}>
                  iPod Touch 7
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Technical Support */}
        <div className={styles.supportSection}>
          <div className={styles.supportContent}>
            <h2>Need Help with {modelData.displayName}?</h2>
            <p>Our technical experts can help you identify the right parts and provide repair guidance.</p>
            <div className={styles.supportActions}>
              <Link href="/services/support" className={styles.supportBtn}>
                Get Technical Support
              </Link>
              <Link href="/contact" className={styles.contactBtn}>
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  // Generate paths for popular Apple product models
  const models = [
    // Apple Watch
    'watch-series-9-45mm',
    'watch-series-9-41mm',
    'watch-ultra-2-49mm',
    'watch-series-8-45mm',
    // AirPods
    'airpods-pro-2nd-gen',
    'airpods-3rd-gen',
    'airpods-max',
    // iPod
    'ipod-touch-7'
  ];

  const paths = models.map(model => ({
    params: { model }
  }));

  return {
    paths,
    fallback: 'blocking' // Generate pages on-demand for new models
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {},
    revalidate: 3600 // Regenerate every hour
  };
}
