'use strict';

const { task } = require('gulp');

const del = require('del');

const configPath  = require('../config/configPath');


/**
 * @description Gulp clean - clean dest folder before build project.
 */
task('clean', (done) => {
	del.sync([
    configPath.dest.root + '/**/*',
    configPath.src.root + '/img/**',
    configPath.src.root + '/media/**',
    configPath.src.root + '/icon/**',
    '!' + configPath.dest.root + '/img',
    '!' + configPath.dest.root + '/img/**/*',
    '!' + configPath.dest.root + '/media',
    '!' + configPath.dest.root + '/media/**/*',
    '!' + configPath.dest.root + '/icon',
    '!' + configPath.dest.root + '/icon/**/*',
    '!' + configPath.src.root + '/img',
    '!' + configPath.src.root + '/icon',
    '!' + configPath.src.root + '/icon/**'
  ]);

	return done();
});
