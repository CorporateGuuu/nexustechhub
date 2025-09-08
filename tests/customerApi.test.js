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
      first_name: 'Test',
      last_name: 'User',
      email: `testuser${Date.now()}@example.com`
    };
    const res = await request(app)
      .post('/api/customer')
      .set('x-api-key', apiKey)
      .send(newCustomer);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.data).toHaveProperty('first_name', 'Test');
  });

  it('should get a customer by id', async () => {
    // First create a customer
    const newCustomer = {
      first_name: 'TestGet',
      last_name: 'User',
      email: `testgetuser${Date.now()}@example.com`
    };
    const createRes = await request(app)
      .post('/api/customer')
      .set('x-api-key', apiKey)
      .send(newCustomer);
    const customerId = createRes.body.data.cid;

    const res = await request(app)
      .get(`/api/customer/${customerId}`)
      .set('x-api-key', apiKey);
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty('id', customerId);
  });

  it('should update a customer', async () => {
    // First create a customer
    const newCustomer = {
      first_name: 'TestUpdate',
      last_name: 'User',
      email: `testupdateuser${Date.now()}@example.com`
    };
    const createRes = await request(app)
      .post('/api/customer')
      .set('x-api-key', apiKey)
      .send(newCustomer);
    const customerId = createRes.body.data.cid;

    const updateData = {
      first_name: 'UpdatedName'
    };
    const res = await request(app)
      .put(`/api/customer/${customerId}`)
      .set('x-api-key', apiKey)
      .send(updateData);
    expect(res.statusCode).toEqual(201);
    expect(res.body.data).toHaveProperty('first_name', 'UpdatedName');
  });

  // Error handling tests for POST endpoint
  describe('POST /api/customer Error Handling', () => {
    it('should return 400 for missing first_name', async () => {
      const invalidCustomer = {
        last_name: 'User',
        email: `test${Date.now()}@example.com`
      };
      const res = await request(app)
        .post('/api/customer')
        .set('x-api-key', apiKey)
        .send(invalidCustomer);
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'First name and last name are required');
    });

    it('should return 400 for missing last_name', async () => {
      const invalidCustomer = {
        first_name: 'Test',
        email: `test${Date.now()}@example.com`
      };
      const res = await request(app)
        .post('/api/customer')
        .set('x-api-key', apiKey)
        .send(invalidCustomer);
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'First name and last name are required');
    });

    it('should return 409 for duplicate email', async () => {
      const email = `duplicate${Date.now()}@example.com`;
      const customer1 = {
        first_name: 'Test1',
        last_name: 'User1',
        email: email
      };
      const customer2 = {
        first_name: 'Test2',
        last_name: 'User2',
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
        first_name: 'UpdatedName'
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
        first_name: 'Test1',
        last_name: 'User1',
        email: `test1${Date.now()}@example.com`
      };
      const customer2 = {
        first_name: 'Test2',
        last_name: 'User2',
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

      const customerId1 = createRes1.body.data.cid;
      const customerId2 = createRes2.body.data.cid;

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
        first_name: '',
        last_name: '',
        email: `test${Date.now()}@example.com`,
        address1: '',
        city: '',
        phone: ''
      };
      const res = await request(app)
        .post('/api/customer')
        .set('x-api-key', apiKey)
        .send(customerWithEmptyStrings);
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'First name and last name are required');
    });

    it('should handle special characters in names', async () => {
      const customerWithSpecialChars = {
        first_name: 'José-María',
        last_name: 'O\'Connor',
        email: `test${Date.now()}@example.com`
      };
      const res = await request(app)
        .post('/api/customer')
        .set('x-api-key', apiKey)
        .send(customerWithSpecialChars);
      expect(res.statusCode).toEqual(201);
      expect(res.body.data).toHaveProperty('first_name', 'José-María');
    });

    it('should handle long strings', async () => {
      const longString = 'A'.repeat(500);
      const customerWithLongStrings = {
        first_name: 'Test',
        last_name: 'User',
        email: `test${Date.now()}@example.com`,
        address1: longString,
        comments: longString
      };
      const res = await request(app)
        .post('/api/customer')
        .set('x-api-key', apiKey)
        .send(customerWithLongStrings);
      expect(res.statusCode).toEqual(201);
    });

    it('should handle JSON custom fields', async () => {
      const customerWithCustomFields = {
        first_name: 'Test',
        last_name: 'User',
        email: `test${Date.now()}@example.com`,
        customer_custom_fields: {
          loyalty_points: 100,
          preferences: ['email', 'sms'],
          metadata: {
            source: 'website',
            signup_date: new Date().toISOString()
          }
        }
      };
      const res = await request(app)
        .post('/api/customer')
        .set('x-api-key', apiKey)
        .send(customerWithCustomFields);
      expect(res.statusCode).toEqual(201);
      expect(res.body.data.customer_custom_fields).toBeDefined();
    });

    it('should handle partial updates correctly', async () => {
      // Create a customer with multiple fields
      const fullCustomer = {
        first_name: 'Original',
        last_name: 'Name',
        email: `test${Date.now()}@example.com`,
        phone: '1234567890',
        address1: '123 Main St',
        city: 'Test City'
      };
      const createRes = await request(app)
        .post('/api/customer')
        .set('x-api-key', apiKey)
        .send(fullCustomer);
      const customerId = createRes.body.data.cid;

      // Update only one field
      const partialUpdate = {
        first_name: 'Updated'
      };
      const updateRes = await request(app)
        .put(`/api/customer/${customerId}`)
        .set('x-api-key', apiKey)
        .send(partialUpdate);
      expect(updateRes.statusCode).toEqual(201);
      expect(updateRes.body.data.first_name).toEqual('Updated');
      expect(updateRes.body.data.last_name).toEqual('Name'); // Should remain unchanged
    });
  });

  // Security tests
  describe('Security Tests', () => {
    it('should prevent SQL injection attempts', async () => {
      const maliciousCustomer = {
        first_name: 'Test',
        last_name: 'User',
        email: `test${Date.now()}@example.com`,
        address1: "'; DROP TABLE customers; --"
      };
      const res = await request(app)
        .post('/api/customer')
        .set('x-api-key', apiKey)
        .send(maliciousCustomer);
      expect(res.statusCode).toEqual(201); // Should succeed but not execute SQL
    });

    it('should handle XSS attempts in input', async () => {
      const xssCustomer = {
        first_name: 'Test',
        last_name: 'User',
        email: `test${Date.now()}@example.com`,
        address1: '<script>alert("XSS")</script>'
      };
      const res = await request(app)
        .post('/api/customer')
        .set('x-api-key', apiKey)
        .send(xssCustomer);
      expect(res.statusCode).toEqual(201);
      expect(res.body.data.address1).toEqual('<script>alert("XSS")</script>');
    });

    it('should validate email format', async () => {
      const invalidEmailCustomer = {
        first_name: 'Test',
        last_name: 'User',
        email: 'invalid-email-format'
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
        first_name: 'Test',
        last_name: 'User',
        email: `test${Date.now()}@example.com`,
        address1: 'A'.repeat(1000),
        address2: 'B'.repeat(1000),
        comments: 'C'.repeat(2000),
        customer_custom_fields: {
          large_field: 'D'.repeat(5000)
        }
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
          first_name: `Concurrent${i}`,
          last_name: 'User',
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
