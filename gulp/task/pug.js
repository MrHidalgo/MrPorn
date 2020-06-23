'use strict';

const { src, dest, task, watch, series } = require('gulp');

const pug = require('gulp-pug'),
	plumber = require('gulp-plumber'),
	frontMatter = require('gulp-front-matter');

const configPath = require('../config/configPath'),
	configOption = require('../config/configOption');


/**
 * @description Gulp PUG/JADE - preprocessor for creating html files.
 */
const renderPug = () => {
	return src(configPath.src.templates + '/*.pug')
		.pipe(plumber(configOption.pipeBreaking.err))
		.pipe(frontMatter({property: 'data'}))
		.pipe(pug({pretty: true}))
		.pipe(plumber.stop())
		.pipe(dest(configPath.dest.html));
};

task('pug', function() {
	return renderPug();
});


/**
 * @description Gulp PUG/JADE watch - keeps track of changes in files.
 */
task('pug:watch', (done) => {
	watch([
		configPath.src.templates + '/**',
		configPath.src.templates + '/**/**',
		configPath.src.templates + '/**/**/**',
	], series('pug')).on('all', (event, filepath) => {});

	return done();
});
