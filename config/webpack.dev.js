const Webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

const env = require('./dev');

const url = "http://192.133.1.331:8089/templegm";

module.exports = {
  mode: "development",
  devtool: 'cheap-module-source-map',
  entry: {
     app: ['./src/index.js']
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'index.js'
  },
  module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                include: path.resolve(__dirname, '../src'),
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
                include: path.resolve(__dirname, "../src"),
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
      new MiniCssExtractPlugin({
         filename: './css/[name][contenthash].css',
         chunkFilename: './css/[id][contenthash].css',
         ignoreOrder: false
       }),
      new MomentLocalesPlugin({
        localesToKeep: ['es-us', 'zh-cn'],
      })
    ],
    target:"web",
    devServer: {
        static: {
            directory:path.resolve(__dirname, "../dist"),
            publicPath: './'
        },
        client: {
            progress: true,
        },
        historyApiFallback: true,
        compress: true,
        host:"127.0.0.1",
        // hot: true,
        // liveReload:true,
        port: 9000,
        proxy: {
         '/api': {
           target: url,
           changeOrigin:true,
           pathRewrite: {'^/api' : ''}
         }
        }
    }
}
