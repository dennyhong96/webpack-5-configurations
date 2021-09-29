const { HotModuleReplacementPlugin } = require("webpack");
const { merge } = require("webpack-merge");

const commonConfig = require("./webpack.common");

const devConfig = {
  mode: "development",

  devtool: "eval-cheap-module-source-map",

  devServer: {
    static: "./dist",
    open: true,
    hot: true,
    port: 3000,
  },

  optimization: {
    // Tree shaking - to opt out of tree shaking for certain files,
    // use the "sideEffects" key in package.json
    // Tree shaking is automatically enabled for prod
    usedExports: true,
  },

  plugins: [new HotModuleReplacementPlugin()],
};

module.exports = merge(commonConfig, devConfig);
