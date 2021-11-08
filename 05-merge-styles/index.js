const path = require('path')
const fs = require('fs')
const dirPath = path.dirname(__filename)
fs.unlink(`${dirPath}/project-dist/bundle.css`, (err) => {
  if (err) {
    const writeableStream = fs.createWriteStream(`${dirPath}/project-dist/bundle.css`);
    fs.readdir(`${dirPath}/styles`, 'utf-8', function (err, files) {
      if (err) {
        throw err
      }
      else {
        files.forEach(file => {
          if (path.extname(file) === '.css') {
            let readableStream = fs.createReadStream(`${dirPath}/styles/${file}`, "utf8")
            readableStream.pipe(writeableStream)
          }
        })
      }
    })  
  } else {
    const writeableStream = fs.createWriteStream(`${dirPath}/project-dist/bundle.css`);
    fs.readdir(`${dirPath}/styles`, 'utf-8', function (err, files) {
      if (err) {
        throw err
      }
      else {
        files.forEach(file => {
          if (path.extname(file) === '.css') {
            let readableStream = fs.createReadStream(`${dirPath}/styles/${file}`, "utf8")
            readableStream.pipe(writeableStream)
          }
        })
      }
    })
  }
})


