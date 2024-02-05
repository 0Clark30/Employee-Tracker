const db = require("./db/connection");
const inquirer = require("inquirer");
const mysql = require("mysql2");

const start = () => {
  inquirer
    .prompt({
      name: "first",
      type: "List",
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
          db.query('SELECT * FROM employee INNER JOIN employee AS managers ON employee.manager_id = employee.id;'); // FIGURE OUT INNER JOIN OR JOIn

          break;

        case "View All Roles":
          db.query("SELECT * FROM role;", function (err, results) {
            console.log(results);
          });

          break;

        case "View All Departments":
          db.query("SELECT * FROM department;", function (err, results) {
            console.log(results);
          });
          break;

        case "Add Employee":
          // NEED A FUNCTION THAT WILL RETURN MY ? MARKS?
          db.query(
            "INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);",[], function (err, results) {
            console.log(results);
          }
          );
          break;

        case "Add Department":
          // NEED A FUNCTION THAT WILL RETURN MY ? MARKS?
           db.query(
             "INSERT INTO department(department_name) VALUES (?);", [], function (err, results) {
            console.log(results);
          }
           );
          break;

        case "Add Role":
          // NEED A FUNCTION THAT WILL RETURN MY ? MARKS?
          db.query("INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?); ", [], function (err, results) {
            console.log(results);
          });
          break;

        case "Update Employee Role":
          // NEED A FUNCTION THAT WILL RETURN MY ? MARKS? FOR AN UPDATE
          break;

        case "Quit":
            // NEED A WAY TO QUIT
          break;
      }
    });
};

const 




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
