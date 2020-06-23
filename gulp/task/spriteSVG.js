'use strict';

const { src, dest, task, watch, series } = require('gulp');

const plumber = require('gulp-plumber'),
  svgSprite = require('gulp-svg-sprite'),
  svgMinify = require('gulp-svgmin'),
  cheerio = require('gulp-cheerio'),
  replace = require('gulp-replace');

const configPath  = require('../config/configPath'),
  configOption    = require('../config/configOption');

const srcPath = {
  0: [configPath.src.icon + '/*.svg'],
  "sprite" : "../sprite.svg",
  "destSpriteSCSS" : "../../../src/scss/_generated/_spriteSVG.scss",
  "templateSCSS" : "./src/scss/_generated/_spriteSVG_template.scss"
};


/**
 * @description Gulp sprite SVG - generated SVG sprite.
 */
task('spriteSVG', (done) => {
  return src(srcPath[0])
      .pipe(plumber(configOption.pipeBreaking.err))
      .pipe(svgMinify(configOption.svgMin))
      .pipe(cheerio({
        run: function ($) {
          $('[style]').removeAttr('style');
          $('[title]').removeAttr('title');
					$('[desc]').removeAttr('desc');
        },
        parserOptions: {xmlMode: true}
      }))
      .pipe(replace('&gt;', '>'))
      .pipe(svgSprite({
        mode: {
          symbol: {
            sprite: srcPath["sprite"],
            render: {
              scss: {
                dest: srcPath["destSpriteSCSS"],
                template: srcPath["templateSCSS"]
              }
            },
            example: false,
          }
        },
				shape: {
					dimension: {
						precision: 2,
						attributes: false
					},
					spacing: {
						padding: 10
					},
					transform: ['svgo']
				}
      }))
      .pipe(dest(configPath.dest.img));
});


/**
 * @description Gulp sprite SVG watch - keeps track of changes in files.
 */
task('spriteSVG:watch', (done) => {
  watch(srcPath[0], series('spriteSVG'));

  return done();
});
