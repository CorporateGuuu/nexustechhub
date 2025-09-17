import React from 'react';
import Head from 'next/head';

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - Nexus Tech Hub</title>
        <meta name="description" content="Privacy Policy for Nexus Tech Hub. Learn how we collect, use, and protect your personal information." />
      </Head>

      <div className="container">
        <div className="privacy-header">
          <h1>Privacy Policy</h1>
          <p className="last-updated">Last updated: September 17, 2024</p>
        </div>

        <div className="privacy-content">
          <section>
            <h2>1. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you:</p>
            <ul>
              <li>Create an account or make a purchase</li>
              <li>Subscribe to our newsletter</li>
              <li>Contact us for support</li>
              <li>Participate in surveys or promotions</li>
            </ul>
            <p>This may include your name, email address, phone number, shipping address, and payment information.</p>
          </section>

          <section>
            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Process and fulfill your orders</li>
              <li>Provide customer support</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Improve our products and services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2>3. Information Sharing</h2>
            <p>We do not sell, trade, or otherwise transfer your personal information to third parties, except:</p>
            <ul>
              <li>With your explicit consent</li>
              <li>To trusted service providers who assist our operations</li>
              <li>When required by law</li>
              <li>To protect our rights and safety</li>
            </ul>
          </section>

          <section>
            <h2>4. Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes:</p>
            <ul>
              <li>SSL encryption for data transmission</li>
              <li>Secure payment processing</li>
              <li>Regular security audits</li>
              <li>Employee access controls</li>
            </ul>
          </section>

          <section>
            <h2>5. Cookies and Tracking</h2>
            <p>We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie settings through your browser preferences.</p>
          </section>

          <section>
            <h2>6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Opt out of marketing communications</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section>
            <h2>7. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us:</p>
            <div className="contact-info">
              <p><strong>Email:</strong> privacy@nexustechhub.com</p>
              <p><strong>Phone:</strong> +971 58 553 1029</p>
              <p><strong>Address:</strong> Ras Al Khaimah, UAE</p>
            </div>
          </section>
        </div>
      </div>

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
          min-height: 80vh;
        }

        .privacy-header {
          text-align: center;
          margin-bottom: 3rem;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 2rem;
        }

        .privacy-header h1 {
          color: #1e293b;
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }

        .last-updated {
          color: #64748b;
          font-size: 0.875rem;
        }

        .privacy-content {
          color: #374151;
          line-height: 1.7;
        }

        .privacy-content section {
          margin-bottom: 2rem;
        }

        .privacy-content h2 {
          color: #1e293b;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          margin-top: 2rem;
        }

        .privacy-content h2:first-child {
          margin-top: 0;
        }

        .privacy-content p {
          margin-bottom: 1rem;
        }

        .privacy-content ul {
          margin-left: 1.5rem;
          margin-bottom: 1rem;
        }

        .privacy-content li {
          margin-bottom: 0.5rem;
        }

        .contact-info {
          background: #f8fafc;
          padding: 1.5rem;
          border-radius: 0.5rem;
          border: 1px solid #e2e8f0;
        }

        .contact-info p {
          margin-bottom: 0.5rem;
        }

        .contact-info p:last-child {
          margin-bottom: 0;
        }

        @media (max-width: 768px) {
          .container {
            padding: 1rem;
          }

          .privacy-header h1 {
            font-size: 2rem;
          }

          .privacy-content h2 {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </>
  );
}
