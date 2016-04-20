"use strict";

const isHoliday = require('./checker');

const eventsSample = [
    new Date(2016, 3, 4),
    new Date(2016, 3, 5),
    new Date(2016, 3, 7),
    new Date(2016, 3, 8),
    new Date(2016, 3, 12),
    new Date(2016, 3, 13),
    new Date(2016, 3, 13),
    new Date(2016, 3, 14),
    new Date(2016, 3, 15)
];

const shiftEvents = (dates, to) => {
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

console.log(shiftEvents(eventsSample, new Date(2016, 4, 8)));
