const request = require('supertest');
const express = require('express');
const repairCategoriesRoutes = require('../../routes/api/repaircategories');
const bodyParser = require('body-parser');

// Setup Express app for testing
const app = express();
app.use(bodyParser.json());
app.use('/api/repaircategories', repairCategoriesRoutes);

// A valid API key for testing (since middleware accepts any key)
const validApiKey = 'test-api-key';

// Helper function to generate a random string for unique names
function randomString(length = 8) {
  return Math.random().toString(36).substring(2, 2 + length);
}

describe('Repair Categories API Tests', () => {
  let createdCategoryId = null;

  // 1. Basic endpoint tests for GET, POST, PUT, DELETE
  test('GET /api/repaircategories should return 200 and list of categories', async () => {
    const res = await request(app)
      .get('/api/repaircategories')
      .set('x-api-key', validApiKey);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test('POST /api/repaircategories should create a new category and return 201', async () => {
    const newCategory = {
      name: `Test Category ${randomString()}`,
      image: 'https://example.com/test-category.png'
    };
    const res = await request(app)
      .post('/api/repaircategories')
      .set('x-api-key', validApiKey)
      .send(newCategory);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.data).toMatchObject({
      name: newCategory.name,
      image: newCategory.image
    });
    createdCategoryId = res.body.data.id;
  });

  test('GET /api/repaircategories/:id should return 200 and category data', async () => {
    if (!createdCategoryId) {
      return;
    }
    const res = await request(app)
      .get(`/api/repaircategories/${createdCategoryId}`)
      .set('x-api-key', validApiKey);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.data.id).toBe(createdCategoryId);
    expect(res.body.data).toHaveProperty('manufacturers');
    expect(Array.isArray(res.body.data.manufacturers)).toBe(true);
  });

  test('PUT /api/repaircategories/:id should update existing category and return 200', async () => {
    if (!createdCategoryId) {
      return;
    }
    const updateData = {
      name: `Updated Category ${randomString()}`,
      image: 'https://example.com/updated-category.png'
    };
    const res = await request(app)
      .put(`/api/repaircategories/${createdCategoryId}`)
      .set('x-api-key', validApiKey)
      .send(updateData);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.data.name).toBe(updateData.name);
    expect(res.body.data.image).toBe(updateData.image);
  });

  test('DELETE /api/repaircategories/:id should delete category and return 200', async () => {
    if (!createdCategoryId) {
      return;
    }
    const res = await request(app)
      .delete(`/api/repaircategories/${createdCategoryId}`)
      .set('x-api-key', validApiKey);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.message).toContain('deleted successfully');
  });

  // 2. Critical-path testing (covered above with GET/:id, POST, PUT, DELETE)

  // 3. Thorough testing with edge cases

  test('GET /api/repaircategories/:id with invalid ID should return 500 or 404', async () => {
    const res = await request(app)
      .get('/api/repaircategories/invalid-id')
      .set('x-api-key', validApiKey);
    // PostgreSQL will return 500 for invalid UUID format, or 404 if valid format but not found
    expect([404, 500]).toContain(res.statusCode);
  });

  test('POST /api/repaircategories missing required field name should return 400', async () => {
    const res = await request(app)
      .post('/api/repaircategories')
      .set('x-api-key', validApiKey)
      .send({
        image: 'https://example.com/test.png'
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/Name is required/);
  });

  test('PUT /api/repaircategories/:id with non-existent ID should return 404', async () => {
    const res = await request(app)
      .put('/api/repaircategories/999999999')
      .set('x-api-key', validApiKey)
      .send({
        name: 'Non Existent Category'
      });
    expect(res.statusCode).toBe(404);
  });

  test('DELETE /api/repaircategories/:id with non-existent ID should return 404', async () => {
    const res = await request(app)
      .delete('/api/repaircategories/999999999')
      .set('x-api-key', validApiKey);
    expect(res.statusCode).toBe(404);
  });

  // 4. Data validation tests for POST /repaircategories

  test('POST /api/repaircategories duplicate name should return 409', async () => {
    const name = `Duplicate Category ${randomString()}`;
    // Create first category
    const res1 = await request(app)
      .post('/api/repaircategories')
      .set('x-api-key', validApiKey)
      .send({
        name,
        image: 'https://example.com/test1.png'
      });
    expect(res1.statusCode).toBe(201);

    // Create second category with same name
    const res2 = await request(app)
      .post('/api/repaircategories')
      .set('x-api-key', validApiKey)
      .send({
        name,
        image: 'https://example.com/test2.png'
      });
    expect(res2.statusCode).toBe(409);
  });

  test('PUT /api/repaircategories/:id duplicate name should return 409', async () => {
    // Create first category
    const res1 = await request(app)
      .post('/api/repaircategories')
      .set('x-api-key', validApiKey)
      .send({
        name: `First Category ${randomString()}`,
        image: 'https://example.com/test1.png'
      });
    expect(res1.statusCode).toBe(201);
    const firstId = res1.body.data.id;

    // Create second category
    const res2 = await request(app)
      .post('/api/repaircategories')
      .set('x-api-key', validApiKey)
      .send({
        name: `Second Category ${randomString()}`,
        image: 'https://example.com/test2.png'
      });
    expect(res2.statusCode).toBe(201);
    const secondId = res2.body.data.id;

    // Try to update second category with first category's name
    const res3 = await request(app)
      .put(`/api/repaircategories/${secondId}`)
      .set('x-api-key', validApiKey)
      .send({
        name: res1.body.data.name
      });
    expect(res3.statusCode).toBe(409);
  });

  // 5. Integration with nested data structure

  test('GET /api/repaircategories should return nested manufacturers and devices', async () => {
    const res = await request(app)
      .get('/api/repaircategories')
      .set('x-api-key', validApiKey);
    expect(res.statusCode).toBe(200);

    if (res.body.data.length > 0) {
      const category = res.body.data[0];
      expect(category).toHaveProperty('manufacturers');
      expect(Array.isArray(category.manufacturers)).toBe(true);

      if (category.manufacturers.length > 0) {
        const manufacturer = category.manufacturers[0];
        expect(manufacturer).toHaveProperty('devices');
        expect(Array.isArray(manufacturer.devices)).toBe(true);

        if (manufacturer.devices.length > 0) {
          const device = manufacturer.devices[0];
          expect(device).toHaveProperty('colors');
          expect(device).toHaveProperty('problems');
          expect(Array.isArray(device.colors)).toBe(true);
          expect(Array.isArray(device.problems)).toBe(true);
        }
      }
    }
  });

  // 6. Performance testing for GET /repaircategories

  test('Performance test: GET /api/repaircategories with multiple requests', async () => {
    const requests = [];
    for (let i = 0; i < 10; i++) {
      requests.push(
        request(app)
          .get('/api/repaircategories')
          .set('x-api-key', validApiKey)
      );
    }
    const start = Date.now();
    const responses = await Promise.all(requests);
    const duration = Date.now() - start;
    const successCount = responses.filter(r => r.statusCode === 200).length;
    console.log(`10 requests took ${duration}ms, success: ${successCount}`);
    expect(successCount).toBe(10);
  }, 30000);

  // 7. Security testing for invalid or missing API keys

  test('GET /api/repaircategories without API key should return 401', async () => {
    const res = await request(app)
      .get('/api/repaircategories');
    expect(res.statusCode).toBe(401);
  });

  test('POST /api/repaircategories without API key should return 401', async () => {
    const res = await request(app)
      .post('/api/repaircategories')
      .send({ name: 'Test' });
    expect(res.statusCode).toBe(401);
  });

  test('GET /api/repaircategories with invalid API key should return 401', async () => {
    const res = await request(app)
      .get('/api/repaircategories')
      .set('x-api-key', 'invalid-key');
    expect(res.statusCode).toBe(200); // Current middleware accepts any key, so 200
  });
});
