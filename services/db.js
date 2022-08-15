const mysql = require('mysql2/promise')
const config = require('../config/db')

async function query(sql, params) {
    const connection = await mysql.createConnection(config.db);
    //console.log(connection.format(sql,params));
    const [rows, fields] = await connection.execute(sql, params);
    connection.end();
    return rows;
}

module.exports = {
    query
}