import SEOHead from '../components/SEOHead';
import UnifiedHeader from '../components/UnifiedHeader/UnifiedHeader';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts/FeaturedProducts';
import WhatsAppButton from '../components/WhatsAppButton';
import Footer from '../components/Footer';
import Link from 'next/link';
import MediaGallery from '../components/MediaGallery/MediaGallery';
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

export default function Home() {
  // Sample product data - replace with actual data from API
  const featuredProducts = [
    {
      id: 1,
      name: 'iPhone 15 Pro Screen',
      category: 'iPhone Parts',
      price: 299.99,
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
      badge: 'New'
    },
    {
      id: 2,
      name: 'Samsung S24 Battery',
      category: 'Samsung Parts',
      price: 49.99,
      imageUrl: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300&h=200&fit=crop',
      badge: 'Best Seller'
    },
    {
      id: 3,
      name: 'iPad Pro 12.9" Screen',
      category: 'iPad Parts',
      price: 399.99,
      imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&h=200&fit=crop'
    },
    {
      id: 4,
      name: 'Professional Repair Kit',
      category: 'Tools',
      price: 149.99,
      imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop',
      badge: 'Popular'
    }
  ];

  const newProducts = [
    {
      id: 5,
      name: 'iPhone 15 Pro Max Screen',
      category: 'iPhone Parts',
      price: 349.99,
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
      badge: 'New Arrival'
    },
    {
      id: 6,
      name: 'Samsung Z Fold 5 Hinge',
      category: 'Samsung Parts',
      price: 89.99,
      imageUrl: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300&h=200&fit=crop',
      badge: 'New'
    },
    {
      id: 7,
      name: 'MacBook Pro 16" Screen',
      category: 'MacBook Parts',
      price: 599.99,
      imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=200&fit=crop'
    },
    {
      id: 8,
      name: 'Soldering Station Pro',
      category: 'Tools',
      price: 199.99,
      imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop',
      badge: 'New'
    }
  ];

  const bestSellers = [
    {
      id: 9,
      name: 'iPhone 14 Screen',
      category: 'iPhone Parts',
      price: 249.99,
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
      badge: 'Best Seller'
    },
    {
      id: 10,
      name: 'Samsung S23 Battery',
      category: 'Samsung Parts',
      price: 39.99,
      imageUrl: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300&h=200&fit=crop',
      badge: 'Best Seller'
    },
    {
      id: 11,
      name: 'iPad Air 5 Screen',
      category: 'iPad Parts',
      price: 299.99,
      imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&h=200&fit=crop'
    },
    {
      id: 12,
      name: 'Screwdriver Set 64pcs',
      category: 'Tools',
      price: 79.99,
      imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop',
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

      {/* Interactive Media Gallery */}
      <MediaGallery media={homepageMedia} autoplay={true} autoplayDelay={4000} showThumbs={true} />

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

      <Footer />
      <WhatsAppButton />
    </>
  );
}
