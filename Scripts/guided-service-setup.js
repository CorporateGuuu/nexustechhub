#!/usr/bin/env node

// Guided Service Configuration for Nexus TechHub Live Deployment
const fs = require('fs');
const readline = require('readline');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
};

// Logging functions
const log = (message, color = colors.reset) => {
  console.log(`${color}${message}${colors.reset}`);
};

const logStep = (step, message) => {
  log(`\n${colors.cyan}[STEP ${step}]${colors.reset} ${colors.bright}${message}${colors.reset}`);
};

const logSuccess = (message) => {
  log(`${colors.green}✅ ${message}${colors.reset}`);
};

const logError = (message) => {
  log(`${colors.red}❌ ${message}${colors.reset}`);
};

const logWarning = (message) => {
  log(`${colors.yellow}⚠️  ${message}${colors.reset}`);
};

const logInfo = (message) => {
  log(`${colors.blue}ℹ️  ${message}${colors.reset}`);
};

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Prompt user for input
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

// Service configuration data
let serviceConfig = {
  stripe: {},
  google: {},
  email: {},
  sentry: {},
  analytics: {},
  vapid: {}
};

// Main guided setup function
async function guidedServiceSetup() {
  try {
    log(`\n${colors.bright}${colors.magenta}🚀 NEXUS TECHHUB LIVE DEPLOYMENT - GUIDED SERVICE SETUP${colors.reset}`);
    log(`${colors.bright}This wizard will guide you through setting up all critical services for production.${colors.reset}\n`);

    // Step 1: Stripe Configuration
    await configureStripe();

    // Step 2: Google OAuth Configuration
    await configureGoogleOAuth();

    // Step 3: Email Service Configuration
    await configureEmailService();

    // Step 4: Sentry Error Monitoring
    await configureSentry();

    // Step 5: Google Analytics
    await configureAnalytics();

    // Step 6: Load VAPID Keys
    await loadVAPIDKeys();

    // Step 7: Generate Environment Variables
    await generateEnvironmentVariables();

    // Step 8: Provide Next Steps
    await provideNextSteps();

    log(`\n${colors.bright}${colors.green}🎉 SERVICE CONFIGURATION COMPLETED!${colors.reset}`);
    log(`${colors.bright}All API keys and configuration have been collected.${colors.reset}`);
    log(`${colors.bright}Next: Copy the environment variables to Netlify and deploy.${colors.reset}\n`);

  } catch (error) {
    logError(`Service setup failed: ${error.message}`);
  } finally {
    rl.close();
  }
}

// Configure Stripe
async function configureStripe() {
  logStep('1', 'Stripe Payment Processing Configuration');
  
  log(`${colors.bright}Setting up Stripe for UAE market with AED currency...${colors.reset}\n`);
  
  log(`${colors.yellow}📋 STRIPE SETUP INSTRUCTIONS:${colors.reset}`);
  log(`1. Visit: https://dashboard.stripe.com/register`);
  log(`2. Create account with UAE business information:`);
  log(`   - Business Name: Nexus TechHub`);
  log(`   - Country: United Arab Emirates`);
  log(`   - Address: FAMC3062, Compass Building, Al Shohada Road, AL Hamra Industrial Zone-FZ, Ras Al Khaimah, UAE`);
  log(`   - Phone: +971 58 553 1029`);
  log(`3. Complete business verification (may take 1-2 days)`);
  log(`4. Enable live payments after verification`);
  log(`5. Go to Developers > API keys and copy your live keys`);
  log(`6. Set up webhook: https://nexustechhub.netlify.app/api/stripe/webhook`);
  log(`   - Events: checkout.session.completed, payment_intent.succeeded, payment_intent.payment_failed\n`);

  const hasStripe = await askQuestion('Have you completed Stripe setup and have your live API keys? (y/n): ');
  
  if (hasStripe.toLowerCase() === 'y') {
    serviceConfig.stripe.publishableKey = await askQuestion('Enter your Stripe Live Publishable Key (pk_live_...): ');
    serviceConfig.stripe.secretKey = await askQuestion('Enter your Stripe Live Secret Key (sk_live_...): ');
    serviceConfig.stripe.webhookSecret = await askQuestion('Enter your Stripe Webhook Secret (whsec_...): ');
    
    logSuccess('Stripe configuration collected');
  } else {
    logWarning('Stripe setup incomplete - you can configure this later');
    serviceConfig.stripe.publishableKey = 'REPLACE_WITH_STRIPE_PUBLISHABLE_KEY';
    serviceConfig.stripe.secretKey = 'REPLACE_WITH_STRIPE_SECRET_KEY';
    serviceConfig.stripe.webhookSecret = 'REPLACE_WITH_STRIPE_WEBHOOK_SECRET';
  }
}

