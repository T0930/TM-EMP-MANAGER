DROP DATABASE IF EXISTS business_db;
CREATE DATABASE business_db;

USE business_db;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
);

CREATE TABLE employeeRoles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  emp_roles VARCHAR(30) NOT NULL,
  emp_salary INT NOT NULL,
  department_id INT,
  CONSTRAINT key_department FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  emp_role INT NOT NULL,
  CONSTRAINT key_role
  FOREIGN KEY (emp_role)
  REFERENCES employeeRoles(id),
  manager_id INT,
  CONSTRAINT key_manager 
  FOREIGN KEY (manager_id)
  REFERENCES employees(id)
);
