const webpack = require('webpack');
const path = require('path');
const nib = require('nib');
const stylus = require('stylus');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  watch: true,
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
        presets: ['es2015', 'stage-1']
        }
      },
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre"
      },
      {
        test: /\.styl$/,
        use: [
          nib(),
          'style-loader',
          'css-loader',
          'stylus-loader'
        ]
      }
    ],

  }

};
