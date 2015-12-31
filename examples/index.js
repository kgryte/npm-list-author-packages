'use strict';

var ls = require( './../lib' );

var opts = {
	'username': 'kgryte'
};

ls( opts, clbk );

function clbk( error, list ) {
	if ( error ) {
		throw error;
	}
	console.log( list );
}
