const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// List of external test files to run
const testFiles = [
  'tests/api/external/tickets.external.test.js',
  'tests/api/external/customer.external.test.js',
  'tests/api/external/invoices.external.test.js',
  'tests/api/external/repaircategories.external.test.js',
  'tests/api/external/appointment.inventory.external.test.js',
  'tests/api/external/appointment.locations.external.test.js',
  'tests/api/external/appointment.repairtypes.external.test.js'
];

// Test results storage
const testResults = {
  summary: {
    totalTests: 0,
    passedTests: 0,
    failedTests: 0,
    skippedTests: 0
  },
  results: [],
  createdData: [],
  cleanupActions: [],
  workflowTests: [],
  failures: []
};

// Function to run a single test file
function runTestFile(testFile) {
  return new Promise((resolve) => {
    console.log(`\n🚀 Running tests for ${testFile}...\n`);

    const jestCommand = `npx jest ${testFile} --config jest.api.config.js --verbose --json --outputFile=/tmp/test-results-${path.basename(testFile, '.js')}.json`;

    exec(jestCommand, { cwd: process.cwd() }, (error, stdout, stderr) => {
      const result = {
        file: testFile,
        success: !error,
        stdout: stdout,
        stderr: stderr,
        error: error ? error.message : null
      };

      if (error) {
        console.error(`❌ Tests failed for ${testFile}:`, error.message);
        testResults.failures.push({
          file: testFile,
          error: error.message,
          stderr: stderr
        });
      } else {
        console.log(`✅ Tests passed for ${testFile}`);
      }

      // Try to read detailed results if available
      const resultFile = `/tmp/test-results-${path.basename(testFile, '.js')}.json`;
      if (fs.existsSync(resultFile)) {
        try {
          const detailedResults = JSON.parse(fs.readFileSync(resultFile, 'utf8'));
          result.detailed = detailedResults;
          testResults.results.push(result);

          // Update summary
          testResults.summary.totalTests += detailedResults.numTotalTests || 0;
          testResults.summary.passedTests += detailedResults.numPassedTests || 0;
          testResults.summary.failedTests += detailedResults.numFailedTests || 0;
          testResults.summary.skippedTests += detailedResults.numPendingTests || 0;

        } catch (parseError) {
          console.warn(`Could not parse detailed results for ${testFile}:`, parseError.message);
          testResults.results.push(result);
        }

        // Clean up temp file
        fs.unlinkSync(resultFile);
      } else {
        testResults.results.push(result);
      }

      resolve(result);
    });
  });
}

// Function to run workflow integration tests
async function runWorkflowTests() {
  console.log('\n🔗 Running workflow integration tests...\n');

  // Test 1: Create ticket and check if it appears in inventory
  try {
    console.log('Testing ticket creation workflow...');
    const ticketTest = await runTestFile('tests/api/external/tickets.external.test.js');

    if (ticketTest.success) {
      // Extract created ticket ID if possible
      const ticketIdMatch = ticketTest.stdout.match(/Created ticket ID: (\d+)/);
      if (ticketIdMatch) {
        const ticketId = ticketIdMatch[1];
        testResults.createdData.push({
          type: 'ticket',
          id: ticketId,
          workflow: 'inventory_check'
        });

        // Test inventory impact
        console.log(`Checking inventory impact for ticket ${ticketId}...`);
        // This would require additional API calls to check inventory
        testResults.workflowTests.push({
          name: 'Ticket to Inventory',
          ticketId: ticketId,
          status: 'completed',
          notes: 'Ticket created successfully, inventory check pending'
        });
      }
    }
  } catch (error) {
    testResults.workflowTests.push({
      name: 'Ticket to Inventory',
      status: 'failed',
      error: error.message
    });
  }

  // Test 2: Create customer and invoice workflow
  try {
    console.log('Testing customer to invoice workflow...');
    const customerTest = await runTestFile('tests/api/external/customer.external.test.js');

    if (customerTest.success) {
      const invoiceTest = await runTestFile('tests/api/external/invoices.external.test.js');

      testResults.workflowTests.push({
        name: 'Customer to Invoice',
        customerCreated: customerTest.success,
        invoiceCreated: invoiceTest.success,
        status: customerTest.success && invoiceTest.success ? 'completed' : 'partial'
      });
    }
  } catch (error) {
    testResults.workflowTests.push({
      name: 'Customer to Invoice',
      status: 'failed',
      error: error.message
    });
  }
}

