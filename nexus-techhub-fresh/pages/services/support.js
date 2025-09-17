import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Support() {
  return (
    <>
      <Head>
        <title>Technical Support - Nexus Tech Hub</title>
        <meta name="description" content="Professional technical support for mobile repair parts. Expert assistance for all your repair needs." />
      </Head>

      <div className="container">
        <div className="support-header">
          <h1>Technical Support</h1>
          <p>Expert assistance for all your mobile repair needs</p>
        </div>

        <div className="support-content">
          <section>
            <h2>Our Support Services</h2>
            <div className="support-grid">
              <div className="support-item">
                <div className="support-icon">📞</div>
                <h3>Phone Support</h3>
                <p>Direct technical assistance via phone</p>
                <p className="contact">+971 58 553 1029</p>
              </div>
              <div className="support-item">
                <div className="support-icon">💬</div>
                <h3>Live Chat</h3>
                <p>Real-time assistance through our chat system</p>
                <p className="contact">Available 24/7</p>
              </div>
              <div className="support-item">
                <div className="support-icon">📧</div>
                <h3>Email Support</h3>
                <p>Detailed technical queries and solutions</p>
                <p className="contact">support@nexustechhub.com</p>
              </div>
              <div className="support-item">
                <div className="support-icon">📚</div>
                <h3>Knowledge Base</h3>
                <p>Comprehensive repair guides and tutorials</p>
                <Link href="/kb">
                  <a className="kb-link">Browse Knowledge Base</a>
                </Link>
              </div>
            </div>
          </section>

          <section>
            <h2>Common Support Topics</h2>
            <div className="topics-grid">
              <div className="topic-category">
                <h3>Product Selection</h3>
                <ul>
                  <li>Compatible parts identification</li>
                  <li>Quality comparison guidance</li>
                  <li>Price optimization advice</li>
                </ul>
              </div>
              <div className="topic-category">
                <h3>Installation Support</h3>
                <ul>
                  <li>Step-by-step repair guides</li>
                  <li>Troubleshooting assistance</li>
                  <li>Tool recommendations</li>
                </ul>
              </div>
              <div className="topic-category">
                <h3>Technical Issues</h3>
                <ul>
                  <li>Part compatibility issues</li>
                  <li>Quality control concerns</li>
                  <li>Shipping and delivery problems</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2>Support Hours</h2>
            <div className="hours-info">
              <div className="hours-item">
                <h3>📅 Business Hours</h3>
                <p>Monday - Saturday: 9:00 AM - 6:00 PM (UAE Time)</p>
                <p>Sunday: Closed</p>
              </div>
              <div className="hours-item">
                <h3>🚨 Emergency Support</h3>
                <p>Critical issues: Available 24/7</p>
                <p>Response time: Within 2 hours</p>
              </div>
            </div>
          </section>

          <section>
            <h2>Contact Support</h2>
            <div className="contact-form">
              <p>Need immediate assistance? Contact our support team:</p>
              <div className="contact-methods">
                <div className="contact-method">
                  <h4>📞 Phone</h4>
                  <p>+971 58 553 1029</p>
                </div>
                <div className="contact-method">
                  <h4>📧 Email</h4>
                  <p>support@nexustechhub.com</p>
                </div>
                <div className="contact-method">
                  <h4>💬 Live Chat</h4>
                  <p>Available on website</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <style jsx>{`
        .container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 2rem;
          min-height: 80vh;
        }

        .support-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .support-header h1 {
          color: #1e293b;
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }

        .support-header p {
          color: #64748b;
          font-size: 1.125rem;
        }

        .support-content section {
          margin-bottom: 3rem;
        }

        .support-content h2 {
          color: #1e293b;
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 2rem;
        }

        .support-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .support-item {
          background: white;
          padding: 2rem;
          border-radius: 0.75rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          text-align: center;
          transition: transform 0.2s ease;
        }

        .support-item:hover {
          transform: translateY(-2px);
        }

        .support-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .support-item h3 {
          color: #1e293b;
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .support-item p {
          color: #64748b;
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
        }

        .contact {
          color: #3b82f6;
          font-weight: 600;
        }

        .kb-link {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .kb-link:hover {
          text-decoration: underline;
        }

        .topics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .topic-category {
          background: white;
          padding: 1.5rem;
          border-radius: 0.75rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .topic-category h3 {
          color: #1e293b;
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .topic-category ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .topic-category li {
          color: #64748b;
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
          padding-left: 1rem;
          position: relative;
        }

        .topic-category li:before {
          content: '•';
          color: #3b82f6;
          position: absolute;
          left: 0;
        }

        .hours-info {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .hours-item {
          background: white;
          padding: 1.5rem;
          border-radius: 0.75rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .hours-item h3 {
          color: #1e293b;
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .hours-item p {
          color: #64748b;
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
        }

        .contact-form {
          background: white;
          padding: 2rem;
          border-radius: 0.75rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        .contact-form p {
          color: #64748b;
          font-size: 1rem;
          margin-bottom: 2rem;
        }

        .contact-methods {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
        }

        .contact-method {
          padding: 1rem;
          background: #f8fafc;
          border-radius: 0.5rem;
        }

        .contact-method h4 {
          color: #1e293b;
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .contact-method p {
          color: #3b82f6;
          font-size: 0.875rem;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .container {
            padding: 1rem;
          }

          .support-header h1 {
            font-size: 2rem;
          }

          .support-grid,
          .topics-grid,
          .hours-info {
            grid-template-columns: 1fr;
          }

          .contact-methods {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
