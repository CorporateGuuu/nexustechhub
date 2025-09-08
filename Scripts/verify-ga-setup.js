#!/usr/bin/env node

/**
 * Script to verify Google Analytics setup
 * Run with: node scripts/verify-ga-setup.js
 */

const fs = require('fs');
const path = require('path');

// Check for environment variables
console.log('🔍 Checking Google Analytics Setup...\n');

// Check .env files for GA tracking ID
const envFiles = ['.env.local', '.env.production', '.env'];
let gaId = null;

for (const envFile of envFiles) {
  const envPath = path.join(process.cwd(), envFile);
  if (fs.existsSync(envPath)) {
    try {
      const envContent = fs.readFileSync(envPath, 'utf8');
      const gaMatch = envContent.match(/NEXT_PUBLIC_GA_ID=(.+)/);
      if (gaMatch) {
        gaId = gaMatch[1].trim();
        console.log(`✅ Found GA Tracking ID in ${envFile}: ${gaId}`);
        break;
      }
    } catch (error) {
      console.log(`⚠️  Could not read ${envFile}: ${error.message}`);
    }
  }
}

if (!gaId) {
  console.log('❌ NEXT_PUBLIC_GA_ID not found in environment files');
  console.log('   Please set NEXT_PUBLIC_GA_ID in your .env files');
  console.log('   Example: NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX');
}

// Check Analytics component
const analyticsPath = path.join(process.cwd(), 'components', 'Analytics.js');
if (fs.existsSync(analyticsPath)) {
  console.log('✅ Analytics component exists');
} else {
  console.log('❌ Analytics component not found');
}

// Check _app.js usage
const appPath = path.join(process.cwd(), 'pages', '_app.js');
if (fs.existsSync(appPath)) {
  const appContent = fs.readFileSync(appPath, 'utf8');
  if (appContent.includes('GoogleAnalytics')) {
    console.log('✅ GoogleAnalytics component is used in _app.js');
  } else {
    console.log('❌ GoogleAnalytics component not found in _app.js');
  }
}

// Check sitemap and robots.txt
const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');

if (fs.existsSync(sitemapPath)) {
  console.log('✅ sitemap.xml exists');
} else {
  console.log('❌ sitemap.xml not found');
}

if (fs.existsSync(robotsPath)) {
  console.log('✅ robots.txt exists');
} else {
  console.log('❌ robots.txt not found');
}

console.log('\n📋 Next Steps:');
console.log('1. Set NEXT_PUBLIC_GA_ID with your real Google Analytics tracking ID');
console.log('2. Deploy to production');
console.log('3. Test GA tracking using browser developer tools');
console.log('4. Submit sitemap to Google Search Console');
console.log('5. Verify GA data is being collected in Google Analytics dashboard');

if (gaId && gaId !== 'G-XXXXXXXXXX') {
  console.log('\n🎉 Google Analytics setup appears complete!');
} else {
  console.log('\n⚠️  Google Analytics setup needs completion');
}
