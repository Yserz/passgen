const path = require('path');
const commonConfig = require('./webpack.config.common');
const prodConfig = require('./webpack.config.prod');
const webpack = require('webpack');

const src = 'src';

module.exports = Object.assign({}, prodConfig, {
  devtool: 'inline-source-map',
  entry: Object.assign(prodConfig.entry, {
    test: path.resolve(__dirname, src, 'index.test.ts'),
  }),
  externals: Object.assign(prodConfig.externals, {
    cheerio: 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  }),
  mode: 'development',
  plugins: [
    ...commonConfig.plugins,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('test'),
      },
    }),
  ],
});
