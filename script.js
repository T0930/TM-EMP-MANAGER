
const mysql = require('mysql2');
const inquirer = require('inquirer'); /// npm init -y /// npm i inquirer
const { exit } = require('process');
const cTable = require('console.table');
const { debuglog } = require('util');


// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'tm',
        // MySQL password
        password: 'passWORD',
        database: 'business_db'
    })

    db.connect(function(){
    console.log(`Connected to the business_db database.`)
    init()
    })

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
                db.end()
                process.exit(0)
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
    inquirer.prompt(questionsEmployee)
        .then((data) => {
            const newEmployee = [data.empFirstName, data.empLastName, data.empRole, data.empManager]
            // push newEmployee to Employee table
            init();
        })
}
function addEmployee() {
        const sqlEmpRole = 'SELECT * from employeeRoles';
        const sqlEmpManager = 'SELECT * from employees WHERE manager_id is null';
    
        let managerList = []
        let newRoleList = []
        
    db.query(sqlEmpManager, (err, results) => {
        if (err) {
            console.log(err)
        }
        for (let i = 0; i < results.length; i++) {
            managerList.push({ name: results[i].first_name + ' ,' + results[i].last_name , value: results[i].id })
        }
        db.query('SELECT id, emp_roles FROM employeeRoles', (err, results) => {
            if (err) {
                console.log(err)
            }
            for (let i = 0; i < results.length; i++) {
                newRoleList.push({ name: results[i].emp_roles, value: results[i].id })
            }
                    inquirer.prompt([
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
                            type: 'list',
                            message: 'Select Manager',
                            name: 'managerName',
                            choices: managerList,
                        },
                        {
                            type: 'list',
                            message: 'Select Employee Role',
                            name: 'updateRole',
                            choices: newRoleList,
                        }
                    ])
                        .then((data) => {
                            console.log(data)
                            db.query('INSERT INTO employees (first_name, last_name, emp_role, manager_id) VALUES (?,?,?,?);',
                            [data.empFirstName, data. empLastName, data.managerName, data.updateRole],
                            (err, results) => {
                                if (err) {
                                    console.log(err)
                                }
                                console.log(results)
                            init();
                        })
                })
})
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
            console.log(`Added ${newDepartment} Success!`)
            init();
        })
};

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


function updateRole() {
    let employeeList = []
    let newRoleList = []
    db.query('SELECT id, first_name, last_name FROM employees', (err, results) => {
        if (err) {
            console.log(err)
        }
        for (let i = 0; i < results.length; i++) {
            employeeList.push({ name: results[i].first_name + ' ,' + results[i].last_name , value: results[i].id })
        }
        db.query('SELECT id, emp_roles FROM employeeRoles', (err, results) => {
            if (err) {
                console.log(err)
            }
            for (let i = 0; i < results.length; i++) {
                newRoleList.push({ name: results[i].emp_roles, value: results[i].id })
            }
            console.log(employeeList);
                    inquirer.prompt([
                        {
                            type: 'list',
                            message: 'Select Employee',
                            name: 'existingName',
                            choices: employeeList,
                        },
                        {
                            type: 'list',
                            message: 'New Employee Role?',
                            name: 'updateRole',
                            choices: newRoleList,
                        }
                    ])
                        .then((data) => {
                            console.log(data)
                            db.query('UPDATE employees SET emp_role = ? WHERE id=?;',[data.updateRole, data.existingName],
                            (err, results) => {
                                if (err) {
                                    console.log(err)
                                }
                            init();
                        })
                })
})
})
};
            

// init();
