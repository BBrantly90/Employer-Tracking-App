// Variables and Dependents
const inquirer = require('inquirer');
const db = require('./db/connection');

// Server starts after connection established
db.connect(err => {
    if (err) throw err;
    console.log('Database connection established!!');
    employee_tracker();
});

