#!/usr/bin/env node

// Live Production Deployment Script for Nexus TechHub
// Handles build, validation, and deployment verification

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Nexus TechHub - Live Production Deployment');
console.log('=============================================');

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
  console.error('❌ Error: package.json not found. Run this from the project root.');
  process.exit(1);
}

async function deployToProduction() {
  try {
    console.log('\n📋 Step 1: Pre-deployment Checks');
    console.log('=================================');
    
    // Check essential files exist
    const essentialFiles = [
      'pages/api/stripe/webhook.js',
      'pages/enhanced-checkout.js',
      'components/Checkout/EnhancedCheckout.js',
      'netlify.toml'
    ];
    
    for (const file of essentialFiles) {
      if (fs.existsSync(file)) {
        console.log(`✅ ${file} exists`);
      } else {
        console.log(`❌ ${file} missing`);
      }
    }
    
    console.log('\n🔧 Step 2: Build Production Version');
    console.log('===================================');
    
    // Clean previous builds
    console.log('🧹 Cleaning previous builds...');
    try {
      execSync('rm -rf .next', { stdio: 'inherit' });
      execSync('rm -rf out', { stdio: 'inherit' });
    } catch (error) {
      console.log('ℹ️ No previous builds to clean');
    }
    
    // Install dependencies
    console.log('📦 Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });
    
    // Build the project
    console.log('🏗️ Building production version...');
    execSync('npm run build', { stdio: 'inherit' });
    
    console.log('\n✅ Build completed successfully!');
    
    console.log('\n📊 Step 3: Build Analysis');
    console.log('=========================');
    
    // Check build output
    if (fs.existsSync('.next')) {
      console.log('✅ .next directory created');
      
      // Check for static files
      const staticDir = '.next/static';
      if (fs.existsSync(staticDir)) {
        console.log('✅ Static assets generated');
      }
      
      // Check for pages
      const serverDir = '.next/server/pages';
      if (fs.existsSync(serverDir)) {
        const pages = fs.readdirSync(serverDir).filter(f => f.endsWith('.js') || f.endsWith('.html'));
        console.log(`✅ ${pages.length} pages generated`);
      }
    }
    
    console.log('\n🔍 Step 4: Environment Variables Check');
    console.log('=====================================');
    
    // Check if essential environment variables are documented
    const envFile = 'ESSENTIAL_ENV_VARS.txt';
    if (fs.existsSync(envFile)) {
      console.log('✅ Environment variables file ready');
      console.log('📝 Remember to add these to Netlify:');
      console.log('   - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY');
      console.log('   - STRIPE_SECRET_KEY');
      console.log('   - STRIPE_WEBHOOK_SECRET');
      console.log('   - NEXTAUTH_SECRET');
      console.log('   - NEXTAUTH_URL');
    } else {
      console.log('⚠️ Environment variables file not found');
    }
    
    console.log('\n🎯 Step 5: Deployment Instructions');
    console.log('==================================');
    
    console.log('📋 Manual Steps Required:');
    console.log('1. ✅ Build completed - ready for deployment');
    console.log('2. 🔧 Add environment variables to Netlify dashboard');
    console.log('3. 🚀 Trigger deployment in Netlify');
    console.log('4. 🧪 Run verification tests');
    
    console.log('\n📝 Netlify Deployment Steps:');
    console.log('1. Go to: https://app.netlify.com/');
    console.log('2. Navigate to: Sites → nexustechhub');
    console.log('3. Go to: Site settings → Environment variables');
    console.log('4. Add all variables from ESSENTIAL_ENV_VARS.txt');
    console.log('5. Go to: Deploys tab');
    console.log('6. Click: "Trigger deploy" → "Deploy site"');
    console.log('7. Wait for deployment to complete');
    
    console.log('\n🧪 Post-Deployment Testing:');
    console.log('1. Run: node Scripts/verify-live-deployment.js');
    console.log('2. Test: https://nexustechhub.netlify.app/enhanced-checkout');
    console.log('3. Verify: Stripe payments work with UAE VAT');
    
    console.log('\n🎉 Production Build Ready!');
    console.log('=========================');
    console.log('Your Nexus TechHub website is ready for live deployment.');
    console.log('Complete the Netlify configuration steps above to go live.');
    
  } catch (error) {
    console.error('\n❌ Deployment preparation failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check Node.js version (should be 18+)');
    console.log('2. Run: npm install');
    console.log('3. Check for any missing dependencies');
    console.log('4. Review build logs for specific errors');
    process.exit(1);
  }
}

// Run deployment
deployToProduction();
