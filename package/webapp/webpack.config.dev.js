const commonConfig = require('./webpack.config.common');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const src = 'src/';

module.exports = Object.assign(commonConfig, {
  devServer: {
    hot: true,
    hotOnly: true,
    open: true,
    overlay: true,
  },
  devtool: 'source-map',
  entry: Object.assign(commonConfig.entry, {
    script: ['react-hot-loader/patch', path.resolve(__dirname, src, 'main.tsx')],
  }),
  mode: 'development',
  plugins: [
    ...commonConfig.plugins,
    new HtmlWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  resolve: Object.assign(commonConfig.resolve, {
    alias: Object.assign(commonConfig.resolve.alias, {
      'react-dom': '@hot-loader/react-dom',
    }),
  }),
});
