const db = require("./db/connection");
const inquirer = require("inquirer");
const mysql = require("mysql2");

const start = () => {
  inquirer
    .prompt({
      name: "first",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
        "Quit",
      ],
    })
    .then((response) => {
      switch (response.first) {
        case "View All Employees":
          db.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id ORDER BY employee.id ASC;",
            {},
            function (err, results) {
              console.table(results);
              start();
            }
          );
          break;

        case "View All Roles":
          db.query("SELECT * FROM role;", function (err, results) {
            console.table(results);
            start();
          });
          break;

        case "View All Departments":
          db.query("SELECT * FROM department;", function (err, results) {
            console.table(results);
            start();
          });
          break;

        case "Add Employee":
          addEmployee().then(
            ({ first_name, last_name, role_id, manager_id }) => {
              db.query(
                "INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);",
                [first_name, last_name, role_id, manager_id],
                function (err, results) {
                  console.table(results);
                  start();
                }
              );
            }
          );
          break;

        case "Add Department":
          addDepartment().then(({ department_name }) => {
            db.query(
              "INSERT INTO department(department_name) VALUES (?);",
              [department_name],
              function (err, results) {
                console.table(results);
                start();
              }
            );
          });
          break;

        case "Add Role":
          addRole().then(({ title, salary, department_id }) => {
            db.query(
              "INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?); ",
              [title, salary, department_id],
              function (err, results) {
                console.table(results);
                start();
              }
            );
          });
          break;

        case "Update Employee Role":
          updateWhat().then(({ newEmployee_id, newRole_id }) => {
            db.query(
              "UPDATE employee SET role_id= ? Where employee_id = ?",
              [newRole_id, newEmployee_id],
              function (err, results) {
                console.table(results);
                start();
              }
            );
          });
          break;

        case "Quit":
          db.end();
          break;
      }
    });
};

const addEmployee = async () => {
  const answers = await inquirer.prompt([
    {
      name: "first_name",
      type: "input",
      message: "What is their first name?",
    },
    {
      name: "last_name",
      type: "input",
      message: "What is their last name?",
    },
    {
      name: "role_id",
      type: "input",
      message: "What is their role id?",
    },
    {
      name: "manager_id",
      type: "input",
      message: "What is their managers id? (if none set null)",
    },
  ]);
  return answers;
};

const addDepartment = async () => {
  const answers = await inquirer.prompt([
    {
      name: "department_name",
      type: "input",
      message: "What is the departments name?",
    },
  ]);
  return answers;
};

const addRole = async () => {
  const answers = await inquirer.prompt([
    {
      name: "title",
      type: "input",
      message: "What is the role's title?",
    },
    {
      name: "salary",
      type: "input",
      message: "What is the salary for this role?",
    },
    {
      name: "department_id",
      type: "input",
      message: "What is the department id number?",
    },
  ]);
  return answers;
};

const updateWhat = async () => {
  const answers = await inquirer.prompt([
    {
      name: "newEmployee_id",
      type: "input",
      message: "What is the Employee's ID for who you wish to Update?",
    },
    {
      name: "newRole_id",
      type: "input",
      message: "What is their role id?",
    },
  ]);
  return answers;
};

start();
