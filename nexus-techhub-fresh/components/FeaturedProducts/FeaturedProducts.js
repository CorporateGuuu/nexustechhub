import React from 'react';
import Link from 'next/link';
import styles from './FeaturedProducts.module.css';

const FeaturedProducts = () => {
  const featuredProducts = [
    {
      id: 1,
      name: 'iPhone 13 Pro OLED Screen',
      category: 'Replacement Parts',
      price: 129.99,
      image: '/images/products/iphone-13-screen.svg',
      badge: 'Best Seller',
      url: '/products/iphone-13-pro-screen'
    },
    {
      id: 2,
      name: 'Professional Repair Tool Kit',
      category: 'Tools',
      price: 89.99,
      image: '/images/products/repair-tool-kit.svg',
      badge: 'New',
      url: '/products/repair-tool-kit'
    },
    {
      id: 3,
      name: 'Samsung Galaxy S22 Battery',
      category: 'Batteries',
      price: 39.99,
      image: '/images/products/samsung-battery.svg',
      badge: '20% OFF',
      url: '/products/galaxy-s22-battery'
    },
    {
      id: 4,
      name: 'iPad Pro 12.9" LCD Assembly',
      category: 'Replacement Parts',
      price: 199.99,
      image: '/images/products/ipad-screen.svg',
      url: '/products/ipad-pro-lcd'
    }
  ];

  return (
    <section className={styles.featuredProducts}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Featured Products</h2>
          <p className={styles.subtitle}>
            Discover our most popular repair parts and tools, trusted by professionals worldwide.
          </p>
        </div>

        <div className={styles.products}>
          {featuredProducts.map((product) => (
            <div key={product.id} className={styles.product}>
              <div className={styles.imageContainer}>
                <img
                  src={product.image}
                  alt={product.name}
                  className={styles.image}
                />
                {product.badge && (
                  <div className={`${styles.badge} ${styles[product.badge.toLowerCase().replace(/\s+/g, '')]}`}>
                    {product.badge}
                  </div>
                )}
              </div>

              <div className={styles.content}>
                <div className={styles.category}>{product.category}</div>
                <h3 className={styles.name}>{product.name}</h3>
                <div className={styles.price}>
                  <span>${product.price}</span>
                </div>
                <Link href={product.url} className={styles.viewDetails}>
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.viewAllContainer}>
          <Link href="/products" className={styles.viewAll}>
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
