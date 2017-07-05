module.exports = function (config) {
	const path = require('path');
	config.set({
		failOnEmptyTestSuite: false,

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '../../',


		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: [
			'jasmine',
			'chai',
		],


		// list of files / patterns to load in the browser
		files: [
			'tests/**/*.js',
		],


		// list of files to exclude
		exclude: [
			'tests/support/**/*.js',
		],


		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			'tests/**/*.js': ['rollup'],
		},


		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: [
			'progress',
			'coverage',
		],


		// web server port
		port: 9876,


		// enable / disable colors in the output (reporters and logs)
		colors: true,


		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,


		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: [
			'Chrome',
		],


		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: true,

		// Concurrency level
		// how many browser should be started simultaneous
		concurrency: 1,

		rollupPreprocessor: {
			plugins: [
				require('karma-coverage-istanbul-reporter'),
				require('rollup-plugin-istanbul')({
					exclude: ['tests/**/*.js']
				}),
				require('rollup-plugin-mockr')(require('../mockr/default')),
				require('rollup-plugin-commonjs')(),
				require('rollup-plugin-node-resolve')({
					jsnext: true,
					main: false
				})
			],
			format: 'iife'
		},

		jsonFixturesPreprocessor: {
			variableName: '__json__'
		},

		coverageReporter: {
			reporters: [
				{type: 'text-summary'},
				{type: 'lcovonly'},
				'coverage-istanbul'
			]
		},
		coverageIstanbulReporter: {
			reports: ['html', 'lcovonly', 'text-summary'],
			dir: path.join('../', 'coverage'),
			fixWebpackSourcePaths: true,
			skipFilesWithNoCoverage: true,
			'report-config': {
				html: {
					subdir: 'html',
				},
			}
		},
	});
};
