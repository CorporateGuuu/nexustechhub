#!/usr/bin/env node

// Environment Variables Setup Script for Nexus TechHub Phase 9
const fs = require('fs');
const crypto = require('crypto');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

// Logging functions
const log = (message, color = colors.reset) => {
  console.log(`${color}${message}${colors.reset}`);
};

const logSuccess = (message) => {
  log(`${colors.green}✅ ${message}${colors.reset}`);
};

const logWarning = (message) => {
  log(`${colors.yellow}⚠️  ${message}${colors.reset}`);
};

const logInfo = (message) => {
  log(`${colors.cyan}ℹ️  ${message}${colors.reset}`);
};

// Generate secure random string
function generateSecureSecret(length = 32) {
  return crypto.randomBytes(length).toString('base64');
}

// Environment variables template with generated values
function generateEnvironmentVariables() {
  const nextAuthSecret = generateSecureSecret(32);
  
  // Read existing VAPID keys if available
  let vapidPublicKey = 'REPLACE_WITH_VAPID_PUBLIC_KEY';
  let vapidPrivateKey = 'REPLACE_WITH_VAPID_PRIVATE_KEY';
  
  if (fs.existsSync('vapid-keys.env')) {
    const vapidContent = fs.readFileSync('vapid-keys.env', 'utf8');
    const publicMatch = vapidContent.match(/NEXT_PUBLIC_VAPID_PUBLIC_KEY="([^"]+)"/);
    const privateMatch = vapidContent.match(/VAPID_PRIVATE_KEY="([^"]+)"/);
    
    if (publicMatch) vapidPublicKey = publicMatch[1];
    if (privateMatch) vapidPrivateKey = privateMatch[1];
  }

  return {
    // Core Application
    NEXTAUTH_SECRET: nextAuthSecret,
    NEXTAUTH_URL: 'https://nexustechhub.netlify.app',
    
    // Stripe Payment Processing (CRITICAL)
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: 'REPLACE_WITH_STRIPE_PUBLISHABLE_KEY',
    STRIPE_SECRET_KEY: 'REPLACE_WITH_STRIPE_SECRET_KEY',
    STRIPE_WEBHOOK_SECRET: 'REPLACE_WITH_STRIPE_WEBHOOK_SECRET',
    
    // Google OAuth Authentication (CRITICAL)
    GOOGLE_CLIENT_ID: 'REPLACE_WITH_GOOGLE_CLIENT_ID',
    GOOGLE_CLIENT_SECRET: 'REPLACE_WITH_GOOGLE_CLIENT_SECRET',
    
    // Email Service (CRITICAL)
    EMAIL_SERVER_HOST: 'REPLACE_WITH_EMAIL_HOST',
    EMAIL_SERVER_PORT: '587',
    EMAIL_SERVER_USER: 'REPLACE_WITH_EMAIL_USER',
    EMAIL_SERVER_PASSWORD: 'REPLACE_WITH_EMAIL_PASSWORD',
    EMAIL_FROM: 'noreply@nexustechhub.ae',
    
    // Error Monitoring (HIGH PRIORITY)
    SENTRY_DSN: 'REPLACE_WITH_SENTRY_DSN',
    
    // Analytics (HIGH PRIORITY)
    GOOGLE_ANALYTICS_ID: 'REPLACE_WITH_GOOGLE_ANALYTICS_ID',
    
    // Push Notifications (HIGH PRIORITY)
    NEXT_PUBLIC_VAPID_PUBLIC_KEY: vapidPublicKey,
    VAPID_PRIVATE_KEY: vapidPrivateKey,
    VAPID_SUBJECT: 'mailto:admin@nexustechhub.ae',
    
    // Image Optimization (MEDIUM PRIORITY)
    CLOUDINARY_CLOUD_NAME: 'REPLACE_WITH_CLOUDINARY_CLOUD_NAME',
    CLOUDINARY_API_KEY: 'REPLACE_WITH_CLOUDINARY_API_KEY',
    CLOUDINARY_API_SECRET: 'REPLACE_WITH_CLOUDINARY_API_SECRET',
    
    // Business Operations (OPTIONAL)
    SLACK_WEBHOOK_URL: 'REPLACE_WITH_SLACK_WEBHOOK_URL',
    DISCORD_WEBHOOK_URL: 'REPLACE_WITH_DISCORD_WEBHOOK_URL',
    ZAPIER_WEBHOOK_URL: 'REPLACE_WITH_ZAPIER_WEBHOOK_URL',
    INVENTORY_WEBHOOK_URL: 'REPLACE_WITH_INVENTORY_WEBHOOK_URL',
    
    // Business Information
    BUSINESS_NAME: 'Nexus TechHub',
    BUSINESS_EMAIL: 'admin@nexustechhub.ae',
    BUSINESS_PHONE: '+971585531029',
    BUSINESS_WHATSAPP: 'https://wa.me/971585531029',
    BUSINESS_ADDRESS: 'FAMC3062, Compass Building, Al Shohada Road, AL Hamra Industrial Zone-FZ, Ras Al Khaimah, UAE',
    BUSINESS_TIMEZONE: 'Asia/Dubai',
    BUSINESS_CURRENCY: 'AED',
    BUSINESS_COUNTRY: 'AE'
  };
}

// Create Netlify environment variables format
function createNetlifyEnvFormat(envVars) {
  let netlifyFormat = `# Netlify Environment Variables for Nexus TechHub Production
# Generated on ${new Date().toISOString()}
# Copy these to your Netlify dashboard: Site Settings > Environment Variables

`;

  Object.entries(envVars).forEach(([key, value]) => {
    netlifyFormat += `${key}=${value}\n`;
  });

  return netlifyFormat;
}

