const path = require("path");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const config = require("../config");

module.exports = merge(baseWebpackConfig, {
  mode: "development",
  entry: {
    main: ["react-hot-loader/patch", path.resolve(__dirname, "../src/index.js")]
  },
  devtool: "cheap-module-source-map",
  node: {
    setImmediate: false,
    process: "mock",
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty"
  },
  output: {
    filename: "[name].js",
    chunkFilename: "[name].[hash:8].js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, "../src"),
        exclude: /node_modules/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                mode: "local",
                localIdentName: "[name]-[local]-[hash:base64:5]"
              }
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss"
            }
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: path.resolve(__dirname, "../src"),
        include: /node_modules/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: false
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss"
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              modules: {
                mode: "local",
                localIdentName: "[name]-[local]-[hash:base64:5]"
              }
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss"
            }
          },
          {
            loader: "less-loader",
            options: {
              modifyVars: {},
              javascriptEnabled: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development")
    }),
    new HtmlWebpackPlugin({
      template: config.build.htmlTemplatePath,
      inject: "body",
      minify: {
        html5: true
      },
      hash: false
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    host: config.dev.host,
    port: config.dev.port,
    contentBase: path.resolve(__dirname, "../public"),
    compress: true,
    historyApiFallback: true,
    noInfo: false,
    quiet: false,
    hot: true,
    open: config.dev.autoOpenBrowser,
    proxy: config.dev.proxyTable,
    openPage: config.dev.openPage
  }
});
