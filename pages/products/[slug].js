import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import WhatsAppButton from '../../components/WhatsAppButton';
import styles from '../../styles/ProductDetail.module.css';

// Mock function to get all products - in production, this would come from a database/API
const getAllProducts = () => {
  return [
    // iPhone Parts
    {
      id: 'ip15-screen-oled',
      name: 'iPhone 15 Pro OLED Screen Assembly',
      category: 'iPhone Parts',
      model: 'iPhone 15 Pro',
      price: 299.99,
      originalPrice: 349.99,
      inStock: true,
      image: '/images/products/placeholder.svg',
      description: 'High-quality OLED replacement screen for iPhone 15 Pro with advanced touch sensitivity and vibrant color reproduction.',
      specifications: ['OLED Display', 'Touch Digitizer Included', '6-Month Warranty', 'True Tone Compatible'],
      compatibility: ['iPhone 15 Pro'],
      sku: 'NTH-IP15P-SCREEN-001',
      installationDifficulty: 'Advanced',
      warranty: '6 Months',
      bulkPricing: [
        { quantity: '1-4', price: 299.99 },
        { quantity: '5-9', price: 279.99 },
        { quantity: '10+', price: 259.99 }
      ]
    },
    {
      id: 'ip14-battery',
      name: 'iPhone 14 Battery Replacement',
      category: 'iPhone Parts',
      model: 'iPhone 14',
      price: 89.99,
      originalPrice: null,
      inStock: true,
      image: '/images/products/placeholder.svg',
      description: 'Original capacity battery replacement for iPhone 14 with advanced battery management system.',
      specifications: ['3279mAh Capacity', 'Li-ion Technology', '1-Year Warranty', 'Battery Health Optimization'],
      compatibility: ['iPhone 14'],
      sku: 'NTH-IP14-BAT-001',
      installationDifficulty: 'Intermediate',
      warranty: '1 Year',
      bulkPricing: [
        { quantity: '1-4', price: 89.99 },
        { quantity: '5-9', price: 79.99 },
        { quantity: '10+', price: 69.99 }
      ]
    },
    // Samsung Parts
    {
      id: 'sg-s24-screen-oled',
      name: 'Samsung Galaxy S24 OLED Screen Assembly',
      category: 'Samsung Parts',
      model: 'Galaxy S24',
      price: 249.99,
      originalPrice: 279.99,
      inStock: true,
      image: '/images/products/placeholder.svg',
      description: 'High-quality OLED replacement screen for Samsung Galaxy S24 with Dynamic AMOLED technology.',
      specifications: ['OLED Display', 'Touch Digitizer Included', '6-Month Warranty', 'Always-On Display Compatible'],
      compatibility: ['Samsung Galaxy S24'],
      sku: 'NTH-SGS24-SCREEN-001',
      installationDifficulty: 'Advanced',
      warranty: '6 Months',
      bulkPricing: [
        { quantity: '1-4', price: 249.99 },
        { quantity: '5-9', price: 229.99 },
        { quantity: '10+', price: 209.99 }
      ]
    },
    // Repair Tools
    {
      id: 'toolkit-pro-50pc',
      name: 'Professional Repair Tool Kit - 50 Pieces',
      category: 'Repair Tools',
      model: 'Universal',
      price: 149.99,
      originalPrice: 179.99,
      inStock: true,
      image: '/images/products/placeholder.svg',
      description: 'Complete professional repair tool kit for mobile device technicians with premium quality tools.',
      specifications: ['50+ Precision Tools', 'Anti-Static Mat Included', 'Carrying Case', 'Lifetime Tool Warranty'],
      compatibility: ['iPhone', 'Samsung', 'iPad', 'Universal'],
      sku: 'NTH-TOOLS-PRO50-001',
      installationDifficulty: 'Beginner',
      warranty: 'Lifetime on Tools',
      bulkPricing: [
        { quantity: '1-4', price: 149.99 },
        { quantity: '5-9', price: 139.99 },
        { quantity: '10+', price: 129.99 }
      ]
    }
  ];
};

// Mock function to get product by slug
const getProductBySlug = (slug) => {
  const products = getAllProducts();
  return products.find(product => product.id === slug);
};

