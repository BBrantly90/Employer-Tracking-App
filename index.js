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
                        // Adding Salary
                        type: 'input',
                        name: 'salary',
                        message: 'What is the salary of the role?',
                        validate: salaryInput => {
                            if (salaryInput) {
                                return true;
                            } else {
                                console.log('Please Add A Salary!');
                                return false;
                            }
                        }
                    },
                    {
                        // Department
                        type: 'list',
                        name: 'department',
                        message: 'Which department does the role belong to?',
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < result.length; i++) {
                                array.push(result[i].name);
                            }
                            return array;
                        }
                    }
                ]).then((answers) => {
                    // Compares result and stores it into the variable
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].name === answers.department) {
                            var department = result[i];
                        }
                    }

                    db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [answers.role, answers.salary, department.id], (err, result) => {
                       if (err) throw err;
                       console.log('Added ${answers.role} to the database.')
                       employee_tracker(); 
                    });
                })
            });
        } else if (answers.prompt === 'Add AN Employee') {
            // Calling database to acquire roles and managers
            db.query('SELECT * FROM employee, role', (err, result) => {
                if (err) throw err;

                inquirer.prompt([
                    {
                        // Adds Employee First Name
                        type: 'input',
                        name: 'firstName',
                        message: 'What is the employees first name?',
                        validate: firstNameInput => {
                            if (firstNameInput) {
                                return true;
                            } else {
                                console.log('Please Add A First Name!');
                                return false;
                            }
                        }
                    },
                    {
                        // Adds Employee Last Name
                        type: 'input',
                        name: 'lastName',
                        message: 'What is the employees last name?',
                        validate: lastNameInput => {
                            if (lastNameInput) {
                                return true;
                            } else {
                                console.log('Please Add A Salary!');
                                return false;
                            }
                        }
                    },
                    {
                        // Adds Employee Role
                        type: 'list',
                        name: 'role',
                        message: 'What is the employees role?',
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < result.length; i++) {
                                array.push(result[i].title);
                            }
                            var newArray = [...new Set(array)];
                            return newArray;
                        }
                    },
                    {
                        
                    }
                ])
            })
        }
    })
}