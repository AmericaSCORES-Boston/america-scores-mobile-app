'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const yargs = require('yargs');

gulp.task('eslint', () => {
  var stream = gulp.src(['**/*.js', '!node_modules/**', '!ios/', '!android/'])
    .pipe(eslint({
      quiet: true,
      globals: [
        'describe',
        'it',
        'beforeEach',
        'afterEach'
      ]
    }))
    .pipe(eslint.format());

  if (yargs.argv.failTaskOnError) {
    stream = stream.pipe(eslint.failAfterError());
  }

  return stream;
});
