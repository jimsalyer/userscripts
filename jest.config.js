module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  resetMocks: true,
  resetModules: true,
  restoreMocks: true,
  testEnvironment: 'jsdom',
};
