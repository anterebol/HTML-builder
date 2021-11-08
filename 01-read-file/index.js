const fs = require('fs')
const path = require('path')
let dirPath = path.dirname(__filename)
let readableStream = fs.createReadStream(`${dirPath}/text.txt`, "utf8");
readableStream.on("data", function(chunk){ 
    console.log(chunk);
});