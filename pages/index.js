import React from 'react';
import Link from 'next/link';
import Layout from '../nexus-techhub-fresh/components/Layout/Layout';
import Hero from '../nexus-techhub-fresh/components/Hero/Hero';
import WhatsAppButton from '../nexus-techhub-fresh/components/WhatsApp/WhatsAppButton';
import styles from '../styles/Home.module.css';

export default function Home() {
  const featuredProducts = [
    {
      id: 'ip15-pro-max-screen',
      name: 'iPhone 15 Pro Max OLED Screen - Aftermarket Pro',
      price: 89.99,
      originalPrice: 129.99,
      image: '/images/products/iphone-15-pro-max-screen.jpg',
      category: 'iPhone Parts',
      badge: 'Bulk Discount',
      gallery: [
        '/images/products/iphone-15-pro-max-screen.jpg',
        '/images/products/iphone-15-pro-screen.jpg',
        '/images/products/iphone-15-plus-screen.jpg'
      ]
    },
    {
      id: 'sg-s24-ultra-screen',
      name: 'Samsung Galaxy S24 Ultra Screen Assembly',
      price: 79.99,
      originalPrice: 109.99,
      image: '/images/products/samsung-s24-ultra-screen.jpg',
      category: 'Samsung Parts',
      badge: 'OEM Quality',
      gallery: [
        '/images/products/samsung-s24-ultra-screen.jpg',
        '/images/products/samsung-s24-plus-screen.jpg',
        '/images/products/samsung-s24-screen.jpg'
      ]
    },
    {
      id: 'ipad-pro-12-9-screen',
      name: 'iPad Pro 12.9" Liquid Retina XDR Display',
      price: 149.99,
      originalPrice: 199.99,
      image: '/images/products/ipad-pro-12-9-screen.jpg',
      category: 'iPad Parts',
      badge: 'Premium Grade',
      gallery: [
        '/images/products/ipad-pro-12-9-screen.jpg',
        '/images/products/ipad-pro-11-screen.jpg',
        '/images/products/ipad-air-5-screen.jpg'
      ]
    },
    {
      id: 'toolkit-pro',
      name: 'Professional Repair Toolkit - Complete Set',
      price: 149.99,
      originalPrice: 199.99,
      image: '/images/products/professional-toolkit.jpg',
      category: 'Repair Tools',
      badge: 'Essential Kit',
      gallery: [
        '/images/products/professional-toolkit.jpg',
        '/images/products/precision-screwdrivers.jpg',
        '/images/products/digital-multimeter.jpg'
      ]
    }
  ];

  const productShowcase = [
    {
      title: 'iPhone Parts Wholesale',
      description: 'Complete range of iPhone components from iPhone 5 to latest models',
      image: '/images/showcase/iphone-repair.jpg',
      features: ['OLED Screens', 'Batteries', 'Charging Ports', 'Cameras', 'Logic Boards'],
      link: '/products/iphone-parts'
    },
    {
      title: 'Samsung Galaxy Parts',
      description: 'High-quality Samsung parts for all Galaxy series devices',
      image: '/images/showcase/samsung-repair.jpg',
      features: ['AMOLED Screens', 'Batteries', 'USB-C Ports', 'S Pen', 'Motherboards'],
      link: '/products/samsung-parts'
    },
    {
      title: 'iPad & Tablet Components',
      description: 'Professional parts for tablets and iPads of all generations',
      image: '/images/showcase/ipad-repair.jpg',
      features: ['LCD Screens', 'Batteries', 'Home Buttons', 'Cameras', 'Digitizers'],
      link: '/products/ipad-parts'
    },
    {
      title: 'Repair Tools & Equipment',
      description: 'Professional-grade repair tools and workshop equipment',
      image: '/images/showcase/tools-workshop.jpg',
      features: ['Precision Tools', 'Heat Guns', 'Suction Cups', 'Microscopes', 'Soldering Stations'],
      link: '/products/repair-tools'
    }
  ];

  const categories = [
    {
      name: 'iPhone Parts',
      description: 'iPhone 5 to iPhone 16 series',
      image: '/images/categories/iphone-parts.jpg',
      count: '500+ products',
      link: '/products/iphone-parts',
      color: '#007AFF'
    },
    {
      name: 'Samsung Parts',
      description: 'Galaxy S, A, Note, Tab series',
      image: '/images/categories/samsung-parts.jpg',
      count: '600+ products',
      link: '/products/samsung-parts',
      color: '#00D4AA'
    },
    {
      name: 'iPad Parts',
      description: 'iPad, iPad Air, iPad Pro',
      image: '/images/categories/ipad-parts.jpg',
      count: '200+ products',
      link: '/products/ipad-parts',
      color: '#5856D6'
    },
    {
      name: 'Repair Tools',
      description: 'Professional equipment',
      image: '/images/categories/repair-tools.jpg',
      count: '150+ products',
      link: '/products/repair-tools',
      color: '#FF9500'
    }
  ];

  const services = [
    {
      icon: 'BO',
      title: 'Bulk Ordering',
      description: 'Competitive wholesale pricing with volume discounts available.'
    },
    {
      icon: 'QG',
      title: 'Quality Guarantee',
      description: 'All parts tested and guaranteed for compatibility and performance.'
    },
    {
      icon: 'FS',
      title: 'Fast Shipping',
      description: 'Express shipping worldwide with tracking and insurance.'
    },
    {
      icon: 'BS',
      title: 'B2B Support',
      description: 'Dedicated account management for business customers.'
    }
  ];



  return (
    <Layout
      title="Nexus Tech Hub - Professional Mobile Repair Parts UAE"
      description="Professional mobile device repair parts and services in UAE. Specializing in iPhone, Samsung, and iPad replacement parts with quality guarantee. Located in Ras Al Khaimah."
    >
      {/* Hero Section */}
      <Hero />

      {/* Categories Section */}
      <section className={styles.categoriesSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Shop by Category</h2>
            <p>Complete range of repair parts for all major brands</p>
          </div>

          <div className={styles.categoriesGrid}>
            {categories.map((category, index) => (
              <Link key={index} href={category.link} className={styles.categoryCard}>
                <div className={styles.categoryImage}>
                  <img
                    src={category.image}
                    alt={category.name}
                    onError={(e) => {
                      e.target.src = '/images/categories/placeholder.svg';
                      e.target.style.opacity = '0.7';
                    }}
                    loading="lazy"
                  />
                  <div className={styles.categoryOverlay}>
                    <span className={styles.categoryOverlayBtn}>Shop Now</span>
                  </div>
                </div>

                <div className={styles.categoryContent}>
                  <div className={styles.categoryHeader}>
                    <div className={styles.categoryIcon}>
                      {category.name === 'iPhone Parts' ? 'iP' :
                       category.name === 'Samsung Parts' ? 'SS' :
                       category.name === 'iPad Parts' ? 'iP' :
                       category.name === 'Repair Tools' ? 'RT' : 'PR'}
                    </div>
                    <div>
                      <h3>{category.name}</h3>
                    </div>
                  </div>
                  <p>{category.description}</p>
                  <div className={styles.categoryFooter}>
                    <span className={styles.categoryCount}>{category.count}</span>
                    <span className={styles.categoryArrow}>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className={styles.featuredSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Featured Products</h2>
            <p>Top-selling wholesale parts with competitive pricing</p>
          </div>

          <div className={styles.featuredGrid}>
            {featuredProducts.slice(0, 3).map((product) => (
              <div key={product.id} className={styles.productCard}>
                <div className={styles.productImage}>
                  <img
                    src={product.image}
                    alt={product.name}
                    onError={(e) => {
                      e.target.src = '/images/products/placeholder.svg';
                      e.target.style.opacity = '0.7';
                    }}
                    loading="lazy"
                  />
                  <div className={styles.productBadge}>{product.badge}</div>
                  <div className={styles.productOverlay}>
                    <Link href={`/products/${product.id}`} className={styles.viewProductBtn}>
                      View Product
                    </Link>
                  </div>
                </div>

                <div className={styles.productInfo}>
                  <div className={styles.productCategory}>{product.category}</div>
                  <h3 className={styles.productName}>
                    <Link href={`/products/${product.id}`}>{product.name}</Link>
                  </h3>

                  <div className={styles.productPrice}>
                    <span className={styles.currentPrice}>${product.price}</span>
                    {product.originalPrice && (
                      <span className={styles.originalPrice}>${product.originalPrice}</span>
                    )}
                  </div>

                  <button className={styles.addToCartBtn}>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.viewAllContainer}>
            <Link href="/products" className={styles.viewAllBtn}>
              View All Products
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Services Section */}
      <section className={styles.servicesSection}>
        <div className="container">
          <div className={styles.servicesGrid}>
            {services.map((service, index) => (
              <div key={index} className={styles.serviceCard}>
                <div className={styles.serviceIcon}>
                  <span>{service.icon}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2>Start Your Wholesale Order Today</h2>
            <div className={styles.ctaButtons}>
              <Link href="/products" className={styles.ctaPrimary}>
                Shop Now
              </Link>
              <Link href="/contact" className={styles.ctaSecondary}>
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      <WhatsAppButton />
    </Layout>
  );
}
