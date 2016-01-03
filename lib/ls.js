'use strict';

// MODULES //

var factory = require( './factory.js' );


// LIST //

/**
* FUNCTION: list( options, clbk )
*	Lists an author's packages.
*
* @param {Object} options - function options
* @param {String} options.username - author user name
* @param {String} [options.registry="registry.npmjs.org"] - registry
* @param {Number} [options.port=443] - registry port
* @param {String} [options.protocol="https"] - registry protocol
* @param {Function} clbk - callback to invoke upon query completion
* @returns {Void}
*/
function list( options, clbk ) {
	factory( options, clbk )();
} // end FUNCTION list()


// EXPORTS //

module.exports = list;
