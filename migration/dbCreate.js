const mysql = require("mysql");
const { dbConfig } = require("../Config.json");

let con = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE IF NOT EXISTS BlackJack", function (err, result) {
    if (err) throw err;
    console.log("Database Created");
  });
});
