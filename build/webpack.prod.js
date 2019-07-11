const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "[name]_[chunkHash:7].js"
  },
  mode: "production",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          "babel-loader"
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader", // 必须在css-loader之前
            options: {
              plugins: [
                // 做css浏览器兼容的前缀
                // eslint-disable-next-line global-require
                require("autoprefixer")() // 配置写在package.json browserslist 或者：
                // overrideBrowserslist: ["last 2 version", ">1%", "ios 7"]
              ]
            }
          },
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
    // 将css抽离为单独文件
    new MiniCssExtractPlugin({
      filename: "[name]_[contentHash:7].css"
    }),
    // 压缩css文件
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano") // eslint-disable-line global-require
    }),
    // 自动清理构建目录
    new CleanWebpackPlugin(),
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
  ]
};
