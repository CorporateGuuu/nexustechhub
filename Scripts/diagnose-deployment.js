#!/usr/bin/env node

// Deployment Diagnostic Script for Nexus TechHub
const { execSync } = require('child_process');
const fs = require('fs');
const https = require('https');

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

const logError = (message) => {
  log(`${colors.red}❌ ${message}${colors.reset}`);
};

const logWarning = (message) => {
  log(`${colors.yellow}⚠️  ${message}${colors.reset}`);
};

const logInfo = (message) => {
  log(`${colors.blue}ℹ️  ${message}${colors.reset}`);
};

// Configuration
const LIVE_SITE_URL = 'https://nexustechhub.netlify.app';
const GITHUB_REPO = 'https://github.com/CorporateGuuu/nexustechhub';

// Diagnose deployment issues
async function diagnoseDeployment() {
  try {
    log(`\n${colors.bright}${colors.cyan}🔍 NEXUS TECHHUB DEPLOYMENT DIAGNOSTIC${colors.reset}`);
    log(`${colors.bright}Diagnosing why changes aren't appearing on live domain...${colors.reset}\n`);

    // Step 1: Check local git status
    await checkGitStatus();

    // Step 2: Check live site status
    await checkLiveSiteStatus();

    // Step 3: Check build status
    await checkBuildStatus();

    // Step 4: Check environment variables
    await checkEnvironmentVariables();

    // Step 5: Provide recommendations
    await provideRecommendations();

  } catch (error) {
    logError(`Diagnostic failed: ${error.message}`);
  }
}

// Check git status
async function checkGitStatus() {
  log(`${colors.bright}1. Checking Git Status${colors.reset}`);

  try {
    // Check if we're in a git repository
    const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
    
    if (gitStatus.trim()) {
      logWarning('Uncommitted changes detected:');
      console.log(gitStatus);
      logInfo('You may need to commit and push these changes');
    } else {
      logSuccess('No uncommitted changes');
    }

    // Check current branch
    const currentBranch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
    logInfo(`Current branch: ${currentBranch}`);

    // Check last commit
    const lastCommit = execSync('git log -1 --oneline', { encoding: 'utf8' }).trim();
    logInfo(`Last commit: ${lastCommit}`);

    // Check remote status
    try {
      const remoteStatus = execSync('git status -uno', { encoding: 'utf8' });
      if (remoteStatus.includes('ahead')) {
        logWarning('Local branch is ahead of remote - you may need to push changes');
      } else if (remoteStatus.includes('behind')) {
        logWarning('Local branch is behind remote - you may need to pull changes');
      } else {
        logSuccess('Local and remote branches are in sync');
      }
    } catch (error) {
      logWarning('Could not check remote status');
    }

  } catch (error) {
    logError('Git status check failed - ensure you are in a git repository');
  }
}

