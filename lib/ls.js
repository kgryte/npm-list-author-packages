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
* @param {String} [options.hostname="registry.npmjs.org"] - registry hostname
* @param {Number} [options.port=80] - registry port
* @param {Function} clbk - callback to invoke upon query completion
* @returns {Void}
*/
function list( options, clbk ) {
	factory( options, clbk )();
} // end FUNCTION list()


// EXPORTS //

module.exports = list;
