const path = require("path");

module.exports = {
  dev: {
    // 开发环境配置
    assetsSubDirectory: "static", // 资源文件编译后存放的文件夹名称
    assetsPublicPath: "/", // 公共路径,
    htmlTemplatePath: path.resolve(__dirname, "../template/index.html"), // 模版文件路径
    host: "localhost", // 域名
    port: 8080, // 端口号
    autoOpenBrowser: true // 自动打开浏览器
  },
  build: {
    // 生产环境配置
    assetsRoot: path.resolve(__dirname, "../dist"), // 编译后的文件存放根路径
    assetsSubDirectory: "static", // 资源文件编译后存放的文件夹名称
    assetsPublicPath:
      process.env.NODE_ENV === "production" &&
      process.env.BUILD_ENV === "release"
        ? "//assets.dxycdn.com/gitrepo/dxmm_online_service/dist/"
        : "//assets.dxycdn.com/gitrepo/dxmm_online_service_dynamic/dist/", // 公共路径
    htmlTemplatePath: path.resolve(__dirname, "../template/index.html") // 模版文件路径
  }
};
