const axios = require('axios');
const fs = require('fs');
const path = require('path');

class InventoryWorkflowTester {
  constructor() {
    this.config = JSON.parse(fs.readFileSync('./test_environment_config.json', 'utf8'));
    this.testData = JSON.parse(fs.readFileSync('./sample_test_data.json', 'utf8'));
    this.results = {
      passed: 0,
      failed: 0,
      tests: []
    };
  }

  async runAllTests() {
    console.log('🚀 Starting Inventory Workflow Testing Suite\n');

    try {
      // Test 1: Raw Materials Receiving - New Product
      await this.testRawMaterialsReceivingNewProduct();

      // Test 2: Raw Materials Receiving - Existing Product
      await this.testRawMaterialsReceivingExistingProduct();

      // Test 3: Material Issue Request - Sufficient Stock
      await this.testMaterialIssueRequestSufficientStock();

      // Test 4: Material Issue Request - Insufficient Stock
      await this.testMaterialIssueRequestInsufficientStock();

      // Test 5: Low Stock Detection
      await this.testLowStockDetection();

      // Test 6: Error Handling - Invalid Data
      await this.testErrorHandlingInvalidData();

      // Test 7: Nexus API Integration
      await this.testNexusAPIIntegration();

      // Test 8: Retry Logic
      await this.testRetryLogic();

      this.printResults();

    } catch (error) {
      console.error('❌ Test suite failed:', error.message);
    }
  }

  async testRawMaterialsReceivingNewProduct() {
    console.log('📋 Test 1: Raw Materials Receiving - New Product');

    const testData = this.testData.raw_materials_receiving[0];
    const result = await this.executeTest('raw_materials_receiving', testData);

    this.recordTestResult('Raw Materials Receiving - New Product', result.success, result.message);
  }

  async testRawMaterialsReceivingExistingProduct() {
    console.log('📋 Test 2: Raw Materials Receiving - Existing Product');

    const testData = this.testData.raw_materials_receiving[1];
    const result = await this.executeTest('raw_materials_receiving', testData);

    this.recordTestResult('Raw Materials Receiving - Existing Product', result.success, result.message);
  }

  async testMaterialIssueRequestSufficientStock() {
    console.log('📋 Test 3: Material Issue Request - Sufficient Stock');

    const testData = this.testData.material_issue_requests[0];
    const result = await this.executeTest('material_issue_request', testData);

    this.recordTestResult('Material Issue Request - Sufficient Stock', result.success, result.message);
  }

  async testMaterialIssueRequestInsufficientStock() {
    console.log('📋 Test 4: Material Issue Request - Insufficient Stock');

    const testData = this.testData.material_issue_requests[1];
    const result = await this.executeTest('material_issue_request', testData);

    this.recordTestResult('Material Issue Request - Insufficient Stock', result.success, result.message);
  }

  async testLowStockDetection() {
    console.log('📋 Test 5: Low Stock Detection');

    // This test requires manual setup: first reduce stock below minimum level
    console.log('   Note: This test requires manual setup - reduce stock below minimum level first');
    const result = await this.executeTest('low_stock_detection', {});

    this.recordTestResult('Low Stock Detection', result.success, result.message);
  }

  async testErrorHandlingInvalidData() {
    console.log('📋 Test 6: Error Handling - Invalid Data');

    const invalidData = {
      product_id: "",
      quantity_received: -10,
      unit_price: "invalid"
    };

    const result = await this.executeTest('error_handling', invalidData);

    this.recordTestResult('Error Handling - Invalid Data', result.success, result.message);
  }

  async testNexusAPIIntegration() {
    console.log('📋 Test 7: Nexus API Integration');

    const result = await this.executeTest('nexus_api', {});

    this.recordTestResult('Nexus API Integration', result.success, result.message);
  }

  async testRetryLogic() {
    console.log('📋 Test 8: Retry Logic and Error Recovery');

    const result = await this.executeTest('retry_logic', {});

    this.recordTestResult('Retry Logic and Error Recovery', result.success, result.message);
  }

