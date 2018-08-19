#! /usr/bin/env node

const path = require('path')
const fs = require('fs')
const chalk = require('chalk')

const formatPkgJson = require('../lib/format-pkg')

const PKG_NAME = 'package.json'

const returnError = msg => {
  console.error(`${chalk.bgRed.white('ERROR')} ${msg}`)
  process.exit()
}

let pkg
let config
let _pkg

try {
  // find package.json
  pkg = require(path.join(process.cwd(), PKG_NAME))
} catch (err) {
  returnError(`Could not find ${PKG_NAME}`)
}

try {
  // load config
  config = require('../init-configs/default')
} catch (err) {
  returnError('Could not find config')
}

// format package.json
_pkg = formatPkgJson(pkg, config)

try {
  fs.writeFileSync(PKG_NAME, _pkg, { encoding: 'utf-8' })
} catch (err) {
  returnError(`Could not write ${PKG_NAME}`)
}

console.log('🎁 Done')
