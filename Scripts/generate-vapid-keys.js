#!/usr/bin/env node

// Generate VAPID Keys for Push Notifications - Nexus TechHub Phase 9
const webpush = require('web-push');
const fs = require('fs');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
};

// Logging functions
const log = (message, color = colors.reset) => {
  console.log(`${color}${message}${colors.reset}`);
};

const logSuccess = (message) => {
  log(`${colors.green}✅ ${message}${colors.reset}`);
};

const logInfo = (message) => {
  log(`${colors.cyan}ℹ️  ${message}${colors.reset}`);
};

// Generate VAPID keys
function generateVAPIDKeys() {
  try {
    log(`\n${colors.bright}${colors.cyan}🔑 GENERATING VAPID KEYS FOR PUSH NOTIFICATIONS${colors.reset}`);
    log(`${colors.bright}Generating VAPID key pair for Nexus TechHub...${colors.reset}\n`);

    // Generate VAPID keys
    const vapidKeys = webpush.generateVAPIDKeys();

    // Display the keys
    log(`${colors.bright}Generated VAPID Keys:${colors.reset}\n`);
    
    log(`${colors.bright}Public Key (NEXT_PUBLIC_VAPID_PUBLIC_KEY):${colors.reset}`);
    log(`${vapidKeys.publicKey}\n`);
    
    log(`${colors.bright}Private Key (VAPID_PRIVATE_KEY):${colors.reset}`);
    log(`${vapidKeys.privateKey}\n`);

    // Create environment variables format
    const envVars = `# VAPID Keys for Push Notifications - Generated ${new Date().toISOString()}
NEXT_PUBLIC_VAPID_PUBLIC_KEY="${vapidKeys.publicKey}"
VAPID_PRIVATE_KEY="${vapidKeys.privateKey}"
VAPID_SUBJECT="mailto:\${BUSINESS_EMAIL}"`;

    // Save to file
    fs.writeFileSync('vapid-keys.env', envVars);
    
    logSuccess('VAPID keys generated successfully!');
    logSuccess('Keys saved to vapid-keys.env file');
    
    log(`\n${colors.bright}${colors.yellow}📋 NEXT STEPS:${colors.reset}`);
    log(`1. Copy the environment variables above`);
    log(`2. Add them to your Netlify environment variables`);
    log(`3. Update your .env.production file`);
    log(`4. Deploy your application\n`);

    log(`${colors.bright}${colors.yellow}🔒 SECURITY NOTE:${colors.reset}`);
    log(`Keep the private key secure and never expose it in client-side code!`);
    log(`Only the public key should be accessible to the browser.\n`);

    return vapidKeys;

  } catch (error) {
    log(`${colors.red}❌ Failed to generate VAPID keys: ${error.message}${colors.reset}`);
    throw error;
  }
}

// Run if this script is executed directly
if (require.main === module) {
  generateVAPIDKeys();
}

module.exports = { generateVAPIDKeys };