export default function ProductDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (router.isReady && slug) {
      const foundProduct = getProductBySlug(slug);
      setProduct(foundProduct);
      setLoading(false);
    }
  }, [router.isReady, slug]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED'
    }).format(price);
  };

  const getCurrentPrice = () => {
    if (!product || quantity < 10) return product?.price;

    const bulkTier = product.bulkPricing.find(tier => {
      const [min, max] = tier.quantity.split('-').map(q => q.replace('+', ''));
      if (tier.quantity.includes('+')) {
        return quantity >= parseInt(min);
      }
      return quantity >= parseInt(min) && quantity <= parseInt(max);
    });

    return bulkTier ? bulkTier.price : product.price;
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className={styles.loading}>
          <div className="loading-spinner"></div>
          <p>Loading product details...</p>
        </div>
        <Footer />
        <WhatsAppButton />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <div className={styles.notFound}>
          <h1>Product Not Found</h1>
          <p>The product you're looking for doesn't exist.</p>
          <Link href="/search" className={styles.backButton}>
            Browse All Products
          </Link>
        </div>
        <Footer />
        <WhatsAppButton />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{product.name} | Nexus TechHub</title>
        <meta name="description" content={product.description} />
        <meta name="keywords" content={`${product.name}, ${product.category}, ${product.model}, repair parts, UAE`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`https://nexustechhub.ae/products/${product.id}`} />
      </Head>

      <Header />

      <main className={styles.productDetail}>
        <div className={styles.container}>
          {/* Breadcrumb */}
          <nav className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href={`/${product.category.toLowerCase().replace(' ', '-')}`}>
              {product.category}
            </Link>
            <span>/</span>
            <span>{product.name}</span>
          </nav>

          <div className={styles.productContent}>
            <div className={styles.productImage}>
              <img
                src={product.image}
                alt={product.name}
                className={styles.mainImage}
              />
              {product.originalPrice && (
                <span className={styles.saleTag}>Sale</span>
              )}
              {!product.inStock && (
                <span className={styles.outOfStockTag}>Out of Stock</span>
              )}
            </div>

            <div className={styles.productInfo}>
              <h1 className={styles.productName}>{product.name}</h1>
              <p className={styles.productModel}>{product.model}</p>
              <p className={styles.productSku}>SKU: {product.sku}</p>

              <div className={styles.priceSection}>
                <div className={styles.currentPrice}>
                  {formatPrice(getCurrentPrice())}
                </div>
                {product.originalPrice && (
                  <div className={styles.originalPrice}>
                    {formatPrice(product.originalPrice)}
                  </div>
                )}
              </div>

              <div className={styles.stockStatus}>
                {product.inStock ? (
                  <span className={styles.inStock}>✓ In Stock</span>
                ) : (
                  <span className={styles.outOfStock}>⚠ Out of Stock</span>
                )}
              </div>

              <div className={styles.description}>
                <p>{product.description}</p>
              </div>

              <div className={styles.specifications}>
                <h3>Specifications:</h3>
                <ul>
                  {product.specifications.map((spec, index) => (
                    <li key={index}>{spec}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.compatibility}>
                <h3>Compatibility:</h3>
                <div className={styles.compatibilityList}>
                  {product.compatibility.map((device, index) => (
                    <span key={index} className={styles.compatibilityTag}>
                      {device}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.quantitySection}>
                <label>Quantity:</label>
                <div className={styles.quantityControls}>
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    min="1"
                  />
                  <button onClick={() => handleQuantityChange(quantity + 1)}>
                    +
                  </button>
                </div>
              </div>

              {quantity >= 10 && (
                <div className={styles.bulkPricing}>
                  <h3>Bulk Pricing:</h3>
                  <div className={styles.pricingTiers}>
                    {product.bulkPricing.map((tier, index) => (
                      <div key={index} className={styles.pricingTier}>
                        <span className={styles.tierQuantity}>{tier.quantity}</span>
                        <span className={styles.tierPrice}>{formatPrice(tier.price)} each</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className={styles.actions}>
                <button
                  className={styles.quoteButton}
                  disabled={!product.inStock}
                >
                  Request Quote
                </button>
                <button className={styles.contactButton}>
                  Contact Sales
                </button>
              </div>

              <div className={styles.productFeatures}>
                <div className={styles.feature}>
                  <span>🚚 Fast UAE Delivery</span>
                </div>
                <div className={styles.feature}>
                  <span>🛡️ {product.warranty} Warranty</span>
                </div>
                <div className={styles.feature}>
                  <span>📞 24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
