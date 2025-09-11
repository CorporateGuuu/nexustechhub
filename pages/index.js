import SEOHead from '../components/SEOHead';
import UnifiedHeader from '../components/UnifiedHeader/UnifiedHeader';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts/FeaturedProducts';
import WhatsAppButton from '../components/WhatsAppButton';
import Footer from '../components/Footer';
import QuickInquiry from '../components/QuickInquiry';
import Testimonials from '../components/Testimonials';
import Link from 'next/link';
import MediaGallery from '../components/MediaGallery/MediaGallery';
import { getProducts } from '../lib/db';
import styles from '../styles/Home.module.css';

export default function Home() {
  // Sample product data - replace with actual data from API
  const featuredProducts = [
    {
      id: 1,
      name: 'iPhone 15 Pro Screen',
      category: 'iPhone Parts',
      price: 299.99,
      imageUrl: '/images/products/iphone-15-screen.jpg',
      badge: 'New'
    },
    {
      id: 2,
      name: 'Samsung S24 Battery',
      category: 'Samsung Parts',
      price: 49.99,
      imageUrl: '/images/products/samsung-s24-battery.jpg',
      badge: 'Best Seller'
    },
    {
      id: 3,
      name: 'iPad Pro 12.9" Screen',
      category: 'iPad Parts',
      price: 399.99,
      imageUrl: '/images/products/ipad-pro-screen.jpg'
    },
    {
      id: 4,
      name: 'Professional Repair Kit',
      category: 'Tools',
      price: 149.99,
      imageUrl: '/images/products/repair-kit.jpg',
      badge: 'Popular'
    }
  ];

  const newProducts = [
    {
      id: 5,
      name: 'iPhone 15 Pro Max Screen',
      category: 'iPhone Parts',
      price: 349.99,
      imageUrl: '/images/products/iphone-15-pro-max-screen.jpg',
      badge: 'New Arrival'
    },
    {
      id: 6,
      name: 'Samsung Z Fold 5 Hinge',
      category: 'Samsung Parts',
      price: 89.99,
      imageUrl: '/images/products/samsung-z-fold-hinge.jpg',
      badge: 'New'
    },
    {
      id: 7,
      name: 'MacBook Pro 16" Screen',
      category: 'MacBook Parts',
      price: 599.99,
      imageUrl: '/images/products/macbook-pro-screen.jpg'
    },
    {
      id: 8,
      name: 'Soldering Station Pro',
      category: 'Tools',
      price: 199.99,
      imageUrl: '/images/products/soldering-station.jpg',
      badge: 'New'
    }
  ];

  const bestSellers = [
    {
      id: 9,
      name: 'iPhone 14 Screen',
      category: 'iPhone Parts',
      price: 249.99,
      imageUrl: '/images/products/iphone-14-screen.jpg',
      badge: 'Best Seller'
    },
    {
      id: 10,
      name: 'Samsung S23 Battery',
      category: 'Samsung Parts',
      price: 39.99,
      imageUrl: '/images/products/samsung-s23-battery.jpg',
      badge: 'Best Seller'
    },
    {
      id: 11,
      name: 'iPad Air 5 Screen',
      category: 'iPad Parts',
      price: 299.99,
      imageUrl: '/images/products/ipad-air-screen.jpg'
    },
    {
      id: 12,
      name: 'Screwdriver Set 64pcs',
      category: 'Tools',
      price: 79.99,
      imageUrl: '/images/products/screwdriver-set.jpg',
      badge: 'Best Seller'
    }
  ];

  return (
    <>
      <SEOHead
        title="Nexus TechHub - Professional Mobile Repair Parts UAE"
        description="Professional mobile device repair parts and services in UAE. Specializing in iPhone, Samsung, and iPad replacement parts with quality guarantee. Located in Ras Al Khaimah."
        keywords="mobile repair parts UAE, iPhone parts Dubai, Samsung repair UAE, iPad parts Abu Dhabi, phone repair tools, mobile parts supplier UAE, Ras Al Khaimah repair parts"
        canonicalUrl="https://nexustechhub.netlify.app"
      />

      <UnifiedHeader />
      <Hero />

      {/* Featured Products Section */}
      <FeaturedProducts products={featuredProducts} />

      {/* New Products Section */}
      <section className={styles.newProductsSection}>
        <h2>New Arrivals</h2>
        <p>Check out our latest products and tools</p>
        <FeaturedProducts products={newProducts} />
      </section>

      {/* Best Sellers Section */}
      <section className={styles.bestSellersSection}>
        <h2>Best Sellers</h2>
        <p>Most popular products chosen by our customers</p>
        <FeaturedProducts products={bestSellers} />
      </section>

      {/* Genuine Parts Program Banner */}
      <section className={styles.genuinePartsBanner}>
        <div className={styles.bannerContainer}>
          <div className={styles.bannerContent}>
            <div className={styles.bannerIcon}>✨</div>
            <div className={styles.bannerText}>
              <h2 className={styles.bannerTitle}>Introducing the Genuine Parts Program!</h2>
              <p className={styles.bannerDescription}>
                Authentic mobile repair parts now available for professional repair shops in the UAE.
                <span className={styles.urgencyText}> Limited stock available - Order now!</span>
              </p>
            </div>
            <div className={styles.bannerActions}>
              <Link href="/genuine-parts-program" className={styles.bannerBtn}>
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Quick Inquiry Section */}
      <QuickInquiry />

      <Footer />
      <WhatsAppButton />
    </>
  );
}

// Server-side rendering with database data
export async function getServerSideProps() {
  try {
    // Fetch featured products
    const featuredProducts = await getProducts({ is_featured: true, limit: 4 });

    // Fetch new products
    const newProducts = await getProducts({ is_new: true, limit: 4 });

    // Fetch best sellers (products with most reviews or highest rating)
    const bestSellers = await getProducts({ limit: 4 });

    return {
      props: {
        featuredProducts: featuredProducts || [],
        newProducts: newProducts || [],
        bestSellers: bestSellers || [],
      },
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    // Return empty arrays as fallback
    return {
      props: {
        featuredProducts: [],
        newProducts: [],
        bestSellers: [],
      },
    };
  }
}
