// eslint-disable-next-line no-undef
const eslint = require('@eslint/js');
// eslint-disable-next-line no-undef
const tseslint = require('@typescript-eslint/eslint-plugin');
// eslint-disable-next-line no-undef
const tsParser = require('@typescript-eslint/parser');
// eslint-disable-next-line no-undef
const importPlugin = require('eslint-plugin-import');
// eslint-disable-next-line no-undef
const prettierConfig = require('eslint-config-prettier');

// eslint-disable-next-line no-undef
module.exports = [
  eslint.configs.recommended,
  {
    ignores: [
      'dist/**',
      'build/**',
      'node_modules/**',
      'coverage/**',
      'jest.config.js',
      '.prettierrc.js',
      '**/*.d.ts',
      'Dockerfile',
      'docker-compose.yml',
      '.idea/**',
      '**/*.log',
      'src/tests/**',
      '**/*.test.ts',
      '.pnp.cjs',
    ],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json',
        // eslint-disable-next-line no-undef
        tsconfigRootDir: __dirname,
      },
      globals: {
        // Node.js globals
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        setTimeout: 'readonly',
        // Jest globals
        jest: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      import: importPlugin,
    },
    rules: {
      // TypeScript specific rules
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-misused-promises': 'error',

      // Import rules
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/no-unresolved': 'off', // TypeScript takes care of this

      // General rules
      'no-console': 'warn', // Consider using a logger in production
      'no-duplicate-imports': 'error',
      'no-unused-vars': 'off', // Using TypeScript's no-unused-vars instead
      'prefer-const': 'error',
      'spaced-comment': ['error', 'always'],
      eqeqeq: ['error', 'always', { null: 'ignore' }],
    },
  },
  prettierConfig,
];
