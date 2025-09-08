const axios = require('axios');
const config = require('../config');

// Helper function to log requests and responses
function logRequestResponse(method, url, requestData, responseData, error = null) {
  console.log(`\n=== ${method} ${url} ===`);
  if (requestData) {
    console.log('Request Data:', JSON.stringify(requestData, null, 2));
  }
  if (error) {
    console.log('Error:', error.message);
    if (error.response) {
      console.log('Response Status:', error.response.status);
      console.log('Response Data:', JSON.stringify(error.response.data, null, 2));
    }
  } else {
    console.log('Response Status:', responseData.status);
    console.log('Response Data:', JSON.stringify(responseData.data, null, 2));
  }
  console.log('='.repeat(50));
}

// Test suite for GET /tickets/{Ticket-Id} endpoint
describe('GET /tickets/{Ticket-Id} API Tests', () => {
  const baseURL = config.baseURL;
  const apiKey = config.apiKey;

  // Positive Test: Valid Ticket-Id with valid api_key
  test('should return 200 with ticket details for valid Ticket-Id and api_key', async () => {
    const ticketId = config.validTicketId;
    const url = `${baseURL}/tickets/${ticketId}?api_key=${apiKey}`;

    try {
      const response = await axios.get(url, { timeout: config.timeout });
      logRequestResponse('GET', url, null, response);

      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data).toHaveProperty('statusCode');
      expect(response.data).toHaveProperty('message');
      expect(response.data).toHaveProperty('data');

      // Validate data structure
      const data = response.data.data;
      expect(data).toHaveProperty('summary');
      expect(data.summary).toHaveProperty('id');
      expect(data.summary.id).toBe(ticketId);
      expect(data).toHaveProperty('customer');
      expect(data).toHaveProperty('devices');
      expect(data).toHaveProperty('notes');
      expect(data).toHaveProperty('history');

    } catch (error) {
      logRequestResponse('GET', url, null, null, error);
      throw error;
    }
  });

  // Authentication Test: Invalid api_key
  test('should return 401 for invalid api_key', async () => {
    const ticketId = config.validTicketId;
    const invalidApiKey = 'invalid_api_key';
    const url = `${baseURL}/tickets/${ticketId}?api_key=${invalidApiKey}`;

    try {
      await axios.get(url, { timeout: config.timeout });
      fail('Expected 401 error but request succeeded');
    } catch (error) {
      logRequestResponse('GET', url, null, null, error);
      expect(error.response.status).toBe(401);
      expect(error.response.data).toHaveProperty('statusCode', 401);
    }
  });

  // Authentication Test: Missing api_key
  test('should return 401 for missing api_key', async () => {
    const ticketId = config.validTicketId;
    const url = `${baseURL}/tickets/${ticketId}`;

    try {
      await axios.get(url, { timeout: config.timeout });
      fail('Expected 401 error but request succeeded');
    } catch (error) {
      logRequestResponse('GET', url, null, null, error);
      expect(error.response.status).toBe(401);
      expect(error.response.data).toHaveProperty('statusCode', 401);
    }
  });

  // Validation Test: Invalid Ticket-Id
  test('should return 404 for invalid Ticket-Id', async () => {
    const ticketId = config.invalidTicketId;
    const url = `${baseURL}/tickets/${ticketId}?api_key=${apiKey}`;

    try {
      await axios.get(url, { timeout: config.timeout });
      fail('Expected 404 error but request succeeded');
    } catch (error) {
      logRequestResponse('GET', url, null, null, error);
      expect(error.response.status).toBe(404);
      expect(error.response.data).toHaveProperty('statusCode', 404);
      expect(error.response.data).toHaveProperty('message', 'No Result Found');
    }
  });

  // Validation Test: Non-existent Ticket-Id
  test('should return 404 for non-existent Ticket-Id', async () => {
    const ticketId = config.nonExistentTicketId;
    const url = `${baseURL}/tickets/${ticketId}?api_key=${apiKey}`;

    try {
      await axios.get(url, { timeout: config.timeout });
      fail('Expected 404 error but request succeeded');
    } catch (error) {
      logRequestResponse('GET', url, null, null, error);
      expect(error.response.status).toBe(404);
      expect(error.response.data).toHaveProperty('statusCode', 404);
      expect(error.response.data).toHaveProperty('message', 'No Result Found');
    }
  });

  // Validation Test: Empty Ticket-Id
  test('should handle empty Ticket-Id gracefully', async () => {
    const ticketId = '';
    const url = `${baseURL}/tickets/${ticketId}?api_key=${apiKey}`;

    try {
      await axios.get(url, { timeout: config.timeout });
      fail('Expected error but request succeeded');
    } catch (error) {
      logRequestResponse('GET', url, null, null, error);
      // API should reject gracefully - could be 400, 404, or other error
      expect(error.response).toBeDefined();
      expect([400, 404, 422]).toContain(error.response.status);
    }
  });
});