// Function to attempt cleanup of created data
async function cleanupCreatedData() {
  console.log('\n🧹 Attempting cleanup of created test data...\n');

  // Note: Actual cleanup would require DELETE endpoints or admin access
  // For now, we'll just log what would need to be cleaned up

  testResults.createdData.forEach(item => {
    console.log(`📝 Would clean up ${item.type} with ID: ${item.id}`);

    testResults.cleanupActions.push({
      type: item.type,
      id: item.id,
      action: 'manual_cleanup_required',
      notes: `Delete ${item.type} ${item.id} manually or via admin panel`
    });
  });

  if (testResults.createdData.length === 0) {
    console.log('✅ No test data created that requires cleanup');
  }
}

// Function to generate comprehensive report
function generateReport() {
  console.log('\n📊 === EXTERNAL API TEST REPORT ===\n');

  // Summary
  console.log('📈 SUMMARY:');
  console.log(`   Total Tests: ${testResults.summary.totalTests}`);
  console.log(`   Passed: ${testResults.summary.passedTests}`);
  console.log(`   Failed: ${testResults.summary.failedTests}`);
  console.log(`   Skipped: ${testResults.summary.skippedTests}`);
  console.log(`   Success Rate: ${testResults.summary.totalTests > 0 ? ((testResults.summary.passedTests / testResults.summary.totalTests) * 100).toFixed(1) : 0}%`);

  // Detailed results
  console.log('\n📋 DETAILED RESULTS:');
  testResults.results.forEach(result => {
    const status = result.success ? '✅ PASS' : '❌ FAIL';
    console.log(`   ${status} ${result.file}`);
    if (!result.success && result.error) {
      console.log(`      Error: ${result.error}`);
    }
  });

  // Failures analysis
  if (testResults.failures.length > 0) {
    console.log('\n❌ FAILURE ANALYSIS:');
    testResults.failures.forEach(failure => {
      console.log(`   ${failure.file}:`);
      console.log(`      ${failure.error}`);
      if (failure.stderr) {
        console.log(`      Details: ${failure.stderr.substring(0, 200)}...`);
      }
    });

    console.log('\n💡 SUGGESTED FIXES:');
    console.log('   1. Check API key validity in tests/api/config.js');
    console.log('   2. Verify network connectivity to RepairDesk API');
    console.log('   3. Check rate limits and retry after delay');
    console.log('   4. Review API documentation for endpoint changes');
    console.log('   5. Ensure test data format matches API requirements');
  }

  // Created data and cleanup
  if (testResults.createdData.length > 0) {
    console.log('\n📝 CREATED TEST DATA:');
    testResults.createdData.forEach(item => {
      console.log(`   ${item.type.toUpperCase()} ID: ${item.id} (${item.workflow || 'N/A'})`);
    });

    console.log('\n🧹 CLEANUP REQUIRED:');
    testResults.cleanupActions.forEach(action => {
      console.log(`   ${action.type.toUpperCase()} ${action.id}: ${action.notes}`);
    });
  }

  // Workflow tests
  if (testResults.workflowTests.length > 0) {
    console.log('\n🔗 WORKFLOW INTEGRATION RESULTS:');
    testResults.workflowTests.forEach(workflow => {
      const status = workflow.status === 'completed' ? '✅' : workflow.status === 'partial' ? '⚠️' : '❌';
      console.log(`   ${status} ${workflow.name}: ${workflow.status}`);
      if (workflow.error) {
        console.log(`      Error: ${workflow.error}`);
      }
      if (workflow.notes) {
        console.log(`      Notes: ${workflow.notes}`);
      }
    });
  }

  // Save report to file
  const reportPath = 'external-api-test-report.json';
  fs.writeFileSync(reportPath, JSON.stringify(testResults, null, 2));
  console.log(`\n💾 Detailed report saved to: ${reportPath}`);

  console.log('\n🎯 NEXT STEPS:');
  console.log('   1. Review failures and apply suggested fixes');
  console.log('   2. Manually clean up any created test data');
  console.log('   3. Update API key if authentication issues persist');
  console.log('   4. Consider adding automated cleanup for future tests');
  console.log('   5. Run tests again after fixes to verify resolution');
}

// Main execution function
async function runAllTests() {
  console.log('🧪 Starting External API Test Suite...\n');

  try {
    // Run all individual test files
    for (const testFile of testFiles) {
      if (fs.existsSync(testFile)) {
        await runTestFile(testFile);
      } else {
        console.warn(`⚠️ Test file not found: ${testFile}`);
        testResults.failures.push({
          file: testFile,
          error: 'File not found'
        });
      }
    }

    // Run workflow integration tests
    await runWorkflowTests();

    // Attempt cleanup
    await cleanupCreatedData();

    // Generate comprehensive report
    generateReport();

  } catch (error) {
    console.error('💥 Critical error during test execution:', error);
    testResults.failures.push({
      file: 'test-runner',
      error: error.message
    });
    generateReport();
  }
}

// Run the tests
runAllTests().catch(error => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});
