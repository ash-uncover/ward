/* eslint-disable */

const path = require('path')

const DIR_SRC = path.resolve(__dirname, 'src')
const DIR_DEMO = path.resolve(__dirname, 'test/demo')
const DIR_DOCS = path.resolve(__dirname, 'docs')
const DIR_NODE_MODULES = path.resolve(__dirname, 'node_modules')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  entry: path.resolve(DIR_DEMO, 'index_docs.tsx'),

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

  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [DIR_SRC, DIR_DEMO],
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
}

const mainConfig = Object.assign({}, config, {
  name: 'main',
  output: {
    clean: true,
    path: DIR_DOCS,
    filename: 'main.bundle.js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(DIR_DEMO, 'index_docs.html'),
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
    static: {
      directory: path.join(__dirname, 'public'),
    },
  },
})

module.exports = [
  mainConfig,
]