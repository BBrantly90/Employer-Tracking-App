const mysql = require('mysql');
//require('dotenv').config();

const db = mysql.createConnection({
    host: 'localhost',
    // username
    user: 'postgres',
    // password
    password: 'password',
    database: 'employee_tracker_db'
});

module.exports = db;