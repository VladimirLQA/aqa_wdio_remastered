import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylisticJs from '@stylistic/eslint-plugin-js';
import configPrettier from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';

export default tseslint.config([
  pluginJs.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  configPrettier,
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    plugins: { '@stylistic/js': stylisticJs, prettier: pluginPrettier },
    rules: {
      'prettier/prettier': 'error',
      'no-this-before-super': 'error',
      'no-useless-catch': 'off',
      'max-nested-callbacks': [
        'error',
        {
          max: 5,
        },
      ],
      'new-cap': [
        'error',
        {
          newIsCap: true,
          capIsNew: false,
          properties: true,
        },
      ],
      'no-lonely-if': ['error'],
      'no-unneeded-ternary': ['error'],
      'no-nested-ternary': ['error'],
      'operator-assignment': ['error', 'always'],
      '@stylistic/js/space-unary-ops': [
        'error',
        {
          words: true,
          nonwords: false,
        },
      ],
      '@stylistic/js/space-infix-ops': 'error',
      '@stylistic/js/space-in-parens': ['error', 'never'],
      '@stylistic/js/space-before-function-paren': [
        'error',
        { anonymous: 'always', named: 'never', asyncArrow: 'always' },
      ],
      '@stylistic/js/space-before-blocks': ['error', 'always'],
      '@stylistic/js/operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],
      '@stylistic/js/no-whitespace-before-property': 'error',
      '@stylistic/js/new-parens': 'error',
      '@stylistic/js/keyword-spacing': [
        'error',
        {
          before: true,
          after: true,
          overrides: {
            function: {
              after: false,
            },
          },
        },
      ],
      '@stylistic/js/key-spacing': ['error', { beforeColon: false, afterColon: true, mode: 'minimum' }],
      '@stylistic/js/multiline-ternary': ['error', 'always-multiline'],
      '@stylistic/js/newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],
      '@stylistic/js/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
      '@stylistic/js/no-trailing-spaces': 'error',
      '@stylistic/js/object-curly-spacing': ['error', 'always', { objectsInObjects: true }],
      '@stylistic/js/rest-spread-spacing': ['error', 'never'],
      '@stylistic/js/semi-style': ['error', 'last'],
      '@stylistic/js/semi-spacing': ['error', { before: false, after: true }],
      '@stylistic/js/dot-location': ['error', 'property'],
      '@stylistic/js/comma-spacing': ['error', { before: false, after: true }],
      '@stylistic/js/comma-style': ['error', 'last'],
      '@stylistic/js/arrow-spacing': ['error', { before: true, after: true }],
      '@stylistic/js/arrow-parens': ['error', 'always'],
      '@stylistic/js/block-spacing': ['error', 'always'],
      // '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      '@stylistic/js/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/js/eol-last': ['error'],
      '@stylistic/js/function-call-spacing': ['error', 'never'],
      '@stylistic/js/max-len': [
        'error',
        {
          code: 110,
          ignoreTrailingComments: true,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignorePattern: '^\\s*(export\\s+abstract\\s+class\\s+.*|import\\s.+\\sfrom\\s.+;)$',
          ignoreRegExpLiterals: true,
        },
      ],
      '@stylistic/js/semi': ['error', 'always', { omitLastInOneLineClassBody: true }],
      '@stylistic/js/quotes': ['error', 'single', { allowTemplateLiterals: true, avoidEscape: true }],
      '@typescript-eslint/no-redundant-type-constituents': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-namespace': ['error', { allowDeclarations: true }],
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'warn',
      '@typescript-eslint/restrict-template-expressions': 'warn',
      '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@stylistic/js/function-call-argument-newline': ['error', 'consistent'],
      // '@typescript-eslint/no-unused-expressions': [
      //   'error',
      //   {
      //     allowShortCircuit: true,
      //     allowTernary: true,
      //   },
      // ],
      // // '@typescript-eslint/dot-notation': ['error', { allowKeywords: true }],
      // '@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions'] }],
    },
  },
  { ignores: ['node-modules', 'eslint', 'src/report', 'test-results', 'jest.config.js', '.mocharc.mjs'] },
  {
    languageOptions: {
      globals: { ...globals.es2025, ...globals.browser, ...globals.node },
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
        createDefaultProgram: true,
      },
    },
  },
]);
