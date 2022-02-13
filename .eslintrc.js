module.exports = {
  root: true,
  env: {
    browser: true,
    amd: true,
    node: true,
    es6: true,
  },
  plugins: ['unused-imports'],
  extends: ['eslint:recommended', 'plugin:prettier/recommended', 'next', 'next/core-web-vitals'],
  rules: {
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 0,
    'no-unused-vars': 0,
    'react/no-unescaped-entities': 0,
    'import/order': 'error',
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
    ],
  },
}
