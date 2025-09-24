'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/Layout';
import styles from '../../styles/OrderTracking.module.css';

export default function OrderTracking() {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchOrderDetails(id);
    }
  }, [id]);

  const fetchOrderDetails = async (orderId) => {
    try {
      setLoading(true);
      // In a real app, this would fetch from your database
      // For now, we'll simulate with mock data
      const mockOrder = {
        id: orderId,
        orderNumber: orderId.toUpperCase(),
        status: 'processing',
        createdAt: new Date().toISOString(),
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
        items: [
          {
            id: '1',
            name: 'iPhone 15 Pro Max Screen',
            quantity: 1,
            price: 399.99,
            image: '/images/products/placeholder.svg'
          }
        ],
        subtotal: 399.99,
        shipping: 15.00,
        tax: 20.00,
        total: 434.99,
        shippingAddress: {
          firstName: 'John',
          lastName: 'Doe',
          address: '123 Main St',
          city: 'Dubai',
          emirate: 'dubai',
          postalCode: '12345',
          phone: '+971-50-123-4567'
        },
        shipment: {
          trackingNumber: 'NXTH123456AB',
          carrier: 'DHL',
          status: 'in_transit',
          estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          trackingHistory: [
            {
              status: 'Order Placed',
              timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
              location: 'Dubai, UAE'
            },
            {
              status: 'Order Confirmed',
              timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
              location: 'Dubai, UAE'
            },
            {
              status: 'Processing',
              timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
              location: 'Dubai Warehouse'
            },
            {
              status: 'Shipped',
              timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
              location: 'Dubai, UAE'
            },
            {
              status: 'In Transit',
              timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
              location: 'Dubai International Airport'
            }
          ]
        }
      };

      setOrder(mockOrder);
    } catch (err) {
      console.error('Error fetching order:', err);
      setError('Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
      case 'processing':
        return '#ffc107';
      case 'shipped':
      case 'in_transit':
        return '#007bff';
      case 'delivered':
        return '#28a745';
      case 'cancelled':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return '✅';
      case 'processing':
        return '⚙️';
      case 'shipped':
        return '📦';
      case 'in_transit':
        return '🚚';
      case 'delivered':
        return '🎉';
      case 'cancelled':
        return '❌';
      default:
        return '📋';
    }
  };

  if (loading) {
    return (
      <Layout title="Order Tracking" description="Track your order status">
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <h3>Loading order details...</h3>
        </div>
      </Layout>
    );
  }

  if (error || !order) {
    return (
      <Layout title="Order Tracking" description="Track your order status">
        <div className={styles.errorContainer}>
          <div className={styles.errorIcon}>⚠️</div>
          <h1>Order Not Found</h1>
          <p>{error || 'The order you\'re looking for doesn\'t exist.'}</p>
          <Link href="/account/orders" className={styles.backBtn}>
            View All Orders
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`Order ${order.orderNumber}`} description="Track your order status">
      <div className={styles.orderTracking}>
        <div className="container">
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.breadcrumb}>
              <Link href="/">Home</Link>
              <span className={styles.separator}>/</span>
              <Link href="/account/orders">Orders</Link>
              <span className={styles.separator}>/</span>
              <span className={styles.current}>Order {order.orderNumber}</span>
            </div>

            <div className={styles.orderHeader}>
              <h1>Order {order.orderNumber}</h1>
              <div className={styles.orderStatus}>
                <span
                  className={styles.statusBadge}
                  style={{ backgroundColor: getStatusColor(order.status) }}
                >
                  {getStatusIcon(order.status)} {order.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.trackingContent}>
            {/* Order Summary */}
            <div className={styles.orderSummary}>
              <h2>Order Summary</h2>
              <div className={styles.summaryGrid}>
                <div className={styles.summaryItem}>
                  <span className={styles.label}>Order Date:</span>
                  <span className={styles.value}>
                    {new Date(order.createdAt).toLocaleDateString('en-AE', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.label}>Total Amount:</span>
                  <span className={styles.value}>${order.total.toFixed(2)}</span>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.label}>Items:</span>
                  <span className={styles.value}>{order.items.length}</span>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.label}>Estimated Delivery:</span>
                  <span className={styles.value}>
                    {order.shipment ? new Date(order.shipment.estimatedDelivery).toLocaleDateString('en-AE', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    }) : 'TBD'}
                  </span>
                </div>
              </div>
            </div>

            {/* Tracking Information */}
            {order.shipment && (
              <div className={styles.trackingSection}>
                <h2>Shipping Information</h2>
                <div className={styles.trackingCard}>
                  <div className={styles.trackingHeader}>
                    <div className={styles.carrierInfo}>
                      <h3>{order.shipment.carrier}</h3>
                      <p>Tracking: {order.shipment.trackingNumber}</p>
                    </div>
                    <div className={styles.deliveryEstimate}>
                      <span className={styles.estimateLabel}>Estimated Delivery:</span>
                      <span className={styles.estimateDate}>
                        {new Date(order.shipment.estimatedDelivery).toLocaleDateString('en-AE', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Tracking Timeline */}
                  <div className={styles.trackingTimeline}>
                    {order.shipment.trackingHistory.map((event, index) => (
                      <div key={index} className={styles.timelineItem}>
                        <div className={styles.timelineMarker}>
                          <div className={styles.markerDot}></div>
                          {index < order.shipment.trackingHistory.length - 1 && (
                            <div className={styles.markerLine}></div>
                          )}
                        </div>
                        <div className={styles.timelineContent}>
                          <h4>{event.status}</h4>
                          <p className={styles.timelineLocation}>{event.location}</p>
                          <p className={styles.timelineDate}>
                            {new Date(event.timestamp).toLocaleDateString('en-AE', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Order Items */}
            <div className={styles.orderItems}>
              <h2>Order Items</h2>
              <div className={styles.itemsList}>
                {order.items.map((item) => (
                  <div key={item.id} className={styles.orderItem}>
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
                      <p className={styles.itemQuantity}>Quantity: {item.quantity}</p>
                      <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Totals */}
            <div className={styles.orderTotals}>
              <h2>Order Total</h2>
              <div className={styles.totalsBreakdown}>
                <div className={styles.totalRow}>
                  <span>Subtotal:</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className={styles.totalRow}>
                  <span>Shipping:</span>
                  <span>{order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}</span>
                </div>
                <div className={styles.totalRow}>
                  <span>VAT (5%):</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                <div className={`${styles.totalRow} ${styles.finalTotal}`}>
                  <span>Total:</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className={styles.shippingAddress}>
              <h2>Shipping Address</h2>
              <div className={styles.addressCard}>
                <p className={styles.addressName}>
                  {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                </p>
                <p>{order.shippingAddress.address}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.emirate}</p>
                <p>{order.shippingAddress.postalCode}</p>
                <p>{order.shippingAddress.phone}</p>
              </div>
            </div>

            {/* Support */}
            <div className={styles.supportSection}>
              <h2>Need Help?</h2>
              <p>If you have any questions about your order, please contact our support team.</p>
              <div className={styles.supportOptions}>
                <Link href="/contact" className={styles.supportBtn}>
                  Contact Support
                </Link>
                <Link href="/faq" className={styles.supportBtn}>
                  FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
