'use strict';

// NOTES //

/* Raw data...
	{
		"rows": [
			{
				"key": [
					"<username>",
					"<package_name1>"
				],
				"value": 1
			},
			{
				"key": [
					"<username>",
					"<package_name2>"
				],
				"value": 1
			},
			...
		]
	}
*/


// TRANSFORM //

/**
* FUNCTION: transform( data )
*	Transforms raw response data.
*
* @param {Object} data - response data
* @returns {String[]} package list
*/
function transform( data ) {
	var rows = data.rows;
	var out;
	var i;
	out = new Array( rows.length );
	for ( i = 0; i < rows.length; i++ ) {
		out[ i ] = rows[ i ].key[ 1 ];
	}
	return out;
} // end FUNCTION transform()


// EXPORTS //

module.exports = transform;
