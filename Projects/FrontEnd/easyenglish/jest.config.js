/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {},
  setupFilesAfterEnv: ['./src/tests/setupMsw.ts'],
  "moduleNameMapper": {
    "\\.(css|less)$": '<rootDir>/src/tests/styleMock.js'
  },
};