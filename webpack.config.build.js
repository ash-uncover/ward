/* eslint-disable */

const path = require('path')

const DIR_BUNDLE = path.resolve(__dirname, 'bundles')
const DIR_SRC = path.resolve(__dirname, 'src')
const DIR_NODE_MODULES = path.resolve(__dirname, 'node_modules')

module.exports = {
  entry: {
    'js-utils-microfrontend': path.resolve(DIR_SRC, 'index_bundle.ts'),
  },

  output: {
    clean: true,
    path: DIR_BUNDLE,
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  resolve: {
    modules: ['node_modules', './src'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

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
