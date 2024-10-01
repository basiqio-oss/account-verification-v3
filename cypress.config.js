const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/integration/app.spec.js',
    specPattern: 'cypress/integration/**/*.js',
    setupNodeEvents(on, config) {
      // Example: require plugins if necessary
      // require('cypress-plugin-name')(on, config);
      return config; // Important: Return the config object
    },
  },
});
