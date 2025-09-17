import React, { useState } from 'react';
import Head from 'next/head';

export default function BulkOrdering() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    products: '',
    quantity: '',
    requirements: '',
    timeline: ''
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
      const response = await fetch('/api/contact/bulk-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Thank you for your inquiry! We will contact you within 24 hours.');
        setFormData({
          companyName: '',
          contactPerson: '',
          email: '',
          phone: '',
          products: '',
          quantity: '',
          requirements: '',
          timeline: ''
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
        <title>Bulk Ordering - Nexus Tech Hub</title>
        <meta name="description" content="Bulk ordering services for wholesale mobile repair parts. Get competitive pricing for large orders." />
      </Head>

      <div className="container">
        <div className="bulk-header">
          <h1>Bulk Ordering Services</h1>
          <p>Get competitive pricing for large orders of mobile repair parts</p>
        </div>

        <div className="bulk-content">
          <div className="bulk-info">
            <section>
              <h2>Why Choose Our Bulk Ordering Service?</h2>
              <div className="benefits-grid">
                <div className="benefit-item">
                  <div className="benefit-icon">💰</div>
                  <h3>Competitive Pricing</h3>
                  <p>Significant discounts for bulk orders starting from 50 units</p>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">🚚</div>
                  <h3>Fast Delivery</h3>
                  <p>Priority shipping and expedited processing for large orders</p>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">🎯</div>
                  <h3>Custom Solutions</h3>
                  <p>Tailored packaging and branding options available</p>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">📞</div>
                  <h3>Dedicated Support</h3>
                  <p>Personal account manager for all bulk order customers</p>
                </div>
              </div>
            </section>

            <section>
              <h2>Popular Bulk Order Categories</h2>
              <div className="categories-grid">
                <div className="category-item">
                  <h3>iPhone Parts</h3>
                  <ul>
                    <li>Screens & LCDs</li>
                    <li>Batteries</li>
                    <li>Charging Ports</li>
                    <li>Home Buttons</li>
                  </ul>
                </div>
                <div className="category-item">
                  <h3>Samsung Parts</h3>
                  <ul>
                    <li>AMOLED Screens</li>
                    <li>Batteries</li>
                    <li>Camera Modules</li>
                    <li>Motherboards</li>
                  </ul>
                </div>
                <div className="category-item">
                  <h3>Repair Tools</h3>
                  <ul>
                    <li>Screwdriver Sets</li>
                    <li>Opening Tools</li>
                    <li>Heat Guns</li>
                    <li>Multimeters</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>

          <div className="bulk-form-section">
            <h2>Request Bulk Quote</h2>
            <form className="bulk-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="companyName">Company Name *</label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contactPerson">Contact Person *</label>
                  <input
                    type="text"
                    id="contactPerson"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
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
              </div>

              <div className="form-group">
                <label htmlFor="products">Products Needed *</label>
                <textarea
                  id="products"
                  name="products"
                  value={formData.products}
                  onChange={handleChange}
                  placeholder="List the specific parts you need..."
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="quantity">Estimated Quantity *</label>
                  <input
                    type="text"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="e.g., 100 units, 50-100 pieces"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="timeline">Required Timeline</label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                  >
                    <option value="">Select timeline</option>
                    <option value="asap">ASAP</option>
                    <option value="1-week">Within 1 week</option>
                    <option value="2-weeks">Within 2 weeks</option>
                    <option value="1-month">Within 1 month</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="requirements">Additional Requirements</label>
                <textarea
                  id="requirements"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  placeholder="Any special requirements, packaging needs, or other details..."
                />
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Request Quote'}
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

        .bulk-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .bulk-header h1 {
          color: #1e293b;
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }

        .bulk-header p {
          color: #64748b;
          font-size: 1.125rem;
        }

        .bulk-content {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 3rem;
          align-items: start;
        }

        .bulk-info section {
          margin-bottom: 3rem;
        }

        .bulk-info h2 {
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

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .category-item {
          background: white;
          padding: 1.5rem;
          border-radius: 0.75rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .category-item h3 {
          color: #1e293b;
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .category-item ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .category-item li {
          color: #64748b;
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
          padding-left: 1rem;
          position: relative;
        }

        .category-item li:before {
          content: '•';
          color: #3b82f6;
          position: absolute;
          left: 0;
        }

        .bulk-form-section {
          background: white;
          padding: 2rem;
          border-radius: 0.75rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .bulk-form-section h2 {
          color: #1e293b;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
        }

        .bulk-form {
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
          .bulk-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .bulk-form-section {
            order: -1;
          }
        }

        @media (max-width: 768px) {
          .container {
            padding: 1rem;
          }

          .bulk-header h1 {
            font-size: 2rem;
          }

          .benefits-grid,
          .categories-grid {
            grid-template-columns: 1fr;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .bulk-form-section {
            padding: 1.5rem;
          }
        }
      `}</style>
    </>
  );
}
