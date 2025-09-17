import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../../nexus-techhub-fresh/components/Layout/Layout';
import { useCart } from '../../../contexts/CartContext';
import styles from '../../../styles/ModelPage.module.css';

export default function LGModel() {
  const router = useRouter();
  const { model } = router.query;
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('parts');

  // Mock data for different LG product models
  const getModelData = (modelSlug) => {
    const modelMap = {
      // LG G Series
      'velvet': {
        name: 'Velvet',
        displayName: 'LG Velvet',
        category: 'G Series',
        releaseYear: '2020',
        display: '6.8" P-OLED',
        processor: 'Snapdragon 765G',
        storage: ['128GB'],
        colors: ['Aurora White', 'Aurora Gray', 'Aurora Green', 'Illusion Sunset']
      },
      'g8x-thinq': {
        name: 'G8X ThinQ',
        displayName: 'LG G8X ThinQ',
        category: 'G Series',
        releaseYear: '2019',
        display: '6.4" OLED',
        processor: 'Snapdragon 855',
        storage: ['128GB'],
        colors: ['Aurora Black', 'Aurora White']
      },
      'g8s-thinq': {
        name: 'G8S ThinQ',
        displayName: 'LG G8S ThinQ',
        category: 'G Series',
        releaseYear: '2019',
        display: '6.21" IPS LCD',
        processor: 'Snapdragon 632',
        storage: ['64GB'],
        colors: ['Mirror Black', 'Mirror White', 'New Aurora Black', 'New Moroccan Blue']
      },
      'g8-thinq': {
        name: 'G8 ThinQ',
        displayName: 'LG G8 ThinQ',
        category: 'G Series',
        releaseYear: '2019',
        display: '6.1" P-OLED',
        processor: 'Snapdragon 855',
        storage: ['128GB'],
        colors: ['Aurora Black', 'Aurora White', 'Carmine Red', 'Platinum Gray']
      },
      'g7-thinq': {
        name: 'G7 ThinQ',
        displayName: 'LG G7 ThinQ',
        category: 'G Series',
        releaseYear: '2018',
        display: '6.1" IPS LCD',
        processor: 'Snapdragon 845',
        storage: ['64GB', '128GB'],
        colors: ['New Platinum Gray', 'New Aurora Black', 'Raspberry Rose', 'Moroccan Blue']
      }
    };

    return modelMap[modelSlug] || {
      name: modelSlug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      displayName: modelSlug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      category: 'LG Product',
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
          price: modelSlug.includes('g8') || modelSlug.includes('g7') ? 119.99 : 99.99,
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
          price: modelSlug.includes('g8') || modelSlug.includes('g7') ? 79.99 : 69.99,
          image: `/images/products/${modelSlug}-battery.jpg`,
          capacity: 'Original LG capacity',
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
              src={`/images/lg/${model}.jpg`}
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
            {modelData.category === 'G Series' && (
              <>
                <Link href="/products/lg/velvet" className={styles.modelLink}>
                  Velvet
                </Link>
                <Link href="/products/lg/g8x-thinq" className={styles.modelLink}>
                  G8X ThinQ
                </Link>
                <Link href="/products/lg/g8s-thinq" className={styles.modelLink}>
                  G8S ThinQ
                </Link>
                <Link href="/products/lg/g8-thinq" className={styles.modelLink}>
                  G8 ThinQ
                </Link>
                <Link href="/products/lg/g7-thinq" className={styles.modelLink}>
                  G7 ThinQ
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
  // Generate paths for popular LG product models
  const models = [
    // LG G Series
    'velvet',
    'g8x-thinq',
    'g8s-thinq',
    'g8-thinq',
    'g7-thinq'
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
