// Learn more about configuring this file at <https://github.com/theintern/intern/wiki/Configuring-Intern>.
// These default settings work OK for most people. The options that *must* be changed below are the
// packages, suites, excludeInstrumentation, and (if you want functional tests) functionalSuites.
define({
	// The port on which the instrumenting proxy will listen
	proxyPort: 9000,

	// A fully qualified URL to the Intern proxy
	proxyUrl: 'http://localhost:9000/',

	// Default desired capabilities for all environments. Individual capabilities can be overridden by any of the
	// specified browser environments in the `environments` array below as well. See
	// https://code.google.com/p/selenium/wiki/DesiredCapabilities for standard Selenium capabilities and
	// https://saucelabs.com/docs/additional-config#desired-capabilities for Sauce Labs capabilities.
	// Note that the `build` capability will be filled in with the current commit ID from the Travis CI environment
	// automatically
	capabilities: {
		'selenium-version': '2.46.0'
	},

	webdriver: {
		host: 'localhost',
		port: 4444
	},
	// Browsers to run integration testing against. Note that version numbers must be strings if used with Sauce
	// OnDemand. Options that will be permutated are browserName, version, platform, and platformVersion; any other
	// capabilities options specified for an environment will be copied as-is
	environments: [
		// { browserName: 'chrome', version: '34', platform: [ 'Linux' ] }
		{ browserName: 'chrome' },
		{ browserName: 'firefox' }
		// { browserName: 'internet explorer', version: '11', platform: 'Windows 8.1' },
		// { browserName: 'internet explorer', version: '10', platform: 'Windows 8' },
		// { browserName: 'internet explorer', version: '9', platform: 'Windows 7' },
		// { browserName: 'firefox', version: '28', platform: [ 'OS X 10.9', 'Windows 7', 'Linux' ] },
		// { browserName: 'chrome', version: '34', platform: [ 'OS X 10.9', 'Windows 7', 'Linux' ] },
		// { browserName: 'safari', version: '6', platform: 'OS X 10.8' },
		// { browserName: 'safari', version: '7', platform: 'OS X 10.9' }
	],

	// Maximum number of simultaneous integration tests that should be executed on the remote WebDriver service
	maxConcurrency: 3,

	// Name of the tunnel class to use for WebDriver tests
	tunnel: 'NullTunnel',

	// The desired AMD loader to use when running unit tests (client.html/client.js). Omit to use the default Dojo
	// loader
	loaders: {
	},

	// Configuration options for the module loader; any AMD configuration options supported by the specified AMD loader
	// can be used here
	loaderOptions: {
		// Packages that should be registered with the loader in each testing environment
		packages: [{
			name: 'app', location: 'dist/app'
		}, {
			name: 'dojo', location: 'dist/dojo'
		}, {
			name: 'dijit', location: 'dist/dijit'
		}, {
			name: 'dojox', location: 'dist/dojox'
		}, {
			name: 'dgrid', location: 'dist/dgrid'
		}, {
			name: 'dstore', location: 'dist/dstore'
		}, {
			name: 'dmodel', location: 'dist/dmodel'
		}, {
			name: 'moment', location: 'dist/moment'
		}, {
			name: 'esri', location: 'dist/esri'
		}, {
			name: 'sinon', location: 'node_modules/sinon/lib', main: 'sinon'
		}, {
			name: 'sinon-chai', location: 'node_modules/sinon-chai/lib', main: 'sinon-chai'
		}, , {
			name: 'testdouble', location: 'node_modules/testdouble/dist', main: 'testdouble'
		}]
	},

	// Non-functional test suite(s) to run in each browser
	suites: [
		'tests/unit/components-widgets',
		'tests/unit/components-webmap',
		'tests/unit/components-datalist',
		'tests/unit/stores-app'
	],

	// Functional test suite(s) to run in each browser once non-functional tests are completed
	functionalSuites: [ /* 'myPackage/tests/functional' */],

	// A regular expression matching URLs to files that should not be included in code coverage analysis
	excludeInstrumentation: /^(?:tests|node_modules|dist\/dijit|dist\/dojo|dist\/dojox|dist\/esri|dist\/moment|dist\/dstore|dist\/dgrid)\//
});
