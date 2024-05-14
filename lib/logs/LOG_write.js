const fs = require("node:fs");

export default async function log_write(type, data) {
  let path = process.env.LOG_PATH;

  let filename = "default.txt";

  try {
    if (type === "INFO") {
      filename = process.env.LOG_FILENAME_INFO;
    } else if (type === "ERROR") {
      filename = process.env.LOG_FILENAME_ERROR;
    } else {
      console.log("UNKNOWN Log type");
    }

    let msg = `[${type}] ${new Date().toUTCString()} - ${data}`;
    const logStream = fs.createWriteStream(`${path}${filename}`, {
      flags: "a",
    });
    logStream.write(msg);
    logStream.end("\n");
  } catch (error) {
    console.log("ERROR: writing log file", error);
  }
}
