module.exports = {
  parser: 'babel-eslint',
  env: {
    es6: true,
    node: true,
    jest: true
  },
  extends: [
    'standard',
    'plugin:react/recommended',
    'prettier',
    'prettier/react',
    'prettier/standard'
  ],
  plugins: ['react', 'standard'],
  rules: {
    'react/prop-types': 'off',
    'react/display-name': 'off'
  }
}
