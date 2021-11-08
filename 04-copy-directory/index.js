const fs = require('fs')
const path = require('path')
const fsPromises = fs.promises;
fsPromises.mkdir(`${path.dirname(__filename)}/files-copy`, { recursive: true }, (err) => {
  if (err) throw err;
});
fs.readdir(`${path.dirname(__filename)}/files`, 'utf-8', function (err, files) {
  if (err) {
    throw err;
  } else {
    files.forEach(file => {
      fs.copyFile(`${path.dirname(__filename)}/files/${file}`, `${path.dirname(__filename)}/files-copy/${file}`, err => {
        if (err) throw err;
      })
    })
  }
})
