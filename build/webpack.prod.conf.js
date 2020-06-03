const merge = require("webpack-merge");
const webpack = require("webpack");
const path = require("path");
const baseWebpackConfig = require("./webpack.base.conf");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const config = require("../config");

const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const buildConfig = {
  entry: {
    app: path.resolve(__dirname, "../src/index.js")
  },
  mode: "production",
  output: {
    filename: "[name].js",
    chunkFilename: "[name].async.js"
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: {
            drop_console:
              process.env.NODE_ENV === "production" &&
              process.env.BUILD_ENV === "release"
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {}
      })
    ],
    // 目的是分离框架代码和业务代码
    splitChunks: {
      chunks: "all",
      minChunks: 1,
      minSize: 0,
      cacheGroups: {
        vendor: {
          priority: -10,
          test: /node_modules/,
          name: "vendor",
          enforce: true,
          reuseExistingChunk: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, "../src"),
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: false
            }
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true
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
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: false
            }
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
        include: path.resolve(__dirname, "../src"),
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: false
            }
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              sourceMap: true,
              modules: true
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
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new CleanWebpackPlugin({
      root: config.build.assetsRoot, // 根目录
      verbose: true // 开启在控制台输出信息
    }),
    new HtmlWebpackPlugin({
      template: config.build.htmlTemplatePath,
      inject: "body",
      minify: {
        removeComments: true, // 清理html中的注释
        collapseWhitespace: true, // 清理html中的空格、换行符
        removeAttributeQuotes: true // 移除属性的引号
      }
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ]
};
if (process.env.NODE_ENV === "analyzer") {
  buildConfig.plugins.push(
    new BundleAnalyzerPlugin({
      analyzerPort: "5000"
    })
  );
}

module.exports = merge(baseWebpackConfig, buildConfig);
