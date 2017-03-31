'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');

// default task
gulp.task('default', function (callback) {
   runSequence(['sass', 'browserSync', 'watch'],
        callback
   )
});

// Watchers
gulp.task('watch', ['browserSync', 'sass'], function () {
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

// Browserify
gulp.task('browserSync', function () {
   browserSync.init({
       server: {
           baseDir: 'app'
       }
   })
});

// Sass to CSS task
gulp.task('sass', function () {
   return gulp.src('app/scss/**/*.scss')
       .pipe(sass())
       .pipe(gulp.dest('app/css'))
       .pipe(browserSync.reload({
           stream: true
       }))
});

// Useref task to concatenate js and css files
gulp.task('useref', function () {
   return gulp.src('app/*.html')
       .pipe(useref())
       .pipe(gulpIf('*.js', uglify()))
       .pipe(gulpIf('*.css', cssnano()))
       .pipe(gulp.dest('dist'))
});

// Images task to minify images
gulp.task('images', function () {
   return qulp.src('app/images/**/*.+(png|jpg|gif|svg')
       .pipe(cache(imagemin()))
       .pipe(gulp.dest('dist/images'))
});

// Fonts task to copy fonts from app to dist
gulp.task('fonts', function () {
   return gulp.src('app/fonts/**/*')
       .pipe(gulp.dest('dist/fonts'))
});

// Task to clean dist folder
gulp.task('clea:dist', function () {
   return del.sync('dist')
});

// Task to clear local cache
gulp.task('cache:clear', function (callback) {
    return cache.clearAll(callback)
});

gulp.task('build', function (callback) {
    runSequence('clean:dist',
        ['sass', 'useref', 'images', 'fonts'],
        callback
    )
});