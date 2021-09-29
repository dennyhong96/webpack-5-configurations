const { HotModuleReplacementPlugin } = require("webpack");
const { merge } = require("webpack-merge");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");

const commonConfig = require("./webpack.common");

const devConfig = {
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
          filename: "vendors.js",
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

module.exports = merge(commonConfig, devConfig);
