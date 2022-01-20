INSERT INTO departments (department_name)
VALUES ("IT Department"),
       ("Development Department");

INSERT INTO employeeRoles (emp_roles, emp_salary, department_id)
VALUES ("Intern", 20000, 1), ("Support", 50000, 1), ("Engineer", 80000, 2), ("Director", 120000, 2);


INSERT INTO employees (first_name, last_name, emp_role, manager_id)
VALUES ("Sammy", "Hagar", 4, NULL),
       ("David", "Roth", 2, 1),
       ("Alex", "Van", 3, 1),
       ("Eddie", "Halen", 1, 3),
       ("Michael", "Anthony", 3, 1);
       
