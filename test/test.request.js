'use strict';

// MODULES //

var test = require( 'tape' );
var proxyquire = require( 'proxyquire' );
var assert = require( 'chai' ).assert;
var request = require( './../lib/request.js' );


// FIXTURES //

var getOpts = require( './fixtures/opts.js' );
var http = require( './fixtures/http.js' );
var data = require( './fixtures/data.json' );


// TESTS //

test( 'file exports a function', function test( t ) {
	t.ok( typeof request === 'function', 'main export is a function' );
	t.end();
});

test( 'if unable to query an endpoint, an error is returned to a provided callback', function test( t ) {
	var request;
	var mock;
	var opts;

	opts = getOpts();
	opts.protocol = 'http';

	mock = http( new Error( 'beep' ) );

	request = proxyquire( './../lib/request.js', {
		'http': mock
	});

	request( opts, clbk );

	function clbk( error ) {
		t.ok( error instanceof Error, 'error instance' );
		t.equal( error.message, 'beep', 'equal messages' );
		t.end();
	}
});

test( 'if an endpoint returns a status code other than 200, an error containing the status code is returned to a provided callback', function test( t ) {
	var request;
	var mock;
	var opts;

	opts = getOpts();
	opts.protocol = 'http';

	mock = http( null, 404 );

	request = proxyquire( './../lib/request.js', {
		'http': mock
	});

	request( opts, clbk );

	function clbk( error ) {
		t.equal( error.status, 404, 'equal status codes' );
		t.equal( error.message, 'bad request', 'equal messages' );
		t.end();
	}
});

test( 'if an endpoint returns an invalid JSON response, an error with a status code of 502 (bad gateway; invalid response from upstream server) is returned to a provided callback', function test( t ) {
	var request;
	var mock;
	var opts;

	opts = getOpts();
	opts.protocol = 'http';

	mock = http( null, 200 );

	request = proxyquire( './../lib/request.js', {
		'http': mock,
		'utils-json-parse': parse
	});

	request( opts, clbk );

	function parse() {
		return new Error( 'bad json' );
	}

	function clbk( error ) {
		t.equal( error.status, 502, 'equal status codes' );
		t.equal( typeof error.message, 'string', 'error message' );
		t.end();
	}
});

test( 'if a query is successful, a JSON object is returned to a provided callback', function test( t ) {
	var request;
	var mock;
	var opts;

	opts = getOpts();
	opts.protocol = 'http';

	mock = http( null, 200 );

	request = proxyquire( './../lib/request.js', {
		'http': mock
	});

	request( opts, clbk );

	function clbk( error, body ) {
		if ( error ) {
			throw error;
		}
		t.equal( typeof body, 'object', 'returns an object' );
		assert.deepEqual( body, data );
		t.ok( true, 'deep equal' );
		t.end();
	}
});

test( 'HTTPS is supported', function test( t ) {
	var request;
	var mock;
	var opts;

	opts = getOpts();
	opts.protocol = 'https';

	mock = http( null, 200 );

	request = proxyquire( './../lib/request.js', {
		'https': mock
	});

	request( opts, clbk );

	function clbk( error, body ) {
		if ( error ) {
			throw error;
		}
		t.equal( typeof body, 'object', 'returns an object' );

		assert.deepEqual( body, data );
		t.ok( true, 'deep equal' );

		t.end();
	}
});

test( 'alternative registries are supported', function test( t ) {
	var request;
	var mock;
	var opts;

	opts = getOpts();
	opts.protocol = 'http';
	opts.registry = 'my.favorite.npm/registry';

	mock = http( null, 200 );

	request = proxyquire( './../lib/request.js', {
		'http': mock
	});

	request( opts, clbk );

	function clbk( error, body ) {
		if ( error ) {
			throw error;
		}
		t.equal( typeof body, 'object', 'returns an object' );

		assert.deepEqual( body, data );
		t.ok( true, 'deep equal' );

		t.equal( mock._opts.hostname, 'my.favorite.npm', 'alternative registry hostname' );
		t.ok( /^\/registry\//.test( mock._opts.path ), 'alternative registry path' );

		t.end();
	}
});
