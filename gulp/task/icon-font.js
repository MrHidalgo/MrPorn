'use strict';

const { src, dest, task, watch, series } = require('gulp');

const iconfont = require('gulp-iconfont'),
	iconfontCss = require('gulp-iconfont-css'),
	runTimestamp = Math.round(Date.now() / 1000);

const fontName = 'iconFont',
	configPath = require('../config/configPath');


/**
 * @description Gulp iconfont - Create fonts from several SVG icons.
 */
task('iconfont', function(){
	return src(configPath.src.iconFonts + '/*.svg')
		.pipe(iconfontCss({
			fontName: fontName,
			path: 'src/scss/_generated/_iconFont_template.scss',
			targetPath: '../scss/_generated/_spriteFont.scss',
			fontPath: '../fonts/'
		}))
		.pipe(iconfont({
			fontName: fontName,
			formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
			normalize: true,
			fontHeight: 1000,
			timestamp: runTimestamp
		}))
		.pipe(dest(configPath.src.fonts));
});


/**
 * @description Gulp iconfont watch - keeps track of changes in files.
 */
task('iconfont:watch', (done) => {
	watch(configPath.src.iconFonts + '/**', series('iconfont'));

	return done();
});
