const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

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
    new FaviconsWebpackPlugin({
      logo: './img/logo_1024.png',
      devMode: 'webapp',
      favicons: {
        // https://github.com/itgalaxy/favicons#usage
        appName: 'PassGen - Simple password generator',
        appShortName: 'PassGen',
        appDescription: 'Simple password generator',
        developerName: null,
        developerURL: null,
        lang: 'en-US',
        background: '#fff',
        theme_color: '#fff',
        appleStatusBarStyle: 'default', // "black-translucent", "default", "black"
        display: 'standalone', // "fullscreen", "standalone", "minimal-ui" or "browser"
        orientation: 'any', // "any", "natural", "portrait" or "landscape"
        scope: '/',
        logging: false,
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          windows: true,
          yandex: false,
        },
      },
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
