const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js"
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js(x?)$/,
        use: [
          "babel-loader"
        ]
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(jpeg|jpg|png|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10240
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|ttf|eot|otf)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10240
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../index.html"),
      filename: "index.html",
      chunks: "all",
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true, // 移除空格
        minifyCSS: true,
        minifyJS: true,
        preserveLineBreaks: false, // 保留一个换行符
        removeComments: true,
        removeRedundantAttributes: true // 移除多余的属性
      }
    })
  ],
  devServer: {
    contentBase: "./dist",
    hot: true,
    clientLogLevel: "none",
    historyApiFallback: true,
    host: "127.0.0.1",
    port: "8001",
    progress: "true"
  },
  devtool: "eval-source-map"
};
