const { defineConfig } = require('cypress');

module.exports = defineConfig({
  defaultCommandTimeout: 7000,
  screenshotOnRunFailure: false,
  video: false,
  chromeWebSecurity: false,
  experimentalFetchPolyfill: true,
  env: {
    apiBaseUrl: 'http://localhost:8080',
  },
  retries: {
    runMode: 2,
  },
  e2e: {
    excludeSpecPattern: process.env.CI ? 'cypress/e2e/all.cy.js' : [],
    baseUrl: 'http://localhost:8080',
  },
});
