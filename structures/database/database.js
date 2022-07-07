const mysql = require("mysql");

const db = mysql.createConnection({
    host: "5.196.77.139",
    user: "roxy",
    password: "roxy",
    port: '10002',
    database: "lotilia"
});

module.exports = db;
