const connection = require('./db/connection');
const inquirer = require('inquirer');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const start= () => {
    inquirer.prompt({
        name : "first",
        type: "List",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            ""

        ]
    })
}


























app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});