import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '../nexus-techhub-fresh/components/Layout/Layout';
import styles from '../styles/Contact.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: '📍',
      title: 'Location',
      details: ['Ras Al Khaimah, UAE', 'Near Dubai International Airport'],
      link: null
    },
    {
      icon: '📞',
      title: 'Phone',
      details: ['+971 50 123 4567', '+971 50 987 6543'],
      link: 'tel:+971501234567'
    },
    {
      icon: '✉️',
      title: 'Email',
      details: ['info@nexustechhub.com', 'sales@nexustechhub.com'],
      link: 'mailto:info@nexustechhub.com'
    },
    {
      icon: '🕒',
      title: 'Business Hours',
      details: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat: 10:00 AM - 4:00 PM', 'Sun: Closed'],
      link: null
    }
  ];

  const quickLinks = [
    { name: 'Products', path: '/products', icon: '🛍️' },
    { name: 'Support', path: '/services/support', icon: '🛠️' },
    { name: 'Shipping', path: '/shipping', icon: '🚚' },
    { name: 'Returns', path: '/returns', icon: '↩️' },
    { name: 'FAQ', path: '/faq', icon: '❓' }
  ];

  return (
    <Layout
      title="Contact Us - Nexus Tech Hub | Mobile Repair Parts UAE"
      description="Get in touch with Nexus Tech Hub for mobile repair parts, technical support, and wholesale inquiries. Located in Ras Al Khaimah, UAE."
    >
      <div className={styles.contactPage}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>Contact Us</span>
        </div>

        {/* Header */}
        <div className={styles.header}>
          <h1>Contact Us</h1>
          <p>Get in touch with our team for mobile repair parts, technical support, or wholesale inquiries</p>
        </div>

        <div className={styles.contactContainer}>
          {/* Contact Form */}
          <div className={styles.contactForm}>
            <h2>Send us a Message</h2>

            {submitStatus === 'success' && (
              <div className={styles.successMessage}>
                ✅ Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className={styles.errorMessage}>
                ❌ Sorry, there was an error sending your message. Please try again or contact us directly.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Your full name"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+971 XX XXX XXXX"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="inquiryType">Inquiry Type</label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                  >
                    <option value="general">General Inquiry</option>
                    <option value="sales">Sales & Pricing</option>
                    <option value="technical">Technical Support</option>
                    <option value="bulk">Bulk Order</option>
                    <option value="warranty">Warranty Claim</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  placeholder="Brief description of your inquiry"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  placeholder="Please provide details about your inquiry..."
                />
              </div>

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className={styles.contactInfo}>
            <h2>Get in Touch</h2>

            <div className={styles.infoGrid}>
              {contactInfo.map((info, index) => (
                <div key={index} className={styles.infoCard}>
                  <div className={styles.infoIcon}>{info.icon}</div>
                  <div className={styles.infoContent}>
                    <h3>{info.title}</h3>
                    {info.details.map((detail, idx) => (
                      <p key={idx}>
                        {info.link ? (
                          <a href={info.link} className={styles.contactLink}>
                            {detail}
                          </a>
                        ) : (
                          detail
                        )}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Links */}
            <div className={styles.quickLinks}>
              <h3>Quick Links</h3>
              <div className={styles.linksGrid}>
                {quickLinks.map((link, index) => (
                  <Link key={index} href={link.path} className={styles.quickLink}>
                    <span className={styles.linkIcon}>{link.icon}</span>
                    <span>{link.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* WhatsApp Contact */}
            <div className={styles.whatsappSection}>
              <h3>Chat with us on WhatsApp</h3>
              <p>For immediate assistance, send us a message on WhatsApp</p>
              <a
                href="https://wa.me/971501234567"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappBtn}
              >
                📱 Start Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className={styles.mapSection}>
          <h2>Visit Our Location</h2>
          <div className={styles.mapContainer}>
            <div className={styles.mapPlaceholder}>
              <div className={styles.mapIcon}>📍</div>
              <h3>Ras Al Khaimah, UAE</h3>
              <p>Located near Dubai International Airport</p>
              <p>Conveniently accessible for international shipping</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className={styles.faqSection}>
          <h2>Frequently Asked Questions</h2>
          <div className={styles.faqGrid}>
            <div className={styles.faqItem}>
              <h4>🚚 Do you ship internationally?</h4>
              <p>Yes, we ship worldwide with fast delivery options available.</p>
            </div>
            <div className={styles.faqItem}>
              <h4>💰 What payment methods do you accept?</h4>
              <p>We accept bank transfers, credit cards, and PayPal for your convenience.</p>
            </div>
            <div className={styles.faqItem}>
              <h4>🔧 Do you provide technical support?</h4>
              <p>Yes, our technical team is available to assist with repair guidance.</p>
            </div>
            <div className={styles.faqItem}>
              <h4>📦 What's your return policy?</h4>
              <p>We offer 30-day returns on all products with full warranty coverage.</p>
            </div>
          </div>

          <div className={styles.faqCta}>
            <Link href="/faq" className={styles.faqBtn}>
              View All FAQs
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
