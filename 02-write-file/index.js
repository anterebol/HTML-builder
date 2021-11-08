const path = require('path')
const fs = require('fs')
const event = require('events')
const process = require('process');
const dirPath = path.dirname(__filename)
const writeableStream = fs.createWriteStream(`${dirPath}/hello.txt`)

function listenerEmmit () {
  console.log("Hello i'm wait your message")
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
    })
    readline.on('line', (input) => {
      if (input == 'exit') {
        console.log('Thanks for your message')
        readline.close()
      }
      else {
        writeableStream.write(`${input}\n`)
      }
    });
}
listenerEmmit()