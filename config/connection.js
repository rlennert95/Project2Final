// *********************************************************************************
// CONNECTION.JS - THIS FILE INITIATES THE CONNECTION TO MYSQL
// *********************************************************************************

// Require mysql
var mysql = require("mysql");

// Set up our connection information
var connection = mysql.createConnection({
  port: 8889,
  host: "localhost",
  user: "root",
<<<<<<< HEAD
  password: "root",
  database: "qanda_db"
=======
  password: "",
  database: "passport_demo"
>>>>>>> c804d915781d7c58565faf9aa51793497e35a5c0
});

// Connect to the database
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection
module.exports = connection;
