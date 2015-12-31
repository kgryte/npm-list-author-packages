'use strict';

// MODULES //

var test = require( 'tape' );
var ls = require( './../lib' );


// TESTS //

test( 'main export is a function', function test( t ) {
	t.ok( typeof ls === 'function', 'main export is a function' );
	t.end();
});
