'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { useCart } from '../../contexts/CartContext';
import styles from '../../styles/ProductDetail.module.css';

// Force dynamic rendering to avoid SSR issues with cart context
export const dynamic = 'force-dynamic';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { addToCart, isInCart, getItemCount } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Get product by ID from API
  const getProductById = async (productId) => {
    try {
      const response = await fetch(`/api/products/${productId}`);
      const data = await response.json();

      if (data.success && data.data) {
        const product = data.data;
        return {
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          discount_percentage: product.discount_percentage || 0,
          stock: product.stock,
          image: product.image,
          sku: product.sku,
          brand: product.brand,
          description: product.description,
          specifications: product.specifications || {},
          warranty: '30 Days',
          tags: []
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  };

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        setLoading(true);
        const foundProduct = await getProductById(id);
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError('Product not found');
        }
        setLoading(false);
      };
      fetchProduct();
    }
  }, [id]);

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const handleAddToCart = async () => {
    if (!product) return;

    setIsAddingToCart(true);
    try {
      await addToCart(product, quantity);
      // Success feedback could be added here
    } catch (error) {
      console.error('Failed to add to cart:', error);
      // Error handling could be added here
    } finally {
      setIsAddingToCart(false);
    }
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
                disabled={product.stock === 0 || isAddingToCart}
              >
                {product.stock === 0 ? 'Out of Stock' :
                 isAddingToCart ? 'Adding...' : 'Add to Cart'}
              </button>

              <div className={styles.purchaseInfo}>
                <span className={styles.warranty}>
                  ✓ {product.warranty || '30 Days'} Warranty
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
                {Object.entries(product.specifications || {}).map(([key, value]) => (
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
                <h4>{product.warranty || '30 Days'} Limited Warranty</h4>
                <p>
                  This product comes with a {(product.warranty || '30 Days').toLowerCase()} limited warranty
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
