'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../nexus-techhub-fresh/components/Layout/Layout';
import styles from '../styles/Checkout.module.css';

export default function Checkout() {
  const router = useRouter();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  // Form states
  const [billingInfo, setBillingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    emirate: '',
    postalCode: ''
  });

  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    emirate: '',
    postalCode: '',
    instructions: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [sameAsBilling, setSameAsBilling] = useState(true);

  // UAE Emirates options
  const emirates = [
    { value: 'dubai', label: 'Dubai' },
    { value: 'abu-dhabi', label: 'Abu Dhabi' },
    { value: 'sharjah', label: 'Sharjah' },
    { value: 'ajman', label: 'Ajman' },
    { value: 'umm-al-quwain', label: 'Umm Al Quwain' },
    { value: 'ras-al-khaimah', label: 'Ras Al Khaimah' },
    { value: 'fujairah', label: 'Fujairah' }
  ];

  // Get session ID
  const getSessionId = () => {
    return localStorage.getItem('cart-session-id') || '';
  };

  // Fetch cart data
  const fetchCart = async () => {
    try {
      setLoading(true);
      const sessionId = getSessionId();

      const response = await fetch(`/api/cart?session_id=${sessionId}`);
      const data = await response.json();

      if (data.success && data.data.items.length > 0) {
        setCart(data.data);
      } else {
        router.push('/cart');
      }
    } catch (err) {
      console.error('Error fetching cart:', err);
      setError('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  // Handle shipping info changes
  useEffect(() => {
    if (sameAsBilling) {
      setShippingInfo({
        firstName: billingInfo.firstName,
        lastName: billingInfo.lastName,
        phone: billingInfo.phone,
        address: billingInfo.address,
        city: billingInfo.city,
        emirate: billingInfo.emirate,
        postalCode: billingInfo.postalCode,
        instructions: shippingInfo.instructions
      });
    }
  }, [billingInfo, sameAsBilling]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cart || cart.items.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // Create checkout session
      const response = await fetch('/api/checkout/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartId: cart.id,
          billingInfo,
          shippingInfo: sameAsBilling ? billingInfo : shippingInfo,
          paymentMethod,
          sessionId: getSessionId()
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Redirect to Stripe checkout
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error(data.error || 'Failed to create checkout session');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  // Load cart on mount
  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) {
    return (
      <Layout title="Checkout" description="Complete your purchase">
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading checkout...</p>
        </div>
      </Layout>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <Layout title="Checkout" description="Complete your purchase">
        <div className={styles.emptyCheckout}>
          <h1>Your cart is empty</h1>
          <p>Add some products to your cart before checking out.</p>
          <Link href="/products" className={styles.continueShoppingBtn}>
            Continue Shopping
          </Link>
        </div>
      </Layout>
    );
  }

  const subtotal = cart.total || 0;
  const shipping = subtotal > 100 ? 0 : 15; // Free shipping over AED 100
  const tax = subtotal * 0.05; // 5% VAT
  const total = subtotal + shipping + tax;

  return (
    <Layout title="Checkout" description="Complete your purchase">
      <div className={styles.checkoutContainer}>
        <div className="container">
          <div className={styles.checkoutHeader}>
            <h1>Checkout</h1>
            <div className={styles.breadcrumb}>
              <Link href="/cart">Cart</Link>
              <span className={styles.separator}>→</span>
              <span className={styles.current}>Checkout</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className={styles.checkoutForm}>
            <div className={styles.checkoutContent}>
              {/* Left Column - Forms */}
              <div className={styles.checkoutForms}>
                {/* Billing Information */}
                <div className={styles.formSection}>
                  <h2>Billing Information</h2>
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label htmlFor="billingFirstName">First Name *</label>
                      <input
                        type="text"
                        id="billingFirstName"
                        value={billingInfo.firstName}
                        onChange={(e) => setBillingInfo({...billingInfo, firstName: e.target.value})}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="billingLastName">Last Name *</label>
                      <input
                        type="text"
                        id="billingLastName"
                        value={billingInfo.lastName}
                        onChange={(e) => setBillingInfo({...billingInfo, lastName: e.target.value})}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="billingEmail">Email Address *</label>
                      <input
                        type="email"
                        id="billingEmail"
                        value={billingInfo.email}
                        onChange={(e) => setBillingInfo({...billingInfo, email: e.target.value})}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="billingPhone">Phone Number *</label>
                      <input
                        type="tel"
                        id="billingPhone"
                        value={billingInfo.phone}
                        onChange={(e) => setBillingInfo({...billingInfo, phone: e.target.value})}
                        required
                      />
                    </div>
                    <div className={styles.formGroup} style={{gridColumn: '1 / -1'}}>
                      <label htmlFor="billingAddress">Street Address *</label>
                      <input
                        type="text"
                        id="billingAddress"
                        value={billingInfo.address}
                        onChange={(e) => setBillingInfo({...billingInfo, address: e.target.value})}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="billingCity">City *</label>
                      <input
                        type="text"
                        id="billingCity"
                        value={billingInfo.city}
                        onChange={(e) => setBillingInfo({...billingInfo, city: e.target.value})}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="billingEmirate">Emirate *</label>
                      <select
                        id="billingEmirate"
                        value={billingInfo.emirate}
                        onChange={(e) => setBillingInfo({...billingInfo, emirate: e.target.value})}
                        required
                      >
                        <option value="">Select Emirate</option>
                        {emirates.map(emirate => (
                          <option key={emirate.value} value={emirate.value}>
                            {emirate.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="billingPostalCode">Postal Code</label>
                      <input
                        type="text"
                        id="billingPostalCode"
                        value={billingInfo.postalCode}
                        onChange={(e) => setBillingInfo({...billingInfo, postalCode: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Information */}
                <div className={styles.formSection}>
                  <div className={styles.shippingHeader}>
                    <h2>Shipping Information</h2>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={sameAsBilling}
                        onChange={(e) => setSameAsBilling(e.target.checked)}
                      />
                      <span className={styles.checkbox}></span>
                      Same as billing address
                    </label>
                  </div>

                  {!sameAsBilling && (
                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <label htmlFor="shippingFirstName">First Name *</label>
                        <input
                          type="text"
                          id="shippingFirstName"
                          value={shippingInfo.firstName}
                          onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                          required={!sameAsBilling}
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="shippingLastName">Last Name *</label>
                        <input
                          type="text"
                          id="shippingLastName"
                          value={shippingInfo.lastName}
                          onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                          required={!sameAsBilling}
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="shippingPhone">Phone Number *</label>
                        <input
                          type="tel"
                          id="shippingPhone"
                          value={shippingInfo.phone}
                          onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                          required={!sameAsBilling}
                        />
                      </div>
                      <div className={styles.formGroup} style={{gridColumn: '1 / -1'}}>
                        <label htmlFor="shippingAddress">Street Address *</label>
                        <input
                          type="text"
                          id="shippingAddress"
                          value={shippingInfo.address}
                          onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                          required={!sameAsBilling}
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="shippingCity">City *</label>
                        <input
                          type="text"
                          id="shippingCity"
                          value={shippingInfo.city}
                          onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                          required={!sameAsBilling}
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="shippingEmirate">Emirate *</label>
                        <select
                          id="shippingEmirate"
                          value={shippingInfo.emirate}
                          onChange={(e) => setShippingInfo({...shippingInfo, emirate: e.target.value})}
                          required={!sameAsBilling}
                        >
                          <option value="">Select Emirate</option>
                          {emirates.map(emirate => (
                            <option key={emirate.value} value={emirate.value}>
                              {emirate.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="shippingPostalCode">Postal Code</label>
                        <input
                          type="text"
                          id="shippingPostalCode"
                          value={shippingInfo.postalCode}
                          onChange={(e) => setShippingInfo({...shippingInfo, postalCode: e.target.value})}
                        />
                      </div>
                    </div>
                  )}

                  <div className={styles.formGroup}>
                    <label htmlFor="shippingInstructions">Delivery Instructions (Optional)</label>
                    <textarea
                      id="shippingInstructions"
                      value={shippingInfo.instructions}
                      onChange={(e) => setShippingInfo({...shippingInfo, instructions: e.target.value})}
                      placeholder="Any special delivery instructions..."
                      rows={3}
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <div className={styles.formSection}>
                  <h2>Payment Method</h2>
                  <div className={styles.paymentMethods}>
                    <label className={styles.paymentMethod}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <span className={styles.paymentIcon}>💳</span>
                      <span>Credit/Debit Card</span>
                    </label>
                    <label className={styles.paymentMethod}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="apple_pay"
                        checked={paymentMethod === 'apple_pay'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <span className={styles.paymentIcon}>📱</span>
                      <span>Apple Pay</span>
                    </label>
                    <label className={styles.paymentMethod}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="google_pay"
                        checked={paymentMethod === 'google_pay'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <span className={styles.paymentIcon}>🎯</span>
                      <span>Google Pay</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column - Order Summary */}
              <div className={styles.orderSummary}>
                <h2>Order Summary</h2>

                <div className={styles.orderItems}>
                  {cart.items.map((item) => (
                    <div key={item.cart_item_id} className={styles.orderItem}>
                      <div className={styles.itemImage}>
                        <img
                          src={item.image || '/images/products/placeholder.svg'}
                          alt={item.name}
                          onError={(e) => {
                            e.target.src = '/images/products/placeholder.svg';
                          }}
                        />
                      </div>
                      <div className={styles.itemDetails}>
                        <h4>{item.name}</h4>
                        <p>Qty: {item.quantity}</p>
                        <p className={styles.itemPrice}>${item.total.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.orderTotals}>
                  <div className={styles.totalRow}>
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className={styles.totalRow}>
                    <span>Shipping:</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className={styles.totalRow}>
                    <span>VAT (5%):</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className={`${styles.totalRow} ${styles.finalTotal}`}>
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {error && (
                  <div className={styles.errorMessage}>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={processing}
                  className={styles.checkoutBtn}
                >
                  {processing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
                </button>

                <div className={styles.checkoutFooter}>
                  <p>🔒 Secure checkout powered by Stripe</p>
                  <p>📦 Free shipping on orders over AED 100</p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
