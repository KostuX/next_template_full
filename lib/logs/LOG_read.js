const fs = require("fs");

export default async function log_read() {
  const log_path = process.env.LOG_LOCATION;
  const filename = process.env.LOG_FILENAME;
  const example = fs.readFile(log_path + filename);
  return example;
}
