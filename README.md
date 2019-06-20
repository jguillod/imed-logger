# imed-logger


A small library providing utility methods to log messages into console.

## Installation ##

	npm install imed-logger --save

## Usage ##	
	
	const {
		error,
		warn,
		info,
		verbose,
		debug,
		silly,
		assert,
		inspect
	} = require('imed-logger'); // => levels: info, debug, warn, error
	
	const {
		error,
		warn
	} = require('imed-logger').level('warn'); // => levels: warn, error

To disable a method for a module some function use the `silent` function, e.g.:

	const {
		silent: info,
		debug,
		silent: warn
	} = require('imed-logger'); // => will log on debug() but not on info() nor on warn()
	
	info('this message will not be log because silent is used');
	debug('this message will be logged as a debug message');
	warn('this message will not be log because silent is used');
	

### Levels ###

Levels order is :

	error > warn > info > verbose > debug > silly

Default level is `info`. You can change level on runtime with:

	logger.level('warn'); // => only warn and error will then actually log to console.

  or get the current level with:

	logger.level(); // => 'warn'

### Theme : colors and styles ###

To change default colors, call `setTheme` with one or more levels colorization

	logger.setTheme({
		error: ["white", "bold", "bgRed"],
		warn: ["yellow", "bold"],
		info: ["cyan", "bold"],
		verbose: ["blue", "bold"],
		debug: "magenta",
		silly: "rainbow"
	};
	
For instance, 

	logger.setTheme({'silly': ['white', 'bold', 'bgBlue']});
	logger.silly("a silly message");

results in&nbsp;:
	
<code><span style="color:white;font-weight:bold;background-color:blue">[silly] 2019-6-20 12:01:04</span> a silly message</code>
	
For more information on text and background colors, styles and extras, see [https://github.com/Marak/colors.js](https://github.com/Marak/colors.js).
	
To disable colors you can pass the following arguments in the command line to your application:

	node myapp.js --no-color


## Tests ##

	npm test

## Documentation ##

	npm run docs

will generate the documentation and open its `index.html` file. It's a shortcut of:

	npm run generate-docs
	npm run show-docs

If the index.html file does not show in your browser, edit `package.json` file and see if version number should be updated in `scripts["show-docs"]`, or open file in `./docs/imed-logger/<version>/index.html` (e.g. `./docs/imed-logger/0.1.0/index.html`).
	
Try [docs/imed-logger/0.1.0/index.html](docs/imed-logger/0.1.0/index.html).


## Contributing ##

No formal styleguide imposed, just take care to maintain the existing coding style.

- Add unit tests for any new or changed functionality.
- Lint and test your code.
- Take special care to comment your code with JSDoc3, see [jsdoc.app](https://jsdoc.app).

## Release History ##

* 0.1.0 added `setTheme` function, and 1st commit to github.  
  --Thu Jun 20 12:07:09 CEST 2019

* 0.0.2 added `inspect` and `assert` functions.  
  --Wed Jan 18 2017 10:11:00 GMT+0100 (CET)

* 0.0.1 Initial release.  
  --Fri May 13 2016 19:52:00 GMT+0200 (CEST)

## About me ##

see [www.imed.ch](http://imed.ch).

---
© [imed.ch](http://imed.ch) - Last modified : Thu Jun 20 11:04:36 CEST 2019



