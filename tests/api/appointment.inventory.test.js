const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

let server;

beforeAll(async () => {
  await app.prepare();
  server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });
  server.listen(3003);
});

afterAll(async () => {
  server.close();
});

const request = require('supertest');

describe('Appointment Inventory API Tests', () => {
  const validApiKey = 'dummy-api-key';

  test('GET /api/appointment/inventory should return 200 and nested inventory data', async () => {
    const res = await request(server)
      .get('/api/appointment/inventory')
      .query({ api_key: validApiKey });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('statusCode', 200);
    expect(res.body).toHaveProperty('message', 'OK');
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);

    // Check nested structure
    const inventory = res.body.data[0];
    expect(Array.isArray(inventory)).toBe(true);
    expect(inventory.length).toBeGreaterThan(0);

    // Check manufacturer structure
    const firstManufacturer = inventory[0].manufacturer;
    expect(firstManufacturer).toHaveProperty('id');
    expect(firstManufacturer).toHaveProperty('name');
    expect(firstManufacturer).toHaveProperty('devices');
    expect(Array.isArray(firstManufacturer.devices)).toBe(true);

    // Check device structure
    const firstDevice = firstManufacturer.devices[0];
    expect(firstDevice).toHaveProperty('id');
    expect(firstDevice).toHaveProperty('name');
    expect(firstDevice).toHaveProperty('problems');
    expect(Array.isArray(firstDevice.problems)).toBe(true);

    // Check problem structure
    const firstProblem = firstDevice.problems[0];
    expect(firstProblem).toHaveProperty('id');
    expect(firstProblem).toHaveProperty('name');
    expect(firstProblem).toHaveProperty('price');
    expect(firstProblem).toHaveProperty('estimatedTime');
    expect(typeof firstProblem.price).toBe('number');
    expect(typeof firstProblem.estimatedTime).toBe('string');
  });

  test('GET /api/appointment/inventory without API key should return 401', async () => {
    const res = await request(server)
      .get('/api/appointment/inventory');

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('statusCode', 401);
    expect(res.body).toHaveProperty('message', 'Unauthorized');
    expect(res.body.data).toHaveProperty('name', 'Unauthorized');
    expect(res.body.data).toHaveProperty('message', 'Your request was made with invalid credentials.');
    expect(res.body.data).toHaveProperty('code', 0);
    expect(res.body.data).toHaveProperty('status', 401);
  });

  test('GET /api/appointment/inventory with invalid API key should return 401', async () => {
    const res = await request(server)
      .get('/api/appointment/inventory')
      .query({ api_key: 'invalid-key' });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('statusCode', 401);
    expect(res.body).toHaveProperty('message', 'Unauthorized');
  });

  test('POST /api/appointment/inventory should return 405 Method Not Allowed', async () => {
    const res = await request(server)
      .post('/api/appointment/inventory')
      .query({ api_key: validApiKey });

    expect(res.statusCode).toBe(405);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('statusCode', 405);
    expect(res.body).toHaveProperty('message', 'Method Not Allowed');
    expect(res.body.data).toHaveProperty('name', 'MethodNotAllowed');
    expect(res.body.data).toHaveProperty('message', 'Only GET method is allowed.');
    expect(res.body.data).toHaveProperty('code', 0);
    expect(res.body.data).toHaveProperty('status', 405);
  });

  test('PUT /api/appointment/inventory should return 405 Method Not Allowed', async () => {
    const res = await request(server)
      .put('/api/appointment/inventory')
      .query({ api_key: validApiKey });

    expect(res.statusCode).toBe(405);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('statusCode', 405);
    expect(res.body).toHaveProperty('message', 'Method Not Allowed');
  });

  test('DELETE /api/appointment/inventory should return 405 Method Not Allowed', async () => {
    const res = await request(server)
      .delete('/api/appointment/inventory')
      .query({ api_key: validApiKey });

    expect(res.statusCode).toBe(405);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('statusCode', 405);
    expect(res.body).toHaveProperty('message', 'Method Not Allowed');
  });

  test('GET /api/appointment/inventory should return manufacturers with correct data types', async () => {
    const res = await request(server)
      .get('/api/appointment/inventory')
      .query({ api_key: validApiKey });

    expect(res.statusCode).toBe(200);

    const inventory = res.body.data[0];
    inventory.forEach(item => {
      const manufacturer = item.manufacturer;
      expect(typeof manufacturer.id).toBe('string');
      expect(typeof manufacturer.name).toBe('string');
      expect(Array.isArray(manufacturer.devices)).toBe(true);

      manufacturer.devices.forEach(device => {
        expect(typeof device.id).toBe('string');
        expect(typeof device.name).toBe('string');
        expect(Array.isArray(device.problems)).toBe(true);

        device.problems.forEach(problem => {
          expect(typeof problem.id).toBe('string');
          expect(typeof problem.name).toBe('string');
          expect(typeof problem.price).toBe('number');
          expect(typeof problem.estimatedTime).toBe('string');
        });
      });
    });
  });

  test('GET /api/appointment/inventory should return at least 2 manufacturers', async () => {
    const res = await request(server)
      .get('/api/appointment/inventory')
      .query({ api_key: validApiKey });

    expect(res.statusCode).toBe(200);
    expect(res.body.data[0].length).toBeGreaterThanOrEqual(2);
  });

  test('GET /api/appointment/inventory should return devices with problems', async () => {
    const res = await request(server)
      .get('/api/appointment/inventory')
      .query({ api_key: validApiKey });

    expect(res.statusCode).toBe(200);

    const inventory = res.body.data[0];
    inventory.forEach(item => {
      const manufacturer = item.manufacturer;
      manufacturer.devices.forEach(device => {
        expect(device.problems.length).toBeGreaterThan(0);
        device.problems.forEach(problem => {
          expect(problem.price).toBeGreaterThan(0);
        });
      });
    });
  });
});
