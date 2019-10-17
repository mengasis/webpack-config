/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */

const { DefinePlugin } = require('webpack')
const { resolve } = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const tsRules = {
  test: /\.(ts|js)x?$/,
  exclude: /node_modules/,
  loader: 'babel-loader'
}

const cssRules = {
  test: /\.css$/,
  loaders: ['style-loader', 'css-loader']
}

module.exports = {
  module: {
    rules: [tsRules, cssRules]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [resolve(__dirname, 'src/'), resolve(__dirname, 'node_modules')],
    alias: {
      '@app': resolve(__dirname, 'src/')
    }
  },
  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.npm_package_version': JSON.stringify(process.env.npm_package_version)
    }),
    new CopyWebpackPlugin([
      { from: 'public/img', to: 'img' },
      { from: 'public/favicon.ico', to: '' }
    ])
  ]
}
