import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import styles from '../styles/FAQ.module.css';

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('general');
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const categories = [
    { id: 'general', name: 'General', icon: '📋' },
    { id: 'orders', name: 'Orders & Payment', icon: '🛒' },
    { id: 'shipping', name: 'Shipping & Delivery', icon: '📦' },
    { id: 'returns', name: 'Returns & Warranty', icon: '↩️' },
    { id: 'products', name: 'Products & Parts', icon: '🔧' },
    { id: 'technical', name: 'Technical Support', icon: '💻' }
  ];

  const faqs = {
    general: [
      {
        id: 'what-is-nexus',
        question: 'What is Nexus Tech Hub?',
        answer: 'Nexus Tech Hub is a leading supplier of mobile device repair parts, tools, and accessories. We specialize in providing high-quality components for iPhone, Samsung, iPad, and other mobile devices to professional repair technicians worldwide.'
      },
      {
        id: 'who-can-buy',
        question: 'Who can purchase from Nexus Tech Hub?',
        answer: 'We serve professional repair technicians, repair shops, wholesalers, and businesses in the mobile repair industry. We also welcome individual technicians and hobbyists who need quality repair parts.'
      },
      {
        id: 'where-do-you-ship',
        question: 'Where do you ship?',
        answer: 'We ship worldwide to over 50 countries. Our main markets include the Middle East, Europe, Asia, North America, and Australia. Contact us for specific shipping options to your location.'
      },
      {
        id: 'business-hours',
        question: 'What are your business hours?',
        answer: 'Our customer service team is available Monday through Friday from 9:00 AM to 6:00 PM GST. Technical support is available 24/7 through our online portal. Emergency support is available for urgent repair needs.'
      }
    ],
    orders: [
      {
        id: 'how-to-order',
        question: 'How do I place an order?',
        answer: 'You can place an order by browsing our products, adding items to your cart, and proceeding to checkout. You can also contact our sales team directly for bulk orders or custom requirements.'
      },
      {
        id: 'payment-methods',
        question: 'What payment methods do you accept?',
        answer: 'We accept major credit cards (Visa, MasterCard, American Express), PayPal, bank transfers, and wire transfers. For large orders, we also offer net terms for approved customers.'
      },
      {
        id: 'order-confirmation',
        question: 'How do I know my order was received?',
        answer: 'You will receive an order confirmation email immediately after placing your order. Our team will also contact you within 24 hours to confirm details and provide any updates.'
      },
      {
        id: 'minimum-order',
        question: 'Is there a minimum order requirement?',
        answer: 'There is no minimum order for standard products. However, custom orders may have minimum quantity requirements based on specifications. Contact our sales team for details.'
      },
      {
        id: 'bulk-discounts',
        question: 'Do you offer bulk discounts?',
        answer: 'Yes, we offer volume discounts for bulk orders. The discount percentage increases with order quantity. Contact our sales team for a personalized quote.'
      }
    ],
    shipping: [
      {
        id: 'shipping-costs',
        question: 'How much does shipping cost?',
        answer: 'Shipping costs vary based on destination, weight, and shipping method. We offer free shipping on orders over $500. Express shipping options are available for urgent orders.'
      },
      {
        id: 'delivery-time',
        question: 'How long does delivery take?',
        answer: 'Standard shipping takes 7-14 business days. Express shipping takes 3-5 business days. Delivery times may vary during peak seasons or due to customs processing.'
      },
      {
        id: 'track-order',
        question: 'How can I track my order?',
        answer: 'Once your order ships, you will receive a tracking number via email. You can use this number on our website or the carrier\'s website to track your package in real-time.'
      },
      {
        id: 'international-shipping',
        question: 'Do you ship internationally?',
        answer: 'Yes, we ship to most countries worldwide. International shipping costs and delivery times vary by destination. Additional customs fees may apply for some countries.'
      },
      {
        id: 'customs-delays',
        question: 'What if my order is delayed by customs?',
        answer: 'Customs processing can sometimes cause delays. We will keep you updated on the status. We are not responsible for customs delays or additional fees imposed by destination countries.'
      }
    ],
    returns: [
      {
        id: 'return-policy',
        question: 'What is your return policy?',
        answer: 'We accept returns within 30 days of purchase for unused items in original packaging. Return shipping costs are the responsibility of the buyer unless the item is defective or we made an error.'
      },
      {
        id: 'warranty-coverage',
        question: 'What does your warranty cover?',
        answer: 'Our 30-day warranty covers manufacturing defects and functionality issues. Warranty does not cover physical damage, water damage, misuse, or unauthorized modifications.'
      },
      {
        id: 'how-to-return',
        question: 'How do I return an item?',
        answer: 'Contact our customer service team to initiate a return. We will provide a return authorization number and shipping instructions. All returns must be properly packaged.'
      },
      {
        id: 'refund-process',
        question: 'How long does a refund take?',
        answer: 'Once we receive your return, refunds are processed within 3-5 business days. The time for the refund to appear in your account depends on your payment method and bank.'
      },
      {
        id: 'damaged-items',
        question: 'What if my item arrives damaged?',
        answer: 'If your item arrives damaged, contact us immediately with photos of the damage and packaging. We will arrange for a replacement or full refund at no cost to you.'
      }
    ],
    products: [
      {
        id: 'product-quality',
        question: 'What is the quality of your products?',
        answer: 'All our products are sourced from reputable manufacturers and undergo quality testing before shipping. We offer OEM-equivalent parts with 30-day warranty coverage.'
      },
      {
        id: 'compatibility',
        question: 'How do I know if a part is compatible?',
        answer: 'Each product listing includes compatibility information. If you\'re unsure about compatibility, contact our technical support team for assistance.'
      },
      {
        id: 'out-of-stock',
        question: 'What if a product is out of stock?',
        answer: 'If a product is out of stock, you can join our waitlist for notifications when it becomes available again. We can also suggest alternative compatible parts.'
      },
      {
        id: 'custom-parts',
        question: 'Can you make custom parts?',
        answer: 'Yes, we offer custom manufacturing services for specific requirements. Contact our sales team to discuss your custom part needs and get a quote.'
      },
      {
        id: 'product-warranty',
        question: 'Do all products come with warranty?',
        answer: 'Yes, all our products come with a 30-day warranty covering manufacturing defects. Extended warranty options are available for select products.'
      }
    ],
    technical: [
      {
        id: 'repair-guides',
        question: 'Do you provide repair guides?',
        answer: 'Yes, we offer detailed repair guides and tutorials for many common repairs. Access our technical support section for guides, videos, and troubleshooting tips.'
      },
      {
        id: 'technical-support',
        question: 'What kind of technical support do you offer?',
        answer: 'Our technical support includes repair guidance, compatibility advice, troubleshooting help, and product recommendations. Support is available via chat, email, and phone.'
      },
      {
        id: 'training-programs',
        question: 'Do you offer repair training?',
        answer: 'Yes, we offer comprehensive repair training programs for beginners and advanced technicians. Programs include hands-on training, certification, and ongoing support.'
      },
      {
        id: 'part-identification',
        question: 'How do I identify the correct part for my repair?',
        answer: 'Our technical support team can help you identify the correct parts based on device model and symptoms. We also provide detailed product specifications and compatibility guides.'
      },
      {
        id: 'emergency-support',
        question: 'Do you offer emergency technical support?',
        answer: 'Yes, we provide emergency technical support for urgent repair situations. Contact our technical support team directly for immediate assistance.'
      }
    ]
  };

  const currentFaqs = faqs[activeCategory] || [];

  return (
    <Layout
      title="FAQ - Frequently Asked Questions | Nexus Tech Hub"
      description="Find answers to common questions about Nexus Tech Hub products, orders, shipping, returns, and technical support."
    >
      <div className={styles.faqPage}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>FAQ</span>
        </div>

        {/* Header */}
        <div className={styles.header}>
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to common questions about our products and services</p>
        </div>

        {/* Category Navigation */}
        <div className={styles.categoryNav}>
          <div className={styles.categoryGrid}>
            {categories.map(category => (
              <button
                key={category.id}
                className={`${styles.categoryBtn} ${activeCategory === category.id ? styles.active : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className={styles.categoryIcon}>{category.icon}</span>
                <span className={styles.categoryName}>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* FAQ List */}
        <div className={styles.faqList}>
          <div className={styles.faqContainer}>
            <h2>{categories.find(cat => cat.id === activeCategory)?.name} Questions</h2>

            {currentFaqs.map(faq => (
              <div key={faq.id} className={styles.faqItem}>
                <button
                  className={styles.faqQuestion}
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={openItems.has(faq.id)}
                >
                  <span>{faq.question}</span>
                  <span className={styles.faqToggle}>
                    {openItems.has(faq.id) ? '−' : '+'}
                  </span>
                </button>

                {openItems.has(faq.id) && (
                  <div className={styles.faqAnswer}>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Still Need Help */}
        <div className={styles.helpSection}>
          <div className={styles.helpContainer}>
            <h2>Still Need Help?</h2>
            <p>Can't find the answer you're looking for? Our support team is here to help.</p>

            <div className={styles.helpOptions}>
              <div className={styles.helpCard}>
                <h3>📞 Contact Support</h3>
                <p>Get direct assistance from our technical team</p>
                <Link href="/contact" className={styles.helpBtn}>
                  Contact Us
                </Link>
              </div>

              <div className={styles.helpCard}>
                <h3>💬 Live Chat</h3>
                <p>Chat with our support team in real-time</p>
                <button className={styles.helpBtn}>
                  Start Chat
                </button>
              </div>

              <div className={styles.helpCard}>
                <h3>📧 Email Support</h3>
                <p>Send us a detailed message about your inquiry</p>
                <a href="mailto:support@nexustechhub.com" className={styles.helpBtn}>
                  Send Email
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Topics */}
        <div className={styles.popularSection}>
          <div className={styles.popularContainer}>
            <h2>Popular Topics</h2>
            <div className={styles.popularGrid}>
              <Link href="/services/support" className={styles.popularLink}>
                <h3>Repair Guides</h3>
                <p>Step-by-step repair instructions</p>
                <span className={styles.linkArrow}>→</span>
              </Link>

              <Link href="/shipping" className={styles.popularLink}>
                <h3>Shipping Information</h3>
                <p>Delivery options and tracking</p>
                <span className={styles.linkArrow}>→</span>
              </Link>

              <Link href="/returns" className={styles.popularLink}>
                <h3>Return Policy</h3>
                <p>How to return or exchange items</p>
                <span className={styles.linkArrow}>→</span>
              </Link>

              <Link href="/services/custom-orders" className={styles.popularLink}>
                <h3>Custom Orders</h3>
                <p>Bespoke parts and bulk orders</p>
                <span className={styles.linkArrow}>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className={styles.searchSection}>
          <div className={styles.searchContainer}>
            <h2>Search All FAQs</h2>
            <p>Can't find what you're looking for? Try our search function.</p>
            <div className={styles.searchBar}>
              <input
                type="text"
                placeholder="Search FAQs..."
                className={styles.searchInput}
              />
              <button className={styles.searchBtn}>🔍 Search</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
