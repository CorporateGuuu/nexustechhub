// Stripe configuration for Nexus TechHub
// Mock implementation for demo purposes

export const stripe = {
  redirectToCheckout: async (options) => {
    console.log('Stripe redirectToCheckout:', options);
    return { error: null };
  },
  createPaymentMethod: async (options) => {
    console.log('Stripe createPaymentMethod:', options);
    return {
      paymentMethod: {
        id: 'pm_mock_payment_method',
        type: 'card'
      },
      error: null
    };
  }
};

export const loadStripe = async (publishableKey) => {
  console.log('Loading Stripe with key:', publishableKey);
  return stripe;
};

export default stripe;
