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
  server.listen(3002);
});

afterAll(async () => {
  server.close();
});

const request = require('supertest');

describe('Appointment Repair Types API Tests', () => {
  const validApiKey = 'dummy-api-key';

  test('GET /api/appointment/repairtypes should return 200 and list of repair types', async () => {
    const res = await request(server)
      .get('/api/appointment/repairtypes')
      .query({ api_key: validApiKey });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('statusCode', 200);
    expect(res.body).toHaveProperty('message', 'OK');
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);

    // Check structure of repair types data
    const repairTypes = res.body.data[0];
    expect(Array.isArray(repairTypes)).toBe(true);

    if (repairTypes.length > 0) {
      const firstType = repairTypes[0];
      expect(firstType).toHaveProperty('id');
      expect(firstType).toHaveProperty('name');
      expect(typeof firstType.id).toBe('number');
      expect(typeof firstType.name).toBe('string');
    }
  });

  test('GET /api/appointment/repairtypes without API key should return 401', async () => {
    const res = await request(server)
      .get('/api/appointment/repairtypes');

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('statusCode', 401);
    expect(res.body).toHaveProperty('message', 'Unauthorized');
    expect(res.body.data).toHaveProperty('name', 'Unauthorized');
    expect(res.body.data).toHaveProperty('message', 'Your request was made with invalid credentials.');
    expect(res.body.data).toHaveProperty('code', 0);
    expect(res.body.data).toHaveProperty('status', 401);
  });

  test('GET /api/appointment/repairtypes with invalid API key should return 401', async () => {
    const res = await request(server)
      .get('/api/appointment/repairtypes')
      .query({ api_key: 'invalid-key' });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('statusCode', 401);
    expect(res.body).toHaveProperty('message', 'Unauthorized');
  });

  test('POST /api/appointment/repairtypes should return 405 Method Not Allowed', async () => {
    const res = await request(server)
      .post('/api/appointment/repairtypes')
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

  test('PUT /api/appointment/repairtypes should return 405 Method Not Allowed', async () => {
    const res = await request(server)
      .put('/api/appointment/repairtypes')
      .query({ api_key: validApiKey });

    expect(res.statusCode).toBe(405);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('statusCode', 405);
    expect(res.body).toHaveProperty('message', 'Method Not Allowed');
  });

  test('DELETE /api/appointment/repairtypes should return 405 Method Not Allowed', async () => {
    const res = await request(server)
      .delete('/api/appointment/repairtypes')
      .query({ api_key: validApiKey });

    expect(res.statusCode).toBe(405);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('statusCode', 405);
    expect(res.body).toHaveProperty('message', 'Method Not Allowed');
  });

  test('GET /api/appointment/repairtypes should return repair types with correct data types', async () => {
    const res = await request(server)
      .get('/api/appointment/repairtypes')
      .query({ api_key: validApiKey });

    expect(res.statusCode).toBe(200);

    const repairTypes = res.body.data[0];
    repairTypes.forEach(type => {
      expect(typeof type.id).toBe('number');
      expect(typeof type.name).toBe('string');
    });
  });

  test('GET /api/appointment/repairtypes should handle database errors gracefully', async () => {
    // This test assumes the database connection might fail
    // In a real scenario, you might mock the database to simulate failures
    const res = await request(server)
      .get('/api/appointment/repairtypes')
      .query({ api_key: validApiKey });

    // Either succeeds or returns 500 on database error
    expect([200, 500]).toContain(res.statusCode);

    if (res.statusCode === 500) {
      expect(res.body).toHaveProperty('success', false);
      expect(res.body).toHaveProperty('statusCode', 500);
      expect(res.body).toHaveProperty('message', 'Failed to fetch repair types');
    }
  });
});
