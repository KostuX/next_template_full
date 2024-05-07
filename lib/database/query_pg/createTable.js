const { getClient } = require("../../../config/database/db_pg_connection");

module.exports = async function () {
  let client = await getClient();
  client.connect().then(() => {
    client.query(`
    CREATE TABLE IF NOT EXISTS "one" (
    one varchar(50) DEFAULT NULL,
    two BYTEA NULL DEFAULT 'none',
    created timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (created),
    CONSTRAINT unique_column1_column2 UNIQUE (one, two)
    );
  `);
  });
};
