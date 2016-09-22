const gulp = require('gulp'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    sass = require('gulp-sass'),
    gutil = require('gulp-util'),
    webpack = require('webpack'),
    webpackConfig = require('./webpack.config.js');
    webpackDllConfig = require('./webpack.dll.config.js');


const PATHS = {
    sass:'src/sass/**/*.scss',
    clientJs:'src/js/**/*.js',
    clientJsx:'src/js/**/*.jsx',
    html:'dist/**/*.html',
    js:'dist/**/*.js',
    webpackConfig:'webpack.config.js'
}
gulp.task('sass',function () {
    return gulp.src(PATHS.sass)
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
        .pipe(reload({stream:true}))
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

gulp.task('serve',['sass','webpack'],function () {
    browserSync.init({
        open: false,  //停止自动打开浏览器
        server:{
            baseDir:"./dist"
        }
    })
})

gulp.task('watch',function () {
    gulp.watch(PATHS.sass,['sass']);
    gulp.watch([PATHS.clientJs,PATHS.clientJsx],['webpack']);
    gulp.watch(PATHS.webpackConfig,['webpack']);


    gulp.watch(PATHS.js).on('change',reload);
    gulp.watch(PATHS.html).on('change',reload);
})


gulp.task('dll',['webpack:dll']);

gulp.task('default',['serve','watch']);