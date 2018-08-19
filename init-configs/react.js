const {eslintConfig, ...default} = require('./default.json')

module.exports = {
  eslintConfig: {
    extends: '@sequencework/eslint-config/react'
  },
  ...default
}
