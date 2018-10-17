const Path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const dest = Path.join(__dirname, '../dist')

module.exports = {
  entry: [
    Path.resolve(__dirname, '../src/index')
  ],
  output: {
    path: dest,
    filename: 'bundle.[hash].js'
  },
  plugins: [
    new CleanWebpackPlugin([dest], { root: Path.resolve(__dirname, '..') }),
    new HtmlWebpackPlugin({
      template: Path.resolve(__dirname, '../src/index.html')
    })
  ],
  resolve: {
    alias: {
      '~': Path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        exclude: /node_modules/,
        type: 'javascript/auto'
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        }
      }
    ]
  }
}
