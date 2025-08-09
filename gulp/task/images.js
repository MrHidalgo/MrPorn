'use strict';

const { src, dest, task, watch, series } = require('gulp');

const plumber = require('gulp-plumber'),
  imageMinify = require('gulp-imagemin');

const configPath = require('../config/configPath'),
  configOption = require('../config/configOption');

/**
 * @description Gulp images - copy and optimize images to the dest folder.
 */
task('images', (done) => {
  return src(configPath.src.image + '/**/*')
    .pipe(plumber(configOption.pipeBreaking.err))
    .pipe(imageMinify({
      interlaced: true,
      progressive: true,
      optimizationLevel: 5,
      svgoPlugins: [
        {removeViewBox: true},
        {cleanupIDs: false}
      ]
    }))
    .pipe(plumber.stop())
    .pipe(dest(configPath.dest.img));
});

/**
 * @description Gulp images watch - keeps track of changes in image files.
 */
task('images:watch', (done) => {
  watch(configPath.src.image + '/**/*', series('images'));

  return done();
});
