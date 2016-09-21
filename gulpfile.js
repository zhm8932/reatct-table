const gulp = require('gulp'),
    browserSync = require('browser-sync'),   //自动刷新浏览器
    reload = browserSync.reload,
    sass = require('gulp-sass'),             //sass编译
    minifycss = require('gulp-minify-css'),  //css压缩
    autoprefixer = require('gulp-autoprefixer'), //处理浏览器的css兼容性
    clean = require('gulp-clean'),           //删除文件
    gutil = require('gulp-util'),
    nodemon = require('gulp-nodemon'),
    webpack = require('webpack'),
    webpackConfig = require('./webpack.config.js');
    webpackDllConfig = require('./webpack.dll.config.js')


const PATHS = {
    sass:'src/sass/**/*.scss',
    clientJs:'src/js/**/*.js',
    clientJsx:'src/js/**/*.jsx',
    html:'dist/**/*.html',
    views:'views/**/*.jade',
    js:'dist/js/**/*.js',
    css:'dist/css**/*.css'
};

// scss编译后的css将注入到浏览器里实现更新
gulp.task('sass',function () {
    return gulp.src(PATHS.sass)
        .pipe(sass().on('error',sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('dist/css'))
        .pipe(reload({stream:true}))
})

//css压缩；
gulp.task('cssmin',function () {
    return gulp.src(PATHS.sass)
        .pipe(sass().on('error',sass.logError))
        .pipe(autoprefixer())
        .pipe(minifycss({
            keepSpecialComments:'*'  ////保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(gulp.dest('dist/css'))

})


//清空css,js;
gulp.task('clean',function () {
    gulp.src([PATHS.js,PATHS.css],{read:false})
        .pipe(clean())
})


//使用DllPlugin,单独打包使用的公共文件，
gulp.task("webpack:dll", function(callback) {
    console.log("webpackDllConfig")
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


//js文件打包
gulp.task("webpack", function(callback) {
    console.log("webpackConfig")
    var myConfig = Object.create(webpackConfig);
    webpack(myConfig,function (err,stats) {
        if(err) throw new gutil.PluginError('webpack',err)
        gutil.log('[webpack]',stats.toString({
            colors:true,
            hash: false,
            chunks: false,
            children: false,
            progress:true
        }));
        callback();
    })
});

//dev server
//启动express 并添加browserSync支持
gulp.task('express:server',function (cb) {

    var called = false;
    nodemon({
        script:'./bin/www',  //启动node服务！！
        ignore:['.idea','node_modules'],
        env: { 'NODE_ENV': 'development' }
    }).on('start',function () {
        console.log('started!');
        if (!called){
            cb();
            called = true;
        }
    }).on('restart', function () {
        console.log('restarted!')
    })
})

//browserSync静态服务器
gulp.task('browser:server',function () {
    browserSync.init({
        open: false,  //停止自动打开浏览器
        proxy: "localhost:4000",  //访问http://localhost:4001/
        port: 4000,
        // server:{
        //     baseDir:"./dist"
        // }
    })
})


gulp.task('serve',['sass','webpack','dev:server'],function () {
    browserSync.init({
        open: false,  //停止自动打开浏览器
        proxy: "localhost:4000",
        port: 4000,
        // server:{
        //     baseDir:"./dist"
        // }
    })
})


gulp.task('watch',function () {
    gulp.watch(PATHS.sass,['sass']);
    gulp.watch([PATHS.clientJs,PATHS.clientJsx],['webpack']);
    // gulp.watch([PATHS.clientJs,PATHS.clientJsx],['webpack']).on('change',reload);


    gulp.watch(PATHS.js).on('change',reload);
    gulp.watch(PATHS.views).on('change',reload);
    gulp.watch(PATHS.html).on('change',reload);
})

gulp.task('dll',['webpack:dll']);

// gulp.task('default',['serve','watch']);
gulp.task('default',['browser:server','sass','webpack','express:server','watch']);
gulp.task('prod',['browser:server','cssmin','webpack','express:server']);