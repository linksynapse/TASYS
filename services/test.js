const config = require('../config/db');
const db = require('./db');

async function getUsers(){
    const rows = await db.query(`SELECT * FROM authenticate`);

    if(!rows){
        rows = [];
    }

    const data = rows;
    return data;
}

module.exports = {
    getUsers
}