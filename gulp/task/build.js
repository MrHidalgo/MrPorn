'use strict';

const { task, series, parallel } = require('gulp');

// clean must complete before the producers run - in parallel it can delete
// output a task has just written.
const build = (done) => {
	return series(
		'clean',
		parallel(
    'scss',
    'pug',
    'js',
		'js_home',
		'js:standalone',
    'fonts',
		'iconfont',
    'spritePNG',
    'spriteSVG',
    'images',
    'vendorScript',
    'vendorStyle',
    'vendorHomeScript',
    'list-pages',
		),
	)(done);
};

task('build', build);
