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
  server.listen(3001);
});

afterAll(async () => {
  server.close();
});

const request = require('supertest');

describe('Appointment Locations API Tests', () => {
  const validApiKey = 'dummy-api-key';

  test('GET /api/appointment/locations should return 200 and list of stores', async () => {
    const res = await request(server)
      .get('/api/appointment/locations')
      .query({ api_key: validApiKey });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('statusCode', 200);
    expect(res.body).toHaveProperty('message', 'OK');
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);

    // Check structure of first store
    const firstStore = res.body.data[0];
    expect(firstStore).toHaveProperty('id');
    expect(firstStore).toHaveProperty('name');
    expect(firstStore).toHaveProperty('alternateName');
    expect(firstStore).toHaveProperty('api_key');
    expect(firstStore).toHaveProperty('latitude');
    expect(firstStore).toHaveProperty('longitude');
    expect(firstStore).toHaveProperty('mobile');
    expect(firstStore).toHaveProperty('phone');
    expect(firstStore).toHaveProperty('email');
    expect(firstStore).toHaveProperty('address');
    expect(firstStore).toHaveProperty('postcode');
    expect(firstStore).toHaveProperty('city');
    expect(firstStore).toHaveProperty('state');
    expect(firstStore).toHaveProperty('country');
  });

  test('GET /api/appointment/locations without API key should return 401', async () => {
    const res = await request(server)
      .get('/api/appointment/locations');

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('statusCode', 401);
    expect(res.body).toHaveProperty('message', 'Unauthorized');
    expect(res.body.data).toHaveProperty('name', 'Unauthorized');
    expect(res.body.data).toHaveProperty('message', 'Your request was made with invalid credentials.');
    expect(res.body.data).toHaveProperty('code', 0);
    expect(res.body.data).toHaveProperty('status', 401);
  });

  test('GET /api/appointment/locations with invalid API key should return 401', async () => {
    const res = await request(server)
      .get('/api/appointment/locations')
      .query({ api_key: 'invalid-key' });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('statusCode', 401);
    expect(res.body).toHaveProperty('message', 'Unauthorized');
  });

  test('POST /api/appointment/locations should return 405 Method Not Allowed', async () => {
    const res = await request(server)
      .post('/api/appointment/locations')
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

  test('PUT /api/appointment/locations should return 405 Method Not Allowed', async () => {
    const res = await request(server)
      .put('/api/appointment/locations')
      .query({ api_key: validApiKey });

    expect(res.statusCode).toBe(405);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('statusCode', 405);
    expect(res.body).toHaveProperty('message', 'Method Not Allowed');
  });

  test('DELETE /api/appointment/locations should return 405 Method Not Allowed', async () => {
    const res = await request(server)
      .delete('/api/appointment/locations')
      .query({ api_key: validApiKey });

    expect(res.statusCode).toBe(405);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('statusCode', 405);
    expect(res.body).toHaveProperty('message', 'Method Not Allowed');
  });

  test('GET /api/appointment/locations should return stores with correct data types', async () => {
    const res = await request(server)
      .get('/api/appointment/locations')
      .query({ api_key: validApiKey });

    expect(res.statusCode).toBe(200);

    const stores = res.body.data[0]; // Array of stores
    stores.forEach(store => {
      expect(typeof store.id).toBe('string');
      expect(typeof store.name).toBe('string');
      expect(typeof store.latitude).toBe('string');
      expect(typeof store.longitude).toBe('string');
      expect(typeof store.mobile).toBe('string');
      expect(typeof store.phone).toBe('string');
      expect(typeof store.email).toBe('string');
      expect(typeof store.address).toBe('string');
      expect(typeof store.postcode).toBe('string');
      expect(typeof store.city).toBe('string');
      expect(typeof store.state).toBe('string');
      expect(typeof store.country).toBe('string');
    });
  });

  test('GET /api/appointment/locations should return at least 3 stores', async () => {
    const res = await request(server)
      .get('/api/appointment/locations')
      .query({ api_key: validApiKey });

    expect(res.statusCode).toBe(200);
    expect(res.body.data[0].length).toBeGreaterThanOrEqual(3);
  });
});
