const globals = require('globals');
const js = require('@eslint/js');

module.exports = [
  {
    ignores: ['coverage/', 'node_modules/'],
  },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        ...globals.jest,
        ...globals.node,
      },
    },
  },
];
