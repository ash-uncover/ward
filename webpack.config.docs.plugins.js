/* eslint-disable */

const webpack = require('webpack')
const path = require('path')

const { merge } = require('webpack-merge')
const base = require('./webpack.config.docs.js')

const DIR_SRC = path.resolve(__dirname, 'src')
const DIR_DEMO = path.resolve(__dirname, 'test/demo/plugins')
const DIR_DEMO_COMMONS = path.resolve(__dirname, 'test/demo/commons')
const DIR_PUBLIC = path.resolve(__dirname, 'public')
const DIR_DOCS = path.resolve(__dirname, 'docs_plugins')
const DIR_NODE_MODULES = path.resolve(__dirname, 'node_modules')

const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const transformPlugin = (buffer) => {
  const plugin = JSON.parse(buffer.toString())
  plugin.url = 'http://localhost:27002'
  return JSON.stringify(plugin, null, 2)
}

module.exports = merge(base, {
  mode: 'development',
  name: 'plugins',

  entry: path.resolve(DIR_DEMO, 'index.tsx'),

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
    new HtmlWebpackPlugin({
      template: path.resolve(DIR_DEMO, 'index.html'),
      filename: 'index.html'
    }),
    new CopyPlugin({
      patterns: [{
        from: path.resolve(DIR_DEMO, 'plugin.json'),
        to: '.',
        transform: transformPlugin
      }],
    }),
  ],

  devtool: 'eval-source-map',

  devServer: {
    client: {
      progress: false,
    },
    compress: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
    port: 27002,
    static: {
      directory: DIR_PUBLIC,
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [DIR_SRC, DIR_DEMO, DIR_DEMO_COMMONS],
        exclude: DIR_NODE_MODULES,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.docs.plugins.json'
            }
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
        ],
      },
    ],
  },
})
