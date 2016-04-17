var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var baseConfig = require('./webpack.base.conf');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 为 entry chunks 添加 hot-reload
Object.keys(baseConfig.entry).forEach(function (name) {
  baseConfig.entry[name] = ['./src/server/dev-client'].concat(baseConfig.entry[name]);
});

module.exports = merge(baseConfig, {
  // eval-source-map dev环境下编译更快
  devtool: '#eval-source-map',
  output: {
    // necessary for the html plugin to work properly
    // when serving the html from in-memory
    publicPath: '/'
  },
  plugins: [
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../index.html'),
      inject: true
    })
  ]
});
