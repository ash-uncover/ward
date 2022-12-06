/* eslint-disable */

const webpack = require('webpack')
const path = require('path')

const DIR_DOCS = path.resolve(__dirname, 'docs')
const DIR_SRC = path.resolve(__dirname, 'src')
const DIR_NODE_MODULES = path.resolve(__dirname, 'node_modules')

const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve(DIR_SRC, 'index.ts'),

  output: {
    clean: true,
    path: DIR_DOCS,
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  resolve: {
    modules: ['node_modules', './src'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  plugins: [
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, '_redirects'), to: '.' },
        { from: path.resolve(__dirname, 'public'), to: '.' },
      ],
    }),
    new webpack.EnvironmentPlugin({
      AP_GAMES_MAZE_PUBLIC: '/ap-games-maze'
    }),
    new HtmlWebpackPlugin({
      template: './src/index-docs.html',
      title: 'JS Utils Microfrontend',
      publicPath: '/js-utils-microfrontend'
    }),
  ],

  module: {
    rules: [
      {
        test: /.(jsx|js)$/,
        include: DIR_SRC,
        exclude: DIR_NODE_MODULES,
        use: [
          { loader: 'babel-loader' },
        ],
      },
      {
        test: /\.tsx?$/,
        include: DIR_SRC,
        exclude: DIR_NODE_MODULES,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.webpack.json'
            }
          },
        ],
      },
    ],
  },
}
