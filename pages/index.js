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

const homepageMedia = [
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop',
    alt: 'Professional Mobile Repair Tools',
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
    alt: 'iPhone Repair Parts',
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&h=400&fit=crop',
    alt: 'Samsung Galaxy Repair',
  },
  {
    type: 'video',
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
    poster: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop',
  },
];

export default function Home({ featuredProducts, newProducts, bestSellers }) {
  // Transform database products to component format
  const transformProducts = (products) => {
    return products?.map(product => ({
      id: product.id,
      name: product.name,
      category: product.categories?.name || 'Parts',
      price: product.price,
      imageUrl: product.product_images?.find(img => img.is_primary)?.image_url ||
                product.image_url ||
                'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
      badge: product.is_featured ? 'Featured' : product.is_new ? 'New' : null,
      slug: product.slug
    })) || [];
  };

  const featuredProductsData = transformProducts(featuredProducts);
  const newProductsData = transformProducts(newProducts);
  const bestSellersData = transformProducts(bestSellers);

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

      {/* Interactive Media Gallery */}
      <MediaGallery media={homepageMedia} autoplay={true} autoplayDelay={4000} showThumbs={true} />

      {/* Featured Products Section */}
      <FeaturedProducts products={featuredProductsData} />

      {/* New Products Section */}
      <section className={styles.newProductsSection}>
        <h2>New Arrivals</h2>
        <p>Check out our latest products and tools</p>
        <FeaturedProducts products={newProductsData} />
      </section>

      {/* Best Sellers Section */}
      <section className={styles.bestSellersSection}>
        <h2>Best Sellers</h2>
        <p>Most popular products chosen by our customers</p>
        <FeaturedProducts products={bestSellersData} />
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
