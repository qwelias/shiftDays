"use strict";

const HS = new( require( 'date-holidays' ) );
const HC = require( './hardcoded' );

HS.init( "RU" );

module.exports = ( date ) => {
	date = new Date( date );
	let year = date.getFullYear();
	if ( HC[ year ] ) {
		let month = date.getMonth();
		let day = date.getDay();
		let dayN = date.getDate();
		if ( HC[ year ][ month ].indexOf( dayN ) > -1 ) return true;
		if ( HC[ year ][ month ].indexOf( -dayN ) > -1 ) return false;
		if ( day == 0 || day == 6 ) return true;
	} else {
		let day = date.getDay();
		if ( day == 0 || day == 6 ) return true;
		let FBHS = HS.getHolidays( year, 'ru' );
		return FBHS.map( hs => {
			return date >= new Date( hs.start ) && date <= new Date( hs.end );
		} ).some( is => is );
	}
};
