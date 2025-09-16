import React from 'react';
import Layout from '../nexus-techhub-fresh/components/Layout/Layout';
import styles from '../styles/About.module.css';

function AboutUs() {
  return (
    <Layout
      title="About Us - Nexus Tech Hub"
      description="Learn about Nexus Tech Hub, your trusted partner for professional repair parts and tools."
    >
      <div className={styles.aboutPage}>
        <div className={styles.container}>
          {/* Hero Section */}
          <div className={styles.heroSection}>
            <h1>About Nexus Tech Hub</h1>
            <p>
              Your trusted partner for professional mobile repair parts and tools.
              Empowering repair professionals and enthusiasts since 2015.
            </p>
          </div>

          {/* Stats Section */}
          <div className={styles.statsSection}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>📈</div>
              <div className={styles.statNumber}>10+</div>
              <div className={styles.statLabel}>Years Experience</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>🛠️</div>
              <div className={styles.statNumber}>1000+</div>
              <div className={styles.statLabel}>Products</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>🌍</div>
              <div className={styles.statNumber}>50+</div>
              <div className={styles.statLabel}>Countries Served</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>⭐</div>
              <div className={styles.statNumber}>4.9</div>
              <div className={styles.statLabel}>Customer Rating</div>
            </div>
          </div>

          {/* Content Sections */}
          <div className={styles.contentSection}>
            <div className={styles.sectionHeader}>
              <h2>Our Story</h2>
              <p>From humble beginnings to industry leadership</p>
            </div>

            <div className={styles.sectionContent}>
              <div className={styles.sectionText}>
                <p>
                  Founded in 2015, Nexus Tech Hub began with a simple mission: to provide high-quality repair parts and tools
                  to professionals and DIY enthusiasts alike. What started as a small operation has grown into a
                  trusted supplier of electronics repair parts worldwide.
                </p>
                <p>
                  Our founder, with over 15 years of experience in electronics repair, recognized the need for reliable parts and tools
                  that wouldn't break the bank. This vision has guided our company's growth and continues to drive our commitment to quality and service.
                </p>
              </div>
              <div className={styles.sectionImage}>
                <img src="/images/about/team-workshop.jpg" alt="Our workshop" onError={(e) => e.target.src = '/images/placeholder.svg'} />
              </div>
            </div>
          </div>

          <div className={styles.contentSection}>
            <div className={styles.sectionHeader}>
              <h2>Our Mission</h2>
              <p>Empowering repair professionals worldwide</p>
            </div>

            <div className={styles.sectionContent}>
              <div className={styles.sectionImage}>
                <img src="/images/about/repair-mission.jpg" alt="Our mission" onError={(e) => e.target.src = '/images/placeholder.svg'} />
              </div>
              <div className={styles.sectionText}>
                <p>
                  At Nexus Tech Hub, our mission is to empower repair professionals and enthusiasts with the highest quality
                  parts and tools. We believe in extending the life of electronic devices through repair rather than replacement,
                  contributing to a more sustainable future.
                </p>
                <p>
                  We're committed to providing exceptional customer service, technical support, and educational resources to help our
                  customers succeed in their repair endeavors.
                </p>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>✅</div>
              <h3>Quality Assurance</h3>
              <p>All our parts undergo rigorous testing to ensure reliability and performance.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>💰</div>
              <h3>Competitive Pricing</h3>
              <p>We offer fair prices without compromising on quality.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>👨‍🔧</div>
              <h3>Expert Support</h3>
              <p>Our team of technicians is available to provide guidance and troubleshooting assistance.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🚚</div>
              <h3>Fast Shipping</h3>
              <p>Orders are processed quickly to minimize downtime for repair businesses.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🛡️</div>
              <h3>Satisfaction Guarantee</h3>
              <p>We stand behind our products with a comprehensive return policy.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🌱</div>
              <h3>Sustainability</h3>
              <p>Supporting repair culture to reduce electronic waste and promote sustainability.</p>
            </div>
          </div>

          {/* Team Section */}
          <div className={styles.teamSection}>
            <div className={styles.sectionHeader}>
              <h2>Our Team</h2>
              <p>Meet the experts behind Nexus Tech Hub</p>
            </div>

            <div className={styles.teamGrid}>
              <div className={styles.teamMember}>
                <div className={styles.teamAvatar}>
                  <span>👨‍💼</span>
                </div>
                <h3>John Smith</h3>
                <div className={styles.teamRole}>Founder & CEO</div>
                <p>15+ years in electronics repair industry with expertise in mobile device technology.</p>
              </div>
              <div className={styles.teamMember}>
                <div className={styles.teamAvatar}>
                  <span>👩‍🔧</span>
                </div>
                <h3>Sarah Johnson</h3>
                <div className={styles.teamRole}>Technical Director</div>
                <p>Specializes in iPhone and Android repair techniques with advanced certification.</p>
              </div>
              <div className={styles.teamMember}>
                <div className={styles.teamAvatar}>
                  <span>👨‍💻</span>
                </div>
                <h3>Mike Chen</h3>
                <div className={styles.teamRole}>Operations Manager</div>
                <p>Manages logistics and ensures timely delivery of parts worldwide.</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className={styles.ctaSection}>
            <h2>Join Our Community</h2>
            <p>Connect with fellow repair professionals and stay updated with the latest repair techniques.</p>
            <a href="/contact" className={styles.ctaButton}>
              <span>Get in Touch</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default React.memo(AboutUs);
