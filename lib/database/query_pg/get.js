const { getClient } = require("../../../config/database/db_pg_connection");
import log_write from "../../logs/LOG_write";

module.exports = async function (test) {
  let data;
  let client;
  try {
    client = await getClient();
    client.connect();
    const query = ` SELECT * FROM "test" WHERE "one" ILIKE trim($1::text) LIMIT 1; `;
    data = await client.query(query, [test]);
    client.end();
  } catch (e) {
    console.log(e);
    log_write("ERROR", e);
  }

  if (data?.rows[0]) {
    return { ok: true, data: data.rows[0] };
  } else {
    log_write("INFO", "No Data Found");
    return { ok: false, data: "No Data Found" };
  }
};
