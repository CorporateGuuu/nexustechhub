'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../nexus-techhub-fresh/components/Layout/Layout';
import styles from '../../styles/CheckoutSuccess.module.css';

export default function CheckoutSuccess() {
  const router = useRouter();
  const { session_id } = router.query;
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (session_id) {
      fetchOrderDetails(session_id);
    }
  }, [session_id]);

  const fetchOrderDetails = async (sessionId) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/checkout/order-details?session_id=${sessionId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch order details');
      }

      const data = await response.json();

      if (data.success) {
        setOrderDetails(data.order);
      } else {
        throw new Error(data.error || 'Failed to load order details');
      }
    } catch (err) {
      console.error('Error fetching order details:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout title="Order Confirmation" description="Your order has been confirmed">
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <h3>Loading order details...</h3>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Order Confirmation" description="Your order has been confirmed">
        <div className={styles.errorContainer}>
          <div className={styles.errorIcon}>⚠️</div>
          <h1>Unable to Load Order Details</h1>
          <p>{error}</p>
          <p>Don't worry! Your payment was successful. Please contact our support team with your order reference.</p>
          <Link href="/contact" className={styles.contactBtn}>
            Contact Support
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Order Confirmation" description="Your order has been confirmed">
      <div className={styles.successContainer}>
        <div className="container">
          {/* Success Header */}
          <div className={styles.successHeader}>
            <div className={styles.successIcon}>
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22,4 12,14.01 9,11.01"/>
              </svg>
            </div>
            <h1>Order Confirmed!</h1>
            <p className={styles.successMessage}>
              Thank you for your purchase. Your order has been successfully placed and payment has been processed.
            </p>
          </div>

          {/* Order Details */}
          {orderDetails && (
            <div className={styles.orderDetails}>
              {/* Order Summary */}
              <div className={styles.orderSummary}>
                <h2>Order Summary</h2>
                <div className={styles.orderInfo}>
                  <div className={styles.infoRow}>
                    <span>Order Number:</span>
                    <span className={styles.orderNumber}>#{orderDetails.orderNumber || session_id?.slice(-8)}</span>
                  </div>
                  <div className={styles.infoRow}>
                    <span>Order Date:</span>
                    <span>{new Date().toLocaleDateString('en-AE', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                  <div className={styles.infoRow}>
                    <span>Payment Status:</span>
                    <span className={styles.paymentStatus}>Paid</span>
                  </div>
                  <div className={styles.infoRow}>
                    <span>Estimated Delivery:</span>
                    <span>3-5 Business Days</span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className={styles.orderItems}>
                <h3>Order Items</h3>
                <div className={styles.itemsList}>
                  {orderDetails.items?.map((item, index) => (
                    <div key={index} className={styles.orderItem}>
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
                        <p>Quantity: {item.quantity}</p>
                        <p className={styles.itemPrice}>${item.price?.toFixed(2)}</p>
                      </div>
                    </div>
                  )) || (
                    <div className={styles.orderItem}>
                      <div className={styles.itemImage}>
                        <img src="/images/products/placeholder.svg" alt="Product" />
                      </div>
                      <div className={styles.itemDetails}>
                        <h4>iPhone 15 Pro Max Screen</h4>
                        <p>Quantity: 1</p>
                        <p className={styles.itemPrice}>$399.99</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Totals */}
              <div className={styles.orderTotals}>
                <div className={styles.totalsRow}>
                  <span>Subtotal:</span>
                  <span>${orderDetails.subtotal?.toFixed(2) || '399.99'}</span>
                </div>
                <div className={styles.totalsRow}>
                  <span>Shipping:</span>
                  <span>{orderDetails.shipping === 0 ? 'Free' : `$${orderDetails.shipping?.toFixed(2) || '0.00'}`}</span>
                </div>
                <div className={styles.totalsRow}>
                  <span>VAT (5%):</span>
                  <span>${orderDetails.tax?.toFixed(2) || '20.00'}</span>
                </div>
                <div className={`${styles.totalsRow} ${styles.finalTotal}`}>
                  <span>Total:</span>
                  <span>${orderDetails.total?.toFixed(2) || '419.99'}</span>
                </div>
              </div>

              {/* Shipping & Billing Info */}
              <div className={styles.addressSection}>
                <div className={styles.addressColumn}>
                  <h3>Shipping Address</h3>
                  <div className={styles.addressCard}>
                    <p>{orderDetails.shippingAddress?.firstName} {orderDetails.shippingAddress?.lastName}</p>
                    <p>{orderDetails.shippingAddress?.address}</p>
                    <p>{orderDetails.shippingAddress?.city}, {orderDetails.shippingAddress?.emirate}</p>
                    <p>{orderDetails.shippingAddress?.postalCode}</p>
                    <p>{orderDetails.shippingAddress?.phone}</p>
                  </div>
                </div>

                <div className={styles.addressColumn}>
                  <h3>Billing Address</h3>
                  <div className={styles.addressCard}>
                    <p>{orderDetails.billingAddress?.firstName} {orderDetails.billingAddress?.lastName}</p>
                    <p>{orderDetails.billingAddress?.address}</p>
                    <p>{orderDetails.billingAddress?.city}, {orderDetails.billingAddress?.emirate}</p>
                    <p>{orderDetails.billingAddress?.postalCode}</p>
                    <p>{orderDetails.billingAddress?.phone}</p>
                    <p>{orderDetails.billingAddress?.email}</p>
                  </div>
                </div>
              </div>

              {/* Order Actions */}
              <div className={styles.orderActions}>
                <Link href="/products" className={styles.continueShoppingBtn}>
                  Continue Shopping
                </Link>
                <Link href="/account/orders" className={styles.viewOrdersBtn}>
                  View Order History
                </Link>
              </div>

              {/* What's Next */}
              <div className={styles.nextSteps}>
                <h3>What's Next?</h3>
                <div className={styles.steps}>
                  <div className={styles.step}>
                    <div className={styles.stepIcon}>📧</div>
                    <div className={styles.stepContent}>
                      <h4>Order Confirmation Email</h4>
                      <p>You'll receive an email confirmation with your order details and tracking information.</p>
                    </div>
                  </div>
                  <div className={styles.step}>
                    <div className={styles.stepIcon}>📦</div>
                    <div className={styles.stepContent}>
                      <h4>Order Processing</h4>
                      <p>We'll prepare your order for shipment within 1-2 business days.</p>
                    </div>
                  </div>
                  <div className={styles.step}>
                    <div className={styles.stepIcon}>🚚</div>
                    <div className={styles.stepContent}>
                      <h4>Shipping & Delivery</h4>
                      <p>Your order will be shipped via our trusted courier service with tracking updates.</p>
                    </div>
                  </div>
                  <div className={styles.step}>
                    <div className={styles.stepIcon}>📱</div>
                    <div className={styles.stepContent}>
                      <h4>Delivery Confirmation</h4>
                      <p>You'll receive SMS and email notifications when your order is out for delivery.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Support Information */}
              <div className={styles.supportSection}>
                <h3>Need Help?</h3>
                <p>
                  If you have any questions about your order, please don't hesitate to contact our support team.
                </p>
                <div className={styles.supportContact}>
                  <div className={styles.contactItem}>
                    <span className={styles.contactIcon}>📞</span>
                    <span>+971-XX-XXX-XXXX</span>
                  </div>
                  <div className={styles.contactItem}>
                    <span className={styles.contactIcon}>📧</span>
                    <span>support@nexustechhub.ae</span>
                  </div>
                  <div className={styles.contactItem}>
                    <span className={styles.contactIcon}>💬</span>
                    <span>WhatsApp: +971-XX-XXX-XXXX</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
