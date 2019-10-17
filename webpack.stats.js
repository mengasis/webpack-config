/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const merge = require('webpack-merge')
const Jarvis = require('webpack-jarvis')

const production = require('./webpack.prod')

module.exports = merge(production, {
  plugins: [
    new Jarvis({
      port: 1337,
      host: '0.0.0.0',
      watchOnly: false
    }),
    new BundleAnalyzerPlugin({})
  ]
})
