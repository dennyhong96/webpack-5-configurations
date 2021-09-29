const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const mode =
  process.env.NODE_ENV === "production" ? "production" : "development";

module.exports = {
  mode,

  entry: {
    main: "./src/index.js",
    sub: "./src/sub.js",
  },

  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    // assetModuleFilename: "",
  },

  module: {
    rules: [
      // Image files
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: "asset",
        generator: {
          filename: "assets/images/[name]_[hash][ext][query]",
        },
        parser: {
          dataUrlCondition: {
            maxSize: 2 * 1024, // 2kb
          },
        },
      },

      // Font files
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[name]_[hash][ext][query]",
        },
      },

      // CSS Modules -> <name>.module.scss
      {
        test: /\.modules\.(css|s[ac]ss)$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { importLoaders: 2, modules: true },
          },
          "sass-loader",
          "postcss-loader",
        ],
      },

      // Global CSS -> <name>.scss
      {
        test: /\.(css|s[ac]ss)$/i,
        use: [
          "style-loader",
          { loader: "css-loader", options: { importLoaders: 2 } },
          "sass-loader",
          "postcss-loader",
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};
