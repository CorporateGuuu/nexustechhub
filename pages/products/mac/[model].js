import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../../nexus-techhub-fresh/components/Layout/Layout';
import { useCart } from '../../../contexts/CartContext';
import styles from '../../../styles/ModelPage.module.css';

export default function MacModel() {
  const router = useRouter();
  const { model } = router.query;
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('screens');

  // Mock data for different Mac models
  const getModelData = (modelSlug) => {
    const modelMap = {
      'imac-27-a2115': {
        name: 'iMac 27" (A2115)',
        displayName: 'iMac 27" (A2115)',
        releaseYear: '2020',
        display: '27" Retina 5K',
        processor: 'Intel Core i5/i7',
        memory: ['8GB', '16GB', '32GB', '64GB'],
        storage: ['256GB', '512GB', '1TB', '2TB'],
        colors: ['Silver', 'Space Gray']
      },
      'imac-27-a1862': {
        name: 'iMac 27" (A1862)',
        displayName: 'iMac 27" (A1862)',
        releaseYear: '2019',
        display: '27" Retina 5K',
        processor: 'Intel Core i5/i7/i9',
        memory: ['8GB', '16GB', '32GB', '64GB'],
        storage: ['256GB', '512GB', '1TB', '2TB', '3TB'],
        colors: ['Silver', 'Space Gray']
      },
      'imac-24-a2438': {
        name: 'iMac 24" (A2438)',
        displayName: 'iMac 24" (A2438)',
        releaseYear: '2021',
        display: '24" Retina 4.5K',
        processor: 'Apple M1',
        memory: ['8GB', '16GB'],
        storage: ['256GB', '512GB', '1TB', '2TB'],
        colors: ['Blue', 'Green', 'Pink', 'Silver', 'Yellow', 'Orange', 'Purple']
      },
      'macbook-pro-16-a2991': {
        name: 'MacBook Pro 16" (A2991)',
        displayName: 'MacBook Pro 16" (A2991)',
        releaseYear: '2023',
        display: '16.2" Liquid Retina XDR',
        processor: 'Apple M3 Pro/M3 Max',
        memory: ['18GB', '36GB', '48GB'],
        storage: ['512GB', '1TB', '2TB', '4TB', '8TB'],
        colors: ['Space Black', 'Silver']
      },
      'macbook-pro-16-a2780': {
        name: 'MacBook Pro 16" (A2780)',
        displayName: 'MacBook Pro 16" (A2780)',
        releaseYear: '2021',
        display: '16.2" Liquid Retina XDR',
        processor: 'Apple M1 Pro/M1 Max',
        memory: ['16GB', '32GB', '64GB'],
        storage: ['512GB', '1TB', '2TB', '4TB', '8TB'],
        colors: ['Space Gray', 'Silver']
      },
      'macbook-air-15-a2941': {
        name: 'MacBook Air 15" (A2941)',
        displayName: 'MacBook Air 15" (A2941)',
        releaseYear: '2023',
        display: '15.3" Liquid Retina',
        processor: 'Apple M2',
        memory: ['8GB', '16GB', '24GB'],
        storage: ['256GB', '512GB', '1TB', '2TB'],
        colors: ['Midnight', 'Starlight', 'Silver', 'Space Gray']
      },
      'macbook-air-13-a2681': {
        name: 'MacBook Air 13" (A2681)',
        displayName: 'MacBook Air 13" (A2681)',
        releaseYear: '2022',
        display: '13.6" Liquid Retina',
        processor: 'Apple M2',
        memory: ['8GB', '16GB', '24GB'],
        storage: ['256GB', '512GB', '1TB', '2TB'],
        colors: ['Midnight', 'Starlight', 'Silver', 'Space Gray']
      }
    };

    return modelMap[modelSlug] || {
      name: modelSlug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      displayName: modelSlug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      releaseYear: '2022',
      display: '13.3" Retina',
      processor: 'Apple M2',
      memory: ['8GB', '16GB'],
      storage: ['256GB', '512GB', '1TB'],
      colors: ['Space Gray', 'Silver']
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
          price: modelSlug.includes('27') ? 899.99 : modelSlug.includes('16') ? 699.99 : 499.99,
          image: `/images/products/${modelSlug}-screen.jpg`,
          compatibility: modelData.displayName,
          type: modelSlug.includes('retina') || modelSlug.includes('liquid') ? 'Retina LCD' : 'LCD Display',
          stock: 8,
          rating: 4.7,
          reviews: 45
        }
      ],
      keyboards: [
        {
          id: `${modelSlug}-keyboard`,
          name: `${modelData.displayName} Keyboard Assembly`,
          price: modelSlug.includes('pro') ? 249.99 : 199.99,
          image: `/images/products/${modelSlug}-keyboard.jpg`,
          compatibility: modelData.displayName,
          type: modelSlug.includes('2021') || modelSlug.includes('2023') ? 'Magic Keyboard with Touch ID' : 'Magic Keyboard',
          stock: 15,
          rating: 4.5,
          reviews: 78
        }
      ],
      batteries: [
        {
          id: `${modelSlug}-battery`,
          name: `${modelData.displayName} Battery Replacement`,
          price: modelSlug.includes('16') ? 199.99 : modelSlug.includes('15') ? 179.99 : 149.99,
          image: `/images/products/${modelSlug}-battery.jpg`,
          capacity: 'Original Apple capacity',
          compatibility: modelData.displayName,
          stock: 12,
          rating: 4.6,
          reviews: 67
        }
      ],
      charging: [
        {
          id: `${modelSlug}-charging`,
          name: `${modelData.displayName} Charging Port`,
          price: 89.99,
          image: `/images/products/${modelSlug}-charging.jpg`,
          type: 'USB-C with Thunderbolt',
          compatibility: modelData.displayName,
          stock: 20,
          rating: 4.4,
          reviews: 89
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
    { id: 'screens', name: 'Screens', icon: '🖥️' },
    { id: 'keyboards', name: 'Keyboards', icon: '⌨️' },
    { id: 'batteries', name: 'Batteries', icon: '🔋' },
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
      description={`Complete range of repair parts for ${modelData.displayName}. High-quality screens, keyboards, batteries, and components.`}
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
              <span>📺 Display: {modelData.display}</span>
              <span>🖥️ Processor: {modelData.processor}</span>
              <span>🧠 Memory: {modelData.memory.join(', ')}</span>
              <span>💾 Storage: {modelData.storage.join(', ')}</span>
            </div>
            <div className={styles.modelColors}>
              <span>🎨 Colors: {modelData.colors.join(', ')}</span>
            </div>
          </div>
          <div className={styles.modelImage}>
            <img
              src={`/images/macs/${model}.jpg`}
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
          <h2>Other Mac Models</h2>
          <div className={styles.modelsGrid}>
            <Link href="/products/mac/imac-24-a2438" className={styles.modelLink}>
              iMac 24" (A2438)
            </Link>
            <Link href="/products/mac/macbook-pro-16-a2991" className={styles.modelLink}>
              MacBook Pro 16" (A2991)
            </Link>
            <Link href="/products/mac/macbook-air-15-a2941" className={styles.modelLink}>
              MacBook Air 15" (A2941)
            </Link>
            <Link href="/products/mac/macbook-air-13-a2681" className={styles.modelLink}>
              MacBook Air 13" (A2681)
            </Link>
            <Link href="/products/mac/imac-27-a2115" className={styles.modelLink}>
              iMac 27" (A2115)
            </Link>
            <Link href="/products/mac/macbook-pro-16-a2780" className={styles.modelLink}>
              MacBook Pro 16" (A2780)
            </Link>
          </div>
        </div>

        {/* Technical Support */}
        <div className={styles.supportSection}>
          <div className={styles.supportContent}>
            <h2>Need Help with {modelData.displayName}?</h2>
            <p>Our technical experts specialize in Mac repairs and can help you identify the right parts.</p>
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
  // Generate paths for popular Mac models
  const models = [
    'imac-27-a2115',
    'imac-27-a1862',
    'imac-24-a2438',
    'macbook-pro-16-a2991',
    'macbook-pro-16-a2780',
    'macbook-air-15-a2941',
    'macbook-air-13-a2681',
    'macbook-air-13-a2337'
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
