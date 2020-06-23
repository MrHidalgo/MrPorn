'use strict';

const { src, dest, task, watch, series } = require('gulp');

const configPath  = require('../config/configPath');



/**
 * @description Gulp fonts - copy fonts to the dest folder.
 */
task('fonts', (done) => {
  return src(configPath.src.fonts + '/**.*')
		.pipe(dest(configPath.dest.fonts));
});


/**
 * @description Gulp fonts watch - keeps track of changes in files.
 */
task('fonts:watch', (done) => {
  watch(configPath.src.fonts + '/**', series('fonts'));

  return done();
});
