const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require('./package');

module.exports = {
  devServer: {
    hot: true,
    hotOnly: true,
    open: true,
    overlay: true,
  },
  devtool: 'source-map',
  entry: {
    bundle: ['react-hot-loader/patch', path.resolve('src', 'index.tsx')],
  },
  mode: 'development',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        test: /\.[tj]sx?$/,
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: pkg.title,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};
