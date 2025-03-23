import { defineConfig } from 'cypress';
import vitePreprocessor from 'cypress-vite';

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    setupNodeEvents(on, config) {
      on('file:preprocessor', vitePreprocessor());
      return config;
    },
  },

  e2e: {
    baseUrl: 'http://localhost:5173',
    specPattern: 'cypress/e2e/**/*.cy.{js,ts,jsx,tsx}',
    supportFile: false,
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
