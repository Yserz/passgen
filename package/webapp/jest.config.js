module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  snapshotSerializers: ['@emotion/jest/serializer'],
  moduleDirectories: ['node_modules', 'src'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
};
