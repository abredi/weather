const envConf = require('./webpack_config_utils/eviroment');
const tailwindcss = require('tailwindcss');
let postCssPlugins = [
  tailwindcss('./tailwind.config.js'),
  require('autoprefixer'),
];

if (envConf.getEnv() === envConf.ENV.PRODUCTION) {
  postCssPlugins = [
    ...postCssPlugins,
    require('@fullhuman/postcss-purgecss')({
      content: ['./src/*.html', './src/**/*.js'],
      whitelistPatterns: [/^(img|i)/],
      whitelist: ['random', 'yep', 'button'],
      
      defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
    }),
    require('cssnano')({
      preset: 'default',
    }),
  ];
}

module.exports = {
  plugins: [...postCssPlugins],
};
