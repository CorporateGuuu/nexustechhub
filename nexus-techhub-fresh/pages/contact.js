import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting form:', err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Layout title="Contact Us" description="Get in touch with Nexus Tech Hub">
        <div className="success-container">
          <div className="success-card">
            <div className="success-icon">✅</div>
            <h1>Thank You!</h1>
            <p>Your message has been sent successfully. We'll get back to you within 24 hours.</p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: '',
                  email: '',
                  subject: '',
                  message: '',
                  inquiryType: 'general'
                });
              }}
              className="reset-button"
            >
              Send Another Message
            </button>
          </div>
        </div>

        <style jsx>{`
          .success-container {
            min-height: 70vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
          }

          .success-card {
            background: white;
            border-radius: 16px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
            padding: 3rem;
            text-align: center;
            max-width: 500px;
            width: 100%;
          }

          .success-icon {
            font-size: 4rem;
            margin-bottom: 1rem;
          }

          .success-card h1 {
            font-size: 2rem;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 1rem;
          }

          .success-card p {
            color: #64748b;
            font-size: 1.125rem;
            margin-bottom: 2rem;
          }

          .reset-button {
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: white;
            border: none;
            border-radius: 8px;
            padding: 1rem 2rem;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .reset-button:hover {
            background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
            transform: translateY(-1px);
          }
        `}</style>
      </Layout>
    );
  }

  return (
    <Layout title="Contact Us" description="Get in touch with Nexus Tech Hub">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="hero-content">
            <h1>Contact Us</h1>
            <p>We're here to help with all your repair needs</p>
          </div>
        </div>
      </section>

      <div className="contact-container">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-section">
              <div className="form-card">
                <h2>Send us a Message</h2>
                <p>Fill out the form below and we'll get back to you as soon as possible.</p>

                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="inquiryType">Inquiry Type</label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                    >
                      <option value="general">General Inquiry</option>
                      <option value="technical">Technical Support</option>
                      <option value="orders">Order Support</option>
                      <option value="partnership">Partnership</option>
                      <option value="wholesale">Wholesale Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="Brief description of your inquiry"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Please provide details about your inquiry..."
                      rows="6"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="submit-button"
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="contact-info-section">
              <div className="info-card">
                <h2>Get in Touch</h2>
                <p>Multiple ways to reach our team</p>

                <div className="contact-methods">
                  <div className="contact-method">
                    <div className="method-icon">📞</div>
                    <div className="method-content">
                      <h3>Phone</h3>
                      <p>+971 58 553 1029</p>
                      <p className="method-note">Mon-Fri: 9AM-6PM GST</p>
                    </div>
                  </div>

                  <div className="contact-method">
                    <div className="method-icon">📧</div>
                    <div className="method-content">
                      <h3>Email</h3>
                      <p>support@nexustechhub.com</p>
                      <p>sales@nexustechhub.com</p>
                      <p className="method-note">We respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="contact-method">
                    <div className="method-icon">📍</div>
                    <div className="method-content">
                      <h3>Address</h3>
                      <p>Compass Building</p>
                      <p>Al Shohada Road</p>
                      <p>AL Hamra Industrial Zone-FZ</p>
                      <p>Ras Al Khaimah, UAE</p>
                    </div>
                  </div>

                  <div className="contact-method">
                    <div className="method-icon">🕒</div>
                    <div className="method-content">
                      <h3>Business Hours</h3>
                      <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p>Saturday: 10:00 AM - 4:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="quick-links-card">
                <h3>Quick Links</h3>
                <div className="quick-links">
                  <a href="/products" className="quick-link">
                    <span className="link-icon">🛍️</span>
                    Browse Products
                  </a>
                  <a href="/support" className="quick-link">
                    <span className="link-icon">🛠️</span>
                    Technical Support
                  </a>
                  <a href="/shipping" className="quick-link">
                    <span className="link-icon">🚚</span>
                    Shipping Info
                  </a>
                  <a href="/returns" className="quick-link">
                    <span className="link-icon">↩️</span>
                    Returns & Exchanges
                  </a>
                  <a href="/faq" className="quick-link">
                    <span className="link-icon">❓</span>
                    FAQ
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact-hero {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 4rem 0 6rem;
          position: relative;
          overflow: hidden;
        }

        .contact-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
          opacity: 0.1;
        }

        .hero-content {
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .hero-content h1 {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .hero-content p {
          font-size: 1.25rem;
          opacity: 0.9;
          max-width: 600px;
          margin: 0 auto;
        }

        .contact-container {
          padding: 4rem 0;
          background: #f8fafc;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
        }

        .contact-form-section,
        .contact-info-section {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .form-card,
        .info-card,
        .quick-links-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          padding: 2.5rem;
        }

        .form-card h2,
        .info-card h2 {
          font-size: 1.875rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.5rem;
        }

        .form-card p,
        .info-card p {
          color: #64748b;
          font-size: 1rem;
          margin-bottom: 2rem;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 0.875rem 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.2s ease;
          outline: none;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 120px;
        }

        .submit-button {
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 1rem 2rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 1rem;
        }

        .submit-button:hover:not(:disabled) {
          background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .contact-methods {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .contact-method {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .method-icon {
          font-size: 2rem;
          flex-shrink: 0;
        }

        .method-content h3 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 0.25rem;
        }

        .method-content p {
          color: #64748b;
          margin: 0;
          line-height: 1.5;
        }

        .method-note {
          font-size: 0.875rem !important;
          opacity: 0.8 !important;
        }

        .quick-links-card h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 1.5rem;
        }

        .quick-links {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .quick-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          color: #64748b;
          text-decoration: none;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .quick-link:hover {
          background: #f1f5f9;
          color: #3b82f6;
        }

        .link-icon {
          font-size: 1.25rem;
        }

        @media (min-width: 1024px) {
          .contact-grid {
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
          }
        }

        @media (max-width: 768px) {
          .hero-content h1 {
            font-size: 2.5rem;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .contact-method {
            flex-direction: column;
            text-align: center;
          }

          .method-icon {
            margin-bottom: 0.5rem;
          }
        }

        @media (max-width: 640px) {
          .form-card,
          .info-card,
          .quick-links-card {
            padding: 2rem 1.5rem;
          }

          .hero-content h1 {
            font-size: 2rem;
          }
        }
      `}</style>
    </Layout>
  );
}
