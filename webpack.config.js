const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: `./examples/${process.env.EXAMPLE}`,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'],
    alias: {
      '@react-scroll-handler': path.resolve(
        __dirname,
        'lib',
        'ScrollHandler.js'
      )
    }
  },
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.json'
            }
          },
          {
            loader: 'tslint-loader',
            options: {
              failOnHint: false
            }
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              localIdentName: '[local]__[hash:base64:5]',
              sourceMap: true,
              minimize: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              ident: 'postcss',
              plugins: loader => [require('postcss-cssnext')()]
            }
          }
        ]
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin()]
}
