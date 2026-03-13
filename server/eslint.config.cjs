const js = require('@eslint/js');
const globals = require('globals');
const stylistic = require('@stylistic/eslint-plugin');

module.exports = [
  {
    ignores: ['dist/**', 'node_modules/**']
  },
  js.configs.recommended,
  {
    plugins: {
      '@stylistic': stylistic
    },
    languageOptions: {
      globals: {
        ...globals.node,
      },
      ecmaVersion: 2021,
    },
    rules: {
      '@stylistic/indent': ['error', 2],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/quotes': ['error', 'single'],
      'no-unused-vars': 'warn',
      'no-console': 'off',
    }
  }
];