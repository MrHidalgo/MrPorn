'use strict';

const { src, dest, task, watch, series } = require('gulp');

const plumber = require('gulp-plumber'),
  prefixer = require('gulp-autoprefixer'),
  scss = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps');

const configPath = require('../config/configPath'),
  configOption = require('../config/configOption');


/**
 * @description Gulp SCSS - preprocessor for creating style files.
 */
task('scss', (done) => {
  return src(configPath.src.scss + '/*.scss')
		.pipe(plumber(configOption.pipeBreaking.err))
		.pipe(sourcemaps.init())
		.pipe(scss(configOption.sassAPI).on('error', scss.logError))
		.pipe(prefixer(configOption.autoPrefixOptions))
		.pipe(sourcemaps.write('./maps', configOption.sourceMapStyle))
		.pipe(plumber.stop())
		.pipe(dest(configPath.dest.css))
});


/**
 * @description Gulp SCSS watch - keeps track of changes in files.
 */
task('scss:watch', (done) => {
  watch(configPath.src.scss + '/**', series('scss'));

  return done();
});
