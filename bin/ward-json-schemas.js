#!/usr/bin/env node

'use strict'

process.title = 'js-swagger-generator'

const path = require('path')
const fs = require('fs')
const js2t = require('json-schema-to-typescript')
const Schemas = require('../dist/plugin/loader/schema/index.js')

const output = './docs/schemas'
const outputTmp = './docs_tmp/schemas'
const outputModel = './src/lib/plugin/loader/model'

const prefixRemote = 'https://ash-uncover.github.io/ward/schemas/'
const prefixLocal = path.resolve(__dirname, '../docs_tmp/schemas/') + '/'

const deleteFolderRecursive = (path) => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function (file) {
      var curPath = path + "/" + file
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath)
      } else { // delete file
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(path)
  }
}

const clone = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

const replaceRefs = (obj, prefix) => {
  if (typeof obj === 'object') {
    Object.keys(obj).forEach(key => {
      if (key === '$id' || key === '$ref') {
        obj[key] = `${prefix}${keyToFileMap[obj[key]]}`
      } else {
        replaceRefs(obj[key], prefix)
      }
    })
  }
}

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

if (fs.existsSync(outputTmp)) {
  fs.rmSync(outputTmp, { recursive: true })
}
fs.mkdirSync(outputTmp, { recursive: true })

if (fs.existsSync(outputModel)) {
  fs.rmSync(outputModel, { recursive: true })
}
fs.mkdirSync(outputModel, { recursive: true })

const keyToFileMap = {}

// Determine file names
Object.keys(Schemas).forEach(key => {
  const fileName = keyToFile(key)
  keyToFileMap[`Ward${key}`] = fileName
})

// Write json schemas
Object.keys(Schemas).forEach(key => {
  const remoteObj = clone(Schemas[key])
  replaceRefs(remoteObj, prefixRemote)
  const remoteFile = JSON.stringify(remoteObj, null, 2)
  fs.writeFileSync(`${output}/${keyToFileMap[`Ward${key}`]}`, remoteFile)

  const localObj = clone(Schemas[key])
  replaceRefs(localObj, prefixLocal)
  const localFile = JSON.stringify(localObj, null, 2)
  fs.writeFileSync(`${outputTmp}/${keyToFileMap[`Ward${key}`]}`, localFile)
})

// Build typescripts files
const localObj = clone(Schemas.PluginSchema)
replaceRefs(localObj, prefixLocal)
js2t.compile(localObj, 'PluginSchema', {
  bannerComment: '',
  style: {
    bracketSpacing: false,
    printWidth: 120,
    semi: false,
    singleQuote: true,
    tabWidth: 2,
    trailingComma: 'none',
    useTabs: false
  }
})
  .then(ts => {
    fs.writeFileSync(`${outputModel}/PluginDataModel.ts`, ts)
  })
  .catch(error => {
    console.log('------------ PluginSchema ERROR ----------')
    console.log(error)
    console.log('-')
    console.log(JSON.stringify(localObj, null, 2))
  })
  .then(() => {
    if (fs.existsSync(outputTmp)) {
      fs.rmSync(outputTmp, { recursive: true })
    }
  })
