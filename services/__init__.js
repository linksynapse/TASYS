const mysql = require('mysql2/promise')
const config = require('../config/db')

async function query(sql, params) {
    const connection = await mysql.createConnection(config.db);
    try{
        const [rows] = await connection.execute(sql, params);
        connection.end();
        return rows;
    }catch{
        return [];
    }
    
}

module.exports = {
    query
}