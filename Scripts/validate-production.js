#!/usr/bin/env node

// Production Environment Validation Script for Nexus TechHub
const https = require('https');
const http = require('http');

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

const logStep = (step, message) => {
  log(`\n${colors.cyan}[${step}]${colors.reset} ${colors.bright}${message}${colors.reset}`);
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

// Production validation configuration
const PRODUCTION_CONFIG = {
  siteUrl: 'https://nexustechhub.netlify.app',
  expectedTitle: 'Nexus TechHub',
  expectedDescription: 'Professional mobile device repair parts in UAE',
  requiredPages: [
    '/',
    '/iphone-parts',
    '/samsung-parts',
    '/ipad-parts',
    '/repair-tools',
    '/contact',
    '/account',
    '/enhanced-checkout',
    '/admin/inventory',
  ],
  requiredAPIs: [
    '/api/products',
    '/api/categories',
    '/api/checkout/create-session',
    '/api/admin/inventory/sync',
    '/api/monitoring/batch',
  ],
  securityHeaders: [
    'x-frame-options',
    'x-xss-protection',
    'x-content-type-options',
    'referrer-policy',
    'strict-transport-security',
    'content-security-policy',
  ],
  performanceThresholds: {
    responseTime: 3000, // 3 seconds
    firstContentfulPaint: 2000, // 2 seconds
    largestContentfulPaint: 4000, // 4 seconds
  },
};

// Make HTTP request
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https:') ? https : http;
    const startTime = Date.now();

    const req = protocol.get(url, options, (res) => {
      const endTime = Date.now();
      const responseTime = endTime - startTime;

      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data,
          responseTime,
        });
      });
    });

    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

// Validate site accessibility
async function validateSiteAccessibility() {
  logStep('1', 'Validating Site Accessibility');

  try {
    const response = await makeRequest(PRODUCTION_CONFIG.siteUrl);
    
    if (response.statusCode === 200) {
      logSuccess(`Site is accessible (${response.responseTime}ms)`);
    } else {
      logError(`Site returned status code: ${response.statusCode}`);
      return false;
    }

    // Check response time
    if (response.responseTime < PRODUCTION_CONFIG.performanceThresholds.responseTime) {
      logSuccess(`Response time is good (${response.responseTime}ms)`);
    } else {
      logWarning(`Response time is slow (${response.responseTime}ms)`);
    }

    return true;
  } catch (error) {
    logError(`Failed to access site: ${error.message}`);
    return false;
  }
}

// Validate security headers
async function validateSecurityHeaders() {
  logStep('2', 'Validating Security Headers');

  try {
    const response = await makeRequest(PRODUCTION_CONFIG.siteUrl);
    const headers = response.headers;
    let allHeadersPresent = true;

    PRODUCTION_CONFIG.securityHeaders.forEach(headerName => {
      if (headers[headerName] || headers[headerName.toLowerCase()]) {
        logSuccess(`${headerName} header is present`);
      } else {
        logError(`${headerName} header is missing`);
        allHeadersPresent = false;
      }
    });

    // Check specific header values
    const csp = headers['content-security-policy'];
    if (csp && csp.includes('stripe.com')) {
      logSuccess('CSP includes Stripe domains');
    } else {
      logWarning('CSP may not include required Stripe domains');
    }

    const hsts = headers['strict-transport-security'];
    if (hsts && hsts.includes('max-age')) {
      logSuccess('HSTS header is properly configured');
    } else {
      logWarning('HSTS header may not be properly configured');
    }

    return allHeadersPresent;
  } catch (error) {
    logError(`Failed to validate security headers: ${error.message}`);
    return false;
  }
}

// Validate essential pages
async function validateEssentialPages() {
  logStep('3', 'Validating Essential Pages');

  let allPagesValid = true;

  for (const page of PRODUCTION_CONFIG.requiredPages) {
    try {
      const url = `${PRODUCTION_CONFIG.siteUrl}${page}`;
      const response = await makeRequest(url);

      if (response.statusCode === 200) {
        logSuccess(`${page} is accessible`);
      } else if (response.statusCode === 302 || response.statusCode === 301) {
        logWarning(`${page} redirects (${response.statusCode})`);
      } else {
        logError(`${page} returned status ${response.statusCode}`);
        allPagesValid = false;
      }
    } catch (error) {
      logError(`${page} failed: ${error.message}`);
      allPagesValid = false;
    }
  }

  return allPagesValid;
}