// Configure Google OAuth
async function configureGoogleOAuth() {
  logStep('2', 'Google OAuth Authentication Configuration');
  
  log(`${colors.bright}Setting up Google OAuth for user authentication...${colors.reset}\n`);
  
  log(`${colors.yellow}📋 GOOGLE OAUTH SETUP INSTRUCTIONS:${colors.reset}`);
  log(`1. Visit: https://console.cloud.google.com/`);
  log(`2. Create new project: "Nexus TechHub Production"`);
  log(`3. Enable APIs: Google+ API, Google Identity API`);
  log(`4. Configure OAuth consent screen:`);
  log(`   - App name: Nexus TechHub`);
  log(`   - User support email: support@nexustechhub.ae`);
  log(`   - Developer contact: admin@nexustechhub.ae`);
  log(`5. Create OAuth 2.0 credentials (Web application)`);
  log(`6. Add authorized redirect URI: https://nexustechhub.netlify.app/api/auth/callback/google\n`);

  const hasGoogle = await askQuestion('Have you completed Google OAuth setup and have your credentials? (y/n): ');
  
  if (hasGoogle.toLowerCase() === 'y') {
    serviceConfig.google.clientId = await askQuestion('Enter your Google Client ID: ');
    serviceConfig.google.clientSecret = await askQuestion('Enter your Google Client Secret: ');
    
    logSuccess('Google OAuth configuration collected');
  } else {
    logWarning('Google OAuth setup incomplete - you can configure this later');
    serviceConfig.google.clientId = 'REPLACE_WITH_GOOGLE_CLIENT_ID';
    serviceConfig.google.clientSecret = 'REPLACE_WITH_GOOGLE_CLIENT_SECRET';
  }
}

// Configure Email Service
async function configureEmailService() {
  logStep('3', 'Email Service Configuration');
  
  log(`${colors.bright}Setting up email service for authentication...${colors.reset}\n`);
  
  log(`${colors.yellow}📋 EMAIL SERVICE OPTIONS:${colors.reset}`);
  log(`Option A - Gmail with App Password (Recommended):`);
  log(`1. Enable 2-Factor Authentication on your Gmail account`);
  log(`2. Go to Google Account > Security > App passwords`);
  log(`3. Generate app password for "Mail" application`);
  log(`4. Use the 16-character password\n`);
  
  log(`Option B - SendGrid:`);
  log(`1. Visit: https://sendgrid.com/`);
  log(`2. Create account and verify email`);
  log(`3. Create API key with Full Access\n`);

  const emailChoice = await askQuestion('Choose email service: (1) Gmail App Password, (2) SendGrid, (3) Skip: ');
  
  if (emailChoice === '1') {
    serviceConfig.email.host = 'smtp.gmail.com';
    serviceConfig.email.port = '587';
    serviceConfig.email.user = await askQuestion('Enter your Gmail address: ');
    serviceConfig.email.password = await askQuestion('Enter your Gmail App Password (16 characters): ');
    serviceConfig.email.from = 'noreply@nexustechhub.ae';
    
    logSuccess('Gmail configuration collected');
  } else if (emailChoice === '2') {
    serviceConfig.email.host = 'smtp.sendgrid.net';
    serviceConfig.email.port = '587';
    serviceConfig.email.user = 'apikey';
    serviceConfig.email.password = await askQuestion('Enter your SendGrid API Key: ');
    serviceConfig.email.from = 'noreply@nexustechhub.ae';
    
    logSuccess('SendGrid configuration collected');
  } else {
    logWarning('Email service setup skipped - you can configure this later');
    serviceConfig.email.host = 'REPLACE_WITH_EMAIL_HOST';
    serviceConfig.email.port = '587';
    serviceConfig.email.user = 'REPLACE_WITH_EMAIL_USER';
    serviceConfig.email.password = 'REPLACE_WITH_EMAIL_PASSWORD';
    serviceConfig.email.from = 'noreply@nexustechhub.ae';
  }
}

