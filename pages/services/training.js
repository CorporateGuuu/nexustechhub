import React from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import styles from '../../styles/Services.module.css';

export default function Training() {
  return (
    <Layout
      title="Repair Training - Nexus Tech Hub"
      description="Professional repair training courses for technicians. Learn advanced repair techniques, device diagnostics, and business management."
    >
      <div className={styles.servicePage}>
        {/* Hero Section */}
        <div className={styles.heroSection}>
          <div className="container">
            <div className={styles.heroContent}>
              <div className={styles.breadcrumb}>
                <Link href="/">Home</Link>
                <span className={styles.breadcrumbSeparator}>/</span>
                <Link href="/services">Services</Link>
                <span className={styles.breadcrumbSeparator}>/</span>
                <span className={styles.currentPage}>Repair Training</span>
              </div>

              <h1 className={styles.heroTitle}>Repair Training</h1>
              <p className={styles.heroDescription}>
                Comprehensive training programs for repair technicians. Master advanced repair techniques,
                learn the latest technologies, and grow your repair business with our expert-led courses.
              </p>

              <div className={styles.heroStats}>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>50+</div>
                  <div className={styles.statLabel}>Training Modules</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>500+</div>
                  <div className={styles.statLabel}>Certified Technicians</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>95%</div>
                  <div className={styles.statLabel}>Pass Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Training Programs */}
        <div className={styles.benefitsSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Training Programs</h2>
            <div className={styles.trainingPrograms}>
              <div className={styles.programCard}>
                <div className={styles.programHeader}>
                  <h3>iPhone Repair Specialist</h3>
                  <div className={styles.programPrice}>$299</div>
                </div>
                <p>Complete iPhone repair training covering all models from iPhone 6 to latest series.</p>
                <ul className={styles.programFeatures}>
                  <li>Screen replacement techniques</li>
                  <li>Battery replacement</li>
                  <li>Charging port repairs</li>
                  <li>Camera module repairs</li>
                  <li>Logic board diagnostics</li>
                </ul>
                <div className={styles.programDuration}>Duration: 2 weeks</div>
                <Link href="/contact" className={styles.programButton}>Enroll Now</Link>
              </div>

              <div className={styles.programCard}>
                <div className={styles.programHeader}>
                  <h3>Samsung Galaxy Expert</h3>
                  <div className={styles.programPrice}>$249</div>
                </div>
                <p>Master Samsung Galaxy repairs including AMOLED screens and S Pen technology.</p>
                <ul className={styles.programFeatures}>
                  <li>AMOLED screen repairs</li>
                  <li>S Pen digitizer replacement</li>
                  <li>USB-C port repairs</li>
                  <li>Wireless charging fixes</li>
                  <li>Foldable device repairs</li>
                </ul>
                <div className={styles.programDuration}>Duration: 2 weeks</div>
                <Link href="/contact" className={styles.programButton}>Enroll Now</Link>
              </div>

              <div className={styles.programCard}>
                <div className={styles.programHeader}>
                  <h3>Advanced Diagnostics</h3>
                  <div className={styles.programPrice}>$199</div>
                </div>
                <p>Learn professional diagnostic techniques and software tools for all devices.</p>
                <ul className={styles.programFeatures}>
                  <li>Professional diagnostic tools</li>
                  <li>Software troubleshooting</li>
                  <li>Component-level testing</li>
                  <li>Data recovery techniques</li>
                  <li>Quality assurance</li>
                </ul>
                <div className={styles.programDuration}>Duration: 1 week</div>
                <Link href="/contact" className={styles.programButton}>Enroll Now</Link>
              </div>

              <div className={styles.programCard}>
                <div className={styles.programHeader}>
                  <h3>Business Management</h3>
                  <div className={styles.programPrice}>$149</div>
                </div>
                <p>Learn to run a successful repair business with marketing and management skills.</p>
                <ul className={styles.programFeatures}>
                  <li>Business planning</li>
                  <li>Inventory management</li>
                  <li>Customer service excellence</li>
                  <li>Pricing strategies</li>
                  <li>Marketing techniques</li>
                </ul>
                <div className={styles.programDuration}>Duration: 1 week</div>
                <Link href="/contact" className={styles.programButton}>Enroll Now</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Training Methods */}
        <div className={styles.processSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Training Methods</h2>
            <div className={styles.trainingMethods}>
              <div className={styles.methodCard}>
                <div className={styles.methodIcon}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4-5h-2V7h2v5zm4 3h-2v-9h2v9z"/>
                  </svg>
                </div>
                <h3>In-Person Training</h3>
                <p>Hands-on training at our facility in Ras Al Khaimah with expert instructors.</p>
                <ul>
                  <li>Practical repair sessions</li>
                  <li>Real device practice</li>
                  <li>Personal mentoring</li>
                  <li>Certification upon completion</li>
                </ul>
              </div>

              <div className={styles.methodCard}>
                <div className={styles.methodIcon}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3>Online Training</h3>
                <p>Flexible online courses with video tutorials and virtual labs.</p>
                <ul>
                  <li>24/7 access to content</li>
                  <li>Interactive video tutorials</li>
                  <li>Virtual practice sessions</li>
                  <li>Online certification</li>
                </ul>
              </div>

              <div className={styles.methodCard}>
                <div className={styles.methodIcon}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <h3>On-Site Training</h3>
                <p>Custom training programs delivered at your location for teams.</p>
                <ul>
                  <li>Tailored to your needs</li>
                  <li>Group training sessions</li>
                  <li>On-site practice</li>
                  <li>Follow-up support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Certification */}
        <div className={styles.benefitsSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Certification Benefits</h2>
            <div className={styles.certificationGrid}>
              <div className={styles.certificationItem}>
                <h3>Industry Recognition</h3>
                <p>Internationally recognized certification that demonstrates your expertise.</p>
              </div>

              <div className={styles.certificationItem}>
                <h3>Career Advancement</h3>
                <p>Stand out in the job market and advance your repair technician career.</p>
              </div>

              <div className={styles.certificationItem}>
                <h3>Business Growth</h3>
                <p>Attract more customers with certified repair services.</p>
              </div>

              <div className={styles.certificationItem}>
                <h3>Continuing Education</h3>
                <p>Stay updated with the latest repair techniques and technologies.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className={styles.testimonialsSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>What Our Graduates Say</h2>
            <div className={styles.testimonials}>
              <div className={styles.testimonial}>
                <p>"The iPhone repair training was exceptional. I learned techniques I never thought possible. My repair success rate has increased by 40%."</p>
                <div className={styles.testimonialAuthor}>
                  <strong>Ahmed Al-Rashid</strong>
                  <span>Mobile Repair Shop Owner, Dubai</span>
                </div>
              </div>

              <div className={styles.testimonial}>
                <p>"The business management course helped me turn my small repair shop into a profitable business. Highly recommend for aspiring entrepreneurs."</p>
                <div className={styles.testimonialAuthor}>
                  <strong>Sarah Johnson</strong>
                  <span>Certified Repair Technician, Abu Dhabi</span>
                </div>
              </div>

              <div className={styles.testimonial}>
                <p>"Professional training with real-world applications. The instructors are experts and the hands-on experience is invaluable."</p>
                <div className={styles.testimonialAuthor}>
                  <strong>Mohammed Al-Farsi</strong>
                  <span>Independent Repair Technician, Sharjah</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={styles.ctaSection}>
          <div className="container">
            <div className={styles.ctaContent}>
              <h2>Start Your Repair Career Today</h2>
              <p>Join hundreds of successful repair technicians who have trained with us.</p>
              <div className={styles.ctaButtons}>
                <Link href="/contact" className={styles.primaryButton}>
                  Get Started
                </Link>
                <a href="tel:+971585531029" className={styles.secondaryButton}>
                  Call +971 58 553 1029
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
