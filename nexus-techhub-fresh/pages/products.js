import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout/Layout';
import styles from '../styles/ProductGrid.module.css';

export default function Products() {
  const categories = [
    {
      name: 'Apple',
      slug: 'apple',
      description: 'iPhone, iPad, Mac, and Apple Watch parts',
      image: '/images/categories/apple-parts.jpg',
      count: '150+ products',
      color: 'from-red-500 to-pink-500',
      icon: '🍎'
    },
    {
      name: 'Samsung',
      slug: 'samsung',
      description: 'Galaxy S, Note, A, and Tab series parts',
      image: '/images/categories/samsung-parts.jpg',
      count: '120+ products',
      color: 'from-blue-500 to-cyan-500',
      icon: '📱'
    },
    {
      name: 'Google',
      slug: 'google',
      description: 'Pixel and Chromebook parts',
      image: '/images/categories/google-parts.jpg',
      count: '45+ products',
      color: 'from-green-500 to-emerald-500',
      icon: '🤖'
    },
    {
      name: 'Motorola',
      slug: 'motorola',
      description: 'Moto G, Edge, and Razr series parts',
      image: '/images/categories/motorola-parts.jpg',
      count: '60+ products',
      color: 'from-purple-500 to-violet-500',
      icon: '📞'
    },
    {
      name: 'Accessories',
      slug: 'accessories',
      description: 'Cables, cases, and essential accessories',
      image: '/images/categories/accessories.jpg',
      count: '200+ products',
      color: 'from-yellow-500 to-orange-500',
      icon: '🔌'
    },
    {
      name: 'Tools & Supplies',
      slug: 'tools-supplies',
      description: 'Professional repair tools and supplies',
      image: '/images/categories/tools.jpg',
      count: '80+ products',
      color: 'from-gray-500 to-slate-500',
      icon: '🔧'
    },
    {
      name: 'Board Components',
      slug: 'board-components',
      description: 'Logic boards, batteries, and components',
      image: '/images/categories/components.jpg',
      count: '300+ products',
      color: 'from-indigo-500 to-blue-500',
      icon: '⚡'
    },
    {
      name: 'Refurbished Devices',
      slug: 'refurbishing',
      description: 'Quality refurbished devices at great prices',
      image: '/images/categories/refurbished.jpg',
      count: '75+ products',
      color: 'from-teal-500 to-cyan-500',
      icon: '♻️'
    },
    {
      name: 'Game Console',
      slug: 'game-console',
      description: 'PlayStation, Xbox, and Nintendo parts',
      image: '/images/categories/game-console.jpg',
      count: '40+ products',
      color: 'from-red-500 to-rose-500',
      icon: '🎮'
    },
    {
      name: 'Other Parts',
      slug: 'other-parts',
      description: 'Parts for Huawei, Xiaomi, TCL, and more',
      image: '/images/categories/other-parts.jpg',
      count: '90+ products',
      color: 'from-amber-500 to-yellow-500',
      icon: '📦'
    }
  ];

  return (
    <Layout title="Products" description="Browse our complete catalog of mobile device parts and repair tools">
      {/* Hero Section */}
      <section className="products-hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Our Products</h1>
            <p className="hero-subtitle">
              Discover high-quality parts and tools for professional device repairs
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">1000+</span>
                <span className="stat-label">Products</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Brands</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="products-section">
        <div className="container">
          <div className={styles.product_grid}>
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/products/${category.slug}`}
                className={styles.product_card}
              >
                <div className={`${styles.product_image} bg-gradient-to-br ${category.color}`}>
                  <div className="category-icon">
                    <span className="icon-emoji">{category.icon}</span>
                  </div>
                  <img
                    src={category.image}
                    alt={category.name}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="image-overlay"></div>
                </div>
                <div className={styles.product_info}>
                  <h3 className="category-name">{category.name}</h3>
                  <p className="category-description">{category.description}</p>
                  <div className="category-footer">
                    <span className={styles.product_count}>{category.count}</span>
                    <div className="explore-arrow">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7"></path>
                        <path d="M7 7h10v10"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Can't find what you're looking for?</h2>
            <p>Contact us for custom orders and special requests</p>
            <Link href="/contact" className="cta-button">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        .products-hero {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 4rem 0 6rem;
          position: relative;
          overflow: hidden;
        }

        .products-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
          opacity: 0.1;
        }

        .hero-content {
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .hero-subtitle {
          font-size: 1.25rem;
          font-weight: 400;
          margin-bottom: 3rem;
          opacity: 0.9;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin-top: 2rem;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-size: 2.5rem;
          font-weight: 800;
          line-height: 1;
        }

        .stat-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          opacity: 0.8;
          margin-top: 0.5rem;
        }

        .products-section {
          padding: 4rem 0;
          background: #f8fafc;
        }

        .category-icon {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 48px;
          height: 48px;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          z-index: 2;
        }

        .icon-emoji {
          font-size: 1.5rem;
        }

        .image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .product_card:hover .image-overlay {
          opacity: 1;
        }

        .category-name {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.5rem;
        }

        .category-description {
          color: #64748b;
          font-size: 0.875rem;
          line-height: 1.5;
          margin-bottom: 1rem;
          flex: 1;
        }

        .category-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .explore-arrow {
          width: 32px;
          height: 32px;
          background: #3b82f6;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          transition: all 0.3s ease;
          opacity: 0;
          transform: translateX(-10px);
        }

        .product_card:hover .explore-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        .cta-section {
          background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
          color: white;
          padding: 4rem 0;
          text-align: center;
        }

        .cta-content h2 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .cta-content p {
          font-size: 1.125rem;
          opacity: 0.9;
          margin-bottom: 2rem;
        }

        .cta-button {
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          color: white;
          padding: 1rem 2rem;
          border-radius: 12px;
          font-weight: 700;
          text-decoration: none;
          display: inline-block;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .cta-button:hover {
          background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }

          .hero-subtitle {
            font-size: 1rem;
          }

          .hero-stats {
            flex-direction: column;
            gap: 1.5rem;
          }

          .stat-number {
            font-size: 2rem;
          }

          .products-section {
            padding: 2rem 0;
          }

          .cta-content h2 {
            font-size: 2rem;
          }
        }
      `}</style>
    </Layout>
  );
}
