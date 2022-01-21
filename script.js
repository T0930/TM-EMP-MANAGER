// const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer'); /// npm init -y /// npm i inquirer
// const fs = require('fs');
const { exit } = require('process');
const cTable = require('console.table');
const { debuglog } = require('util');


// const PORT = process.env.PORT || 3001;
// const app = express();

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
<<<<<<< HEAD
        host: 'localhost',
        // MySQL username,
        user: 'tm',
        // MySQL password
        password: 'passWORD',
        database: 'business_db'
=======
      host: 'localhost',
      // MySQL username,
      user: '',
      // MySQL password
      password: '',
      database: 'business_db'
>>>>>>> df225bb695e5fc1268c34c6469a2b59a96f9aed7
    },
    console.log(`Connected to the business_db database.`)
);

const questionsMain = [
    {
        type: 'list',
        message: 'Choose an option below',
        choices: ['View all departments', 'View all roles', 'View all employees',
            'Add department', 'Add role', 'Add employee',
            'Update employee role', 'Exit'],
        name: 'optionsMain',
    }
];

const questionsDepartment = [
    {
        type: 'input',
        message: 'Name of department?',
        name: 'departmentName',
    }
];

const questionsRole = [
    {
        type: 'input',
        message: 'Name of new role?',
        name: 'roleName',
    },
    {
        type: 'input',
        message: 'Salary?',
        name: 'salaryRole',
    },
];

// const questionsEmployee = [
// {
//     type: 'input',
//     message: 'Employee first name?',
//     name: 'empFirstName',
// },
// {
//     type: 'input',
//     message: 'Employee last name?',
//     name: 'empLastName',
// },
// {
//     type: 'list',
//     message: 'Employee role?',
//     name: 'empRole',
//     choices: newEmpRole
// },
// {
//     type: 'list',
//     message: 'Employee Manager?',
//     name: 'empManager',
//     choices: newEmpManager
// }
// ];

const questionsUpdate = [ // get employee data?
    {
        type: 'input',
        message: 'Employee first name?',
        name: 'existingName',
    },
    {
        type: 'input',
        message: 'Update role?',
        name: 'updateRole',
    }
];


function init() {
    inquirer.prompt(questionsMain)
        .then((data) => {
            if (data.optionsMain === 'View all departments') {
                viewDepartments();
            } else if (data.optionsMain === 'View all roles') {
                viewRoles();
            } else if (data.optionsMain === 'View all employees') {
                viewEmployees();
            } else if (data.optionsMain === 'Add department') {
                addDepartment();
            } else if (data.optionsMain === 'Add role') {
                addRole();
            } else if (data.optionsMain === 'Add employee') {
                addEmployee();
            } else if (data.optionsMain === 'Update employee role') {
                updateRole();
            } else {
                exit
            }
        })
}

function viewEmployees() {
    // Query database
    const sql = 'SELECT * FROM employees'
    db.query(sql, (err, results) => {
        if (err) {
            console.log(err)
        }
        console.table(results);
        init()
    });
}

function addEmployee() {

    const sqlEmpRole = 'SELECT * from employeeRoles';
    const sqlEmpManager = 'SELECT * from employees';

    const newEmpRole = []
    const newEmpManager = []


    db.query((sqlEmpRole)), (err, results) => {
        if (err) {
            throw (err)
        }
    }
    results.forEach((res) => {
        newEmpRole.push(res.emp_role)
    });

    db.query((sqlEmpManager)), (err, results) => {
        if (err) {
            throw (err)
        }
    }
    results.forEach((res) => {
        newEmpManager.push(res.manager_id)
    });

    // let questionsEmployee = [
    //     {
    //         type: 'input',
    //         message: 'Employee first name?',
    //         name: 'empFirstName',
    //     },
    //     {
    //         type: 'input',
    //         message: 'Employee last name?',
    //         name: 'empLastName',
    //     },
    //     {
    //         type: 'list',
    //         message: 'Employee role?',
    //         name: 'empRole',
    //         choices: newEmpRole
    //     },
    //     {
    //         type: 'list',
    //         message: 'Employee Manager?',
    //         name: 'empManager',
    //         choices: newEmpManager
    //     }
    //     ];

    inquirer.prompt(questionsEmployee)
        .then((data) => {

            const newEmployee = [data.empFirstName, data.empLastName, data.empRole, data.empManager]
            console.log(newEmployee);
            const sql = `INSERT INTO employees (first_name, last_name, emp_role, manager_id)
              VALUES (?)`;

            db.query(sql, newEmployee)
            if (err) {
                console.log(err)
            }
            console.log(`Added ${data.empFirstName} Success!`)
            init();
        })
};

function viewDepartments() {
    const sql = 'SELECT * FROM departments';
    db.query(sql, (err, results) => {
        if (err) {
            console.log(err)
        }
        console.table(results);
        init();
    })
};

function addDepartment() {
    inquirer.prompt(questionsDepartment)
        .then((data) => {

            const newDepartment = data.departmentName
            const sql = `INSERT INTO departments (department_name)
              VALUES (?)`;

            db.query(sql, newDepartment)
            // (err, result) => {
            //   if (err) {
            //     res.status(400).json({ error: err.message });
            //     return;
            //   }
            console.log(`Added ${newDepartment} Success!`)
            init();
        })
};
//     });
//     init();
//   };

function viewRoles() {
    const sql = 'SELECT * FROM employeeRoles';
    db.query(sql, (err, results) => {
        if (err) {
            console.log(err)
        }
        console.table(results);
        init();
    })
};

function addRole() {
    let departmentList = []
    db.query('SELECT id, department_name FROM departments', (err, results) => {
        if (err) {
            console.log(err)
        }
        for (let i = 0; i < results.length; i++) {
            departmentList.push({ name: results[i].department_name, value: results[i].id })
        }
        inquirer.prompt([...questionsRole, {
            type: 'list',
            message: 'Department?',
            name: 'departmentRole',
            choices: departmentList
        },])
            .then((data) => {
                db.query('INSERT INTO employeeRoles (emp_roles, emp_salary, department_id) VALUES (?,?,?);',
                    [data.roleName, data.salaryRole, data.departmentRole],
                    (err, results) => {
                        if (err) {
                            console.log(err)
                        }
                        console.table(results)
                        init();
                    })

            })
        })};


function addEmployee() {
                    inquirer.prompt(questionsEmployee)
                        .then((data) => {
                            const newEmployee = [data.empFirstName, data.empLastName, data.empRole, data.empManager]
                            // push newEmployee to Employee table
                            init();
                        })
                }

function updateRole() {
                    inquirer.prompt(questionsUpdate)
                        .then((data) => {
                            const updateRole = data.updateRole
                            //push updateRole to previous employee role
                            init();
                        })
                }


init();
