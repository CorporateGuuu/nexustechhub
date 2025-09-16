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
      name: 'iPhone 15 Pro Max OLED Screen',
      price: 399.99,
      originalPrice: 449.99,
      image: '/images/products/iphone-15-pro-max-screen.jpg',
      category: 'iPhone Parts',
      badge: 'Best Seller'
    },
    {
      id: 'sg-s24-ultra-screen',
      name: 'Samsung Galaxy S24 Ultra Screen',
      price: 349.99,
      originalPrice: 399.99,
      image: '/images/products/samsung-s24-ultra-screen.jpg',
      category: 'Samsung Parts',
      badge: 'New Arrival'
    },
    {
      id: 'ipad-pro-12-9-screen',
      name: 'iPad Pro 12.9" Liquid Retina XDR',
      price: 499.99,
      originalPrice: 549.99,
      image: '/images/products/ipad-pro-12-9-screen.jpg',
      category: 'iPad Parts',
      badge: 'Premium'
    },
    {
      id: 'toolkit-pro',
      name: 'Professional Repair Toolkit',
      price: 199.99,
      originalPrice: 249.99,
      image: '/images/products/professional-toolkit.jpg',
      category: 'Repair Tools',
      badge: 'Complete Set'
    }
  ];

  const categories = [
    {
      name: 'iPhone Parts',
      description: 'Genuine Apple components',
      image: '/images/categories/iphone-parts.jpg',
      count: '20+ products',
      link: '/products/iphone-parts',
      color: '#007AFF'
    },
    {
      name: 'Samsung Parts',
      description: 'Galaxy series components',
      image: '/images/categories/samsung-parts.jpg',
      count: '25+ products',
      link: '/products/samsung-parts',
      color: '#00D4AA'
    },
    {
      name: 'iPad Parts',
      description: 'Professional tablet repairs',
      image: '/images/categories/ipad-parts.jpg',
      count: '15+ products',
      link: '/products/ipad-parts',
      color: '#5856D6'
    },
    {
      name: 'Repair Tools',
      description: 'Professional equipment',
      image: '/images/categories/repair-tools.jpg',
      count: '20+ products',
      link: '/products/repair-tools',
      color: '#FF9500'
    }
  ];

  const services = [
    {
      icon: '🚚',
      title: 'Fast Shipping',
      description: 'Free delivery on orders over AED 500. Express shipping available.'
    },
    {
      icon: '🛡️',
      title: '1 Year Warranty',
      description: 'All parts come with manufacturer warranty and quality guarantee.'
    },
    {
      icon: '⚡',
      title: '24/7 Support',
      description: 'Expert technical support available round the clock.'
    },
    {
      icon: '🔧',
      title: 'Expert Repairs',
      description: 'Professional repair services by certified technicians.'
    }
  ];

  const testimonials = [
    {
      name: 'Ahmed Al-Rashid',
      role: 'Phone Repair Shop Owner',
      content: 'Nexus Tech Hub has been our go-to supplier for iPhone and Samsung parts. Their quality is unmatched and delivery is always on time.',
      rating: 5,
      avatar: '/images/testimonials/avatar1.jpg'
    },
    {
      name: 'Sarah Johnson',
      role: 'DIY Repair Enthusiast',
      content: 'The repair tools from Nexus are professional grade and affordable. Perfect for both professionals and hobbyists.',
      rating: 5,
      avatar: '/images/testimonials/avatar2.jpg'
    },
    {
      name: 'Mohammed Al-Farsi',
      role: 'Electronics Store Manager',
      content: 'Outstanding customer service and product quality. They have everything we need for our repair business.',
      rating: 5,
      avatar: '/images/testimonials/avatar3.jpg'
    }
  ];

  return (
    <Layout
      title="Nexus Tech Hub - Professional Mobile Repair Parts UAE"
      description="Professional mobile device repair parts and services in UAE. Specializing in iPhone, Samsung, and iPad replacement parts with quality guarantee. Located in Ras Al Khaimah."
    >
      {/* Hero Section */}
      <Hero />

      {/* Featured Products Section */}
      <section className={styles.featuredSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Featured Products</h2>
            <p>Discover our most popular and high-quality repair parts</p>
          </div>

          <div className={styles.featuredGrid}>
            {featuredProducts.map((product) => (
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

      {/* Categories Section */}
      <section className={styles.categoriesSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Shop by Category</h2>
            <p>Find the perfect parts for your device repair needs</p>
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
                  <div className={styles.categoryOverlay}></div>
                </div>

                <div className={styles.categoryContent}>
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                  <span className={styles.categoryCount}>{category.count}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.servicesSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Why Choose Nexus Tech Hub?</h2>
            <p>Experience excellence in mobile device repair parts and services</p>
          </div>

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

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>5,000+</div>
              <div className={styles.statLabel}>Quality Products</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>10,000+</div>
              <div className={styles.statLabel}>Happy Customers</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>50+</div>
              <div className={styles.statLabel}>Countries Served</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>24/7</div>
              <div className={styles.statLabel}>Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonialsSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>What Our Customers Say</h2>
            <p>Trusted by repair professionals worldwide</p>
          </div>

          <div className={styles.testimonialsGrid}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className={styles.testimonialCard}>
                <div className={styles.testimonialRating}>
                  {'★'.repeat(testimonial.rating)}
                </div>

                <blockquote className={styles.testimonialContent}>
                  "{testimonial.content}"
                </blockquote>

                <div className={styles.testimonialAuthor}>
                  <div className={styles.authorAvatar}>
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      onError={(e) => e.target.src = '/images/testimonials/default-avatar.jpg'}
                    />
                  </div>
                  <div className={styles.authorInfo}>
                    <div className={styles.authorName}>{testimonial.name}</div>
                    <div className={styles.authorRole}>{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className={styles.newsletterSection}>
        <div className="container">
          <div className={styles.newsletterContent}>
            <div className={styles.newsletterText}>
              <h2>Stay Updated</h2>
              <p>Get the latest updates on new products, special offers, and repair tips.</p>
            </div>

            <form className={styles.newsletterForm}>
              <input
                type="email"
                placeholder="Enter your email address"
                className={styles.newsletterInput}
                required
              />
              <button type="submit" className={styles.newsletterBtn}>
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2>Ready to Start Repairing?</h2>
            <p>Browse our extensive collection of professional repair parts and tools.</p>
            <div className={styles.ctaButtons}>
              <Link href="/products" className={styles.ctaPrimary}>
                Shop Now
              </Link>
              <Link href="/contact" className={styles.ctaSecondary}>
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <WhatsAppButton />
    </Layout>
  );
}
