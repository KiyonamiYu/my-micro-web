const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "sub-app-webpack.js", // 如果只写 filename, 不会有任何导出模块；
    library: 'subAppWebpackLib', // 会将所有的导出方法挂载到 subAppWebpackLib 上面；
    libraryTarget: 'umd',  // 如果只写 libraryTarget 不写 library，会把所有的导出都挂载全局；
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  optimization: {
    splitChunks: false,
    minimize: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),

    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  devServer: {
    headers: { "Access-Control-Allow-Origin": "*" },
    // contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9001,
    historyApiFallback: true,
    hot: true,
  },
};
