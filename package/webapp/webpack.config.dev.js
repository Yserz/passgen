const commonConfig = require('./webpack.config.common');
const path = require('path');
const webpack = require('webpack');

const src = 'src/';

module.exports = {
  ...commonConfig,
  devServer: {
    hot: true,
    open: true,
  },
  devtool: 'source-map',
  entry: {...commonConfig.entry, script: ['react-hot-loader/patch', path.resolve(__dirname, src, 'main.tsx')]},
  mode: 'development',
  plugins: [...commonConfig.plugins, new webpack.HotModuleReplacementPlugin()],
  resolve: {...commonConfig.resolve, alias: {...commonConfig.resolve.alias, 'react-dom': '@hot-loader/react-dom'}},
};
