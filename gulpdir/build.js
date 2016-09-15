'use strict';

var gulp = require('gulp'),
    merge = require('merge-stream'),
    plugins = require('gulp-load-plugins')();

var runSequence = require('run-sequence');

gulp.task('jade', function () {
    return gulp.src('./src/**/*.jade')
        .pipe(plugins.jade({
            pretty : '    '
        }))
        .pipe(gulp.dest("./src"));
});

gulp.task('html2js', function () {
    return gulp.src(['./src/**/*.html','!./src/index.html'])
        .pipe(plugins.ngHtml2js({
            moduleName: "universalEditor.YandexMaps.templates"
        }))
        .pipe(plugins.rename({
            suffix: '.tpl'
        }))
        .pipe(gulp.dest('./src/'));
});

gulp.task('js', function () {
    var module = gulp.src(['./src/module/yandex-maps-plugin.module.js','./src/*.js','./src/**/*.js'])
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'))
        .pipe(plugins.concat("yandex-maps-plugin.js"))
       .pipe(plugins.rename({
            suffix: '.min'
        }))
        .pipe(plugins.uglify())
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('css', function () {
    return gulp.src(['./src/*.scss','./src/**/*.scss'])
        .pipe(plugins.sass())
        .pipe(plugins.concat("yandex-maps-plugin.css"))
        .pipe(plugins.uglifycss({
            maxLineLen : 80
        }))
        .pipe(plugins.rename({
            suffix : '.min'
        }))
        .pipe(gulp.dest("./dist"));
});

gulp.task('ya-map-js',function(){
    return gulp.src('./bower_components/ya-map/ya-map-2.1.min.js')
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('build',function(){
    runSequence(
        'jade',
        'html2js',
        'js',
        'ya-map-js',
        'css'
    );
});