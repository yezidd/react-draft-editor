const path = require("path");
const config = require("../config");
const WebpackBar = require("webpackbar");

module.exports = {
  output: {
    filename: "bundle.js",
    path: config.build.assetsRoot,
    publicPath:
      process.env.NODE_ENV === "production"
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath
  },
  resolve: {
    symlinks: true,
    alias: {
      "@": path.resolve(__dirname, "../src"),
      "react-dom": "@hot-loader/react-dom"
    },
    extensions: [
      ".web.js",
      ".wasm",
      ".mjs",
      ".js",
      ".web.jsx",
      ".jsx",
      ".web.ts",
      ".ts",
      ".web.tsx",
      ".tsx",
      ".json"
    ],
    modules: ["node_modules"]
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true
          }
        },
        include: path.resolve(__dirname, "../src"),
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1000,
              name: "static/[name].[hash:8].[ext]",
              esModule: false
            }
          }
        ]
      }
    ]
  },
  plugins: [new WebpackBar()]
};
