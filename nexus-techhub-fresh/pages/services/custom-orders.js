import React, { useState } from 'react';
import Head from 'next/head';

export default function CustomOrders() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    device: '',
    issue: '',
    requirements: '',
    budget: '',
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
      const response = await fetch('/api/contact/custom-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Thank you for your inquiry! We will contact you within 24 hours.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          device: '',
          issue: '',
          requirements: '',
          budget: '',
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
        <title>Custom Orders - Nexus Tech Hub</title>
        <meta name="description" content="Custom repair solutions for unique device issues. Specialized repair services for complex problems." />
      </Head>

      <div className="container">
        <div className="custom-header">
          <h1>Custom Repair Solutions</h1>
          <p>Specialized repair services for complex device issues</p>
        </div>

        <div className="custom-content">
          <div className="custom-info">
            <section>
              <h2>Our Custom Repair Services</h2>
              <div className="services-grid">
                <div className="service-item">
                  <div className="service-icon">🔧</div>
                  <h3>Complex Repairs</h3>
                  <p>Advanced repair solutions for unique device problems</p>
                </div>
                <div className="service-item">
                  <div className="service-icon">⚡</div>
                  <h3>Component Replacement</h3>
                  <p>Custom sourcing and installation of specialized parts</p>
                </div>
                <div className="service-item">
                  <div className="service-icon">🔍</div>
                  <h3>Diagnostic Services</h3>
                  <p>Thorough analysis and troubleshooting of device issues</p>
                </div>
                <div className="service-item">
                  <div className="service-icon">📱</div>
                  <h3>Data Recovery</h3>
                  <p>Safe data extraction and recovery services</p>
                </div>
              </div>
            </section>

            <section>
              <h2>Common Custom Repair Scenarios</h2>
              <ul className="scenarios-list">
                <li>Water damage restoration with custom solutions</li>
                <li>Screen repairs for rare or vintage devices</li>
                <li>Motherboard repairs and component-level fixes</li>
                <li>Custom cable assemblies and connectors</li>
                <li>Software-related hardware issues</li>
                <li>Device modifications and upgrades</li>
              </ul>
            </section>
          </div>

          <div className="custom-form-section">
            <h2>Request Custom Repair</h2>
            <form className="custom-form" onSubmit={handleSubmit}>
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
                  <label htmlFor="device">Device Model *</label>
                  <input
                    type="text"
                    id="device"
                    name="device"
                    value={formData.device}
                    onChange={handleChange}
                    placeholder="e.g., iPhone 15 Pro, Samsung S24"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="issue">Describe the Issue *</label>
                <textarea
                  id="issue"
                  name="issue"
                  value={formData.issue}
                  onChange={handleChange}
                  placeholder="Please describe the problem in detail..."
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="budget">Budget Range</label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                  >
                    <option value="">Select budget</option>
                    <option value="under-50">Under $50</option>
                    <option value="50-100">$50 - $100</option>
                    <option value="100-200">$100 - $200</option>
                    <option value="200-500">$200 - $500</option>
                    <option value="over-500">Over $500</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="timeline">Urgency</label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                  >
                    <option value="">Select urgency</option>
                    <option value="asap">ASAP</option>
                    <option value="1-week">Within 1 week</option>
                    <option value="2-weeks">Within 2 weeks</option>
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
                  placeholder="Any specific requirements or preferences..."
                />
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Request Custom Repair'}
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

        .custom-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .custom-header h1 {
          color: #1e293b;
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }

        .custom-header p {
          color: #64748b;
          font-size: 1.125rem;
        }

        .custom-content {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 3rem;
          align-items: start;
        }

        .custom-info section {
          margin-bottom: 3rem;
        }

        .custom-info h2 {
          color: #1e293b;
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 2rem;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .service-item {
          background: white;
          padding: 1.5rem;
          border-radius: 0.75rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        .service-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .service-item h3 {
          color: #1e293b;
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .service-item p {
          color: #64748b;
          font-size: 0.875rem;
        }

        .scenarios-list {
          background: white;
          padding: 1.5rem;
          border-radius: 0.75rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          list-style: none;
          padding-left: 0;
        }

        .scenarios-list li {
          color: #64748b;
          font-size: 0.875rem;
          margin-bottom: 0.75rem;
          padding-left: 1.5rem;
          position: relative;
        }

        .scenarios-list li:before {
          content: '✓';
          color: #10b981;
          position: absolute;
          left: 0;
          font-weight: bold;
        }

        .custom-form-section {
          background: white;
          padding: 2rem;
          border-radius: 0.75rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .custom-form-section h2 {
          color: #1e293b;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
        }

        .custom-form {
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
          .custom-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .custom-form-section {
            order: -1;
          }
        }

        @media (max-width: 768px) {
          .container {
            padding: 1rem;
          }

          .custom-header h1 {
            font-size: 2rem;
          }

          .services-grid {
            grid-template-columns: 1fr;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .custom-form-section {
            padding: 1.5rem;
          }
        }
      `}</style>
    </>
  );
}
