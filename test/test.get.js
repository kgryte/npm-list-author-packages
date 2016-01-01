'use strict';

// MODULES //

var test = require( 'tape' );
var assert = require( 'chai' ).assert;
var proxyquire = require( 'proxyquire' );
var get = require( './../lib/get.js' );


// FIXTURES //

var data = require( './fixtures/data.json' );
var getOpts = require( './fixtures/opts.js' );


// TESTS //

test( 'file exports a function', function test( t ) {
	t.ok( typeof get === 'function', 'export is a function' );
	t.end();
});

test( 'function returns an error to a provided callback if an error is encountered when fetching a package list', function test( t ) {
	var opts;
	var get;

	get = proxyquire( './../lib/get.js', {
		'./request.js': request
	});

	opts = getOpts();
	get( opts, done );

	function request( opts, clbk ) {
		setTimeout( onTimeout, 0 );
		function onTimeout() {
			clbk( new Error( 'beep' ) );
		}
	}

	function done( error ) {
		t.ok( error instanceof Error, 'error instance' );
		t.equal( error.message, 'beep' );
		t.end();
	}
});

test( 'function returns a package list to a provided callback', function test( t ) {
	var expected;
	var opts;
	var get;

	get = proxyquire( './../lib/get.js', {
		'./request.js': request
	});

	expected = [
		'beep',
		'boop'
	];

	opts = getOpts();
	get( opts, done );

	function request( opts, clbk ) {
		setTimeout( onTimeout, 0 );
		function onTimeout() {
			clbk( null, data );
		}
	}

	function done( error, data ) {
		assert.deepEqual( data, expected );
		t.ok( true, 'deep equal' );
		t.end();
	}
});
