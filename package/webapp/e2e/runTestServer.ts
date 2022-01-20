import {webpack} from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
const webpackConfig = require('../webpack.config.js');

export default async function run() {
  const compiler = webpack(webpackConfig);
  const devServerOptions = {...webpackConfig.devServer, open: false, port: 9090, client: {overlay: false}};
  const server = new WebpackDevServer(devServerOptions, compiler);

  console.log('Starting server...');
  await server.start();
}
