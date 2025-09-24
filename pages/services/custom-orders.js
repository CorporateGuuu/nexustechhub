import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import styles from '../../styles/CustomOrders.module.css';

export default function CustomOrders() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    deviceType: '',
    deviceModel: '',
    quantity: '',
    specifications: '',
    deadline: '',
    budget: '',
    specialRequirements: ''
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
        company: '',
        deviceType: '',
        deviceModel: '',
        quantity: '',
        specifications: '',
        deadline: '',
        budget: '',
        specialRequirements: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const deviceTypes = [
    'iPhone',
    'Samsung Galaxy',
    'iPad',
    'Other Mobile Devices',
    'Repair Tools',
    'Accessories'
  ];

  const benefits = [
    {
      icon: '🎯',
      title: 'Custom Specifications',
      description: 'Get exactly what you need with parts made to your specifications'
    },
    {
      icon: '⚡',
      title: 'Fast Turnaround',
      description: 'Expedited production and shipping for urgent requirements'
    },
    {
      icon: '💰',
      title: 'Competitive Pricing',
      description: 'Bulk discounts and volume pricing for large orders'
    },
    {
      icon: '🛡️',
      title: 'Quality Guarantee',
      description: 'Same high-quality standards as our standard products'
    },
    {
      icon: '📞',
      title: 'Dedicated Support',
      description: 'Personal account manager for your custom orders'
    },
    {
      icon: '🚚',
      title: 'Global Shipping',
      description: 'Worldwide delivery with tracking and insurance'
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Submit Request',
      description: 'Fill out our custom order form with your specifications'
    },
    {
      step: '02',
      title: 'Quote & Review',
      description: 'Receive detailed quote and timeline within 24 hours'
    },
    {
      step: '03',
      title: 'Approval & Payment',
      description: 'Review and approve quote, make secure payment'
    },
    {
      step: '04',
      title: 'Production',
      description: 'Custom parts manufactured to your specifications'
    },
    {
      step: '05',
      title: 'Quality Check',
      description: 'Rigorous testing and quality assurance'
    },
    {
      step: '06',
      title: 'Delivery',
      description: 'Fast shipping with tracking and insurance'
    }
  ];

  const testimonials = [
    {
      name: 'Ahmed Hassan',
      company: 'Dubai Mobile Solutions',
      quote: 'Nexus Tech Hub delivered exactly what we needed for our custom iPhone parts order. The quality was outstanding and delivery was on time.',
      rating: 5
    },
    {
      name: 'Maria Rodriguez',
      company: 'Barcelona Repair Center',
      quote: 'Their custom Samsung parts exceeded our expectations. Professional service and great communication throughout the process.',
      rating: 5
    },
    {
      name: 'James Wilson',
      company: 'London Tech Repairs',
      quote: 'Reliable partner for our bulk repair tool orders. Always deliver on time with consistent quality.',
      rating: 5
    }
  ];

  return (
    <Layout
      title="Custom Orders - Nexus Tech Hub | Bespoke Mobile Repair Parts"
      description="Order custom mobile repair parts and tools. Bulk orders, special specifications, and personalized solutions for repair professionals."
    >
      <div className={styles.customOrdersPage}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span className={styles.separator}>/</span>
          <Link href="/services">Services</Link>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>Custom Orders</span>
        </div>

        {/* Header */}
        <div className={styles.header}>
          <h1>Custom Orders</h1>
          <p>Get bespoke mobile repair parts and tools made to your exact specifications</p>
        </div>

        {/* Benefits Section */}
        <div className={styles.benefitsSection}>
          <div className={styles.container}>
            <h2>Why Choose Custom Orders?</h2>
            <div className={styles.benefitsGrid}>
              {benefits.map((benefit, index) => (
                <div key={index} className={styles.benefitCard}>
                  <div className={styles.benefitIcon}>{benefit.icon}</div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div className={styles.processSection}>
          <div className={styles.container}>
            <h2>How It Works</h2>
            <div className={styles.processGrid}>
              {processSteps.map((step, index) => (
                <div key={index} className={styles.processCard}>
                  <div className={styles.stepNumber}>{step.step}</div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Form */}
        <div className={styles.formSection}>
          <div className={styles.container}>
            <div className={styles.formContainer}>
              <h2>Request Custom Quote</h2>
              <p>Fill out the form below and we'll get back to you with a detailed quote within 24 hours.</p>

              {submitStatus === 'success' && (
                <div className={styles.successMessage}>
                  ✅ Thank you! Your custom order request has been submitted successfully.
                  Our team will contact you within 24 hours with a detailed quote.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className={styles.errorMessage}>
                  ❌ Sorry, there was an error submitting your request. Please try again or contact us directly.
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className={styles.formGrid}>
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
                      placeholder="your.email@company.com"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="+971 XX XXX XXXX"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="company">Company Name</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Your company name"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="deviceType">Device Type *</label>
                    <select
                      id="deviceType"
                      name="deviceType"
                      value={formData.deviceType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select device type</option>
                      {deviceTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="deviceModel">Device Model *</label>
                    <input
                      type="text"
                      id="deviceModel"
                      name="deviceModel"
                      value={formData.deviceModel}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., iPhone 15 Pro, Galaxy S24 Ultra"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="quantity">Quantity *</label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      required
                      min="1"
                      placeholder="Minimum order quantity"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="deadline">Required By</label>
                    <input
                      type="date"
                      id="deadline"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="budget">Budget Range</label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                    >
                      <option value="">Select budget range</option>
                      <option value="under-500">Under $500</option>
                      <option value="500-2000">$500 - $2,000</option>
                      <option value="2000-5000">$2,000 - $5,000</option>
                      <option value="5000-10000">$5,000 - $10,000</option>
                      <option value="over-10000">Over $10,000</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="specifications">Detailed Specifications *</label>
                  <textarea
                    id="specifications"
                    name="specifications"
                    value={formData.specifications}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    placeholder="Please provide detailed specifications for your custom parts..."
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="specialRequirements">Special Requirements</label>
                  <textarea
                    id="specialRequirements"
                    name="specialRequirements"
                    value={formData.specialRequirements}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Any special requirements, certifications, or customizations..."
                  />
                </div>

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Request Quote'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className={styles.testimonialsSection}>
          <div className={styles.container}>
            <h2>What Our Customers Say</h2>
            <div className={styles.testimonialsGrid}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className={styles.testimonialCard}>
                  <div className={styles.rating}>
                    {'★'.repeat(testimonial.rating)}
                  </div>
                  <blockquote>{testimonial.quote}</blockquote>
                  <div className={styles.testimonialAuthor}>
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.company}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className={styles.faqSection}>
          <div className={styles.container}>
            <h2>Custom Order FAQs</h2>
            <div className={styles.faqGrid}>
              <div className={styles.faqItem}>
                <h4>What's the minimum order quantity?</h4>
                <p>Minimum order quantities vary by product type. Contact us for specific MOQs for your requirements.</p>
              </div>
              <div className={styles.faqItem}>
                <h4>How long does custom production take?</h4>
                <p>Production time depends on complexity and quantity. Most custom orders are completed within 2-4 weeks.</p>
              </div>
              <div className={styles.faqItem}>
                <h4>Do you offer samples?</h4>
                <p>Yes, we can provide samples for quality approval before full production begins.</p>
              </div>
              <div className={styles.faqItem}>
                <h4>What's your payment terms?</h4>
                <p>We require 50% deposit for custom orders, with balance due before shipping.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={styles.ctaSection}>
          <div className={styles.container}>
            <div className={styles.ctaContent}>
              <h2>Ready to Get Started?</h2>
              <p>Contact our sales team for immediate assistance with your custom order requirements.</p>
              <div className={styles.ctaButtons}>
                <Link href="/contact" className={styles.primaryBtn}>
                  Contact Sales
                </Link>
                <a
                  href="https://wa.me/971501234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.secondaryBtn}
                >
                  WhatsApp Chat
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
