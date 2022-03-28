const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js", // 如果只写 filename, 不会有任何导出模块；
    library: 'subAppWebpackLib', // 会将所有的导出方法挂载到 subAppWebpackLib 上面；
    libraryTarget: 'umd',  // 如果只写 libraryTarget 不写 library，会把所有的导出都挂载全局；
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              // css-loader 配置项
            },
          },
        ],
        include: /src/,
      },
    ],
  },
  devServer: {
    allowedHosts: "all",
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: false,
    port: 9000,
  },
};
