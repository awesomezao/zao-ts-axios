const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = function(env) {
  const isDev = env === 'development';
  const isProd = env === 'production';
  return {
    mode: isDev ? 'development' : isProd && 'production',
    devtool: isDev ? 'source-map' : isProd && 'cheap-module-source-map',
    entry: {
      axios: path.resolve(__dirname, '../src/index.js')
    },
    output: {
      path: path.resolve(__dirname, '../build'),
      pathinfo: isDev,
      filename: isDev
        ? 'static/js/bundle.js'
        : isProd && 'static/js/[name].[contenthash:8].js',
      chunkFilename: isDev
        ? 'static/js/[name].chunk.js'
        : isProd && 'static/js/[name].[contenthash:8].chunk.js',
      publicPath: './'
    },
    resolve: { extensions: ['.ts', '.js'] },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader'
        },
        {
          test: /\.ts$/,
          loader: 'awesome-typescript-loader'
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../example/index.html'),
        filename: 'index.html',
        chunks: ['axios']
      }),
      isProd && new CleanWebpackPlugin(),
      isDev && new webpack.HotModuleReplacementPlugin()
    ].filter(Boolean)
    // optimization: {
    //   minimize: isProd,
    //   minimizer: [
    //     new TerserPlugin({
    //       terserOptions: {
    //         parse: { ecma: 8 },
    //         compress: {
    //           ecma: 5,
    //           warnings: true,
    //           comparisons: false,
    //           inline: 2
    //         },
    //         keep_classnames: true,
    //         keep_fnames: true,
    //         output: {
    //           ecma: 5,
    //           comments: false,
    //           ascii_only: true
    //         }
    //       },
    //       cache: true
    //     })
    //   ],
    //   splitChunks: {
    //     chunks: 'all',
    //     name:false
    //   },
    //   runtimeChunk: {
    //     name: entrypoint => `runtime-${entrypoint.name}`
    //   }
    // }
  };
};
