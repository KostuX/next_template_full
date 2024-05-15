const { getClient } = require("../../../config/database/db_pg_connection");
import log_write from "../../logs/LOG_write";

module.exports = async function () {
  let client = await getClient();
  try {
    client.connect().then(() => {
      client.query(`
      CREATE TABLE IF NOT EXISTS "test" (
      one varchar(50) DEFAULT NULL,
      two varchar(50) NULL DEFAULT 'none',
      created timestamp NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (created),
      CONSTRAINT unique_column1 UNIQUE (created)
      );
    `);
    });
    return { ok: true, data: "OK?" };
  } catch (error) {
    log_write("ERROR", error);
    return { ok: false, data: error };
  }
};