// Create environment variables documentation
function createEnvDocumentation(envVars) {
  return `# 🔧 Environment Variables Setup Guide - Nexus TechHub Phase 9

## 🔴 CRITICAL VARIABLES (Must be configured before going live)

### Stripe Payment Processing
- \`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY\`: Your Stripe publishable key (starts with pk_live_)
- \`STRIPE_SECRET_KEY\`: Your Stripe secret key (starts with sk_live_)
- \`STRIPE_WEBHOOK_SECRET\`: Your Stripe webhook secret (starts with whsec_)

### Google OAuth Authentication
- \`GOOGLE_CLIENT_ID\`: Your Google OAuth client ID
- \`GOOGLE_CLIENT_SECRET\`: Your Google OAuth client secret

### Email Service
- \`EMAIL_SERVER_HOST\`: SMTP host (e.g., smtp.gmail.com)
- \`EMAIL_SERVER_USER\`: SMTP username/email
- \`EMAIL_SERVER_PASSWORD\`: SMTP password or app password

## 🟡 HIGH PRIORITY VARIABLES (Should be configured within 1 week)

### Error Monitoring
- \`SENTRY_DSN\`: Your Sentry project DSN

### Analytics
- \`GOOGLE_ANALYTICS_ID\`: Your Google Analytics 4 measurement ID

### Push Notifications
- \`NEXT_PUBLIC_VAPID_PUBLIC_KEY\`: Generated VAPID public key
- \`VAPID_PRIVATE_KEY\`: Generated VAPID private key

## 🟢 MEDIUM PRIORITY VARIABLES (Can be configured later)

### Image Optimization
- \`CLOUDINARY_CLOUD_NAME\`: Your Cloudinary cloud name
- \`CLOUDINARY_API_KEY\`: Your Cloudinary API key
- \`CLOUDINARY_API_SECRET\`: Your Cloudinary API secret

### Business Operations
- \`SLACK_WEBHOOK_URL\`: Slack webhook for notifications
- \`ZAPIER_WEBHOOK_URL\`: Zapier webhook for automation

## 📋 Setup Instructions

1. **Copy the environment variables** from netlify-env-vars.txt
2. **Go to Netlify Dashboard**: https://app.netlify.com/
3. **Navigate to**: Sites > nexustechhub > Site settings > Environment variables
4. **Add each variable** with its corresponding value
5. **Replace all "REPLACE_WITH_" placeholders** with actual values
6. **Deploy your site** to apply the changes

## 🔒 Security Notes

- Never commit real API keys to version control
- Keep private keys secure and never expose them in client-side code
- Use environment variables for all sensitive configuration
- Regularly rotate API keys and secrets

## 📞 Support

If you need help setting up any of these services:
- Email: admin@nexustechhub.ae
- Phone: +971 58 553 1029
- WhatsApp: https://wa.me/971585531029
`;
}

// Main setup function
function setupEnvironment() {
  try {
    log(`\n${colors.bright}${colors.cyan}🔧 NEXUS TECHHUB ENVIRONMENT SETUP${colors.reset}`);
    log(`${colors.bright}Generating environment variables for production deployment...${colors.reset}\n`);

    // Generate environment variables
    const envVars = generateEnvironmentVariables();
    
    // Create Netlify format
    const netlifyFormat = createNetlifyEnvFormat(envVars);
    fs.writeFileSync('netlify-env-vars.txt', netlifyFormat);
    logSuccess('Created netlify-env-vars.txt');

    // Create documentation
    const documentation = createEnvDocumentation(envVars);
    fs.writeFileSync('ENVIRONMENT_SETUP.md', documentation);
    logSuccess('Created ENVIRONMENT_SETUP.md');

    // Update .env.production with generated values
    let envProductionContent = '';
    Object.entries(envVars).forEach(([key, value]) => {
      envProductionContent += `${key}="${value}"\n`;
    });
    
    fs.writeFileSync('.env.production.generated', envProductionContent);
    logSuccess('Created .env.production.generated');

    // Display summary
    log(`\n${colors.bright}📊 ENVIRONMENT VARIABLES SUMMARY:${colors.reset}`);
    
    const criticalVars = [
      'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
      'STRIPE_SECRET_KEY',
      'GOOGLE_CLIENT_ID',
      'EMAIL_SERVER_HOST'
    ];
    
    const configuredCount = Object.entries(envVars).filter(([key, value]) => 
      !value.includes('REPLACE_WITH_')
    ).length;
    
    const totalCount = Object.keys(envVars).length;
    
    log(`${colors.bright}Total Variables:${colors.reset} ${totalCount}`);
    log(`${colors.bright}Pre-configured:${colors.reset} ${configuredCount}`);
    log(`${colors.bright}Need Configuration:${colors.reset} ${totalCount - configuredCount}`);

    log(`\n${colors.bright}${colors.yellow}📋 NEXT STEPS:${colors.reset}`);
    log(`1. Review the generated files:`);
    log(`   - netlify-env-vars.txt (copy to Netlify)`);
    log(`   - ENVIRONMENT_SETUP.md (setup guide)`);
    log(`   - .env.production.generated (backup)`);
    log(`2. Set up third-party service accounts`);
    log(`3. Replace "REPLACE_WITH_" placeholders with real values`);
    log(`4. Add variables to Netlify dashboard`);
    log(`5. Deploy your application\n`);

    logInfo('Environment setup completed successfully!');
    
    return envVars;

  } catch (error) {
    log(`${colors.red}❌ Failed to setup environment: ${error.message}${colors.reset}`);
    throw error;
  }
}

// Run if this script is executed directly
if (require.main === module) {
  setupEnvironment();
}

module.exports = { setupEnvironment, generateEnvironmentVariables };
