/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */

const { resolve } = require('path')
const { DefinePlugin } = require('webpack')
const merge = require('webpack-merge')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Jarvis = require('webpack-jarvis')

const common = require('./webpack.common')
const siteConfig = require('./config/site.development')

const rootFolder = 'build'

const configHTML = {
  template: resolve(__dirname, 'public', 'index.ejs'),
  data: siteConfig,
  minify: {
    html5: true,
    minifyCSS: true,
    minifyJS: true,
    removeComments: true,
    removeRedundantAttributes: true
  }
}

const configMiniCSS = {
  filename: '[name].css',
  chunkFilename: '[id].css'
}

module.exports = merge(common, {
  mode: 'development',
  output: {
    path: resolve(__dirname, rootFolder),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].chunk.js',
    publicPath: '/'
  },
  devServer: {
    hot: true,
    publicPath: '/',
    host: '0.0.0.0',
    contentBase: resolve(__dirname, rootFolder),
    historyApiFallback: true,
    disableHostCheck: true
  },
  plugins: [
    new HtmlWebPackPlugin(configHTML),
    new MiniCssExtractPlugin(configMiniCSS),
    new DefinePlugin({
      'process.env.APP_ENV': JSON.stringify('development')
    }),
    new Jarvis({
      port: 1337,
      host: '0.0.0.0'
    })
  ]
})
