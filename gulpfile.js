const gulp = require('gulp'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    sass = require('gulp-sass'),
    gutil = require('gulp-util'),
    clean = require('gulp-clean'),
    uglify = require('gulp-uglify'),
    webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    webpackStream = require('webpack-stream'),   //webpack的gulp插件
    named = require('vinyl-named'),      //该插件保证webpack生成的文件名能够和原文件对上
    webpackConfig = require('./webpack.config.js');
    webpackDllConfig = require('./webpack.dll.config.js');


const PATHS = {
    sass:'src/sass/**/*.scss',
    clientJs:'src/js/**/*.js',
    clientJsx:'src/js/**/*.jsx',
    html:'dist/**/*.html',
    js:'dist/js/**/*',
    css:'dist/css/**/*.css',
    webpackConfig:'webpack.config.js'
}
gulp.task('sass',function () {
    return gulp.src(PATHS.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
        .pipe(reload({stream:true}))
})

gulp.task('cssmin',function () {
    return gulp.src(PATHS.sass)
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
        .pipe(reload({stream:true}))
})

gulp.task('clean',function () {
    return gulp.src([PATHS.js,PATHS.css], {read: false})
        .pipe(clean());
})
gulp.task("webpack:dll", function(callback) {
    var myConfig = Object.create(webpackDllConfig);
    webpack(myConfig,function (err,stats) {
        if(err) throw new gutil.PluginError('webpack:dll',err)
        gutil.log('[webpack:dll]',stats.toString({
            colors:true,
            hash: false,
            chunks: false,
            children: false,
            progress:true
        }));
        callback();
    })
});


gulp.task("webpack", function(callback) {
    // var myConfig = Object.create(webpackConfig);
    // webpack(myConfig,function (err,stats) {
    //     if(err) throw new gutil.PluginError('webpack',err)
    //     gutil.log('[webpack]',stats.toString({
    //         colors:true,
    //         hash: false,
    //         chunks: false,
    //         children: false,
    //         progress:true
    //     }));
    //     callback();
    // })

    webpackDev(callback);
});



var devConfig = Object.create(webpackConfig);
var devCompiler = webpack(devConfig);

//使用webpack 监控js改变并打包
function webpackDev(callback) {

    // webpack(myConfig).run(function (err,stats) {
    devCompiler.run(function (err,stats) {
        if(err) throw new gutil.PluginError('webpackDev',err);
        gutil.log("[webpackDev]",stats.toString({
            colors:true,
            hash: true,
            chunks: false,
            children: false,
            warnings:false
        }))
        callback&&callback();
    })
}

var devStreamCompiler = webpackStream(devConfig);

//使用webpack-stream 监控文件打包
function webpackStreamCompiler() {
    return webpackStream(webpackConfig,null,function (err,stats){
        if(err) throw new gutil.PluginError('webpackStream',err);
        gutil.log('[webpackStream]',stats.toString({
            colors:true,
            hash: false,
            chunks: false,
            children: false,
            progress:true,
            warnings:false
        }));
    })
}

//js打包
gulp.task('webpackStream', function(){
    gulp.src([PATHS.clientJs,PATHS.clientJsx])
        .pipe(named())
        .pipe(webpackStreamCompiler())
        .pipe(gulp.dest('dist/js'))
        .pipe(reload({stream:true}))
});


//js打包压缩
gulp.task('webpackStream:min', function(){
    gulp.src([PATHS.clientJs,PATHS.clientJsx])
        .pipe(named())
        .pipe(webpackStreamCompiler())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(reload({stream:true}))
});


//browser-sync服务
gulp.task('serve',function () {
    browserSync.init({
        open: false,  //停止自动打开浏览器
        port:4000,
        server:{
            baseDir:"./dist"
        }
    })
})

/*
webpack和webpack-stream初始打包速度没有区别

但是监控文件修改时：webppack的run()方法自动打包速度是webpack-stream速度7倍左右  100ms  vs  700ms

* */


//webpack打包监控js
gulp.task('watch',function () {
    gulp.watch(PATHS.sass,['sass']);
    gulp.watch(PATHS.webpackConfig,['webpack']);

    // gulp.watch([PATHS.clientJs,PATHS.clientJsx],webpackDevelopment);
    gulp.watch([PATHS.clientJs,PATHS.clientJsx],['webpack']);                //webpackDev 任务监控文件打包速度 在100ms左右 ,页面第一次修改时不会自动刷新
    // gulp.watch([PATHS.clientJs,PATHS.clientJsx],['webpackStream']);   //webpackStream 任务监控文件打包速度 在700ms  左右
    gulp.watch(PATHS.js).on('change',reload);
    gulp.watch(PATHS.html).on('change',reload);
})


//webpack-stream打包监控js
gulp.task('watch:ws',function () {
    gulp.watch(PATHS.sass,['sass']);

    gulp.watch([PATHS.clientJs,PATHS.clientJsx],['webpackStream']);   //webpackStream 任务监控文件打包速度 在700ms  左右
    gulp.watch(PATHS.html).on('change',reload);
})



gulp.task('dll',['webpack:dll']);

// gulp.task('default',['serve','sass','webpackStream','watch']);


gulp.task('default',['sass','webpack','watch','serve']);
gulp.task('dev',['serve','cssmin','webpackStream:min','watch']);

gulp.task('ws',['sass','webpackStream','watch:ws','serve']);