// Global test setup - Mock database for tests
const mockPool = {
  connect: jest.fn(() => ({
    query: jest.fn(() => Promise.resolve({ rows: [] })),
    release: jest.fn(),
  })),
  query: jest.fn(() => Promise.resolve({ rows: [] })),
  end: jest.fn(() => Promise.resolve()),
};

// Mock the pg module
jest.mock('pg', () => ({
  Pool: jest.fn(() => mockPool),
}));

// Setup function to run before tests - now just sets up mocks
async function setupTestDatabase() {
  // Reset all mocks
  mockPool.connect.mockClear();
  mockPool.query.mockClear();
  mockPool.end.mockClear();

  // Set up default mock responses with some test data
  const mockClient = {
    query: jest.fn(),
    release: jest.fn(),
  };

  // Mock category query
  mockClient.query.mockImplementation((query) => {
    if (query.includes('SELECT id FROM categories WHERE slug = \'test-category\'')) {
      return Promise.resolve({ rows: [{ id: 1 }] });
    }
    if (query.includes('SELECT id FROM products WHERE slug = \'test-product\'')) {
      return Promise.resolve({ rows: [{ id: 1 }] });
    }
    return Promise.resolve({ rows: [] });
  });

  mockPool.connect.mockResolvedValue(mockClient);
  mockPool.query.mockImplementation((query) => {
    if (query.includes('SELECT id FROM categories WHERE slug = \'test-category\'')) {
      return Promise.resolve({ rows: [{ id: 1 }] });
    }
    if (query.includes('SELECT id FROM products WHERE slug = \'test-product\'')) {
      return Promise.resolve({ rows: [{ id: 1 }] });
    }
    return Promise.resolve({ rows: [] });
  });

  // // console.log('Test database mocks setup complete');
}

// Teardown function to run after tests
async function teardownTestDatabase() {
  // Clean up mocks
  mockPool.end.mockResolvedValue();
  // // console.log('Test database mocks cleaned up');
}

// Export setup and teardown functions
module.exports = {
  setupTestDatabase,
  teardownTestDatabase,
  pool: mockPool
};
