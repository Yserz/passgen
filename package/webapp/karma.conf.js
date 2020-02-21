const path = require('path');

const dist = 'dist';
const test = 'test';

const preprocessors = {};
preprocessors['**/*.js'] = ['sourcemap'];

module.exports = function(config) {
  config.set({
    autoWatch: false,
    basePath: '',
    browserNoActivityTimeout: 20000,
    browsers: ['ChromeNoSandbox'],
    client: {
      useIframe: false,
    },
    colors: true,
    concurrency: Infinity,
    coverageIstanbulReporter: {
      dir: path.resolve('coverage/'),
      fixWebpackSourcePaths: true,
      'report-config': {
        html: {subdir: 'html'},
      },
      reports: ['html', 'lcovonly'],
      thresholds: {
        emitWarning: false,
        global: {
          branches: 1,
          functions: 1,
          lines: 1,
          statements: 1,
        },
      },
    },
    customLaunchers: {
      ChromeNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox'],
      },
    },
    files: [`${test}/main.test.js`, `${dist}/script.js`, `${dist}/test.js`],
    frameworks: ['jasmine'],
    logLevel: config.LOG_ERROR,
    port: 9877,
    preprocessors,
    reporters: ['spec', 'coverage-istanbul'],
    singleRun: true,
    specReporter: {suppressPassed: true},
  });
};
