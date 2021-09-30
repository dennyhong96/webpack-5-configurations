const { HotModuleReplacementPlugin } = require("webpack");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",

  devtool: "eval-cheap-module-source-map",

  output: {
    filename: "[name].bundle.js",
    chunkFilename: "[name].chunk.js",
  },

  devServer: {
    static: "./dist",
    open: true,
    hot: true,
    port: 3000,
  },

  optimization: {
    // Code splitting
    splitChunks: {
      chunks: "all", // Split both static and async dynamic imports
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          filename: "vendors_[name].js",
        },
      },
    },
  },

  plugins: [
    new HotModuleReplacementPlugin(),

    new MiniCSSExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].chunk.css",
    }),
  ],
};
