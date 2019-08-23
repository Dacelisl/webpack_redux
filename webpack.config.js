const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const MiniCSSExtract = require('mini-css-extract-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: "css-loader"
        })
      },
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
     /*  {
        test: /\.css$/,
        use: [
          MiniCSSExtract.loader,
          'css-loader'
        ],
      } */
   ]
  },

  plugins: [
    new ExtractTextPlugin("bundle.css"),
    new HtmlWebpackPlugin({
      template:  path.resolve(__dirname, 'src/index.html'),
      filename: './new.html'
    }),
  /*   new MiniCSSExtract({
      filename: '[name].css',
      chunkFilename:'[id].css'
    }), */
  ]
}
