'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const rollup = require('gulp-rollup');

gulp.task('default', ['babel'], () => {
    return gulp.run('bundle-message');
});

gulp.task('bundle-message', () => {
    return gulp.src('./dist/**/*.js')
        .pipe(rollup({
            entry: './dist/sapi-message.js',
            moduleName: 'SAPIMessage',
            format: 'umd'
        }))
        .pipe(gulp.dest('./dist'));
});
 
gulp.task('babel', () => {
    return gulp.src('./src/**.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'));
});
