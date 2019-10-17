/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */

const { resolve } = require('path')

const merge = require('webpack-merge')
const { HashedModuleIdsPlugin, DefinePlugin } = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

const common = require('./webpack.common')
const siteConfig = require('./config/site.production')

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
  filename: 'styles/[name].[hash].css',
  chunkFilename: 'styles/[id].[hash].css'
}

module.exports = merge(common, {
  mode: 'production',
  entry: {
    main: resolve(__dirname, 'src', 'index.tsx')
  },
  output: {
    path: resolve(__dirname, rootFolder),
    filename: 'js/[name].[contenthash].js',
    chunkFilename: 'js/[name].[contenthash].chunk.js',
    publicPath: '/edf'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin(configHTML),
    new MiniCssExtractPlugin(configMiniCSS),
    new HashedModuleIdsPlugin(),
    new CompressionPlugin({
      filename: '[path].gz[query]'
    }),
    new DefinePlugin({
      'process.env.APP_ENV': JSON.stringify('production')
    })
  ],
  optimization: {
    minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})],
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      maxSize: 244000,
      cacheGroups: {
        default: false,
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1]

            return `npm.${packageName.replace('@', '')}`
          }
        }
      }
    }
  }
})
