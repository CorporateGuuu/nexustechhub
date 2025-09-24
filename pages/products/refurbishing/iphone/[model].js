import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../../../components/Layout';
import { useCart } from '../../../../contexts/CartContext';
import styles from '../../../../styles/CategoryPage.module.css';

export default function RefurbishedIPhone() {
  const router = useRouter();
  const { model } = router.query;
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for different iPhone models
  const getModelData = (modelSlug) => {
    const modelMap = {
      'iphone-15-pro-max': {
        name: 'iPhone 15 Pro Max',
        displayName: 'iPhone 15 Pro Max Refurbished',
        category: 'iPhone Pro Max Series',
        releaseYear: '2023',
        display: '6.7" Super Retina XDR',
        processor: 'A17 Pro',
        storage: ['128GB', '256GB', '512GB', '1TB'],
        colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium']
      },
      'iphone-15-pro': {
        name: 'iPhone 15 Pro',
        displayName: 'iPhone 15 Pro Refurbished',
        category: 'iPhone Pro Series',
        releaseYear: '2023',
        display: '6.1" Super Retina XDR',
        processor: 'A17 Pro',
        storage: ['128GB', '256GB', '512GB', '1TB'],
        colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium']
      },
      'iphone-15-plus': {
        name: 'iPhone 15 Plus',
        displayName: 'iPhone 15 Plus Refurbished',
        category: 'iPhone Plus Series',
        releaseYear: '2023',
        display: '6.7" Super Retina XDR',
        processor: 'A16 Bionic',
        storage: ['128GB', '256GB', '512GB'],
        colors: ['Pink', 'Yellow', 'Green', 'Blue', 'Black']
      },
      'iphone-15': {
        name: 'iPhone 15',
        displayName: 'iPhone 15 Refurbished',
        category: 'iPhone Standard Series',
        releaseYear: '2023',
        display: '6.1" Super Retina XDR',
        processor: 'A16 Bionic',
        storage: ['128GB', '256GB', '512GB'],
        colors: ['Pink', 'Yellow', 'Green', 'Blue', 'Black']
      },
      'iphone-14-pro-max': {
        name: 'iPhone 14 Pro Max',
        displayName: 'iPhone 14 Pro Max Refurbished',
        category: 'iPhone Pro Max Series',
        releaseYear: '2022',
        display: '6.7" Super Retina XDR',
        processor: 'A16 Bionic',
        storage: ['128GB', '256GB', '512GB', '1TB'],
        colors: ['Deep Purple', 'Gold', 'Silver', 'Space Black']
      }
    };

    return modelMap[modelSlug] || {
      name: modelSlug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      displayName: `${modelSlug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Refurbished`,
      category: 'iPhone Series',
      releaseYear: '2023',
      colors: ['Black', 'White']
    };
  };

  const modelData = getModelData(model);

  // Mock products for the refurbished model
  const getRefurbishedProducts = (modelSlug) => {
    const baseProducts = [
      {
        id: `${modelSlug}-refurbished-a`,
        name: `${modelData.name} Refurbished (Grade A)`,
        price: modelSlug.includes('pro-max') ? 899.99 :
               modelSlug.includes('pro') ? 799.99 :
               modelSlug.includes('plus') ? 699.99 : 599.99,
        image: `/images/refurbished/${modelSlug}-grade-a.jpg`,
        description: `Grade A refurbished ${modelData.name} - Like new condition with full warranty`,
        grade: 'Grade A',
        warranty: '1 Year',
        stock: 15,
        rating: 4.8,
        reviews: 234
      },
      {
        id: `${modelSlug}-refurbished-b`,
        name: `${modelData.name} Refurbished (Grade B)`,
        price: modelSlug.includes('pro-max') ? 799.99 :
               modelSlug.includes('pro') ? 699.99 :
               modelSlug.includes('plus') ? 599.99 : 499.99,
        image: `/images/refurbished/${modelSlug}-grade-b.jpg`,
        description: `Grade B refurbished ${modelData.name} - Excellent condition with minor wear`,
        grade: 'Grade B',
        warranty: '6 Months',
        stock: 25,
        rating: 4.5,
        reviews: 156
      },
      {
        id: `${modelSlug}-refurbished-c`,
        name: `${modelData.name} Refurbished (Grade C)`,
        price: modelSlug.includes('pro-max') ? 699.99 :
               modelSlug.includes('pro') ? 599.99 :
               modelSlug.includes('plus') ? 499.99 : 399.99,
        image: `/images/refurbished/${modelSlug}-grade-c.jpg`,
        description: `Grade C refurbished ${modelData.name} - Good condition with visible wear`,
        grade: 'Grade C',
        warranty: '3 Months',
        stock: 35,
        rating: 4.2,
        reviews: 89
      }
    ];

    return baseProducts;
  };

  useEffect(() => {
    if (model) {
      const refurbishedProducts = getRefurbishedProducts(model);
      setProducts(refurbishedProducts);
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
      <Layout title={`${modelData.displayName} - Nexus Tech Hub`} description={`Refurbished ${modelData.name} for sale`}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <h3>Loading {modelData.displayName}...</h3>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${modelData.displayName} - Certified Refurbished | Nexus Tech Hub`}
      description={`Buy certified refurbished ${modelData.name} with warranty. Grade A, B, and C options available.`}
    >
      <div className={styles.categoryPage}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span className={styles.separator}>/</span>
          <Link href="/products">Products</Link>
          <span className={styles.separator}>/</span>
          <Link href="/products/refurbishing">Refurbishing</Link>
          <span className={styles.separator}>/</span>
          <Link href="/products/refurbishing/iphone">iPhone</Link>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>{modelData.name}</span>
        </div>

        {/* Model Header */}
        <div className={styles.categoryHeader}>
          <div className={styles.categoryInfo}>
            <h1>{modelData.displayName}</h1>
            <p className={styles.categoryDescription}>
              Certified refurbished {modelData.name} with full testing and warranty.
              Available in multiple grades to fit your budget and needs.
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
              src={`/images/iphone/${model}.jpg`}
              alt={modelData.displayName}
              onError={(e) => {
                e.target.src = '/images/products/placeholder.svg';
              }}
            />
          </div>
        </div>

        {/* Grade Information */}
        <div className={styles.popularSection}>
          <h2>Refurbished Grades</h2>
          <div className={styles.popularList}>
            <div className={styles.popularItem}>
              <strong>Grade A:</strong> Like new condition, minimal to no wear, full functionality
            </div>
            <div className={styles.popularItem}>
              <strong>Grade B:</strong> Excellent condition, minor wear, fully functional
            </div>
            <div className={styles.popularItem}>
              <strong>Grade C:</strong> Good condition, visible wear, fully functional
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
                  right: '10px',
                  background: product.grade === 'Grade A' ? '#28a745' :
                             product.grade === 'Grade B' ? '#ffc107' : '#dc3545',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  {product.grade}
                </div>
              </div>

              <div className={styles.productInfo}>
                <h3 className={styles.productName}>
                  <Link href={`/products/${product.id}`}>{product.name}</Link>
                </h3>
                <p className={styles.productDescription}>{product.description}</p>
                <div className={styles.productCategory}>
                  Warranty: {product.warranty}
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

        {/* Warranty Info */}
        <div className={styles.brandInfo}>
          <h2>Refurbished Warranty & Support</h2>
          <p>All our refurbished {modelData.name} devices come with comprehensive testing and certification. Each device is thoroughly inspected, cleaned, and restored to ensure optimal performance.</p>
          <p><strong>What's included:</strong> Full functionality testing, cosmetic inspection, cleaning, and warranty coverage based on the grade selected.</p>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  // Generate paths for popular refurbished iPhone models
  const models = [
    'iphone-15-pro-max',
    'iphone-15-pro',
    'iphone-15-plus',
    'iphone-15',
    'iphone-14-pro-max'
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
