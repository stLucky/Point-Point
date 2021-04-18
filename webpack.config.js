const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { webpack } = require('webpack');

const isDev = process.argv.includes("development");
const isProd = !isDev;

const optimization = () => {
  const config = {

  };

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin()
    ]
  }

  return config;
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

const getPostcssLoader = () => {
  return {
    loader: "postcss-loader",
    options: {
      postcssOptions: {
        plugins: [
          [
            "autoprefixer",
          ],
        ],
      },
    },
  }
}

const getCssLoaders = (extra) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    'css-loader',
  ];

  if (isProd) {
    loaders.push(getPostcssLoader())
  }

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
}

const getPlugins = () => {
  const plugins = [
    new HtmlWebpackPlugin({
      // filename: '../index.html',
      template: './index.html',
      minify: {
        collapseWhitespace: isProd,
      }
    }),
    new CleanWebpackPlugin(),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, 'source/favicon.ico'),
    //       to: path.resolve(__dirname, 'build')
    //     }
    //   ]
    // }),
    new MiniCssExtractPlugin({
      filename: filename('css')
    }),
  ]

  if (isDev) {
    plugins.push(new ESLintPlugin());
  }

  return plugins;
};


module.exports = {
  target: 'web',
  context: path.resolve(__dirname, 'source'),
  devtool: isDev ? 'source-map' : undefined,
  mode: 'development',
  entry: './js/main.js',
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'build'),
  },
  optimization: optimization(),
  devServer: {
    port: 8080,
    hot: isDev,
    contentBase: path.resolve(__dirname, 'build'),
  },
  plugins: getPlugins(),
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: getCssLoaders('sass-loader'),
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        use: ['file-loader']
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/i,
        use: ['file-loader']
      },
    ]
  }
}
