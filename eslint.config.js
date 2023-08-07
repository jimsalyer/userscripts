const globals = require('globals');
const js = require('@eslint/js');
const prettier = require('eslint-plugin-prettier');

module.exports = [
  js.configs.recommended,
  {
    ignores: ['coverage/', 'node_modules/'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        ...globals.jest,
        ...globals.node,
      },
    },
    plugins: { prettier },
    rules: {
      'no-unused-vars': 'warn',
      'prettier/prettier': 'warn',
    },
  },
];
