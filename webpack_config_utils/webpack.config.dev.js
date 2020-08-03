const appPath = require('./common.path');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const glob = require('glob');

module.exports = {
  mode: 'development',
  devServer: {
    contentBase: appPath.OUTPUT,
    compress: true,
    port: 3001,
    // hot: true
  },
  module: {
    rules: [
      {
        test: /\.s?css$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          'postcss-loader'
        ]
      }
    ]
  },

  plugins: [
    new PurgecssPlugin({
      paths: glob.sync(`${appPath.ENTRY_SRC}/**/*`, { nodir: true }),
    }),

    new HtmlPlugin({
      title: 'Weather',
      template: `${appPath.ENTRY_SRC}/template.html`
    }),
  ]
}
