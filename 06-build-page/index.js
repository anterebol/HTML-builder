const fs = require('fs')
const path = require('path');

const dir = path.dirname(__filename);
let startFrom = path.resolve(`${dir}`,'project-dist', 'assets')
let pathNewDir = `${path.dirname(__filename)}/project-dist/assets`
let pathCopy = `${path.dirname(__filename)}/assets`
const fspromise = require('fs').promises;

async function deleteDir(){
  await fspromise.rm('06-build-page/project-dist/assets', {
    recursive: true, force: true
  }, (err) => { if (err) throw err;
  })
}
fs.mkdir(`${dir}/project-dist`, function(err) {
  if (err) {
    fs.unlink(`${dir}/project-dist/style.css`, function(err) {
      if (err) {
        const writeableStream = fs.createWriteStream(`${dir}/project-dist/style.css`);
        fs.readdir(`${dir}/styles`, 'utf-8', function (err, files) {
          if (err) {
            throw err
          }
          else {
            files.forEach(file => {
              if (path.extname(file) === '.css') {
                let readableStream = fs.createReadStream(`${dir}/styles/${file}`, "utf8")
                readableStream.pipe(writeableStream)
              }
            })
          }
        })  
      } 
      else {
        const writeableStream = fs.createWriteStream(`${dir}/project-dist/style.css`);
        fs.readdir(`${dir}/styles`, 'utf-8', function (err, files) {
          if (err) {
            throw err
          }
          else {
            files.forEach(file => {
              if (path.extname(file) === '.css') {
                let readableStream = fs.createReadStream(`${dir}/styles/${file}`, "utf8")
                readableStream.pipe(writeableStream)
              }
            })
          }
        })  
      }
    })
  }
  else {
    const writeableStream = fs.createWriteStream(`${dir}/project-dist/style.css`);
    fs.readdir(`${dir}/styles`, 'utf-8', function (err, files) {
      if (err) {
        throw err
      }
      else {
        files.forEach(file => {
          if (path.extname(file) === '.css') {
            let readableStream = fs.createReadStream(`${dir}/styles/${file}`, "utf8")
            readableStream.pipe(writeableStream)
          }
        })
      }
    })  
  }
})

function copyDir (pathNewDir, pathCopy) {
  fs.rmdir(`${pathNewDir}`, (err) => {
    if (err) {
      fs.mkdir(`${pathNewDir}`, (err) => {
        if (err) return;
      });
    };
  });
  fs.readdir(`${pathCopy}`, 'utf-8', function (err, files) {
    if (err) {
      if (err) return;
    } else {
      files.forEach(file => {
        fs.stat(`${pathCopy}/${file}`, (err, stats) => {
          if(!stats.isFile()) {
            copyDir(path.resolve(`${pathNewDir}`, `${file}`), path.resolve(`${pathCopy}`, `${file}`))
          }
          else if (stats.isFile()) {
            fs.copyFile(`${pathCopy}/${file}`, `${pathNewDir}/${file}`, err => {
              if (err) return;
            })
          }
        })
      })
    }
  })
}





function writeHtml () {
fs.readFile(`${dir}/template.html`, 'utf8', function (err, data) {
  let result = data
  if (err) {
    throw err;
  }
  fs.readdir(`${dir}/components`, 'utf-8', function(err, files) {
    if (err) {
      throw(err)
    }
    files.forEach(file => {
      let fileName = path.basename(file).replace('.html', '');
      fs.readFile(`${dir}/components/${fileName}.html`, 'UTF-8', function(err, value) {
         if (err) {throw err}
         result = result.replace(`{{${fileName}}}`, value)
         fs.writeFile(`${dir}/project-dist/index.html`, result, 'utf8', function (err) {
          if (err) return ;
       });
      })
    })
  })
});
}

async function create () {
  await writeHtml()
  await deleteDir()
  await copyDir (pathNewDir, pathCopy)
}
create()
