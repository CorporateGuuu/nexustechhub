const axios = require('axios');

// Configuration
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3006';
const API_KEY = process.env.API_KEY || 'test_api_key';

// Test cases
async function runTests() {
  console.log('🧪 Testing Inventory Transfer API...\n');

  // Test 1: No authentication
  console.log('Test 1: No authentication');
  try {
    const response = await axios.get(`${API_BASE_URL}/api/inventorytransfer`);
    console.log('❌ Should have failed with 401');
  } catch (error) {
    if (error.response?.status === 401) {
      console.log('✅ Correctly returned 401 Unauthorized');
    } else {
      console.log('❌ Unexpected error:', error.response?.status);
    }
  }

  // Test 2: Invalid API key
  console.log('\nTest 2: Invalid API key');
  try {
    const response = await axios.get(`${API_BASE_URL}/api/inventorytransfer?api_key=invalid_key`);
    console.log('❌ Should have failed with 401');
  } catch (error) {
    if (error.response?.status === 401) {
      console.log('✅ Correctly returned 401 Unauthorized');
    } else {
      console.log('❌ Unexpected error:', error.response?.status);
    }
  }

  // Test 3: Valid API key but no data
  console.log('\nTest 3: Valid API key (no data expected)');
  try {
    const response = await axios.get(`${API_BASE_URL}/api/inventorytransfer?api_key=${API_KEY}`);
    console.log('✅ Successfully called API');
    console.log('Response status:', response.status);
    console.log('Data structure:', {
      success: response.data.success,
      statusCode: response.data.statusCode,
      hasData: !!response.data.data,
      transferCount: response.data.data?.inventoryTransferListData?.length || 0
    });
  } catch (error) {
    console.log('❌ Error:', error.response?.data || error.message);
  }

  // Test 4: Test pagination
  console.log('\nTest 4: Test pagination');
  try {
    const response = await axios.get(`${API_BASE_URL}/api/inventorytransfer?api_key=${API_KEY}&page=1&per_page=10`);
    console.log('✅ Pagination test successful');
    console.log('Pagination info:', response.data.data?.pagination);
  } catch (error) {
    console.log('❌ Pagination test failed:', error.response?.data || error.message);
  }

  // Test 5: Test invalid parameters
  console.log('\nTest 5: Invalid page parameter');
  try {
    const response = await axios.get(`${API_BASE_URL}/api/inventorytransfer?api_key=${API_KEY}&page=invalid`);
    console.log('❌ Should have failed with 400');
  } catch (error) {
    if (error.response?.status === 400) {
      console.log('✅ Correctly returned 400 Bad Request');
    } else {
      console.log('❌ Unexpected error:', error.response?.status);
    }
  }

  // Test 6: Test date filtering
  console.log('\nTest 6: Date filtering');
  try {
    const response = await axios.get(`${API_BASE_URL}/api/inventorytransfer?api_key=${API_KEY}&from_date=2024-01-01&to_date=2024-12-31`);
    console.log('✅ Date filtering test successful');
    console.log('Results count:', response.data.data?.inventoryTransferListData?.length || 0);
  } catch (error) {
    console.log('❌ Date filtering test failed:', error.response?.data || error.message);
  }

  console.log('\n🎉 Testing completed!');
}

// Run tests if this script is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { runTests };
