const path = require('path');
const pkg = require('./package');
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
      template: 'template/index.ejs',
      title: 'PassGen',
      favicon: './img/logo_192.png',
      meta: {
        viewport: 'width=device-width, initial-scale=1.0, user-scalable=no',
        description: 'A simple password generator',
      },
    }),
    new WebpackPwaManifest({
      name: 'PassGen - Simple password generator',
      short_name: 'PassGen',
      description: 'Just a password generator',
      background_color: '#fff',
      ios: true,
      lang: 'en-US',
      version: pkg.version,
      theme_color: '#fff',
      icons: [
        {
          src: path.resolve('img/logo_1024.png'),
          sizes: [57, 60, 72, 76, 114, 120, 144, 152, 167, 180, 1024],
          ios: false,
        },
        {
          src: path.resolve('img/logo_ios_1024.png'),
          sizes: [57, 60, 72, 76, 114, 120, 144, 152, 167, 180, 1024],
          ios: true,
          purpose: 'maskable',
        },
        {
          src: path.resolve('img/logo_1024.png'),
          size: [
            '640x1136',
            '750x1334',
            '828x1792',
            '1125x2436',
            '1242x2208',
            '1242x2688',
            '1536x2048',
            '1668x2224',
            '1668x2388',
            '2048x2732',
            '1620x2160',
            // landscape
            // '1136x640',
            // '1334x750',
            // '1792x828',
            // '2436x1125',
            // '2208x1242',
            // '2688x1242',
            // '2048x1536',
            // '2224x1668',
            // '2388x1668',
            // '2732x2048',
            // '2160x1620',
          ],
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
