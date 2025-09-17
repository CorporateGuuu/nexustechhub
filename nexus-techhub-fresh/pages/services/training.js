import React, { useState } from 'react';
import Head from 'next/head';

export default function Training() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    course: '',
    preferredDate: '',
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
      const response = await fetch('/api/contact/training', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Thank you for your interest! We will contact you within 24 hours.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          experience: '',
          course: '',
          preferredDate: '',
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
        <title>Repair Training - Nexus Tech Hub</title>
        <meta name="description" content="Professional mobile repair training courses. Learn from experts and master repair techniques." />
      </Head>

      <div className="container">
        <div className="training-header">
          <h1>Mobile Repair Training</h1>
          <p>Master the art of mobile device repair with our expert-led training programs</p>
        </div>

        <div className="training-content">
          <section>
            <h2>Our Training Programs</h2>
            <div className="courses-grid">
              <div className="course-item">
                <div className="course-icon">📱</div>
                <h3>iPhone Repair Training</h3>
                <p>Complete iPhone repair course covering all models</p>
                <ul>
                  <li>Screen replacement techniques</li>
                  <li>Battery and charging port repairs</li>
                  <li>Motherboard diagnostics</li>
                  <li>Advanced troubleshooting</li>
                </ul>
                <div className="course-duration">Duration: 2 weeks</div>
              </div>
              <div className="course-item">
                <div className="course-icon">🤖</div>
                <h3>Samsung Repair Training</h3>
                <p>Comprehensive Samsung device repair training</p>
                <ul>
                  <li>AMOLED screen repairs</li>
                  <li>Component-level fixes</li>
                  <li>Software diagnostics</li>
                  <li>Quality control procedures</li>
                </ul>
                <div className="course-duration">Duration: 2 weeks</div>
              </div>
              <div className="course-item">
                <div className="course-icon">🔧</div>
                <h3>Advanced Repair Techniques</h3>
                <p>Specialized training for complex repair scenarios</p>
                <ul>
                  <li>Water damage restoration</li>
                  <li>Micro-soldering techniques</li>
                  <li>Custom cable assemblies</li>
                  <li>Professional diagnostics</li>
                </ul>
                <div className="course-duration">Duration: 3 weeks</div>
              </div>
            </div>
          </section>

          <section>
            <h2>Training Benefits</h2>
            <div className="benefits-list">
              <div className="benefit">
                <div className="benefit-icon">🎓</div>
                <h4>Expert Instruction</h4>
                <p>Learn from certified repair technicians with years of experience</p>
              </div>
              <div className="benefit">
                <div className="benefit-icon">🛠️</div>
                <h4>Hands-on Practice</h4>
                <p>Work with real devices and professional-grade tools</p>
              </div>
              <div className="benefit">
                <div className="benefit-icon">📜</div>
                <h4>Certification</h4>
                <p>Receive recognized certification upon course completion</p>
              </div>
              <div className="benefit">
                <div className="benefit-icon">💼</div>
                <h4>Career Support</h4>
                <p>Job placement assistance and business guidance</p>
              </div>
            </div>
          </section>

          <section>
            <h2>Enroll in Training</h2>
            <form className="training-form" onSubmit={handleSubmit}>
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
                  <label htmlFor="experience">Experience Level</label>
                  <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                  >
                    <option value="">Select experience</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="course">Preferred Course *</label>
                <select
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a course</option>
                  <option value="iphone">iPhone Repair Training</option>
                  <option value="samsung">Samsung Repair Training</option>
                  <option value="advanced">Advanced Repair Techniques</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="preferredDate">Preferred Start Date</label>
                <input
                  type="date"
                  id="preferredDate"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Additional Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Any specific requirements or questions..."
                />
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Enroll Now'}
              </button>

              {message && (
                <div className={`message ${message.includes('Thank you') ? 'success' : 'error'}`}>
                  {message}
                </div>
              )}
            </form>
          </section>
        </div>
      </div>

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          min-height: 80vh;
        }

        .training-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .training-header h1 {
          color: #1e293b;
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }

        .training-header p {
          color: #64748b;
          font-size: 1.125rem;
        }

        .training-content section {
          margin-bottom: 3rem;
        }

        .training-content h2 {
          color: #1e293b;
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 2rem;
        }

        .courses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }

        .course-item {
          background: white;
          padding: 2rem;
          border-radius: 0.75rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease;
        }

        .course-item:hover {
          transform: translateY(-2px);
        }

        .course-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          text-align: center;
        }

        .course-item h3 {
          color: #1e293b;
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1rem;
          text-align: center;
        }

        .course-item p {
          color: #64748b;
          font-size: 0.875rem;
          margin-bottom: 1rem;
          text-align: center;
        }

        .course-item ul {
          list-style: none;
          padding: 0;
          margin: 0 0 1rem 0;
        }

        .course-item li {
          color: #64748b;
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
          padding-left: 1rem;
          position: relative;
        }

        .course-item li:before {
          content: '✓';
          color: #10b981;
          position: absolute;
          left: 0;
          font-weight: bold;
        }

        .course-duration {
          color: #3b82f6;
          font-size: 0.875rem;
          font-weight: 600;
          text-align: center;
        }

        .benefits-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .benefit {
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

        .benefit h4 {
          color: #1e293b;
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .benefit p {
          color: #64748b;
          font-size: 0.875rem;
        }

        .training-form {
          background: white;
          padding: 2rem;
          border-radius: 0.75rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          max-width: 600px;
          margin: 0 auto;
        }

        .training-form h2 {
          color: #1e293b;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1rem;
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
          width: 100%;
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

        @media (max-width: 768px) {
          .container {
            padding: 1rem;
          }

          .training-header h1 {
            font-size: 2rem;
          }

          .courses-grid {
            grid-template-columns: 1fr;
          }

          .benefits-list {
            grid-template-columns: 1fr;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .training-form {
            padding: 1.5rem;
          }
        }
      `}</style>
    </>
  );
}
