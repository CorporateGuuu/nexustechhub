'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../nexus-techhub-fresh/components/Layout/Layout';
import styles from '../../styles/ProductDetail.module.css';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Get product by ID from mock data
  const getProductById = (productId) => {
    const allProducts = [
      // iPhone Parts - Extended comprehensive list
      {
        id: 'ip15-pro-max-screen',
        name: 'iPhone 15 Pro Max Super Retina XDR OLED Display',
        category: 'iPhone Parts',
        price: 399.99,
        discount_percentage: 5,
        stock: 25,
        image: '/images/products/iphone-15-pro-max-screen.svg',
        sku: 'NTH-IP15PM-SCREEN-001',
        brand: 'Apple',
        description: 'Genuine Apple OLED display with ProMotion technology, 120Hz refresh rate, and Super Retina XDR resolution. Compatible with iPhone 15 Pro Max models.',
        specifications: {
          'Display Size': '6.7 inches',
          'Resolution': '2796 x 1290 pixels',
          'Technology': 'Super Retina XDR OLED',
          'Refresh Rate': '120Hz ProMotion',
          'Brightness': '2000 nits peak',
          'Compatibility': 'iPhone 15 Pro Max'
        },
        warranty: '1 Year',
        tags: ['screen', 'oled', 'pro', '15', 'pro max']
      },
      {
        id: 'ip15-pro-screen',
        name: 'iPhone 15 Pro OLED Screen Assembly',
        category: 'iPhone Parts',
        price: 349.99,
        discount_percentage: 0,
        stock: 35,
        image: '/images/products/iphone-15-pro-screen.jpg',
        sku: 'NTH-IP15P-SCREEN-001',
        brand: 'Apple',
        description: 'High-quality OLED replacement screen for iPhone 15 Pro with ProMotion technology and advanced color accuracy.',
        specifications: {
          'Display Size': '6.1 inches',
          'Resolution': '2556 x 1179 pixels',
          'Technology': 'Super Retina XDR OLED',
          'Refresh Rate': '120Hz ProMotion',
          'Brightness': '2000 nits peak',
          'Compatibility': 'iPhone 15 Pro'
        },
        warranty: '1 Year',
        tags: ['screen', 'oled', 'pro', '15']
      },
      {
        id: 'ip15-plus-screen',
        name: 'iPhone 15 Plus LCD Screen Assembly',
        category: 'iPhone Parts',
        price: 249.99,
        discount_percentage: 0,
        stock: 40,
        image: '/images/products/iphone-15-plus-screen.jpg',
        sku: 'NTH-IP15PLUS-SCREEN-001',
        brand: 'Apple',
        description: '6.7" Super Retina XDR LCD display for iPhone 15 Plus with excellent color reproduction and brightness.',
        specifications: {
          'Display Size': '6.7 inches',
          'Resolution': '2796 x 1290 pixels',
          'Technology': 'Super Retina XDR LCD',
          'Refresh Rate': '60Hz',
          'Brightness': '2000 nits peak',
          'Compatibility': 'iPhone 15 Plus'
        },
        warranty: '1 Year',
        tags: ['screen', 'lcd', 'plus', '15']
      },
      {
        id: 'ip15-battery',
        name: 'iPhone 15 Series Battery Replacement',
        category: 'iPhone Parts',
        price: 89.99,
        discount_percentage: 10,
        stock: 120,
        image: '/images/products/iphone-15-battery.jpg',
        sku: 'NTH-IP15-BAT-001',
        brand: 'Apple',
        description: 'Original capacity battery with 1-year warranty for all iPhone 15 models. Fast charging compatible.',
        specifications: {
          'Capacity': 'Original Apple capacity',
          'Compatibility': 'iPhone 15, 15 Plus, 15 Pro, 15 Pro Max',
          'Charging': 'USB-C Fast Charging',
          'Warranty': '1 Year',
          'Type': 'Lithium-ion'
        },
        warranty: '1 Year',
        tags: ['battery', '15', 'replacement']
      },
      // Add more products here... (I'll include a few key ones for demonstration)
      {
        id: 'sg-s24-ultra-screen',
        name: 'Samsung Galaxy S24 Ultra AMOLED Screen',
        category: 'Samsung Parts',
        price: 349.99,
        discount_percentage: 8,
        stock: 20,
        image: '/images/products/samsung-s24-ultra-screen.jpg',
        sku: 'NTH-SGS24U-SCREEN-001',
        brand: 'Samsung',
        description: '6.8" Dynamic AMOLED 2X display with S Pen support for Galaxy S24 Ultra.',
        specifications: {
          'Display Size': '6.8 inches',
          'Resolution': '3120 x 1440 pixels',
          'Technology': 'Dynamic AMOLED 2X',
          'Refresh Rate': '120Hz',
          'Brightness': '2600 nits peak',
          'Compatibility': 'Galaxy S24 Ultra'
        },
        warranty: '1 Year',
        tags: ['screen', 'amoled', 'ultra', 's24', 's pen']
      },
      {
        id: 'toolkit-pro-65pc',
        name: 'Professional iFixit Repair Toolkit - 65 Pieces',
        category: 'Repair Tools',
        price: 199.99,
        discount_percentage: 15,
        stock: 15,
        image: '/images/products/professional-toolkit.jpg',
        sku: 'NTH-TOOLKIT-PRO65-001',
        brand: 'iFixit',
        description: 'Complete professional toolkit for mobile device repairs with precision tools and accessories.',
        specifications: {
          'Pieces': '65 precision tools',
          'Includes': 'Screwdrivers, pry tools, suction cups',
          'Case': 'Professional carrying case',
          'Quality': 'iFixit Pro Grade',
          'Compatibility': 'All mobile devices'
        },
        warranty: '2 Years',
        tags: ['toolkit', 'professional', '65 pieces', 'complete']
      }
    ];

    return allProducts.find(product => product.id === productId);
  };

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        setError('Product not found');
      }
      setLoading(false);
    }
  }, [id]);

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const handleAddToCart = () => {
    // Add to cart functionality would go here
    alert(`Added ${quantity} ${product.name} to cart!`);
  };

  if (loading) {
    return (
      <Layout title="Loading..." description="Loading product...">
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <h3>Loading product...</h3>
        </div>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout title="Product Not Found" description="The requested product could not be found">
        <div className={styles.errorContainer}>
          <div className={styles.errorIcon}>⚠️</div>
          <h1>Product Not Found</h1>
          <p>The product you're looking for doesn't exist or has been removed.</p>
          <Link href="/products" className={styles.backButton}>
            Browse All Products
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${product.name} - Nexus Tech Hub`}
      description={product.description}
    >
      <div className={styles.productDetail}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span className={styles.separator}>/</span>
          <Link href="/products">Products</Link>
          <span className={styles.separator}>/</span>
          <Link href={`/products/${product.category.toLowerCase().replace(' ', '-')}`}>
            {product.category}
          </Link>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>{product.name}</span>
        </div>

        <div className={styles.productContainer}>
          {/* Product Images */}
          <div className={styles.productImages}>
            <div className={styles.mainImage}>
              <img
                src={product.image}
                alt={product.name}
                onError={(e) => {
                  e.target.src = '/images/products/placeholder.svg';
                }}
              />
            </div>
          </div>

          {/* Product Info */}
          <div className={styles.productInfo}>
            <div className={styles.productHeader}>
              <h1 className={styles.productTitle}>{product.name}</h1>
              <div className={styles.productMeta}>
                <span className={styles.sku}>SKU: {product.sku}</span>
                <span className={styles.brand}>Brand: {product.brand}</span>
              </div>
            </div>

            {/* Price */}
            <div className={styles.priceSection}>
              {product.discount_percentage > 0 ? (
                <>
                  <span className={styles.originalPrice}>
                    ${(product.price * (1 + product.discount_percentage / 100)).toFixed(2)}
                  </span>
                  <span className={styles.currentPrice}>
                    ${product.price}
                  </span>
                  <span className={styles.discountBadge}>
                    -{product.discount_percentage}%
                  </span>
                </>
              ) : (
                <span className={styles.currentPrice}>
                  ${product.price}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className={styles.stockStatus}>
              {product.stock > 10 ? (
                <span className={styles.inStock}>
                  ✓ In Stock ({product.stock} available)
                </span>
              ) : product.stock > 0 ? (
                <span className={styles.lowStock}>
                  ⚠ Only {product.stock} left in stock
                </span>
              ) : (
                <span className={styles.outOfStock}>
                  ✗ Out of Stock
                </span>
              )}
            </div>

            {/* Quantity Selector */}
            <div className={styles.quantitySection}>
              <label className={styles.quantityLabel}>Quantity:</label>
              <div className={styles.quantityControls}>
                <button
                  className={styles.quantityBtn}
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className={styles.quantityValue}>{quantity}</span>
                <button
                  className={styles.quantityBtn}
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className={styles.purchaseSection}>
              <button
                className={styles.addToCartBtn}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>

              <div className={styles.purchaseInfo}>
                <span className={styles.warranty}>
                  ✓ {product.warranty} Warranty
                </span>
                <span className={styles.shipping}>
                  ✓ Free Shipping
                </span>
              </div>
            </div>

            {/* Category */}
            <div className={styles.categoryBadge}>
              <span className={styles.categoryIcon}>
                {product.category === 'iPhone Parts' ? '📱' :
                 product.category === 'Samsung Parts' ? '📱' :
                 product.category === 'iPad Parts' ? '📱' :
                 product.category === 'Repair Tools' ? '🔧' : '📦'}
              </span>
              <span>{product.category}</span>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className={styles.productDetails}>
          <div className={styles.tabs}>
            <button className={`${styles.tab} ${styles.active}`}>
              Description
            </button>
            <button className={styles.tab}>
              Specifications
            </button>
            <button className={styles.tab}>
              Warranty
            </button>
          </div>

          <div className={styles.tabContent}>
            <div className={`${styles.tabPanel} ${styles.active}`}>
              <h3>Product Description</h3>
              <p className={styles.description}>{product.description}</p>

              <div className={styles.features}>
                <h4>Key Features:</h4>
                <ul>
                  <li>Premium quality replacement part</li>
                  <li>Compatible with specified models</li>
                  <li>Easy installation</li>
                  <li>Comprehensive warranty coverage</li>
                  <li>Professional grade components</li>
                </ul>
              </div>
            </div>

            <div className={styles.tabPanel}>
              <h3>Technical Specifications</h3>
              <div className={styles.specifications}>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className={styles.specRow}>
                    <span className={styles.specKey}>{key}:</span>
                    <span className={styles.specValue}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.tabPanel}>
              <h3>Warranty Information</h3>
              <div className={styles.warrantyInfo}>
                <h4>{product.warranty} Limited Warranty</h4>
                <p>
                  This product comes with a {product.warranty.toLowerCase()} limited warranty
                  covering manufacturing defects and functionality issues.
                </p>
                <ul>
                  <li>Covers manufacturing defects</li>
                  <li>Free repair or replacement</li>
                  <li>Professional technical support</li>
                  <li>Valid from date of purchase</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className={styles.relatedProducts}>
          <h2>Related Products</h2>
          <div className={styles.relatedGrid}>
            {/* Related products would be dynamically loaded here */}
            <div className={styles.relatedPlaceholder}>
              <p>Related products will be displayed here</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Enable static generation for better performance
export async function getStaticPaths() {
  // Generate paths for key products
  const paths = [
    { params: { id: 'ip15-pro-max-screen' } },
    { params: { id: 'ip15-pro-screen' } },
    { params: { id: 'ip15-plus-screen' } },
    { params: { id: 'ip15-battery' } },
    { params: { id: 'sg-s24-ultra-screen' } },
    { params: { id: 'toolkit-pro-65pc' } }
  ];

  return {
    paths,
    fallback: true // Enable fallback for dynamically generated pages
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {},
    revalidate: 60 // Regenerate page every 60 seconds
  };
}
