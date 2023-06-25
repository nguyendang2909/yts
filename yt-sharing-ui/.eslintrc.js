const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
);

module.exports = {
  extends: ['react-app', 'prettier'],
  plugins: ['prettier', 'simple-import-sort', 'unused-imports'],
  rules: {
    'prettier/prettier': ['error', prettierOptions],
    'simple-import-sort/imports': 'error', // Import configuration for `eslint-plugin-simple-import-sort`,
    'simple-import-sort/exports': 'error', // Export configuration for `eslint-plugin-simple-import-sort`,
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      rules: { 'prettier/prettier': ['warn', prettierOptions] },
    },
  ],
};
