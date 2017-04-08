'use strict';

var gulp = require('gulp');

// Modules for dev env
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');

// Modules for prod env
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');

// Modules for various purpose
var runSequence = require('run-sequence');
var gulpIf = require('gulp-if');
var cache = require('gulp-cache');
var del = require('del');

// Project config objects
var devBaseDir = 'app';
var dev = {
    dir: {
        sass: devBaseDir + '/scss',
        css: devBaseDir + '/css',
        js: devBaseDir + '/js',
        images: devBaseDir + '/images',
        fonts: devBaseDir + '/fonts'
    }
};

var prodBaseDir = 'dist';
var prod = {
    dir: {
        images: prodBaseDir + '/images',
        fonts: prodBaseDir + '/fonts'
    }
};

//--------------------------------------------------------|
// Gulp tasks for development env
//--------------------------------------------------------|

// Default task
// Run Sass, Browserify and Watch tasks
gulp.task('default', function (callback) {
   runSequence(['sass', 'browserSync', 'watch'],
        callback
   )
});

// Watchers
// Watch HTML files then reload web server
// Watch Sass files then run Sass task
// Watch JavaScript files then reload web server
gulp.task('watch', ['browserSync', 'sass'], function () {
    gulp.watch(devBaseDir + '/*.html', browserSync.reload);
    gulp.watch(dev.dir.sass + '/**/*.scss', ['sass']);
    gulp.watch(dev.dir.js + '/**/*.js', browserSync.reload);
});

// Browserify config
// Spin up a web server to do live-reloading
gulp.task('browserSync', function () {
   browserSync.init({
       server: {
           baseDir: devBaseDir
       }
   })
});

// Sass task
// Transform Sass to CSS
// Reload web server
gulp.task('sass', function () {
   return gulp.src(dev.dir.sass + '/main.scss')
       .pipe(sass().on('error', sass.logError))
       .pipe(autoprefixer({
           cascade: false
       }))
       .pipe(gulp.dest(dev.dir.css))
       .pipe(browserSync.reload({
           stream: true
       }))
});

//--------------------------------------------------------|
// Gulp tasks for production env
//--------------------------------------------------------|

// Build task
// Run this task when site is ready for production
// Run Clean dist task first
// Then Sass, Useref, Images and fonts tasks
gulp.task('build', function (callback) {
    runSequence('clean:dist',
        ['sass', 'useref', 'images', 'fonts'],
        callback
    )
});

// Useref task
// Concatenate JS and CSS files called in HTML files
// Minify JS and CSS files
gulp.task('useref', function () {
    return gulp.src(devBaseDir + '/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest(prodBaseDir))
});

// Images task
// Minify images for production
// Accept PNG, JPG, GIF and SVG
gulp.task('images', function () {
    return qulp.src(dev.dir.images + '/**/*.+(png|jpg|gif|svg')
        .pipe(cache(imagemin()))
        .pipe(gulp.dest(prod.dir.images))
});

// Fonts task
// Copy fonts from app to dist
gulp.task('fonts', function () {
    return gulp.src(dev.dir.fonts + '/**/*')
        .pipe(gulp.dest(prod.dir.fonts))
});

// Clean dist task
// Delete every files and folder in dist to avoid useless files
gulp.task('clean:dist', function () {
    return del.sync(prodBaseDir)
});

//--------------------------------------------------------|
// Gulp tasks for other purposes
//--------------------------------------------------------|

// Cache clear task
// Task to clear locale cache
gulp.task('cache:clear', function (callback) {
    return cache.clearAll(callback)
});
