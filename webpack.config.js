const path = require('path'); // 处理路径
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const maps = require('./map.js');
const dist = path.resolve(__dirname, './disc');
const view = path.resolve(__dirname, './view');
let plugin = [];
for (let map in maps) {
  plugin.push( new HtmlWebpackPlugin ({
    template: view+'/'+map+'/index.html',
    filename: map+'/index.html',
    inject: 'body',
    chunks: [map],
    hash: true,
    minify: {
        collapseWhitespace: true
    }
  }))
} 
const hotModule = new webpack.HotModuleReplacementPlugin();
plugin.push(hotModule);
module.exports = {
  entry: maps,
  output: {
    filename: "[name]/[name].js",
    path: dist+'/'
  },
  loader: {
    rules: [
      {
        test: /\.css$/,
        use: ['css-loader','style-loader']
      },
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ["es2015"]
          }
        }]
      },
      {
        test: /\.js$/,
        use: ['babel-loader','eslint-loader'],
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
        contentBase: path.resolve(__dirname,'.disc')
        historyApiFallback: true,
        port: 2345,
        inline: true,
        hot: true
    },
  plugins: plugin
}