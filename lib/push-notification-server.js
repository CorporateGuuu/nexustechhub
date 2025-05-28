// Server-side Push Notification Service for Nexus TechHub - Phase 8
import webpush from 'web-push';

// VAPID configuration for UAE market
const VAPID_CONFIG = {
  publicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  privateKey: process.env.VAPID_PRIVATE_KEY,
  subject: process.env.VAPID_SUBJECT || 'mailto:admin@nexustechhub.ae'
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
  })
};

// Server-side push notification service
class PushNotificationServer {
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
      console.log('✅ Server-side push notification service initialized');
    } catch (error) {
      console.error('❌ Failed to initialize push notification service:', error);
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
        console.log('🗑️ Subscription no longer valid, should be removed');
      }
      
      throw error;
    }
  }

  // Send bulk notifications
  async sendBulkNotification(subscriptions, notificationType, data) {
    try {
      const results = [];
      
      for (const subscription of subscriptions) {
        try {
          const result = await this.sendNotification(subscription, notificationType, data);
          results.push({ subscription: subscription.endpoint, success: true, result });
        } catch (error) {
          results.push({ subscription: subscription.endpoint, success: false, error: error.message });
        }
      }

      console.log(`📱 Bulk notification sent to ${subscriptions.length} subscribers`);
      return results;

    } catch (error) {
      console.error('❌ Failed to send bulk notification:', error);
      throw error;
    }
  }

  // Get service status
  getStatus() {
    return {
      initialized: this.initialized,
      config: {
        vapidConfigured: !!(VAPID_CONFIG.publicKey && VAPID_CONFIG.privateKey),
        subject: VAPID_CONFIG.subject
      },
      templates: Object.keys(NOTIFICATION_TEMPLATES)
    };
  }
}

// Create singleton instance
const pushNotificationServer = new PushNotificationServer();

export default pushNotificationServer;
export { VAPID_CONFIG, NOTIFICATION_TEMPLATES, PushNotificationServer };
