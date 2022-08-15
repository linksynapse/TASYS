const config = require('../config/db');
const db = require('./db');

const mapper = require('../mapper/deviceQuery');

async function getDeviceInfo(objectid, serial_number){

    const rows = await db.query(mapper.db.R , [objectid, serial_number]);
    
    console.log(rows);

    if(!rows){
        rows = [];
    }

    const data = rows;
    return data;
}



module.exports = {
    getDeviceInfo
}