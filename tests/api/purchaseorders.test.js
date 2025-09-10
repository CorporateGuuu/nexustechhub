const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

// Import the Next.js API handler
const purchaseOrdersHandler = require('../../pages/api/purchaseorders');

// Mock axios
jest.mock('axios');
const mockedAxios = axios;

// Setup Express app for testing
const app = express();
app.use(bodyParser.json());

// Mock the query parameters for testing
app.get('/api/purchaseorders', (req, res) => {
  return purchaseOrdersHandler.default(req, res);
});

// A valid API key for testing
const validApiKey = 'test-api-key-123';

// Mock RepairDesk API responses
const mockPurchaseOrderData = {
  success: true,
  statusCode: 200,
  message: 'OK',
  data: {
    purchaseOrderListData: [
      {
        id: 1,
        item_name: 'iPhone 15 Pro Screen',
        manufacturer: 'Apple',
        purchase_order_status: 'pending',
        po_order_id: 'PO-2024-001',
        supplier: 'TechParts Inc.',
        sku: 'IPH15P-SCR-001',
        created_date: '2024-01-15T10:00:00Z',
        createdd_date: '2024-01-15T10:00:00Z'
      }
    ],
    pagination: {
      page: 1,
      total_pages: 1,
      total_records: 1
    }
  }
};

