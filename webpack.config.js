const path = require('path'); // 处理路径
const webpack = require('webpack');
const src =  path.resolve(__dirname, './src');
const dist = path.resolve(__dirname, './disc');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: {
    app: src+"/app.js"
  },
  output: {
    filename: 'bundle.js',
    path: dist+"/assets"
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
        historyApiFallback: true,
        port: 2345,
        inline: true,
        hot: true
    },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  //   new HtmlWebpackPlugin({
  //   template: './view/nuomi/index1.html',
  //   inject: 'body',
  //   hash: true,
  //   minify: {
  //       collapseWhitespace: true
  //   }
  //   }),
  //   new HtmlWebpackPlugin({
  //   template: './view/nuomi/index2.html',
  //   inject: 'body',
  //   hash: true,
  //   minify: {
  //       collapseWhitespace: true
  //   }
  // }),
    new HtmlWebpackPlugin({
    template: './index.html',
    inject: 'body',
    hash: true,
    minify: {
        collapseWhitespace: true
    }
  })
  ]
}