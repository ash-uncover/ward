/* eslint-disable */

const path = require('path')

const DIR_DIST = path.resolve(__dirname, 'dist')
const DIR_SRC = path.resolve(__dirname, 'src')
const DIR_PUBLIC = path.resolve(__dirname, 'public')
const DIR_NODE_MODULES = path.resolve(__dirname, 'node_modules')

const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  resolve: {
    modules: ['node_modules', './src'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  devtool: 'inline-source-map',
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
          { loader: 'ts-loader' },
        ],
      },
    ],
  },
}

const baseConfig = Object.assign({}, config, {
  name: 'base',
  entry: path.resolve(DIR_PUBLIC, 'index-docs.js'),
  output: {
    clean: true,
    path: DIR_DIST,
    filename: 'base.bundle.js',
    sourceMapFilename: 'base.map',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '_redirects'),
          to: '.',
        },
      ],
    }),
  ],
  devServer: {
    client: {
      progress: false,
    },
    compress: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
    port: 8080,
    static: {
      directory: path.join(__dirname, 'public'),
    },
  },
})

const blueConfig = Object.assign({}, config, {
  name: 'blue',
  entry: path.resolve(DIR_PUBLIC, 'index-docs-blue.js'),
  output: {
    clean: true,
    path: DIR_DIST,
    filename: 'blue.bundle.js',
    sourceMapFilename: 'blue.map',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index_blue.html',
      filename: 'index_blue.html'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '_redirects'),
          to: '.',
        },
      ],
    }),
  ],
})

const greenConfig = Object.assign({}, config, {
  name: 'green',
  entry: path.resolve(DIR_PUBLIC, 'index-docs-green.js'),
  output: {
    clean: true,
    path: DIR_DIST,
    filename: 'green.bundle.js',
    sourceMapFilename: 'green.map',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index_green.html',
      filename: 'index_green.html'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '_redirects'),
          to: '.',
        },
      ],
    }),
  ],
})

const yellowConfig = Object.assign({}, config, {
  name: 'yellow',
  entry: path.resolve(DIR_PUBLIC, 'index-docs-yellow.js'),
  output: {
    clean: true,
    path: DIR_DIST,
    filename: 'yellow.bundle.js',
    sourceMapFilename: 'yellow.map',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index_yellow.html',
      filename: 'index_yellow.html'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '_redirects'),
          to: '.',
        },
      ],
    }),
  ],
})

module.exports = [
  baseConfig,
  blueConfig,
  greenConfig,
  yellowConfig
]