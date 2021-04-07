/*
dll 单独打包
webpack.DllPlugin
webpack.DllReferencePlugin
*/
const { resolve } = require('path');
const Webpack = require('webpack');

module.exports = {
    entry: {
      lodash:['lodash'],
      react:['react','react-dom']
    },
    output:{
        filename:'dll.[name].js',
        path:resolve(__dirname,'../build','dll'),
        library:'[name]'
    },
    //plugins
    plugins:[
        new Webpack.DllPlugin({
            name:'[name]',
            path:resolve(__dirname,'../build/dll/manifest.json')
        })
    ],

    //mode
     mode:'production'
}
