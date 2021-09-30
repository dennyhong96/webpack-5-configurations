const path = require("path");
const { DllPlugin } = require("webpack");

module.exports = {
  mode: "development",

  entry: {
    react: ["react", "react-dom"],
    lodash: "lodash",
    jquery: "jquery",
  },

  output: {
    filename: "[name].dll.js",
    path: path.resolve(__dirname, "dll"),
    library: "[name]",
  },

  plugins: [
    new DllPlugin({
      name: "[name]",
      path: path.resolve(__dirname, "dll", "[name].manifest.json"),
    }),
  ],
};
