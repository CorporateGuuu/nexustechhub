require('dotenv').config();

const config = {
  databaseUrl: process.env.DATABASE_URL,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  nodeEnv: process.env.NODE_ENV || 'development',
};

if (!config.databaseUrl) {
  console.warn('Warning: DATABASE_URL is not set in environment variables.');
}

if (!config.stripeSecretKey) {
  console.warn('Warning: STRIPE_SECRET_KEY is not set in environment variables.');
}

if (!config.stripeWebhookSecret) {
  console.warn('Warning: STRIPE_WEBHOOK_SECRET is not set in environment variables.');
}

module.exports = config;
