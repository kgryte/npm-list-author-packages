'use strict';

// MODULES //

var request = require( './request.js' );
var transform = require( './transform.js' );


// GET //

/**
* FUNCTION: get( opts, clbk )
*	Gets an author's package list.
*
* @param {Object} opts - options
* @param {Function} clbk - callback to invoke after getting a package list
* @returns {Void}
*/
function get( opts, clbk ) {
	request( opts, done );
	/**
	* FUNCTION: done( error, data )
	*	Callback invoked upon completing a request.
	*
	* @private
	* @param {Error|Null} error - error object
	* @param {String} data - response data
	* @returns {Void}
	*/
	function done( error, data ) {
		if ( error ) {
			return clbk( error );
		}
		data = transform( data );
		clbk( null, data );
	} // end FUNCTION done()
} // end FUNCTION get()


// EXPORTS //

module.exports = get;
