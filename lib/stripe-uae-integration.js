// Enhanced Stripe Integration for UAE Market - Nexus TechHub Phase 8
import { loadStripe } from '@stripe/stripe-js';

// UAE market configuration
const UAE_CONFIG = {
  currency: 'aed',
  country: 'AE',
  locale: 'en-AE',
  vatRate: 0.05, // 5% VAT in UAE
  freeShippingThreshold: 200, // AED
  businessInfo: {
    name: 'Nexus TechHub',
    address: 'FAMC3062, Compass Building, Al Shohada Road, AL Hamra Industrial Zone-FZ, Ras Al Khaimah, United Arab Emirates',
    phone: '+971 58 553 1029',
    email: 'info@nexustechhub.ae',
    website: 'https://nexustechhub.netlify.app'
  }
};

// Stripe configuration
const STRIPE_CONFIG = {
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  secretKey: process.env.STRIPE_SECRET_KEY,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  apiVersion: '2023-10-16'
};

// Initialize Stripe
let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_CONFIG.publishableKey, {
      locale: UAE_CONFIG.locale,
      apiVersion: STRIPE_CONFIG.apiVersion
    });
  }
  return stripePromise;
};

// Enhanced Stripe service for UAE market
class StripeUAEService {
  constructor() {
    this.stripe = null;
    this.initialized = false;
  }

  // Initialize Stripe service
  async initialize() {
    if (this.initialized) return;

    try {
      this.stripe = await getStripe();
      this.initialized = true;
      console.log('✅ Stripe UAE service initialized');
    } catch (error) {
      console.error('❌ Failed to initialize Stripe UAE service:', error);
      throw error;
    }
  }

  // Create enhanced checkout session for UAE market
  async createCheckoutSession(items, customerInfo = {}, options = {}) {
    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          customerInfo,
          options: {
            currency: UAE_CONFIG.currency,
            country: UAE_CONFIG.country,
            locale: UAE_CONFIG.locale,
            vatRate: UAE_CONFIG.vatRate,
            freeShippingThreshold: UAE_CONFIG.freeShippingThreshold,
            businessInfo: UAE_CONFIG.businessInfo,
            ...options
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const session = await response.json();
      return session;
    } catch (error) {
      console.error('Failed to create checkout session:', error);
      throw error;
    }
  }

  // Redirect to Stripe Checkout
  async redirectToCheckout(sessionId) {
    try {
      if (!this.stripe) {
        await this.initialize();
      }

      const { error } = await this.stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (error) {
        console.error('Stripe redirect error:', error);
        throw error;
      }
    } catch (error) {
      console.error('Failed to redirect to checkout:', error);
      throw error;
    }
  }

  // Create payment intent for custom checkout
  async createPaymentIntent(amount, metadata = {}) {
    try {
      const response = await fetch('/api/stripe/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // Convert to fils (smallest currency unit)
          currency: UAE_CONFIG.currency,
          metadata: {
            business: 'nexus-techhub',
            country: UAE_CONFIG.country,
            ...metadata
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const paymentIntent = await response.json();
      return paymentIntent;
    } catch (error) {
      console.error('Failed to create payment intent:', error);
      throw error;
    }
  }

  // Confirm payment with card element
  async confirmPayment(clientSecret, cardElement, billingDetails = {}) {
    try {
      if (!this.stripe) {
        await this.initialize();
      }

      const { error, paymentIntent } = await this.stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: billingDetails.name,
              email: billingDetails.email,
              phone: billingDetails.phone,
              address: {
                line1: billingDetails.address?.line1,
                line2: billingDetails.address?.line2,
                city: billingDetails.address?.city,
                state: billingDetails.address?.state,
                postal_code: billingDetails.address?.postal_code,
                country: UAE_CONFIG.country,
              },
            },
          },
        }
      );

      if (error) {
        console.error('Payment confirmation error:', error);
        throw error;
      }

