const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin =require('extract-text-webpack-plugin');
const isProd = process.env.NODE_ENV == 'prod'?true:false;

var PATHS = {
    js:'src/js'
}

var config = {
    // cache: true,
    entry:{
        index:path.join(__dirname,PATHS.js,'index.jsx'),
        page:path.join(__dirname,PATHS.js,'page.js')
    },
    output:{
        // path:'js/',
        // path: path.join(__dirname, "dist"),
        path: path.join(__dirname, "dist/js/"), //文件输出目录
        // publicPath: "dist/js/",        //用于配置文件发布路径，如CDN或本地服务器
        filename:'[name].js'


    },
    resolve:{
        extensions:["",".js",".jsx",".scss",".json"],
        //配置别名，在项目中可缩减引用路径
        alias:{
            jquery:'jquery/dist/jquery.min.js',
            react:'react/dist/react.min.js',    //此处react,react-dom别名必须同时设置，否则会出现找不到ReactDOM的问题，同时设置时，不能使用react-dom.min.js
            'react-dom':'react-dom/dist/react-dom.js',  //此处必须设置别名重定向，否则会把ReactDOM重新打包一遍,但是这样浏览器中又找不到ReactDOM  ??
            // 'react-dom':'react/lib/ReactDOM.js',  //此处必须设置别名重定向，否则会把ReactDOM重新打包一遍,跟上面效果一直
            moment:'moment/min/moment-with-locales.min.js'
        }
    },
    //externals来将依赖的库指向全局变量，从而不再打包这个库
    devServer:{
        port:8082,
        contentBase:'./dist'
    },
    module:{
        //略对已知文件的解析,提高打包速度
        noParse: [/moment-with-locales/,/jquery/],
        loaders:[
            {test:/\.jsx?$/,loader:'babel',include:path.resolve('src'),exclude:/node_modules/},
            {test:/\.scss$/,loader:ExtractTextPlugin.extract('style','css!sass'), exclude:/node_modules/}
        ]
    },
    plugins:[
        // //压缩打包的文件
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         //supresses warnings, usually from module minification
        //         warnings: false
        //     }
        // }),
        //允许错误不打断程序
        // new webpack.NoErrorsPlugin(),
        //把指定文件夹xia的文件复制到指定的目录
        // new ExtractTextPlugin('css/[name].css'),
        new webpack.optimize.CommonsChunkPlugin('common','common.js'),
        //提供全局的变量，在模块中使用无需用require引入
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            moment: "moment",
            'React':'react',
            'ReactDOM':'react-dom',
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./dist/vendors-manifest.json'),
        })

    ]
}

if(isProd){
    console.log("prod:生产环境")
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings:false
            }
        })
    )
}else{
    console.log("开发环境：",isProd,process.env.NODE_ENV)
}

module.exports = config;