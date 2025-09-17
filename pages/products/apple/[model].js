import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../../nexus-techhub-fresh/components/Layout/Layout';
import { useCart } from '../../../contexts/CartContext';
import styles from '../../../styles/ModelPage.module.css';

export default function AppleModel() {
  const router = useRouter();
  const { model } = router.query;
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('parts');

  // Mock data for different Apple product models
  const getModelData = (modelSlug) => {
    const modelMap = {
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
      'watch-series-8-45mm': {
        name: 'Apple Watch Series 8 (45MM)',
        displayName: 'Apple Watch Series 8 (45MM)',
        category: 'Watch',
        releaseYear: '2022',
        display: '45mm Retina LTPO OLED',
        processor: 'Apple S8',
        storage: ['32GB'],
        colors: ['Midnight', 'Starlight', 'Silver', 'Pink', 'Product Red']
      },

      // AirPods models
      'airpods-pro-2nd-gen': {
        name: 'AirPods Pro (2nd Gen)',
        displayName: 'AirPods Pro (2nd Generation)',
        category: 'AirPods',
        releaseYear: '2022',
        features: ['Active Noise Cancellation', 'Transparency Mode', 'Spatial Audio'],
        colors: ['White']
      },
      'airpods-3rd-gen': {
        name: 'AirPods (3rd Gen)',
        displayName: 'AirPods (3rd Generation)',
        category: 'AirPods',
        releaseYear: '2021',
        features: ['Spatial Audio', 'Adaptive EQ'],
        colors: ['White']
      },
      'airpods-max': {
        name: 'AirPods Max',
        displayName: 'AirPods Max',
        category: 'AirPods',
        releaseYear: '2020',
        features: ['Active Noise Cancellation', 'Spatial Audio', 'Over-ear Design'],
        colors: ['Space Gray', 'Silver', 'Pink', 'Blue', 'Green']
      },

      // iPod models
      'ipod-touch-7': {
        name: 'iPod Touch 7th Gen',
        displayName: 'iPod Touch (7th Generation)',
        category: 'iPod',
        releaseYear: '2019',
        display: '4" Retina',
        storage: ['32GB', '128GB', '256GB'],
        colors: ['Space Gray', 'Silver', 'Gold', 'Pink', 'Blue']
      }
    };

    return modelMap[modelSlug] || {
      name: modelSlug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      displayName: modelSlug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      category: 'Apple Product',
      releaseYear: '2023',
      colors: ['Black', 'White']
    };
  };

  const modelData = getModelData(model);

  // Parts data for the specific model
  const getPartsForModel = (modelSlug, category) => {
    const baseParts = {
      parts: [
        {
          id: `${modelSlug}-repair-kit`,
          name: `${modelData.displayName} Repair Kit`,
          price: modelSlug.includes('watch') ? 89.99 : modelSlug.includes('airpods') ? 49.99 : 39.99,
          image: `/images/products/${modelSlug}-kit.jpg`,
          compatibility: modelData.displayName,
          type: 'Complete repair kit with tools and parts',
          stock: 25,
          rating: 4.5,
          reviews: 67
        },
        {
          id: `${modelSlug}-battery`,
          name: `${modelData.displayName} Battery Replacement`,
          price: modelSlug.includes('watch-ultra') ? 79.99 : modelSlug.includes('watch') ? 59.99 : 29.99,
          image: `/images/products/${modelSlug}-battery.jpg`,
          capacity: 'Original Apple capacity',
          compatibility: modelData.displayName,
          stock: 40,
          rating: 4.4,
          reviews: 89
        }
      ]
    };

    return baseParts[category] || baseParts.parts;
  };

  useEffect(() => {
    if (model) {
      const parts = getPartsForModel(model, selectedCategory);
      setProducts(parts);
      setLoading(false);
    }
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
