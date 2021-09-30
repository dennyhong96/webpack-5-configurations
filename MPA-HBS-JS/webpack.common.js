const path = require("path");
const fs = require("fs");
// const { ProvidePlugin } = require("webpack");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

const devConfig = require("./webpack.dev.js");
const prodConfig = require("./webpack.prod.js");

const pages = fs.readdirSync(path.resolve(__dirname, "src", "pages"));

const entry = pages.reduce(
  (entry, page) => {
    const pageFiles = fs.readdirSync(path.resolve(__dirname, "src", "pages", page));
    pageFiles.forEach((file) => {
      if (/\.js$/i.test(file)) {
        entry[page] = `./src/pages/${page}/${file}`;
      }
    });
    return entry;
  },
  { main: "./src/index.js" },
);

const htmlWebpackPlugins = pages.map(
  (page) =>
    new HtmlWebpackPlugin({
      template: `./src/pages/${page}/index.hbs`,
      filename: `${page}.html`,
      templateParameters: require("./src/data/items.json"),
      chunks: [page, "runtime", "vendors", "main"],
    }),
);

console.log({ entry });

module.exports = (env) => {
  let environmentConfig = devConfig;

  if (env && env.production) {
    environmentConfig = prodConfig;
  }

  return merge(environmentConfig, {
    entry,

    output: {
      path: path.resolve(__dirname, "dist"),
      clean: true,
      // assetModuleFilename: "assets/[name]_[hash][ext][query]",
      // publicPath: "https://cdn.example.com/",
    },

    module: {
      rules: [
        {
          test: /\.hbs$/,
          use: [
            {
              loader: "handlebars-loader",
              options: {
                partialDirs: [path.join(__dirname, "src", "components")],
                helperDirs: [path.join(__dirname, "src", "utils", "hbs-helpers")],
              },
            },
          ],
        },

        // Babel
        {
          test: /\.jsx?$/i,
          // exclude: /(node_modules|bower_components)/i,
          include: path.resolve(__dirname, "src"),
          use: [{ loader: "babel-loader" }],
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
    },

    resolve: {
      extensions: [".js", ".jsx"], // omit extensions when importting files
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },

    plugins: [
      ...htmlWebpackPlugins,

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
