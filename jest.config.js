
module.exports = {
  testEnvironment: 'jest-environment-jsdom',  // Set the test environment
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',  // Use babel-jest for transformation
  },
  setupFilesAfterEnv: [
    '@testing-library/jest-dom',
    '<rootDir>/jest.setup.js'
  ],  // Setup testing library
};
