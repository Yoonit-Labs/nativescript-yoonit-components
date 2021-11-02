module.exports = {
  extends: [
    'plugin:vue/strongly-recommended',
    '@vue/standard'
  ],
  plugins: [
    'vue',
    '@babel'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
    babelOptions: {
      rootMode: 'upward'
    }
  },
  env: {
    node: true
  },
  globals: {
    TNS_APP_MODE: true,
    TNS_APP_PLATFORM: true,
    TNS_ENV: true,
    android: true
  },
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/require-valid-default-prop': 'off',
    'vue/require-default-prop': 'off',
    'vue/valid-template-root': 'off',
    'indent': [
      'error',
      2
    ],
    'one-var': [
      'error',
      {
        'var': 'never',
        'let': 'never',
        'const': 'never'
      }
    ],
    'semi': [
      2,
      'never'
    ],
    'arrow-parens': 0,
    'generator-star-spacing': 'off',
    'no-new': 0,
    'no-fallthrough': 'off'
  }
}
