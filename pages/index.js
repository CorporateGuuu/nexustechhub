import SEOHead from '../components/SEOHead';
import Header from '../components/Header';
import Hero from '../components/Hero';
import WhatsAppButton from '../components/WhatsAppButton';
import Footer from '../components/Footer';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <>
      <SEOHead
        title="Nexus TechHub - Professional Mobile Repair Parts UAE"
        description="Professional mobile device repair parts and services in UAE. Specializing in iPhone, Samsung, and iPad replacement parts with quality guarantee. Located in Ras Al Khaimah."
        keywords="mobile repair parts UAE, iPhone parts Dubai, Samsung repair UAE, iPad parts Abu Dhabi, phone repair tools, mobile parts supplier UAE, Ras Al Khaimah repair parts"
        canonicalUrl="https://nexustechhub.netlify.app"
      />

      <Header />
      <Hero />

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