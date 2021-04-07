const Webpack = require('webpack');
const { resolve } = require("path");
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');

const url = "http://192.168.23.213:9002/templegm";

module.exports = {
  mode: "development",
  devtool: 'eval-source-map',
  entry: {
     app: ['./src/index.js']
  },
  output: {
    path: resolve(__dirname, '../build'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    publicPath:'/'
  },
  module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                include: resolve(__dirname, '../src'),
                use: ['cache-loader', 'babel-loader']
            },
            {
              test: /\.(png|jpg|gif)$/,
              exclude: /node_modules/,
              use: [
                // {
                //   loader: 'file-loader',
                //   options: {
                //     name: '[path][name].[ext]'
                //   }
                // },
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
                include: resolve(__dirname, "../src"),
                use: [
                    {
                      loader: MiniCssExtractPlugin.loader,
                      options: {
                        hmr: true,//热更新
                        reloadAll: true
                      },
                    },
                    {
                     loader: 'css-loader',
                     options: {
                         modules: true,
                         importLoaders: 1
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
         //'SERVICE_URL': JSON.stringify("http://192.168.23.213:9001/templegm"),
         'SERVICE_URL': JSON.stringify("http://127.0.0.1:3000/api")
      }),
      new HtmlWebpackPlugin({
        title: '管理系统',
        template:'./public/index.html',
        filename: "index.html",
        favicon: "./public/favicon.ico"
      }),
      new CleanWebpackPlugin(),
      // new CleanWebpackPlugin({
      //   cleanOnceBeforeBuildPatterns: ['**/*', '!dll', '!dll/**'] //不删除dll目录
      // }),
      // new CopyPlugin({
      //   patterns:[
      //       {
      //         from: resolve(__dirname, '../public/lib'),
      //         to: resolve(__dirname, '../build/lib')
      //       }
      //   ]
      // }),
      new Webpack.HotModuleReplacementPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
        ignoreOrder: false
      }),
      // new ESLintPlugin({
      //
      // }),
      // new Webpack.DllReferencePlugin({
      //   manifest:resolve(__dirname, '../build/dll', 'manifest.json')
      // }),
      //new BundleAnalyzerPlugin()
    ],
    optimization: {
      splitChunks: {
        chunks: 'async',
        minSize: 30000,//模块大于30k会被抽离到公共模块
        maxSize: 0,
        minChunks: 1,//模块出现1次就会被抽离到公共模块
        maxAsyncRequests: 5,//异步模块，一次最多只能被加载5个
        maxInitialRequests: 5,//入口模块最多只能加载个数
        automaticNameDelimiter: '-',
        name: true,
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
   devServer: {
      contentBase: resolve(__dirname, "../build"),
      publicPath:"/",
      historyApiFallback: true,
      host:"127.0.0.1",
      port: 3000,
      inline: true,
      hot: true,
      proxy: {
         '/api': {
           target: url,
           pathRewrite: {'^/api' : ''}
         }
       }
    }
}
