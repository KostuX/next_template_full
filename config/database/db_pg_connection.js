const fs = require("fs");
const { Client } = require("pg");

const user = process.env.DB_USER_PG;
const password = process.env.DB_PASSWORD_PG;
const database = process.env.DB_DATABASE_PG;
const host = process.env.DB_HOST_PG;
const port = process.env.DB_PORT_PG;
const cert = process.env.DB_CERT_PG;

const config = {
  connectionString: `postgresql://${user}:${password}@${host}:${port}/${database}?sslmode=verify-full`,
  ssl: {
    rejectUnauthorized: false,
    // ca: fs.readFileSync(cert).toString(),
  },
};
let client;

async function getClient() {
  return new Client(config);
}

module.exports = { client, getClient };
