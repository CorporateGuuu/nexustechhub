import React from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout/Layout';

export default function CheckoutCancelled() {
  return (
    <Layout title="Payment Cancelled - Nexus Tech Hub">
      <div style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          padding: '3rem',
          textAlign: 'center',
          maxWidth: '500px',
          width: '100%'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: '#f59e0b',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 2rem'
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
          </div>

          <h1 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#1e293b',
            marginBottom: '0.5rem'
          }}>
            Payment Cancelled
          </h1>

          <p style={{
            color: '#64748b',
            fontSize: '1.125rem',
            marginBottom: '2rem'
          }}>
            Your payment was cancelled. No charges have been made to your account.
          </p>

          <div style={{
            background: '#f3f4f6',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '2rem',
            textAlign: 'left'
          }}>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: '#1e293b',
              marginBottom: '1rem'
            }}>
              What happened?
            </h3>
            <ul style={{
              color: '#64748b',
              fontSize: '0.875rem',
              margin: 0,
              paddingLeft: '1.5rem'
            }}>
              <li>You cancelled the payment process</li>
              <li>Your cart items are still saved</li>
              <li>You can try again anytime</li>
              <li>No payment information was stored</li>
            </ul>
          </div>

          <div style={{
            background: '#fef3c7',
            border: '1px solid #f59e0b',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 8v4"></path>
                <path d="M12 16h.01"></path>
              </svg>
              <span style={{ fontWeight: '600', color: '#92400e' }}>Need Help?</span>
            </div>
            <p style={{
              color: '#92400e',
              fontSize: '0.875rem',
              margin: 0
            }}>
              If you encountered any issues during checkout, please contact our support team.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
            <Link
              href="/checkout"
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                padding: '0.875rem 2rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                textAlign: 'center',
                transition: 'all 0.2s ease'
              }}
            >
              Try Again
            </Link>

            <Link
              href="/cart"
              style={{
                display: 'inline-block',
                background: 'white',
                color: '#374151',
                padding: '0.875rem 2rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                textAlign: 'center',
                border: '1px solid #d1d5db',
                transition: 'all 0.2s ease'
              }}
            >
              Review Cart
            </Link>

            <Link
              href="/products"
              style={{
                display: 'inline-block',
                background: '#f3f4f6',
                color: '#374151',
                padding: '0.875rem 2rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '500',
                textAlign: 'center',
                transition: 'all 0.2s ease'
              }}
            >
              Continue Shopping
            </Link>
          </div>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
              Questions? <Link href="/contact" style={{ color: '#3b82f6', textDecoration: 'none' }}>Contact us</Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
