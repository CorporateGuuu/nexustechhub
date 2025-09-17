import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../../../nexus-techhub-fresh/components/Layout/Layout';
import { useCart } from '../../../../contexts/CartContext';
import styles from '../../../../styles/CategoryPage.module.css';

export default function OEMServiceTools() {
  const router = useRouter();
  const { tool } = router.query;
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for different OEM service tools
  const getToolData = (toolSlug) => {
    const toolMap = {
      'disassembly-tools': {
        name: 'Disassembly Tools',
        description: 'Professional tools for safe device disassembly and reassembly',
        category: 'Service Tools',
        features: ['Non-marring surfaces', 'Precision fit', 'Durable construction', 'Multiple sizes']
      },
      'repair-fixtures': {
        name: 'Repair Fixtures',
        description: 'Specialized fixtures for holding devices during repair',
        category: 'Fixtures',
        features: ['Stable holding', 'Adjustable positions', 'Device-specific designs', 'Professional grade']
      },
      'clamps-holders': {
        name: 'Clamps & Holders',
        description: 'Professional clamps and holders for repair work',
        category: 'Holding Tools',
        features: ['Secure grip', 'Adjustable pressure', 'Non-slip surfaces', 'Various sizes']
      },
      'pliers-cutters': {
        name: 'Pliers & Cutters',
        description: 'Precision pliers and cutters for electronics work',
        category: 'Cutting Tools',
        features: ['ESD safe', 'Precision cutting', 'Ergonomic design', 'Multiple functions']
      },
      'cleaning-supplies': {
        name: 'Cleaning Supplies',
        description: 'Professional cleaning supplies for electronics repair',
        category: 'Cleaning',
        features: ['Anti-static', 'Safe for electronics', 'Multiple applications', 'Professional grade']
      }
    };

    return toolMap[toolSlug] || {
      name: toolSlug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      description: `Professional ${toolSlug.replace('-', ' ')} for OEM service work`,
      category: 'OEM Tools',
      features: ['Professional quality', 'OEM specifications', 'Durable construction']
    };
  };

  const toolData = getToolData(tool);

  // Mock products for the OEM tool category
  const getToolProducts = (toolSlug) => {
    const baseProducts = [
      {
        id: `${toolSlug}-pro-kit`,
        name: `Professional ${toolData.name} Kit`,
        price: 149.99,
        image: `/images/products/${toolSlug}-kit.jpg`,
        description: `Complete professional ${toolData.name.toLowerCase()} kit for OEM service`,
        category: toolData.category,
        stock: 20,
        rating: 4.8,
        reviews: 89
      },
      {
        id: `${toolSlug}-precision-set`,
        name: `Precision ${toolData.name} Set`,
        price: 99.99,
        image: `/images/products/${toolSlug}-precision.jpg`,
        description: `High-precision ${toolData.name.toLowerCase()} for detailed OEM work`,
        category: toolData.category,
        stock: 35,
        rating: 4.6,
        reviews: 124
      },
      {
        id: `${toolSlug}-universal`,
        name: `Universal ${toolData.name}`,
        price: 79.99,
        image: `/images/products/${toolSlug}-universal.jpg`,
        description: `Versatile ${toolData.name.toLowerCase()} for multiple device types`,
        category: toolData.category,
        stock: 45,
        rating: 4.4,
        reviews: 76
      }
    ];

    return baseProducts;
  };

  useEffect(() => {
    if (tool) {
      const toolProducts = getToolProducts(tool);
      setProducts(toolProducts);
      setLoading(false);
    }
  }, [tool]);

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
      <Layout title={`${toolData.name} - Nexus Tech Hub`} description={`Professional ${toolData.name} for OEM service`}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <h3>Loading {toolData.name}...</h3>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${toolData.name} - OEM Service Tools | Nexus Tech Hub`}
      description={`Professional ${toolData.name} for OEM service and repair work. High-quality tools for technicians.`}
    >
      <div className={styles.categoryPage}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span className={styles.separator}>/</span>
          <Link href="/products">Products</Link>
          <span className={styles.separator}>/</span>
          <Link href="/products/repair-tools">Repair Tools</Link>
          <span className={styles.separator}>/</span>
          <Link href="/products/repair-tools/oem-tools">OEM Tools</Link>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>{toolData.name}</span>
        </div>

        {/* Category Header */}
        <div className={styles.categoryHeader}>
          <div className={styles.categoryInfo}>
            <h1>{toolData.name}</h1>
            <p className={styles.categoryDescription}>{toolData.description}</p>
            <div className={styles.brandDetails}>
              <div className={styles.detailItem}>
                <strong>Category:</strong> {toolData.category}
              </div>
            </div>
          </div>
          <div className={styles.categoryImage}>
            <img
              src={`/images/tools/${tool}-icon.png`}
              alt={toolData.name}
              onError={(e) => {
                e.target.src = '/images/products/placeholder.svg';
              }}
            />
          </div>
        </div>

        {/* Features */}
        <div className={styles.popularSection}>
          <h2>Key Features</h2>
          <div className={styles.popularList}>
            {toolData.features.map((feature, index) => (
              <div key={index} className={styles.popularItem}>
                ✓ {feature}
              </div>
            ))}
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
              </div>

              <div className={styles.productInfo}>
                <h3 className={styles.productName}>
                  <Link href={`/products/${product.id}`}>{product.name}</Link>
                </h3>
                <p className={styles.productDescription}>{product.description}</p>
                <div className={styles.productCategory}>{product.category}</div>

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

        {/* Tool Info */}
        <div className={styles.brandInfo}>
          <h2>About {toolData.name}</h2>
          <p>{toolData.description}</p>
          <p>Professional OEM service tools designed for authorized service centers and experienced technicians. These tools meet industry standards for device repair and maintenance.</p>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  // Generate paths for OEM service tools
  const tools = [
    'disassembly-tools',
    'repair-fixtures',
    'clamps-holders',
    'pliers-cutters',
    'cleaning-supplies'
  ];

  const paths = tools.map(tool => ({
    params: { tool }
  }));

  return {
    paths,
    fallback: 'blocking' // Generate pages on-demand for new tools
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {},
    revalidate: 3600 // Regenerate every hour
  };
}
