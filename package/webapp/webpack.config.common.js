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
        ['apple-mobile-web-app-capable']: 'yes',
        ['apple-mobile-web-app-title']: 'PassGen',
      },
    }),
    new WebpackPwaManifest({
      name: 'PassGen',
      short_name: 'PassGen',
      description: 'Just a password generator',
      background_color: '#ffffff',
      crossorigin: 'use-credentials',
      // icons: [
      //   {
      //     src: path.resolve('src/assets/icon.png'),
      //     sizes: [96, 128, 192, 256, 384, 512],
      //   },
      //   {
      //     src: path.resolve('src/assets/large-icon.png'),
      //     size: '1024x1024',
      //   },
      //   {
      //     src: path.resolve('src/assets/maskable-icon.png'),
      //     size: '1024x1024',
      //     purpose: 'maskable',
      //   },
      // ],
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
