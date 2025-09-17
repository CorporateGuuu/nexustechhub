import React from 'react';
import Head from 'next/head';

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Service - Nexus Tech Hub</title>
        <meta name="description" content="Terms of Service for Nexus Tech Hub. Read our terms and conditions for using our website and services." />
      </Head>

      <div className="container">
        <div className="terms-header">
          <h1>Terms of Service</h1>
          <p className="last-updated">Last updated: September 17, 2024</p>
        </div>

        <div className="terms-content">
          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and using Nexus Tech Hub's website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
          </section>

          <section>
            <h2>2. Use License</h2>
            <p>Permission is granted to temporarily download one copy of the materials on Nexus Tech Hub's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
            <ul>
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on our website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </section>

          <section>
            <h2>3. Product Information</h2>
            <p>We strive to provide accurate product descriptions and specifications. However, we do not warrant that product descriptions or other content on this site are accurate, complete, reliable, current, or error-free. If a product offered by us is not as described, your sole remedy is to return it in unused condition.</p>
          </section>

          <section>
            <h2>4. Pricing and Payment</h2>
            <p>All prices are subject to change without notice. We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in product information, or payment issues. Payment must be received in full before order processing begins.</p>
          </section>

          <section>
            <h2>5. Shipping and Delivery</h2>
            <p>We will make reasonable efforts to deliver products within the estimated timeframe. However, delivery dates are estimates only and we are not liable for delays. Risk of loss passes to the buyer upon delivery to the carrier.</p>
          </section>

          <section>
            <h2>6. Returns and Refunds</h2>
            <p>Items may be returned within 30 days of purchase for a full refund, provided they are in original condition and packaging. Custom orders and certain products may not be eligible for return. Return shipping costs are the responsibility of the buyer unless the item was defective.</p>
          </section>

          <section>
            <h2>7. Warranty</h2>
            <p>Our products come with manufacturer warranties as specified. We honor all manufacturer warranties and will assist with warranty claims. Our liability is limited to the purchase price of the product.</p>
          </section>

          <section>
            <h2>8. Limitation of Liability</h2>
            <p>In no event shall Nexus Tech Hub or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.</p>
          </section>

          <section>
            <h2>9. Privacy Policy</h2>
            <p>Your privacy is important to us. Please review our Privacy Policy, which also governs your use of our website, to understand our practices.</p>
          </section>

          <section>
            <h2>10. Governing Law</h2>
            <p>These terms and conditions are governed by and construed in accordance with the laws of the UAE, and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.</p>
          </section>

          <section>
            <h2>11. Contact Information</h2>
            <p>If you have any questions about these Terms of Service, please contact us:</p>
            <div className="contact-info">
              <p><strong>Email:</strong> legal@nexustechhub.com</p>
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

        .terms-header {
          text-align: center;
          margin-bottom: 3rem;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 2rem;
        }

        .terms-header h1 {
          color: #1e293b;
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }

        .last-updated {
          color: #64748b;
          font-size: 0.875rem;
        }

        .terms-content {
          color: #374151;
          line-height: 1.7;
        }

        .terms-content section {
          margin-bottom: 2rem;
        }

        .terms-content h2 {
          color: #1e293b;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          margin-top: 2rem;
        }

        .terms-content h2:first-child {
          margin-top: 0;
        }

        .terms-content p {
          margin-bottom: 1rem;
        }

        .terms-content ul {
          margin-left: 1.5rem;
          margin-bottom: 1rem;
        }

        .terms-content li {
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

          .terms-header h1 {
            font-size: 2rem;
          }

          .terms-content h2 {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </>
  );
}
