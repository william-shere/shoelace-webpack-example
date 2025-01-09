const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    // Bundle styles into main.css
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        // Copy Shoelace assets to dist/shoelace
        {
          // relies on the asset folder being located in the same directory as "shoelace.js"
          // resolving this way ensures the build will work with PnP resolvers such as Yarn
          from: path.join(path.dirname(require.resolve('@shoelace-style/shoelace/dist/shoelace.js')), 'assets'),
          to: path.resolve(__dirname, 'dist/shoelace/assets')
        }
      ]
    })
  ]
};
