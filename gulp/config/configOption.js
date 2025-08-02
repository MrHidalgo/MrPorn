const configPath = require('../config/configPath');


const configOption = {
  pipeBreaking: {
    err: configPath.errorHandler
  },

  cssMinOption: {
    specialComments: 1,
    format: 'beautify',
    level: 1
  },

  sassAPI: {
    errLogToConsole: true,
    outputStyle: 'expanded',
    sourceComments: true
  },

	stripCssCommentsOption: {
		preserve: false // Set to true if you want to preserve comments that start with /*! or /**!
	},

  autoPrefixOptions: {
    cascade: true
  },

  es6: {
    "presets": ["@babel/preset-env"],
		plugins: [
			["@babel/plugin-transform-runtime", {
				"helpers": false,
			}]
		]
		//"presets": ["env"]
  },

  svgMin: {
    js2svg: {
      pretty: true
    }
  },

  renameOption: {
    suffix: '.min'
  },

  changed: {
    firstPass: true
  },

  sourceMapStyle: {
    includeContent: true,
    sourceRoot: '../src'
  }
};


module.exports = configOption;
