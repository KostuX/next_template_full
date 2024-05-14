const fs = require("node:fs");


export default async function log_write(data){
const content = data;
fs.writeFile("./LOG/test.txt", content, (err) => {
  if (err) {
    console.error(err);
  } else {
   
  }
});
}