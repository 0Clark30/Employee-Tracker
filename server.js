const express = require("express");
const fs = require('fs').promises
const mysql = require("mysql2");
const inquirer = require('inquirer');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "0Clark30",
    database: "movies_db",
  },
  console.log(`Connected to the movies_db database.`)
);




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});