'use strict';

const { src, dest, task, watch, series } = require('gulp');

const plumber = require('gulp-plumber'),
  concat = require('gulp-concat'),
	browserify = require('browserify'),
	source     = require('vinyl-source-stream'),
  order = require("gulp-order");

const configPath = require('../config/configPath'),
  configOption = require('../config/configOption');


/**
 * @description Gulp vendor script - concatenation of additional libraries.
 */
task('vendorScript', function() {
  let files = [];

  files.push(
    configPath.src.vendorScript + "/*.js",
    "!" + configPath.src.vendorScript + "/*.js",
    configPath.src.vendorScript + "/**/*.js",
    "!" + configPath.src.vendorScript + "/**/_**.js",
		//"!" + configPath.src.vendorScript + "/_shared/popmotion.min.js"
  );

  return src(files)
		.pipe(plumber(configOption.pipeBreaking.err))
		.pipe(order([
			//'jquery.js',
			'popper.js',
			'*'
		]))
		.pipe(concat('vendor.js'))
		.pipe(dest(configPath.dest.js))



	/*return browserify(files)
		.transform("babelify", {plugins: ["transform-runtime"],presets: [["env"]]})
		.bundle()
		.pipe(plumber(configOption.pipeBreaking.err))
		.pipe(order([
			'jquery.js',
			'popper.js',
			'*'
		]))
		.pipe(concat('vendor.js'))
		.pipe(dest(configPath.dest.js))*/
});


/**
 * @description Gulp vendor script watch - keeps track of changes in files.
 */
task('vendorScript:watch', (done) => {
  watch(configPath.src.vendorScript + '/**', series('vendorScript'));

  return done();
});



task('vendorHomeScript', function() {
	let files = [];

	files.push(
		configPath.src.vendorScript + "/*.js",
		"!" + configPath.src.vendorScript + "/*.js",
		configPath.src.vendorScript + "/**/*.js",
		"!" + configPath.src.vendorScript + "/**/_**.js"
	);

	return src(files)
		.pipe(plumber(configOption.pipeBreaking.err))
		.pipe(order([
			//'jquery.js',
			'popper.js',
			'*'
		]))
		.pipe(concat('vendor_home.js'))
		.pipe(dest(configPath.dest.js))

});
