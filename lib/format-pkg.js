const prettier = require('prettier')
const chalk = require('chalk')

const buildObj = (where, innerObj) => {
  const obj = {}
  const location = where.split('.')

  // recursively add layers
  location.reduce((acc, w, index) => {
    if (index + 1 === location.length) {
      acc[w] = innerObj
      return
    }

    acc[w] = {}
    return acc[w]
  }, obj)

  return JSON.stringify(obj, null, 2)
}

const logConflict = (where, found, expected) => {
  // if configuration is already defined like we want
  // just show a notification
  if (JSON.stringify(expected) === JSON.stringify(found)) {
    let msg = ''
    msg += chalk.bgGreen.white('INFO')
    msg += ` configuration already defined in ${where} in package.json`

    console.info(msg)

    return
  }

  // show a warning
  // compare what's expected and what's found
  let msg = ''
  msg += chalk.bgRed.white('WARN')
  msg += ` configuration already defined in ${where} in package.json`
  msg += '\n\n'
  msg += chalk.bold('Found') + '\n'
  msg += buildObj(where, found) + '\n\n'
  msg += chalk.bold('This script wanted to insert (but did not)') + '\n'
  msg += buildObj(where, expected) + '\n'

  console.warn(msg)
}

// format package.json by adding config
const formatPkgJson = (pkg, config) => {
  // add missing parts
  if (!pkg.scripts) pkg.scripts = {}
  if (!pkg.dependencies) pkg.dependencies = {}
  if (!pkg.devDependencies) pkg.devDependencies = {}

  // add husky
  if (pkg.husky) {
    logConflict('husky', pkg.husky, config.husky)
  } else {
    pkg.husky = config.husky
  }

  // add prettier
  if (pkg.prettier) {
    logConflict('prettier', pkg.prettier, config.prettier)
  } else {
    pkg.prettier = config.prettier
  }

  // add eslintConfig
  if (pkg.eslintConfig) {
    logConflict('eslintConfig', pkg.eslintConfig, config.eslintConfig)
  } else {
    pkg.eslintConfig = config.eslintConfig
  }

  // add lint-staged
  if (pkg['lint-staged']) {
    logConflict('lint-stage', pkg['lint-staged'], config['lint-staged'])
  } else {
    pkg['lint-staged'] = config['lint-staged']
  }

  // add devDependencies
  Object.keys(config.devDependencies).forEach(dep => {
    if (pkg.devDependencies[dep]) {
      logConflict(
        `devDependencies.${dep}`,
        pkg.devDependencies[dep],
        config.devDependencies[dep]
      )
    } else if (pkg.dependencies[dep]) {
      console.warn(
        `${dep} already defined in dependencies in package.json, so we don't add it to devDependencies`
      )
    } else {
      pkg.devDependencies[dep] = config.devDependencies[dep]
    }
  })

  // add scripts
  Object.keys(config.scripts).forEach(script => {
    if (pkg.scripts[script]) {
      logConflict(
        `scripts.${script}`,
        pkg.scripts[script],
        config.scripts[script]
      )
    } else {
      pkg.scripts[script] = config.scripts[script]
    }
  })

  return prettier.format(JSON.stringify(pkg), {
    parser: 'json',
    ...config.prettier
  })
}

module.exports = formatPkgJson
