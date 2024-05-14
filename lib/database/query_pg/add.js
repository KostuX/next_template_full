const { getClient } = require("../../../config/database/db_pg_connection");
import log_write from "../../logs/LOG_write";

module.exports = async function (one, two) {
  try {
    let client = await getClient();
    client.connect();
    const query = ` INSERT INTO "test" ( one, two) VALUES ( $1::text, $2::text) ; `;
    await client.query(query, [one, two]);
    client.end();
    return { ok: true, data: "OK" };
  } catch (e) {
    console.log(e);
    log_write("ERROR", e);
    return { ok: false, data: e };
  }
};
