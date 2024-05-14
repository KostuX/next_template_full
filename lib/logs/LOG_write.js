const fs = require("node:fs");


export default async function log_write(data){

  let path = process.env.LOG_PATH
  
  let filename = 'default.txt'




  try {
    if(data.type === 'INFO'){
       filename = process.env.LOG_FILENAME_INFO
    }
    else if(data.type === 'ERROR'){ 
      filename = LOG_FILENAME_ERROR
    }
    else{
      console.err('UNKNOWN Log type')
    }

    let msg = `[${data.type}] ${new Date().toUTCString()} - ${data.data}`
    const logStream = fs.createWriteStream(`${path}${filename}`, {flags: 'a'});
    logStream.write(msg);
    logStream.end('\n');

    
  } catch (error) {
    console.err('ERROR writing log file')
    
  }

  
 
}