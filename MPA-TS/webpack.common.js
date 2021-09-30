const path = require("path");
// const { ProvidePlugin } = require("webpack");
const fs = require("fs");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

const devConfig = require("./webpack.dev.js");
const prodConfig = require("./webpack.prod.js");

function listPagesFileanmes() {
  return fs.readdirSync(path.resolve(__dirname, "src", "views"));
}

function generateEntry() {
  return listPagesFileanmes().reduce(
    (entry, pageFileName) => {
      const chunkName = pageFileName.split(".").filter(Boolean)[0];
      entry[chunkName] = `./${path.join("src", "views", pageFileName)}`;
      return entry;
    },
    { main: "./src/main.ts" },
  );
}

function generateHTMLWebpackPlugins() {
  return listPagesFileanmes().map((pageFileName) => {
    const chunkName = pageFileName.split(".").filter(Boolean)[0];
    return new HtmlWebpackPlugin({
      template: "./src/template.html",
      filename: `${chunkName}.html`,
      chunks: [chunkName, "main", "runtime", "vendors"],
      title: chunkName,
    });
  });
}

module.exports = (env) => {
  let environmentConfig = devConfig;

  if (env && env.production) {
    environmentConfig = prodConfig;
  }

  return merge(environmentConfig, {
    entry: generateEntry(),

    output: {
      path: path.resolve(__dirname, "dist"),
      clean: true,
      // assetModuleFilename: "assets/[name]_[hash][ext][query]",
      // publicPath: "https://cdn.example.com/",
    },

    module: {
      rules: [
        // TS & Babel
        {
          test: /\.[tj]sx?$/i,
          // exclude: /(node_modules|bower_components)/i,
          include: path.resolve(__dirname, "src"),
          use: [{ loader: "babel-loader" }, { loader: "ts-loader" }],
        },

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
            MiniCSSExtractPlugin.loader,
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
            MiniCSSExtractPlugin.loader,
            { loader: "css-loader", options: { importLoaders: 2 } },
            "sass-loader",
            "postcss-loader",
          ],
        },
      ],
    },

    optimization: {
      // Tree shaking is automatically enabled for prod
      // Tree shaking - to opt out of tree shaking for certain files, use the "sideEffects" key in package.json
      usedExports: true,

      // Don't show performance problems
      // performance: false,

      // Separate runtime code into it's own chunk
      runtimeChunk: {
        name: "runtime",
      },

      minimizer: [
        `...`, // extend existing minimizers (i.e. `terser-webpack-plugin`)
        new CssMinimizerPlugin(),
      ],
    },

    resolve: {
      extensions: [".js", ".ts", ".jsx", ".tsx"], // omit extensions when importting files
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },

    plugins: [
      ...generateHTMLWebpackPlugins(),

      new ESLintPlugin(),

      // Automatically load modules instead of having to import or require them everywhere.
      // new ProvidePlugin({
      //   $: "jQuery",
      //   _: "lodash",
      //   _join: ["lodash", "join"],
      // }),
    ],
  });
};
