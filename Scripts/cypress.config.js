const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'ajevgp',
  e2e: {
    baseUrl: 'http://localhost:3006',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
    viewportWidth: 1280,
    viewportHeight: 720,
  },
});
