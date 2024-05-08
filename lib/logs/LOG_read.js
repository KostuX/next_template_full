const fs = require("fs");

export default async function handler() {
  const log_path = process.env.LOG_LOCATION;
  const filename = process.env.LOG_FILENAME;
  const example = await fs.readFile(log_path);
  return res.status(200).json({ example });
}
