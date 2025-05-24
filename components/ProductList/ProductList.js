import React from 'react';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import QuantitySelector from '../UI/QuantitySelector';
import EnhancedProductCard from '../ProductCard/EnhancedProductCard';
import styles from './ProductList.module.css';

const ProductList = ({ products, title = "Popular Products" }) => {
  // State to track quantities for each product
  const [quantities, setQuantities] = useState(
    products.reduce((acc, product) => {
      acc[product.id] = 1;
      return acc;
    }, {})
  );

  const handleQuantityChange = (productId, quantity) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: quantity
    }));
  };

  const handleAddToCart = async (productId) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: productId,
          quantity: quantities[productId],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add to cart');
      }

      // Show success message
      alert(`Successfully added ${quantities[productId]} of product ID ${productId} to cart`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart. Please try again.');
    }
  };

  return (
    <section className={styles.productList}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>
          Browse our selection of high-quality repair parts and tools
        </p>

        <div className={styles.categories}>
          <button className={`${styles.categoryButton} ${styles.active}`}>All</button>
          <button className={styles.categoryButton}>iPhone Parts</button>
          <button className={styles.categoryButton}>Samsung Parts</button>
          <button className={styles.categoryButton}>iPad Parts</button>
          <button className={styles.categoryButton}>Tools</button>
        </div>

        <div className={styles.products}>
          {products.map(product => (
            <EnhancedProductCard
              key={product.id}
              product={{
                ...product,
                image: product.imageUrl || '/images/placeholder.png',
                originalPrice: product.discount_percentage > 0
                  ? (product.price / (1 - product.discount_percentage / 100))
                  : null,
                inStock: product.inStock !== false,
                isNew: product.isNew || false,
                isFeatured: product.isFeatured || false,
                rating: product.rating || 4.0 + Math.random(),
                reviewCount: product.reviewCount || Math.floor(Math.random() * 50) + 5
              }}
              showQuickView={true}
              showWishlist={true}
            />
          ))}
        </div>

        <div className={styles.viewMore}>
          <Link href="/products" className={styles.viewMoreLink}>
            View More Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
