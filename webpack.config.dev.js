const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

dotenv.config();
process.env.NODE_ENV = 'development';

module.exports = {
  mode: 'development',
  target: 'web',
  entry: './src/index',
  devtool: 'cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    stats: 'minimal',
    overlay: true,
    historyApiFallback: true,
    disableHostCheck: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    https: false,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.BACKEND_LINK': JSON.stringify(process.env.BACKEND_LINK),
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      favicon: 'src/assets/favicon.png',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /(\.scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /(\.css)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
      },
    ],
  },
};
