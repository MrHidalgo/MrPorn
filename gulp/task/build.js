'use strict';

const { task, series, parallel } = require('gulp');

const build = (done) => {
	return parallel(
		'clean',
    'scss',
    'pug',
    'js',
		//'js_home',
    'fonts',
		'iconfont',
    'spritePNG',
    'spriteSVG',
    'vendorScript',
    'vendorStyle',
    'list-pages',
	)(done);
};

task('build', build);
