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
  const sql =
    "CREATE TABLE IF NOT EXISTS Cards (id INT AUTO_INCREMENT PRIMARY KEY,tete BOOL, value INT, color INT,symbol VARCHAR(255),playerEffect BOOL, playerBonus INT, enemyEffect BOOL, enemyBonus INT, url VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table successfully created");
  });
});
