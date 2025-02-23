module.exports = {
  testEnvironment: 'jest-environment-jsdom',  // Set the test environment
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',  // Use babel-jest for transformation
  },
  moduleNameMapper: {
    // Handle CSS Modules
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

    // Mock regular CSS imports
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',

    // Mock static assets (e.g., images)
    '^.+\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],  // Recognize .tsx files
  setupFiles: ['<rootDir>/jest.setup.js'],  // Add setupFiles for global polyfills
  setupFilesAfterEnv: ['@testing-library/jest-dom'],  // Setup testing library
};
