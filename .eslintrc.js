module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'google',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json', 'tsconfig.dev.json'],
    sourceType: 'module',
  },
  ignorePatterns: [
    '/lib/**/*', // Ignore built files.
  ],
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    'import/no-unresolved': 0,
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'object-curly-spacing': ['error', 'always'],
    'max-len': ['warn', 120],
    'no-plus-plus': 'off',
    'no-underscore-dangle': 'off',
    'max-classes-per-file': 'warn',
    'consistent-return': 'warn',
    'camelcase': 'off',
    'arrow-parens': 'off',
    'no-nested-ternary': 'off',
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: {
          minProperties: 6,
          multiline: true,
          consistent: true,
        },
        ObjectPattern: { minProperties: 6 },
        ImportDeclaration: {
          minProperties: 6,
          multiline: true,
          consistent: true,
        },
        ExportDeclaration: {
          minProperties: 6,
          multiline: true,
          consistent: true,
        },
      },
    ],
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
};
