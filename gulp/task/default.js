'use strict';

const { task, series } = require('gulp');

const _default = (done) => {
	return series(
		'build',
		'watch',
		'server'
	)(done);
};

task('default', _default);
