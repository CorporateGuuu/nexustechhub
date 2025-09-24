import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import { useCart } from '../../../contexts/CartContext';
import styles from '../../../styles/ModelPage.module.css';

export default function IPhoneModel() {
  const router = useRouter();
  const { model } = router.query;
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('screens');

  // Mock data for different iPhone models
  const getModelData = (modelSlug) => {
    const modelMap = {
      'iphone-17-air': {
        name: 'iPhone 17 Air',
        displayName: 'iPhone 17 Air',
        releaseYear: '2025',
        display: '6.1" Super Retina XDR',
        storage: ['128GB', '256GB', '512GB'],
        colors: ['Starlight', 'Midnight', 'Blue', 'Purple', 'Coral']
      },
      'iphone-17-pro-max': {
        name: 'iPhone 17 Pro Max',
        displayName: 'iPhone 17 Pro Max',
        releaseYear: '2025',
        display: '6.9" Super Retina XDR',
        storage: ['256GB', '512GB', '1TB'],
        colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium']
      },
      'iphone-17-pro': {
        name: 'iPhone 17 Pro',
        displayName: 'iPhone 17 Pro',
        releaseYear: '2025',
        display: '6.3" Super Retina XDR',
        storage: ['128GB', '256GB', '512GB', '1TB'],
        colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium']
      },
      'iphone-17': {
        name: 'iPhone 17',
        displayName: 'iPhone 17',
        releaseYear: '2025',
        display: '6.1" Super Retina XDR',
        storage: ['128GB', '256GB', '512GB'],
        colors: ['Starlight', 'Midnight', 'Blue', 'Purple', 'Coral']
      },
      'iphone-16e': {
        name: 'iPhone 16e',
        displayName: 'iPhone 16e',
        releaseYear: '2025',
        display: '6.1" Retina HD',
        storage: ['128GB', '256GB'],
        colors: ['White', 'Black', 'Blue', 'Red']
      },
      'iphone-16-pro-max': {
        name: 'iPhone 16 Pro Max',
        displayName: 'iPhone 16 Pro Max',
        releaseYear: '2024',
        display: '6.9" Super Retina XDR',
        storage: ['256GB', '512GB', '1TB'],
        colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium']
      }
    };

    return modelMap[modelSlug] || {
      name: modelSlug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      displayName: modelSlug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      releaseYear: '2024',
      display: '6.1" Display',
      storage: ['128GB', '256GB', '512GB'],
      colors: ['Black', 'White', 'Blue']
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
          price: modelSlug.includes('pro-max') ? 399.99 : modelSlug.includes('pro') ? 349.99 : 249.99,
          image: `/images/products/${modelSlug}-screen.jpg`,
          compatibility: modelData.displayName,
          type: modelSlug.includes('pro') ? 'Super Retina XDR OLED' : 'Retina LCD',
          stock: 25,
          rating: 4.8,
          reviews: 156
        }
      ],
      batteries: [
        {
          id: `${modelSlug}-battery`,
          name: `${modelData.displayName} Battery Replacement`,
          price: 89.99,
          image: `/images/products/${modelSlug}-battery.jpg`,
          capacity: 'Original Apple capacity',
          compatibility: modelData.displayName,
          stock: 45,
          rating: 4.6,
          reviews: 203
        }
      ],
      cameras: [
        {
          id: `${modelSlug}-camera`,
          name: `${modelData.displayName} Rear Camera Assembly`,
          price: modelSlug.includes('pro') ? 149.99 : 119.99,
          image: `/images/products/${modelSlug}-camera.jpg`,
          type: modelSlug.includes('pro') ? 'Triple Camera System' : 'Dual Camera System',
          compatibility: modelData.displayName,
          stock: 30,
          rating: 4.7,
          reviews: 134
        }
      ],
      charging: [
        {
          id: `${modelSlug}-charging`,
          name: `${modelData.displayName} Charging Port`,
          price: modelSlug.includes('16') || modelSlug.includes('17') ? 49.99 : 39.99,
          image: `/images/products/${modelSlug}-charging.jpg`,
          type: modelSlug.includes('16') || modelSlug.includes('17') ? 'USB-C' : 'Lightning',
          compatibility: modelData.displayName,
          stock: 60,
          rating: 4.5,
          reviews: 178
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
          <Link href="/products/iphone-parts">iPhone Parts</Link>
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
              src={`/images/phones/${model}.jpg`}
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
          <h2>Other iPhone Models</h2>
          <div className={styles.modelsGrid}>
            <Link href="/products/iphone/iphone-17-pro-max" className={styles.modelLink}>
              iPhone 17 Pro Max
            </Link>
            <Link href="/products/iphone/iphone-17-pro" className={styles.modelLink}>
              iPhone 17 Pro
            </Link>
            <Link href="/products/iphone/iphone-17" className={styles.modelLink}>
              iPhone 17
            </Link>
            <Link href="/products/iphone/iphone-16-pro-max" className={styles.modelLink}>
              iPhone 16 Pro Max
            </Link>
            <Link href="/products/iphone/iphone-16e" className={styles.modelLink}>
              iPhone 16e
            </Link>
            <Link href="/products/iphone/iphone-17-air" className={styles.modelLink}>
              iPhone 17 Air
            </Link>
          </div>
          <div className={styles.viewAll}>
            <Link href="/products/iphone-parts" className={styles.viewAllBtn}>
              View All iPhone Models →
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
  // Generate paths for popular iPhone models
  const models = [
    'iphone-17-air',
    'iphone-17-pro-max',
    'iphone-17-pro',
    'iphone-17',
    'iphone-16e',
    'iphone-16-pro-max',
    'iphone-16-pro',
    'iphone-16',
    'iphone-15-pro-max',
    'iphone-15-pro',
    'iphone-15-plus',
    'iphone-15'
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
