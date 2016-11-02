/* eslint-disable max-len */

import webpack from 'webpack';
import validate from 'webpack-validator';
import merge from 'webpack-merge';
import baseConfig from './base';

const port = process.env.PORT || 3308;

export default validate(merge(baseConfig, {
  debug: true,
  devtool: 'cheap-module-eval-source-map',
  target: 'electron-renderer',

  entry: [
    `webpack-hot-middleware/client?path=http://localhost:${port}/__webpack_hmr`,
    'babel-polyfill',
    './app/index'
  ],

  output: {
    publicPath: `http://localhost:${port}/dist/`
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
}));

