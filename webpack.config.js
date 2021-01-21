const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

let config = {
  entry: {
    custom: './src/default/app.ts',
    admin: './src/admin/app.ts',
  },
  output: {
    path: path.resolve(__dirname, '../assets'),
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js/,
        loader: 'babel-loader'
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: {
                  'postcss-preset-env': {},
                }
              },
            },
          },
          'sass-loader'
        ],
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  externals: {
    prestashop: 'prestashop',
    $: '$',
    jquery: 'jQuery'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: path.join('css', '[name].css'),
    }),
    new WebpackNotifierPlugin({
      alwaysNotify: true
    }),
  ]
};

module.exports = config;
