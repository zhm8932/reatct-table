const gulp = require('gulp'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    sass = require('gulp-sass'),
    gutil = require('gulp-util'),
    nodemon = require('gulp-nodemon'),
    webpack = require('webpack'),
    webpackConfig = require('./webpack.config.js');
    webpackDllConfig = require('./webpack.dll.config.js');


const PATHS = {
    sass:'src/sass/**/*.scss',
    clientJs:'src/js/**/*.js',
    clientJsx:'src/js/**/*.jsx',
    html:'dist/**/*.html',
    views:'views/**/*.jade',
    js:'dist/**/*.js'
}

// scss编译后的css将注入到浏览器里实现更新
gulp.task('sass',function () {
    return gulp.src(PATHS.sass)
        .pipe(sass().on('error',sass.logError))
        .pipe(gulp.dest('dist/css'))
        .pipe(reload({stream:true}))
})

//使用DllPlugin,单独打包使用的公共文件，
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


//js文件打包
gulp.task("webpack", function(callback) {
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
gulp.task('dev:server',function (cb) {

    var called = false;
    nodemon({
        script:'./bin/www',
        ignore:['.idea','node_modules'],
        env: { 'NODE_ENV': 'development' }
    }).on('start',function () {
        console.log('started!')
        if (!called){
            cb();
            called = true;
        }
    }).on('restart', function () {
        console.log('restarted!')
    })
})

//browserSync静态服务器
gulp.task('serve',['sass','webpack','dev:server'],function () {
    browserSync.init({
        open: false,  //停止自动打开浏览器
        proxy: "localhost:4000",
        port: 4000,
        // server:{
        //     baseDir:"./dist"
        // }
    })

    gulp.watch(PATHS.sass,['sass']);
    gulp.watch([PATHS.clientJs,PATHS.clientJsx],['webpack']).on('change',reload);


    // gulp.watch(PATHS.js).on('change',reload);
    gulp.watch(PATHS.views).on('change',reload);
    gulp.watch(PATHS.html).on('change',reload);
})



gulp.task('dll',['webpack:dll']);

gulp.task('default',['serve']);