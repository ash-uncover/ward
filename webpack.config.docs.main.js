/* eslint-disable */

const path = require('path')

const DIR_DIST = path.resolve(__dirname, 'docs')
const DIR_SRC = path.resolve(__dirname, 'src')
const DIR_NODE_MODULES = path.resolve(__dirname, 'node_modules')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  entry: path.resolve(DIR_SRC, 'index_docs.tsx'),

  output: {
    clean: true,
    path: DIR_DIST,
    filename: '[name].bundle.js',
  },

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
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.docs.json'
            }
          },
        ],
      },
    ],
  },
}

const mainConfig = Object.assign({}, config, {
  name: 'main',
  output: {
    clean: true,
    path: DIR_DIST,
    filename: 'main.bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(DIR_SRC, 'index_docs.html'),
      filename: 'index.html'
    }),
  ],
  devServer: {
    client: {
      progress: false,
    },
    compress: true,
    historyApiFallback: true,
    port: 27000,
  },
})

module.exports = [
  mainConfig,
]