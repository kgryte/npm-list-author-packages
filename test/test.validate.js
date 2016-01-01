'use strict';

// MODULES //

var test = require( 'tape' );
var validate = require( './../lib/validate.js' );


// TESTS //

test( 'file exports a validation function', function test( t ) {
	t.ok( typeof validate === 'function', 'file exports a function' );
	t.end();
});

test( 'if an options argument is not an object, the function returns a type error', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		'5',
		5,
		NaN,
		null,
		undefined,
		true,
		[],
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, values[i] );
		t.ok( err instanceof TypeError, 'returns type error when provided ' + values[i] );
	}
	t.end();
});

test( 'a username option is required', function test( t ) {
	var err = validate( {}, {} );
	t.ok( err instanceof TypeError, 'username required' );
	t.end();
});

test( 'if provided a username option which is not a primitive string, the function returns a type error', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		5,
		NaN,
		null,
		undefined,
		true,
		[],
		{},
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, {
			'username': values[i]
		});
		t.ok( err instanceof TypeError, 'returns type error when provided ' + values[i] );
	}
	t.end();
});

test( 'if provided a registry option which is not a primitive string, the function returns a type error', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		5,
		NaN,
		null,
		undefined,
		true,
		[],
		{},
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, {
			'username': 'beep',
			'registry': values[i]
		});
		t.ok( err instanceof TypeError, 'returns type error when provided ' + values[i] );
	}
	t.end();
});

test( 'if provided a port option which is not a nonnegative integer, the function returns a type error', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		'5',
		Math.PI,
		-5,
		NaN,
		null,
		undefined,
		true,
		[],
		{},
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, {
			'username': 'beep',
			'port': values[i]
		});
		t.ok( err instanceof TypeError, 'returns type error when provided ' + values[i] );
	}
	t.end();
});

test( 'if provided a protocol option which is not a supported protocol, the function returns a type error', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		'5',
		'beep',
		'ftp',
		'smtp',
		5,
		NaN,
		null,
		undefined,
		true,
		[],
		{},
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, {
			'username': 'beep',
			'protocol': values[i]
		});
		t.ok( err instanceof TypeError, 'returns type error when provided ' + values[i] );
	}
	t.end();
});

test( 'the function returns `null` if all options are valid', function test( t ) {
	var err;

	err = validate( {}, {
		'username': 'beep',
		'registry': 'registry.npmjs.org',
		'port': 443,
		'protocol': 'https'
	});
	t.equal( err, null );

	t.end();
});

test( 'the function will ignore unrecognized options', function test( t ) {
	var err;

	err = validate( {}, {
		'username': 'beep',
		'beep': 'boop',
		'a': [1,2,3]
	});
	t.equal( err, null );

	t.end();
});
