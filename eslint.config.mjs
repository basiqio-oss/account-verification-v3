import js from '@eslint/js';

export default [
  {
    ignores: ['.next/**', 'node_modules/**', 'cypress/videos/**'],
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-unused-vars': 'error',
      'no-undef': 'error',
      'no-redeclare': 'error',
    },
  },
];
