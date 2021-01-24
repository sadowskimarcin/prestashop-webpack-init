const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const globImporter = require('node-sass-glob-importer');

let config = {
  entry: {
    lib: './src/library/main.ts',
    front: './src/front/main.ts',
    admin: './src/admin/main.ts',
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
        ]
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'css-loader',
        ]
      },
      {
        test: /\.(scss|css)$/,
        exclude: [/node_modules/],
        use: [
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
        ]
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                importer: globImporter()
              }
            }
          }
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
