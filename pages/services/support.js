import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '../../nexus-techhub-fresh/components/Layout/Layout';
import styles from '../../styles/Support.module.css';

export default function Support() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const supportCategories = [
    { id: 'all', name: 'All Topics', icon: '📚' },
    { id: 'repair-guides', name: 'Repair Guides', icon: '🔧' },
    { id: 'troubleshooting', name: 'Troubleshooting', icon: '🔍' },
    { id: 'warranty', name: 'Warranty & Returns', icon: '🛡️' },
    { id: 'shipping', name: 'Shipping & Tracking', icon: '📦' },
    { id: 'technical', name: 'Technical Support', icon: '💻' }
  ];

  const faqs = [
    {
      category: 'repair-guides',
      question: 'How do I replace an iPhone screen?',
      answer: 'Our comprehensive repair guides provide step-by-step instructions for screen replacement. Always use proper tools and follow safety precautions.',
      tags: ['iphone', 'screen', 'repair']
    },
    {
      category: 'repair-guides',
      question: 'What tools do I need for Samsung battery replacement?',
      answer: 'You\'ll need precision screwdrivers, plastic pry tools, and a heat gun. Check our repair tools section for complete kits.',
      tags: ['samsung', 'battery', 'tools']
    },
    {
      category: 'troubleshooting',
      question: 'Why won\'t my replacement screen turn on?',
      answer: 'Common issues include faulty connectors, damaged flex cables, or compatibility problems. Check our troubleshooting guide for detailed solutions.',
      tags: ['screen', 'power', 'connectors']
    },
    {
      category: 'warranty',
      question: 'What\'s covered under your 30-day warranty?',
      answer: 'Our warranty covers manufacturing defects and functionality issues. Physical damage from misuse is not covered.',
      tags: ['warranty', 'defects', 'coverage']
    },
    {
      category: 'shipping',
      question: 'How long does international shipping take?',
      answer: 'Standard shipping takes 7-14 business days. Express shipping is available for urgent orders with 3-5 business day delivery.',
      tags: ['shipping', 'international', 'delivery']
    },
    {
      category: 'technical',
      question: 'Do you provide repair training?',
      answer: 'Yes! We offer comprehensive repair training programs for beginners and advanced technicians. Contact us for course details.',
      tags: ['training', 'courses', 'certification']
    }
  ];

  const quickLinks = [
    { name: 'Download Repair Manuals', path: '/downloads', icon: '📄' },
    { name: 'Video Tutorials', path: '/tutorials', icon: '🎥' },
    { name: 'Parts Compatibility', path: '/compatibility', icon: '🔗' },
    { name: 'Contact Technical Support', path: '/contact', icon: '📞' }
  ];

  const contactMethods = [
    {
      method: 'Live Chat',
      description: 'Get instant help from our technical team',
      icon: '💬',
      availability: '24/7 Available',
      action: 'Start Chat'
    },
    {
      method: 'WhatsApp Support',
      description: 'Quick responses for urgent inquiries',
      icon: '📱',
      availability: 'Mon-Fri 9AM-6PM',
      action: 'Send Message'
    },
    {
      method: 'Email Support',
      description: 'Detailed technical questions and guides',
      icon: '✉️',
      availability: 'Response within 24 hours',
      action: 'Send Email'
    },
    {
      method: 'Phone Support',
      description: 'Speak directly with our experts',
      icon: '📞',
      availability: 'Mon-Fri 9AM-6PM',
      action: 'Call Now'
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <Layout
      title="Technical Support - Nexus Tech Hub | Repair Guides & Troubleshooting"
      description="Get expert technical support for mobile device repairs. Access repair guides, troubleshooting tips, and contact our technical team."
    >
      <div className={styles.supportPage}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span className={styles.separator}>/</span>
          <Link href="/services">Services</Link>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>Technical Support</span>
        </div>

        {/* Header */}
        <div className={styles.header}>
          <h1>Technical Support Center</h1>
          <p>Get expert help with your mobile device repairs</p>
        </div>

        {/* Search and Filter */}
        <div className={styles.searchSection}>
          <div className={styles.searchContainer}>
            <div className={styles.searchBar}>
              <input
                type="text"
                placeholder="Search FAQs, guides, and troubleshooting..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              <button className={styles.searchBtn}>🔍</button>
            </div>

            <div className={styles.categoryFilters}>
              {supportCategories.map(category => (
                <button
                  key={category.id}
                  className={`${styles.categoryBtn} ${selectedCategory === category.id ? styles.active : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span className={styles.categoryIcon}>{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className={styles.quickLinks}>
          <h2>Quick Access</h2>
          <div className={styles.linksGrid}>
            {quickLinks.map((link, index) => (
              <Link key={index} href={link.path} className={styles.quickLink}>
                <span className={styles.linkIcon}>{link.icon}</span>
                <div className={styles.linkContent}>
                  <h3>{link.name}</h3>
                  <span className={styles.linkArrow}>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className={styles.faqSection}>
          <h2>Frequently Asked Questions</h2>

          {filteredFaqs.length === 0 ? (
            <div className={styles.noResults}>
              <p>No results found for your search. Try different keywords or browse all categories.</p>
              <button
                className={styles.resetBtn}
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className={styles.faqGrid}>
              {filteredFaqs.map((faq, index) => (
                <div key={index} className={styles.faqItem}>
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                  <div className={styles.faqTags}>
                    {faq.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contact Methods */}
        <div className={styles.contactSection}>
          <h2>Contact Our Technical Team</h2>
          <p>Can't find what you're looking for? Our experts are here to help.</p>

          <div className={styles.contactGrid}>
            {contactMethods.map((method, index) => (
              <div key={index} className={styles.contactCard}>
                <div className={styles.contactIcon}>{method.icon}</div>
                <div className={styles.contactContent}>
                  <h3>{method.method}</h3>
                  <p>{method.description}</p>
                  <div className={styles.availability}>{method.availability}</div>
                  <button className={styles.contactBtn}>
                    {method.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Resources */}
        <div className={styles.resourcesSection}>
          <h2>Popular Resources</h2>
          <div className={styles.resourcesGrid}>
            <div className={styles.resourceCard}>
              <h3>📖 Repair Manuals</h3>
              <p>Step-by-step guides for common repairs</p>
              <Link href="/downloads" className={styles.resourceLink}>
                Download Now →
              </Link>
            </div>
            <div className={styles.resourceCard}>
              <h3>🎥 Video Tutorials</h3>
              <p>Visual guides for complex repairs</p>
              <Link href="/tutorials" className={styles.resourceLink}>
                Watch Videos →
              </Link>
            </div>
            <div className={styles.resourceCard}>
              <h3>🔧 Tools Guide</h3>
              <p>Essential tools for every repair</p>
              <Link href="/products/repair-tools" className={styles.resourceLink}>
                Shop Tools →
              </Link>
            </div>
            <div className={styles.resourceCard}>
              <h3>📋 Compatibility Chart</h3>
              <p>Find the right parts for your device</p>
              <Link href="/compatibility" className={styles.resourceLink}>
                Check Compatibility →
              </Link>
            </div>
          </div>
        </div>

        {/* Service Hours */}
        <div className={styles.hoursSection}>
          <h2>Support Hours</h2>
          <div className={styles.hoursGrid}>
            <div className={styles.hoursCard}>
              <h3>🕒 Live Chat & WhatsApp</h3>
              <p>Monday - Friday: 9:00 AM - 6:00 PM GST</p>
              <p>Saturday: 10:00 AM - 4:00 PM GST</p>
              <p>Sunday: Closed</p>
            </div>
            <div className={styles.hoursCard}>
              <h3>📞 Phone Support</h3>
              <p>Monday - Friday: 9:00 AM - 6:00 PM GST</p>
              <p>Saturday: 10:00 AM - 4:00 PM GST</p>
              <p>Sunday: Emergency only</p>
            </div>
            <div className={styles.hoursCard}>
              <h3>✉️ Email Support</h3>
              <p>24/7 Email reception</p>
              <p>Response within 24 hours</p>
              <p>48 hours for complex issues</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
