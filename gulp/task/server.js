'use strict';

const { task, series, parallel } = require('gulp');

const server = require('browser-sync').create();


/**
 *
 * @type {{src, dest, errorHandler}}
 */
const configPath  = require('../config/configPath');


/**
 * @description Gulp server - create and init Browser-sync.
 */
task('server', (done) => {
  server.init({
    server: {
      baseDir: configPath.dest.root
    },
    files: ['dest/**'],
		startPath: "/listPages.html",
    port: 3000,
    logLevel: 'info', // 'debug', 'info', 'silent', 'warn'
    logConnections: false,
    logFileChanges: true,
    open: true,
    notify: false,
    ghostMode: false,
    online: true,
    tunnel: false
  });

  return done();
});
