const path = require('path');
const JsDocPlugin = require('jsdoc-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'jsutils.js',
    library: 'jsUtils',
    libraryTarget: 'umd',
  },
  plugins: [
    new JsDocPlugin({conf: 'jsdoc.config.json'}),
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        use: ['eslint-loader'],
      },
    ],
  },
};
