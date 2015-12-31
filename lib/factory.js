'use strict';

// MODULES //

var isFunction = require( 'validate.io-function' );
var merge = require( 'utils-merge2' )();
var validate = require( './validate.js' );
var defaults = require( './defaults.json' );
var get = require( './get.js' );


// FACTORY //

/**
* FUNCTION: factory( options, clbk )
*	Returns a function for listing an author's packages.
*
* @param {Object} options - function options
* @param {String} options.username - author user name
* @param {String} [options.hostname="registry.npmjs.org"] - registry hostname
* @param {Number} [options.port=80] - registry port
* @param {Function} clbk - callback to invoke upon query completion
* @returns {Function} function for listing packages
*/
function factory( options, clbk ) {
	var opts;
	var err;
	opts = merge( {}, defaults );
	err = validate( opts, options );
	if ( err ) {
		throw err;
	}
	if ( !isFunction( clbk ) ) {
		throw new TypeError( 'invalid input argument. Callback argument must be a function. Value: `' + clbk + '`.' );
	}
	/**
	* FUNCTION: list()
	*	Lists an author's packages.
	*
	* @returns {Void}
	*/
	return function list() {
		get( opts, done );
		/**
		* FUNCTION: done( error, data )
		*	Callback invoked after query completion.
		*
		* @private
		* @param {Error|Null} error - error object
		* @param {String[]} data - query data
		* @returns {Void}
		*/
		function done( error, data ) {
			if ( error ) {
				return clbk( error );
			}
			clbk( null, data );
		} // end FUNCTION done()
	}; // end FUNCTION list()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;