// Configure Sentry
async function configureSentry() {
  logStep('4', 'Sentry Error Monitoring Configuration');
  
  log(`${colors.bright}Setting up Sentry for production error monitoring...${colors.reset}\n`);
  
  log(`${colors.yellow}📋 SENTRY SETUP INSTRUCTIONS:${colors.reset}`);
  log(`1. Visit: https://sentry.io/signup/`);
  log(`2. Create account with business email`);
  log(`3. Create new project:`);
  log(`   - Platform: Next.js`);
  log(`   - Project Name: nexus-techhub-production`);
  log(`4. Copy the DSN from Settings > Projects > Client Keys\n`);

  const hasSentry = await askQuestion('Have you created Sentry project and have your DSN? (y/n): ');
  
  if (hasSentry.toLowerCase() === 'y') {
    serviceConfig.sentry.dsn = await askQuestion('Enter your Sentry DSN: ');
    logSuccess('Sentry configuration collected');
  } else {
    logWarning('Sentry setup skipped - you can configure this later');
    serviceConfig.sentry.dsn = 'REPLACE_WITH_SENTRY_DSN';
  }
}

// Configure Google Analytics
async function configureAnalytics() {
  logStep('5', 'Google Analytics Configuration');
  
  log(`${colors.bright}Setting up Google Analytics for UAE market tracking...${colors.reset}\n`);
  
  log(`${colors.yellow}📋 GOOGLE ANALYTICS SETUP INSTRUCTIONS:${colors.reset}`);
  log(`1. Visit: https://analytics.google.com/`);
  log(`2. Create account: "Nexus TechHub"`);
  log(`3. Create property: "Nexus TechHub Website"`);
  log(`4. Configure for UAE market:`);
  log(`   - Industry: Technology`);
  log(`   - Business Size: Small business`);
  log(`   - Country: United Arab Emirates`);
  log(`   - Currency: UAE Dirham (AED)`);
  log(`5. Create web data stream for: https://nexustechhub.netlify.app`);
  log(`6. Copy the Measurement ID (G-XXXXXXXXXX)\n`);

  const hasAnalytics = await askQuestion('Have you created Google Analytics property and have your Measurement ID? (y/n): ');
  
  if (hasAnalytics.toLowerCase() === 'y') {
    serviceConfig.analytics.id = await askQuestion('Enter your Google Analytics Measurement ID (G-XXXXXXXXXX): ');
    logSuccess('Google Analytics configuration collected');
  } else {
    logWarning('Google Analytics setup skipped - you can configure this later');
    serviceConfig.analytics.id = 'REPLACE_WITH_GOOGLE_ANALYTICS_ID';
  }
}

// Load VAPID Keys
async function loadVAPIDKeys() {
  logStep('6', 'Loading VAPID Keys for Push Notifications');
  
  if (fs.existsSync('vapid-keys.env')) {
    const vapidContent = fs.readFileSync('vapid-keys.env', 'utf8');
    const publicMatch = vapidContent.match(/NEXT_PUBLIC_VAPID_PUBLIC_KEY="([^"]+)"/);
    const privateMatch = vapidContent.match(/VAPID_PRIVATE_KEY="([^"]+)"/);
    
    if (publicMatch && privateMatch) {
      serviceConfig.vapid.publicKey = publicMatch[1];
      serviceConfig.vapid.privateKey = privateMatch[1];
      serviceConfig.vapid.subject = 'mailto:${BUSINESS_EMAIL}';
      
      logSuccess('VAPID keys loaded from vapid-keys.env');
    } else {
      logWarning('VAPID keys file found but keys not properly formatted');
    }
  } else {
    logWarning('VAPID keys not found - run: node scripts/generate-vapid-keys.js');
    serviceConfig.vapid.publicKey = 'REPLACE_WITH_VAPID_PUBLIC_KEY';
    serviceConfig.vapid.privateKey = 'REPLACE_WITH_VAPID_PRIVATE_KEY';
    serviceConfig.vapid.subject = 'mailto:${BUSINESS_EMAIL}';
  }
}

