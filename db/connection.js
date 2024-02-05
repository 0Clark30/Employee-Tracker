const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "0Clark30",
    database: "employeeTracker_db",
  },
  console.log(`Connected to the employeeTracker database.`)
);

module.exports = db;