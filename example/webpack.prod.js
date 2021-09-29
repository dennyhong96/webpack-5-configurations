const { merge } = require("webpack-merge");

const commonConfig = require("./webpack.common");

const prodConfig = {
  mode: "production",

  devtool: "source-map", // or "cheap-module-source-map"

  optimization: {
    splitChunks: {
      chunks: "all", // Split static and async dynamic imports
      // minSize: 20000, // Split modules that are larger than 20000bytes
      // minChunks: 1,
      // enforceSizeThreshold: 50000,
      // // Above props specifify quanlifications for chunk splitting, cacheGroups specifies how to split chunks
      // cacheGroups: {
      //   defaultVendors: {
      //     test: /[\\/]node_modules[\\/]/, // group vendor modules chunks into one file
      //     priority: -10,
      //     reuseExistingChunk: true,
      //     filename: "vendors.js",
      //   },
      //   default: {
      //     minChunks: 1,
      //     priority: -20,
      //     reuseExistingChunk: true,
      //   },
      // },
    },
  },
};

module.exports = merge(commonConfig, prodConfig);
