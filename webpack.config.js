const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Path = require('path')
const Webpack = require('webpack')

const Config = require('./config')

const ROOT_PATH = Path.resolve(__dirname)

var basePlugins, devPlugins, prodPlugins
var env = Config.nodeEnv

function getEntrySources(sources) {
  if (env !== 'production') sources.push('webpack-hot-middleware/client')
  return sources
}

basePlugins = [
  new Webpack.DefinePlugin({
    __DEVELOPMENT__: env !== 'production',
    __PRODUCTION__: env === 'production'
  }),
  new HtmlWebpackPlugin({
    template: './client/templates/index.html',
    inject: 'body'
  }),
  new ExtractTextPlugin('css/styles.css'),
]

devPlugins = [
  new Webpack.HotModuleReplacementPlugin(),
  new Webpack.NoErrorsPlugin()
]

prodPlugins = [
  new Webpack.optimize.OccurenceOrderPlugin(),
  new Webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
]

const PLUGINS = basePlugins
  .concat(env === 'production' ? prodPlugins : [])
  .concat(env === 'development' ? devPlugins : [])

module.exports = {
  entry: { app: getEntrySources(['./client/Routes']) },
  output: {
    path: Path.resolve(ROOT_PATH, 'public'),
    filename: 'js/app.[hash].js',
    publicPath: '/',
    sourceMapFilename: 'js/app.[hash].js.map',
    chunkFilename: '[id].chunk.js'
  },
  devtool: 'source-map',
  plugins: PLUGINS,
  module: {
    preLoaders: [
      { test: /\.js$/, loader: 'source-map-loader' }
    ],
    loaders: [
      { test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css?sourceMap!sass?sourceMap')
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
        loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'file?name=img/[name].[ext]',
        include: './client/assets/images'
      }
    ]
  },
  sassLoader: { includePaths: [Path.resolve(ROOT_PATH, './client/styles')] }
}

