import eslint from '@eslint/js';
import pluginQuery from '@tanstack/eslint-plugin-query';
import vitestPlugin from '@vitest/eslint-plugin';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import prettierConfig from 'eslint-config-prettier';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import storybookPlugin from 'eslint-plugin-storybook';
import typescriptSortKeysPlugin from 'eslint-plugin-typescript-sort-keys';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config} */
const config = [
  eslint.configs.recommended,
  ...pluginQuery.configs['flat/recommended'],
  ...storybookPlugin.configs['flat/recommended'],
  ...nextCoreWebVitals,
  ...nextTypescript,

  {
    rules: jsxA11yPlugin.flatConfigs.strict.rules,
  },

  prettierConfig,
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      'storybook-static',
      // Auto-generated; do not lint.
      '**/*.schema.d.ts',
    ],
  },

  {
    plugins: {
      'simple-import-sort': simpleImportSortPlugin,
    },
  },

  {
    rules: {
      '@tanstack/query/mutation-property-order': 'off',

      camelcase: 'off',

      'dot-notation': 'error',

      // Enforce type-safe equality operators === and !==
      eqeqeq: 'error',

      'no-console': [
        'warn',
        {
          allow: ['error', 'warn'],
        },
      ],

      'no-use-before-define': 'error',

      'react/jsx-fragments': ['error', 'element'],

      'simple-import-sort/exports': 'warn',
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            [
              // External packages.
              '^@?\\w',
              // Internal packages.
              '^(@|assets|components|libraries|mocks|pages|integrations|storybook|styles|types)(/.*|$)',
              // Side effect imports.
              '^\\u0000',
              // Relative imports.
              '^\\.\\.(?!/?$)',
              '^\\.\\./?$',
              '^\\./(?=.*/)(?!/?$)',
              '^\\.(?!/?$)',
              '^\\./?$',
              // Style imports.
              '^.+.scss$',
            ],
          ],
        },
      ],

      'sort-keys': [
        'warn',
        'asc',
        {
          caseSensitive: false,
        },
      ],
    },
  },

  /**
   * Typescript files
   */
  {
    files: ['src/**/*.{tsx,ts}'],

    plugins: {
      'typescript-sort-keys': typescriptSortKeysPlugin,
    },
    rules: {
      ...tseslint.configs.recommendedTypeChecked.rules,

      // Custom naming conventions
      '@typescript-eslint/naming-convention': [
        'error',
        {
          format: ['PascalCase'],
          selector: 'class',
        },
        {
          format: ['camelCase', 'PascalCase'],
          leadingUnderscore: 'allow',
          selector: 'parameter',
        },
        {
          format: ['camelCase'],
          leadingUnderscore: 'allow',
          modifiers: ['private'],
          selector: 'memberLike',
        },
        {
          custom: {
            match: false,
            regex: '^(I|T)[A-Z]',
          },
          format: ['PascalCase'],
          selector: 'typeLike',
        },
        {
          custom: {
            match: false,
            regex: '[a-z](Interface|Type)$',
          },
          format: ['PascalCase'],
          selector: 'typeLike',
        },
        {
          format: ['camelCase', 'PascalCase'],
          selector: 'variable',
        },
        {
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          modifiers: ['const'],
          selector: 'variable',
        },
        {
          format: ['PascalCase'],
          prefix: ['is', 'has'],
          selector: 'variable',
        },
      ],

      '@typescript-eslint/no-empty-object-type': [
        'error',
        { allowInterfaces: 'with-single-extends' },
      ],

      // ! NOTE: We should not use "any" because it defeats the purpose of using typescript.
      // Disabling for now until we resolve it separately.
      '@typescript-eslint/no-explicit-any': 'off',

      '@typescript-eslint/no-unused-expressions': [
        'error',
        { allowShortCircuit: true, allowTernary: true },
      ],

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'none',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_',
        },
      ],

      'typescript-sort-keys/interface': 'error',
      'typescript-sort-keys/string-enum': 'error',
    },
  },

  {
    files: ['src/**/*.stubs.ts', 'src/**/*.stories.tsx'],
    rules: {
      // Allow console.log() calls in stubs files only.
      'no-console': 'off',
    },
  },

  /**
   * Vitest unit tests
   */
  {
    files: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    ...vitestPlugin.configs.recommended,
  },
];

export default config;
