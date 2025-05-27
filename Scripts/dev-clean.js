#!/usr/bin/env node

/**
 * Development Clean Script for Nexus TechHub
 * 
 * This script helps resolve common development issues by:
 * 1. Cleaning corrupted build artifacts
 * 2. Clearing caches
 * 3. Restarting the development server
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🧹 Nexus TechHub Development Clean Script');
console.log('=========================================');

// Function to remove directory recursively
function removeDir(dirPath) {
  if (fs.existsSync(dirPath)) {
    console.log(`🗑️  Removing ${dirPath}...`);
    fs.rmSync(dirPath, { recursive: true, force: true });
    console.log(`✅ Removed ${dirPath}`);
  } else {
    console.log(`ℹ️  ${dirPath} doesn't exist, skipping...`);
  }
}

// Function to run command
function runCommand(command, description) {
  console.log(`🔧 ${description}...`);
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ ${description} completed`);
  } catch (error) {
    console.log(`⚠️  ${description} failed:`, error.message);
  }
}

// Main cleanup process
async function cleanDevelopment() {
  console.log('\n🚀 Starting cleanup process...\n');

  // 1. Remove .next directory
  removeDir('.next');

  // 2. Remove node_modules cache
  removeDir('node_modules/.cache');

  // 3. Clear npm cache
  runCommand('npm cache clean --force', 'Clearing npm cache');

  // 4. Reinstall dependencies
  runCommand('npm install', 'Reinstalling dependencies');

  console.log('\n🎉 Cleanup completed successfully!');
  console.log('\n📝 Next steps:');
  console.log('   1. Run: npm run dev');
  console.log('   2. Open: http://localhost:3002');
  console.log('   3. Verify all pages load correctly');
  console.log('\n💡 If issues persist, check:');
  console.log('   - Node.js version compatibility');
  console.log('   - Environment variables in .env.local');
  console.log('   - Component import/export statements');
}

// Run the cleanup
cleanDevelopment().catch(console.error);
