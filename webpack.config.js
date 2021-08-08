const currentTask = process.env.npm_lifecycle_event;
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

console.log('state:',currentTask);

const config = {
  entry: "./src/server.js",
  output: {
    filename: "customBundle.[contenthash].js",
    path: path.resolve(__dirname, "build"),
  },
  plugins: [new HtmlWebpackPlugin({ template: "./public/index.html" })],
  mode: "development",
  devtool: "eval-cheap-source-map",
  devServer: {
    port: 8080,
    contentBase: path.resolve(__dirname, "build"),
    hot: true,
  },
  module: {
    rules: [
      {
        test: [/\.scss$/,/\.css$/],
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                { useBuiltIns: "usage", corejs: 3, targets: "defaults" },
              ],
              "@babel/preset-react",
            ],
          },
        },
      },
       {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
            name: '[contenthash].[ext]',
            outputPath: 'assets',
        },
      },
    ],
  },
};

if (currentTask == "build") {
  config.mode = "production",
    config.module.rules[0].use[0] = MiniCssExtractPlugin.loader,
    config.plugins.push(
      new MiniCssExtractPlugin({ filename: "main.[contenthash].css" }),
      new CleanWebpackPlugin(),
      new WebpackManifestPlugin()
    ),
    config.devtool = false
}
module.exports = config;
