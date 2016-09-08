'use strict';

require('require-dir')('./gulpdir');

var gulp = require('gulp');

gulp.task('default',['clean'], function () {
    gulp.start('build');
});