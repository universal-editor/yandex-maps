'use strict';

var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')();

plugins.del = require('del');

gulp.task('clean', function () {
    return plugins.del([
        './dist/**/*'
    ]);
});