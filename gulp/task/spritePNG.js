'use strict';

const { src, dest, task, watch, series } = require('gulp');

const plumber = require('gulp-plumber'),
  spriteSmith = require('gulp.spritesmith'),
  imageMinify = require('gulp-imagemin'),
  buffer = require('vinyl-buffer'),
  merge = require('merge-stream');

const configPath  = require('../config/configPath'),
  configOption    = require('../config/configOption');

const srcPath = {
  0: [configPath.src.icon + '/*.png'],
  1: [configPath.src.icon + '/**']
};


/**
 * @description Gulp sprite SVG - generated PNG sprite.
 */
task('spritePNG', (done) => {
  const spImgPath = '../img/sprite.png',
    retinaspImgPath = '../img/sprite@2x.png',
    destImg = './dest/img/',
    destCss = './src/scss/_generated/';

  let spriteData = src(srcPath[0])
      .pipe(plumber(configOption.pipeBreaking.err))
      .pipe(spriteSmith(
        {
          imgName         : 'sprite.png',
          imgPath         : spImgPath,
          retinaImgPath   : retinaspImgPath,
          cssName         : '_spritePNG.scss',
          cssTemplate     : './src/scss/_generated/handlebarsStr.css.handlebars',
          retinaSrcFilter : ['./src/icon/*@2x.png'],
          retinaImgName   : 'sprite@2x.png',
          algorithm       : 'binary-tree',
          padding         : 5
        }
      ));


  let imgStream = spriteData
    .img
    .pipe(buffer())
    .pipe(imageMinify({interlaced: true}))
    .pipe(dest(destImg));

  let cssStream = spriteData
    .css
    .pipe(dest(destCss));

  return merge(imgStream, cssStream)
});


/**
 * @description Gulp sprite PNG watch - keeps track of changes in files.
 */
task('spritePNG:watch', (done) => {
  watch(srcPath[1], series('spritePNG'));

  return done();
});
