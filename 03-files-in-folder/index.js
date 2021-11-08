const path = require('path')
const fs = require('fs')
let startFrom = path.resolve('03-files-in-folder','secret-folder')
function fileStats (dir) {
fs.readdir(`${dir}`, 'utf-8', function(err, files) {
  if (err) {
    throw err;
  }
  else {
    files.forEach(file => {
      fs.stat(`${dir}/${file}`, (err, stats) => {
        if (err) {
          return
        }
        else if (!stats.isFile()) {
          let nextDir = path.resolve(dir, file)
          fileStats(nextDir)
        } 
        else if (stats.isFile()) {
          console.log(`${file.replace(path.extname(file), '')} - ${path.extname(file).replace('.', '')} - ${stats.size / 1024} kb`)
        }
        //сведения о файле содержатся в аргументе `stats`
      })
    })
  }
})
}
fileStats(startFrom)