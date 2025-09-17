import React, { useState } from 'react';
import Head from 'next/head';

export default function LCDBuyback() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    deviceModel: '',
    screenCondition: '',
    quantity: '',
    location: '',
    preferredContact: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/contact/lcd-buyback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Thank you for your inquiry! We will contact you within 24 hours with a quote.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          deviceModel: '',
          screenCondition: '',
          quantity: '',
          location: '',
          preferredContact: '',
          message: ''
        });
      } else {
        setMessage('Something went wrong. Please try again or contact us directly.');
      }
    } catch (error) {
      setMessage('Network error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>LCD Buyback Program - Nexus Tech Hub</title>
        <meta name="description" content="Sell your used LCD screens and parts. Get competitive prices for your old mobile device screens and components." />
      </Head>

      <div className="container">
        <div className="buyback-header">
          <h1>LCD Buyback Program</h1>
          <p>Get competitive prices for your used LCD screens and mobile parts</p>
        </div>

        <div className="buyback-content">
          <div className="buyback-info">
            <section>
              <h2>Why Sell to Us?</h2>
              <div className="benefits-grid">
                <div className="benefit-item">
                  <div className="benefit-icon">💰</div>
                  <h3>Competitive Prices</h3>
                  <p>We offer the best market rates for your used parts</p>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">⚡</div>
                  <h3>Quick Payment</h3>
                  <p>Fast processing and immediate payment upon inspection</p>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">🔄</div>
                  <h3>Easy Process</h3>
                  <p>Simple submission process with instant quote</p>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">🌍</div>
                  <h3>Nationwide Service</h3>
                  <p>We accept parts from anywhere in the UAE</p>
                </div>
              </div>
            </section>

            <section>
              <h2>What We Buy</h2>
              <div className="items-grid">
                <div className="item-category">
                  <h3>iPhone Parts</h3>
                  <ul>
                    <li>LCD screens (all models)</li>
                    <li>OLED displays</li>
                    <li>Touch panels</li>
                    <li>Digitizers</li>
                    <li>Working motherboards</li>
                  </ul>
                </div>
                <div className="item-category">
                  <h3>Samsung Parts</h3>
                  <ul>
                    <li>AMOLED screens</li>
                    <li>SUPER AMOLED displays</li>
                    <li>Touch assemblies</li>
                    <li>Working logic boards</li>
                    <li>Camera modules</li>
                  </ul>
                </div>
                <div className="item-category">
                  <h3>Other Parts</h3>
                  <ul>
                    <li>Batteries</li>
                    <li>Charging ports</li>
                    <li>Home buttons</li>
                    <li>Speakers</li>
                    <li>Vibration motors</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2>How It Works</h2>
              <div className="process-steps">
                <div className="step">
                  <div className="step-number">1</div>
                  <h4>Submit Details</h4>
                  <p>Fill out our simple form with your part details</p>
                </div>
                <div className="step">
                  <div className="step-number">2</div>
                  <h4>Get Instant Quote</h4>
                  <p>Receive a competitive price quote immediately</p>
                </div>
                <div className="step">
                  <div className="step-number">3</div>
                  <h4>Ship Your Parts</h4>
                  <p>Send us your parts using our prepaid shipping label</p>
                </div>
                <div className="step">
                  <div className="step-number">4</div>
                  <h4>Get Paid</h4>
                  <p>Receive payment once we verify the parts</p>
                </div>
              </div>
            </section>
          </div>

          <div className="buyback-form-section">
            <h2>Get Your Quote</h2>
            <form className="buyback-form" onSubmit={handleSubmit}>
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
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="deviceModel">Device Model *</label>
                  <input
                    type="text"
                    id="deviceModel"
                    name="deviceModel"
                    value={formData.deviceModel}
                    onChange={handleChange}
                    placeholder="e.g., iPhone 15 Pro, Samsung S24"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="screenCondition">Screen Condition *</label>
                  <select
                    id="screenCondition"
                    name="screenCondition"
                    value={formData.screenCondition}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select condition</option>
                    <option value="new">New/Unused</option>
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="poor">Poor</option>
                    <option value="damaged">Damaged</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="quantity">Quantity *</label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    min="1"
                    placeholder="Number of units"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="location">Your Location *</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City, UAE"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="preferredContact">Preferred Contact Method</label>
                  <select
                    id="preferredContact"
                    name="preferredContact"
                    value={formData.preferredContact}
                    onChange={handleChange}
                  >
                    <option value="">Select method</option>
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="whatsapp">WhatsApp</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Additional Details</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Any additional information about the parts..."
                />
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Get Quote'}
              </button>

              {message && (
                <div className={`message ${message.includes('Thank you') ? 'success' : 'error'}`}>
                  {message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          min-height: 80vh;
        }

        .buyback-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .buyback-header h1 {
          color: #1e293b;
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }

        .buyback-header p {
          color: #64748b;
          font-size: 1.125rem;
        }

        .buyback-content {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 3rem;
          align-items: start;
        }

        .buyback-info section {
          margin-bottom: 3rem;
        }

        .buyback-info h2 {
          color: #1e293b;
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 2rem;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .benefit-item {
          background: white;
          padding: 1.5rem;
          border-radius: 0.75rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        .benefit-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .benefit-item h3 {
          color: #1e293b;
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .benefit-item p {
          color: #64748b;
          font-size: 0.875rem;
        }

        .items-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .item-category {
          background: white;
          padding: 1.5rem;
          border-radius: 0.75rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .item-category h3 {
          color: #1e293b;
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .item-category ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .item-category li {
          color: #64748b;
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
          padding-left: 1rem;
          position: relative;
        }

        .item-category li:before {
          content: '•';
          color: #3b82f6;
          position: absolute;
          left: 0;
        }

        .process-steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
        }

        .step {
          background: white;
          padding: 1.5rem;
          border-radius: 0.75rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          text-align: center;
          position: relative;
        }

        .step-number {
          width: 40px;
          height: 40px;
          background: #3b82f6;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          margin: 0 auto 1rem;
        }

        .step h4 {
          color: #1e293b;
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .step p {
          color: #64748b;
          font-size: 0.875rem;
        }

        .buyback-form-section {
          background: white;
          padding: 2rem;
          border-radius: 0.75rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .buyback-form-section h2 {
          color: #1e293b;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .buyback-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
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
          color: #374151;
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          transition: border-color 0.2s ease;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 80px;
        }

        .submit-btn {
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          color: white;
          border: none;
          padding: 0.875rem 1.5rem;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-top: 1rem;
        }

        .submit-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
          transform: translateY(-1px);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .message {
          margin-top: 1rem;
          padding: 0.75rem 1rem;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          font-weight: 500;
          text-align: center;
        }

        .message.success {
          background: rgba(34, 197, 94, 0.1);
          color: #16a34a;
          border: 1px solid rgba(34, 197, 94, 0.2);
        }

        .message.error {
          background: rgba(239, 68, 68, 0.1);
          color: #dc2626;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }

        @media (max-width: 1024px) {
          .buyback-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .buyback-form-section {
            order: -1;
          }
        }

        @media (max-width: 768px) {
          .container {
            padding: 1rem;
          }

          .buyback-header h1 {
            font-size: 2rem;
          }

          .benefits-grid,
          .items-grid {
            grid-template-columns: 1fr;
          }

          .process-steps {
            grid-template-columns: repeat(2, 1fr);
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .buyback-form-section {
            padding: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .process-steps {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
