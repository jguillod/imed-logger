// idea from https://github.com/czy88840616/logc/blob/master/index.js
/*
(c) Copyright 2017 Joël Guillod <joel.guillod@gmail.com>. All Rights Reserved.

USAGE : see README
*/


const colors = require('colors');

var _level = 'info';
var _theme = {
	error: ["white", "bold", "bgRed"],
	warn: ["yellow", "bold"],
	info: ["cyan", "bold"],
	verbose: ["blue", "bold"],
	debug: ["magenta", "bold"],
	silly: ["green"]
};

const levels = {
	// Logging levels conform to the severity ordering specified by RFC5424: severity of all levels is assumed to be numerically ascending from most important to least important.
	error: 0,
	warn: 1,
	info: 2,
	verbose: 3,
	debug: 4,
	silly: 5
};

// const ORNAMENTS = {
// 	colors: ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white', 'gray', 'grey'],
// 	background: ['bgBlack', 'bgRed', 'bgGreen', 'bgYellow', 'bgBlue', 'bgMagenta', 'bgCyan', 'bgWhite'],
// 	styles: ['reset', 'bold', 'dim', 'italic', 'underline', 'inverse', 'hidden', 'strikethrough'],
// 	extras: ['rainbow', 'zebra', 'america', 'trap', 'random']
// };

if (true) {
	let util = require('util');
	inspect = function(obj, options = {
		colors: true
	}) {
		console.log(prefix('inspect').black.bold, util.inspect(obj, options));
	}
} else {
	inspect = function inspect(obj, options) {
		console.log.apply(console, [prefix('inspect').red.bold]);
		console.dir(obj, options || {
			colors: true
		});
	}
}

/**
 * @module
 * @name imed-logger
 */

module.exports = {
	error: error,
	warn: warn,
	info: info,
	verbose: verbose,
	debug: debug,
	silly: silly,

	log: info, // log is NOT ANYMORE AN alias to info => will be like in winston
	inspect: inspect,
	assert: assert,
	silent: silent, // usefull to silent a function in a module: { silent: debug, info } = require('imed-logger'); => {/* silent: */ debug, info } =...


	/**
	 * Get or set console level.
	 * @example <caption>Example usage of level.</caption>
	 * let level = logger.level(); // => returns "info"
	 * loggel.level('error'); // => returns logger
	 * @param {String} [level] - If level is defined, set the given level, otherwise returns the current level
	 * @returns {String|Object} - Returns the String level if no arguments has bveen provided, otherwise returns the logger.
	 */
	level: function(level) {
		if (arguments.length === 0) {
			return _level;
		}
		switch (level) {
			case 'silly':
				this.silly = silly;
			case 'debug':
				this.debug = debug;
			case 'verbose':
				this.verbose = verbose;
			case 'info':
				this.info = info;
			case 'warn':
				this.warn = warn;
			case 'error':
				this.error = error;
		}
		switch (level) {
			case 'error':
				this.warn = silent;
			case 'warn':
				this.info = silent;
			case 'info':
				this.verbose = silent;
			case 'verbose':
				this.debug = silent;
			case 'debug':
				this.silly = silent;
		}
		_level = level;
		return this;
	},

	/**
	 * Set a theme for logging levels
	 * @param {Object} theme - see [colors.js](https://github.com/Marak/colors.js) theme.
	 * @returns {Object} - returns the logger (this).
	 * @example <caption>Example usage of setThem.</caption>
	 * logger.setTheme({
	 *   error: "red",
	 *   warn: ["yellow", "bold"],
	 *   info: ["cyan", "bold"],
	 *   verbose: ["blue", "bold"],
	 *   debug: "magenta",
	 *   silly: "rainbow"
	 * };
	 *
	 * logger.setTheme({error: ["white", "bold", "bgRed"]})
	 */

	setTheme: function(theme) {
		colors.setTheme(theme);
		return this;
	}
}

/**
 * Log to console
 * @param {*} args - Any console arguments
 * @deprecated
 */
function log(...args) {
	console.warn("imed-logger#log => has been deprecated : DO NOT USE ANYMORE");
	info(...args);
}

/**
 * Log error to console
 * @param {*} args - Any console arguments
 */
function error(message, args) {
	console.log.apply(console, concat(prefix('error').error + ' ‼️  ' + message, arguments));
}

/**
 * Log any warn message to console
 * @param {*} args - Any console arguments
 */
function warn(message, args) {
	console.log.apply(console, concat(prefix('warn').warn + ' ⚠️  ' + message, arguments));
}

/**
 * Log to console
 * @param {*} args - Any console arguments
 */
function info(message, args) {
	console.log.apply(console, concat(prefix('info').info + ' ' + message, arguments));
}

/**
 * Log as verbose to console
 * @param {*} args - Any console arguments
 */
function verbose(message, args) {
	console.log.apply(console, concat(prefix('verbose').verbose + ' ' + message, arguments));
}

/**
 * Log as debug to console
 * @param {*} args - Any console arguments
 */
function debug(message, args) {
	console.log.apply(console, concat(prefix('debug').debug + ' ' + message, arguments));
}

/**
 * Log as silly to console
 * @param {*} args - Any console arguments
 */
function silly(message, args) {
	console.log.apply(console, concat(prefix('silly').silly + ' ' + message, arguments));
}

/**
 * Make a console assert.
 * @param {*} args - Any console arguments
 */
function assert(assertion, message, ...args) {
	if (assertion != true) {
		console.log.apply(console, [prefix('assert').red.bold + ' failed :']);
		console.assert(assertion, message, ...args);
	}
}

/**
 * Do not log anythins. see usage in example.
 * @param {*} args - Any console arguments
 * @example <caption>Example usage of silent.</caption>
 * const { silent: log, debug} = require('imed-logger');
 * log('this message will not be log because silent will be used');
 * debug('this message will be logged as a debug message');
 */
function silent() {}


/**
 * The prefix for any logging message.
 * @private
 * @param {String} level - The console logging level.
 */
function prefix(level) {
	return level, '[' + level + '] ' + new Date().toLocaleString();
}

/**
 * A utility.
 * @private
 * @param {String} msg - Actually the first console argument.
 * @param {*} args - Any subsequent console arguments.
 */
function concat(msg, args) {
	return [msg].concat(Array.prototype.slice.call(args, 1));
}

module.exports.level(_level).setTheme(_theme);
