'use strict';

const { src, dest, task, watch, series } = require('gulp');

const plumber = require('gulp-plumber'),
  concat = require('gulp-concat'),
  order = require("gulp-order");

const configPath = require('../config/configPath'),
  configOption = require('../config/configOption');


/**
 * @description Gulp vendor style - concatenation of additional libraries.
 */
task('vendorStyle', (done) => {
  let files = [];

  files.push(
    configPath.src.vendorStyle + "/*.css",
    configPath.src.vendorStyle + "/**/*.css",
    "!" + configPath.src.vendorStyle + "/**/_**.css"
  );

  return src(files)
		.pipe(plumber(configOption.pipeBreaking.err))
		.pipe(order([
				'normalize.css',
				'*'
		]))
		.pipe(concat('vendor.css'))
		.pipe(dest(configPath.dest.css))
});


/**
 * @description Gulp vendor style watch - keeps track of changes in files.
 */
task('vendorStyle:watch', (done) => {
  watch(configPath.src.vendorStyle + '/**', series('vendorStyle'));

  return done();
});
