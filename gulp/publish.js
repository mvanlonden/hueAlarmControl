'use strict';

var gulp = require('gulp');

var awspublish = require('gulp-awspublish');

var runSequence = require('run-sequence');


gulp.task('publish', function() {

  runSequence('build', function () {
    console.log('------------- build complete ------------');

    // create a new publisher
    var publisher = awspublish.create(require('../aws-credentials.json'));

    return gulp.src('./dist/**/*.*')

       // gzip, Set Content-Encoding headers and add .gz extension
      // .pipe(awspublish.gzip({ ext: '.gz' }))

      // publisher will add Content-Length, Content-Type and headers specified above
      // If not specified it will set x-amz-acl to public-read by default
      .pipe(publisher.publish())

      // create a cache file to speed up consecutive uploads
      .pipe(publisher.cache())

       // print upload updates to console
      .pipe(awspublish.reporter());

  });

});