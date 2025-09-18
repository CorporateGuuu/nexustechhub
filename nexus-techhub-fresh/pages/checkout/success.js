import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/Layout/Layout';
import { useCart } from '../../contexts/CartContext';

export default function CheckoutSuccess() {
  const router = useRouter();
  const { session_id } = router.query;
  const { clearCart } = useCart();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session_id) {
      // Clear the cart since payment was successful
      clearCart();

      // In a real app, you would fetch order details from your database
      // For now, we'll just show a success message
      setOrderDetails({
        orderNumber: `ORD-${Date.now()}`,
        total: 0, // Would be fetched from database
        items: [], // Would be fetched from database
      });
    }
    setLoading(false);
  }, [session_id, clearCart]);

  if (loading) {
    return (
      <Layout title="Processing...">
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <div>Processing your order...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Order Confirmed - Nexus Tech Hub">
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
            background: '#10b981',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 2rem'
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22,4 12,14.01 9,11.01"></polyline>
            </svg>
          </div>

          <h1 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#1e293b',
            marginBottom: '0.5rem'
          }}>
            Order Confirmed!
          </h1>

          <p style={{
            color: '#64748b',
            fontSize: '1.125rem',
            marginBottom: '2rem'
          }}>
            Thank you for your purchase. Your order has been successfully placed.
          </p>

          {orderDetails && (
            <div style={{
              background: '#f8fafc',
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
                Order Details
              </h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#64748b' }}>Order Number:</span>
                <span style={{ fontWeight: '600', color: '#1e293b' }}>{orderDetails.orderNumber}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Status:</span>
                <span style={{
                  fontWeight: '600',
                  color: '#10b981',
                  background: '#d1fae5',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.875rem'
                }}>
                  Processing
                </span>
              </div>
            </div>
          )}

          <div style={{
            background: '#fef3c7',
            border: '1px solid #f59e0b',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
                <path d="M10 5a2 2 0 0 1 4 0v7H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-4V5a2 2 0 0 1 4 0v2"></path>
              </svg>
              <span style={{ fontWeight: '600', color: '#92400e' }}>What's Next?</span>
            </div>
            <ul style={{
              textAlign: 'left',
              color: '#92400e',
              fontSize: '0.875rem',
              margin: 0,
              paddingLeft: '1.5rem'
            }}>
              <li>You'll receive an email confirmation shortly</li>
              <li>We'll send tracking information once your order ships</li>
              <li>Processing typically takes 1-2 business days</li>
            </ul>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
            <Link
              href="/account/orders"
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                color: 'white',
                padding: '0.875rem 2rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                textAlign: 'center',
                transition: 'all 0.2s ease'
              }}
            >
              View Order History
            </Link>

            <Link
              href="/products"
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
              Continue Shopping
            </Link>
          </div>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
              Need help? <Link href="/contact" style={{ color: '#3b82f6', textDecoration: 'none' }}>Contact us</Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
