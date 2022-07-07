const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost", 
    user: "root",
    password: "",
    port: '3306',
    database: "", // your name database
});

module.exports = db;
