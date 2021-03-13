const webpack = require('webpack');
const path = require('path');

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  watchOptions: {
    aggregateTimeout: 200,
    poll: 1000,
  }
};

module.exports = config;
