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
    "INSERT INTO Cards (tete, value, color,symbol,playerEffect, playerBonus, enemyEffect, enemyBonus, url) VALUES ?";
  const values = [
    [0, 2, 0, "carreau", 0, "", 0, "", "2_carreau"],
    [0, 3, 0, "carreau", 0, "", 0, "", "3_carreau"],
    [0, 4, 0, "carreau", 0, "", 0, "", "4_carreau"],
    [0, 5, 0, "carreau", 0, "", 0, "", "5_carreau"],
    [0, 6, 0, "carreau", 0, "", 0, "", "6_carreau"],
    [0, 7, 0, "carreau", 0, "", 0, "", "7_carreau"],
    [0, 8, 0, "carreau", 0, "", 0, "", "8_carreau"],
    [0, 9, 0, "carreau", 0, "", 0, "", "9_carreau"],
    [0, 10, 0, "carreau", 0, "", 0, "", "10_carreau"],
    [0, 2, 0, "pique", 0, "", 0, "", "2_pique"],
    [0, 3, 0, "pique", 0, "", 0, "", "3_pique"],
    [0, 4, 0, "pique", 0, "", 0, "", "4_pique"],
    [0, 5, 0, "pique", 0, "", 0, "", "5_pique"],
    [0, 6, 0, "pique", 0, "", 0, "", "6_pique"],
    [0, 7, 0, "pique", 0, "", 0, "", "7_pique"],
    [0, 8, 0, "pique", 0, "", 0, "", "8_pique"],
    [0, 9, 0, "pique", 0, "", 0, "", "9_pique"],
    [0, 10, 0, "pique", 0, "", 0, "", "10_pique"],
    [0, 2, 0, "coeur", 0, "", 0, "", "2_coeur"],
    [0, 3, 0, "coeur", 0, "", 0, "", "3_coeur"],
    [0, 4, 0, "coeur", 0, "", 0, "", "4_coeur"],
    [0, 5, 0, "coeur", 0, "", 0, "", "5_coeur"],
    [0, 6, 0, "coeur", 0, "", 0, "", "6_coeur"],
    [0, 7, 0, "coeur", 0, "", 0, "", "7_coeur"],
    [0, 8, 0, "coeur", 0, "", 0, "", "8_coeur"],
    [0, 9, 0, "coeur", 0, "", 0, "", "9_coeur"],
    [0, 10, 0, "coeur", 0, "", 0, "", "10_coeur"],
    [0, 2, 0, "trefle", 0, "", 0, "", "2_trefle"],
    [0, 3, 0, "trefle", 0, "", 0, "", "3_trefle"],
    [0, 4, 0, "trefle", 0, "", 0, "", "4_trefle"],
    [0, 5, 0, "trefle", 0, "", 0, "", "5_trefle"],
    [0, 6, 0, "trefle", 0, "", 0, "", "6_trefle"],
    [0, 7, 0, "trefle", 0, "", 0, "", "7_trefle"],
    [0, 8, 0, "trefle", 0, "", 0, "", "8_trefle"],
    [0, 9, 0, "trefle", 0, "", 0, "", "9_trefle"],
    [0, 10, 0, "trefle", 0, "", 0, "", "10_trefle"],
  ];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Successfuly inserted : " + result.affectedRows);
  });
});
