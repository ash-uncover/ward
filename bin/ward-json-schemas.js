#!/usr/bin/env node

'use strict'

process.title = 'js-swagger-generator'

const fs = require('fs')
const js2t = require('json-schema-to-typescript')
const Schemas = require('../dist/plugin/loader/schema/index.js')

const output = './docs/schemas'

const deleteFolderRecursive = (path) => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function (file) {
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

const keyToFile = (key) => {
  return key.split('').reduce((acc, char) => {
    let next = acc
    if (char.toUpperCase() === char) {
      next += '-'
      next += char.toLowerCase()
    } else {
      next += char
    }
    return next
  }, 'ward').split('-schema').join('.schema.json')
}

if (fs.existsSync(output)) {
  fs.rmSync(output, { recursive: true })
}
fs.mkdirSync(output, { recursive: true })

// Write json schemas
Object.keys(Schemas).forEach(key => {
  const fileName = keyToFile(key)
  const fileContent = JSON.stringify(Schemas[key], null, 2)
  fs.writeFileSync(`${output}/${fileName}`, fileContent)
})

// Build typescripts files
Object.keys(Schemas).forEach(key => {
  const schema = Schemas[key]
  schema.$id = key
  js2t.compile(schema, key)
    .then(ts => {
      //console.log(ts)
    })
    .catch(error => {
      console.log('------------')
      console.log('error with ' + key)
      console.log('-')
      console.log(error)
      console.log('-')
      console.log(JSON.stringify(schema, null, 2))
    })
})