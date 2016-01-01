'use strict';

// MODULES //

var test = require( 'tape' );
var assert = require( 'chai' ).assert;
var proxyquire = require( 'proxyquire' );
var list = require( './../lib/ls.js' );


// FIXTURES //

var getOpts = require( './fixtures/opts.js' );
var data = [
	'beep',
	'boop'
];


// TESTS //

test( 'file exports a function', function test( t ) {
	t.ok( typeof list === 'function', 'export is a function' );
	t.end();
});

test( 'function returns an error to a provided callback if an error is encountered when fetching a package list', function test( t ) {
	var opts;
	var list;

	list = proxyquire( './../lib/ls.js', {
		'./factory.js': factory
	});

	opts = getOpts();
	list( opts, done );

	function factory( opts, clbk ) {
		return function list() {
			setTimeout( onTimeout, 0 );
			function onTimeout() {
				clbk( new Error( 'beep' ) );
			}
		};
	}

	function done( error ) {
		t.ok( error instanceof Error );
		t.equal( error.message, 'beep' );
		t.end();
	}
});

test( 'function returns a package list to a provided callback', function test( t ) {
	var expected;
	var opts;
	var list;

	list = proxyquire( './../lib/ls.js', {
		'./factory.js': factory
	});

	expected = [
		'beep',
		'boop'
	];

	opts = getOpts();
	list( opts, done );

	function factory( opts, clbk ) {
		return function list() {
			setTimeout( onTimeout, 0 );
			function onTimeout() {
				clbk( null, data );
			}
		};
	}

	function done( error, data ) {
		assert.deepEqual( data, expected );
		t.ok( true, 'deep equal' );
		t.end();
	}
});
