DROP DATABASE IF EXISTS business_db;
CREATE DATABASE business_db;

USE business_db;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30)
);

CREATE TABLE employeeRoles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  emp_roles VARCHAR(30) NOT NULL
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  is_employee BOOLEAN NOT Null,
  is_manager BOOLEAN NOT NULL,
  emp_role VARCHAR(30) NOT NULL,
  emp_salary VARCHAR(30) NOT NULL,
  department INT,
  FOREIGN KEY (departments)
  REFERENCES departments(id)
  ON DELETE SET NULL
);
