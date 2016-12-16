let webpackConfig = require('./karma.webpack.config.js');

module.exports = function (config) {
	'use strict';
	let configuration = {

		basePath: '',

		frameworks: ['jasmine'],

		files: [
			'./public/js/**/*.js',
			'./test/js/**/*.spec.js'
		],

        exclude: [
            './public/js/canvas.js'
        ],

		reporters: ['progress', 'coverage'],
		preprocessors: {
			'./public/js/airdrone.js': ['webpack', 'sourcemap', 'coverage']
		},

		webpack: webpackConfig,

		port: 9876,
		colors: true,
		autoWatch: false,
		singleRun: false,

		logLevel: config.LOG_INFO,
		plugins: [
			'karma-jasmine',
			'karma-chrome-launcher',
			'karma-coverage',
			'karma-webpack',
			'karma-sourcemap-loader'
		],
		browsers: ['Chrome'],
		customLaunchers: {
			Chrome_travis_ci: {
				base: 'Chrome',
				flags: ['--no-sandbox']
			}
		},
		coverageReporter: {
			type: 'html',
			dir: 'public/coverage/'
		}
	};

	if (process.env.TRAVIS) {
		configuration.browsers = ['Chrome_travis_ci']
	}

	config.set(configuration)
};