      return paymentIntent;
    } catch (error) {
      console.error('Failed to confirm payment:', error);
      throw error;
    }
  }

  // Calculate UAE taxes and fees
  calculateUAETaxes(subtotal, shippingCost = 0) {
    const vatAmount = (subtotal + shippingCost) * UAE_CONFIG.vatRate;
    const total = subtotal + shippingCost + vatAmount;

    return {
      subtotal,
      shippingCost,
      vatAmount: Math.round(vatAmount * 100) / 100,
      vatRate: UAE_CONFIG.vatRate,
      total: Math.round(total * 100) / 100,
      currency: UAE_CONFIG.currency,
      freeShipping: subtotal >= UAE_CONFIG.freeShippingThreshold
    };
  }

  // Format currency for UAE market
  formatCurrency(amount, showSymbol = true) {
    const formatter = new Intl.NumberFormat(UAE_CONFIG.locale, {
      style: showSymbol ? 'currency' : 'decimal',
      currency: UAE_CONFIG.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formatter.format(amount);
  }

  // Validate UAE phone number
  validateUAEPhone(phone) {
    // UAE phone number patterns
    const uaePhoneRegex = /^(\+971|00971|971)?[0-9]{8,9}$/;
    return uaePhoneRegex.test(phone.replace(/\s+/g, ''));
  }

  // Get UAE shipping options
  getUAEShippingOptions(subtotal) {
    const freeShipping = subtotal >= UAE_CONFIG.freeShippingThreshold;

    return [
      {
        id: 'standard',
        name: 'Standard Shipping',
        description: 'Delivery within UAE (3-5 business days)',
        price: freeShipping ? 0 : 25,
        estimatedDays: '3-5',
        free: freeShipping
      },
      {
        id: 'express',
        name: 'Express Shipping',
        description: 'Fast delivery within UAE (1-2 business days)',
        price: freeShipping ? 15 : 40,
        estimatedDays: '1-2',
        free: false
      },
      {
        id: 'same-day',
        name: 'Same Day Delivery',
        description: 'Same day delivery in Dubai & Abu Dhabi',
        price: 60,
        estimatedDays: 'Same day',
        free: false,
        available: ['Dubai', 'Abu Dhabi']
      }
    ];
  }

  // Create customer in Stripe
  async createCustomer(customerData) {
    try {
      const response = await fetch('/api/stripe/create-customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...customerData,
          address: {
            ...customerData.address,
            country: UAE_CONFIG.country
          },
          metadata: {
            business: 'nexus-techhub',
            market: 'uae',
            source: 'website'
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const customer = await response.json();
      return customer;
    } catch (error) {
      console.error('Failed to create customer:', error);
      throw error;
    }
  }

  // Retrieve payment methods for customer
  async getCustomerPaymentMethods(customerId) {
    try {
      const response = await fetch(`/api/stripe/customer-payment-methods?customerId=${customerId}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const paymentMethods = await response.json();
      return paymentMethods;
    } catch (error) {
      console.error('Failed to retrieve payment methods:', error);
      throw error;
    }
  }

  // Handle subscription for recurring services
  async createSubscription(customerId, priceId, metadata = {}) {
    try {
      const response = await fetch('/api/stripe/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId,
          priceId,
          currency: UAE_CONFIG.currency,
          metadata: {
            business: 'nexus-techhub',
            country: UAE_CONFIG.country,
            ...metadata
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const subscription = await response.json();
      return subscription;
    } catch (error) {
      console.error('Failed to create subscription:', error);
      throw error;
    }
  }

  // Process refund
  async processRefund(paymentIntentId, amount = null, reason = 'requested_by_customer') {
    try {
      const response = await fetch('/api/stripe/process-refund', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentIntentId,
          amount: amount ? Math.round(amount * 100) : null, // Convert to fils
          reason,
          metadata: {
            business: 'nexus-techhub',
            processed_by: 'customer_service'
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const refund = await response.json();
      return refund;
    } catch (error) {
      console.error('Failed to process refund:', error);
      throw error;
    }
  }

  // Get payment analytics
  async getPaymentAnalytics(startDate, endDate) {
    try {
      const response = await fetch('/api/stripe/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate,
          endDate,
          currency: UAE_CONFIG.currency,
          country: UAE_CONFIG.country
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const analytics = await response.json();
      return analytics;
    } catch (error) {
      console.error('Failed to get payment analytics:', error);
      throw error;
    }
  }

  // Validate Stripe webhook
  validateWebhook(payload, signature) {
    try {
      const stripe = require('stripe')(STRIPE_CONFIG.secretKey);
      const event = stripe.webhooks.constructEvent(
        payload,
        signature,
        STRIPE_CONFIG.webhookSecret
      );
      return event;
    } catch (error) {
      console.error('Webhook validation failed:', error);
      throw error;
    }
  }

  // Get service status
  getStatus() {
    return {
      initialized: this.initialized,
      config: {
        currency: UAE_CONFIG.currency,
        country: UAE_CONFIG.country,
        locale: UAE_CONFIG.locale,
        vatRate: UAE_CONFIG.vatRate,
        freeShippingThreshold: UAE_CONFIG.freeShippingThreshold
      },
      stripe: !!this.stripe
    };
  }
}

// Create singleton instance
const stripeUAE = new StripeUAEService();

export default stripeUAE;
export { UAE_CONFIG, STRIPE_CONFIG, StripeUAEService };