describe('Purchase Orders API Tests - GET /api/purchaseorders', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Mock successful API response
    mockedAxios.create.mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: mockPurchaseOrderData })
    });
  });

  // Test successful response with valid parameters and API key
  test('Successful response with valid parameters and API key', async () => {
    const res = await request(app)
      .get('/api/purchaseorders')
      .query({
        api_key: validApiKey,
        page: 1,
        pagesize: 10
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('statusCode', 200);
    expect(res.body).toHaveProperty('message', 'OK');
    expect(res.body).toHaveProperty('purchaseOrderListData');
    expect(res.body).toHaveProperty('pagination');

    // Check that we have the expected data structure
    expect(Array.isArray(res.body.purchaseOrderListData)).toBe(true);
    expect(res.body.purchaseOrderListData.length).toBeGreaterThan(0);
  });

  // Test unauthorized response when API key is missing
  test('Unauthorized response when API key is missing', async () => {
    const res = await request(app)
      .get('/api/purchaseorders')
      .query({
        page: 1,
        pagesize: 10
      });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('statusCode', 401);
    expect(res.body).toHaveProperty('message', 'Unauthorized');
    expect(res.body.data).toHaveProperty('name', 'Unauthorized');
    expect(res.body.data.message).toMatch(/invalid or missing API key/);
  });

  // Test unauthorized response when API key is invalid
  test('Unauthorized response when API key is invalid', async () => {
    const res = await request(app)
      .get('/api/purchaseorders')
      .query({
        api_key: '',
        page: 1,
        pagesize: 10
      });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('statusCode', 401);
    expect(res.body).toHaveProperty('message', 'Unauthorized');
  });

  // Test pagination handling
  test('Pagination handling - verify correct navigation between pages', async () => {
    // First page
    const res1 = await request(app)
      .get('/api/purchaseorders')
      .query({
        api_key: validApiKey,
        page: 1,
        pagesize: 2
      });

    expect(res1.statusCode).toBe(200);
    expect(res1.body.pagination.currentPage).toBe(1);
    expect(res1.body.pagination.hasPrevPage).toBe(false);

    // Second page (if exists)
    if (res1.body.pagination.totalPages > 1) {
      const res2 = await request(app)
        .get('/api/purchaseorders')
        .query({
          api_key: validApiKey,
          page: 2,
          pagesize: 2
        });

      expect(res2.statusCode).toBe(200);
      expect(res2.body.pagination.currentPage).toBe(2);
      expect(res2.body.pagination.hasPrevPage).toBe(true);
    }
  });

  // Test bad request with missing page parameter
  test('Bad request with missing page parameter', async () => {
    const res = await request(app)
      .get('/api/purchaseorders')
      .query({
        api_key: validApiKey,
        pagesize: 10
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('statusCode', 400);
    expect(res.body).toHaveProperty('message', 'Bad Request');
    expect(res.body.data.message).toMatch(/page must be a positive integer/);
  });

  // Test bad request with invalid page parameter
  test('Bad request with invalid page parameter', async () => {
    const res = await request(app)
      .get('/api/purchaseorders')
      .query({
        api_key: validApiKey,
        page: 'invalid',
        pagesize: 10
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('statusCode', 400);
    expect(res.body).toHaveProperty('message', 'Bad Request');
    expect(res.body.data.message).toMatch(/page must be a positive integer/);
  });

  // Test bad request with missing pagesize parameter
  test('Bad request with missing pagesize parameter', async () => {
    const res = await request(app)
      .get('/api/purchaseorders')
      .query({
        api_key: validApiKey,
        page: 1
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('statusCode', 400);
    expect(res.body).toHaveProperty('message', 'Bad Request');
    expect(res.body.data.message).toMatch(/pagesize must be a positive integer/);
  });

  // Test bad request with invalid pagesize parameter
  test('Bad request with invalid pagesize parameter', async () => {
    const res = await request(app)
      .get('/api/purchaseorders')
      .query({
        api_key: validApiKey,
        page: 1,
        pagesize: 'invalid'
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('statusCode', 400);
    expect(res.body).toHaveProperty('message', 'Bad Request');
    expect(res.body.data.message).toMatch(/pagesize must be a positive integer/);
  });

  // Test bad request with invalid date format
  test('Bad request with invalid date format', async () => {
    const res = await request(app)
      .get('/api/purchaseorders')
      .query({
        api_key: validApiKey,
        page: 1,
        pagesize: 10,
        createdd_date: 'invalid-date'
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('statusCode', 400);
    expect(res.body).toHaveProperty('message', 'Bad Request');
    expect(res.body.data.message).toMatch(/createdd_date must be in YYYY-MM-DD format/);
  });

  // Test bad request with invalid created_date format
  test('Bad request with invalid created_date format', async () => {
    const res = await request(app)
      .get('/api/purchaseorders')
      .query({
        api_key: validApiKey,
        page: 1,
        pagesize: 10,
        created_date: 'invalid-date'
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('statusCode', 400);
    expect(res.body).toHaveProperty('message', 'Bad Request');
    expect(res.body.data.message).toMatch(/created_date must be/);
  });

  // Test filtering by ID
  test('Filtering by ID', async () => {
    const res = await request(app)
      .get('/api/purchaseorders')
      .query({
        api_key: validApiKey,
        page: 1,
        pagesize: 10,
        id: 1
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.purchaseOrderListData.length).toBeLessThanOrEqual(1);
    if (res.body.purchaseOrderListData.length > 0) {
      expect(res.body.purchaseOrderListData[0].id).toBe(1);
    }
  });

  // Test filtering by item_name
  test('Filtering by item_name', async () => {
    const res = await request(app)
      .get('/api/purchaseorders')
      .query({
        api_key: validApiKey,
        page: 1,
        pagesize: 10,
        item_name: 'iPhone'
      });

    expect(res.statusCode).toBe(200);
    res.body.purchaseOrderListData.forEach(item => {
      expect(item.item_name.toLowerCase()).toContain('iphone');
    });
  });

  // Test filtering by manufacturer
  test('Filtering by manufacturer', async () => {
    const res = await request(app)
      .get('/api/purchaseorders')
      .query({
        api_key: validApiKey,
        page: 1,
        pagesize: 10,
        manufacturer: 'Apple'
      });

    expect(res.statusCode).toBe(200);
    res.body.purchaseOrderListData.forEach(item => {
      expect(item.manufacturer.toLowerCase()).toContain('apple');
    });
  });

  // Test filtering by purchase_order_status
  test('Filtering by purchase_order_status', async () => {
    const res = await request(app)
      .get('/api/purchaseorders')
      .query({
        api_key: validApiKey,
        page: 1,
        pagesize: 10,
        purchase_order_status: 'pending'
      });

    expect(res.statusCode).toBe(200);
    res.body.purchaseOrderListData.forEach(item => {
      expect(item.purchase_order_status).toBe('pending');
    });
  });

  // Test edge case with non-existent filter values
  test('Edge case with non-existent filter values', async () => {
    const res = await request(app)
      .get('/api/purchaseorders')
      .query({
        api_key: validApiKey,
        page: 1,
        pagesize: 10,
        manufacturer: 'NonExistentManufacturer'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.purchaseOrderListData.length).toBe(0);
  });

  // Test method not allowed for non-GET requests
  test('Method not allowed for POST request', async () => {
    const res = await request(app)
      .post('/api/purchaseorders')
      .query({
        api_key: validApiKey,
        page: 1,
        pagesize: 10
      });

    expect(res.statusCode).toBe(405);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('statusCode', 405);
    expect(res.body).toHaveProperty('message', 'Method not allowed');
  });

  // Test API key via header instead of query parameter
  test('Successful response with API key in header', async () => {
    const res = await request(app)
      .get('/api/purchaseorders')
      .set('x-api-key', validApiKey)
      .query({
        page: 1,
        pagesize: 10
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
  });
});