// Validate API endpoints
async function validateAPIEndpoints() {
  logStep('4', 'Validating API Endpoints');

  let allAPIsValid = true;

  for (const api of PRODUCTION_CONFIG.requiredAPIs) {
    try {
      const url = `${PRODUCTION_CONFIG.siteUrl}${api}`;
      const response = await makeRequest(url);

      if (response.statusCode === 200) {
        logSuccess(`${api} is accessible`);
      } else if (response.statusCode === 405) {
        logSuccess(`${api} exists (Method Not Allowed is expected)`);
      } else if (response.statusCode === 401 || response.statusCode === 403) {
        logSuccess(`${api} exists (Authentication required)`);
      } else {
        logError(`${api} returned status ${response.statusCode}`);
        allAPIsValid = false;
      }
    } catch (error) {
      logError(`${api} failed: ${error.message}`);
      allAPIsValid = false;
    }
  }

  return allAPIsValid;
}

// Validate SEO elements
async function validateSEO() {
  logStep('5', 'Validating SEO Elements');

  try {
    const response = await makeRequest(PRODUCTION_CONFIG.siteUrl);
    const html = response.data;

    // Check title
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    if (titleMatch && titleMatch[1].includes(PRODUCTION_CONFIG.expectedTitle)) {
      logSuccess('Page title is correct');
    } else {
      logWarning('Page title may not be optimized');
    }

    // Check meta description
    const descMatch = html.match(/<meta[^>]*name=["\']description["\'][^>]*content=["\']([^"']+)["\'][^>]*>/i);
    if (descMatch && descMatch[1].length > 120) {
      logSuccess('Meta description is present and adequate length');
    } else {
      logWarning('Meta description may be missing or too short');
    }

    // Check Open Graph tags
    const ogTitleMatch = html.match(/<meta[^>]*property=["\']og:title["\'][^>]*>/i);
    const ogDescMatch = html.match(/<meta[^>]*property=["\']og:description["\'][^>]*>/i);
    const ogImageMatch = html.match(/<meta[^>]*property=["\']og:image["\'][^>]*>/i);

    if (ogTitleMatch && ogDescMatch && ogImageMatch) {
      logSuccess('Open Graph tags are present');
    } else {
      logWarning('Some Open Graph tags may be missing');
    }

    // Check structured data
    if (html.includes('application/ld+json')) {
      logSuccess('Structured data (JSON-LD) is present');
    } else {
      logWarning('Structured data may be missing');
    }

    return true;
  } catch (error) {
    logError(`Failed to validate SEO: ${error.message}`);
    return false;
  }
}

// Validate PWA features
async function validatePWA() {
  logStep('6', 'Validating PWA Features');

  try {
    // Check manifest
    const manifestResponse = await makeRequest(`${PRODUCTION_CONFIG.siteUrl}/manifest.json`);
    if (manifestResponse.statusCode === 200) {
      logSuccess('PWA manifest is accessible');
      
      const manifest = JSON.parse(manifestResponse.data);
      if (manifest.name && manifest.icons && manifest.start_url) {
        logSuccess('PWA manifest has required fields');
      } else {
        logWarning('PWA manifest may be missing required fields');
      }
    } else {
      logError('PWA manifest is not accessible');
    }

    // Check service worker
    const swResponse = await makeRequest(`${PRODUCTION_CONFIG.siteUrl}/sw.js`);
    if (swResponse.statusCode === 200) {
      logSuccess('Service worker is accessible');
    } else {
      logWarning('Service worker may not be accessible');
    }

    // Check icons
    const iconResponse = await makeRequest(`${PRODUCTION_CONFIG.siteUrl}/icons/icon-192x192.svg`);
    if (iconResponse.statusCode === 200) {
      logSuccess('PWA icons are accessible');
    } else {
      logWarning('PWA icons may not be accessible');
    }

    return true;
  } catch (error) {
    logError(`Failed to validate PWA: ${error.message}`);
    return false;
  }
}

// Validate Stripe integration
async function validateStripeIntegration() {
  logStep('7', 'Validating Stripe Integration');

  try {
    const response = await makeRequest(PRODUCTION_CONFIG.siteUrl);
    const html = response.data;

    // Check for Stripe script
    if (html.includes('js.stripe.com')) {
      logSuccess('Stripe JavaScript is loaded');
    } else {
      logWarning('Stripe JavaScript may not be loaded');
    }

    // Check CSP for Stripe
    const cspResponse = await makeRequest(PRODUCTION_CONFIG.siteUrl);
    const csp = cspResponse.headers['content-security-policy'];
    
    if (csp && csp.includes('stripe.com')) {
      logSuccess('CSP allows Stripe domains');
    } else {
      logWarning('CSP may not allow Stripe domains');
    }

    return true;
  } catch (error) {
    logError(`Failed to validate Stripe integration: ${error.message}`);
    return false;
  }
}

// Generate validation report
async function generateValidationReport(results) {
  logStep('8', 'Generating Validation Report');

  const report = {
    timestamp: new Date().toISOString(),
    siteUrl: PRODUCTION_CONFIG.siteUrl,
    results,
    summary: {
      total: Object.keys(results).length,
      passed: Object.values(results).filter(r => r === true).length,
      failed: Object.values(results).filter(r => r === false).length,
    },
  };

  // Calculate score
  const score = Math.round((report.summary.passed / report.summary.total) * 100);
  report.score = score;

  log('\n' + '='.repeat(60));
  log(`${colors.bright}${colors.cyan}📊 PRODUCTION VALIDATION REPORT${colors.reset}`);
  log('='.repeat(60));
  log(`${colors.bright}Site URL:${colors.reset} ${report.siteUrl}`);
  log(`${colors.bright}Validation Time:${colors.reset} ${report.timestamp}`);
  log(`${colors.bright}Overall Score:${colors.reset} ${score}%`);
  log(`${colors.bright}Tests Passed:${colors.reset} ${report.summary.passed}/${report.summary.total}`);
  
  if (score >= 90) {
    log(`${colors.bright}${colors.green}Status: EXCELLENT ✨${colors.reset}`);
  } else if (score >= 80) {
    log(`${colors.bright}${colors.green}Status: GOOD ✅${colors.reset}`);
  } else if (score >= 70) {
    log(`${colors.bright}${colors.yellow}Status: NEEDS IMPROVEMENT ⚠️${colors.reset}`);
  } else {
    log(`${colors.bright}${colors.red}Status: CRITICAL ISSUES ❌${colors.reset}`);
  }

  log('\n' + `${colors.bright}Detailed Results:${colors.reset}`);
  Object.entries(results).forEach(([test, passed]) => {
    const icon = passed ? '✅' : '❌';
    const color = passed ? colors.green : colors.red;
    log(`  ${icon} ${test}`, color);
  });
  log('='.repeat(60));

  return report;
}

// Main validation function
async function validateProduction() {
  const startTime = Date.now();

  try {
    log(`\n${colors.bright}${colors.cyan}🔍 NEXUS TECHHUB PRODUCTION VALIDATION${colors.reset}`);
    log(`${colors.bright}Starting validation process...${colors.reset}\n`);

    const results = {};

    results['Site Accessibility'] = await validateSiteAccessibility();
    results['Security Headers'] = await validateSecurityHeaders();
    results['Essential Pages'] = await validateEssentialPages();
    results['API Endpoints'] = await validateAPIEndpoints();
    results['SEO Elements'] = await validateSEO();
    results['PWA Features'] = await validatePWA();
    results['Stripe Integration'] = await validateStripeIntegration();

    const report = await generateValidationReport(results);

    const endTime = Date.now();
    const duration = Math.round((endTime - startTime) / 1000);

    if (report.score >= 80) {
      log(`\n${colors.bright}${colors.green}🎉 VALIDATION COMPLETED SUCCESSFULLY!${colors.reset}`);
      log(`${colors.bright}Your site is production-ready!${colors.reset}`);
    } else {
      log(`\n${colors.bright}${colors.yellow}⚠️  VALIDATION COMPLETED WITH WARNINGS${colors.reset}`);
      log(`${colors.bright}Please address the issues above before going live.${colors.reset}`);
    }

    log(`${colors.bright}Total time: ${duration} seconds${colors.reset}\n`);

    return report;

  } catch (error) {
    const endTime = Date.now();
    const duration = Math.round((endTime - startTime) / 1000);

    log(`\n${colors.bright}${colors.red}💥 VALIDATION FAILED!${colors.reset}`);
    log(`${colors.bright}Time elapsed: ${duration} seconds${colors.reset}`);
    log(`${colors.bright}Error: ${error.message}${colors.reset}\n`);

    throw error;
  }
}

// Run validation if this script is executed directly
if (require.main === module) {
  validateProduction().catch(error => {
    process.exit(1);
  });
}

module.exports = {
  validateProduction,
  validateSiteAccessibility,
  validateSecurityHeaders,
  validateEssentialPages,
  validateAPIEndpoints,
  validateSEO,
  validatePWA,
  validateStripeIntegration,
};
