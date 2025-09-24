import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../../../components/Layout';
import { useCart } from '../../../../contexts/CartContext';
import styles from '../../../../styles/CategoryPage.module.css';

export default function BoardComponentIPhone() {
  const router = useRouter();
  const { model } = router.query;
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for different iPhone models
  const getModelData = (modelSlug) => {
    const modelMap = {
      'iphone-13-pro-max': {
        name: 'iPhone 13 Pro Max',
        displayName: 'iPhone 13 Pro Max Board Components',
        category: 'iPhone 13 Pro Max Series',
        releaseYear: '2021',
        display: '6.7" Super Retina XDR',
        processor: 'A15 Bionic',
        storage: ['128GB', '256GB', '512GB', '1TB'],
        colors: ['Graphite', 'Gold', 'Silver', 'Sierra Blue', 'Alpine Green']
      },
      'iphone-13-pro': {
        name: 'iPhone 13 Pro',
        displayName: 'iPhone 13 Pro Board Components',
        category: 'iPhone 13 Pro Series',
        releaseYear: '2021',
        display: '6.1" Super Retina XDR',
        processor: 'A15 Bionic',
        storage: ['128GB', '256GB', '512GB', '1TB'],
        colors: ['Graphite', 'Gold', 'Silver', 'Sierra Blue', 'Alpine Green']
      },
      'iphone-13': {
        name: 'iPhone 13',
        displayName: 'iPhone 13 Board Components',
        category: 'iPhone 13 Series',
        releaseYear: '2021',
        display: '6.1" Super Retina XDR',
        processor: 'A15 Bionic',
        storage: ['128GB', '256GB', '512GB'],
        colors: ['Pink', 'Blue', 'Midnight', 'Starlight', 'Green', 'Red']
      },
      'iphone-13-mini': {
        name: 'iPhone 13 Mini',
        displayName: 'iPhone 13 Mini Board Components',
        category: 'iPhone 13 Mini Series',
        releaseYear: '2021',
        display: '5.4" Super Retina XDR',
        processor: 'A15 Bionic',
        storage: ['128GB', '256GB', '512GB'],
        colors: ['Pink', 'Blue', 'Midnight', 'Starlight', 'Green', 'Red']
      },
      'iphone-12-pro-max': {
        name: 'iPhone 12 Pro Max',
        displayName: 'iPhone 12 Pro Max Board Components',
        category: 'iPhone 12 Pro Max Series',
        releaseYear: '2020',
        display: '6.7" Super Retina XDR',
        processor: 'A14 Bionic',
        storage: ['128GB', '256GB', '512GB'],
        colors: ['Pacific Blue', 'Gold', 'Graphite', 'Silver']
      }
    };

    return modelMap[modelSlug] || {
      name: modelSlug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      displayName: `${modelSlug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Board Components`,
      category: 'iPhone Series',
      releaseYear: '2021',
      colors: ['Black', 'White']
    };
  };

  const modelData = getModelData(model);

  // Mock products for the board components
  const getBoardComponents = (modelSlug) => {
    const baseProducts = [
      {
        id: `${modelSlug}-main-board`,
        name: `${modelData.name} Main Logic Board`,
        price: modelSlug.includes('pro-max') ? 299.99 :
               modelSlug.includes('pro') ? 249.99 :
               modelSlug.includes('mini') ? 199.99 : 179.99,
        image: `/images/boards/${modelSlug}-main-board.jpg`,
        description: `Original ${modelData.name} main logic board - tested and guaranteed`,
        type: 'Main Logic Board',
        compatibility: modelData.name,
        stock: 8,
        rating: 4.9,
        reviews: 67
      },
      {
        id: `${modelSlug}-charging-board`,
        name: `${modelData.name} Charging Board`,
        price: 49.99,
        image: `/images/boards/${modelSlug}-charging-board.jpg`,
        description: `Replacement charging board for ${modelData.name}`,
        type: 'Charging Assembly',
        compatibility: modelData.name,
        stock: 25,
        rating: 4.7,
        reviews: 123
      },
      {
        id: `${modelSlug}-wifi-board`,
        name: `${modelData.name} WiFi Board`,
        price: 39.99,
        image: `/images/boards/${modelSlug}-wifi-board.jpg`,
        description: `WiFi/Bluetooth board replacement for ${modelData.name}`,
        type: 'WiFi Module',
        compatibility: modelData.name,
        stock: 15,
        rating: 4.6,
        reviews: 89
      },
      {
        id: `${modelSlug}-power-management`,
        name: `${modelData.name} Power Management IC`,
        price: 29.99,
        image: `/images/boards/${modelSlug}-pmic.jpg`,
        description: `Power management integrated circuit for ${modelData.name}`,
        type: 'Power Management',
        compatibility: modelData.name,
        stock: 30,
        rating: 4.5,
        reviews: 156
      }
    ];

    return baseProducts;
  };

  useEffect(() => {
    if (model) {
      const boardComponents = getBoardComponents(model);
      setProducts(boardComponents);
      setLoading(false);
    }
  }, [model]);

  const handleAddToCart = async (product) => {
    try {
      await addToCart(product, 1);
      // Success feedback
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  if (loading) {
    return (
      <Layout title={`${modelData.displayName} - Nexus Tech Hub`} description={`Board components for ${modelData.name}`}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <h3>Loading {modelData.displayName}...</h3>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${modelData.displayName} - Professional Board Components | Nexus Tech Hub`}
      description={`Buy genuine ${modelData.name} board components. Main boards, charging assemblies, and more.`}
    >
      <div className={styles.categoryPage}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span className={styles.separator}>/</span>
          <Link href="/products">Products</Link>
          <span className={styles.separator}>/</span>
          <Link href="/products/board-components">Board Components</Link>
          <span className={styles.separator}>/</span>
          <Link href="/products/board-components/interactive-view">Interactive View</Link>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>{modelData.name}</span>
        </div>

        {/* Model Header */}
        <div className={styles.categoryHeader}>
          <div className={styles.categoryInfo}>
            <h1>{modelData.displayName}</h1>
            <p className={styles.categoryDescription}>
              Genuine {modelData.name} board components for professional repairs.
              All components are tested and guaranteed for compatibility.
            </p>
            <div className={styles.brandDetails}>
              <div className={styles.detailItem}>
                <strong>Released:</strong> {modelData.releaseYear}
              </div>
              <div className={styles.detailItem}>
                <strong>Display:</strong> {modelData.display}
              </div>
              <div className={styles.detailItem}>
                <strong>Processor:</strong> {modelData.processor}
              </div>
            </div>
          </div>
          <div className={styles.categoryImage}>
            <img
              src={`/images/iphone/${model}-board.jpg`}
              alt={modelData.displayName}
              onError={(e) => {
                e.target.src = '/images/products/placeholder.svg';
              }}
            />
          </div>
        </div>

        {/* Component Types */}
        <div className={styles.popularSection}>
          <h2>Available Components</h2>
          <div className={styles.popularList}>
            <div className={styles.popularItem}>
              <strong>Main Logic Boards:</strong> Complete motherboard assemblies
            </div>
            <div className={styles.popularItem}>
              <strong>Charging Assemblies:</strong> Lightning charging ports and flexes
            </div>
            <div className={styles.popularItem}>
              <strong>WiFi Modules:</strong> Wireless communication boards
            </div>
            <div className={styles.popularItem}>
              <strong>Power Management:</strong> PMIC and voltage regulators
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className={styles.productsGrid}>
          {products.map(product => (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.productImage}>
                <img
                  src={product.image}
                  alt={product.name}
                  onError={(e) => {
                    e.target.src = '/images/products/placeholder.svg';
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  background: '#007bff',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '10px',
                  fontWeight: 'bold'
                }}>
                  {product.type}
                </div>
              </div>

              <div className={styles.productInfo}>
                <h3 className={styles.productName}>
                  <Link href={`/products/${product.id}`}>{product.name}</Link>
                </h3>
                <p className={styles.productDescription}>{product.description}</p>
                <div className={styles.productCategory}>
                  Compatible with: {product.compatibility}
                </div>

                <div className={styles.productRating}>
                  <div className={styles.stars}>
                    {'★'.repeat(Math.floor(product.rating))}
                    {'☆'.repeat(5 - Math.floor(product.rating))}
                  </div>
                  <span className={styles.ratingValue}>{product.rating}</span>
                  <span className={styles.reviewCount}>({product.reviews})</span>
                </div>

                <div className={styles.productPrice}>
                  <span className={styles.currentPrice}>${product.price}</span>
                </div>

                <div className={styles.productStock}>
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

        {/* Technical Info */}
        <div className={styles.brandInfo}>
          <h2>Board Component Specifications</h2>
          <p>All our {modelData.name} board components are sourced from authorized suppliers and undergo rigorous testing before shipping. Each component includes detailed installation instructions and compatibility information.</p>
          <p><strong>Compatibility:</strong> Specifically designed for {modelData.name} models. Please verify your device model before purchasing.</p>
          <p><strong>Warranty:</strong> All board components come with a 90-day warranty covering manufacturing defects.</p>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  // Generate paths for iPhone board components
  const models = [
    'iphone-13-pro-max',
    'iphone-13-pro',
    'iphone-13',
    'iphone-13-mini',
    'iphone-12-pro-max'
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