  async executeTest(testType, testData) {
    try {
      let endpoint, payload;

      switch (testType) {
        case 'raw_materials_receiving':
          endpoint = this.config.test_endpoints.raw_materials_webhook;
          payload = testData;
          break;
        case 'material_issue_request':
          endpoint = this.config.test_endpoints.issue_request_webhook;
          payload = testData;
          break;
        case 'error_handling':
          endpoint = this.config.test_endpoints.raw_materials_webhook;
          payload = testData;
          break;
        case 'low_stock_detection':
          // This is a manual test that requires prior setup
          return { success: false, message: 'Manual test - requires stock reduction setup first' };
        case 'nexus_api':
          // Test Nexus API integration by making a direct API call
          return await this.testNexusAPIDirectly();
        case 'retry_logic':
          // Test retry logic by simulating failures
          return await this.testRetryLogicDirectly();
        default:
          return { success: false, message: 'Unknown test type' };
      }

      const response = await axios.post(endpoint, payload, {
        timeout: this.config.test_settings.timeout,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        return { success: true, message: 'Test passed successfully' };
      } else {
        return { success: false, message: `Unexpected status code: ${response.status}` };
      }

    } catch (error) {
      if (testType === 'error_handling' && error.response?.status >= 400) {
        return { success: true, message: 'Error handling working correctly' };
      }
      return { success: false, message: error.message };
    }
  }

  recordTestResult(testName, success, message) {
    this.results.tests.push({
      name: testName,
      success,
      message,
      timestamp: new Date().toISOString()
    });

    if (success) {
      this.results.passed++;
      console.log(`✅ ${testName}: PASSED`);
    } else {
      this.results.failed++;
      console.log(`❌ ${testName}: FAILED - ${message}`);
    }
    console.log('');
  }

  async testNexusAPIDirectly() {
    try {
      console.log('   Testing Nexus API integration...');
      const response = await axios.post(
        this.config.environment_variables.NEXUS_API_URL,
        {
          product_id: 'RM-1001',
          quantity: 100,
          action: 'stock_update'
        },
        {
          headers: {
            'Authorization': `Bearer ${this.config.environment_variables.NEXUS_API_KEY}`,
            'Content-Type': 'application/json'
          },
          timeout: 5000
        }
      );

      if (response.status === 200) {
        return { success: true, message: 'Nexus API integration successful' };
      } else {
        return { success: false, message: `Nexus API returned status ${response.status}` };
      }
    } catch (error) {
      return { success: false, message: `Nexus API test failed: ${error.message}` };
    }
  }

  async testRetryLogicDirectly() {
    try {
      console.log('   Testing retry logic with simulated failures...');
      let attempts = 0;
      const maxAttempts = 3;

      while (attempts < maxAttempts) {
        attempts++;
        console.log(`   Attempt ${attempts}/${maxAttempts}`);

        try {
          // Simulate a failing request
          await axios.get('https://httpstat.us/500', { timeout: 2000 });
          return { success: true, message: 'Retry logic test completed successfully' };
        } catch (error) {
          if (attempts === maxAttempts) {
            return { success: false, message: `All ${maxAttempts} retry attempts failed` };
          }
          // Wait before retry (exponential backoff)
          const delay = Math.pow(2, attempts) * 1000;
          console.log(`   Retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    } catch (error) {
      return { success: false, message: `Retry logic test failed: ${error.message}` };
    }
  }

  printResults() {
    console.log('📊 Test Results Summary');
    console.log('======================');
    console.log(`Total Tests: ${this.results.tests.length}`);
    console.log(`Passed: ${this.results.passed}`);
    console.log(`Failed: ${this.results.failed}`);
    console.log(`Success Rate: ${((this.results.passed / this.results.tests.length) * 100).toFixed(1)}%`);
    console.log('');

    if (this.results.failed > 0) {
      console.log('❌ Failed Tests:');
      this.results.tests
        .filter(test => !test.success)
        .forEach(test => {
          console.log(`  - ${test.name}: ${test.message}`);
        });
    }

    // Save results to file
    const resultsFile = path.join(__dirname, 'test_results.json');
    fs.writeFileSync(resultsFile, JSON.stringify(this.results, null, 2));
    console.log(`📄 Detailed results saved to: ${resultsFile}`);
  }
}

// Run tests if this script is executed directly
if (require.main === module) {
  const tester = new InventoryWorkflowTester();
  tester.runAllTests().catch(console.error);
}

module.exports = InventoryWorkflowTester;
