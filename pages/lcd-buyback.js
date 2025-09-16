import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '../nexus-techhub-fresh/components/Layout/Layout';
import styles from '../styles/LcdBuyback.module.css';

export default function LcdBuyback() {
  const [formData, setFormData] = useState({
    deviceType: '',
    deviceModel: '',
    condition: '',
    screenSize: '',
    hasCracks: false,
    hasDeadPixels: false,
    hasBacklightIssues: false,
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    additionalNotes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const deviceTypes = [
    'iPhone',
    'Samsung Galaxy',
    'iPad',
    'Other Android',
    'Other'
  ];

  const conditions = [
    { value: 'excellent', label: 'Excellent - Like New', description: 'No scratches, perfect working condition' },
    { value: 'good', label: 'Good - Minor Wear', description: 'Light scratches, fully functional' },
    { value: 'fair', label: 'Fair - Noticeable Wear', description: 'Visible scratches, still functional' },
    { value: 'poor', label: 'Poor - Heavy Damage', description: 'Heavy scratches, may have issues' }
  ];

  if (submitted) {
    return (
      <Layout
        title="LCD Buyback - Thank You"
        description="Thank you for your LCD buyback submission. We'll get back to you soon with an offer."
      >
        <div className={styles.thankYouPage}>
          <div className="container">
            <div className={styles.thankYouContent}>
              <div className={styles.successIcon}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22,4 12,14.01 9,11.01"></polyline>
                </svg>
              </div>
              <h1>Thank You for Your Submission!</h1>
              <p>We've received your LCD buyback request and will review it within 24 hours.</p>
              <p>Our team will contact you with a competitive offer based on your device's condition and market value.</p>

              <div className={styles.nextSteps}>
                <h3>What happens next?</h3>
                <ul>
                  <li>Our experts will evaluate your submission</li>
                  <li>We'll send you a competitive offer via email/phone</li>
                  <li>If you accept, we'll arrange secure shipping</li>
                  <li>You'll receive payment once we receive and verify your device</li>
                </ul>
              </div>

              <div className={styles.actions}>
                <Link href="/" className="btn btn-primary">
                  Return to Home
                </Link>
                <Link href="/products" className="btn btn-secondary">
                  Browse Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title="LCD Buyback Program - Get Cash for Your Old Screens"
      description="Sell your used LCD screens and get competitive prices. We buy iPhone, Samsung, iPad screens and more."
    >
      <div className={styles.lcdBuybackPage}>
        <div className="container">
          {/* Hero Section */}
          <div className={styles.heroSection}>
            <h1>LCD Buyback Program</h1>
            <p>Get competitive prices for your used LCD screens. We buy iPhone, Samsung, iPad screens and more!</p>
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>Best Prices</span>
                <span className={styles.statLabel}>Competitive offers</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>Fast Payment</span>
                <span className={styles.statLabel}>Quick processing</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>Secure Shipping</span>
                <span className={styles.statLabel}>Free prepaid labels</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className={styles.mainContent}>
            <div className={styles.formSection}>
              <h2>Sell Your LCD Screen</h2>
              <p>Fill out the form below and get an instant quote for your used LCD screen.</p>

              <form onSubmit={handleSubmit} className={styles.buybackForm}>
                {/* Device Information */}
                <div className={styles.formGroup}>
                  <h3>Device Information</h3>

                  <div className={styles.formRow}>
                    <div className={styles.formField}>
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

                    <div className={styles.formField}>
                      <label htmlFor="deviceModel">Device Model *</label>
                      <input
                        type="text"
                        id="deviceModel"
                        name="deviceModel"
                        value={formData.deviceModel}
                        onChange={handleInputChange}
                        placeholder="e.g., iPhone 14 Pro, Galaxy S23"
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formField}>
                      <label htmlFor="screenSize">Screen Size</label>
                      <input
                        type="text"
                        id="screenSize"
                        name="screenSize"
                        value={formData.screenSize}
                        onChange={handleInputChange}
                        placeholder="e.g., 6.1 inch, 6.7 inch"
                      />
                    </div>

                    <div className={styles.formField}>
                      <label>Screen Condition *</label>
                      <div className={styles.conditionOptions}>
                        {conditions.map(condition => (
                          <label key={condition.value} className={styles.conditionOption}>
                            <input
                              type="radio"
                              name="condition"
                              value={condition.value}
                              checked={formData.condition === condition.value}
                              onChange={handleInputChange}
                              required
                            />
                            <div className={styles.conditionContent}>
                              <span className={styles.conditionLabel}>{condition.label}</span>
                              <span className={styles.conditionDescription}>{condition.description}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Screen Issues */}
                <div className={styles.formGroup}>
                  <h3>Screen Issues (Check all that apply)</h3>
                  <div className={styles.checkboxGroup}>
                    <label className={styles.checkbox}>
                      <input
                        type="checkbox"
                        name="hasCracks"
                        checked={formData.hasCracks}
                        onChange={handleInputChange}
                      />
                      <span>Cracks or scratches</span>
                    </label>

                    <label className={styles.checkbox}>
                      <input
                        type="checkbox"
                        name="hasDeadPixels"
                        checked={formData.hasDeadPixels}
                        onChange={handleInputChange}
                      />
                      <span>Dead pixels or spots</span>
                    </label>

                    <label className={styles.checkbox}>
                      <input
                        type="checkbox"
                        name="hasBacklightIssues"
                        checked={formData.hasBacklightIssues}
                        onChange={handleInputChange}
                      />
                      <span>Backlight or brightness issues</span>
                    </label>
                  </div>
                </div>

                {/* Contact Information */}
                <div className={styles.formGroup}>
                  <h3>Contact Information</h3>

                  <div className={styles.formRow}>
                    <div className={styles.formField}>
                      <label htmlFor="contactName">Full Name *</label>
                      <input
                        type="text"
                        id="contactName"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className={styles.formField}>
                      <label htmlFor="contactEmail">Email Address *</label>
                      <input
                        type="email"
                        id="contactEmail"
                        name="contactEmail"
                        value={formData.contactEmail}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formField}>
                      <label htmlFor="contactPhone">Phone Number *</label>
                      <input
                        type="tel"
                        id="contactPhone"
                        name="contactPhone"
                        value={formData.contactPhone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Notes */}
                <div className={styles.formGroup}>
                  <label htmlFor="additionalNotes">Additional Notes</label>
                  <textarea
                    id="additionalNotes"
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleInputChange}
                    placeholder="Any additional information about your screen's condition, original packaging, etc."
                    rows="4"
                  />
                </div>

                {/* Submit Button */}
                <div className={styles.formActions}>
                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={loading}
                  >
                    {loading ? 'Submitting...' : 'Get My Quote'}
                  </button>
                  <p className={styles.disclaimer}>
                    By submitting this form, you agree to our terms and conditions.
                    We'll contact you within 24 hours with a competitive offer.
                  </p>
                </div>
              </form>
            </div>

            {/* Info Section */}
            <div className={styles.infoSection}>
              <div className={styles.infoCard}>
                <h3>Why Choose Our LCD Buyback?</h3>
                <ul>
                  <li>Competitive prices based on current market value</li>
                  <li>Fast and secure payment processing</li>
                  <li>Free prepaid shipping labels</li>
                  <li>Expert evaluation by certified technicians</li>
                  <li>Environmentally responsible recycling</li>
                </ul>
              </div>

              <div className={styles.infoCard}>
                <h3>What We Buy</h3>
                <div className={styles.deviceList}>
                  <div className={styles.deviceCategory}>
                    <h4>iPhone Screens</h4>
                    <p>All models from iPhone 6 to iPhone 15</p>
                  </div>
                  <div className={styles.deviceCategory}>
                    <h4>Samsung Screens</h4>
                    <p>Galaxy S, Note, A, and Z series</p>
                  </div>
                  <div className={styles.deviceCategory}>
                    <h4>iPad Screens</h4>
                    <p>All iPad models and sizes</p>
                  </div>
                  <div className={styles.deviceCategory}>
                    <h4>Other Devices</h4>
                    <p>Various Android and other brands</p>
                  </div>
                </div>
              </div>

              <div className={styles.infoCard}>
                <h3>Need Help?</h3>
                <p>Have questions about our LCD buyback program?</p>
                <div className={styles.contactInfo}>
                  <p><strong>Phone:</strong> +971 58 553 1029</p>
                  <p><strong>Email:</strong> info@nexustechhub.ae</p>
                  <p><strong>WhatsApp:</strong> Available 24/7</p>
                </div>
                <Link href="/contact" className="btn btn-secondary">
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
