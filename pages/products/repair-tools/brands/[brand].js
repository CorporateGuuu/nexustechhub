import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../../../components/Layout';
import { useCart } from '../../../../contexts/CartContext';
import styles from '../../../../styles/CategoryPage.module.css';

export default function RepairToolBrand() {
  const router = useRouter();
  const { brand } = router.query;
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for different repair tool brands
  const getBrandData = (brandSlug) => {
    const brandMap = {
      'ifixit': {
        name: 'iFixit',
        description: 'Professional repair tools and parts for DIY electronics repair',
        founded: '2003',
        specialty: 'Precision repair tools, replacement parts',
        popularProducts: ['Pro Tech Toolkit', 'Mako Driver Kit', 'Precision Bit Set']
      },
      'wiha': {
        name: 'Wiha',
        description: 'Premium hand tools and precision screwdrivers for professional use',
        founded: '1939',
        specialty: 'High-quality screwdrivers and precision tools',
        popularProducts: ['Precision Screwdriver Set', 'SoftFinish Handle Drivers', 'Hex Key Sets']
      },
      'wrepair': {
        name: 'Wrepair',
        description: 'Specialized repair tools for mobile device technicians',
        founded: '2018',
        specialty: 'Mobile repair fixtures and specialized tools',
        popularProducts: ['Screen Separation Machine', 'Battery Disassembly Tools', 'LCD Repair Kit']
      },
      'dotterpodx': {
        name: 'DotterpodX',
        description: 'Professional repair tools and fixtures for modern devices',
        founded: '2020',
        specialty: 'Device-specific repair fixtures and tools',
        popularProducts: ['Universal Fixture', 'Screen Press Kit', 'Adhesive Application Tools']
      },
      'qianli': {
        name: 'Qianli',
        description: 'Professional repair equipment and tools from China',
        founded: '2005',
        specialty: 'Repair machines and specialized equipment',
        popularProducts: ['Hot Air Station', 'Soldering Station', 'Ultrasonic Cleaner']
      }
    };

    return brandMap[brandSlug] || {
      name: brandSlug.charAt(0).toUpperCase() + brandSlug.slice(1),
      description: `Professional repair tools from ${brandSlug.charAt(0).toUpperCase() + brandSlug.slice(1)}`,
      founded: '2020',
      specialty: 'Repair tools and equipment',
      popularProducts: ['Tool Kit', 'Repair Equipment']
    };
  };

  const brandData = getBrandData(brand);

  // Mock products for the brand
  const getBrandProducts = (brandSlug) => {
    const baseProducts = [
      {
        id: `${brandSlug}-toolkit-pro`,
        name: `${brandData.name} Professional Toolkit`,
        price: 149.99,
        image: `/images/products/${brandSlug}-toolkit.jpg`,
        description: `Complete professional toolkit from ${brandData.name}`,
        category: 'Tool Kits',
        stock: 25,
        rating: 4.8,
        reviews: 156
      },
      {
        id: `${brandSlug}-precision-set`,
        name: `${brandData.name} Precision Tool Set`,
        price: 89.99,
        image: `/images/products/${brandSlug}-precision.jpg`,
        description: `Precision tools for detailed repair work from ${brandData.name}`,
        category: 'Precision Tools',
        stock: 40,
        rating: 4.6,
        reviews: 89
      },
      {
        id: `${brandSlug}-repair-kit`,
        name: `${brandData.name} Repair Kit`,
        price: 129.99,
        image: `/images/products/${brandSlug}-repair-kit.jpg`,
        description: `Comprehensive repair kit from ${brandData.name}`,
        category: 'Repair Kits',
        stock: 15,
        rating: 4.7,
        reviews: 203
      }
    ];

    return baseProducts;
  };

  useEffect(() => {
    if (brand) {
      const brandProducts = getBrandProducts(brand);
      setProducts(brandProducts);
      setLoading(false);
    }
  }, [brand]);

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
      <Layout title={`${brandData.name} Repair Tools - Nexus Tech Hub`} description={`Professional repair tools from ${brandData.name}`}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <h3>Loading {brandData.name} products...</h3>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${brandData.name} Repair Tools - Professional Equipment | Nexus Tech Hub`}
      description={`Shop ${brandData.name} professional repair tools and equipment. High-quality tools for technicians.`}
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
          <span className={styles.current}>{brandData.name}</span>
        </div>

        {/* Brand Header */}
        <div className={styles.categoryHeader}>
          <div className={styles.categoryInfo}>
            <h1>{brandData.name} Repair Tools</h1>
            <p className={styles.categoryDescription}>{brandData.description}</p>
            <div className={styles.brandDetails}>
              <div className={styles.detailItem}>
                <strong>Founded:</strong> {brandData.founded}
              </div>
              <div className={styles.detailItem}>
                <strong>Specialty:</strong> {brandData.specialty}
              </div>
            </div>
          </div>
          <div className={styles.categoryImage}>
            <img
              src={`/images/brands/${brand}-logo.png`}
              alt={brandData.name}
              onError={(e) => {
                e.target.src = '/images/products/placeholder.svg';
              }}
            />
          </div>
        </div>

        {/* Popular Products */}
        <div className={styles.popularSection}>
          <h2>Popular Products</h2>
          <div className={styles.popularList}>
            {brandData.popularProducts.map((product, index) => (
              <div key={index} className={styles.popularItem}>
                {product}
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

        {/* Brand Info */}
        <div className={styles.brandInfo}>
          <h2>About {brandData.name}</h2>
          <p>{brandData.description}</p>
          <p>Founded in {brandData.founded}, {brandData.name} specializes in {brandData.specialty.toLowerCase()} for professional technicians and DIY enthusiasts.</p>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  // Generate paths for popular repair tool brands
  const brands = [
    'ifixit',
    'wiha',
    'wrepair',
    'dotterpodx',
    'qianli'
  ];

  const paths = brands.map(brand => ({
    params: { brand }
  }));

  return {
    paths,
    fallback: 'blocking' // Generate pages on-demand for new brands
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {},
    revalidate: 3600 // Regenerate every hour
  };
}
