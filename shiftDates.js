"use strict";

const HS = new( require( 'date-holidays' ) );
const HC = {
    2016:[
        [1, 4, 5, 6, 7, 8],
        [-20, 22, 23],
        [7, 8],
        [],
        [2, 3, 9],
        [13],
        [],
        [],
        [],
        [],
        [4],
        []
    ],
    2017:[ //draft
        [2,3,4,5,6,9,10,11],
        [23],
        [8],
        [],
        [1,9],
        [12],
        [],
        [],
        [],
        [],
        [6],
        []
    ]
};

const isHoliday = ( date ) => {
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

const shiftDates = (dates, to) => {
    to = new Date(to);
    to = new Date(to.getFullYear(), to.getMonth(), to.getDate());

    let frm = dates[0];
    frm = new Date(frm.getFullYear(), frm.getMonth(), frm.getDate());

    let shift = (to - frm) / 1000 / 60 / 60 / 24;

    return dates.map(d => {
        let move = new Date(d);
        move.setDate(move.getDate() + shift);
        while(isHoliday(move)){
            ++shift;
            move.setDate(move.getDate() + 1);
        }
        return move;
    });
};

module.exports = shiftDates;
