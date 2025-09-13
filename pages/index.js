import SEOHead from '../components/SEOHead';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts/FeaturedProducts';
import WhatsAppButton from '../components/WhatsAppButton';
import QuickInquiry from '../components/QuickInquiry';
import Testimonials from '../components/Testimonials';
import Link from 'next/link';
import MediaGallery from '../components/MediaGallery/MediaGallery';
import { getProducts } from '../lib/db';
import styles from '../styles/Home.module.css';

export default function Home({ featuredProducts = [], newProducts = [], bestSellers = [] }) {

  return (
    <>
      <SEOHead
        title="Nexus TechHub - Professional Mobile Repair Parts UAE"
        description="Professional mobile device repair parts and services in UAE. Specializing in iPhone, Samsung, and iPad replacement parts with quality guarantee. Located in Ras Al Khaimah."
        keywords="mobile repair parts UAE, iPhone parts Dubai, Samsung repair UAE, iPad parts Abu Dhabi, phone repair tools, mobile parts supplier UAE, Ras Al Khaimah repair parts"
        canonicalUrl="https://nexustechhub.netlify.app"
      />

      <Hero />

      {/* Featured Products Section */}
      <FeaturedProducts
        products={featuredProducts}
        title="Featured Products"
        subtitle="Discover our most popular repair parts and tools, trusted by professionals worldwide."
      />

      {/* New Products Section */}
      <section className={styles.newProductsSection}>
        <FeaturedProducts
          products={newProducts}
          title="New Arrivals"
          subtitle="Check out our latest products and tools"
        />
      </section>

      {/* Best Sellers Section */}
      <section className={styles.bestSellersSection}>
        <FeaturedProducts
          products={bestSellers}
          title="Best Sellers"
          subtitle="Most popular products chosen by our customers"
        />
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

      {/* Remove Footer here to avoid duplicate since Footer is rendered in _app.js */}
      {/* <Footer /> */}
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
