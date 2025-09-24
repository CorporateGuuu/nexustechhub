import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import { useCart } from '../../../contexts/CartContext';
import styles from '../../../styles/ModelPage.module.css';

export default function IPadModel() {
  const router = useRouter();
  const { model } = router.query;
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('screens');

  // Mock data for different iPad models
  const getModelData = (modelSlug) => {
    const modelMap = {
      'ipad-pro-13-7th-gen-2024': {
        name: 'iPad Pro 13" 7th Gen (2024)',
        displayName: 'iPad Pro 13" (7th Gen 2024)',
        releaseYear: '2024',
        display: '13" Ultra Retina XDR OLED',
        storage: ['256GB', '512GB', '1TB', '2TB'],
        colors: ['Space Black', 'Silver']
      },
      'ipad-pro-12-9-6th-gen-2022': {
        name: 'iPad Pro 12.9" 6th Gen (2022)',
        displayName: 'iPad Pro 12.9" (6th Gen 2022)',
        releaseYear: '2022',
        display: '12.9" Liquid Retina XDR',
        storage: ['128GB', '256GB', '512GB', '1TB', '2TB'],
        colors: ['Space Gray', 'Silver']
      },
      'ipad-pro-12-9-5th-gen-2021': {
        name: 'iPad Pro 12.9" 5th Gen (2021)',
        displayName: 'iPad Pro 12.9" (5th Gen 2021)',
        releaseYear: '2021',
        display: '12.9" Liquid Retina XDR',
        storage: ['128GB', '256GB', '512GB', '1TB', '2TB'],
        colors: ['Space Gray', 'Silver']
      },
      'ipad-pro-12-9-4th-gen-2020': {
        name: 'iPad Pro 12.9" 4th Gen (2020)',
        displayName: 'iPad Pro 12.9" (4th Gen 2020)',
        releaseYear: '2020',
        display: '12.9" Liquid Retina XDR',
        storage: ['128GB', '256GB', '512GB', '1TB'],
        colors: ['Space Gray', 'Silver']
      },
      'ipad-pro-12-9-3rd-gen-2018': {
        name: 'iPad Pro 12.9" 3rd Gen (2018)',
        displayName: 'iPad Pro 12.9" (3rd Gen 2018)',
        releaseYear: '2018',
        display: '12.9" Liquid Retina XDR',
        storage: ['64GB', '256GB', '512GB', '1TB'],
        colors: ['Space Gray', 'Silver', 'Gold']
      }
    };

    return modelMap[modelSlug] || {
      name: modelSlug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      displayName: modelSlug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      releaseYear: '2022',
      display: '10.9" Liquid Retina',
      storage: ['64GB', '128GB', '256GB'],
      colors: ['Space Gray', 'Silver', 'Blue', 'Pink', 'Green']
    };
  };

  const modelData = getModelData(model);

  // Parts data for the specific model
  const getPartsForModel = (modelSlug, category) => {
    const baseParts = {
      screens: [
        {
          id: `${modelSlug}-screen`,
          name: `${modelData.displayName} Screen Assembly`,
          price: modelSlug.includes('pro-13') ? 599.99 : modelSlug.includes('pro-12-9') ? 499.99 : 249.99,
          image: `/images/products/${modelSlug}-screen.jpg`,
          compatibility: modelData.displayName,
          type: modelSlug.includes('2024') || modelSlug.includes('2022') || modelSlug.includes('2021') ? 'Liquid Retina XDR' : 'Retina LCD',
          stock: 15,
          rating: 4.8,
          reviews: 89
        }
      ],
      batteries: [
        {
          id: `${modelSlug}-battery`,
          name: `${modelData.displayName} Battery Replacement`,
          price: modelSlug.includes('pro') ? 129.99 : 99.99,
          image: `/images/products/${modelSlug}-battery.jpg`,
          capacity: 'Original Apple capacity',
          compatibility: modelData.displayName,
          stock: 25,
          rating: 4.6,
          reviews: 134
        }
      ],
      cameras: [
        {
          id: `${modelSlug}-camera`,
          name: `${modelData.displayName} Front Camera Assembly`,
          price: 79.99,
          image: `/images/products/${modelSlug}-camera.jpg`,
          type: 'Ultra Wide front camera with Center Stage',
          compatibility: modelData.displayName,
          stock: 35,
          rating: 4.5,
          reviews: 67
        }
      ],
      charging: [
        {
          id: `${modelSlug}-charging`,
          name: `${modelData.displayName} USB-C Port`,
          price: 45.99,
          image: `/images/products/${modelSlug}-charging.jpg`,
          type: 'USB-C with Thunderbolt support',
          compatibility: modelData.displayName,
          stock: 40,
          rating: 4.4,
          reviews: 112
        }
      ]
    };

    return baseParts[category] || [];
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
    { id: 'screens', name: 'Screens', icon: '📱' },
    { id: 'batteries', name: 'Batteries', icon: '🔋' },
    { id: 'cameras', name: 'Cameras', icon: '📷' },
    { id: 'charging', name: 'Charging Ports', icon: '🔌' }
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
      description={`Complete range of repair parts for ${modelData.displayName}. High-quality screens, batteries, and components with warranty.`}
    >
      <div className={styles.modelPage}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span className={styles.separator}>/</span>
          <Link href="/products">Products</Link>
          <span className={styles.separator}>/</span>
          <Link href="/products/ipad-parts">iPad Parts</Link>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>{modelData.displayName}</span>
        </div>

        {/* Model Header */}
        <div className={styles.modelHeader}>
          <div className={styles.modelInfo}>
            <h1>{modelData.displayName} Parts</h1>
            <div className={styles.modelSpecs}>
              <span>📅 Released: {modelData.releaseYear}</span>
              <span>📺 Display: {modelData.display}</span>
              <span>💾 Storage: {modelData.storage.join(', ')}</span>
            </div>
            <div className={styles.modelColors}>
              <span>🎨 Colors: {modelData.colors.join(', ')}</span>
            </div>
          </div>
          <div className={styles.modelImage}>
            <img
              src={`/images/tablets/${model}.jpg`}
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
          <h2>Other iPad Models</h2>
          <div className={styles.modelsGrid}>
            <Link href="/products/ipad/ipad-pro-13-7th-gen-2024" className={styles.modelLink}>
              iPad Pro 13" (2024)
            </Link>
            <Link href="/products/ipad/ipad-pro-12-9-6th-gen-2022" className={styles.modelLink}>
              iPad Pro 12.9" (2022)
            </Link>
            <Link href="/products/ipad/ipad-pro-12-9-5th-gen-2021" className={styles.modelLink}>
              iPad Pro 12.9" (2021)
            </Link>
            <Link href="/products/ipad/ipad-pro-12-9-4th-gen-2020" className={styles.modelLink}>
              iPad Pro 12.9" (2020)
            </Link>
            <Link href="/products/ipad/ipad-pro-12-9-3rd-gen-2018" className={styles.modelLink}>
              iPad Pro 12.9" (2018)
            </Link>
          </div>
          <div className={styles.viewAll}>
            <Link href="/products/ipad-parts" className={styles.viewAllBtn}>
              View All iPad Models →
            </Link>
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
  // Generate paths for popular iPad models
  const models = [
    'ipad-pro-13-7th-gen-2024',
    'ipad-pro-12-9-6th-gen-2022',
    'ipad-pro-12-9-5th-gen-2021',
    'ipad-pro-12-9-4th-gen-2020',
    'ipad-pro-12-9-3rd-gen-2018',
    'ipad-pro-11-4th-gen-2022',
    'ipad-pro-11-3rd-gen-2021',
    'ipad-pro-11-2nd-gen-2020',
    'ipad-air-5th-gen-2022',
    'ipad-air-4th-gen-2020'
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
