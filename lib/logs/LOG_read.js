const fs = require("fs");
import log_write from "./LOG_write";

export default async function log_read(type) {
  const path = process.env.LOG_PATH;

  let filename = "default.log";

  if (type === "INFO") {
    filename = process.env.LOG_FILENAME_INFO;
  } else if (type === "ERROR") {
    filename = process.env.LOG_FILENAME_ERROR;
  }

  try {
    let data = fs.readFileSync(`${path}${filename}`, "utf8");
    let data_array = data.split("\n");
    return { ok: true, data: data_array };
  } catch (error) {
    log_write("ERROR", error);
    return { ok: false, data: error };
  }
}
