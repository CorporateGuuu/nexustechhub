// Push Notification Service for Nexus TechHub PWA - Phase 8

// Client-side push notification service (browser environment)
if (typeof window !== 'undefined') {
  // Browser-specific implementation
}

// VAPID configuration for UAE market
const VAPID_CONFIG = {
  publicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  privateKey: process.env.VAPID_PRIVATE_KEY,
  subject: process.env.VAPID_SUBJECT || `mailto:${process.env.NEXT_PUBLIC_BUSINESS_EMAIL || process.env.BUSINESS_EMAIL}`
};

// Notification templates for UAE market
const NOTIFICATION_TEMPLATES = {
  orderConfirmation: (orderData) => ({
    title: '🎉 Order Confirmed - Nexus TechHub',
    body: `Your order #${orderData.orderNumber} for ${orderData.amount} AED has been confirmed!`,
    icon: '/icons/icon-192x192.svg',
    badge: '/icons/badge-72x72.svg',
    image: '/images/order-confirmation-banner.jpg',
    data: {
      type: 'order_confirmation',
      orderId: orderData.orderNumber,
      amount: orderData.amount,
      currency: 'AED',
      url: `/orders/${orderData.orderNumber}`
    },
    actions: [
      {
        action: 'view_order',
        title: 'View Order',
        icon: '/icons/view-order.svg'
      },
      {
        action: 'track_order',
        title: 'Track Order',
        icon: '/icons/track-order.svg'
      }
    ],
    tag: 'order-confirmation',
    requireInteraction: true,
    vibrate: [200, 100, 200]
  }),

  orderShipped: (orderData) => ({
    title: '📦 Order Shipped - Nexus TechHub',
    body: `Your order #${orderData.orderNumber} is on its way! Track: ${orderData.trackingNumber}`,
    icon: '/icons/icon-192x192.svg',
    badge: '/icons/badge-72x72.svg',
    image: '/images/shipping-banner.jpg',
    data: {
      type: 'order_shipped',
      orderId: orderData.orderNumber,
      trackingNumber: orderData.trackingNumber,
      url: `/orders/${orderData.orderNumber}/tracking`
    },
    actions: [
      {
        action: 'track_package',
        title: 'Track Package',
        icon: '/icons/track-package.svg'
      }
    ],
    tag: 'order-shipped',
    requireInteraction: false,
    vibrate: [100, 50, 100]
  }),

  orderDelivered: (orderData) => ({
    title: '✅ Order Delivered - Nexus TechHub',
    body: `Your order #${orderData.orderNumber} has been delivered! How was your experience?`,
    icon: '/icons/icon-192x192.svg',
    badge: '/icons/badge-72x72.svg',
    image: '/images/delivery-banner.jpg',
    data: {
      type: 'order_delivered',
      orderId: orderData.orderNumber,
      url: `/orders/${orderData.orderNumber}/review`
    },
    actions: [
      {
        action: 'leave_review',
        title: 'Leave Review',
        icon: '/icons/review.svg'
      },
      {
        action: 'contact_support',
        title: 'Contact Support',
        icon: '/icons/support.svg'
      }
    ],
    tag: 'order-delivered',
    requireInteraction: true,
    vibrate: [200, 100, 200, 100, 200]
  }),

  stockAlert: (productData) => ({
    title: '🔔 Back in Stock - Nexus TechHub',
    body: `${productData.name} is now available! Limited stock - order now.`,
    icon: '/icons/icon-192x192.svg',
    badge: '/icons/badge-72x72.svg',
    image: productData.image || '/images/stock-alert-banner.jpg',
    data: {
      type: 'stock_alert',
      productId: productData.id,
      productName: productData.name,
      price: productData.price,
      url: `/products/${productData.slug}`
    },
    actions: [
      {
        action: 'view_product',
        title: 'View Product',
        icon: '/icons/view-product.svg'
      },
      {
        action: 'add_to_cart',
        title: 'Add to Cart',
        icon: '/icons/add-cart.svg'
      }
    ],
    tag: 'stock-alert',
    requireInteraction: false,
    vibrate: [100, 50, 100]
  }),

  priceAlert: (productData) => ({
    title: '💰 Price Drop Alert - Nexus TechHub',
    body: `${productData.name} is now ${productData.newPrice} AED (was ${productData.oldPrice} AED)!`,
    icon: '/icons/icon-192x192.svg',
    badge: '/icons/badge-72x72.svg',
    image: productData.image || '/images/price-drop-banner.jpg',
    data: {
      type: 'price_alert',
      productId: productData.id,
      productName: productData.name,
      oldPrice: productData.oldPrice,
      newPrice: productData.newPrice,
      savings: productData.oldPrice - productData.newPrice,
      url: `/products/${productData.slug}`
    },
    actions: [
      {
        action: 'view_deal',
        title: 'View Deal',
        icon: '/icons/view-deal.svg'
      },
      {
        action: 'buy_now',
        title: 'Buy Now',
        icon: '/icons/buy-now.svg'
      }
    ],
    tag: 'price-alert',
    requireInteraction: true,
    vibrate: [200, 100, 200]
  }),

  promotionalOffer: (offerData) => ({
    title: '🎁 Special Offer - Nexus TechHub',
    body: `${offerData.title} - Save up to ${offerData.discount}% on mobile parts!`,
    icon: '/icons/icon-192x192.svg',
    badge: '/icons/badge-72x72.svg',
    image: offerData.image || '/images/promotion-banner.jpg',
    data: {
      type: 'promotional_offer',
      offerId: offerData.id,
      title: offerData.title,
      discount: offerData.discount,
      validUntil: offerData.validUntil,
      url: `/promotions/${offerData.slug}`
    },
    actions: [
      {
        action: 'view_offer',
        title: 'View Offer',
        icon: '/icons/view-offer.svg'
      },
      {
        action: 'shop_now',
        title: 'Shop Now',
        icon: '/icons/shop-now.svg'
      }
    ],
    tag: 'promotional-offer',
    requireInteraction: false,
    vibrate: [100, 50, 100, 50, 100]
  }),

  supportMessage: (messageData) => ({
    title: '💬 Support Message - Nexus TechHub',
    body: `New message from support: ${messageData.preview}`,
    icon: '/icons/icon-192x192.svg',
    badge: '/icons/badge-72x72.svg',
    data: {
      type: 'support_message',
      messageId: messageData.id,
      preview: messageData.preview,
      url: '/account/support'
    },
    actions: [
      {
        action: 'read_message',
        title: 'Read Message',
        icon: '/icons/read-message.svg'
      },
      {
        action: 'reply',
        title: 'Reply',
        icon: '/icons/reply.svg'
      }
    ],
    tag: 'support-message',
    requireInteraction: true,
    vibrate: [200, 100, 200]
  })
};

