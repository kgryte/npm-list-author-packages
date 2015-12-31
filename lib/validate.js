'use strict';

// MODULES //

var isObject = require( 'validate.io-object' );
var isString = require( 'validate.io-string-primitive' );
var isNonNegativeInteger = require( 'validate.io-nonnegative-integer' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination object
* @param {Object} options - options to validate
* @param {String} options.username - user name
* @param {String} [options.hostname] - registry hostname
* @param {Number} [options.port] - registry port
* @returns {Error|Null} error or null
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	opts.username = options.username;
	if ( !isString( opts.username ) ) {
		return new TypeError( 'invalid option. Username option must be a string. Option: `' + opts.username + '`.' );
	}
	if ( options.hasOwnProperty( 'hostname' ) ) {
		opts.hostname = options.hostname;
		if ( !isString( opts.hostname ) ) {
			return new TypeError( 'invalid option. Hostname option must be a string. Option: `' + opts.hostname + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'port' ) ) {
		opts.port = options.port;
		if ( !isNonNegativeInteger( opts.port ) ) {
			return new TypeError( 'invalid option. Port option must be a nonnegative integer. Option: `' + opts.port + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
