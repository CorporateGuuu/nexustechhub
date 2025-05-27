import React from 'react';
import styles from './CategoryHero.module.css';

export default function CategoryHero({ categoryInfo }) {
  const { title, description, heroImage, totalProducts, models } = categoryInfo;

  return (
    <section className={styles.categoryHero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.description}>{description}</p>
            
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>{totalProducts}+</span>
                <span className={styles.statLabel}>Products Available</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>24/7</span>
                <span className={styles.statLabel}>Support</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>UAE</span>
                <span className={styles.statLabel}>Fast Delivery</span>
              </div>
            </div>

            {models && (
              <div className={styles.models}>
                <h3 className={styles.modelsTitle}>Compatible Models:</h3>
                <div className={styles.modelsList}>
                  {models.map((model, index) => (
                    <span key={index} className={styles.modelTag}>
                      {model}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.actions}>
              <button className={styles.btnPrimary}>
                Browse All Parts
              </button>
              <button className={styles.btnSecondary}>
                Request Quote
              </button>
            </div>
          </div>

          <div className={styles.imageContent}>
            <img 
              src={heroImage || '/images/categories/default-category.svg'} 
              alt={`${title} - Professional repair parts`}
              className={styles.heroImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
