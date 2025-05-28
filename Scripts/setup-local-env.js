#!/usr/bin/env node

// Setup Local Environment for Nexus TechHub Development
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
  log(`${colors.blue}ℹ️  ${message}${colors.reset}`);
};

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

// Setup local environment
async function setupLocalEnvironment() {
  try {
    log(`\n${colors.bright}${colors.cyan}🔧 NEXUS TECHHUB LOCAL ENVIRONMENT SETUP${colors.reset}`);
    log(`${colors.bright}Setting up your local development environment...${colors.reset}\n`);

    // Check if .env.local exists
    let envLocalContent = '';
    if (fs.existsSync('.env.local')) {
      envLocalContent = fs.readFileSync('.env.local', 'utf8');
      logInfo('Found existing .env.local file');
    } else {
      logInfo('Creating new .env.local file');
    }

    // Get Sentry DSN
    log(`${colors.bright}${colors.yellow}📋 SENTRY CONFIGURATION:${colors.reset}`);
    log(`1. Go to your Sentry dashboard: https://sentry.io/`);
    log(`2. Navigate to: Settings > Projects > nexus-techhub-production`);
    log(`3. Go to: Client Keys (DSN)`);
    log(`4. Copy the DSN (starts with https://)`);
    
    const sentryDsn = await askQuestion('\nEnter your Sentry DSN: ');

    // Prepare local environment variables
    const localEnvVars = {
      // Development settings
      NODE_ENV: 'development',
      NEXT_PUBLIC_APP_ENV: 'development',
      
      // Sentry configuration
      SENTRY_DSN: sentryDsn,
      
      // NextAuth configuration for local development
      NEXTAUTH_URL: 'http://localhost:3000',
      NEXTAUTH_SECRET: 'development-secret-key-change-in-production',
      
      // Stripe test keys (you can add these later)
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: 'pk_test_your_test_key_here',
      STRIPE_SECRET_KEY: 'sk_test_your_test_key_here',
      
      // Local development flags
      NEXT_PUBLIC_DEBUG_MODE: 'true',
      NEXT_PUBLIC_SHOW_DEV_TOOLS: 'true',
      
      // Business information
      BUSINESS_NAME: 'Nexus TechHub',
      BUSINESS_EMAIL: 'admin@nexustechhub.ae',
      BUSINESS_PHONE: '+971585531029',
      BUSINESS_WHATSAPP: 'https://wa.me/971585531029'
    };

    // Generate .env.local content
    let newEnvContent = `# Nexus TechHub Local Development Environment
# Generated: ${new Date().toISOString()}
# This file is for local development only - do not commit to version control

`;

    Object.entries(localEnvVars).forEach(([key, value]) => {
      // Check if variable already exists in .env.local
      const existingMatch = envLocalContent.match(new RegExp(`^${key}=(.*)$`, 'm'));
      
      if (existingMatch && key !== 'SENTRY_DSN') {
        // Keep existing value for non-Sentry variables
        newEnvContent += `${key}=${existingMatch[1]}\n`;
      } else {
        // Add new value
        newEnvContent += `${key}=${value}\n`;
      }
    });

    // Write .env.local file
    fs.writeFileSync('.env.local', newEnvContent);
    logSuccess('Local environment file (.env.local) updated');

    // Create .env.local.example for reference
    const exampleContent = newEnvContent.replace(sentryDsn, 'https://your-sentry-dsn@sentry.io/project-id');
    fs.writeFileSync('.env.local.example', exampleContent);
    logSuccess('Created .env.local.example for reference');

    log(`\n${colors.bright}${colors.green}🎯 LOCAL ENVIRONMENT SETUP COMPLETED!${colors.reset}`);
    log(`${colors.bright}Next steps:${colors.reset}`);
    log(`1. Run: npm run dev`);
    log(`2. Open: http://localhost:3000`);
    log(`3. Test Sentry integration by triggering an error\n`);

  } catch (error) {
    log(`${colors.red}❌ Setup failed: ${error.message}${colors.reset}`);
  } finally {
    rl.close();
  }
}

// Run setup if this script is executed directly
if (require.main === module) {
  setupLocalEnvironment();
}

module.exports = { setupLocalEnvironment };
