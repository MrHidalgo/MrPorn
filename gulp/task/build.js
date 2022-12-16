'use strict';

const { task, series, parallel } = require('gulp');

const build = (done) => {
	return parallel(
		'clean',
    'scss',
    'pug',
    'js',
		'js_home',
		'js_netflix',
    'fonts',
		'iconfont',
    'spritePNG',
    'spriteSVG',
    'vendorScript',
    'vendorStyle',
    'vendorHomeScript',
    'list-pages',
	)(done);
};

task('build', build);
