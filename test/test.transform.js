'use strict';

// MODULES //

var test = require( 'tape' );
var assert = require( 'chai' ).assert;
var transform = require( './../lib/transform.js' );


// FIXTURES //

var data = require( './fixtures/data.json' );


// TESTS //

test( 'file exports a function', function test( t ) {
	t.ok( typeof transform === 'function', 'export is a function' );
	t.end();
});

test( 'the transform extracts package names from raw JSON response data and returns an array', function test( t ) {
	var expected;
	var actual;

	expected = [
		'beep',
		'boop'
	];

	actual = transform( data );

	assert.deepEqual( actual, expected );
	t.ok( true, 'deep equal' );

	t.end();
});

test( 'the transform returns an empty array if no rows are returned', function test( t ) {
	var expected;
	var actual;

	expected = [];

	actual = transform({ 'rows': [] });

	assert.deepEqual( actual, expected );
	t.ok( true, 'deep equal (empty array)' );

	t.end();
});
