/*
生成打包
*/
const Webpack = require('webpack');
const { resolve } = require("path");
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const CompressionPlugin = require('compression-webpack-plugin');
const env = require('./test');

module.exports = {
  mode: "production",
  devtool: 'source-map',
  entry: {
     app: ['./src/index.js']
  },
  output: {
    path: resolve(__dirname, '../dist'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
    publicPath: './'
  },
  module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                include: resolve(__dirname, '../src'),
                use: {
                    loader: "babel-loader"
                }
            },
            {
              test: /\.(png|jpg|gif)$/,
              use: [
                {
                  loader: 'url-loader',
                  options: {
                    limit: 8*1024
                  }
                }
              ]
            },
            {
                test: /\.css$/,
                include: resolve(__dirname, '../src'),
                use: [
                  MiniCssExtractPlugin.loader,

                  {
                   loader: 'css-loader',
                   options: {
                     modules: true
                   }
                 },
                 {
                   loader: 'postcss-loader'
                 }
                ]
            },
            {
                test: /\.css$/,
                include: /[\\/]node_modules[\\/](antd)[\\/]/,
                use: [
                    "style-loader",
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
         new Webpack.DefinePlugin({
            'process.env': env
         }),
         new HtmlWebpackPlugin({
            title: '管理系统',
            template:'./public/index.html',
            filename: "index.html",
            favicon: "./public/favicon.ico"
         }),
         new CleanWebpackPlugin(),
         new MiniCssExtractPlugin({
            filename: './css/[name][contenthash].css',
            chunkFilename: './css/[id][contenthash].css',
            ignoreOrder: false
          }),
         new CompressionPlugin(), //nginx gzip_static模块启用
          //new BundleAnalyzerPlugin()//打包调整更新优化
     ],
     optimization: {
       splitChunks: {
         chunks: 'async',
         minSize: 20000,
         minRemainingSize: 0,
         minChunks: 1,
         maxAsyncRequests: 30,
         maxInitialRequests: 30,
         enforceSizeThreshold: 50000,
         cacheGroups: {
           vendor: {
             //第三方依赖
             priority: 1,
             name: 'vendor',
             test: /node_modules/,
             chunks: 'initial',
             minSize: 100,
             minChunks: 1 //重复引入了几次
           },
           antd: {
             name: "antd", // 单独将antd拆包
             priority: 5, // 权重需大于`vendor`
             test: /[\\/]node_modules[\\/](antd|@ant-design|rc-menu|rc-trigger|rc-field-form|rc-tabs|rc-dropdown|rc-align|rc-motion|rc-notification|rc-animate|rc-util|rc-tooltip|rc-textarea)[\\/]/,
             chunks: 'initial',
             minSize: 100,
             minChunks: 1
           },
           react: {
             name: "react",
             priority: 5,
             test: /[\\/]node_modules[\\/](react|react-dom|react-redux|redux|react-router|react-router-dom|redux-saga|@redux-saga)[\\/]/,
             chunks: 'initial',
             minSize: 100,
             minChunks: 1
           },
           default: {
             minChunks: 2,
             priority: -20,
             reuseExistingChunk: true
           }
         }
       }
     }
}