// Generate Environment Variables
async function generateEnvironmentVariables() {
  logStep('7', 'Generating Environment Variables');
  
  const crypto = require('crypto');
  const nextAuthSecret = crypto.randomBytes(32).toString('base64');
  
  const envVars = `# Nexus TechHub Production Environment Variables
# Generated: ${new Date().toISOString()}
# Copy these to Netlify: Site Settings > Environment Variables

# Core Application
NEXTAUTH_SECRET="${nextAuthSecret}"
NEXTAUTH_URL="https://nexustechhub.netlify.app"

# Stripe Payment Processing (CRITICAL)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="${serviceConfig.stripe.publishableKey}"
STRIPE_SECRET_KEY="${serviceConfig.stripe.secretKey}"
STRIPE_WEBHOOK_SECRET="${serviceConfig.stripe.webhookSecret}"

# Google OAuth Authentication (CRITICAL)
GOOGLE_CLIENT_ID="${serviceConfig.google.clientId}"
GOOGLE_CLIENT_SECRET="${serviceConfig.google.clientSecret}"

# Email Service (CRITICAL)
EMAIL_SERVER_HOST="${serviceConfig.email.host}"
EMAIL_SERVER_PORT="${serviceConfig.email.port}"
EMAIL_SERVER_USER="${serviceConfig.email.user}"
EMAIL_SERVER_PASSWORD="${serviceConfig.email.password}"
EMAIL_FROM="${serviceConfig.email.from}"

# Error Monitoring (HIGH PRIORITY)
SENTRY_DSN="${serviceConfig.sentry.dsn}"

# Analytics (HIGH PRIORITY)
GOOGLE_ANALYTICS_ID="${serviceConfig.analytics.id}"

# Push Notifications (HIGH PRIORITY)
NEXT_PUBLIC_VAPID_PUBLIC_KEY="${serviceConfig.vapid.publicKey}"
VAPID_PRIVATE_KEY="${serviceConfig.vapid.privateKey}"
VAPID_SUBJECT="${serviceConfig.vapid.subject}"

# Business Information
BUSINESS_NAME="Nexus TechHub"
BUSINESS_EMAIL="admin@nexustechhub.ae"
BUSINESS_PHONE="+971585531029"
BUSINESS_WHATSAPP="https://wa.me/971585531029"
BUSINESS_ADDRESS="FAMC3062, Compass Building, Al Shohada Road, AL Hamra Industrial Zone-FZ, Ras Al Khaimah, UAE"
BUSINESS_TIMEZONE="Asia/Dubai"
BUSINESS_CURRENCY="AED"
BUSINESS_COUNTRY="AE"
`;

  fs.writeFileSync('production-env-vars.txt', envVars);
  logSuccess('Environment variables generated: production-env-vars.txt');
}

// Provide Next Steps
async function provideNextSteps() {
  logStep('8', 'Next Steps for Production Deployment');
  
  log(`\n${colors.bright}${colors.green}🎯 READY FOR PRODUCTION DEPLOYMENT!${colors.reset}\n`);
  
  log(`${colors.bright}${colors.yellow}📋 IMMEDIATE NEXT STEPS:${colors.reset}`);
  log(`1. ${colors.bright}Configure Netlify Environment Variables:${colors.reset}`);
  log(`   - Go to: https://app.netlify.com/`);
  log(`   - Navigate to: Sites > nexustechhub > Site settings > Environment variables`);
  log(`   - Copy all variables from: production-env-vars.txt`);
  log(`   - Add each variable with its value\n`);
  
  log(`2. ${colors.bright}Deploy to Production:${colors.reset}`);
  log(`   - Run: npm run deploy:phase9`);
  log(`   - Or trigger deployment in Netlify dashboard\n`);
  
  log(`3. ${colors.bright}Validate Production:${colors.reset}`);
  log(`   - Run: npm run validate:production`);
  log(`   - Test all critical features\n`);
  
  log(`4. ${colors.bright}Go Live:${colors.reset}`);
  log(`   - Verify site at: https://nexustechhub.netlify.app`);
  log(`   - Test payment processing`);
  log(`   - Announce launch!\n`);
}

// Run guided setup if this script is executed directly
if (require.main === module) {
  guidedServiceSetup();
}

module.exports = { guidedServiceSetup };
