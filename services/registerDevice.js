const config = require('../config/db');
const db = require('./__init__');

const mapper = require('../mapper/device');

async function Delete(object_id){
    const rows = await db.query(mapper.db.D, [object_id]);
    const data = rows;
    return data;
}

async function Update(object_id, serial_number, error_delay, request_delay, real_time, trans_times, trans_interval){
    const rows = await db.query(mapper.db.U, [serial_number, error_delay, request_delay, real_time, trans_times, trans_interval, object_id]);
    const data = rows;
    return data;
}

async function Read(objectid, serial_number){
    const rows = await db.query(mapper.db.R , [objectid, serial_number]);
    const data = rows;
    return data;
}

async function Create(object_id){
    const rows = await db.query(mapper.db.C , [object_id]);
    const data = rows;
    return data;
}

module.exports = {
    Create,
    Read,
    Update,
    Delete
}