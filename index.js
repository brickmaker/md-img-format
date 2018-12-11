/**
 * @param {String} inputFile
 * @param {String} style
 */

function mdImgFormat(inputFile, style = '') {
  const outputFile = inputFile.slice(0, inputFile.length - 3) + '_formated' + inputFile.slice(inputFile.length - 3)

  const fs = require('fs')
  const readline = require('readline')
  const instream = fs.createReadStream(inputFile)
  const outstream = fs.createWriteStream(outputFile)

  const rl = readline.createInterface(instream)

  const re = /\!\[(.*)\]\((.*)\)/

  rl.on('line', (line) => {
    // console.log(line)
    let str = line

    if (str.match(re)) {
      console.log(str)
      if (style) {
        str = str.replace(re, `<img src='$2' style='${style}'/>`)
      } else {
        str = str.replace(re, `<img src='$2'/>`)
      }
    }
    outstream.write(str + '\n')
  })
  rl.on('close', (line) => {
    console.log('- Process Done.')
  })
}

exports.mdImgFormat = mdImgFormat