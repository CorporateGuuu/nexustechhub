import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, A11y } from 'swiper/modules';
import styles from './FeaturedProducts.module.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const FeaturedProducts = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <section className={styles.featuredProducts}>
        <h2 className={styles.title}>Featured Products</h2>
        <p className={styles.subtitle}>
          Discover our most popular repair parts and tools, trusted by professionals worldwide.
        </p>
        <div className={styles.noProducts}>
          <p>No featured products available at the moment.</p>
          <Link href="/products" className={styles.viewAll}>
            Browse All Products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.featuredProducts}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Featured Products</h2>
          <p className={styles.subtitle}>
            Discover our most popular repair parts and tools, trusted by professionals worldwide.
          </p>
        </div>
        <Link href="/products" className={styles.viewAll}>
          View All Products
        </Link>
      </div>

      <div className={styles.carouselContainer}>
        <Swiper
          modules={[Autoplay, Navigation, Pagination, A11y]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={{
            nextEl: '.featured-products-next',
            prevEl: '.featured-products-prev',
          }}
          pagination={{
            el: '.featured-products-pagination',
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={products.length > 3}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 24,
            },
          }}
          className={styles.productsSwiper}
          a11y={{
            prevSlideMessage: 'Previous products',
            nextSlideMessage: 'Next products',
            firstSlideMessage: 'This is the first slide',
            lastSlideMessage: 'This is the last slide',
            paginationBulletMessage: 'Go to slide {{index}}',
          }}
        >
          {products.map(product => (
            <SwiperSlide key={product.id}>
              <div className={styles.product}>
                <div className={styles.imageContainer}>
                  <Image
                    src={product.imageUrl || '/images/placeholder.png'}
                    alt={product.name}
                    width={300}
                    height={200}
                    className={styles.image}
                    loading="lazy"
                  />
                  {product.badge && (
                    <div className={styles.badge}>{product.badge}</div>
                  )}
                </div>

                <div className={styles.content}>
                  <div className={styles.category}>{product.category}</div>
                  <h3 className={styles.name}>{product.name}</h3>
                  <div className={styles.price}>
                    <span className={styles.salePrice}>${product.price.toFixed(2)}</span>
                  </div>
                  <Link href={`/products/${product.id}`} className={styles.viewDetails}>
                    View Details
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button
          className={`${styles.navButton} ${styles.prevButton} featured-products-prev`}
          aria-label="Previous products"
        >
          ‹
        </button>
        <button
          className={`${styles.navButton} ${styles.nextButton} featured-products-next`}
          aria-label="Next products"
        >
          ›
        </button>

        {/* Custom Pagination */}
        <div className={`${styles.pagination} featured-products-pagination`}></div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
