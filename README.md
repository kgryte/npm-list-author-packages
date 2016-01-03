Author Packages
===
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> List an author's packages.


## Installation

``` bash
$ npm install npm-list-author-packages
```


## Usage

``` javascript
var ls = require( 'npm-list-author-packages' );
```

<a name="ls"></a>
#### ls( options, clbk )

List an author's packages.

``` javascript
ls( {'username': '<username>'}, clbk );

function clbk( error, list ) {
	if ( error ) {
		throw error;
	}
	console.log( list );
	// returns ['<pkg1>','<pkg2>',...]
}
```

The `function` accepts the following `options`:
*	__username__: author username (*required*).
*	__registry__: registry. Default: `'registry.npmjs.org'`.
*	__port__: registry port. Default: `443` (HTTPS) or `80` (HTTP).
* 	__protocol__: registry protocol. Default: `'https'`.

To query an alternative registry, set the relevant options.

``` javascript
var opts = {
	'username': '<username>',
	'registry': 'my.favorite.npm/registry',
	'port': 8080,
	'protocol': 'http'
};

ls( opts, clbk );
```


#### ls.factory( options, clbk )

Creates a reusable `function`.

``` javascript
var get = ls.factory( {'username': '<username>'}, clbk );

get();
get();
get();
// ...
```

The factory method accepts the same `options` as [`ls()`](#ls).


## Notes

*	When querying the main registry, the `function` __only__ returns non-scoped public packages (see NPM issue [#8244](https://github.com/npm/npm/issues/8244)).



## Examples

``` javascript
var ls = require( 'npm-list-author-packages' );

var opts = {
	'username': 'kgryte'
};

ls( opts, clbk );

function clbk( error, list ) {
	if ( error ) {
		throw error;
	}
	console.log( list );
	// returns ['<pkg1>','<pkg2>',...]
}
```

To run the example code from the top-level application directory,

``` bash
$ DEBUG=* node ./examples/index.js
```


---
## CLI

### Installation

To use the module as a general utility, install the module globally

``` bash
$ npm install -g npm-list-author-packages
```


### Usage

``` bash
Usage: listpkgs [options] user

Options:

  -h,  --help                Print this message.
  -V,  --version             Print the package version.
  -p,  --port port           Registry port. Default: 443 (HTTPS) or 80 (HTTP).
       --registry registry   Registry. Default: 'registry.npmjs.org'.
       --protocol protocol   Registry protocol. Default: 'http'.
```


### Notes

*	The package list is written to `stdout` as a newline-delimited `string`.


### Examples

``` bash
$ DEBUG=* listpkgs kgryte
# app-boot
# app-etc
# app-etc-config
# ...
```


---
## Tests

### Unit

This repository uses [tape][tape] for unit tests. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul][istanbul] as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


### Browser Support

This repository uses [Testling][testling] for browser testing. To run the tests in a (headless) local web browser, execute the following command in the top-level application directory:

``` bash
$ make test-browsers
```

To view the tests in a local web browser,

``` bash
$ make view-browser-tests
```

<!-- [![browser support][browsers-image]][browsers-url] -->


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/npm-list-author-packages.svg
[npm-url]: https://npmjs.org/package/npm-list-author-packages

[build-image]: http://img.shields.io/travis/kgryte/npm-list-author-packages/master.svg
[build-url]: https://travis-ci.org/kgryte/npm-list-author-packages

[coverage-image]: https://img.shields.io/codecov/c/github/kgryte/npm-list-author-packages/master.svg
[coverage-url]: https://codecov.io/github/kgryte/npm-list-author-packages?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/npm-list-author-packages.svg
[dependencies-url]: https://david-dm.org/kgryte/npm-list-author-packages

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/npm-list-author-packages.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/npm-list-author-packages

[github-issues-image]: http://img.shields.io/github/issues/kgryte/npm-list-author-packages.svg
[github-issues-url]: https://github.com/kgryte/npm-list-author-packages/issues

[tape]: https://github.com/substack/tape
[istanbul]: https://github.com/gotwarlost/istanbul
[testling]: https://ci.testling.com
