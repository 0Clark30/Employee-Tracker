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
          db.query("SELECT * FROM employee LEFT JOIN employee AS managers ON employee.manager_id = managers.id",[], function (err, results) {
            console.table(results, "\n");
            start()
          }); // FIGURE OUT INNER JOIN OR JOIn
          // first_name, last_name, employee_id, title, salary, department, manager_id
          
          break;

        case "View All Roles":
          db.query("SELECT * FROM role;", function (err, results) {
            console.table(results, "\n");
            start();
          });
          
          break;

        case "View All Departments":
          db.query("SELECT * FROM department;", function (err, results) {
            console.table(results, "\n");
            start();
          });
          
          break;

        case "Add Employee":
          // NEED A FUNCTION THAT WILL RETURN MY ? MARKS?
         let {first_name, last_name, role_id, manager_id} = addEmployee();
          db.query(
            "INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);",[first_name, last_name, role_id, manager_id], function (err, results) {
            console.table(results, "\n");
            start();
          }
          );
          
          break;

        case "Add Department":
          // NEED A FUNCTION THAT WILL RETURN MY ? MARKS?
          const {department_name} = addDepartment();
           db.query(
             "INSERT INTO department(department_name) VALUES (?);", [department_name], function (err, results) {
            console.table(results, "\n");
             start();
          }
           );
          
          break;

        case "Add Role":
          // NEED A FUNCTION THAT WILL RETURN MY ? MARKS?
          const {title, salary, department_id} = addRole();
          db.query("INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?); ", [title, salary, department_id], function (err, results) {
            console.table(results, "\n");
            start();
          });
          
          break;

        case "Update Employee Role":
          // NEED A FUNCTION THAT WILL RETURN MY ? MARKS? FOR AN UPDATE
           let {newEmployee_id, newFirst_name, newLast_name, newRole_id, newManager_id} = updateWhat();

          db.query(
            "UPDATE employee SET first_name = ?, last_name = ?, role_id= ?, manager_id = ? Where employee_id = ?",
            [newFirst_name, newLast_name, newRole_id, newManager_id, newEmployee_id],
            function (err, results) {
              console.table(results, '\n');
              start();
            }
          );

            
          break;

        case "Quit":
            // NEED A WAY TO QUIT


          break;
      }
    });
};

const addEmployee = async () => {
  await inquirer.prompt({
    name : "first_name",
    type : "input",
    message : "What is their first name?"
    
  },
  {
    name : "last_name",
    type : "input",
    message : "What is their last name?"
  },
  {
    name : "role_id",
    type : "input",
    message : "What is their role id?"
  },
  {
    name : "manager_id",
    type : "input",
    message : "What is their managers id? (if none set null)"
  }
  )}; 


const addDepartment = async () => {
  await inquirer.prompt ({
    name : "department_name",
    type : "input",
    message : "What is the departments name?"
  })
};

const addRole = async () => {
  await inquirer.prompt ({
    name : "title",
    type : "input",
    message : "What is the role's title?"
  },
  {
    name : "salary",
    type : "input",
    message : "What is the salary for this role?"
  },
  {
    name : "department_id",
    type : "input",
    message : "What is the department id number?"
  })
}

const updateWhat = async () => {
 await inquirer.prompt(
  {
    name: "newEmployee_id",
    type: "input",
    message : "What is the Employee's ID for who you wish to Update?"
  },
  {
    name : "newFirst_name",
    type : "input",
    message : "What is their first name?"
    
  },
  {
    name : "newLast_name",
    type : "input",
    message : "What is their last name?"
  },
  {
    name : "newRole_id",
    type : "input",
    message : "What is their role id?"
  },
  {
    name : "newManager_id",
    type : "input",
    message : "What is their managers id? (if none set null)"
  })
}

start();
