import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import styles from '../styles/About.module.css';

export default function About() {
  const stats = [
    { number: '5000+', label: 'Products Available' },
    { number: '50+', label: 'Countries Served' },
    { number: '98%', label: 'Customer Satisfaction' },
    { number: '24/7', label: 'Technical Support' }
  ];

  const values = [
    {
      icon: '🎯',
      title: 'Quality First',
      description: 'We source only the highest quality replacement parts from trusted manufacturers worldwide.'
    },
    {
      icon: '🚚',
      title: 'Fast Shipping',
      description: 'Express worldwide shipping with real-time tracking and insurance coverage.'
    },
    {
      icon: '🛠️',
      title: 'Expert Support',
      description: 'Our technical team provides guidance and support for all your repair needs.'
    },
    {
      icon: '💰',
      title: 'Competitive Pricing',
      description: 'Wholesale pricing with bulk discounts available for business customers.'
    }
  ];

  const team = [
    {
      name: 'Ahmed Al-Rashid',
      role: 'Founder & CEO',
      image: '/images/team/ahmed.jpg',
      bio: '15+ years in mobile repair industry with expertise in international supply chains.'
    },
    {
      name: 'Sarah Johnson',
      role: 'Technical Director',
      image: '/images/team/sarah.jpg',
      bio: 'Certified repair technician specializing in iPhone and Samsung repair procedures.'
    },
    {
      name: 'Mohammed Al-Farsi',
      role: 'Operations Manager',
      image: '/images/team/mohammed.jpg',
      bio: 'Expert in logistics and supply chain management for Middle East and GCC region.'
    }
  ];

  const certifications = [
    { name: 'ISO 9001 Certified', icon: '🏆' },
    { name: 'Apple Authorized Reseller', icon: '🍎' },
    { name: 'Samsung Premium Partner', icon: '📱' },
    { name: 'UAE Chamber of Commerce', icon: '🇦🇪' }
  ];

  return (
    <Layout
      title="About Us - Nexus Tech Hub | Leading Mobile Repair Parts Supplier UAE"
      description="Learn about Nexus Tech Hub, your trusted source for mobile repair parts in UAE. 15+ years of experience serving repair professionals worldwide."
    >
      <div className={styles.aboutPage}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>About Us</span>
        </div>

        {/* Hero Section */}
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>About Nexus Tech Hub</h1>
            <p>Your trusted partner for mobile device repair parts and solutions since 2009</p>
            <div className={styles.heroStats}>
              {stats.map((stat, index) => (
                <div key={index} className={styles.stat}>
                  <div className={styles.statNumber}>{stat.number}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.heroImage}>
            <img src="/images/about/warehouse.jpg" alt="Nexus Tech Hub Warehouse" />
          </div>
        </div>

        {/* Story Section */}
        <div className={styles.storySection}>
          <div className={styles.container}>
            <div className={styles.storyContent}>
              <h2>Our Story</h2>
              <div className={styles.storyGrid}>
                <div className={styles.storyText}>
                  <p>
                    Founded in 2009 in Ras Al Khaimah, UAE, Nexus Tech Hub began as a small repair shop
                    serving local mobile technicians. What started as a passion for fixing devices has grown
                    into one of the Middle East's leading suppliers of mobile repair parts.
                  </p>
                  <p>
                    Over the past 15 years, we've built strong relationships with manufacturers worldwide,
                    ensuring we can provide our customers with the highest quality parts at competitive prices.
                    Our commitment to excellence and customer satisfaction has made us the go-to source for
                    repair professionals across 50+ countries.
                  </p>
                  <p>
                    Today, we serve thousands of repair technicians, shops, and wholesalers with our
                    comprehensive range of iPhone, Samsung, iPad, and repair tool products. Our state-of-the-art
                    warehouse and logistics network ensures fast, reliable delivery worldwide.
                  </p>
                </div>
                <div className={styles.storyImage}>
                  <img src="/images/about/founding.jpg" alt="Nexus Tech Hub Founding Story" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className={styles.valuesSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2>Why Choose Us</h2>
              <p>Our core values drive everything we do</p>
            </div>

            <div className={styles.valuesGrid}>
              {values.map((value, index) => (
                <div key={index} className={styles.valueCard}>
                  <div className={styles.valueIcon}>{value.icon}</div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className={styles.teamSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2>Meet Our Team</h2>
              <p>Experienced professionals dedicated to your success</p>
            </div>

            <div className={styles.teamGrid}>
              {team.map((member, index) => (
                <div key={index} className={styles.teamCard}>
                  <div className={styles.teamImage}>
                    <img
                      src={member.image}
                      alt={member.name}
                      onError={(e) => {
                        e.target.src = '/images/team/placeholder.jpg';
                      }}
                    />
                  </div>
                  <div className={styles.teamInfo}>
                    <h3>{member.name}</h3>
                    <div className={styles.teamRole}>{member.role}</div>
                    <p>{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications Section */}
        <div className={styles.certificationsSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2>Certifications & Partnerships</h2>
              <p>Recognized quality and trusted partnerships</p>
            </div>

            <div className={styles.certificationsGrid}>
              {certifications.map((cert, index) => (
                <div key={index} className={styles.certCard}>
                  <div className={styles.certIcon}>{cert.icon}</div>
                  <h3>{cert.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className={styles.missionSection}>
          <div className={styles.container}>
            <div className={styles.missionContent}>
              <h2>Our Mission</h2>
              <p>
                To empower mobile repair professionals worldwide by providing them with the highest quality
                replacement parts, cutting-edge tools, and expert technical support. We believe that by
                supporting repair technicians, we're contributing to a more sustainable future by extending
                the life of mobile devices and reducing electronic waste.
              </p>

              <div className={styles.missionStats}>
                <div className={styles.missionStat}>
                  <div className={styles.statNumber}>500K+</div>
                  <div className={styles.statLabel}>Devices Repaired</div>
                </div>
                <div className={styles.missionStat}>
                  <div className={styles.statNumber}>10K+</div>
                  <div className={styles.statLabel}>Happy Customers</div>
                </div>
                <div className={styles.missionStat}>
                  <div className={styles.statNumber}>99.5%</div>
                  <div className={styles.statLabel}>Order Accuracy</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={styles.ctaSection}>
          <div className={styles.container}>
            <div className={styles.ctaContent}>
              <h2>Ready to Get Started?</h2>
              <p>Join thousands of repair professionals who trust Nexus Tech Hub for their parts needs</p>
              <div className={styles.ctaButtons}>
                <Link href="/products" className={styles.primaryBtn}>
                  Browse Products
                </Link>
                <Link href="/contact" className={styles.secondaryBtn}>
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
