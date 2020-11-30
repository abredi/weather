const HtmlPlugin = require('html-webpack-plugin');
const appPath = require('./common.path');

module.exports = {
  mode: 'development',
  devServer: {
    contentBase: appPath.OUTPUT,
    compress: true,
    port: 3000,
    watchContentBase: true,
    // hot: true,
  },
  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
          'postcss-loader'
        ],
      },
    ],
  },

  plugins: [
    new HtmlPlugin({
      title: 'Webpack-init',
      template: `${appPath.ENTRY_SRC}/template.html`,
    }),
  ],
};
