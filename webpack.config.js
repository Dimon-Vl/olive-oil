const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const pages = ['index'];

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  const header = fs.readFileSync(path.resolve(__dirname, 'view/header/header.html'), 'utf8');
  const footer = fs.readFileSync(path.resolve(__dirname, 'view/footer/footer.html'), 'utf8');
  const section = (name) =>
    fs.readFileSync(path.resolve(__dirname, 'sections', name, 'section.html'), 'utf8');

  return {
    entry: {
      main: path.resolve(__dirname, 'js/main.js')
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].[contenthash].js',
      assetModuleFilename: 'assets/[name].[contenthash][ext][query]',
      clean: true
    },
    module: {
      rules: [
        {
          test: /\.s?css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        },
        {
          test: /\.(png|jpe?g|gif|svg|webp)$/i,
          type: 'asset/resource'
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash].css'
      }),
      ...pages.map(
        (name) =>
          new HtmlWebpackPlugin({
            filename: `${name}.html`,
            template: path.resolve(__dirname, `${name}.html`),
            chunks: ['main'],
            minify: isProd,
            templateParameters: {
              header,
              footer,
              section
            }
          })
      )
    ],
    devtool: isProd ? false : 'source-map',
    devServer: {
      static: {
        directory: path.resolve(__dirname, 'dist')
      },
      port: 8080,
      open: false,
      hot: true
    }
  };
};
