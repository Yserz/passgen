module.exports = {
  preset: 'ts-jest',
  testRegex: `.*(test)\.[jt]sx?$`,
  testEnvironment: 'jsdom',
  moduleDirectories: ['node_modules', 'src'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
};
