import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../../../components/Layout';
import { useCart } from '../../../../contexts/CartContext';
import styles from '../../../../styles/CategoryPage.module.css';

export default function RepairToolEssentials() {
  const router = useRouter();
  const { tool } = router.query;
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for different essential repair tools
  const getToolData = (toolSlug) => {
    const toolMap = {
      'screwdrivers': {
        name: 'Screwdrivers',
        description: 'Professional precision screwdrivers for electronics repair',
        category: 'Hand Tools',
        features: ['Precision tips', 'Magnetic tips', 'Ergonomic handles', 'ESD safe']
      },
      'tweezers': {
        name: 'Tweezers',
        description: 'High-quality tweezers for precise component handling',
        category: 'Precision Tools',
        features: ['Anti-magnetic', 'ESD safe', 'Precision tips', 'Multiple styles']
      },
      'tool-kits': {
        name: 'Tool Kits',
        description: 'Complete tool kits for professional repair technicians',
        category: 'Tool Sets',
        features: ['Comprehensive set', 'Professional quality', 'Organized storage', 'All essential tools']
      },
      'adhesive-tapes': {
        name: 'Adhesive Tapes',
        description: 'Specialized tapes for electronics repair and assembly',
        category: 'Adhesives',
        features: ['Heat resistant', 'Conductive options', 'Double-sided', 'Removable types']
      },
      'pry-tools': {
        name: 'Pry Tools',
        description: 'Professional prying tools for safe device disassembly',
        category: 'Opening Tools',
        features: ['Plastic and metal options', 'Various sizes', 'Non-marring', 'Leveraged design']
      }
    };

    return toolMap[toolSlug] || {
      name: toolSlug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      description: `Professional ${toolSlug.replace('-', ' ')} for repair work`,
      category: 'Repair Tools',
      features: ['Professional quality', 'Durable construction', 'Essential for repairs']
    };
  };

  const toolData = getToolData(tool);

  // Mock products for the tool category
  const getToolProducts = (toolSlug) => {
    const baseProducts = [
      {
        id: `${toolSlug}-pro-set`,
        name: `Professional ${toolData.name} Set`,
        price: toolSlug.includes('tool-kits') ? 199.99 : 79.99,
        image: `/images/products/${toolSlug}-set.jpg`,
        description: `Complete professional ${toolData.name.toLowerCase()} set for technicians`,
        category: toolData.category,
        stock: 30,
        rating: 4.7,
        reviews: 145
      },
      {
        id: `${toolSlug}-precision`,
        name: `Precision ${toolData.name}`,
        price: 49.99,
        image: `/images/products/${toolSlug}-precision.jpg`,
        description: `High-precision ${toolData.name.toLowerCase()} for detailed work`,
        category: toolData.category,
        stock: 50,
        rating: 4.5,
        reviews: 98
      },
      {
        id: `${toolSlug}-starter-kit`,
        name: `${toolData.name} Starter Kit`,
        price: 29.99,
        image: `/images/products/${toolSlug}-starter.jpg`,
        description: `Essential ${toolData.name.toLowerCase()} for beginners and professionals`,
        category: toolData.category,
        stock: 75,
        rating: 4.3,
        reviews: 67
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
      <Layout title={`${toolData.name} - Nexus Tech Hub`} description={`Professional ${toolData.name} for repair work`}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <h3>Loading {toolData.name}...</h3>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${toolData.name} - Professional Repair Tools | Nexus Tech Hub`}
      description={`Shop professional ${toolData.name} for electronics repair. High-quality tools for technicians.`}
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
          <Link href="/products/repair-tools/essentials">Essentials</Link>
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
          <p>Essential tools for any professional repair technician. These {toolData.name.toLowerCase()} are designed for precision work and durability.</p>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  // Generate paths for essential repair tools
  const tools = [
    'screwdrivers',
    'tweezers',
    'tool-kits',
    'adhesive-tapes',
    'pry-tools'
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