// Push notification service class
class PushNotificationService {
  constructor() {
    this.initialized = false;
    this.subscriptions = new Map();
  }

  // Initialize push notification service
  async initialize() {
    if (this.initialized) return;

    try {
      // Configure web-push with VAPID keys
      webpush.setVapidDetails(
        VAPID_CONFIG.subject,
        VAPID_CONFIG.publicKey,
        VAPID_CONFIG.privateKey
      );

      this.initialized = true;
      console.log('✅ Push notification service initialized');
    } catch (error) {
      console.error('❌ Failed to initialize push notification service:', error);
      throw error;
    }
  }

  // Subscribe user to push notifications
  async subscribe(subscription, userId = null, preferences = {}) {
    try {
      if (!this.initialized) {
        await this.initialize();
      }

      // Store subscription
      const subscriptionKey = this.generateSubscriptionKey(subscription);
      this.subscriptions.set(subscriptionKey, {
        subscription,
        userId,
        preferences,
        subscribedAt: new Date().toISOString(),
        lastUsed: new Date().toISOString()
      });

      // Store in database (implement your database logic here)
      // await storeSubscription(subscription, userId, preferences);

      console.log(`📱 User subscribed to push notifications: ${userId || 'anonymous'}`);
      return { success: true, subscriptionKey };

    } catch (error) {
      console.error('❌ Failed to subscribe to push notifications:', error);
      throw error;
    }
  }

  // Unsubscribe user from push notifications
  async unsubscribe(subscription, userId = null) {
    try {
      const subscriptionKey = this.generateSubscriptionKey(subscription);
      this.subscriptions.delete(subscriptionKey);

      // Remove from database
      // await removeSubscription(subscription, userId);

      console.log(`📱 User unsubscribed from push notifications: ${userId || 'anonymous'}`);
      return { success: true };

    } catch (error) {
      console.error('❌ Failed to unsubscribe from push notifications:', error);
      throw error;
    }
  }

