const webpack = require('webpack');
const commonConfig = require('./webpack.config.common');
const TerserJSPlugin = require('terser-webpack-plugin');

module.exports = {
  ...commonConfig,
  mode: 'production',
  optimization: {
    ...commonConfig.optimization,
    minimizer: [new TerserJSPlugin()],
  },
  plugins: [
    ...commonConfig.plugins,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
};
