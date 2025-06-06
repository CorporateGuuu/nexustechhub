module.exports = {
  testEnvironment: 'jsdom',
  testMatch: [
    '**/__tests__/**/*.js',
    '**/?(*.)+(spec|test).js',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/cypress/**',
    '!**/tests/e2e.test.js' // Exclude Cypress tests from Jest
  ],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'components/**/*.{js,jsx,ts,tsx}',
    'pages/**/*.{js,jsx,ts,tsx}',
    'routes/**/*.js',
    'middleware/**/*.js',
    'utils/**/*.js',
    'hooks/**/*.{js,jsx,ts,tsx}',
    'context/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/coverage/**',
    '!**/vendor/**',
    '!jest.config.js',
    '!next.config.js',
    '!pages/api/**', // Exclude API routes from coverage
    '!pages/_app.js',
    '!pages/_document.js'
  ],
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
  testTimeout: 15000,
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }]
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(next-auth|@next|next|jose|openid-client|oauth|uuid)/)'
  ],
  moduleNameMapper: {
    // Handle module aliases
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
    '^@/styles/(.*)$': '<rootDir>/styles/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
    '^@/utils/(.*)$': '<rootDir>/utils/$1',
    '^@/hooks/(.*)$': '<rootDir>/hooks/$1',
    '^@/context/(.*)$': '<rootDir>/context/$1',
    // Handle CSS imports (with CSS modules)
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    // Handle CSS imports (without CSS modules)
    '^.+\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // Handle image imports
    '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': '<rootDir>/__mocks__/fileMock.js'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ],
  globals: {
    'ts-jest': {
      tsconfig: {
        jsx: 'react-jsx'
      }
    }
  },
  testEnvironmentOptions: {
    customExportConditions: ['']
  }
};
