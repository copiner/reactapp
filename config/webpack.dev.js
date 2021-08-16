const Webpack = require('webpack');
const { resolve } = require("path");
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//const ESLintPlugin = require('eslint-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

const env = require('./dev');

const url = "http://192.168.23.176:9002/templegm";

module.exports = {
  mode: "development",
  devtool: 'cheap-module-source-map',
  entry: {
     app: ['./src/index.js']
  },
  output: {
    path: resolve(__dirname, '../dist'),
    filename: './js/[name].[contenthash].js',
    chunkFilename: './js/[name].[contenthash].js',
    publicPath: './'
  },
  module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                include: resolve(__dirname, '../src'),
                use: {
                    loader: "babel-loader",
                }
            },
            {
              test: /\.(png|jpg|gif)$/,
              type: 'asset/resource',
              parser: {
                 dataUrlCondition: {
                   maxSize: 4 * 1024 // 4kb
                 }
               },
              generator: {
                 filename: 'static/[hash][ext][query]'
              }
            },
            {
                test: /\.css$/,
                include: resolve(__dirname, "../src"),
                use: [
                    { loader: "style-loader" },
                    {
                      loader: 'css-loader',
                      options: {
                        modules: true
                      }
                    },
                    { loader: 'postcss-loader' }
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
      //If webpack or webpack-dev-server are launched with the --hot option, this plugin will be added automatically
      // new Webpack.HotModuleReplacementPlugin(),
      new MiniCssExtractPlugin({
         filename: './css/[name][contenthash].css',
         chunkFilename: './css/[id][contenthash].css',
         ignoreOrder: false
       }),
      // new ESLintPlugin(),
      //new BundleAnalyzerPlugin(),
      new MomentLocalesPlugin({
        localesToKeep: ['es-us', 'zh-cn'],
      })
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
          moment: {
            name: "moment", //单独将echarts拆包
            priority: 5, // 权重需大于`vendor`
            test: /[\\/]node_modules[\\/](moment)[\\/]/,
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
    },
    target:"web",
    devServer: {
      contentBase: resolve(__dirname, "../dist"),
      publicPath: '/',
      historyApiFallback: true,
      host:"127.0.0.1",
      port: 3000,
      hot: true,
      proxy: {
         '/api': {
           target: url,
           changeOrigin:true,
           pathRewrite: {'^/api' : ''}
         }
       }
    }
}
