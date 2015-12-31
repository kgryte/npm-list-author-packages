'use strict';

// MODULES //

var http = require( 'http' );
var https = require( 'https' );
var parse = require( 'utils-json-parse' );
var url = require( 'url' );
var debug = require( 'debug' )( 'npm-list-author-packages:request' );


// REQUEST //

/**
* FUNCTION: request( options, clbk )
*	Queries an endpoint for packages belonging to a specified author.
*
* @param {Object} options - options
* @param {String} options.username - user name
* @param {String} [options.registry] - registry
* @param {Number} [options.port] - registry port
* @param {String} [options.protocol] - registry protocol
* @param {Function} clbk - callback to invoke upon querying an endpoint
*/
function request( options, clbk ) {
	var body = '';
	var opts;
	var uri;
	var req;
	var get;
	var err;

	opts = {};
	opts.method = 'GET';

	uri = options.protocol+'://'+options.registry;
	uri = url.parse( uri );

	opts.hostname = uri.hostname;
	opts.port = options.port;

	if ( uri.pathname.length > 1 ) {
		opts.path = uri.pathname;
	} else {
		opts.path = '';
	}
	opts.path += '/-/_view/browseAuthors?';
	opts.path += 'group_level=2';
	opts.path += '&';
	opts.path += 'start_key=["'+options.username+'"]';
	opts.path += '&';
	opts.path += 'end_key=["'+options.username+'",{}]';

	debug( 'Query options: %s', JSON.stringify( opts ) );

	if ( options.protocol === 'https' ) {
		get = https.request;
	} else {
		get = http.request;
	}
	req = get( opts, onResponse );
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
