import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import styles from '../../styles/ProductGrid.module.css';

export default function IPhoneParts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products?category=iphone&limit=20');
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products || []);
      } else {
        // Fallback to sample data if API fails
        setProducts([
          {
            id: 1,
            name: 'iPhone 15 Pro Max Screen',
            price: 299.99,
            image: '/images/products/iphone-15-pro-max-screen.jpg',
            condition: 'New',
            warranty: '6 months'
          },
          {
            id: 2,
            name: 'iPhone 15 Pro Battery',
            price: 89.99,
            image: '/images/products/iphone-15-pro-battery.jpg',
            condition: 'New',
            warranty: '6 months'
          },
          {
            id: 3,
            name: 'iPhone 15 Charging Port',
            price: 49.99,
            image: '/images/products/iphone-15-charging-port.jpg',
            condition: 'New',
            warranty: '6 months'
          },
          {
            id: 4,
            name: 'iPhone 14 Pro Max Screen',
            price: 249.99,
            image: '/images/products/iphone-14-pro-max-screen.jpg',
            condition: 'New',
            warranty: '6 months'
          },
          {
            id: 5,
            name: 'iPhone 14 Battery',
            price: 79.99,
            image: '/images/products/iphone-14-battery.jpg',
            condition: 'New',
            warranty: '6 months'
          },
          {
            id: 6,
            name: 'iPhone 13 Pro Screen',
            price: 199.99,
            image: '/images/products/iphone-13-pro-screen.jpg',
            condition: 'New',
            warranty: '6 months'
          }
        ]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const iphoneCategories = [
    { name: 'Screens & LCDs', slug: 'screens', count: '50+ products', icon: '📱' },
    { name: 'Batteries', slug: 'batteries', count: '25+ products', icon: '🔋' },
    { name: 'Charging Ports', slug: 'charging-ports', count: '30+ products', icon: '🔌' },
    { name: 'Cameras', slug: 'cameras', count: '20+ products', icon: '📷' },
    { name: 'Home Buttons', slug: 'home-buttons', count: '15+ products', icon: '🏠' },
    { name: 'Speakers', slug: 'speakers', count: '12+ products', icon: '🔊' },
    { name: 'Vibration Motors', slug: 'vibration-motors', count: '10+ products', icon: '📳' },
    { name: 'Motherboards', slug: 'motherboards', count: '35+ products', icon: '⚡' }
  ];

  return (
    <Layout title="iPhone Parts" description="High-quality iPhone repair parts for all models. Screens, batteries, charging ports, and more.">
      {/* Hero Section */}
      <section className="category-hero">
        <div className="container">
          <div className="hero-content">
            <h1>iPhone Parts</h1>
            <p>Premium quality parts for iPhone repairs</p>
            <div className="hero-features">
              <div className="feature">
                <span className="feature-icon">✓</span>
                <span>All iPhone Models Supported</span>
              </div>
              <div className="feature">
                <span className="feature-icon">✓</span>
                <span>6-Month Warranty</span>
              </div>
              <div className="feature">
                <span className="feature-icon">✓</span>
                <span>Fast Shipping</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subcategories */}
      <section className="subcategories-section">
        <div className="container">
          <h2>iPhone Part Categories</h2>
          <div className="subcategories-grid">
            {iphoneCategories.map((category) => (
              <div key={category.slug} className="subcategory-card">
                <div className="subcategory-icon">
                  <span>{category.icon}</span>
                </div>
                <h3>{category.name}</h3>
                <p>{category.count}</p>
                <button className="subcategory-btn">
                  Browse {category.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="products-section">
        <div className="container">
          <h2>Featured iPhone Parts</h2>
          {loading ? (
            <div className="loading">
              <p>Loading products...</p>
            </div>
          ) : products.length > 0 ? (
            <div className={styles.product_grid}>
              {products.map((product) => (
                <div key={product.id} className={styles.product_card}>
                  <div className={styles.product_image}>
                    <img
                      src={product.image}
                      alt={product.name}
                      onError={(e) => {
                        e.target.src = '/images/products/placeholder.svg';
                      }}
                    />
                  </div>
                  <div className={styles.product_info}>
                    <h3 className={styles.product_name}>{product.name}</h3>
                    <div className={styles.product_meta}>
                      <span className={styles.product_condition}>{product.condition}</span>
                      <span className={styles.product_warranty}>{product.warranty}</span>
                    </div>
                    <div className={styles.product_price}>
                      ${product.price}
                    </div>
                    <button className={styles.add_to_cart_btn}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-products">
              <p>No products available at the moment. Please check back later.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Need Help Finding Parts?</h2>
            <p>Contact our experts for assistance with iPhone repairs</p>
            <div className="cta-buttons">
              <a href="/services/support" className="cta-button primary">
                Get Support
              </a>
              <a href="/services/custom-orders" className="cta-button secondary">
                Custom Order
              </a>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .category-hero {
          background: linear-gradient(135deg, #000000 0%, #333333 100%);
          color: white;
          padding: 4rem 0;
          text-align: center;
        }

        .hero-content h1 {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }

        .hero-content p {
          font-size: 1.25rem;
          opacity: 0.9;
          margin-bottom: 2rem;
        }

        .hero-features {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .feature {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 500;
        }

        .feature-icon {
          color: #10b981;
          font-weight: bold;
        }

        .subcategories-section {
          padding: 4rem 0;
          background: #f8fafc;
        }

        .subcategories-section h2 {
          text-align: center;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 2rem;
          color: #1e293b;
        }

        .subcategories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .subcategory-card {
          background: white;
          padding: 2rem;
          border-radius: 0.75rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          text-align: center;
          transition: transform 0.2s ease;
        }

        .subcategory-card:hover {
          transform: translateY(-2px);
        }

        .subcategory-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .subcategory-card h3 {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #1e293b;
        }

        .subcategory-card p {
          color: #64748b;
          margin-bottom: 1rem;
        }

        .subcategory-btn {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .subcategory-btn:hover {
          background: #2563eb;
        }

        .products-section {
          padding: 4rem 0;
        }

        .products-section h2 {
          text-align: center;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 2rem;
          color: #1e293b;
        }

        .loading, .no-products {
          text-align: center;
          padding: 3rem;
          color: #64748b;
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

        .cta-buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .cta-button {
          padding: 1rem 2rem;
          border-radius: 12px;
          font-weight: 700;
          text-decoration: none;
          display: inline-block;
          transition: all 0.3s ease;
        }

        .cta-button.primary {
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .cta-button.primary:hover {
          background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
        }

        .cta-button.secondary {
          background: transparent;
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .cta-button.secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.5);
        }

        @media (max-width: 768px) {
          .hero-content h1 {
            font-size: 2rem;
          }

          .hero-features {
            flex-direction: column;
            gap: 1rem;
          }

          .subcategories-grid {
            grid-template-columns: 1fr;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .cta-button {
            width: 100%;
            max-width: 300px;
          }
        }
      `}</style>
    </Layout>
  );
}
