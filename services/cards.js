const db = require("./db");
const helper = require("../helper");
const config = require("../Config.json");

async function getMuliple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(`SELECT * FROM cards`);
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}
module.exports = {
  getMuliple,
};
