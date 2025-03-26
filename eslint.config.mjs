import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylisticJs from '@stylistic/eslint-plugin-js';

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    plugins: { '@stylistic/js': stylisticJs },
    rules: {
      '@stylistic/js/key-spacing': [
        'error',
        { beforeColon: false, afterColon: true, mode: 'strict' },
      ],
      '@stylistic/js/lines-between-class-members': [
        'error',
        {
          enforce: [{ blankLine: 'always', prev: 'method', next: 'method' }],
        },
      ],
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
      '@stylistic/js/indent': ['error', 2],
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
      '@stylistic/js/quotes': [
        'error',
        'single',
        { allowTemplateLiterals: true, avoidEscape: true },
      ],
      'no-this-before-super': 'error',
      '@typescript-eslint/no-unused-expressions': 0,
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-namespace': ['error', { allowDeclarations: true }],
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
  { ignores: ['node-modules', 'eslint', 'src/report', 'test-results'] },
  { languageOptions: { globals: { ...globals.es2021, ...globals.node } } },
];
