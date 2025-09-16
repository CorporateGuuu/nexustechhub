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
    { value: 'excellent', label: 'Excellent - Like New', description: 'No scratches, perfect working condition', multiplier: 1.0, color: '#10b981' },
    { value: 'good', label: 'Good - Minor Wear', description: 'Light scratches, fully functional', multiplier: 0.8, color: '#3b82f6' },
    { value: 'fair', label: 'Fair - Noticeable Wear', description: 'Visible scratches, still functional', multiplier: 0.6, color: '#f59e0b' },
    { value: 'poor', label: 'Poor - Heavy Damage', description: 'Heavy scratches, may have issues', multiplier: 0.3, color: '#ef4444' }
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
        {/* Hero Section */}
        <div className={styles.heroSection}>
          <div className="container">
            <div className={styles.heroContent}>
              <div className={styles.breadcrumb}>
                <Link href="/">Home</Link>
                <span className={styles.breadcrumbSeparator}>/</span>
                <span className={styles.currentPage}>LCD Buyback</span>
              </div>

              <h1 className={styles.heroTitle}>Professional LCD Buyback Program</h1>
              <p className={styles.heroDescription}>
                Turn your used LCD screens into cash! Get competitive prices for iPhone, Samsung, and iPad displays.
                Professional evaluation, fast payment, and secure shipping worldwide.
              </p>

              <div className={styles.heroStats}>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>Best Market</div>
                  <div className={styles.statLabel}>Prices Guaranteed</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>24hr</div>
                  <div className={styles.statLabel}>Quote Response</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>Free</div>
                  <div className={styles.statLabel}>Secure Shipping</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumber}>5000+</div>
                  <div className={styles.statLabel}>Screens Bought</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          {/* Device Grading System */}
          <div className={styles.gradingSection}>
            <h2 className={styles.sectionTitle}>Device Grading System</h2>
            <p className={styles.sectionDescription}>
              Our professional grading system ensures you get the best price for your device's condition.
              All screens are evaluated by certified technicians.
            </p>

            <div className={styles.gradingGrid}>
              {conditions.map(condition => (
                <div key={condition.value} className={styles.gradeCard}>
                  <div className={styles.gradeHeader} style={{ backgroundColor: condition.color }}>
                    <h3>{condition.label.split(' - ')[0]}</h3>
                    <span className={styles.gradeMultiplier}>{condition.multiplier * 100}% Value</span>
                  </div>
                  <div className={styles.gradeContent}>
                    <p>{condition.description}</p>
                    <div className={styles.gradeExamples}>
                      <h4>Examples:</h4>
                      <ul>
                        {condition.value === 'excellent' && (
                          <>
                            <li>No visible scratches</li>
                            <li>Perfect touch response</li>
                            <li>Original brightness</li>
                          </>
                        )}
                        {condition.value === 'good' && (
                          <>
                            <li>Minor micro-scratches</li>
                            <li>Fully functional</li>
                            <li>Good brightness levels</li>
                          </>
                        )}
                        {condition.value === 'fair' && (
                          <>
                            <li>Visible scratches</li>
                            <li>Touch works properly</li>
                            <li>Acceptable brightness</li>
                          </>
                        )}
                        {condition.value === 'poor' && (
                          <>
                            <li>Heavy scratches/damage</li>
                            <li>May have dead pixels</li>
                            <li>Backlight issues possible</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Guide */}
          <div className={styles.pricingSection}>
            <h2 className={styles.sectionTitle}>Sample Pricing Guide</h2>
            <div className={styles.pricingGrid}>
              <div className={styles.pricingCard}>
                <h3>iPhone 15 Pro Max Screen</h3>
                <div className={styles.pricingTiers}>
                  <div className={styles.priceTier}>
                    <span className={styles.tierLabel}>Excellent</span>
                    <span className={styles.tierPrice}>$399</span>
                  </div>
                  <div className={styles.priceTier}>
                    <span className={styles.tierLabel}>Good</span>
                    <span className={styles.tierPrice}>$319</span>
                  </div>
                  <div className={styles.priceTier}>
                    <span className={styles.tierLabel}>Fair</span>
                    <span className={styles.tierPrice}>$239</span>
                  </div>
                </div>
              </div>

              <div className={styles.pricingCard}>
                <h3>Samsung S24 Ultra Screen</h3>
                <div className={styles.pricingTiers}>
                  <div className={styles.priceTier}>
                    <span className={styles.tierLabel}>Excellent</span>
                    <span className={styles.tierPrice}>$329</span>
                  </div>
                  <div className={styles.priceTier}>
                    <span className={styles.tierLabel}>Good</span>
                    <span className={styles.tierPrice}>$263</span>
                  </div>
                  <div className={styles.priceTier}>
                    <span className={styles.tierLabel}>Fair</span>
                    <span className={styles.tierPrice}>$197</span>
                  </div>
                </div>
              </div>

              <div className={styles.pricingCard}>
                <h3>iPad Pro 12.9" Screen</h3>
                <div className={styles.pricingTiers}>
                  <div className={styles.priceTier}>
                    <span className={styles.tierLabel}>Excellent</span>
                    <span className={styles.tierPrice}>$499</span>
                  </div>
                  <div className={styles.priceTier}>
                    <span className={styles.tierLabel}>Good</span>
                    <span className={styles.tierPrice}>$399</span>
                  </div>
                  <div className={styles.priceTier}>
                    <span className={styles.tierLabel}>Fair</span>
                    <span className={styles.tierPrice}>$299</span>
                  </div>
                </div>
              </div>
            </div>
            <p className={styles.pricingNote}>
              *Prices are estimates and may vary based on current market conditions and specific device evaluation.
              All prices include free shipping and secure payment.
            </p>
          </div>

          {/* Main Content */}
          <div className={styles.mainContent}>
            <div className={styles.formSection}>
              <h2>Get Your Instant Quote</h2>
              <p>Fill out the form below and receive a competitive offer within 24 hours.</p>

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
                        className={styles.selectField}
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
                        placeholder="e.g., iPhone 15 Pro Max, Galaxy S24 Ultra"
                        required
                        className={styles.inputField}
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
                        placeholder="e.g., 6.7 inch, 6.8 inch"
                        className={styles.inputField}
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
                              <div className={styles.conditionHeader}>
                                <span className={styles.conditionLabel}>{condition.label}</span>
                                <span className={styles.conditionValue} style={{ color: condition.color }}>
                                  {condition.multiplier * 100}% Value
                                </span>
                              </div>
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
                      <span>Cracks or scratches on screen</span>
                    </label>

                    <label className={styles.checkbox}>
                      <input
                        type="checkbox"
                        name="hasDeadPixels"
                        checked={formData.hasDeadPixels}
                        onChange={handleInputChange}
                      />
                      <span>Dead pixels or stuck pixels</span>
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
                        className={styles.inputField}
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
                        className={styles.inputField}
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
                        className={styles.inputField}
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
                    placeholder="Any additional information about your screen's condition, original packaging, accessories included, etc."
                    rows="4"
                    className={styles.textareaField}
                  />
                </div>

                {/* Submit Button */}
                <div className={styles.formActions}>
                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className={styles.spinner}></div>
                        Processing...
                      </>
                    ) : (
                      'Get My Instant Quote'
                    )}
                  </button>
                  <p className={styles.disclaimer}>
                    By submitting this form, you agree to our terms and conditions.
                    We'll contact you within 24 hours with a competitive offer.
                  </p>
                </div>
              </form>
            </div>

            {/* Process Section */}
            <div className={styles.processSection}>
              <h2>How It Works</h2>
              <div className={styles.processSteps}>
                <div className={styles.processStep}>
                  <div className={styles.stepIcon}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <h3>1. Submit Your Device</h3>
                  <p>Fill out our secure form with device details and condition</p>
                </div>

                <div className={styles.processStep}>
                  <div className={styles.stepIcon}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <h3>2. Receive Quote</h3>
                  <p>Get a competitive offer via email or phone within 24 hours</p>
                </div>

                <div className={styles.processStep}>
                  <div className={styles.stepIcon}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 7h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 4h4v3h-4V4z"/>
                    </svg>
                  </div>
                  <h3>3. Ship Your Screen</h3>
                  <p>Receive free prepaid shipping label and send securely</p>
                </div>

                <div className={styles.processStep}>
                  <div className={styles.stepIcon}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <h3>4. Get Paid</h3>
                  <p>Receive payment immediately after we verify your device</p>
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div className={styles.infoSection}>
              <div className={styles.infoCard}>
                <h3>Why Choose Our LCD Buyback?</h3>
                <ul>
                  <li>Competitive prices based on current market value</li>
                  <li>Professional grading by certified technicians</li>
                  <li>Fast and secure payment processing</li>
                  <li>Free prepaid shipping worldwide</li>
                  <li>Environmentally responsible recycling</li>
                  <li>24/7 customer support</li>
                </ul>
              </div>

              <div className={styles.infoCard}>
                <h3>What We Buy</h3>
                <div className={styles.deviceList}>
                  <div className={styles.deviceCategory}>
                    <h4>iPhone Screens</h4>
                    <p>All models from iPhone 6 to iPhone 15 series</p>
                  </div>
                  <div className={styles.deviceCategory}>
                    <h4>Samsung Screens</h4>
                    <p>Galaxy S, Note, A, Z series and tablets</p>
                  </div>
                  <div className={styles.deviceCategory}>
                    <h4>iPad Screens</h4>
                    <p>All iPad models and screen sizes</p>
                  </div>
                  <div className={styles.deviceCategory}>
                    <h4>Other Brands</h4>
                    <p>Various Android devices and brands</p>
                  </div>
                </div>
              </div>

              <div className={styles.infoCard}>
                <h3>Need Help?</h3>
                <p>Have questions about our LCD buyback program?</p>
                <div className={styles.contactInfo}>
                  <p><strong>Phone:</strong> +971 58 553 1029</p>
                  <p><strong>Email:</strong> buyback@nexustechhub.com</p>
                  <p><strong>WhatsApp:</strong> Available 24/7</p>
                </div>
                <Link href="/contact" className={styles.contactButton}>
                  Contact Us
                </Link>
              </div>
            </div>

            {/* FAQ Section */}
            <div className={styles.faqSection}>
              <h2>Frequently Asked Questions</h2>
              <div className={styles.faqGrid}>
                <div className={styles.faqItem}>
                  <h3>How is the device condition graded?</h3>
                  <p>Our certified technicians evaluate screens based on cosmetic condition, functionality, and any defects. We use a transparent grading system that determines your payout.</p>
                </div>

                <div className={styles.faqItem}>
                  <h3>How long does the process take?</h3>
                  <p>Most quotes are provided within 24 hours. Once you accept and ship, payment is processed within 48 hours of our receiving and verifying your device.</p>
                </div>

                <div className={styles.faqItem}>
                  <h3>Do you accept damaged screens?</h3>
                  <p>Yes, we accept screens in all conditions. The price will vary based on the extent of damage and repairability.</p>
                </div>

                <div className={styles.faqItem}>
                  <h3>Is shipping really free?</h3>
                  <p>Yes! We provide prepaid shipping labels for all accepted devices. Simply print the label and drop off at your nearest shipping location.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
