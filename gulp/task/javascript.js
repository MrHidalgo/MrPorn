'use strict';

const { src, dest, task, watch, series } = require('gulp');

const plumber = require('gulp-plumber'),
  concat = require('gulp-concat'),
  order = require("gulp-order"),
  babel = require('gulp-babel');

const configPath  = require('../config/configPath'),
  configOption    = require('../config/configOption');


/**
 * @description Gulp Javascript - converting files to current standards.
 */
task('js', (done) => {
  return src([
			configPath.src.js + '/*.js',
			configPath.src.js + '/**/*.js',
			'!' + configPath.src.js + '/**/_**.js',
			'!' + configPath.src.js + '/**/frontpage.js',
		'!' + configPath.src.js + '/_frontpage/*.js',
		'!' + configPath.src.js + '/_lib/swiper.js',
		])
		.pipe(plumber(configOption.pipeBreaking.err))

		.pipe(order([
			"*",
			"_lib/**",
			"_window/**",
			"_document/**",
		]))
		.pipe(concat('app.js'))
		.pipe(babel(configOption.es6))
		.pipe(plumber.stop())
		.pipe(dest(configPath.dest.js))
});

task('js_home', (done) => {
	return src([
		configPath.src.js + '/*.js',
		//configPath.src.js + '/**/*.js',
		configPath.src.js + '/_document/*.js',
		configPath.src.js + '/_lib/*.js',
		configPath.src.js + '/_window/*.js',
		'!' + configPath.src.js + '/**/_**.js',
	])
		.pipe(plumber(configOption.pipeBreaking.err))

		.pipe(order([
			"*",
			"_lib/**",
			"_window/**",
			"_document/**",
			"_frontpage/**",
		]))
		.pipe(concat('frontpage.js'))
		.pipe(babel(configOption.es6))
		.pipe(plumber.stop())
		.pipe(dest(configPath.dest.js))
});

task('js_netflix', (done) => {
	return src([
		configPath.src.js + '/*.js',
		configPath.src.js + '/**/*.js',
		'!' + configPath.src.js + '/**/_**.js',
		'!' + configPath.src.js + '/_lib/frontpage.js',
	])
		.pipe(plumber(configOption.pipeBreaking.err))

		.pipe(order([
			"*",
			"_lib/**",
			"_window/**",
			"_document/**",
			"_frontpage/**",
		]))
		.pipe(concat('nf.js'))
		.pipe(babel(configOption.es6))
		.pipe(plumber.stop())
		.pipe(dest(configPath.dest.js))
});


/**
 * @description Gulp Javascript watch - keeps track of changes in files.
 */
task('js:watch', (done) => {
  watch(configPath.src.js + '/**', series('js', 'js_home', 'js_netflix'));

	return done();
});

task('js_home:watch', (done) => {
	watch(configPath.src.js + '/**', series('js'));

	return done();
});
