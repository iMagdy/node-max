const webpack = require('webpack');
const C = require('./constants');

const IS_DEV = process.env.NODE_ENV !== 'production';

const config = {
  entry: C.APP_ENTRY_POINT,
  output: {
    path: C.BUILD_DIR,
    filename: C.BUNDLE_FILE_NAME,
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader',
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
          },
          // other vue-loader options go here
        },
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  devtool: IS_DEV ? '#eval-source-map' : false,
  devServer: {
    historyApiFallback: true,
    noInfo: true,
  },
  performance: {
    hints: 'warning',
  },
};

if (process.env.NODE_ENV === 'production') {
  config.devtool = '#source-map';
  // http://vue-loader.vuejs.org/en/workflow/production.html
  config.plugins = (config.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: 'production',
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ]);
}

module.exports = config;
