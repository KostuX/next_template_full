const fs = require("fs");

export default async function log_read(type) {
  const path = process.env.LOG_PATH;

  let filename = 'default.log'

  if(type === 'INFO'){
     filename = process.env.LOG_FILENAME_INFO;
  }
  else if (type === 'ERROR'){
    filename = process.env.LOG_FILENAME_ERROR;
  }
 
 
  
  fs.readFile(`${path}${filename}`, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data);
  });
}
