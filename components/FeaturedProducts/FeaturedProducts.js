import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import EnhancedProductCard from '../ProductCard/EnhancedProductCard';
import styles from './FeaturedProducts.module.css';

const FeaturedProducts = ({ products }) => {
  return (
    <section className={styles.featuredProducts}>
      <h2 className={styles.title}>Featured Products</h2>
      <p className={styles.subtitle}>
        Discover our most popular repair parts and tools, trusted by professionals worldwide.
      </p>

      <div className={styles.products}>
        {products.map(product => (
          <EnhancedProductCard
            key={product.id}
            product={{
              ...product,
              image: product.imageUrl || '/images/placeholder.png',
              inStock: product.inStock !== false,
              isNew: product.badge === 'New',
              isFeatured: true,
              rating: product.rating || 4.5,
              reviewCount: product.reviewCount || Math.floor(Math.random() * 100) + 10
            }}
            showQuickView={true}
            showWishlist={true}
          />
        ))}
      </div>

      <Link href="/products" className={styles.viewAll}>
        View All Products
      </Link>
    </section>
  );
};

export default FeaturedProducts;
