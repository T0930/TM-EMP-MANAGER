const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer'); /// npm init -y /// npm i inquirer
const fs = require('fs');
const { exit } = require('process');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: '',
      // MySQL password
      password: '',
      database: 'business_db'
    },
    console.log(`Connected to the business_db database.`)
  );

const questionsMain =[
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
{
    type: 'input',
    message: 'Department?',
    name: 'departmentRole',
},
];

const questionsEmployee = [
{
    type: 'input',
    message: 'Employee first name?',
    name: 'empFirstName',
},
{
    type: 'input',
    message: 'Employee last name?',
    name: 'empLastName',
},
{
    type: 'input',
    message: 'Employee role?',
    name: 'empRole',
},
{
    type: 'input',
    message: 'Employee Manager?',
    name: 'empManager',
}
];

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
       if (data.optionsMain === 'View all departments'){
           viewDepartments();
       } else if (data.optionsMain === 'View all roles'){
           viewRoles();
       } else if (data.optionsMain === 'View all employees'){
           viewEmployees();
       } else if (data.optionsMain === 'Add department'){
           addDepartment();
       } else if (data.optionsMain === 'Add role'){
           addRole();
       } else if (data.optionsMain === 'Add employee'){
           addEmployee();
       } else if (data.optionsMain === 'Update employee role'){
           updateRole();
       } else {
           exit
       }
    })
}

function viewEmployees(){
     // Query database
db.query('SELECT * FROM employees', function (err, results) {
    console.log(results);
  });
}

function addDepartment() {
    inquirer.prompt(questionsDepartment)
    .then((data) => {
        const newDepartment = data.departmentName
        //push newDepartment to Department table
        init();
    })
}

function addRole() {
    inquirer.prompt(questionsRole)
    .then((data) => {
        const newRole = [data.roleName, data.salaryRole, data.departmentRole]
        //push newRole to Role table
        init();
    })
}

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
