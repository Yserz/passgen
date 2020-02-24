const debug = false;
const modules = false;

const SUPPORTED_BROWSERS = {
  android: 5,
  chrome: 57,
  firefox: 45,
  ios: 9,
  msedge: 12,
  safari: 9,
};

const testAttributeRegex = '^data-uie-*';

module.exports = {
  env: {
    production: {
      plugins: [['babel-plugin-remove-jsx-attributes', {patterns: [testAttributeRegex]}]],
    },
  },
  plugins: ['@babel/plugin-proposal-class-properties'],
  presets: [
    '@babel/preset-react',
    '@babel/preset-typescript',
    '@emotion/babel-preset-css-prop',
    [
      '@babel/preset-env',
      {
        corejs: 'core-js@3',
        debug,
        modules,
        targets: {
          browsers: [
            `chrome >= ${SUPPORTED_BROWSERS.chrome}`,
            `firefox >= ${SUPPORTED_BROWSERS.firefox}`,
            `safari >= ${SUPPORTED_BROWSERS.safari}`,
            `edge >= ${SUPPORTED_BROWSERS.msedge}`,
            `ios >= ${SUPPORTED_BROWSERS.ios}`,
            `android >= ${SUPPORTED_BROWSERS.android}`,
          ],
        },
        useBuiltIns: 'entry',
      },
    ],
  ],
};
