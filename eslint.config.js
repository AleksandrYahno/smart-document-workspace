import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

const OFF = 0;
const WARNING = 1;
const ERROR = 2;

export default tseslint.config(
  {
    ignores: [
      'dist',
      'node_modules',
      '.storybook',
      'storybook-static',
      'cypress/**/*',
      '**/*.test.ts',
      '**/*.spec.ts',
      'jest.config.cjs',
      'cypress.config.ts',
    ],
  },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      {
        languageOptions: {
          parserOptions: {
            projectService: true,
            tsconfigRootDir: import.meta.dirname,
          },
        },
      },
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    settings: { react: { version: '19.0' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      'react-refresh/only-export-components': [
        OFF,
        { allowConstantExport: true },
      ],
      'react-hooks/exhaustive-deps': [
        'off',
        {
          additionalHooks: '(useEffect)',
        },
      ],
      'react-hooks/refs': OFF,
      'indent': ['warn', 2, { SwitchCase: 1 }],
      'no-tabs': ['warn'],
      'no-multiple-empty-lines': [
        WARNING,
        { max: 1, maxEOF: 1, maxBOF: 0 },
      ],
      'padded-blocks': [WARNING, { blocks: 'never' }],
      'eol-last': [WARNING, 'always'],
      'padding-line-between-statements': [
        WARNING,
        { blankLine: 'always', prev: '*', next: 'return' },
      ],
      'react/jsx-child-element-spacing': ERROR,
      'react/jsx-one-expression-per-line': [WARNING, { allow: 'none' }],
      'react/jsx-indent': [WARNING, 2],
      'no-trailing-spaces': WARNING,
      'no-console': [WARNING, { allow: ['warn', 'error'] }],
      'object-curly-spacing': [WARNING, 'always'],
      'jsx-quotes': [WARNING, 'prefer-double'],
      'quotes': [WARNING, 'single', { avoidEscape: true, allowTemplateLiterals: true }],
      'react/jsx-first-prop-new-line': [WARNING, 'multiline'],
      'react/jsx-max-props-per-line': [WARNING, { maximum: 1 }],
      'react/jsx-closing-bracket-location': ['error', 'tag-aligned'],
      '@typescript-eslint/explicit-module-boundary-types': WARNING,
      '@typescript-eslint/explicit-function-return-type': [
        WARNING,
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
        },
      ],
      'max-len': [
        WARNING,
        {
          code: 120,
          tabWidth: 2,
          ignoreComments: true,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        },
      ],
      'semi': [WARNING, 'always'],
      'comma-dangle': [
        WARNING,
        {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'always-multiline',
          exports: 'always-multiline',
          functions: 'always-multiline',
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        WARNING,
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-unsafe-member-access': OFF,
      '@typescript-eslint/no-misused-promises': [
        WARNING,
        {
          checksVoidReturn: false,
        },
      ],
    },
  },
);