  // Send notification to specific subscription
  async sendNotification(subscription, notificationType, data) {
    try {
      if (!this.initialized) {
        await this.initialize();
      }

      // Get notification template
      const template = NOTIFICATION_TEMPLATES[notificationType];
      if (!template) {
        throw new Error(`Unknown notification type: ${notificationType}`);
      }

      // Generate notification payload
      const notification = template(data);
      const payload = JSON.stringify(notification);

      // Send notification
      const result = await webpush.sendNotification(subscription, payload);

      console.log(`📱 Notification sent: ${notificationType}`);
      return result;

    } catch (error) {
      console.error('❌ Failed to send notification:', error);

      // Handle subscription errors
      if (error.statusCode === 410 || error.statusCode === 404) {
        // Subscription is no longer valid, remove it
        const subscriptionKey = this.generateSubscriptionKey(subscription);
        this.subscriptions.delete(subscriptionKey);
        console.log('🗑️ Removed invalid subscription');
      }

      throw error;
    }
  }

  // Send notification to multiple users
  async sendBulkNotification(userIds, notificationType, data) {
    try {
      const results = [];

      for (const userId of userIds) {
        const userSubscriptions = this.getUserSubscriptions(userId);

        for (const subscriptionData of userSubscriptions) {
          try {
            const result = await this.sendNotification(
              subscriptionData.subscription,
              notificationType,
              data
            );
            results.push({ userId, success: true, result });
          } catch (error) {
            results.push({ userId, success: false, error: error.message });
          }
        }
      }

      console.log(`📱 Bulk notification sent to ${userIds.length} users`);
      return results;

    } catch (error) {
      console.error('❌ Failed to send bulk notification:', error);
      throw error;
    }
  }

  // Send notification to all subscribers
  async sendBroadcastNotification(notificationType, data, filters = {}) {
    try {
      const results = [];

      for (const [subscriptionKey, subscriptionData] of this.subscriptions) {
        // Apply filters
        if (filters.userId && subscriptionData.userId !== filters.userId) {
          continue;
        }

        if (filters.preferences) {
          const userPrefs = subscriptionData.preferences || {};
          const shouldSend = Object.entries(filters.preferences).every(
            ([key, value]) => userPrefs[key] === value
          );
          if (!shouldSend) continue;
        }

        try {
          const result = await this.sendNotification(
            subscriptionData.subscription,
            notificationType,
            data
          );
          results.push({ subscriptionKey, success: true, result });
        } catch (error) {
          results.push({ subscriptionKey, success: false, error: error.message });
        }
      }

      console.log(`📱 Broadcast notification sent to ${results.length} subscribers`);
      return results;

    } catch (error) {
      console.error('❌ Failed to send broadcast notification:', error);
      throw error;
    }
  }

  // Get user subscriptions
  getUserSubscriptions(userId) {
    const userSubscriptions = [];

    for (const [subscriptionKey, subscriptionData] of this.subscriptions) {
      if (subscriptionData.userId === userId) {
        userSubscriptions.push(subscriptionData);
      }
    }

    return userSubscriptions;
  }

  // Generate subscription key
  generateSubscriptionKey(subscription) {
    return Buffer.from(subscription.endpoint).toString('base64').slice(0, 32);
  }

  // Update user preferences
  async updatePreferences(subscription, preferences) {
    try {
      const subscriptionKey = this.generateSubscriptionKey(subscription);
      const subscriptionData = this.subscriptions.get(subscriptionKey);

      if (subscriptionData) {
        subscriptionData.preferences = { ...subscriptionData.preferences, ...preferences };
        subscriptionData.lastUsed = new Date().toISOString();
        this.subscriptions.set(subscriptionKey, subscriptionData);
      }

      console.log(`📱 Updated notification preferences for subscription: ${subscriptionKey}`);
      return { success: true };

    } catch (error) {
      console.error('❌ Failed to update preferences:', error);
      throw error;
    }
  }

  // Get service statistics
  getStatistics() {
    const stats = {
      totalSubscriptions: this.subscriptions.size,
      userSubscriptions: 0,
      anonymousSubscriptions: 0,
      subscriptionsByType: {}
    };

    for (const [subscriptionKey, subscriptionData] of this.subscriptions) {
      if (subscriptionData.userId) {
        stats.userSubscriptions++;
      } else {
        stats.anonymousSubscriptions++;
      }
    }

    return stats;
  }

  // Get service status
  getStatus() {
    return {
      initialized: this.initialized,
      config: {
        vapidConfigured: !!(VAPID_CONFIG.publicKey && VAPID_CONFIG.privateKey),
        subject: VAPID_CONFIG.subject
      },
      statistics: this.getStatistics(),
      templates: Object.keys(NOTIFICATION_TEMPLATES)
    };
  }
}

// Create singleton instance
const pushNotificationService = new PushNotificationService();

export default pushNotificationService;
export { VAPID_CONFIG, NOTIFICATION_TEMPLATES, PushNotificationService };
