import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BusinessStructuredData } from '../components/StructuredData';
import ErrorBoundary from '../components/ErrorBoundary';
import styles from '../styles/GenuinePartsProgram.module.css';

export default function GenuinePartsProgram() {
  return (
    <ErrorBoundary componentName="GenuinePartsProgram">
      <Head>
        <title>Genuine Parts Program - Nexus TechHub | Authentic Mobile Repair Parts UAE</title>
        <meta
          name="description"
          content="Join Nexus TechHub's Genuine Parts Program for authentic iPhone, Samsung, and iPad parts. Professional repair shops in UAE get certified quality components with flexible pricing options."
        />
        <meta
          name="keywords"
          content="genuine parts program, authentic mobile parts, certified repair parts, UAE mobile repair, professional repair shops, Nexus TechHub, Ras Al Khaimah"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://nexustechhub.netlify.app/genuine-parts-program" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Genuine Parts Program - Nexus TechHub" />
        <meta property="og:description" content="Professional repair shops in UAE - access authentic mobile parts with Nexus TechHub's Genuine Parts Program. Certified quality, flexible pricing." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nexustechhub.netlify.app/genuine-parts-program" />
        <meta property="og:image" content="https://nexustechhub.netlify.app/images/genuine-parts-program-banner.jpg" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Genuine Parts Program - Nexus TechHub" />
        <meta name="twitter:description" content="Professional repair shops in UAE - access authentic mobile parts with certified quality and flexible pricing options." />
        <meta name="twitter:image" content="https://nexustechhub.netlify.app/images/genuine-parts-program-banner.jpg" />
      </Head>

      <BusinessStructuredData />
      <Header />

      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.container}>
            <div className={styles.heroContent}>
              <div className={styles.heroText}>
                <h1 className={styles.heroTitle}>
                  Nexus TechHub Genuine Parts Program
                </h1>
                <p className={styles.heroSubtitle}>
                  Reliable Repairs with Authentic Mobile Components
                </p>
                <p className={styles.heroDescription}>
                  Nexus TechHub is proud to present the Genuine Parts Program, designed exclusively for repair shops
                  committed to quality and customer satisfaction in the UAE. Access authentic mobile components for
                  dependable repairs that keep your customers coming back.
                </p>
                <div className={styles.heroActions}>
                  <a href="#apply" className={styles.primaryBtn}>
                    Apply Now
                  </a>
                  <a href="#benefits" className={styles.secondaryBtn}>
                    Learn More
                  </a>
                </div>
              </div>
              <div className={styles.heroImage}>
                <div className={styles.genuineBadge}>
                  <span className={styles.badgeText}>Certified Genuine Parts</span>
                  <span className={styles.badgeSubtext}>Nexus TechHub Verified</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Program Options Section */}
        <section className={styles.programOptions} id="options">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Choose Your Program Option</h2>
            <p className={styles.sectionDescription}>
              The Nexus TechHub Genuine Parts Program is designed with flexibility in mind.
              Choose the option that best aligns with your repair shop's needs and goals.
            </p>

            <div className={styles.optionsGrid}>
              {/* Option 1: With Core Returns */}
              <div className={styles.optionCard}>
                <div className={styles.optionHeader}>
                  <h3 className={styles.optionTitle}>Program with Core Returns</h3>
                  <p className={styles.optionSubtitle}>Save upfront by sending back the original core</p>
                </div>
                <div className={styles.optionContent}>
                  <p className={styles.optionDescription}>
                    Perfect for keeping costs low while accessing Genuine Parts. Return the original
                    component within 60 days to maintain discounted pricing.
                  </p>
                  <ul className={styles.optionFeatures}>
                    <li>Reduced upfront pricing</li>
                    <li>60-day return window</li>
                    <li>Simple return process</li>
                    <li>Ideal for managing immediate expenses</li>
                  </ul>
                  <div className={styles.pricingExample}>
                    <h4>Example Pricing:</h4>
                    <div className={styles.priceBreakdown}>
                      <span>Purchase Price: AED 1,200</span>
                      <span>Core Fee: AED 200 (waived if returned)</span>
                      <span className={styles.totalCost}>Total if not returned: AED 1,400</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Option 2: Without Core Returns */}
              <div className={styles.optionCard}>
                <div className={styles.optionHeader}>
                  <h3 className={styles.optionTitle}>Program without Core Returns</h3>
                  <p className={styles.optionSubtitle}>Pay more upfront but keep the core</p>
                </div>
                <div className={styles.optionContent}>
                  <p className={styles.optionDescription}>
                    Sell cores later for additional revenue potential, maximizing your profits.
                    Use our buyback program at your convenience.
                  </p>
                  <ul className={styles.optionFeatures}>
                    <li>Simple purchase process</li>
                    <li>No returns required</li>
                    <li>Flexible buyback option</li>
                    <li>Additional revenue potential</li>
                  </ul>
                  <div className={styles.pricingExample}>
                    <h4>Example Pricing:</h4>
                    <div className={styles.priceBreakdown}>
                      <span>Purchase Price: AED 1,400</span>
                      <span>Buyback Value: Up to AED 500</span>
                      <span className={styles.totalCost}>Final cost as low as: AED 900</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Parts Categories Section */}
        <section className={styles.partsCategories} id="parts">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Certified Quality Parts</h2>
            <p className={styles.sectionDescription}>
              Look for the Nexus TechHub Genuine Parts badge to ensure you're purchasing parts that meet
              rigorous quality standards—from displays to batteries—for repairs customers can trust.
            </p>

            <div className={styles.categoriesGrid}>
              <div className={styles.categoryCard}>
                <div className={styles.categoryIcon}>📱</div>
                <h3 className={styles.categoryTitle}>Display Assemblies</h3>
                <p className={styles.categoryDescription}>
                  All genuine replacement display assemblies include front camera/proximity sensors and all screws.
                  Each display is serialized for tracking purchases and core returns.
                </p>
                <ul className={styles.categoryFeatures}>
                  <li>Complete assembly with sensors</li>
                  <li>Serialized for tracking</li>
                  <li>Perfect color accuracy</li>
                  <li>Touch sensitivity guaranteed</li>
                </ul>
              </div>

              <div className={styles.categoryCard}>
                <div className={styles.categoryIcon}>📷</div>
                <h3 className={styles.categoryTitle}>Camera Components</h3>
                <p className={styles.categoryDescription}>
                  Genuine camera replacements guarantee compatibility, functionality, and performance to match
                  the photographic performance customers expect from their devices.
                </p>
                <ul className={styles.categoryFeatures}>
                  <li>Original image quality</li>
                  <li>Full functionality guaranteed</li>
                  <li>Perfect compatibility</li>
                  <li>Professional performance</li>
                </ul>
              </div>

              <div className={styles.categoryCard}>
                <div className={styles.categoryIcon}>🔋</div>
                <h3 className={styles.categoryTitle}>Battery Components</h3>
                <p className={styles.categoryDescription}>
                  Quality replacement batteries ensure optimal performance, reliability, and safety.
                  Genuine batteries provide the longevity and performance customers expect.
                </p>
                <ul className={styles.categoryFeatures}>
                  <li>Optimal performance</li>
                  <li>Safety certified</li>
                  <li>Long-lasting reliability</li>
                  <li>Temperature protection</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className={styles.benefits} id="benefits">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Why Choose Our Genuine Parts Program?</h2>

            <div className={styles.benefitsGrid}>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>✅</div>
                <h3 className={styles.benefitTitle}>Authentic Components</h3>
                <p className={styles.benefitDescription}>
                  Access to genuine parts for reliable, top-quality repairs that meet manufacturer standards.
                </p>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>💰</div>
                <h3 className={styles.benefitTitle}>Flexible Pricing</h3>
                <p className={styles.benefitDescription}>
                  Choose between core return savings or no-return convenience to support your business model.
                </p>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>🏆</div>
                <h3 className={styles.benefitTitle}>Customer Satisfaction</h3>
                <p className={styles.benefitDescription}>
                  Drive customer satisfaction with the quality and integrity of genuine components.
                </p>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>🇦🇪</div>
                <h3 className={styles.benefitTitle}>UAE Market Focus</h3>
                <p className={styles.benefitDescription}>
                  Designed specifically for the UAE repair market with local support and fast delivery.
                </p>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>📚</div>
                <h3 className={styles.benefitTitle}>Repair Guides</h3>
                <p className={styles.benefitDescription}>
                  Access to professional repair guides and technical support for optimal repair results.
                </p>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>🎯</div>
                <h3 className={styles.benefitTitle}>Marketing Support</h3>
                <p className={styles.benefitDescription}>
                  Promotional materials and certification badges to attract quality-conscious customers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Application Section */}
        <section className={styles.application} id="apply">
          <div className={styles.container}>
            <div className={styles.applicationContent}>
              <div className={styles.applicationText}>
                <h2 className={styles.sectionTitle}>Ready to Join?</h2>
                <p className={styles.sectionDescription}>
                  Enrollment in the Nexus TechHub Genuine Parts Program is free and designed for repair
                  businesses of all sizes in the UAE. Start providing your customers with the quality
                  they deserve.
                </p>

                <div className={styles.requirements}>
                  <h3>Program Requirements:</h3>
                  <ul>
                    <li>Valid UAE business license</li>
                    <li>Mobile repair shop or service center</li>
                    <li>Commitment to quality repairs</li>
                    <li>Agreement to program terms</li>
                  </ul>
                </div>

                <div className={styles.applicationActions}>
                  <a
                    href="https://wa.me/971585531029?text=Hi, I'm interested in joining the Nexus TechHub Genuine Parts Program. Please provide more information."
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.primaryBtn}
                  >
                    Apply via WhatsApp
                  </a>
                  <a href="/contact" className={styles.secondaryBtn}>
                    Contact Us
                  </a>
                </div>
              </div>

              <div className={styles.applicationImage}>
                <div className={styles.contactCard}>
                  <h3>Get Started Today</h3>
                  <div className={styles.contactInfo}>
                    <p><strong>Phone:</strong> +971 58 553 1029</p>
                    <p><strong>Email:</strong> info@nexustechhub.ae</p>
                    <p><strong>Address:</strong> FAMC3062, Compass Building<br />
                       Al Shohada Road, AL Hamra Industrial Zone-FZ<br />
                       Ras Al Khaimah, United Arab Emirates</p>
                  </div>
                  <div className={styles.businessHours}>
                    <h4>Business Hours:</h4>
                    <p>Sunday - Thursday: 9:00 AM - 6:00 PM<br />
                       Friday - Saturday: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </ErrorBoundary>
  );
}
