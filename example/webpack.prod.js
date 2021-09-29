const { merge } = require("webpack-merge");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");

const commonConfig = require("./webpack.common");

const prodConfig = {
  mode: "production",

  output: {
    filename: "[name].[contenthash].bundle.js",
    chunkFilename: "[name].[contenthash].chunk.js",
  },

  devtool: "source-map", // or "cheap-module-source-map"

  optimization: {
    // Tree shaking is automatically enabled for prod
    // Tree shaking - to opt out of tree shaking for certain files, use the "sideEffects" key in package.json
    usedExports: true,

    // Code splitting
    splitChunks: {
      chunks: "all", // Split both static and async dynamic imports
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          filename: "vendors.[contenthash].js",
        },
      },
    },
  },

  plugins: [
    new MiniCSSExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[name].[contenthash].chunk.css",
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
