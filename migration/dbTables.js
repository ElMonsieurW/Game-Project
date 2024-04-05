const mysql = require("mysql");
const { dbConfig } = require("./Config.json");

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
    "CREATE TABLE IF NOT EXISTS dos (id INT AUTO_INCREMENT PRIMARY KEY, value INT, color INT,symbol STRING,playerEffect BOOL, playerBonus INT, enemyEffect BOOL, enemyBonys INT, url STRING";
});
