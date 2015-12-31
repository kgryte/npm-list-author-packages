'use strict';

// MODULES //

var http = require( 'http' );
var parse = require( 'utils-json-parse' );
var debug = require( 'debug' )( 'npm-list-author-packages:request' );


// REQUEST //

/**
* FUNCTION: request( options, clbk )
*	Queries an endpoint for packages belonging to a specified author.
*
* @param {Object} options - options
* @param {String} options.username - user name
* @param {String} [options.hostname] - registry hostname
* @param {Number} [options.port] - registry port
* @param {Function} clbk - callback to invoke upon querying an endpoint
*/
function request( options, clbk ) {
	var body = '';
	var opts;
	var req;
	var err;

	opts = {};
	opts.method = 'GET';

	opts.hostname = options.hostname;
	opts.port = options.port;

	opts.path = '';
	opts.path += '/-/_view/browseAuthors?';
	opts.path += 'group_level=2';
	opts.path += '&';
	opts.path += 'start_key=["'+options.username+'"]';
	opts.path += '&';
	opts.path += 'end_key=["'+options.username+'",{}]';

	debug( 'Query options: %s', JSON.stringify( opts ) );

	req = http.request( opts, onResponse );
	req.on( 'error', onError );
	req.end();

	/**
	* FUNCTION: onError( error )
	*	Event listener invoked after encountering an error.
	*
	* @private
	* @param {Error} error - error object
	* @returns {Void}
	*/
	function onError( error ) {
		debug( 'Error encountered while querying endpoint: %s', error.message );
		clbk( error );
	} // end FUNCTION onError()

	/**
	* FUNCTION: onResponse( response )
	*	Callback invoked after receiving an HTTP response.
	*
	* @private
	* @param {Object} response - HTTP response object
	* @returns {Void}
	*/
	function onResponse( response ) {
		if ( response.statusCode !== 200 ) {
			err = {
				'status': response.statusCode,
				'message': ''
			};
		}
		debug( 'Received a response from query endpoint.' );
		debug( 'Response status: %s.', response.statusCode );

		response.setEncoding( 'utf8' );
		response.on( 'data', onData );
		response.on( 'end', onEnd );
	} // end FUNCTION onResponse()

	/**
	* FUNCTION: onData( chunk )
	*	Event listener invoked upon receiving response data.
	*
	* @private
	* @param {String} chunk - data chunk
	* @returns {Void}
	*/
	function onData( chunk ) {
		body += chunk;
	} // end FUNCTION onData()

	/**
	* FUNCTION: onEnd()
	*	Event listener invoked upon a response end.
	*
	* @private
	* @returns {Void}
	*/
	function onEnd() {
		if ( err ) {
			err.message = body;
		} else {
			body = parse( body );
			if ( body instanceof Error ) {
				err = {
					'status': 502,
					'message': 'unable to parse endpoint response data (invalid JSON)'
				};
			}
		}
		if ( err ) {
			debug( 'Error encountered while querying endpoint: %s', err.message );
			return clbk( err );
		}
		clbk( null, body );
	} // end FUNCTION onEnd()
} // end FUNCTION request()


// EXPORTS //

module.exports = request;
