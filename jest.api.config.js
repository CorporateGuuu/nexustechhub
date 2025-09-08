module.exports = {
  testEnvironment: 'node',
  testMatch: [
    '**/tests/**/*.test.js',
    '!**/node_modules/**'
  ],
  collectCoverage: false, // Disable coverage for API tests
  testTimeout: 15000,
  setupFilesAfterEnv: ['<rootDir>/jest.api.setup.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }]
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(next-auth|@next|next|jose|openid-client|oauth|uuid|cloudinary|@cloudinary)/)'
  ],
  moduleNameMapper: {
    // Handle CSS imports (with CSS modules)
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    // Handle CSS imports (without CSS modules)
    '^.+\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // Handle image imports
    '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': '<rootDir>/__mocks__/fileMock.js'
  }
};
