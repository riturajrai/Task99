import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node, // Include Node.js globals if needed (e.g., `process`, `module`)
      },
    },
    plugins: {
      react: pluginReact,
    },
    extends: [
      pluginJs.configs.recommended,
      pluginReact.configs.flat.recommended,
    ],
    rules: {
      // You can add custom rules here if needed
    },
  },
  // Add overrides for specific files or file patterns if necessary
  {
    files: ['**/*.jsx'],
    extends: ['plugin:react/recommended'], // Can have more React-specific rules for .jsx files
    rules: {
      // Add specific rules for React files if needed
    },
  },
];