// Check live site status
async function checkLiveSiteStatus() {
  log(`\n${colors.bright}2. Checking Live Site Status${colors.reset}`);

  try {
    // Test main site
    const response = await makeHttpRequest(LIVE_SITE_URL);
    
    if (response.statusCode === 200) {
      logSuccess(`Live site is accessible: ${LIVE_SITE_URL}`);
      
      // Check for specific content to verify deployment
      if (response.body.includes('Nexus TechHub')) {
        logSuccess('Site contains expected branding');
      } else {
        logWarning('Site may not have latest branding updates');
      }

      // Check for build ID or version info
      const buildIdMatch = response.body.match(/BUILD_ID['":\s]*([^'",\s]+)/);
      if (buildIdMatch) {
        logInfo(`Detected build ID: ${buildIdMatch[1]}`);
      }

    } else {
      logError(`Live site returned status: ${response.statusCode}`);
    }

    // Test specific pages
    const testPages = ['/test', '/products', '/contact'];
    
    for (const page of testPages) {
      try {
        const pageResponse = await makeHttpRequest(`${LIVE_SITE_URL}${page}`);
        if (pageResponse.statusCode === 200) {
          logSuccess(`Page accessible: ${page}`);
        } else {
          logWarning(`Page ${page} returned status: ${pageResponse.statusCode}`);
        }
      } catch (error) {
        logWarning(`Page ${page} failed: ${error.message}`);
      }
    }

  } catch (error) {
    logError(`Live site check failed: ${error.message}`);
  }
}

// Check build status
async function checkBuildStatus() {
  log(`\n${colors.bright}3. Checking Build Status${colors.reset}`);

  try {
    // Check if .next directory exists
    if (fs.existsSync('.next')) {
      logSuccess('.next build directory exists');
      
      // Check build ID
      if (fs.existsSync('.next/BUILD_ID')) {
        const buildId = fs.readFileSync('.next/BUILD_ID', 'utf8').trim();
        logInfo(`Local build ID: ${buildId}`);
      }
      
      // Check build size
      try {
        const buildStats = execSync('du -sh .next', { encoding: 'utf8' }).trim();
        logInfo(`Build size: ${buildStats.split('\t')[0]}`);
      } catch (error) {
        // du command might not be available
        logInfo('Build size check skipped');
      }
      
    } else {
      logWarning('.next build directory not found - run: npm run build');
    }

    // Check package.json for build scripts
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    if (packageJson.scripts && packageJson.scripts.build) {
      logSuccess('Build script found in package.json');
    } else {
      logError('Build script missing in package.json');
    }

  } catch (error) {
    logError(`Build status check failed: ${error.message}`);
  }
}

// Check environment variables
async function checkEnvironmentVariables() {
  log(`\n${colors.bright}4. Checking Environment Variables${colors.reset}`);

  try {
    // Check local environment files
    const envFiles = ['.env.local', '.env.production', '.env'];
    
    envFiles.forEach(file => {
      if (fs.existsSync(file)) {
        logSuccess(`Found ${file}`);
        
        // Check for critical variables
        const content = fs.readFileSync(file, 'utf8');
        const criticalVars = ['NEXTAUTH_SECRET', 'SENTRY_DSN', 'NEXTAUTH_URL'];
        
        criticalVars.forEach(varName => {
          if (content.includes(varName)) {
            logInfo(`  ${varName}: present`);
          }
        });
      } else {
        logInfo(`${file}: not found`);
      }
    });

    // Check netlify.toml
    if (fs.existsSync('netlify.toml')) {
      logSuccess('netlify.toml configuration found');
    } else {
      logWarning('netlify.toml not found - may affect deployment');
    }

  } catch (error) {
    logError(`Environment variables check failed: ${error.message}`);
  }
}

// Provide recommendations
async function provideRecommendations() {
  log(`\n${colors.bright}5. Recommendations${colors.reset}`);

  log(`\n${colors.bright}${colors.yellow}📋 COMMON DEPLOYMENT ISSUES & SOLUTIONS:${colors.reset}`);
  
  log(`\n${colors.bright}Issue: Changes not appearing on live site${colors.reset}`);
  log(`Solutions:`);
  log(`1. Commit and push your changes:`);
  log(`   git add .`);
  log(`   git commit -m "Update with latest changes"`);
  log(`   git push origin main`);
  log(`\n2. Check Netlify dashboard:`);
  log(`   - Go to: https://app.netlify.com/`);
  log(`   - Check deployment status and logs`);
  log(`   - Verify auto-deploy is enabled`);
  
  log(`\n${colors.bright}Issue: Build failures${colors.reset}`);
  log(`Solutions:`);
  log(`1. Test build locally: npm run build`);
  log(`2. Check for TypeScript/ESLint errors`);
  log(`3. Verify all dependencies are installed`);
  
  log(`\n${colors.bright}Issue: Environment variables not working${colors.reset}`);
  log(`Solutions:`);
  log(`1. Add variables in Netlify dashboard:`);
  log(`   Site settings > Environment variables`);
  log(`2. Redeploy after adding variables`);
  log(`3. Check variable names match exactly`);

  log(`\n${colors.bright}${colors.green}🚀 NEXT STEPS:${colors.reset}`);
  log(`1. If you have uncommitted changes: commit and push them`);
  log(`2. Check Netlify dashboard for deployment status`);
  log(`3. Add Sentry DSN to Netlify environment variables`);
  log(`4. Trigger a new deployment if needed`);
  log(`5. Run: npm run validate:production after deployment\n`);
}

// Make HTTP request helper
function makeHttpRequest(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, (response) => {
      let body = '';
      
      response.on('data', (chunk) => {
        body += chunk;
      });
      
      response.on('end', () => {
        resolve({
          statusCode: response.statusCode,
          headers: response.headers,
          body: body
        });
      });
    });

    request.on('error', (error) => {
      reject(error);
    });

    request.setTimeout(10000, () => {
      request.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

// Run diagnostic if this script is executed directly
if (require.main === module) {
  diagnoseDeployment();
}

module.exports = { diagnoseDeployment };
