const { getClient } = require("../../../config/database/db_pg_connection");

module.exports = async function (one, two, three) {
  try {
    let client = await getClient();
    client.connect();
    const query = ` INSERT INTO schema.table ( one, two, three) VALUES ( $1::text, $2::text, $3::text) ON CONFLICT (one) DO NOTHING; `;
    await client.query(query, [one, two, three]);

    client.end();
  } catch (e) {
    console.log(e);
  }
};
