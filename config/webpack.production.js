const path = require("path");
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const packageFile = require('../package.json');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackBundleAnalyzer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
let CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
  mode: 'production',
  devtool: 'source-map',
  resolve: {
    alias: {
      'handlebars/runtime': 'handlebars/dist/cjs/handlebars.runtime',
      'handlebars': 'handlebars/dist/cjs/handlebars.runtime',
    }
  },
  entry: path.join(__dirname, './../src/app.js'),
  output: {
    filename: '[name].bundle-[hash:8].js',
    publicPath: "./../js/",
    path: path.resolve(__dirname, './../dist/js'),
  },
  optimization: {
    splitChunks: {
     cacheGroups: {
      vendor: {
       test: /node_modules/,
       chunks: 'initial',
       name: 'vendor',
       enforce: true
      },
     }
    } 
   },
  target: 'web',
  node: {
    fs: 'empty',
    net: 'empty',
  },
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
    // new webpack.HotModuleReplacementPlugin(), 
    new CleanWebpackPlugin(),
    new ExtractTextPlugin({
      filename: './../css/app.bundle.css',
      allChunks: true,
    }),
    new HtmlWebPackPlugin({
      template: "./index.template.html",
      filename: path.resolve(__dirname, './../dist/index.hbs'),
      excludeChunks: [ 'server' ],
      hash: true,
    }),
    new CopyWebpackPlugin([
      {
        from: 'assets',
        to: path.resolve(__dirname, './../dist/assets/'),
        ignore: ['*.DS_Store'],
      },
      {
        from: 'server',
        to: path.resolve(__dirname, './../dist/server/'),
        ignore: ['*.DS_Store'],
      },
    ]),
    new WebpackBundleAnalyzer(),
  ]
}