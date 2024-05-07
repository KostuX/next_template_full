const { getClient } = require("../../../config/database/db_pg_connection");

module.exports = async function (cid) {
  let data;
  let client;
  try {
    client = await getClient();
    client.connect();
    const query = ` SELECT * FROM "schema"."table" WHERE "one" ILIKE trim($1::text) LIMIT 1; `;
    data = await client.query(query, [two]);
    client.end();
  } catch (e) {
    console.log(e);
  }

  if (data.rows[0]) {
    return data.rows[0];
  } else {
    return { ok: false };
  }
};
