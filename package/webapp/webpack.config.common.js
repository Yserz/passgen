const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

const dist = path.resolve(__dirname, 'dist/');
const src = path.resolve(__dirname, 'src/');

module.exports = {
  devtool: 'source-map',
  entry: {
    script: path.resolve(src, 'main.tsx'),
  },
  externals: {
    'fs-extra': '{}',
  },
  mode: 'production',
  module: {
    rules: [
      {
        exclude: [/node_modules/],
        test: /\.[tj]sx?$/,
        use: [
          {
            loader: `babel-loader`,
          },
        ],
      },
      {
        loader: 'svg-inline-loader?removeSVGTagAttrs=false',
        test: /\.svg$/,
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(dist),
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'PassGen',
      meta: {
        viewport: 'width=device-width, initial-scale=1.0, user-scalable=no',
        description: 'A simple password generator',
      },
    }),
    new WebpackPwaManifest({
      name: 'PassGen',
      short_name: 'PassGen',
      description: 'Just a password generator',
      background_color: '#ffffff',
      ios: true,
      icons: [
        {
          src: path.resolve('img/logo_512.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          ios: true,
        },
        {
          src: path.resolve('img/logo_1024.png'),
          size: 1024,
          ios: 'startup',
        },
      ],
    }),
    new WorkboxPlugin.InjectManifest({
      swDest: 'service-worker.js',
      swSrc: path.resolve(src, 'service-worker.js'),
      maximumFileSizeToCacheInBytes: process.env.NODE_ENV !== 'production' ? 5000000 : undefined,
    }),
  ],
  resolve: {
    alias: {
      resource: path.resolve('resource'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.svg'],
    modules: [path.resolve(src), 'node_modules'],
  },
};
