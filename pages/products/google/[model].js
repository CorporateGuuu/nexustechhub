import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import { useCart } from '../../../contexts/CartContext';
import styles from '../../../styles/ModelPage.module.css';

export default function GoogleModel() {
  const router = useRouter();
  const { model } = router.query;
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('parts');

  // Mock data for different Google Pixel product models
  const getModelData = (modelSlug) => {
    const modelMap = {
      // Pixel Series
      'pixel-10-pro-xl': {
        name: 'Pixel 10 Pro XL',
        displayName: 'Pixel 10 Pro XL',
        category: 'Pixel Series',
        releaseYear: '2025',
        display: '6.8" LTPO OLED',
        processor: 'Google Tensor G5',
        storage: ['256GB', '512GB', '1TB'],
        colors: ['Porcelain', 'Obsidian', 'Hazel']
      },
      'pixel-10-pro': {
        name: 'Pixel 10 Pro',
        displayName: 'Pixel 10 Pro',
        category: 'Pixel Series',
        releaseYear: '2025',
        display: '6.3" LTPO OLED',
        processor: 'Google Tensor G5',
        storage: ['256GB', '512GB', '1TB'],
        colors: ['Porcelain', 'Obsidian', 'Hazel']
      },
      'pixel-10': {
        name: 'Pixel 10',
        displayName: 'Pixel 10',
        category: 'Pixel Series',
        releaseYear: '2025',
        display: '6.2" OLED',
        processor: 'Google Tensor G5',
        storage: ['128GB', '256GB', '512GB'],
        colors: ['Porcelain', 'Obsidian', 'Hazel']
      },
      'pixel-9a': {
        name: 'Pixel 9a',
        displayName: 'Pixel 9a',
        category: 'Pixel Series',
        releaseYear: '2024',
        display: '6.1" OLED',
        processor: 'Google Tensor G4',
        storage: ['128GB', '256GB'],
        colors: ['Porcelain', 'Obsidian', 'Beryl']
      },
      'pixel-9-pro-xl': {
        name: 'Pixel 9 Pro XL',
        displayName: 'Pixel 9 Pro XL',
        category: 'Pixel Series',
        releaseYear: '2024',
        display: '6.8" LTPO OLED',
        processor: 'Google Tensor G4',
        storage: ['256GB', '512GB', '1TB'],
        colors: ['Porcelain', 'Obsidian', 'Hazel', 'Rose Quartz']
      },
      'pixel-9-pro-fold': {
        name: 'Pixel 9 Pro Fold',
        displayName: 'Pixel 9 Pro Fold',
        category: 'Pixel Series',
        releaseYear: '2024',
        display: '8.0" LTPO OLED (unfolded), 6.3" LTPO OLED (folded)',
        processor: 'Google Tensor G4',
        storage: ['256GB', '512GB', '1TB'],
        colors: ['Porcelain', 'Obsidian']
      },
      'pixel-9-pro': {
        name: 'Pixel 9 Pro',
        displayName: 'Pixel 9 Pro',
        category: 'Pixel Series',
        releaseYear: '2024',
        display: '6.3" LTPO OLED',
        processor: 'Google Tensor G4',
        storage: ['128GB', '256GB', '512GB', '1TB'],
        colors: ['Porcelain', 'Obsidian', 'Hazel', 'Rose Quartz']
      },
      'pixel-9': {
        name: 'Pixel 9',
        displayName: 'Pixel 9',
        category: 'Pixel Series',
        releaseYear: '2024',
        display: '6.3" OLED',
        processor: 'Google Tensor G4',
        storage: ['128GB', '256GB'],
        colors: ['Porcelain', 'Wintergreen', 'Peony']
      },
      'pixel-8a': {
        name: 'Pixel 8a',
        displayName: 'Pixel 8a',
        category: 'Pixel Series',
        releaseYear: '2024',
        display: '6.1" OLED',
        processor: 'Google Tensor G3',
        storage: ['128GB', '256GB'],
        colors: ['Porcelain', 'Obsidian', 'Bay']
      },

      // Pixelbook Series
      'pixelbook-go': {
        name: 'Pixelbook Go',
        displayName: 'Pixelbook Go',
        category: 'Pixelbook Series',
        releaseYear: '2019',
        display: '13.3" 1920x1080 LCD',
        processor: 'Intel Core i5/i7',
        storage: ['128GB', '256GB'],
        colors: ['Just Black', 'Not Pink']
      },
      'pixelbook': {
        name: 'Pixelbook',
        displayName: 'Pixelbook',
        category: 'Pixelbook Series',
        releaseYear: '2017',
        display: '12.3" 2400x1600 LCD',
        processor: 'Intel Core i5/i7',
        storage: ['128GB', '256GB', '512GB'],
        colors: ['Silver', 'Black']
      },

      // Pixel Tablet Series
      'pixel-tablet': {
        name: 'Pixel Tablet (GTU8P)',
        displayName: 'Pixel Tablet (GTU8P/2023)',
        category: 'Pixel Tablet Series',
        releaseYear: '2023',
        display: '10.95" 1600x2560 LCD',
        processor: 'Google Tensor G2',
        storage: ['128GB', '256GB'],
        colors: ['Porcelain', 'Hazel']
      }
    };

    return modelMap[modelSlug] || {
      name: modelSlug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      displayName: modelSlug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      category: 'Google Pixel Product',
      releaseYear: '2024',
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
          price: modelSlug.includes('pixel-10') || modelSlug.includes('pixel-9') ? 149.99 :
                 modelSlug.includes('pixelbook') ? 99.99 :
                 modelSlug.includes('pixel-tablet') ? 89.99 : 79.99,
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
          price: modelSlug.includes('pixel-10') || modelSlug.includes('pixel-9') ? 99.99 :
                 modelSlug.includes('pixelbook') ? 79.99 :
                 modelSlug.includes('pixel-tablet') ? 69.99 : 59.99,
          image: `/images/products/${modelSlug}-battery.jpg`,
          capacity: 'Original Google capacity',
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
              src={`/images/google/${model}.jpg`}
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
            {modelData.category === 'Pixel Series' && (
              <>
                <Link href="/products/google/pixel-10-pro" className={styles.modelLink}>
                  Pixel 10 Pro
                </Link>
                <Link href="/products/google/pixel-10" className={styles.modelLink}>
                  Pixel 10
                </Link>
                <Link href="/products/google/pixel-9-pro" className={styles.modelLink}>
                  Pixel 9 Pro
                </Link>
                <Link href="/products/google/pixel-9" className={styles.modelLink}>
                  Pixel 9
                </Link>
                <Link href="/products/google/pixel-8a" className={styles.modelLink}>
                  Pixel 8a
                </Link>
              </>
            )}
            {modelData.category === 'Pixelbook Series' && (
              <>
                <Link href="/products/google/pixelbook-go" className={styles.modelLink}>
                  Pixelbook Go
                </Link>
                <Link href="/products/google/pixelbook" className={styles.modelLink}>
                  Pixelbook
                </Link>
              </>
            )}
            {modelData.category === 'Pixel Tablet Series' && (
              <>
                <Link href="/products/google/pixel-tablet" className={styles.modelLink}>
                  Pixel Tablet (GTU8P)
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
  // Generate paths for popular Google Pixel product models
  const models = [
    // Pixel Series
    'pixel-10-pro-xl',
    'pixel-10-pro',
    'pixel-10',
    'pixel-9a',
    'pixel-9-pro-xl',
    'pixel-9-pro-fold',
    'pixel-9-pro',
    'pixel-9',
    'pixel-8a',
    // Pixelbook Series
    'pixelbook-go',
    'pixelbook',
    // Pixel Tablet Series
    'pixel-tablet'
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
