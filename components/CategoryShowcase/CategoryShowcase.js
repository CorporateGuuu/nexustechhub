import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './CategoryShowcase.module.css';

const CategoryShowcase = () => {
  const categories = [
    {
      id: 1,
      name: 'iPhone Parts',
      description: 'Premium quality iPhone replacement parts',
      image: '/images/categories/iphone-parts.jpg',
      href: '/products/iphone',
      itemCount: '500+',
      featured: true,
      gradient: 'linear-gradient(135deg, #20b2aa, #4fd1c7)'
    },
    {
      id: 2,
      name: 'Samsung Parts',
      description: 'Genuine Samsung device components',
      image: '/images/categories/samsung-parts.jpg',
      href: '/products/samsung',
      itemCount: '300+',
      featured: true,
      gradient: 'linear-gradient(135deg, #38a169, #68d391)'
    },
    {
      id: 3,
      name: 'LCD Screens',
      description: 'High-quality LCD and OLED displays',
      image: '/images/categories/lcd-screens.jpg',
      href: '/products/lcd-screens',
      itemCount: '200+',
      featured: false,
      gradient: 'linear-gradient(135deg, #20b2aa, #38a169)'
    },
    {
      id: 4,
      name: 'Batteries',
      description: 'Long-lasting replacement batteries',
      image: '/images/categories/batteries.jpg',
      href: '/products/batteries',
      itemCount: '150+',
      featured: false,
      gradient: 'linear-gradient(135deg, #4fd1c7, #68d391)'
    },
    {
      id: 5,
      name: 'Tools & Equipment',
      description: 'Professional repair tools and equipment',
      image: '/images/categories/tools.jpg',
      href: '/products/tools',
      itemCount: '100+',
      featured: false,
      gradient: 'linear-gradient(135deg, #38a169, #20b2aa)'
    },
    {
      id: 6,
      name: 'Accessories',
      description: 'Cases, chargers, and more accessories',
      image: '/images/categories/accessories.jpg',
      href: '/products/accessories',
      itemCount: '250+',
      featured: false,
      gradient: 'linear-gradient(135deg, #68d391, #4fd1c7)'
    }
  ];

  return (
    <section className={styles.categoryShowcase}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Shop by Category</h2>
          <p className={styles.subtitle}>
            Discover our comprehensive range of mobile device parts and accessories
          </p>
        </div>

        <div className={styles.categoriesGrid}>
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={category.href} 
              className={`${styles.categoryCard} ${category.featured ? styles.featured : ''}`}
            >
              <div className={styles.cardContent}>
                <div 
                  className={styles.cardBackground}
                  style={{ background: category.gradient }}
                >
                  <div className={styles.cardOverlay}></div>
                </div>
                
                <div className={styles.cardInfo}>
                  {category.featured && (
                    <span className={styles.featuredBadge}>Popular</span>
                  )}
                  
                  <h3 className={styles.categoryName}>{category.name}</h3>
                  <p className={styles.categoryDescription}>{category.description}</p>
                  
                  <div className={styles.categoryMeta}>
                    <span className={styles.itemCount}>{category.itemCount} items</span>
                    <div className={styles.arrow}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7,7 17,7 17,17"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.ctaSection}>
          <h3 className={styles.ctaTitle}>Can't find what you're looking for?</h3>
          <p className={styles.ctaDescription}>
            Contact our expert team for custom parts sourcing and bulk orders
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/contact" className={styles.primaryCta}>
              Contact Us
            </Link>
            <Link href="/products" className={styles.secondaryCta}>
              View All Products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
