const path = require('path');

const config = {
  entry: {
    demo: './demo/NumberInputDemo.html'
  },
  output: {
    path: path.resolve(__dirname, 'demo'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'react-sfc-webpack-loader']
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.module.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[local]--[hash:base64:5]'
              }
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.css', '.html']
  },
  performance: {
    hints: false
  },
  mode: 'production',
  devServer: {
    contentBase: path.resolve(__dirname, 'demo'),
    compress: false,
    port: 3000
  }
};

module.exports = config;
