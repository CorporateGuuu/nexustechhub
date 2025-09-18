import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../components/Layout/Layout';
import { useCart } from '../contexts/CartContext';
import getStripe from '../lib/stripe';

export default function Checkout() {
  const { data: session, status } = useSession();
  const { cart, loading: cartLoading, getTotal, getItemCount } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/checkout');
    }
  }, [status, router]);

  // Redirect if cart is empty
  useEffect(() => {
    if (!cartLoading && (!cart?.items || cart.items.length === 0)) {
      router.push('/cart');
    }
  }, [cart, cartLoading, router]);

  const handleCheckout = async () => {
    setLoading(true);
    setError('');

    try {
      // Prepare cart items for Stripe
      const items = cart.items.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
        variant_id: item.variant_id,
        price: item.price,
      }));

      // Create checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          successUrl: `${window.location.origin}/checkout/success`,
          cancelUrl: `${window.location.origin}/checkout/cancelled`,
        }),
      });

      const { sessionId, url, error: apiError } = await response.json();

      if (apiError) {
        setError(apiError);
        return;
      }

      // Redirect to Stripe Checkout
      const stripe = await getStripe();
      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId });

      if (stripeError) {
        console.error('Stripe redirect error:', stripeError);
        setError('Failed to redirect to checkout. Please try again.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || cartLoading) {
    return (
      <Layout title="Loading...">
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <div>Loading...</div>
        </div>
      </Layout>
    );
  }

  if (!session) {
    return null; // Will redirect
  }

  if (!cart?.items || cart.items.length === 0) {
    return null; // Will redirect
  }

  const subtotal = getTotal();
  const shipping = subtotal > 50 ? 0 : 9.99; // Free shipping over $50
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  return (
    <Layout title="Checkout - Nexus Tech Hub">
      <div style={{ background: '#f8fafc', minHeight: '80vh', padding: '2rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '2rem' }}>

            {/* Main Content */}
            <div>
              <div style={{ marginBottom: '2rem' }}>
                <Link href="/cart" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: '500' }}>
                  ← Back to Cart
                </Link>
              </div>

              <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#1e293b', marginBottom: '2rem' }}>
                Checkout
              </h1>

              {/* Contact Information */}
              <div style={{ background: 'white', borderRadius: '12px', padding: '2rem', marginBottom: '2rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem' }}>
                  Contact Information
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: '#3b82f6',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: '600'
                  }}>
                    {session.user.firstName?.[0] || session.user.name?.[0] || 'U'}
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', color: '#1e293b' }}>
                      {session.user.firstName} {session.user.lastName}
                    </div>
                    <div style={{ color: '#64748b', fontSize: '0.875rem' }}>
                      {session.user.email}
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div style={{ background: 'white', borderRadius: '12px', padding: '2rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem' }}>
                  Order Summary
                </h2>

                <div style={{ marginBottom: '2rem' }}>
                  {cart.items.map((item) => (
                    <div key={item.cart_item_id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem 0',
                      borderBottom: '1px solid #e5e7eb'
                    }}>
                      <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        flexShrink: 0
                      }}>
                        <img
                          src={item.image || '/images/products/placeholder.jpg'}
                          alt={item.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={(e) => {
                            e.target.src = '/images/products/placeholder.jpg';
                          }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontWeight: '600', color: '#1e293b', margin: '0 0 0.25rem 0' }}>
                          {item.name}
                        </h3>
                        <div style={{ color: '#64748b', fontSize: '0.875rem' }}>
                          Quantity: {item.quantity}
                        </div>
                        {item.variant_info && (
                          <div style={{ color: '#64748b', fontSize: '0.875rem' }}>
                            {item.variant_info.type}: {item.variant_info.value}
                          </div>
                        )}
                      </div>
                      <div style={{ fontWeight: '600', color: '#1e293b' }}>
                        ${item.total.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#64748b' }}>Subtotal</span>
                    <span style={{ fontWeight: '600' }}>${subtotal.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#64748b' }}>Shipping</span>
                    <span style={{ fontWeight: '600' }}>
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{ color: '#64748b' }}>Tax</span>
                    <span style={{ fontWeight: '600' }}>${tax.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.125rem', fontWeight: '700', color: '#1e293b' }}>
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div style={{
                background: 'white',
                borderRadius: '12px',
                padding: '2rem',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                position: 'sticky',
                top: '2rem'
              }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem' }}>
                  Payment
                </h2>

                {error && (
                  <div style={{
                    background: '#fee2e2',
                    color: '#dc2626',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    fontSize: '0.875rem'
                  }}>
                    {error}
                  </div>
                )}

                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#64748b' }}>Items ({getItemCount()})</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#64748b' }}>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{ color: '#64748b' }}>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.125rem', fontWeight: '700', color: '#1e293b' }}>
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '1rem',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? '0.7' : '1',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {loading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
                </button>

                <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                  <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
                    Secure checkout powered by Stripe
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
