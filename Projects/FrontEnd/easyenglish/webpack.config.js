/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    sourceMapFilename: '[file].[hash:8].map[query]',
    assetModuleFilename: 'static/[name].[hash:8].[ext]'
  },
  devServer: {
    static: {
        directory: path.join(__dirname, "build"),
      },
    https:true,
    compress: true,
    port: 3000, // default 8000
    historyApiFallback: true,
    hot: true
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    fallback: { crypto: false },
  },
  mode: 'production',
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/[hash][ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/[hash][ext]',
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [{
          noErrorOnMissing: true,
          from: path.resolve(__dirname, 'src/assests'),
          to: path.resolve(__dirname, 'build'),
        }]
    }),
    new BundleAnalyzerPlugin(),
    new CompressionPlugin({
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ],
};
