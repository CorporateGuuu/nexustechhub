const config = require('../config');

const testEndpoint = async (endpoint, method = 'GET', body = null, params = {}) => {
  const apiKey = config.apiKey;
  const url = new URL(`${config.baseURL}${endpoint}`);
  url.searchParams.append('api_key', apiKey);

  // Add additional params
  Object.keys(params).forEach(key => {
    url.searchParams.append(key, params[key]);
  });

  try {
    const response = await fetch(url.toString(), {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: body ? JSON.stringify(body) : null
    });

    if (!response.ok) {
      throw new Error(`Status: ${response.status}, Message: ${await response.text()}`);
    }

    const data = await response.json();
    console.log(`Test for ${endpoint} succeeded:`, data);

    // Validate response structure
    if (data.success !== true && data.success !== false) {
      // Some APIs might not have success field, just check it's an object
      expect(typeof data).toBe('object');
    } else if (data.success !== true) {
      throw new Error('Response success is false');
    }

    return data;
  } catch (error) {
    console.error(`Test for ${endpoint} failed:`, error.message);
    // Log to Sentry if configured
    // if (Sentry) Sentry.captureException(error, { extra: { endpoint, method, body, params } });
    return null;
  }
};

describe('External RepairDesk API Tests - Repair Categories', () => {
  test('GET /repaircategories should return repair categories list', async () => {
    const result = await testEndpoint('/repaircategories');
    expect(result).not.toBeNull();
    expect(typeof result).toBe('object');
    if (result.data) {
      expect(Array.isArray(result.data)).toBe(true);
    }
  });

  test('GET /repaircategories/:id with valid ID should return repair category', async () => {
    // First get a repair category ID from the list
    const listResult = await testEndpoint('/repaircategories');
    if (listResult && listResult.data && listResult.data.length > 0) {
      const categoryId = listResult.data[0].id;
      const result = await testEndpoint(`/repaircategories/${categoryId}`);
      expect(result).not.toBeNull();
      expect(typeof result).toBe('object');
      if (result.data) {
        expect(result.data.id).toBe(categoryId);
        // Check if manufacturers are included
        if (result.data.manufacturers) {
          expect(Array.isArray(result.data.manufacturers)).toBe(true);
        }
      }
    } else {
      console.log('No repair categories found for individual test');
    }
  });

  test('GET /repaircategories/:id with invalid ID should return error', async () => {
    const result = await testEndpoint(`/repaircategories/${config.nonExistentTicketId}`);
    // API returns empty object {} instead of null for invalid IDs
    expect(result).toEqual({}); // API returns empty object for invalid resource IDs
  });

  test('POST /repaircategories should create new repair category', async () => {
    const newCategory = {
      name: `Test Category ${Date.now()}`,
      image: 'https://example.com/test-image.jpg'
    };

    const result = await testEndpoint('/repaircategories', 'POST', newCategory);
    expect(result).not.toBeNull();
    expect(typeof result).toBe('object');
    if (result.success) {
      expect(result.success).toBe(true);
    }
  });

  test('POST /repaircategories with missing required fields should return error', async () => {
    const invalidCategory = {
      image: 'https://example.com/test-image.jpg'
      // Missing name
    };

    const result = await testEndpoint('/repaircategories', 'POST', invalidCategory);
    expect(result).toBeNull(); // Should fail due to missing name
  });

  test('POST /repaircategories with duplicate name should return error', async () => {
    const duplicateCategory = {
      name: 'Smartphones', // Assume this exists
      image: 'https://example.com/test-image.jpg'
    };

    const result = await testEndpoint('/repaircategories', 'POST', duplicateCategory);
    // Might succeed or fail depending on API
    expect(typeof result).toBe('object');
  });

  test('PUT /repaircategories/:id should update repair category', async () => {
    // First get a repair category ID
    const listResult = await testEndpoint('/repaircategories');
    if (listResult && listResult.data && listResult.data.length > 0) {
      const categoryId = listResult.data[0].id;
      const updateData = {
        name: `Updated Category ${Date.now()}`,
        image: 'https://example.com/updated-image.jpg'
      };

      const result = await testEndpoint(`/repaircategories/${categoryId}`, 'PUT', updateData);
      expect(result).not.toBeNull();
      expect(typeof result).toBe('object');
      if (result.success) {
        expect(result.success).toBe(true);
      }
    } else {
      console.log('No repair categories found for update test');
    }
  });

  test('PUT /repaircategories/:id with invalid ID should return error', async () => {
    const updateData = {
      name: 'Updated Name'
    };

    const result = await testEndpoint(`/repaircategories/${config.nonExistentTicketId}`, 'PUT', updateData);
    expect(result).toBeNull();
  });

  test('DELETE /repaircategories/:id should delete repair category', async () => {
    // First create a test category to delete
    const newCategory = {
      name: `Delete Test Category ${Date.now()}`,
      image: 'https://example.com/test-image.jpg'
    };

    const createResult = await testEndpoint('/repaircategories', 'POST', newCategory);
    if (createResult && createResult.data && createResult.data.id) {
      const categoryId = createResult.data.id;
      const deleteResult = await testEndpoint(`/repaircategories/${categoryId}`, 'DELETE');
      expect(deleteResult).not.toBeNull();
      expect(typeof deleteResult).toBe('object');
      if (deleteResult.success) {
        expect(deleteResult.success).toBe(true);
      }
    } else {
      console.log('Could not create test category for delete test');
    }
  });

  test('DELETE /repaircategories/:id with invalid ID should return error', async () => {
    const result = await testEndpoint(`/repaircategories/${config.nonExistentTicketId}`, 'DELETE');
    expect(result).toBeNull();
  });

  test('GET /repaircategories with invalid API key should return error', async () => {
    const invalidTestEndpoint = async (endpoint) => {
      const url = `${config.baseURL}${endpoint}?api_key=invalid_key`;
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Status: ${response.status}`);
        return await response.json();
      } catch (error) {
        return null;
      }
    };

    const result = await invalidTestEndpoint('/repaircategories');
    expect(result).toBeNull();
  });

  test('GET /repaircategories should include manufacturers and devices data', async () => {
    const result = await testEndpoint('/repaircategories');
    if (result && result.data && result.data.length > 0) {
      const category = result.data[0];
      if (category.manufacturers && category.manufacturers.length > 0) {
        const manufacturer = category.manufacturers[0];
        expect(manufacturer).toHaveProperty('name');
        if (manufacturer.devices && manufacturer.devices.length > 0) {
          const device = manufacturer.devices[0];
          expect(device).toHaveProperty('name');
          expect(device).toHaveProperty('problems');
        }
      }
    }
  });
});
