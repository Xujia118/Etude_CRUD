const mysql = require("mysql2");

const db = mysql.createConnection({
//   host: "localhost", # This line is not required!
  user: "root",
  password: "password",
  database: "cruddatabase",
});

module.exports = db;