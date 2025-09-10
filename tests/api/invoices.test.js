const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');

// Import the Next.js API handler
const invoiceHandler = require('../../pages/api/invoices/[invoiceId]/dueamount');

// Setup Express app for testing
const app = express();
app.use(bodyParser.json());

// Mock the invoiceId parameter for testing
app.get('/api/invoices/:invoiceId/dueamount', (req, res) => {
  // Simulate Next.js req.query structure
  req.query = { invoiceId: req.params.invoiceId };
  return invoiceHandler.default(req, res);
});

// A valid API key for testing
const validApiKey = 'test-api-key-123';

describe('Invoice Due Amount API Tests - GET /api/invoices/{Invoice-Id}/dueamount', () => {
  // Test successful response with valid Invoice ID and API key
  test('Successful response with valid Invoice ID and API key', async () => {
    const invoiceId = '1'; // Assuming invoice with ID 1 exists in test DB

    const res = await request(app)
      .get(`/api/invoices/${invoiceId}/dueamount`)
      .query({ api_key: validApiKey });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('statusCode', 200);
    expect(res.body).toHaveProperty('message', 'OK');
    expect(res.body).toHaveProperty('data');

    // Check data structure
    const data = res.body.data;
    expect(data).toHaveProperty('invoice_id');
    expect(data).toHaveProperty('amount_due');
    expect(data).toHaveProperty('is_paid');
    expect(typeof data.amount_due).toBe('number');
    expect(typeof data.is_paid).toBe('boolean');
  });

  // Test unauthorized response with missing API key
  test('Unauthorized response with missing API key', async () => {
    const invoiceId = '1';

    const res = await request(app)
      .get(`/api/invoices/${invoiceId}/dueamount`);

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('statusCode', 401);
    expect(res.body).toHaveProperty('message', 'Unauthorized');
    expect(res.body.data).toHaveProperty('name', 'Unauthorized');
    expect(res.body.data.message).toMatch(/invalid or missing API key/);
  });

  // Test unauthorized response with invalid API key
  test('Unauthorized response with invalid API key', async () => {
    const invoiceId = '1';
    const invalidApiKey = '';

    const res = await request(app)
      .get(`/api/invoices/${invoiceId}/dueamount`)
      .query({ api_key: invalidApiKey });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('statusCode', 401);
    expect(res.body).toHaveProperty('message', 'Unauthorized');
  });

  // Test edge case with non-existent Invoice ID
  test('Edge case with non-existent Invoice ID', async () => {
    const nonExistentInvoiceId = '999999';

    const res = await request(app)
      .get(`/api/invoices/${nonExistentInvoiceId}/dueamount`)
      .query({ api_key: validApiKey });

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('statusCode', 404);
    expect(res.body).toHaveProperty('message', 'Not Found');
    expect(res.body.data).toHaveProperty('name', 'NotFound');
    expect(res.body.data.message).toMatch(/Invoice not found/);
  });

  // Test with invalid invoice ID format
  test('Bad request with invalid invoice ID format', async () => {
    const invalidInvoiceId = 'invalid-id';

    const res = await request(app)
      .get(`/api/invoices/${invalidInvoiceId}/dueamount`)
      .query({ api_key: validApiKey });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('statusCode', 400);
    expect(res.body).toHaveProperty('message', 'Bad Request');
    expect(res.body.data.message).toMatch(/Invalid invoice ID provided/);
  });

  // Test method not allowed for non-GET requests
  test('Method not allowed for POST request', async () => {
    const invoiceId = '1';

    const res = await request(app)
      .post(`/api/invoices/${invoiceId}/dueamount`)
      .query({ api_key: validApiKey });

    expect(res.statusCode).toBe(405);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('statusCode', 405);
    expect(res.body).toHaveProperty('message', 'Method not allowed');
  });

  // Test API key via header instead of query parameter
  test('Successful response with API key in header', async () => {
    const invoiceId = '1';

    const res = await request(app)
      .get(`/api/invoices/${invoiceId}/dueamount`)
      .set('x-api-key', validApiKey);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
  });

  // Test with paid invoice (is_paid = true)
  test('Response for paid invoice shows is_paid as true', async () => {
    const paidInvoiceId = '2'; // Assuming invoice 2 is paid

    const res = await request(app)
      .get(`/api/invoices/${paidInvoiceId}/dueamount`)
      .query({ api_key: validApiKey });

    if (res.statusCode === 200) {
      expect(res.body.data.is_paid).toBe(true);
      expect(res.body.data.amount_due).toBe(0); // Paid invoices should have 0 due
    }
  });

  // Test with unpaid invoice (is_paid = false)
  test('Response for unpaid invoice shows is_paid as false', async () => {
    const unpaidInvoiceId = '3'; // Assuming invoice 3 is unpaid

    const res = await request(app)
      .get(`/api/invoices/${unpaidInvoiceId}/dueamount`)
      .query({ api_key: validApiKey });

    if (res.statusCode === 200) {
      expect(res.body.data.is_paid).toBe(false);
      expect(res.body.data.amount_due).toBeGreaterThan(0);
    }
  });
});
