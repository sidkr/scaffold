const path = require("path");
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const packageFile = require('../package.json');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  resolve: {
    alias: {
      'handlebars/runtime': 'handlebars/dist/cjs/handlebars.runtime',
      'handlebars': 'handlebars/dist/cjs/handlebars.runtime',
    }
  },
  entry: {
    index: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', './src/app.js'],
  },
  output: {
    filename: "[name].bundle.js",
    publicPath: "/",
    path: path.join(__dirname, 'dist'),
  },
  target: 'web',
  node: {
    fs: 'empty',
    net: 'empty',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        }
      },
      {
        // Loads the javacript into html template provided.
        // Entry point is set below in HtmlWebPackPlugin in Plugins 
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            //options: { minimize: true }
          }
        ]
      },
      {
        test: /\.hbs/,
        loader: "handlebars-loader",
      },
      {
        test: /\.(s*)css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: 'app.bundle.css',
      allChunks: true,
    }),
    new HtmlWebPackPlugin({
      template: "./index.template.html",
      filename: "./../index.hbs",
      excludeChunks: [ 'server' ],
      hash: true,
    }),
    new CopyWebpackPlugin([
      {
        from: 'assets',
        to: 'assets',
        ignore: ['*.DS_Store'],
      },
    ]),
  ]
}