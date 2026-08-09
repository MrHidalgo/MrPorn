const configPath = require('../config/configPath');


const configOption = {
  pipeBreaking: {
    err: configPath.errorHandler
  },

  cssMinOption: {
    specialComments: 0,
    advanced: false
  },

  sassAPI: {
    errLogToConsole: true,
    outputStyle: 'compressed',
    sourceComments: false
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
  },

  uglifyOptions: {
    compress: {
      drop_console: false,
      drop_debugger: true
    },
    output: {
      comments: false
    }
  },

  terserOptions: {
    compress: {
      drop_console: false,
      drop_debugger: true
    },
    format: {
      comments: false
    }
  }
};


module.exports = configOption;
