import React from 'react';
import Link from 'next/link';
import styles from './FeaturedProducts.module.css';

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: 'iPhone 13 Pro OLED Screen',
      category: 'iPhone Parts',
      price: 129.99,
      image: '/images/products/iphone-13-screen.jpg',
      badge: 'Best Seller',
      url: '/products/iphone-13-screen'
    },
    {
      id: 2,
      name: 'Professional Repair Tool Kit',
      category: 'Tools',
      price: 89.99,
      image: '/images/products/tool-kit.jpg',
      badge: 'New',
      url: '/products/tool-kit'
    },
    {
      id: 3,
      name: 'Samsung Galaxy S22 Battery',
      category: 'Samsung Parts',
      price: 39.99,
      image: '/images/products/galaxy-s22-battery.jpg',
      badge: '20% OFF',
      url: '/products/galaxy-s22-battery'
    },
    {
      id: 4,
      name: 'iPad Pro 12.9" LCD Assembly',
      category: 'iPad Parts',
      price: 199.99,
      image: '/images/products/ipad-pro-lcd.jpg',
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
          {products.map((product) => (
            <div key={product.id} className={styles.product}>
              <div className={styles.imageContainer}>
                <img 
                  src={product.image} 
                  alt={product.name}
                  className={styles.image}
                />
                {product.badge && (
                  <div className={styles.badge}>
                    {product.badge}
                  </div>
                )}
              </div>
              
              <div className={styles.content}>
                <div className={styles.category}>
                  {product.category}
                </div>
                <h3 className={styles.name}>
                  {product.name}
                </h3>
                <div className={styles.price}>
                  ${product.price}
                </div>
                <Link href={product.url} className={styles.viewButton}>
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
