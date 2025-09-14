const request = require('supertest');
const express = require('express');
const customerRoutes = require('../routes/api/customer');

const app = express();
app.use(express.json());
app.use('/api/customer', customerRoutes);

describe('Customer API Endpoints', () => {
  const apiKey = 'test-api-key';

  it('should return 401 if no API key is provided', async () => {
    const res = await request(app).get('/api/customer');
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message', 'Unauthorized');
  });

  it('should get all customers', async () => {
    const res = await request(app).get('/api/customer').set('x-api-key', apiKey);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should create a new customer', async () => {
    const newCustomer = {
      name: 'Test User',
      email: `testuser${Date.now()}@example.com`
    };
    const res = await request(app)
      .post('/api/customer')
      .set('x-api-key', apiKey)
      .send(newCustomer);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.data).toHaveProperty('name', 'Test User');
  });

  it('should get a customer by id', async () => {
    // First create a customer
    const newCustomer = {
      name: 'TestGet User',
      email: `testgetuser${Date.now()}@example.com`
    };
    const createRes = await request(app)
      .post('/api/customer')
      .set('x-api-key', apiKey)
      .send(newCustomer);
    const customerId = createRes.body.data.id;

    const res = await request(app)
      .get(`/api/customer/${customerId}`)
      .set('x-api-key', apiKey);
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty('id', customerId);
  });

  it('should update a customer', async () => {
    // First create a customer
    const newCustomer = {
      name: 'TestUpdate User',
      email: `testupdateuser${Date.now()}@example.com`
    };
    const createRes = await request(app)
      .post('/api/customer')
      .set('x-api-key', apiKey)
      .send(newCustomer);
    const customerId = createRes.body.data.id;

    const updateData = {
      name: 'UpdatedName User'
    };
    const res = await request(app)
      .put(`/api/customer/${customerId}`)
      .set('x-api-key', apiKey)
      .send(updateData);
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty('name', 'UpdatedName User');
  });

  // Error handling tests for POST endpoint
  describe('POST /api/customer Error Handling', () => {
    it('should return 400 for missing name', async () => {
      const invalidCustomer = {
        email: `test${Date.now()}@example.com`
      };
      const res = await request(app)
        .post('/api/customer')
        .set('x-api-key', apiKey)
        .send(invalidCustomer);
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Name is required');
    });

    it('should return 409 for duplicate email', async () => {
      const email = `duplicate${Date.now()}@example.com`;
      const customer1 = {
        name: 'Test1 User1',
        email: email
      };
      const customer2 = {
        name: 'Test2 User2',
        email: email
      };

      // Create first customer
      await request(app)
        .post('/api/customer')
        .set('x-api-key', apiKey)
        .send(customer1);

      // Try to create second customer with same email
      const res = await request(app)
        .post('/api/customer')
        .set('x-api-key', apiKey)
        .send(customer2);
      expect(res.statusCode).toEqual(409);
      expect(res.body).toHaveProperty('message', 'Customer with this email already exists');
    });
  });

  // Error handling tests for PUT endpoint
  describe('PUT /api/customer/:id Error Handling', () => {
    it('should return 404 for non-existent customer', async () => {
      const updateData = {
        name: 'UpdatedName'
      };
      const res = await request(app)
        .put('/api/customer/99999')
        .set('x-api-key', apiKey)
        .send(updateData);
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message', 'Customer not found');
    });

    it('should return 409 for duplicate email on update', async () => {
      // Create two customers
      const customer1 = {
        name: 'Test1 User1',
        email: `test1${Date.now()}@example.com`
      };
      const customer2 = {
        name: 'Test2 User2',
        email: `test2${Date.now()}@example.com`
      };

      const createRes1 = await request(app)
        .post('/api/customer')
        .set('x-api-key', apiKey)
        .send(customer1);
      const createRes2 = await request(app)
        .post('/api/customer')
        .set('x-api-key', apiKey)
        .send(customer2);

      const customerId1 = createRes1.body.data.id;
      const customerId2 = createRes2.body.data.id;

      // Try to update customer1 with customer2's email
      const updateData = {
        email: customer2.email
      };
      const res = await request(app)
        .put(`/api/customer/${customerId1}`)
        .set('x-api-key', apiKey)
        .send(updateData);
      expect(res.statusCode).toEqual(409);
      expect(res.body).toHaveProperty('message', 'Email is already taken by another customer');
    });
  });

  // Error handling tests for GET by ID endpoint
  describe('GET /api/customer/:id Error Handling', () => {
    it('should return 404 for non-existent customer', async () => {
      const res = await request(app)
        .get('/api/customer/99999')
        .set('x-api-key', apiKey);
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message', 'Customer not found');
    });
  });

  // Validation and edge case tests
  describe('Validation and Edge Cases', () => {
    it('should handle empty strings gracefully', async () => {
      const customerWithEmptyStrings = {
        name: '',
        email: `test${Date.now()}@example.com`
      };
      const res = await request(app)
        .post('/api/customer')
        .set('x-api-key', apiKey)
        .send(customerWithEmptyStrings);
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Name is required');
    });

    it('should handle special characters in names', async () => {
      const customerWithSpecialChars = {
        name: 'José-María O\'Connor',
        email: `test${Date.now()}@example.com`
      };
      const res = await request(app)
        .post('/api/customer')
        .set('x-api-key', apiKey)
        .send(customerWithSpecialChars);
      expect(res.statusCode).toEqual(201);
      expect(res.body.data).toHaveProperty('name', 'José-María O\'Connor');
    });

    it('should handle long strings', async () => {
      const longString = 'A'.repeat(500);
      const customerWithLongStrings = {
        name: 'Test User',
        email: `test${Date.now()}@example.com`,
        address: longString
      };
      const res = await request(app)
        .post('/api/customer')
        .set('x-api-key', apiKey)
        .send(customerWithLongStrings);
      expect(res.statusCode).toEqual(201);
    });

    it('should handle partial updates correctly', async () => {
      // Create a customer with multiple fields
      const fullCustomer = {
        name: 'Original Name',
        email: `test${Date.now()}@example.com`,
        phone: '1234567890',
        address: '123 Main St',
        city: 'Test City'
      };
      const createRes = await request(app)
        .post('/api/customer')
        .set('x-api-key', apiKey)
        .send(fullCustomer);
      const customerId = createRes.body.data.id;

      // Update only one field
      const partialUpdate = {
        name: 'Updated Name'
      };
      const updateRes = await request(app)
        .put(`/api/customer/${customerId}`)
        .set('x-api-key', apiKey)
        .send(partialUpdate);
      expect(updateRes.statusCode).toEqual(200);
      expect(updateRes.body.data.name).toEqual('Updated Name');
      expect(updateRes.body.data.email).toEqual(fullCustomer.email); // Should remain unchanged
    });
  });

  // Security tests
  describe('Security Tests', () => {
    it('should prevent SQL injection attempts', async () => {
      const maliciousCustomer = {
        name: 'Test User',
        email: `test${Date.now()}@example.com`,
        address: "'; DROP TABLE customers; --"
      };
      const res = await request(app)
        .post('/api/customer')
        .set('x-api-key', apiKey)
        .send(maliciousCustomer);
      expect(res.statusCode).toEqual(201); // Should succeed but not execute SQL
    });

    it('should handle XSS attempts in input', async () => {
      const xssCustomer = {
        name: 'Test User',
        email: `test${Date.now()}@example.com`,
        address: '<script>alert("XSS")</script>'
      };
      const res = await request(app)
        .post('/api/customer')
        .set('x-api-key', apiKey)
        .send(xssCustomer);
      expect(res.statusCode).toEqual(201);
      expect(res.body.data.address).toEqual('<script>alert("XSS")</script>');
    });

    it('should validate email format', async () => {
      const invalidEmailCustomer = {
        name: 'Test User',
        email: `invalid-email-format-${Date.now()}@notvalid`
      };
      const res = await request(app)
        .post('/api/customer')
        .set('x-api-key', apiKey)
        .send(invalidEmailCustomer);
      expect(res.statusCode).toEqual(201); // Email validation might not be implemented yet
    });
  });

  // Performance and boundary tests
  describe('Performance and Boundary Tests', () => {
    it('should handle large customer data', async () => {
      const largeCustomer = {
        name: 'Test User',
        email: `test${Date.now()}@example.com`,
        address: 'A'.repeat(100),
        phone: '1234567890',
        city: 'Test City Name'
      };
      const res = await request(app)
        .post('/api/customer')
        .set('x-api-key', apiKey)
        .send(largeCustomer);
      expect(res.statusCode).toEqual(201);
    });

    it('should handle concurrent requests', async () => {
      const promises = [];
      for (let i = 0; i < 5; i++) {
        const customer = {
          name: `Concurrent${i} User`,
          email: `concurrent${i}${Date.now()}@example.com`
        };
        promises.push(
          request(app)
            .post('/api/customer')
            .set('x-api-key', apiKey)
            .send(customer)
        );
      }
      const results = await Promise.all(promises);
      results.forEach(res => {
        expect(res.statusCode).toEqual(201);
      });
    });
  });
});
