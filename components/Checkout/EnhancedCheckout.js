// Enhanced Checkout Component for Nexus TechHub - UAE Market
import React, { useState, useEffect } from 'react';
import { getStripe, createCheckoutSession, calculateUAETax, formatCurrency, validateUAEPhone, UAE_EMIRATES } from '../../lib/stripe';
import styles from './EnhancedCheckout.module.css';

export default function EnhancedCheckout({ cartItems = [], onSuccess, onError }) {
  const [loading, setLoading] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    emirate: '',
    address: '',
    city: '',
    postalCode: '',
  });
  const [errors, setErrors] = useState({});
  const [totals, setTotals] = useState(null);

  // Calculate totals when cart items change
  useEffect(() => {
    if (cartItems.length > 0) {
      const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const taxCalculation = calculateUAETax(subtotal);
      setTotals(taxCalculation);
    }
  }, [cartItems]);

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    if (!customerInfo.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!customerInfo.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!customerInfo.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validateUAEPhone(customerInfo.phone)) {
      newErrors.phone = 'Please enter a valid UAE phone number';
    }

    if (!customerInfo.emirate) {
      newErrors.emirate = 'Please select your emirate';
    }

    if (!customerInfo.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!customerInfo.city.trim()) {
      newErrors.city = 'City is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle checkout process
  const handleCheckout = async () => {
    if (!validateForm()) {
      return;
    }

    if (cartItems.length === 0) {
      onError?.('Your cart is empty');
      return;
    }

    setLoading(true);

    try {
      // Create checkout session
      const session = await createCheckoutSession(cartItems, customerInfo);
      
      // Redirect to Stripe Checkout
      const stripe = await getStripe();
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.sessionId,
      });

      if (error) {
        throw new Error(error.message);
      }

      onSuccess?.(session);
    } catch (error) {
      console.error('Checkout error:', error);
      onError?.(error.message || 'Failed to process checkout');
    } finally {
      setLoading(false);
    }
  };

  if (!totals) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Calculating totals...</p>
      </div>
    );
  }

  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.checkoutHeader}>
        <h2>Secure Checkout</h2>
        <div className={styles.securityBadge}>
          <span className={styles.lockIcon}>🔒</span>
          <span>SSL Secured</span>
        </div>
      </div>

      <div className={styles.checkoutContent}>
        {/* Customer Information Form */}
        <div className={styles.customerForm}>
          <h3>Customer Information</h3>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={customerInfo.name}
                onChange={handleInputChange}
                className={errors.name ? styles.error : ''}
                placeholder="Enter your full name"
              />
              {errors.name && <span className={styles.errorText}>{errors.name}</span>}
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={customerInfo.email}
                onChange={handleInputChange}
                className={errors.email ? styles.error : ''}
                placeholder="your.email@example.com"
              />
              {errors.email && <span className={styles.errorText}>{errors.email}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={customerInfo.phone}
                onChange={handleInputChange}
                className={errors.phone ? styles.error : ''}
                placeholder="+971 50 123 4567"
              />
              {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="emirate">Emirate *</label>
              <select
                id="emirate"
                name="emirate"
                value={customerInfo.emirate}
                onChange={handleInputChange}
                className={errors.emirate ? styles.error : ''}
              >
                <option value="">Select Emirate</option>
                {Object.entries(UAE_EMIRATES).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
                ))}
              </select>
              {errors.emirate && <span className={styles.errorText}>{errors.emirate}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="city">City *</label>
              <input
                type="text"
                id="city"
                name="city"
                value={customerInfo.city}
                onChange={handleInputChange}
                className={errors.city ? styles.error : ''}
                placeholder="Enter your city"
              />
              {errors.city && <span className={styles.errorText}>{errors.city}</span>}
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="address">Address *</label>
              <textarea
                id="address"
                name="address"
                value={customerInfo.address}
                onChange={handleInputChange}
                className={errors.address ? styles.error : ''}
                placeholder="Enter your full address"
                rows="3"
              />
              {errors.address && <span className={styles.errorText}>{errors.address}</span>}
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="postalCode">Postal Code</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={customerInfo.postalCode}
                onChange={handleInputChange}
                placeholder="Optional"
              />
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className={styles.orderSummary}>
          <h3>Order Summary</h3>
          
          <div className={styles.orderItems}>
            {cartItems.map((item, index) => (
              <div key={index} className={styles.orderItem}>
                <div className={styles.itemInfo}>
                  <span className={styles.itemName}>{item.name}</span>
                  <span className={styles.itemSku}>SKU: {item.sku}</span>
                </div>
                <div className={styles.itemPrice}>
                  <span className={styles.quantity}>×{item.quantity}</span>
                  <span className={styles.price}>{formatCurrency(item.price * item.quantity)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.orderTotals}>
            <div className={styles.totalRow}>
              <span>Subtotal:</span>
              <span>{formatCurrency(totals.subtotal)}</span>
            </div>
            <div className={styles.totalRow}>
              <span>VAT ({totals.vatRate}%):</span>
              <span>{formatCurrency(totals.vat)}</span>
            </div>
            <div className={styles.totalRow}>
              <span>Shipping:</span>
              <span className={styles.freeShipping}>FREE</span>
            </div>
            <div className={styles.totalRow + ' ' + styles.grandTotal}>
              <span>Total:</span>
              <span>{formatCurrency(totals.total)}</span>
            </div>
          </div>

          <button
            className={styles.checkoutButton}
            onClick={handleCheckout}
            disabled={loading || cartItems.length === 0}
          >
            {loading ? (
              <>
                <div className={styles.buttonSpinner}></div>
                Processing...
              </>
            ) : (
              <>
                <span className={styles.lockIcon}>🔒</span>
                Secure Checkout - {formatCurrency(totals.total)}
              </>
            )}
          </button>

          <div className={styles.paymentMethods}>
            <p>We accept:</p>
            <div className={styles.paymentIcons}>
              <span>💳 Cards</span>
              <span>📱 Apple Pay</span>
              <span>🌐 Google Pay</span>
              <span>💰 Alipay</span>
            </div>
          </div>

          <div className={styles.securityInfo}>
            <p>
              <span className={styles.lockIcon}>🔒</span>
              Your payment information is secure and encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
