// Variables and Dependents
const inquirer = require('inquirer');
const db = require('./db/connection');

// Server starts after connection established
db.connect(err => {
    if (err) throw err;
    console.log('Database connection established!!');
    employee_tracker();
});

var employee_tracker = function () {
    inquirer.createPromptModule([{
        // Command Line Begins!!
        type: 'list',
        name: 'prompt',
        message: 'What would you like to do?',
        choices: ['View All Department', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role', 'Log Out']
    }]).then((answers) => {
        // Views the Department Table in database
        if (answers.prompt === 'View All Department') {
            db.query('SELECT * FROM department', (err, result) => {
                if (err) throw err;
                console.log("Viewing All Department: ");
                console.table(result);
                employee_tracker();
            });
        } else if (answers.prompt === 'View All Roles') {
            db.query('SELECT * FROM role', (err, result) => {
                if (err) throw err;
                console.log("Viewing All Roles: ");
                console.table(result);
                employee_tracker();
            });
        } else if (answers.prompt === 'View All Employees') {
            db.query('SELECT * FROM employee', (err, result) => {
                if  (err) throw err;
                console.log("Viewing All Employees: ");
                console.table(result);
                employee_tracker();
            });
        } else if (answers.prompt === 'Add A Department') {
            inquirer.prompt([{
                // Adding Department
                type: 'input',
                name: 'department',
                message: 'What is the name of the department?',
                validate: departmentInput => {
                    if (departmentInput) {
                        return true;
                    } else {
                        console.log('Please Add A Department!');
                        return false;
                    }
                }
            }]).then((answers) => {
                db.query('INSERT INTO department (name) Values (?)', [answers.department], (err, resultt) => {
                    if (err) throw err;
                    console.log('Added ${answers.department} to the database.')
                    employee_tracker();
                });
            })
        } else if (answers.prompt === 'Add A Role') {
            // Begins with the database so we can acquire the user's departments for choice
            db.query('SELECT * FROM department', (err, result) => {
                if (err) throw err;

                inquirer.prompt([
                    {
                        // Adding role
                        type: 'input',
                        name: 'role',
                        message: 'What is the name of the role?',
                        validate: roleInput => {
                            if (roleInput) {
                                return true;
                            } else {
                                console.log('Please Add A Role!');
                                return false;
                            }
                        }
                    },
                    {
                        
                    }
                ])
            })
        }
    })
}