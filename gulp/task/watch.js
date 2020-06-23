'use strict';

const { task, parallel } = require('gulp');


/**
 * @description Gulp main watch - keeps track of changes in files.
 */
const watch = (done) => {
	return parallel(
		'scss:watch',
		'pug:watch',
		'js:watch',
		'fonts:watch',
		'iconfont:watch',
		'spritePNG:watch',
		'spriteSVG:watch',
		'vendorScript:watch',
		'vendorStyle:watch',
		'list-pages:watch'
	)(done);
};


task('watch', watch);
