import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import styles from '../styles/Shipping.module.css';

export default function Shipping() {
  const shippingOptions = [
    {
      method: 'Standard Shipping',
      time: '7-14 business days',
      cost: 'Free on orders $500+',
      description: 'Economic shipping for non-urgent orders',
      features: ['Free insurance', 'Tracking included', 'Door-to-door delivery']
    },
    {
      method: 'Express Shipping',
      time: '3-5 business days',
      cost: '$25-$75 depending on destination',
      description: 'Fast delivery for urgent repair needs',
      features: ['Priority handling', 'Real-time tracking', 'Express customs clearance']
    },
    {
      method: 'Overnight Shipping',
      time: '1-2 business days',
      cost: '$75-$150 depending on destination',
      description: 'Emergency shipping for critical repairs',
      features: ['Same-day pickup', 'Dedicated courier', 'Premium insurance']
    }
  ];

  const shippingZones = [
    {
      zone: 'Middle East & GCC',
      countries: ['UAE', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Oman', 'Bahrain'],
      standard: '3-7 days',
      express: '1-3 days',
      freeShipping: '$300'
    },
    {
      zone: 'Europe',
      countries: ['UK', 'Germany', 'France', 'Italy', 'Spain', 'Netherlands'],
      standard: '5-10 days',
      express: '2-5 days',
      freeShipping: '$500'
    },
    {
      zone: 'North America',
      countries: ['USA', 'Canada', 'Mexico'],
      standard: '7-14 days',
      express: '3-7 days',
      freeShipping: '$750'
    },
    {
      zone: 'Asia Pacific',
      countries: ['Australia', 'Japan', 'South Korea', 'Singapore', 'Malaysia'],
      standard: '7-14 days',
      express: '3-7 days',
      freeShipping: '$500'
    }
  ];

  const faqs = [
    {
      question: 'How long does shipping take?',
      answer: 'Shipping times vary by destination and service level. Standard shipping takes 7-14 days, express takes 3-5 days, and overnight shipping takes 1-2 days.'
    },
    {
      question: 'Do you offer free shipping?',
      answer: 'Yes! We offer free standard shipping on orders over $500. Express and overnight shipping have minimum order requirements for free shipping.'
    },
    {
      question: 'How can I track my order?',
      answer: 'Once your order ships, you will receive a tracking number via email. You can use this number on our website or the carrier\'s website to track your package in real-time.'
    },
    {
      question: 'What if my package is damaged during shipping?',
      answer: 'All shipments are fully insured. If your package arrives damaged, contact us immediately with photos and we will arrange for a replacement or full refund.'
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship worldwide to over 50 countries. International shipping costs and delivery times vary by destination.'
    },
    {
      question: 'What are the shipping costs?',
      answer: 'Shipping costs depend on weight, destination, and service level. You can see exact costs during checkout before placing your order.'
    }
  ];

  return (
    <Layout
      title="Shipping Information - Nexus Tech Hub | Delivery Options & Tracking"
      description="Learn about our shipping options, delivery times, and tracking information for mobile repair parts worldwide."
    >
      <div className={styles.shippingPage}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>Shipping Information</span>
        </div>

        {/* Header */}
        <div className={styles.header}>
          <h1>Shipping Information</h1>
          <p>Fast, reliable delivery worldwide for your mobile repair parts</p>
        </div>

        {/* Shipping Options */}
        <div className={styles.shippingOptions}>
          <div className={styles.container}>
            <h2>Shipping Options</h2>
            <div className={styles.optionsGrid}>
              {shippingOptions.map((option, index) => (
                <div key={index} className={styles.optionCard}>
                  <div className={styles.optionHeader}>
                    <h3>{option.method}</h3>
                    <div className={styles.deliveryTime}>{option.time}</div>
                  </div>
                  <div className={styles.optionCost}>{option.cost}</div>
                  <p className={styles.optionDescription}>{option.description}</p>
                  <ul className={styles.optionFeatures}>
                    {option.features.map((feature, idx) => (
                      <li key={idx}>✓ {feature}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Shipping Zones */}
        <div className={styles.shippingZones}>
          <div className={styles.container}>
            <h2>Shipping Zones & Delivery Times</h2>
            <div className={styles.zonesTable}>
              <div className={styles.tableHeader}>
                <div>Zone</div>
                <div>Countries</div>
                <div>Standard</div>
                <div>Express</div>
                <div>Free Shipping</div>
              </div>
              {shippingZones.map((zone, index) => (
                <div key={index} className={styles.tableRow}>
                  <div className={styles.zoneName}>{zone.zone}</div>
                  <div className={styles.zoneCountries}>
                    {zone.countries.join(', ')}
                  </div>
                  <div>{zone.standard}</div>
                  <div>{zone.express}</div>
                  <div>${zone.freeShipping}+</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Processing */}
        <div className={styles.processingSection}>
          <div className={styles.container}>
            <h2>Order Processing & Shipping</h2>
            <div className={styles.processingGrid}>
              <div className={styles.processingStep}>
                <div className={styles.stepNumber}>1</div>
                <h3>Order Confirmation</h3>
                <p>You receive an email confirmation within minutes of placing your order.</p>
              </div>
              <div className={styles.processingStep}>
                <div className={styles.stepNumber}>2</div>
                <h3>Quality Check</h3>
                <p>Each item is inspected and tested before packing (1-2 business days).</p>
              </div>
              <div className={styles.processingStep}>
                <div className={styles.stepNumber}>3</div>
                <h3>Shipping</h3>
                <p>Your order ships with tracking information sent via email.</p>
              </div>
              <div className={styles.processingStep}>
                <div className={styles.stepNumber}>4</div>
                <h3>Delivery</h3>
                <p>Package delivered to your door with signature confirmation.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Customs & Duties */}
        <div className={styles.customsSection}>
          <div className={styles.container}>
            <h2>Customs & Import Duties</h2>
            <div className={styles.customsGrid}>
              <div className={styles.customsInfo}>
                <h3>International Shipping</h3>
                <p>
                  For international orders, customers are responsible for any customs duties,
                  taxes, or import fees that may apply in their country. These fees vary by
                  destination and are not included in our shipping costs.
                </p>
                <p>
                  We provide all necessary documentation to help clear customs efficiently.
                  Most orders pass through customs without issues, but delays can occur during
                  peak seasons.
                </p>
              </div>
              <div className={styles.customsTips}>
                <h3>Customs Clearance Tips</h3>
                <ul>
                  <li>Provide accurate shipping address and contact information</li>
                  <li>Include business purpose for commercial shipments</li>
                  <li>Keep order documentation for customs reference</li>
                  <li>Contact us if your order is delayed at customs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className={styles.faqSection}>
          <div className={styles.container}>
            <h2>Shipping FAQs</h2>
            <div className={styles.faqGrid}>
              {faqs.map((faq, index) => (
                <div key={index} className={styles.faqItem}>
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className={styles.contactSection}>
          <div className={styles.container}>
            <h2>Need Help with Shipping?</h2>
            <p>Our shipping specialists are here to help with any questions about your order.</p>
            <div className={styles.contactOptions}>
              <div className={styles.contactCard}>
                <h3>📧 Email Support</h3>
                <p>shipping@nexustechhub.com</p>
                <p>Response within 24 hours</p>
              </div>
              <div className={styles.contactCard}>
                <h3>📞 Phone Support</h3>
                <p>+971 50 123 4567</p>
                <p>Mon-Fri 9AM-6PM GST</p>
              </div>
              <div className={styles.contactCard}>
                <h3>💬 Live Chat</h3>
                <p>Available on website</p>
                <p>Mon-Fri 9AM-6PM GST</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
