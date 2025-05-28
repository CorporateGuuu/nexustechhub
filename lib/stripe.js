// Stripe configuration for Nexus TechHub - UAE Market
import { loadStripe } from '@stripe/stripe-js';

// UAE-specific Stripe configuration
const STRIPE_CONFIG = {
  currency: 'aed',
  country: 'AE',
  locale: 'en-AE',
  paymentMethods: ['card', 'alipay', 'apple_pay', 'google_pay'],
  vatRate: 0.05, // 5% VAT in UAE
};

// Initialize Stripe with UAE configuration
let stripePromise;
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
      {
        locale: STRIPE_CONFIG.locale,
      }
    );
  }
  return stripePromise;
};

// UAE tax calculation utility
export const calculateUAETax = (amount) => {
  const vatAmount = amount * STRIPE_CONFIG.vatRate;
  return {
    subtotal: amount,
    vat: vatAmount,
    total: amount + vatAmount,
    vatRate: STRIPE_CONFIG.vatRate * 100, // Convert to percentage
  };
};

// Create checkout session for UAE market
export const createCheckoutSession = async (items, customerInfo = {}) => {
  try {
    const response = await fetch('/api/checkout/create-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items,
        customerInfo,
        currency: STRIPE_CONFIG.currency,
        country: STRIPE_CONFIG.country,
        paymentMethods: STRIPE_CONFIG.paymentMethods,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }

    const session = await response.json();
    return session;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

// Payment method configuration for UAE
export const getPaymentMethodConfig = () => ({
  currency: STRIPE_CONFIG.currency,
  payment_method_types: STRIPE_CONFIG.paymentMethods,
  billing_address_collection: 'required',
  shipping_address_collection: {
    allowed_countries: ['AE', 'SA', 'QA', 'KW', 'BH', 'OM'],
  },
  locale: STRIPE_CONFIG.locale,
});

// Format currency for UAE market
export const formatCurrency = (amount, currency = 'AED') => {
  return new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount);
};

// Validate UAE phone number
export const validateUAEPhone = (phone) => {
  const uaePhoneRegex = /^(\+971|971|0)?[0-9]{8,9}$/;
  return uaePhoneRegex.test(phone.replace(/\s+/g, ''));
};

// UAE Emirates mapping for shipping
export const UAE_EMIRATES = {
  'abu-dhabi': 'Abu Dhabi',
  'dubai': 'Dubai',
  'sharjah': 'Sharjah',
  'ajman': 'Ajman',
  'umm-al-quwain': 'Umm Al Quwain',
  'ras-al-khaimah': 'Ras Al Khaimah',
  'fujairah': 'Fujairah',
};

export { STRIPE_CONFIG };
export default getStripe;
